// Smart notification system

export const notificationSchedule = [
  // MORNING ROUTINE - Time blocks from wellnessguide.md
  {
    id: 'wake-up-block',
    time: '07:00',
    title: 'Good Morning! 🌅',
    body: 'Wake-up routine: Stretches, acupressure, lemon water, light (10 min)',
    logCheck: ['am-1', 'am-2', 'am-3', 'am-4', 'wake-up', 'lemon-water']
  },
  {
    id: 'movement-block',
    time: '07:10',
    title: 'Movement Time! 🏊‍♀️',
    body: 'Pool, gym, or qi gong - 20 minutes',
    logCheck: ['am-5', 'exercise', 'movement', 'pool', 'gym', 'qi-gong']
  },
  {
    id: 'skincare-block',
    time: '07:30',
    title: 'Skincare Routine 🧴',
    body: 'Korean routine: Cleanse, tone, essence, moisturize, SPF (10 min)',
    logCheck: ['am-6', 'am-skincare', 'skincare']
  },
  {
    id: 'breakfast-block',
    time: '07:40',
    title: 'Mini Breakfast 🥚',
    body: 'Something tiny counts - even 5 almonds! (5 min)',
    logCheck: ['am-7', 'breakfast', 'mini-breakfast']
  },

  // MEALS THROUGHOUT DAY
  {
    id: 'second-breakfast',
    time: '10:30',
    title: 'Second Breakfast 🥣',
    body: 'Time for a more substantial meal',
    logCheck: ['second-breakfast']
  },
  {
    id: 'lunch-time',
    time: '12:30',
    title: 'Lunch Break 🍜',
    body: 'Your biggest meal of the day',
    logCheck: ['lunch']
  },
  {
    id: 'afternoon-snack',
    time: '15:00',
    title: 'Snack Time 🍎',
    body: 'Energy boost - check how you\'re feeling',
    logCheck: ['snack', 'afternoon-snack']
  },
  {
    id: 'dinner-time',
    time: '18:30',
    title: 'Dinner Time 🍱',
    body: 'Medium-sized balanced dinner',
    logCheck: ['dinner']
  },

  // EVENING ROUTINE - Time blocks from wellnessguide.md
  {
    id: 'tea-block',
    time: '22:00',
    title: 'Tea Ceremony 🍵',
    body: 'Mindful tea prep - spearmint, chrysanthemum, or holy basil',
    logCheck: ['pm-1', 'tea', 'evening-tea', 'tea-ceremony']
  },
  {
    id: 'pm-skincare-block',
    time: '22:30',
    title: 'PM Skincare 🌙',
    body: 'Full routine: Double cleanse, treatment, essence, moisturize',
    logCheck: ['pm-2', 'pm-3', 'pm-4', 'pm-5', 'pm-6', 'pm-skincare', 'evening-skincare']
  },
  {
    id: 'sleep-prep-block',
    time: '23:00',
    title: 'Sleep Prep 😴',
    body: 'Supplements + legs up the wall',
    logCheck: ['pm-7', 'pm-8', 'supplements', 'legs-up', 'sleep-prep']
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
