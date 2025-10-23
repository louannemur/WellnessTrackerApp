// Smart notification system

export const notificationSchedule = [
  {
    id: 'morning-stretches',
    time: '07:00',
    title: 'Morning! 🛏️',
    body: 'Start with stretches in bed',
    logCheck: ['lemon-water'] // Check if morning routine started
  },
  {
    id: 'tiny-breakfast',
    time: '07:45',
    title: 'Breakfast Time 🥚',
    body: 'Eat anything tiny - even 3 almonds count!',
    logCheck: ['breakfast']
  },
  {
    id: 'second-breakfast',
    time: '10:30',
    title: 'Second Breakfast 🥣',
    body: 'Second breakfast time - you got this!',
    logCheck: ['second-breakfast']
  },
  {
    id: 'afternoon-snack',
    time: '15:00',
    title: 'Snack Break 🍎',
    body: 'Snack break - check your energy',
    logCheck: ['snack']
  },
  {
    id: 'evening-tea',
    time: '20:00',
    title: 'Tea Time! 🍵',
    body: 'Which one tonight?',
    logCheck: ['spearmint-tea', 'evening-tea']
  }
]

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

// Check if item has been logged today
const isLoggedToday = (itemId) => {
  const logs = JSON.parse(localStorage.getItem('quickLogs') || '{}')
  const today = new Date().toISOString().split('T')[0]
  const todayLogs = logs[today] || []

  return todayLogs.some(log => log.itemId === itemId)
}

// Check if any of the items have been logged
const isAnyLogged = (itemIds) => {
  return itemIds.some(id => isLoggedToday(id))
}

// Show notification
export const showNotification = (notification) => {
  if (Notification.permission === 'granted') {
    new Notification(notification.title, {
      body: notification.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: notification.id,
      requireInteraction: false,
      silent: false
    })
  }
}

// Schedule notification check
export const scheduleNotificationCheck = (notification) => {
  const now = new Date()
  const [hours, minutes] = notification.time.split(':')
  const scheduledTime = new Date()
  scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

  // If time has passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1)
  }

  const timeUntil = scheduledTime - now

  setTimeout(() => {
    // Check if already logged before sending notification
    if (!isAnyLogged(notification.logCheck)) {
      showNotification(notification)
    }

    // Schedule next check (24 hours later)
    setTimeout(() => scheduleNotificationCheck(notification), 24 * 60 * 60 * 1000)
  }, timeUntil)
}

// Initialize all notifications
export const initializeNotifications = async () => {
  const hasPermission = await requestNotificationPermission()

  if (hasPermission) {
    // Schedule all notifications
    notificationSchedule.forEach(notification => {
      scheduleNotificationCheck(notification)
    })

    console.log('Notifications scheduled successfully')
    return true
  }

  console.log('Notification permission denied')
  return false
}

// Test notification (for debugging)
export const testNotification = () => {
  if (Notification.permission === 'granted') {
    new Notification('Test Notification 🎉', {
      body: 'Your notifications are working!',
      icon: '/icon-192.png'
    })
  }
}
