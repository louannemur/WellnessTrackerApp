import { useState, useEffect } from 'react'
import TodayPage from './components/TodayPage'
import RoutinesPage from './components/RoutinesPage'
import QuickLogPage from './components/QuickLogPage'
import TrendsPage from './components/TrendsPage'
import SOSPage from './components/SOSPage'
import SettingsPage from './components/SettingsPage'
import { initializeDarkMode, toggleDarkMode } from './utils/darkMode'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('today')

  // Initialize dark mode on app load
  useEffect(() => {
    const isDark = initializeDarkMode()
    toggleDarkMode(isDark)
  }, [])

  return (
    <div className="App">
      {/* Page content */}
      <main className="app-content">
        {currentPage === 'today' && <TodayPage />}
        {currentPage === 'routines' && <RoutinesPage />}
        {currentPage === 'quicklog' && <QuickLogPage />}
        {currentPage === 'trends' && <TrendsPage />}
        {currentPage === 'sos' && <SOSPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>

      {/* Bottom navigation */}
      <nav className="bottom-nav">
        <button
          className={`nav-btn ${currentPage === 'today' ? 'active' : ''}`}
          onClick={() => setCurrentPage('today')}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Today</span>
        </button>
        <button
          className={`nav-btn ${currentPage === 'routines' ? 'active' : ''}`}
          onClick={() => setCurrentPage('routines')}
        >
          <span className="nav-icon">📋</span>
          <span className="nav-label">Routines</span>
        </button>
        <button
          className={`nav-btn ${currentPage === 'quicklog' ? 'active' : ''}`}
          onClick={() => setCurrentPage('quicklog')}
        >
          <span className="nav-icon">📝</span>
          <span className="nav-label">Quick Log</span>
        </button>
        <button
          className={`nav-btn ${currentPage === 'trends' ? 'active' : ''}`}
          onClick={() => setCurrentPage('trends')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Trends</span>
        </button>
        <button
          className={`nav-btn ${currentPage === 'sos' ? 'active' : ''}`}
          onClick={() => setCurrentPage('sos')}
        >
          <span className="nav-icon">🆘</span>
          <span className="nav-label">SOS</span>
        </button>
        <button
          className={`nav-btn ${currentPage === 'settings' ? 'active' : ''}`}
          onClick={() => setCurrentPage('settings')}
        >
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Settings</span>
        </button>
      </nav>
    </div>
  )
}

export default App
