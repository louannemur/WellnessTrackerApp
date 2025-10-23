import { useState, useEffect } from 'react'
import { initializeDarkMode, toggleDarkMode } from '../utils/darkMode'
import { setFlareMode, setPeriodMode, getActiveModes } from '../utils/specialModes'
import { getStreakFreezes, useStreakFreeze, getEarnedBadges, getWellnessPetStatus, getDailyQuests } from '../utils/gamification'
import './SettingsPage.css'

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [flareMode, setFlareModeState] = useState(false)
  const [periodMode, setPeriodModeState] = useState(false)
  const [streakFreezes, setStreakFreezes] = useState({ used: 0, remaining: 2 })
  const [earnedBadges, setEarnedBadges] = useState([])
  const [petStatus, setPetStatus] = useState({ status: 'healthy', emoji: '💚', message: '' })
  const [exportSuccess, setExportSuccess] = useState(false)

  useEffect(() => {
    // Initialize dark mode
    const isDark = initializeDarkMode()
    setDarkMode(isDark)
    toggleDarkMode(isDark)

    // Load modes
    const modes = getActiveModes()
    setFlareModeState(modes.flare)
    setPeriodModeState(modes.period)

    // Load gamification data
    setStreakFreezes(getStreakFreezes())
    setEarnedBadges(getEarnedBadges())
    setPetStatus(getWellnessPetStatus())
  }, [])

  const handleDarkModeToggle = () => {
    const newValue = !darkMode
    setDarkMode(newValue)
    toggleDarkMode(newValue)
  }

  const handleFlareModeToggle = () => {
    const newValue = !flareMode
    setFlareModeState(newValue)
    setFlareMode(newValue)
  }

  const handlePeriodModeToggle = () => {
    const newValue = !periodMode
    setPeriodModeState(newValue)
    setPeriodMode(newValue)
  }

  const handleStreakFreeze = () => {
    const success = useStreakFreeze()
    if (success) {
      setStreakFreezes(getStreakFreezes())
      alert('Streak freeze activated! Your streak is protected for today. 💜')
    } else {
      alert('You\'ve already used a freeze today!')
    }
  }

  const handleExportData = () => {
    const logs = JSON.parse(localStorage.getItem('quickLogs') || '{}')
    const allData = {
      logs,
      exportDate: new Date().toISOString(),
      appVersion: '1.0.0',
      notes: 'Wellness Tracker - Export for medical review'
    }

    // Create blob and download
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `wellness-data-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)

    setExportSuccess(true)
    setTimeout(() => setExportSuccess(false), 3000)
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
      if (confirm('Really sure? This will delete everything!')) {
        localStorage.clear()
        alert('All data cleared. Refresh the page to start fresh.')
        window.location.reload()
      }
    }
  }

  return (
    <div className="settings-page">

      {/* Header */}
      <header className="settings-header">
        <h1 className="page-title">Settings</h1>
        <div className="header-subtitle">
          Customize your wellness experience
        </div>
      </header>

      {/* Dark Mode */}
      <section className="settings-section">
        <h2 className="section-title">🌙 Appearance</h2>
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-name">Dark Mode</div>
            <div className="setting-description">Easy on the eyes, especially at night</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </section>

      {/* Special Modes */}
      <section className="settings-section">
        <h2 className="section-title">🎯 Special Modes</h2>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-name">🔥 Flare Mode</div>
            <div className="setting-description">Crohn's-safe foods, gentle exercises, medication reminders</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={flareMode}
              onChange={handleFlareModeToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-name">🌙 Period Mode</div>
            <div className="setting-description">Cramp tracking, iron-rich foods, extra gentle</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={periodMode}
              onChange={handlePeriodModeToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="mode-note">
          💡 <strong>Struggle Bus Mode</strong> activates automatically when you need it!
        </div>
      </section>

      {/* Gamification */}
      <section className="settings-section">
        <h2 className="section-title">🎮 Wellness Rewards</h2>

        {/* Wellness Pet */}
        <div className="wellness-pet-card">
          <div className="pet-status">
            <span className="pet-emoji">{petStatus.emoji}</span>
            <div className="pet-info">
              <div className="pet-name">Your Wellness Pet</div>
              <div className="pet-message">{petStatus.message}</div>
            </div>
          </div>
          <div className="pet-description">
            Your pet grows healthier as you maintain your wellness habits!
          </div>
        </div>

        {/* Streak Freeze */}
        <div className="streak-freeze-card">
          <div className="freeze-header">
            <span className="freeze-emoji">❄️</span>
            <div className="freeze-info">
              <div className="freeze-title">Streak Freeze</div>
              <div className="freeze-subtitle">
                {streakFreezes.remaining} remaining this month
              </div>
            </div>
          </div>
          <button
            className="freeze-btn"
            onClick={handleStreakFreeze}
            disabled={streakFreezes.remaining === 0}
          >
            {streakFreezes.remaining > 0 ? 'Use Freeze Today' : 'All Used This Month'}
          </button>
          <div className="freeze-description">
            Bad day? Use a freeze to protect your streak. No guilt! (2 per month)
          </div>
        </div>

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <div className="badges-section">
            <h3 className="badges-title">🏆 Your Badges ({earnedBadges.length})</h3>
            <div className="badges-grid">
              {earnedBadges.map(badge => (
                <div key={badge.id} className="badge-item">
                  <span className="badge-emoji">{badge.emoji}</span>
                  <div className="badge-name">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Data Management */}
      <section className="settings-section">
        <h2 className="section-title">📊 Data Management</h2>

        <button className="export-btn" onClick={handleExportData}>
          📤 Export Data for Doctor
        </button>
        {exportSuccess && (
          <div className="export-success">
            ✓ Data exported successfully!
          </div>
        )}

        <div className="export-description">
          Download all your wellness data as a JSON file to share with your healthcare provider.
        </div>

        <button className="danger-btn" onClick={handleClearData}>
          🗑️ Clear All Data
        </button>
        <div className="danger-note">
          ⚠️ This will permanently delete all your data. Cannot be undone!
        </div>
      </section>

      {/* App Info */}
      <section className="settings-section app-info">
        <h2 className="section-title">ℹ️ About</h2>
        <div className="info-item">
          <span className="info-label">Version:</span>
          <span className="info-value">1.0.0</span>
        </div>
        <div className="info-item">
          <span className="info-label">PWA:</span>
          <span className="info-value">Installed ✓</span>
        </div>
        <div className="info-item">
          <span className="info-label">Offline:</span>
          <span className="info-value">Enabled ✓</span>
        </div>
        <div className="app-description">
          Built with 💜 for PCOS, Crohn's, Hypermobility & ADHD wellness
        </div>
      </section>

    </div>
  )
}

export default SettingsPage
