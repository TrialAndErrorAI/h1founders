import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, getDocs, doc, setDoc, updateDoc, where, orderBy } from 'firebase/firestore';
import { ChevronLeftIcon, UserGroupIcon, CalendarIcon, TrendingUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface Member {
  id: string;
  name: string;
  email: string;
  linkedIn?: string;
  business: string;
  startRevenue: number;
  currentRevenue: number;
  biggestBlocker: string;
  cohortId: string;
  startDate: Date;
  sessionCount: number;
}

interface Session {
  id: string;
  memberId: string;
  sessionNumber: number;
  scheduledDate: Date;
  completedDate?: Date;
  notes: string;
  transcript?: string;
  actionItems: string[];
}

const CoachDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [todaySessions, setTodaySessions] = useState<Session[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [loading, setLoading] = useState(true);

  // Check if user is Sid (THE_ARCHITECT) - DEV MODE BYPASS for localhost
  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost';
    const isDevMode = isLocalhost && import.meta.env.DEV;

    // Allow access in dev mode OR if logged in as Sid
    if (!isDevMode && (!currentUser || currentUser.email !== 'sid@h1founders.com')) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // Load members and sessions
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load WIN CLUB members
      const membersQuery = query(
        collection(db, 'win_club_members'),
        where('cohortId', '==', '2025-Q4')
      );
      const membersSnap = await getDocs(membersQuery);
      const membersData: Member[] = [];
      membersSnap.forEach((doc) => {
        membersData.push({ id: doc.id, ...doc.data() } as Member);
      });
      setMembers(membersData);

      // Load today's sessions
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const sessionsQuery = query(
        collection(db, 'win_club_sessions'),
        where('scheduledDate', '>=', today),
        where('scheduledDate', '<', tomorrow),
        orderBy('scheduledDate', 'asc')
      );
      const sessionsSnap = await getDocs(sessionsQuery);
      const sessionsData: Session[] = [];
      sessionsSnap.forEach((doc) => {
        sessionsData.push({ id: doc.id, ...doc.data() } as Session);
      });
      setTodaySessions(sessionsData);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async () => {
    const name = prompt('Member name:');
    const email = prompt('Member email:');
    const business = prompt('Business/Product:');
    const startRevenue = Number(prompt('Current monthly revenue ($):') || '0');
    const biggestBlocker = prompt('Biggest blocker:');

    if (name && email && business) {
      const newMember = {
        name,
        email,
        business,
        startRevenue,
        currentRevenue: startRevenue,
        biggestBlocker: biggestBlocker || '',
        cohortId: '2025-Q4',
        startDate: new Date(),
        sessionCount: 0,
      };

      await setDoc(doc(collection(db, 'win_club_members')), newMember);
      await loadDashboardData();
    }
  };

  const scheduleSession = async (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const dateStr = prompt('Session date (YYYY-MM-DD):');
    const timeStr = prompt('Session time (HH:MM):');

    if (dateStr && timeStr) {
      const scheduledDate = new Date(`${dateStr}T${timeStr}:00`);
      const sessionNumber = member.sessionCount + 1;

      const newSession = {
        memberId,
        sessionNumber,
        scheduledDate,
        notes: '',
        actionItems: [],
      };

      await setDoc(doc(collection(db, 'win_club_sessions')), newSession);
      await updateDoc(doc(db, 'win_club_members', memberId), {
        sessionCount: sessionNumber
      });
      await loadDashboardData();
    }
  };

  const completeSession = async (sessionId: string) => {
    if (!sessionNotes.trim()) {
      alert('Please add session notes first');
      return;
    }

    await updateDoc(doc(db, 'win_club_sessions', sessionId), {
      completedDate: new Date(),
      notes: sessionNotes,
    });

    setSessionNotes('');
    await loadDashboardData();
  };

  const updateRevenue = async (memberId: string) => {
    const newRevenue = prompt('Updated monthly revenue ($):');
    if (newRevenue) {
      await updateDoc(doc(db, 'win_club_members', memberId), {
        currentRevenue: Number(newRevenue)
      });
      await loadDashboardData();
    }
  };

  const getRevenueGrowth = (member: Member) => {
    const growth = member.currentRevenue - member.startRevenue;
    const percentChange = member.startRevenue > 0
      ? ((growth / member.startRevenue) * 100).toFixed(0)
      : 'N/A';
    return { growth, percentChange };
  };

  const getMemberStatus = (member: Member) => {
    const { growth } = getRevenueGrowth(member);
    if (growth > member.startRevenue * 2) return { emoji: '🚀', label: 'Crushing' };
    if (growth > 0) return { emoji: '✅', label: 'On Track' };
    if (growth === 0) return { emoji: '⚠️', label: 'Stuck' };
    return { emoji: '🔻', label: 'Declining' };
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-green-500 font-mono p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono">
      {/* Header */}
      <header className="border-b border-green-900/50 bg-black/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-green-400 hover:text-green-300">
                ← Home
              </Link>
              <h1 className="text-xl font-bold text-green-400">WIN CLUB Coach Dashboard</h1>
            </div>
            <div className="text-green-500/60 text-sm">
              Q4 2025 Cohort
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Today's Sessions */}
        <div className="mb-8 bg-green-900/10 border border-green-500/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Today's Sessions
          </h2>
          {todaySessions.length === 0 ? (
            <p className="text-green-500/60">No sessions scheduled today</p>
          ) : (
            <div className="space-y-4">
              {todaySessions.map(session => {
                const member = members.find(m => m.id === session.memberId);
                if (!member) return null;
                return (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-black/50 rounded border border-green-500/20">
                    <div>
                      <div className="text-green-400 font-semibold">{member.name}</div>
                      <div className="text-green-500/60 text-sm">
                        Session {session.sessionNumber} • {new Date(session.scheduledDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-green-500/50 text-xs mt-1">
                        Blocker: {member.biggestBlocker}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add notes..."
                        value={sessionNotes}
                        onChange={(e) => setSessionNotes(e.target.value)}
                        className="px-3 py-1 bg-black border border-green-500/30 rounded text-green-400 text-sm"
                      />
                      <button
                        onClick={() => completeSession(session.id)}
                        className="px-4 py-1 bg-green-600 text-black rounded hover:bg-green-500 text-sm font-bold"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Member Progress Grid */}
        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
              <UserGroupIcon className="h-5 w-5" />
              Member Progress
            </h2>
            <button
              onClick={addMember}
              className="px-4 py-2 bg-green-600 text-black rounded hover:bg-green-500 text-sm font-bold"
            >
              + Add Member
            </button>
          </div>

          {/* Member Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-500/30">
                  <th className="text-left py-2 text-green-400">Member</th>
                  <th className="text-left py-2 text-green-400">Revenue</th>
                  <th className="text-left py-2 text-green-400">Sessions</th>
                  <th className="text-left py-2 text-green-400">Status</th>
                  <th className="text-left py-2 text-green-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-green-500/60">
                      No members yet. Add your first WIN CLUB member above.
                    </td>
                  </tr>
                ) : (
                  members.map(member => {
                    const { growth, percentChange } = getRevenueGrowth(member);
                    const status = getMemberStatus(member);
                    return (
                      <tr key={member.id} className="border-b border-green-500/10">
                        <td className="py-3">
                          <div className="text-green-400 font-semibold">{member.name}</div>
                          <div className="text-green-500/60 text-xs">{member.business}</div>
                        </td>
                        <td className="py-3">
                          <div className="text-green-400">
                            ${member.startRevenue.toLocaleString()} → ${member.currentRevenue.toLocaleString()}
                          </div>
                          <div className={`text-xs ${growth > 0 ? 'text-green-500' : growth < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                            {growth > 0 ? '+' : ''}{growth > 0 ? `$${growth.toLocaleString()}` : growth < 0 ? `-$${Math.abs(growth).toLocaleString()}` : 'No change'} ({percentChange}%)
                          </div>
                        </td>
                        <td className="py-3 text-green-400">
                          {member.sessionCount}/24
                        </td>
                        <td className="py-3">
                          <span className="text-green-400">
                            {status.emoji} {status.label}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => scheduleSession(member.id)}
                              className="text-green-400 hover:text-green-300 text-sm underline"
                            >
                              Schedule
                            </button>
                            <button
                              onClick={() => updateRevenue(member.id)}
                              className="text-green-400 hover:text-green-300 text-sm underline"
                            >
                              Update $
                            </button>
                            <button
                              onClick={() => setSelectedMember(member)}
                              className="text-green-400 hover:text-green-300 text-sm underline"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Stats */}
          <div className="mt-6 pt-6 border-t border-green-500/30 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {members.length}/5
              </div>
              <div className="text-green-500/60 text-sm">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                ${members.reduce((sum, m) => sum + (m.currentRevenue - m.startRevenue), 0).toLocaleString()}
              </div>
              <div className="text-green-500/60 text-sm">Total Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {members.reduce((sum, m) => sum + m.sessionCount, 0)}
              </div>
              <div className="text-green-500/60 text-sm">Sessions Done</div>
            </div>
          </div>
        </div>

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-green-400">{selectedMember.name}</h3>
                  <p className="text-green-500/60">{selectedMember.business}</p>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-green-400 hover:text-green-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-green-400 text-sm">Email</label>
                  <p className="text-green-500">{selectedMember.email}</p>
                </div>

                <div>
                  <label className="text-green-400 text-sm">LinkedIn</label>
                  <p className="text-green-500">{selectedMember.linkedIn || 'Not provided'}</p>
                </div>

                <div>
                  <label className="text-green-400 text-sm">Biggest Blocker</label>
                  <p className="text-green-500">{selectedMember.biggestBlocker}</p>
                </div>

                <div>
                  <label className="text-green-400 text-sm">Revenue Progress</label>
                  <p className="text-green-500">
                    ${selectedMember.startRevenue.toLocaleString()} → ${selectedMember.currentRevenue.toLocaleString()}
                    {' '}
                    ({getRevenueGrowth(selectedMember).percentChange}% growth)
                  </p>
                </div>

                <div>
                  <label className="text-green-400 text-sm">Sessions Completed</label>
                  <p className="text-green-500">{selectedMember.sessionCount} of 24</p>
                </div>

                <div>
                  <label className="text-green-400 text-sm">Started</label>
                  <p className="text-green-500">
                    {new Date(selectedMember.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachDashboard;