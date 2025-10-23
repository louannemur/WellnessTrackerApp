import { useState, useEffect } from 'react'
import { initializeNotifications, testNotification, requestNotificationPermission } from '../utils/notifications'
import './NotificationSettings.css'

function NotificationSettings({ onClose }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [permission, setPermission] = useState('default')

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
      setNotificationsEnabled(Notification.permission === 'granted')
    }
  }, [])

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission()

    if (granted) {
      setNotificationsEnabled(true)
      setPermission('granted')
      await initializeNotifications()

      // Show success notification
      setTimeout(() => {
        testNotification()
      }, 500)
    } else {
      alert('Notification permission denied. Please enable notifications in your browser settings.')
    }
  }

  const handleTestNotification = () => {
    testNotification()
  }

  return (
    <div className="notification-settings-overlay" onClick={onClose}>
      <div className="notification-settings-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="settings-title">🔔 Smart Notifications</h2>

        <div className="settings-section">
          <p className="settings-description">
            Get gentle reminders throughout your day. Notifications only send if you haven't logged the activity yet!
          </p>
        </div>

        <div className="notification-schedule">
          <h3 className="schedule-title">Daily Schedule</h3>
          <div className="schedule-list">
            <div className="schedule-item">
              <span className="schedule-time">7:00 AM</span>
              <span className="schedule-text">🛏️ Morning stretches in bed</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-time">7:45 AM</span>
              <span className="schedule-text">🥚 Eat anything tiny</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-time">10:30 AM</span>
              <span className="schedule-text">🥣 Second breakfast time</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-time">3:00 PM</span>
              <span className="schedule-text">🍎 Snack break</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-time">8:00 PM</span>
              <span className="schedule-text">🍵 Evening tea</span>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          {!notificationsEnabled ? (
            <button className="enable-btn" onClick={handleEnableNotifications}>
              ✓ Enable Smart Notifications
            </button>
          ) : (
            <>
              <div className="enabled-message">
                <span className="checkmark">✓</span>
                Notifications Enabled
              </div>
              <button className="test-btn" onClick={handleTestNotification}>
                Send Test Notification
              </button>
            </>
          )}

          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="settings-note">
          <p>💡 <strong>Tip:</strong> On iPhone, add this app to your home screen for the best experience!</p>
          <p className="install-instructions">
            Tap Share <span className="share-icon">⎋</span> then "Add to Home Screen"
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings
