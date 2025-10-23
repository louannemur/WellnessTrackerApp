import { useState, useEffect } from 'react'
import './QuickLogPage.css'

function QuickLogPage() {
  // Load logs from localStorage or initialize empty
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('quickLogs')
    return savedLogs ? JSON.parse(savedLogs) : {}
  })

  const [selectedLog, setSelectedLog] = useState(null)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteText, setNoteText] = useState('')

  // Save logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quickLogs', JSON.stringify(logs))
  }, [logs])

  // Quick log items based on wellness guide
  const quickLogItems = [
    {
      id: 'lemon-water',
      emoji: '🍋',
      label: 'Lemon Water',
      description: 'Morning hydration ritual',
      category: 'morning'
    },
    {
      id: 'breakfast',
      emoji: '🥚',
      label: 'Breakfast',
      description: 'First meal',
      category: 'meals'
    },
    {
      id: 'second-breakfast',
      emoji: '🥣',
      label: 'Second Breakfast',
      description: '10:30 AM meal',
      category: 'meals'
    },
    {
      id: 'supplements-am',
      emoji: '💊',
      label: 'AM Supplements',
      description: 'Morning vitamins',
      category: 'health'
    },
    {
      id: 'skincare-am',
      emoji: '🧴',
      label: 'AM Skincare',
      description: 'Morning routine',
      category: 'skincare'
    },
    {
      id: 'exercise',
      emoji: '🏊‍♀️',
      label: 'Exercise',
      description: 'Pool/Gym/Qi Gong',
      category: 'fitness'
    },
    {
      id: 'lunch',
      emoji: '🍜',
      label: 'Lunch',
      description: 'Main meal',
      category: 'meals'
    },
    {
      id: 'snack',
      emoji: '🍎',
      label: 'Snack',
      description: 'Afternoon snack',
      category: 'meals'
    },
    {
      id: 'dinner',
      emoji: '🍱',
      label: 'Dinner',
      description: 'Evening meal',
      category: 'meals'
    },
    {
      id: 'spearmint-tea',
      emoji: '🍵',
      label: 'Spearmint Tea',
      description: 'PCOS support (2 cups)',
      category: 'health'
    },
    {
      id: 'evening-tea',
      emoji: '☕',
      label: 'Evening Tea',
      description: 'Tea ceremony',
      category: 'health'
    },
    {
      id: 'skincare-pm',
      emoji: '🌙',
      label: 'PM Skincare',
      description: 'Evening routine',
      category: 'skincare'
    },
    {
      id: 'supplements-pm',
      emoji: '💊',
      label: 'PM Supplements',
      description: 'Evening vitamins',
      category: 'health'
    },
    {
      id: 'legs-up-wall',
      emoji: '🧘‍♀️',
      label: 'Legs Up Wall',
      description: 'Reduce fluid retention',
      category: 'fitness'
    },
    {
      id: 'good-sleep',
      emoji: '😴',
      label: 'Good Sleep',
      description: 'Quality rest',
      category: 'health'
    },
    {
      id: 'garden-check',
      emoji: '🌱',
      label: 'Garden Check',
      description: 'Watered herbs',
      category: 'wellness'
    }
  ]

  const getTodayKey = () => {
    return new Date().toISOString().split('T')[0]
  }

  const getYesterdayKey = () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday.toISOString().split('T')[0]
  }

  const getTodayLogs = () => {
    return logs[getTodayKey()] || []
  }

  const getYesterdayLogs = () => {
    return logs[getYesterdayKey()] || []
  }

  const isLoggedToday = (itemId) => {
    const todayLogs = getTodayLogs()
    return todayLogs.some(log => log.itemId === itemId)
  }

  const getLogTime = (itemId) => {
    const todayLogs = getTodayLogs()
    const log = todayLogs.find(log => log.itemId === itemId)
    return log ? new Date(log.timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }) : null
  }

  const handleQuickLog = (itemId) => {
    const todayKey = getTodayKey()
    const todayLogs = getTodayLogs()

    // Check if already logged
    const existingIndex = todayLogs.findIndex(log => log.itemId === itemId)

    if (existingIndex >= 0) {
      // Remove if already logged (toggle off)
      const newLogs = todayLogs.filter((_, index) => index !== existingIndex)
      setLogs({
        ...logs,
        [todayKey]: newLogs
      })
    } else {
      // Add new log
      const newLog = {
        itemId,
        timestamp: new Date().toISOString()
      }
      setLogs({
        ...logs,
        [todayKey]: [...todayLogs, newLog]
      })
    }
  }

  const handleAddNote = (itemId) => {
    setSelectedLog(itemId)
    setShowNoteModal(true)

    // Load existing note if any
    const todayLogs = getTodayLogs()
    const existingLog = todayLogs.find(log => log.itemId === itemId)
    setNoteText(existingLog?.note || '')
  }

  const saveNote = () => {
    const todayKey = getTodayKey()
    const todayLogs = getTodayLogs()
    const logIndex = todayLogs.findIndex(log => log.itemId === selectedLog)

    if (logIndex >= 0) {
      // Update existing log with note
      const updatedLogs = [...todayLogs]
      updatedLogs[logIndex] = {
        ...updatedLogs[logIndex],
        note: noteText
      }
      setLogs({
        ...logs,
        [todayKey]: updatedLogs
      })
    } else {
      // Create new log with note
      const newLog = {
        itemId: selectedLog,
        timestamp: new Date().toISOString(),
        note: noteText
      }
      setLogs({
        ...logs,
        [todayKey]: [...todayLogs, newLog]
      })
    }

    setShowNoteModal(false)
    setNoteText('')
    setSelectedLog(null)
  }

  const handleAddPhoto = (itemId) => {
    // Trigger file input
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.capture = 'environment' // Use camera on mobile

    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const todayKey = getTodayKey()
          const todayLogs = getTodayLogs()
          const logIndex = todayLogs.findIndex(log => log.itemId === itemId)

          if (logIndex >= 0) {
            // Update existing log with photo
            const updatedLogs = [...todayLogs]
            updatedLogs[logIndex] = {
              ...updatedLogs[logIndex],
              photo: event.target.result
            }
            setLogs({
              ...logs,
              [todayKey]: updatedLogs
            })
          } else {
            // Create new log with photo
            const newLog = {
              itemId,
              timestamp: new Date().toISOString(),
              photo: event.target.result
            }
            setLogs({
              ...logs,
              [todayKey]: [...todayLogs, newLog]
            })
          }
        }
        reader.readAsDataURL(file)
      }
    }

    input.click()
  }

  const copyYesterday = () => {
    const yesterdayLogs = getYesterdayLogs()

    if (yesterdayLogs.length === 0) {
      alert('No logs from yesterday to copy!')
      return
    }

    const todayKey = getTodayKey()
    const copiedLogs = yesterdayLogs.map(log => ({
      ...log,
      timestamp: new Date().toISOString(),
      // Don't copy photos, keep notes
      photo: undefined
    }))

    setLogs({
      ...logs,
      [todayKey]: copiedLogs
    })
  }

  const clearToday = () => {
    if (confirm('Clear all of today\'s logs?')) {
      const todayKey = getTodayKey()
      const newLogs = { ...logs }
      delete newLogs[todayKey]
      setLogs(newLogs)
    }
  }

  const todayLogs = getTodayLogs()
  const loggedCount = todayLogs.length

  return (
    <div className="quick-log-page">

      {/* Header */}
      <header className="quick-log-header">
        <h1 className="page-title">Quick Log</h1>
        <div className="header-subtitle">
          {loggedCount} logged today
        </div>
      </header>

      {/* Action buttons */}
      <div className="quick-actions">
        <button className="action-button copy-btn" onClick={copyYesterday}>
          <span className="btn-emoji">📋</span>
          Copy Yesterday
        </button>
        <button className="action-button clear-btn" onClick={clearToday}>
          <span className="btn-emoji">🗑️</span>
          Clear Today
        </button>
      </div>

      {/* Quick log grid */}
      <section className="quick-log-section">
        <h2 className="section-title">Tap to Log</h2>
        <div className="quick-log-grid">
          {quickLogItems.map(item => {
            const isLogged = isLoggedToday(item.id)
            const logTime = getLogTime(item.id)
            const log = todayLogs.find(l => l.itemId === item.id)

            return (
              <div key={item.id} className="log-item-container">
                <button
                  className={`log-item ${isLogged ? 'logged' : ''}`}
                  onClick={() => handleQuickLog(item.id)}
                >
                  <span className="log-emoji">{item.emoji}</span>
                  <span className="log-label">{item.label}</span>
                  {isLogged && (
                    <span className="log-time">{logTime}</span>
                  )}
                  {isLogged && (
                    <span className="log-checkmark">✓</span>
                  )}
                </button>

                {/* Extra options when logged */}
                {isLogged && (
                  <div className="log-extras">
                    <button
                      className="extra-btn"
                      onClick={() => handleAddNote(item.id)}
                      title="Add note"
                    >
                      📝
                      {log?.note && <span className="has-content">•</span>}
                    </button>
                    <button
                      className="extra-btn"
                      onClick={() => handleAddPhoto(item.id)}
                      title="Add photo"
                    >
                      📷
                      {log?.photo && <span className="has-content">•</span>}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Today's log summary */}
      {loggedCount > 0 && (
        <section className="log-summary">
          <h2 className="section-title">Today's Activity</h2>
          <div className="summary-list">
            {todayLogs.map((log, index) => {
              const item = quickLogItems.find(i => i.itemId === log.itemId)
              if (!item) return null

              return (
                <div key={index} className="summary-item">
                  <div className="summary-icon">{item.emoji}</div>
                  <div className="summary-info">
                    <div className="summary-name">{item.label}</div>
                    <div className="summary-time">
                      {new Date(log.timestamp).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </div>
                    {log.note && (
                      <div className="summary-note">📝 {log.note}</div>
                    )}
                  </div>
                  {log.photo && (
                    <img
                      src={log.photo}
                      alt="Log photo"
                      className="summary-photo"
                      onClick={() => {
                        // Open photo in new window
                        window.open(log.photo, '_blank')
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Note modal */}
      {showNoteModal && (
        <div className="modal-overlay" onClick={() => setShowNoteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Add Note</h3>
            <textarea
              className="note-textarea"
              placeholder="Type your note here... (e.g., 'Felt great!', 'Had nausea', 'Skin looking better')"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={4}
              autoFocus
            />
            <div className="modal-actions">
              <button
                className="modal-btn cancel-btn"
                onClick={() => {
                  setShowNoteModal(false)
                  setNoteText('')
                  setSelectedLog(null)
                }}
              >
                Cancel
              </button>
              <button
                className="modal-btn save-btn"
                onClick={saveNote}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default QuickLogPage
