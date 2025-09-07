import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmailCapture from '../../components/EmailCapture'

interface Question {
  id: string
  category: string
  question: string
  description?: string
  weight: number
}

const questions: Question[] = [
  {
    id: 'revenue',
    category: 'Business Impact',
    question: 'What is your company\'s annual revenue?',
    description: 'Include all revenue streams from your business ventures',
    weight: 25
  },
  {
    id: 'publications',
    category: 'Publications',
    question: 'Have you published articles, papers, or been featured in media?',
    description: 'Technical blogs, research papers, podcasts, news features all count',
    weight: 15
  },
  {
    id: 'patents',
    category: 'Innovation',
    question: 'Do you have any patents or patent applications?',
    description: 'Provisional, utility, or design patents',
    weight: 20
  },
  {
    id: 'awards',
    category: 'Recognition',
    question: 'Have you received any awards or recognition?',
    description: 'Industry awards, hackathon wins, accelerator selections',
    weight: 15
  },
  {
    id: 'leadership',
    category: 'Leadership',
    question: 'Have you held leadership positions?',
    description: 'Founder, CTO, board member, conference organizer',
    weight: 10
  },
  {
    id: 'judging',
    category: 'Expertise',
    question: 'Have you judged competitions or reviewed others\' work?',
    description: 'Hackathon judge, peer reviewer, mentor, advisor',
    weight: 10
  },
  {
    id: 'speaking',
    category: 'Thought Leadership',
    question: 'Have you spoken at conferences or events?',
    description: 'Keynotes, panels, workshops, webinars',
    weight: 10
  },
  {
    id: 'membership',
    category: 'Professional Standing',
    question: 'Are you a member of professional associations?',
    description: 'IEEE, ACM, or industry-specific organizations',
    weight: 5
  },
  {
    id: 'employees',
    category: 'Job Creation',
    question: 'How many people does your company employ?',
    description: 'Full-time, part-time, and contractors',
    weight: 15
  },
  {
    id: 'impact',
    category: 'Industry Impact',
    question: 'Can you demonstrate significant impact in your field?',
    description: 'Users served, problems solved, industry transformation',
    weight: 20
  }
]

interface Answer {
  questionId: string
  value: number
}

