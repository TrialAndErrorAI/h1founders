import { useState, useEffect, useCallback } from 'react'

// Types matching database schema
export interface Cohort {
  id: number
  name: string
  short_name: string
  start_date: string
  end_date: string | null
  price: number
  status: string
  notes: string | null
}

export interface Milestone {
  id: number
  name: string
  week_number: number
  tagline: string
  icon: string
  description: string | null
}

export interface Task {
  id: number
  milestone_id: number
  name: string
  description: string | null
  artifact: string | null
  display_order: number
  is_required: number
  is_active: number
  notes: string | null
}

export interface Founder {
  id: number
  cohort_id: number
  name: string
  email: string | null
  firebase_uid: string | null
  avatar_initials: string
  status: string
  joined_at: string
  notes: string | null
  completedTasks: number[]
}

export interface LaunchClubData {
  cohort: Cohort
  milestones: Milestone[]
  tasks: Task[]
  founders: Founder[]
}

const API_BASE = import.meta.env.DEV ? 'http://localhost:8787' : ''

export function useLaunchClubData(cohortId: string = 'C1') {
  const [data, setData] = useState<LaunchClubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_BASE}/api/launch-club/cohort/${cohortId}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
      console.error('Launch Club data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [cohortId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Helper to update progress (admin only)
  const updateProgress = useCallback(async (
    founderId: number,
    taskId: number,
    completed: boolean,
    adminKey?: string
  ) => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }
      if (adminKey) {
        headers['X-Admin-Key'] = adminKey
      }

      const response = await fetch(`${API_BASE}/api/launch-club/progress`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ founderId, taskId, completed })
      })

      if (!response.ok) {
        throw new Error(`Failed to update: ${response.status}`)
      }

      // Refresh data
      await fetchData()
      return true
    } catch (err) {
      console.error('Update progress error:', err)
      return false
    }
  }, [fetchData])

  // Helper to bulk update founder progress (admin only)
  const bulkUpdateProgress = useCallback(async (
    founderId: number,
    completedTasks: number[],
    adminKey?: string
  ) => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }
      if (adminKey) {
        headers['X-Admin-Key'] = adminKey
      }

      const response = await fetch(`${API_BASE}/api/launch-club/founder/${founderId}/progress`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ completedTasks })
      })

      if (!response.ok) {
        throw new Error(`Failed to bulk update: ${response.status}`)
      }

      // Refresh data
      await fetchData()
      return true
    } catch (err) {
      console.error('Bulk update progress error:', err)
      return false
    }
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    updateProgress,
    bulkUpdateProgress
  }
}

// Compute derived stats from data
export function computeStats(data: LaunchClubData | null) {
  if (!data) return null

  const { founders, tasks, milestones } = data
  const totalTasks = tasks.filter(t => t.is_required).length
  const totalFounders = founders.length

  // Overall progress
  const totalCompleted = founders.reduce((sum, f) => sum + f.completedTasks.length, 0)
  const overallProgress = Math.round((totalCompleted / (totalFounders * totalTasks)) * 100)

  // Per-task completion counts
  const taskStats = tasks.map(task => ({
    ...task,
    completedCount: founders.filter(f => f.completedTasks.includes(task.id)).length,
    totalFounders
  }))

  // Per-milestone stats
  const milestoneStats = milestones.map(milestone => {
    const milestoneTasks = tasks.filter(t => t.milestone_id === milestone.id && t.is_required)
    const completedInMilestone = founders.filter(f => {
      return milestoneTasks.every(t => f.completedTasks.includes(t.id))
    }).length

    return {
      ...milestone,
      completedCount: completedInMilestone,
      totalFounders,
      tasks: milestoneTasks.length
    }
  })

  // Per-founder progress
  const founderStats = founders.map(founder => ({
    ...founder,
    completedCount: founder.completedTasks.length,
    totalTasks,
    progressPercent: Math.round((founder.completedTasks.length / totalTasks) * 100)
  })).sort((a, b) => b.progressPercent - a.progressPercent)

  return {
    totalFounders,
    totalTasks,
    overallProgress,
    taskStats,
    milestoneStats,
    founderStats
  }
}
