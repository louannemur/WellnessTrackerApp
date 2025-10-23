import { useState, useEffect } from 'react'
import './RoutinesPage.css'

function RoutinesPage() {
  const [activeRoutine, setActiveRoutine] = useState('AM') // 'AM' or 'PM'
  const [simplifiedMode, setSimplifiedMode] = useState(false)
  const [completedSteps, setCompletedSteps] = useState({})
  const [skippedSteps, setSkippedSteps] = useState({})
  const [activeTimer, setActiveTimer] = useState(null)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [expandedStep, setExpandedStep] = useState(null)

  // Morning routine steps
  const morningRoutine = [
    {
      id: 'am-1',
      time: '7:00 AM',
      duration: 180, // 3 minutes in seconds
      title: 'In-Bed Activation',
      description: 'Gentle stretches before getting up',
      essential: true,
      details: [
        'Eye massage: Rub palms together, place over eyes',
        'Ankle pumps & circles: 15 pumps each foot',
        'Knee squeezes: 10 times each leg',
        'Finger & wrist prep: Make fists, spread fingers',
        'Shoulder rolls: 10 backward, 10 forward',
        'Gentle spinal twist: Hold 10 seconds each side'
      ]
    },
    {
      id: 'am-2',
      time: '7:03 AM',
      duration: 120, // 2 minutes
      title: 'Acupressure Energy Points',
      description: 'Activate energy points for the day',
      essential: false,
      details: [
        'Zu San Li (ST36): 30 seconds each leg',
        'Bai Hui (GV20): Gentle tapping on top of head, 30 seconds'
      ]
    },
    {
      id: 'am-3',
      time: '7:05 AM',
      duration: 120, // 2 minutes
      title: 'Morning Hydration Ritual',
      description: 'Warm lemon water',
      essential: true,
      details: [
        'Drink 12-16 oz warm water with 1/2 lemon',
        'Sip slowly while sitting on bed edge',
        'Alternative: Apple cider vinegar with cinnamon'
      ]
    },
    {
      id: 'am-4',
      time: '7:07 AM',
      duration: 120, // 2 minutes
      title: 'Light Activation',
      description: 'Open curtains and breathe',
      essential: true,
      details: [
        'Open all curtains/blinds immediately',
        'Stand at window for 5 deep breaths',
        'Look at something far away',
        'Think of ONE thing you\'re looking forward to'
      ]
    },
    {
      id: 'am-5',
      time: '7:10 AM',
      duration: 1200, // 20 minutes
      title: 'Movement Practice',
      description: 'Choose: Pool, Gym, or Qi Gong',
      essential: false,
      details: [
        'Pool: Water walking, jogging, leg exercises',
        'Gym: Wall push-ups, squats, resistance bands',
        'Qi Gong: Lifting the Sky, Carrying the Moon',
        'Pick based on your energy level today'
      ]
    },
    {
      id: 'am-6',
      time: '7:30 AM',
      duration: 600, // 10 minutes
      title: 'Korean Skincare Routine',
      description: 'Cleanse, tone, moisturize, SPF',
      essential: false,
      details: [
        'Cleanse with lukewarm water',
        'Apply toner (pat into skin)',
        'Apply essence (COSRX Snail Mucin)',
        'Apply serum (if using)',
        'Moisturize with upward strokes',
        'Apply sunscreen (1/4 tsp, wait 2 min)'
      ]
    },
    {
      id: 'am-7',
      time: '7:40 AM',
      duration: 300, // 5 minutes
      title: 'Mini Breakfast',
      description: 'Something tiny counts!',
      essential: false,
      details: [
        'Hard-boiled egg with salt',
        'Or: 5 almonds',
        'Or: Protein smoothie (1/2 portion)',
        'Or: Korean grain shake',
        'Remember: 50 calories is enough!'
      ]
    }
  ]

  // Evening routine steps
  const eveningRoutine = [
    {
      id: 'pm-1',
      time: '8:00 PM',
      duration: 300, // 5 minutes
      title: 'Tea Ceremony Meditation',
      description: 'Mindful tea preparation',
      essential: true,
      details: [
        'Choose tea: Spearmint (Mon/Thu), Chrysanthemum (Tue/Fri)',
        'Fill kettle and watch water heat',
        'Pour water mindfully - count 4 breaths',
        'While steeping: Press Yin Tang, Tai Yang, Shen Men points',
        'First sip ritual: Smell, small sip, hold, swallow'
      ]
    },
    {
      id: 'pm-2',
      time: '8:05 PM',
      duration: 120, // 2 minutes
      title: 'Oil Cleanse',
      description: 'Remove sunscreen and daily buildup',
      essential: true,
      details: [
        'Apply oil cleanser to DRY face',
        'Massage in circular motions for 60 seconds',
        'Focus on nose and chin areas',
        'Add water to emulsify (turns milky)',
        'Rinse thoroughly with lukewarm water'
      ]
    },
    {
      id: 'pm-3',
      time: '8:07 PM',
      duration: 60, // 1 minute
      title: 'Water-Based Cleanse',
      description: 'Second cleanse for clean skin',
      essential: true,
      details: [
        'Use regular cleanser',
        '30-second gentle massage',
        'Rinse with cool water 10 times'
      ]
    },
    {
      id: 'pm-4',
      time: '8:08 PM',
      duration: 180, // 3 minutes
      title: 'Treatment & Toner',
      description: 'BHA on Tue/Fri, toner other days',
      essential: false,
      details: [
        'Tue/Fri: Apply BHA to cotton pad, focus on nose/chin',
        'Other days: Apply toner in 3 light layers',
        'Pat gently between each layer',
        'Wait time allows active ingredients to work'
      ]
    },
    {
      id: 'pm-5',
      time: '8:10 PM',
      duration: 120, // 2 minutes
      title: 'Essence & Moisturize',
      description: 'Hydrate and seal in moisture',
      essential: false,
      details: [
        'Apply snail mucin essence (extra pump at night)',
        'Pat into skin for 30 seconds',
        'Apply moisturizer with upward strokes',
        'Optional: Add 2 drops rosehip oil for scarring'
      ]
    },
    {
      id: 'pm-6',
      time: '8:12 PM',
      duration: 180, // 3 minutes
      title: 'Gua Sha Massage',
      description: 'Reduce puffiness (optional)',
      essential: false,
      details: [
        'Apply facial oil first',
        'Stroke upward/outward always',
        'Jaw to ear: 3 strokes each side',
        'Under eye to temple: gentle, 3 strokes',
        'Forehead to hairline: 5 strokes'
      ]
    },
    {
      id: 'pm-7',
      time: '8:15 PM',
      duration: 60, // 1 minute
      title: 'Supplements',
      description: 'Evening supplements',
      essential: false,
      details: [
        'Magnesium glycinate (200mg)',
        'Probiotic (10+ billion CFU)',
        'NAC (600mg) - optional',
        'Take with water'
      ]
    },
    {
      id: 'pm-8',
      time: '8:16 PM',
      duration: 180, // 3 minutes
      title: 'Legs Up the Wall',
      description: 'Reduce fluid retention',
      essential: true,
      details: [
        'Lie on back near wall',
        'Scoot bottom close to wall',
        'Extend legs up wall',
        'Arms relaxed at sides',
        'Breathe normally for 3 minutes'
      ]
    }
  ]

  // Simplified mode - only essential tasks
  const simplifiedMorning = morningRoutine.filter(step => step.essential)
  const simplifiedEvening = eveningRoutine.filter(step => step.essential)

  const currentRoutine = activeRoutine === 'AM'
    ? (simplifiedMode ? simplifiedMorning : morningRoutine)
    : (simplifiedMode ? simplifiedEvening : eveningRoutine)

  // Timer effect
  useEffect(() => {
    let interval
    if (activeTimer !== null) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 0) {
            clearInterval(interval)
            setActiveTimer(null)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTimer])

  const toggleComplete = (stepId) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))
    // Remove from skipped if marking complete
    if (skippedSteps[stepId]) {
      setSkippedSteps(prev => {
        const newSkipped = { ...prev }
        delete newSkipped[stepId]
        return newSkipped
      })
    }
  }

  const toggleSkip = (stepId) => {
    setSkippedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))
    // Remove from completed if skipping
    if (completedSteps[stepId]) {
      setCompletedSteps(prev => {
        const newCompleted = { ...prev }
        delete newCompleted[stepId]
        return newCompleted
      })
    }
  }

  const startTimer = (stepId, duration) => {
    setActiveTimer(stepId)
    setTimerSeconds(duration)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleExpanded = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  const completedCount = Object.values(completedSteps).filter(Boolean).length
  const totalSteps = currentRoutine.length
  const progress = (completedCount / totalSteps) * 100

  return (
    <div className="routines-page">

      {/* Header */}
      <header className="routines-header">
        <h1 className="page-title">Routines</h1>
        <div className="header-subtitle">
          {completedCount} of {totalSteps} completed
        </div>
      </header>

      {/* Progress bar */}
      <div className="routine-progress-bar">
        <div
          className="routine-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* AM/PM Toggle */}
      <div className="routine-toggle-container">
        <button
          className={`routine-toggle-btn ${activeRoutine === 'AM' ? 'active' : ''}`}
          onClick={() => setActiveRoutine('AM')}
        >
          🌅 Morning
        </button>
        <button
          className={`routine-toggle-btn ${activeRoutine === 'PM' ? 'active' : ''}`}
          onClick={() => setActiveRoutine('PM')}
        >
          🌙 Evening
        </button>
      </div>

      {/* Simplified Mode Toggle */}
      <div className="simplified-mode-container">
        <label className="simplified-toggle">
          <input
            type="checkbox"
            checked={simplifiedMode}
            onChange={(e) => setSimplifiedMode(e.target.checked)}
          />
          <span className="toggle-label">
            Simplified Mode (bad day? just the essentials)
          </span>
        </label>
      </div>

      {/* Routine steps */}
      <div className="routine-steps">
        {currentRoutine.map((step, index) => (
          <div
            key={step.id}
            className={`routine-step ${completedSteps[step.id] ? 'completed' : ''} ${skippedSteps[step.id] ? 'skipped' : ''}`}
          >

            {/* Main step content */}
            <div className="step-main">

              {/* Time badge */}
              <div className="step-time-badge">{step.time}</div>

              {/* Step number */}
              <div className="step-number">{index + 1}</div>

              {/* Step info */}
              <div className="step-info" onClick={() => toggleExpanded(step.id)}>
                <h3 className="step-title">
                  {step.title}
                  {step.essential && <span className="essential-badge">Essential</span>}
                </h3>
                <p className="step-description">{step.description}</p>
                <div className="step-duration">{formatTime(step.duration)}</div>
              </div>

              {/* Checkbox */}
              <button
                className="step-checkbox"
                onClick={() => toggleComplete(step.id)}
                aria-label={completedSteps[step.id] ? 'Mark incomplete' : 'Mark complete'}
              >
                {completedSteps[step.id] && <span className="checkmark">✓</span>}
              </button>

            </div>

            {/* Expanded details */}
            {expandedStep === step.id && (
              <div className="step-details">
                <ul className="step-details-list">
                  {step.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="step-actions">

              {/* Timer button */}
              <button
                className={`action-btn timer-btn ${activeTimer === step.id ? 'active' : ''}`}
                onClick={() => startTimer(step.id, step.duration)}
                disabled={activeTimer === step.id}
              >
                ⏱️ {activeTimer === step.id ? formatTime(timerSeconds) : 'Start Timer'}
              </button>

              {/* Skip button */}
              <button
                className={`action-btn skip-btn ${skippedSteps[step.id] ? 'active' : ''}`}
                onClick={() => toggleSkip(step.id)}
              >
                {skippedSteps[step.id] ? '↩️ Unskip' : '⏭️ Skip (no guilt!)'}
              </button>

              {/* Expand button */}
              <button
                className="action-btn expand-btn"
                onClick={() => toggleExpanded(step.id)}
              >
                {expandedStep === step.id ? '▲ Less' : '▼ More'}
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* Completion message */}
      {completedCount === totalSteps && (
        <div className="completion-message">
          <span className="celebration-emoji">🎉</span>
          <h3>Amazing job!</h3>
          <p>You completed your {activeRoutine === 'AM' ? 'morning' : 'evening'} routine!</p>
        </div>
      )}

    </div>
  )
}

export default RoutinesPage
