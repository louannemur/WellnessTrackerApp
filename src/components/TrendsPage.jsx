import { useState, useEffect } from 'react'
import './TrendsPage.css'

function TrendsPage() {
  const [timeRange, setTimeRange] = useState('week') // 'week' or 'month'
  const [logs, setLogs] = useState({})

  // Load data from localStorage
  useEffect(() => {
    const quickLogs = localStorage.getItem('quickLogs')
    if (quickLogs) {
      setLogs(JSON.parse(quickLogs))
    }
  }, [])

  // Generate last 7 or 30 days
  const getDates = (days) => {
    const dates = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const weekDates = getDates(7)
  const monthDates = getDates(30)
  const activeDates = timeRange === 'week' ? weekDates : monthDates

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0
    const today = new Date()

    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateKey = date.toISOString().split('T')[0]

      if (logs[dateKey] && logs[dateKey].length > 0) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  // Get activity level for a date
  const getActivityLevel = (dateKey) => {
    const dayLogs = logs[dateKey] || []
    const count = dayLogs.length

    if (count === 0) return 'none'
    if (count <= 3) return 'low'
    if (count <= 7) return 'medium'
    if (count <= 12) return 'high'
    return 'very-high'
  }

  // Calculate average energy (mock data for now - would come from mood/energy logs)
  const getEnergyData = () => {
    return activeDates.map((date, index) => {
      const dayLogs = logs[date] || []
      // Mock energy calculation (in real app, would track energy from Today page)
      const baseEnergy = dayLogs.length > 5 ? 70 : 40
      const variance = Math.random() * 30
      return Math.min(100, baseEnergy + variance)
    })
  }

  const energyData = getEnergyData()

  // Smart insights based on data
  const generateInsights = () => {
    const insights = []
    const totalDays = activeDates.length
    const activeDays = activeDates.filter(date => logs[date]?.length > 0).length
    const consistencyRate = Math.round((activeDays / totalDays) * 100)

    // Consistency insight
    if (consistencyRate >= 80) {
      insights.push({
        emoji: '🔥',
        text: `${consistencyRate}% consistency this ${timeRange}! You're crushing it!`,
        type: 'positive'
      })
    } else if (consistencyRate >= 50) {
      insights.push({
        emoji: '💪',
        text: `${consistencyRate}% consistency. Keep building that momentum!`,
        type: 'neutral'
      })
    } else {
      insights.push({
        emoji: '🌱',
        text: 'Every small step counts. Focus on just one habit today.',
        type: 'encouraging'
      })
    }

    // Streak insight
    const streak = calculateStreak()
    if (streak >= 7) {
      insights.push({
        emoji: '⭐',
        text: `${streak}-day streak! You're building powerful habits.`,
        type: 'positive'
      })
    } else if (streak >= 3) {
      insights.push({
        emoji: '🎯',
        text: `${streak} days in a row. Keep the momentum going!`,
        type: 'positive'
      })
    }

    // Check for spearmint tea logging (PCOS support)
    const spearmintDays = activeDates.filter(date =>
      logs[date]?.some(log => log.itemId === 'spearmint-tea')
    ).length
    if (spearmintDays >= 5) {
      insights.push({
        emoji: '🍵',
        text: `Logged spearmint tea ${spearmintDays} times! Great for PCOS management.`,
        type: 'positive'
      })
    }

    // Check for exercise consistency
    const exerciseDays = activeDates.filter(date =>
      logs[date]?.some(log => log.itemId === 'exercise')
    ).length
    if (exerciseDays >= 4) {
      insights.push({
        emoji: '🏊‍♀️',
        text: `Exercised ${exerciseDays} times this ${timeRange}. Your body is getting stronger!`,
        type: 'positive'
      })
    }

    // Morning routine insight
    const morningRoutineDays = activeDates.filter(date =>
      logs[date]?.some(log => log.itemId === 'lemon-water')
    ).length
    if (morningRoutineDays >= 5) {
      insights.push({
        emoji: '🍋',
        text: 'Morning hydration ritual is becoming automatic!',
        type: 'positive'
      })
    }

    return insights
  }

  const insights = generateInsights()
  const currentStreak = calculateStreak()

  // Get day name
  const getDayName = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  // Get date number
  const getDateNumber = (dateString) => {
    const date = new Date(dateString)
    return date.getDate()
  }

  // Most logged activities
  const getMostLoggedActivities = () => {
    const activityCounts = {}

    activeDates.forEach(date => {
      const dayLogs = logs[date] || []
      dayLogs.forEach(log => {
        activityCounts[log.itemId] = (activityCounts[log.itemId] || 0) + 1
      })
    })

    const sorted = Object.entries(activityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    const activityNames = {
      'lemon-water': '🍋 Lemon Water',
      'breakfast': '🥚 Breakfast',
      'exercise': '🏊‍♀️ Exercise',
      'spearmint-tea': '🍵 Spearmint Tea',
      'skincare-am': '🧴 AM Skincare',
      'skincare-pm': '🌙 PM Skincare',
      'supplements-am': '💊 AM Supplements',
      'supplements-pm': '💊 PM Supplements',
      'lunch': '🍜 Lunch',
      'dinner': '🍱 Dinner',
      'good-sleep': '😴 Good Sleep',
      'legs-up-wall': '🧘‍♀️ Legs Up Wall',
      'garden-check': '🌱 Garden Check'
    }

    return sorted.map(([id, count]) => ({
      name: activityNames[id] || id,
      count,
      percentage: Math.round((count / activeDates.length) * 100)
    }))
  }

  const topActivities = getMostLoggedActivities()

  return (
    <div className="trends-page">

      {/* Header */}
      <header className="trends-header">
        <h1 className="page-title">Trends</h1>
        <div className="header-subtitle">
          See your patterns and progress
        </div>
      </header>

      {/* Time range toggle */}
      <div className="time-range-toggle">
        <button
          className={`range-btn ${timeRange === 'week' ? 'active' : ''}`}
          onClick={() => setTimeRange('week')}
        >
          Week
        </button>
        <button
          className={`range-btn ${timeRange === 'month' ? 'active' : ''}`}
          onClick={() => setTimeRange('month')}
        >
          Month
        </button>
      </div>

      {/* Streak card */}
      <div className="streak-card">
        <div className="streak-icon">🔥</div>
        <div className="streak-info">
          <div className="streak-number">{currentStreak}</div>
          <div className="streak-label">Day Streak</div>
        </div>
        <div className="streak-message">
          {currentStreak === 0 && "Start logging today!"}
          {currentStreak === 1 && "Great start!"}
          {currentStreak >= 2 && currentStreak < 7 && "Keep it up!"}
          {currentStreak >= 7 && currentStreak < 14 && "One week strong!"}
          {currentStreak >= 14 && currentStreak < 30 && "Amazing dedication!"}
          {currentStreak >= 30 && "Unstoppable! 🌟"}
        </div>
      </div>

      {/* Activity heat map */}
      <section className="heat-map-section">
        <h2 className="section-title">Activity Calendar</h2>
        <div className={`heat-map ${timeRange}`}>
          {activeDates.map(date => {
            const level = getActivityLevel(date)
            const dayLogs = logs[date] || []

            return (
              <div
                key={date}
                className={`heat-cell ${level}`}
                title={`${getDayName(date)} ${getDateNumber(date)}: ${dayLogs.length} activities`}
              >
                <div className="cell-day">{getDayName(date)}</div>
                <div className="cell-date">{getDateNumber(date)}</div>
              </div>
            )
          })}
        </div>
        <div className="heat-map-legend">
          <span className="legend-label">Less</span>
          <div className="legend-cell none"></div>
          <div className="legend-cell low"></div>
          <div className="legend-cell medium"></div>
          <div className="legend-cell high"></div>
          <div className="legend-cell very-high"></div>
          <span className="legend-label">More</span>
        </div>
      </section>

      {/* Energy pattern */}
      <section className="energy-section">
        <h2 className="section-title">Energy Pattern</h2>
        <div className="energy-graph">
          <div className="graph-lines">
            <div className="graph-line"></div>
            <div className="graph-line"></div>
            <div className="graph-line"></div>
            <div className="graph-line"></div>
            <div className="graph-line"></div>
          </div>
          <div className="graph-bars">
            {energyData.map((energy, index) => (
              <div key={index} className="bar-container">
                <div
                  className="energy-bar"
                  style={{ height: `${energy}%` }}
                  title={`${activeDates[index]}: ${Math.round(energy)}%`}
                >
                </div>
                <div className="bar-label">
                  {timeRange === 'week' ? getDayName(activeDates[index]) : getDateNumber(activeDates[index])}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="energy-summary">
          Average Energy: {Math.round(energyData.reduce((a, b) => a + b, 0) / energyData.length)}%
        </div>
      </section>

      {/* Top activities */}
      {topActivities.length > 0 && (
        <section className="top-activities-section">
          <h2 className="section-title">Most Consistent Habits</h2>
          <div className="activities-list">
            {topActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-rank">#{index + 1}</div>
                <div className="activity-info">
                  <div className="activity-name">{activity.name}</div>
                  <div className="activity-bar-container">
                    <div
                      className="activity-bar"
                      style={{ width: `${activity.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="activity-stats">
                  <div className="activity-count">{activity.count}×</div>
                  <div className="activity-percentage">{activity.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Smart insights */}
      <section className="insights-section">
        <h2 className="section-title">Smart Insights</h2>
        <div className="insights-list">
          {insights.map((insight, index) => (
            <div key={index} className={`insight-card ${insight.type}`}>
              <span className="insight-emoji">{insight.emoji}</span>
              <p className="insight-text">{insight.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="tips-section">
        <h2 className="section-title">Wellness Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-emoji">🍵</div>
            <div className="tip-title">Spearmint Tea</div>
            <div className="tip-text">2 cups daily helps with PCOS symptoms</div>
          </div>
          <div className="tip-card">
            <div className="tip-emoji">🏊‍♀️</div>
            <div className="tip-title">Pool Exercise</div>
            <div className="tip-text">Joint-friendly, great for hypermobility</div>
          </div>
          <div className="tip-card">
            <div className="tip-emoji">🧴</div>
            <div className="tip-title">Skincare Routine</div>
            <div className="tip-text">Consistency shows results in 4-6 weeks</div>
          </div>
          <div className="tip-card">
            <div className="tip-emoji">🌱</div>
            <div className="tip-title">Start Small</div>
            <div className="tip-text">Progress over perfection always wins</div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default TrendsPage
