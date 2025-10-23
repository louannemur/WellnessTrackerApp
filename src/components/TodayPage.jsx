import { useState, useEffect } from 'react'
import NotificationSettings from './NotificationSettings'
import './TodayPage.css'

function TodayPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [waterCount, setWaterCount] = useState(0)
  const [mood, setMood] = useState(null)
  const [energy, setEnergy] = useState(null)
  const [exerciseDone, setExerciseDone] = useState(false)
  const [showMoodSlider, setShowMoodSlider] = useState(false)
  const [showEnergySlider, setShowEnergySlider] = useState(false)
  const [showNotificationSettings, setShowNotificationSettings] = useState(false)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Get next task based on time
  const getNextTask = () => {
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    const time = hour + minute / 60

    // Before morning routine
    if (time < 7) return { task: 'Morning routine starts soon', emoji: '🌅', time: '7:00 AM' }

    // Morning routine steps (7:00-7:45)
    if (time < 7.05) return { task: 'In-Bed Activation', emoji: '🛏️', time: '7:00 AM' }
    if (time < 7.083) return { task: 'Acupressure points', emoji: '⚡', time: '7:03 AM' }
    if (time < 7.117) return { task: 'Lemon water', emoji: '🍋', time: '7:05 AM' }
    if (time < 7.167) return { task: 'Light activation', emoji: '☀️', time: '7:07 AM' }
    if (time < 7.5) return { task: 'Movement practice', emoji: '🏊‍♀️', time: '7:10 AM' }
    if (time < 7.667) return { task: 'Skincare routine', emoji: '🧴', time: '7:30 AM' }
    if (time < 10.5) return { task: 'Mini breakfast', emoji: '🥚', time: '7:40 AM' }

    // Midday meals
    if (time < 12.5) return { task: 'Second breakfast', emoji: '🥣', time: '10:30 AM' }
    if (time < 15) return { task: 'Lunch time', emoji: '🍜', time: '12:30 PM' }
    if (time < 18.5) return { task: 'Afternoon snack', emoji: '🍎', time: '3:00 PM' }
    if (time < 20) return { task: 'Dinner time', emoji: '🍱', time: '6:30 PM' }

    // Evening routine steps (8:00-8:20)
    if (time < 20.083) return { task: 'Tea ceremony', emoji: '🍵', time: '8:00 PM' }
    if (time < 20.117) return { task: 'Oil cleanse', emoji: '🧼', time: '8:05 PM' }
    if (time < 20.133) return { task: 'Water-based cleanse', emoji: '💧', time: '8:07 PM' }
    if (time < 20.167) return { task: 'Treatment & toner', emoji: '🌿', time: '8:08 PM' }
    if (time < 20.2) return { task: 'Essence & moisturize', emoji: '💧', time: '8:10 PM' }
    if (time < 20.25) return { task: 'Gua sha (optional)', emoji: '💆‍♀️', time: '8:12 PM' }
    if (time < 20.267) return { task: 'Supplements', emoji: '💊', time: '8:15 PM' }

    // Final wind down
    return { task: 'Legs up the wall', emoji: '🧘‍♀️', time: '8:16 PM' }
  }

  const nextTask = getNextTask()

  // Calculate progress percentages
  const waterGoal = 8
  const waterProgress = Math.min((waterCount / waterGoal) * 100, 100)
  const moodProgress = mood ? (mood / 5) * 100 : 0
  const energyProgress = energy ? (energy / 5) * 100 : 0
  const exerciseProgress = exerciseDone ? 100 : 0

  // Motivational messages
  const motivationalMessages = [
    "You're doing amazing! Keep going!",
    "Small steps lead to big changes",
    "Your health journey matters",
    "Progress, not perfection",
    "Be proud of every effort",
    "You're stronger than you think",
    "Consistency is your superpower",
    "Your body deserves this care"
  ]
  const [motivationalMessage] = useState(
    motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
  )

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="today-page">
      {/* Header with time and weather */}
      <header className="today-header">
        <div className="time-section">
          <h1 className="current-time">{formatTime(currentTime)}</h1>
          <p className="current-date">{formatDate(currentTime)}</p>
        </div>
        <div className="header-actions">
          <button
            className="notification-bell-btn"
            onClick={() => setShowNotificationSettings(true)}
            aria-label="Notification settings"
          >
            🔔
          </button>
          <div className="weather-section">
            <span className="weather-icon">☀️</span>
            <span className="temperature">72°F</span>
          </div>
        </div>
      </header>

      {/* Next task reminder */}
      <div className="next-task-card">
        <div className="next-task-label">Coming up next</div>
        <div className="next-task-content">
          <span className="task-emoji">{nextTask.emoji}</span>
          <div className="task-details">
            <h3 className="task-name">{nextTask.task}</h3>
            <p className="task-time">{nextTask.time}</p>
          </div>
        </div>
      </div>

      {/* Quick log bubbles */}
      <section className="quick-log-section">
        <h2 className="section-title">Quick Log</h2>
        <div className="quick-log-grid">

          {/* Water bubble */}
          <div className="log-bubble">
            <button
              className="bubble-button water"
              onClick={() => setWaterCount(prev => prev + 1)}
            >
              <span className="bubble-emoji">💧</span>
              <span className="bubble-count">{waterCount}</span>
            </button>
            <p className="bubble-label">Water</p>
          </div>

          {/* Mood bubble */}
          <div className="log-bubble">
            <button
              className="bubble-button mood"
              onClick={() => setShowMoodSlider(!showMoodSlider)}
            >
              <span className="bubble-emoji">😊</span>
              {mood && <span className="bubble-value">{mood}/5</span>}
            </button>
            <p className="bubble-label">Mood</p>
            {showMoodSlider && (
              <div className="slider-popup">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={mood || 3}
                  onChange={(e) => setMood(Number(e.target.value))}
                  className="mood-slider"
                />
                <div className="slider-labels">
                  <span>😢</span>
                  <span>😐</span>
                  <span>😊</span>
                </div>
              </div>
            )}
          </div>

          {/* Energy bubble */}
          <div className="log-bubble">
            <button
              className="bubble-button energy"
              onClick={() => setShowEnergySlider(!showEnergySlider)}
            >
              <span className="bubble-emoji">⚡</span>
              {energy && <span className="bubble-value">{energy}/5</span>}
            </button>
            <p className="bubble-label">Energy</p>
            {showEnergySlider && (
              <div className="slider-popup">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={energy || 3}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="energy-slider"
                />
                <div className="slider-labels">
                  <span>😴</span>
                  <span>🙂</span>
                  <span>⚡</span>
                </div>
              </div>
            )}
          </div>

          {/* Exercise bubble */}
          <div className="log-bubble">
            <button
              className={`bubble-button exercise ${exerciseDone ? 'done' : ''}`}
              onClick={() => setExerciseDone(!exerciseDone)}
            >
              <span className="bubble-emoji">🏊‍♀️</span>
              {exerciseDone && <span className="check-mark">✓</span>}
            </button>
            <p className="bubble-label">Exercise</p>
          </div>

        </div>
      </section>

      {/* Progress rings */}
      <section className="progress-section">
        <h2 className="section-title">Today's Progress</h2>
        <div className="progress-rings">

          {/* Water progress */}
          <div className="progress-ring-container">
            <svg className="progress-ring" width="80" height="80">
              <circle
                className="progress-ring-bg"
                cx="40"
                cy="40"
                r="32"
              />
              <circle
                className="progress-ring-fill water-ring"
                cx="40"
                cy="40"
                r="32"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - waterProgress / 100)}`}
              />
              <text x="40" y="45" className="progress-text">💧</text>
            </svg>
            <p className="progress-label">{waterCount}/{waterGoal}</p>
          </div>

          {/* Mood progress */}
          <div className="progress-ring-container">
            <svg className="progress-ring" width="80" height="80">
              <circle
                className="progress-ring-bg"
                cx="40"
                cy="40"
                r="32"
              />
              <circle
                className="progress-ring-fill mood-ring"
                cx="40"
                cy="40"
                r="32"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - moodProgress / 100)}`}
              />
              <text x="40" y="45" className="progress-text">😊</text>
            </svg>
            <p className="progress-label">{mood ? `${mood}/5` : 'Not set'}</p>
          </div>

          {/* Energy progress */}
          <div className="progress-ring-container">
            <svg className="progress-ring" width="80" height="80">
              <circle
                className="progress-ring-bg"
                cx="40"
                cy="40"
                r="32"
              />
              <circle
                className="progress-ring-fill energy-ring"
                cx="40"
                cy="40"
                r="32"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - energyProgress / 100)}`}
              />
              <text x="40" y="45" className="progress-text">⚡</text>
            </svg>
            <p className="progress-label">{energy ? `${energy}/5` : 'Not set'}</p>
          </div>

          {/* Exercise progress */}
          <div className="progress-ring-container">
            <svg className="progress-ring" width="80" height="80">
              <circle
                className="progress-ring-bg"
                cx="40"
                cy="40"
                r="32"
              />
              <circle
                className="progress-ring-fill exercise-ring"
                cx="40"
                cy="40"
                r="32"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - exerciseProgress / 100)}`}
              />
              <text x="40" y="45" className="progress-text">🏊‍♀️</text>
            </svg>
            <p className="progress-label">{exerciseDone ? 'Done!' : 'Pending'}</p>
          </div>

        </div>
      </section>

      {/* Motivational message */}
      <div className="motivational-card">
        <p className="motivational-message">✨ {motivationalMessage}</p>
      </div>

      {/* Notification Settings Modal */}
      {showNotificationSettings && (
        <NotificationSettings onClose={() => setShowNotificationSettings(false)} />
      )}

    </div>
  )
}

export default TodayPage