export default function EB1AQualifier() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showEmailCapture, setShowEmailCapture] = useState(false)

  const handleAnswer = (value: number) => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestion].id,
      value
    }
    
    const updatedAnswers = [...answers.filter(a => a.questionId !== questions[currentQuestion].id), newAnswer]
    setAnswers(updatedAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults(updatedAnswers)
    }
  }

  const calculateResults = (_finalAnswers: Answer[]) => {
    setShowResults(true)
  }

  const getScore = () => {
    return answers.reduce((total, answer) => {
      const question = questions.find(q => q.id === answer.questionId)
      return total + (answer.value * (question?.weight || 0)) / 5
    }, 0)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getRecommendation = (score: number) => {
    if (score >= 80) {
      return {
        title: 'STRONG CANDIDATE',
        message: 'You have an excellent profile for EB1-A. Time to take action.',
        action: 'Book a strategy call to start your application'
      }
    }
    if (score >= 60) {
      return {
        title: 'GOOD POTENTIAL',
        message: 'You\'re close! With some profile building, EB1-A is within reach.',
        action: 'Learn how to strengthen your profile'
      }
    }
    if (score >= 40) {
      return {
        title: 'BUILDING PHASE',
        message: 'You have a foundation. Focus on building evidence in key areas.',
        action: 'Get a roadmap to EB1-A qualification'
      }
    }
    return {
      title: 'EARLY STAGE',
      message: 'Start building your extraordinary ability profile now.',
      action: 'Learn the EB1-A requirements and strategy'
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setShowEmailCapture(false)
  }

  if (showResults) {
    const score = getScore()
    const recommendation = getRecommendation(score)
    
    return (
      <div className="min-h-screen bg-black px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Results Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-mono terminal-text matrix-glow mb-4">
              EB1-A_QUALIFICATION_RESULTS
            </h1>
            
            {/* Score Display */}
            <div className="inline-block bg-gray-900 border border-gray-700 rounded-lg p-8 mb-8">
              <p className="text-gray-400 font-mono text-sm mb-2">YOUR_SCORE:</p>
              <p className={`text-6xl font-bold font-mono ${getScoreColor(score)}`}>
                {Math.round(score)}%
              </p>
            </div>
            
            {/* Recommendation */}
            <div className="bg-gray-900 border border-green-400/20 rounded-lg p-8 mb-8">
              <h2 className={`text-2xl font-mono mb-4 ${getScoreColor(score)}`}>
                {recommendation.title}
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                {recommendation.message}
              </p>
              <p className="text-white font-semibold">
                Next step: {recommendation.action}
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-mono text-green-400 mb-6">// CATEGORY BREAKDOWN</h3>
            <div className="space-y-4">
              {questions.map((q) => {
                const answer = answers.find(a => a.questionId === q.id)
                const categoryScore = ((answer?.value || 0) / 5) * 100
                
                return (
                  <div key={q.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{q.category}</span>
                      <span className={`font-mono ${getScoreColor(categoryScore)}`}>
                        {Math.round(categoryScore)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          categoryScore >= 80 ? 'bg-green-400' :
                          categoryScore >= 60 ? 'bg-yellow-400' :
                          categoryScore >= 40 ? 'bg-orange-400' :
                          'bg-red-400'
                        }`}
                        style={{ width: `${categoryScore}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Email Capture for Report */}
          {!showEmailCapture ? (
            <div className="text-center">
              <button
                onClick={() => setShowEmailCapture(true)}
                className="red-pill-button px-8 py-4 text-lg font-semibold rounded-lg font-mono mb-4"
              >
                GET_DETAILED_REPORT()
              </button>
              <p className="text-gray-500 font-mono text-sm">
                // Receive personalized EB1-A roadmap
              </p>
            </div>
          ) : (
            <div className="bg-black border border-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-mono text-white mb-2">// Get your personalized EB1-A roadmap</h3>
              <p className="text-gray-400 mb-6">
                We'll send you a detailed report with specific steps to strengthen your profile.
              </p>
              <EmailCapture 
                placeholder="founder@startup.com"
                buttonText="SEND_REPORT()"
                context={`eb1a-qualifier-score-${Math.round(score)}`}
                onSuccess={() => {
                  alert('Report requested! Check your email.')
                }}
              />
            </div>
          )}

          {/* Actions */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-mono hover:border-gray-400 transition-colors"
            >
              RETAKE_QUIZ()
            </button>
            <a
              href="#coaching"
              className="px-6 py-3 bg-green-500 text-black rounded-lg font-mono font-semibold hover:bg-green-400 transition-colors text-center"
            >
              BOOK_STRATEGY_CALL()
            </a>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-black px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link to="/tools" className="text-gray-400 hover:text-green-400 font-mono text-sm mb-4 inline-block">
            ← TOOLS/
          </Link>
          <h1 className="text-4xl font-mono terminal-text matrix-glow mb-4">
            EB1-A_QUALIFIER
          </h1>
          <p className="text-gray-400 text-lg">
            Answer 10 questions to see if you qualify for the extraordinary ability green card.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400 font-mono">
              QUESTION_{currentQuestion + 1}/{questions.length}
            </span>
            <span className="text-green-400 font-mono">
              {Math.round(progress)}%_COMPLETE
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-8">
          <div className="mb-6">
            <span className="text-green-400 font-mono text-sm">
              // {question.category}
            </span>
            <h2 className="text-2xl font-bold text-white mt-2 mb-2">
              {question.question}
            </h2>
            {question.description && (
              <p className="text-gray-400">
                {question.description}
              </p>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {[
              { value: 5, label: 'Exceptional', description: 'Top tier evidence' },
              { value: 4, label: 'Strong', description: 'Solid evidence' },
              { value: 3, label: 'Moderate', description: 'Some evidence' },
              { value: 2, label: 'Limited', description: 'Minimal evidence' },
              { value: 1, label: 'None', description: 'No evidence yet' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-400 rounded-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold group-hover:text-green-400">
                      {option.label}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      {option.description}
                    </span>
                  </div>
                  <span className="text-gray-600 group-hover:text-green-400">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="text-gray-400 hover:text-white font-mono text-sm"
          >
            ← PREVIOUS_QUESTION()
          </button>
        )}
      </div>
    </div>
  )
}