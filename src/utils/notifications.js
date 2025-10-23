// Smart notification system

export const notificationSchedule = [
  // MORNING ROUTINE - Each individual step
  {
    id: 'am-1',
    time: '07:00',
    title: 'Good Morning! 🛏️',
    body: 'In-Bed Activation: Gentle stretches before getting up',
    logCheck: ['am-1', 'in-bed-activation']
  },
  {
    id: 'am-2',
    time: '07:03',
    title: 'Energy Points ⚡',
    body: 'Acupressure: Zu San Li + Bai Hui points',
    logCheck: ['am-2', 'acupressure']
  },
  {
    id: 'am-3',
    time: '07:05',
    title: 'Hydration Time 🍋',
    body: 'Morning lemon water - sip slowly',
    logCheck: ['am-3', 'lemon-water', 'hydration']
  },
  {
    id: 'am-4',
    time: '07:07',
    title: 'Light Up! ☀️',
    body: 'Open curtains, 5 deep breaths at window',
    logCheck: ['am-4', 'light-activation']
  },
  {
    id: 'am-5',
    time: '07:10',
    title: 'Movement Time! 🏊‍♀️',
    body: 'Pool, gym, or qi gong - pick what feels good today',
    logCheck: ['am-5', 'exercise', 'movement', 'pool', 'gym', 'qi-gong']
  },
  {
    id: 'am-6',
    time: '07:30',
    title: 'Skincare Ritual 🧴',
    body: 'Korean routine: Cleanse, tone, essence, moisturize, SPF',
    logCheck: ['am-6', 'am-skincare', 'skincare']
  },
  {
    id: 'am-7',
    time: '07:40',
    title: 'Mini Breakfast 🥚',
    body: 'Something tiny counts - even 5 almonds!',
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

  // EVENING ROUTINE - Each individual step
  {
    id: 'pm-1',
    time: '20:00',
    title: 'Tea Ceremony 🍵',
    body: 'Mindful tea prep - spearmint, chrysanthemum, or holy basil',
    logCheck: ['pm-1', 'tea', 'evening-tea', 'tea-ceremony']
  },
  {
    id: 'pm-2',
    time: '20:05',
    title: 'Oil Cleanse 🧼',
    body: 'Remove sunscreen and buildup - massage for 60 sec',
    logCheck: ['pm-2', 'oil-cleanse']
  },
  {
    id: 'pm-3',
    time: '20:07',
    title: 'Second Cleanse 💧',
    body: 'Water-based cleanser - rinse well',
    logCheck: ['pm-3', 'water-cleanse']
  },
  {
    id: 'pm-4',
    time: '20:08',
    title: 'Treatment Time 🌿',
    body: 'BHA on Tue/Fri, toner on other days',
    logCheck: ['pm-4', 'treatment', 'toner']
  },
  {
    id: 'pm-5',
    time: '20:10',
    title: 'Essence & Moisturize 💧',
    body: 'Snail mucin + moisturizer with upward strokes',
    logCheck: ['pm-5', 'essence', 'moisturizer']
  },
  {
    id: 'pm-6',
    time: '20:12',
    title: 'Gua Sha (Optional) 💆‍♀️',
    body: 'Face massage to reduce puffiness',
    logCheck: ['pm-6', 'gua-sha', 'face-massage']
  },
  {
    id: 'pm-7',
    time: '20:15',
    title: 'Supplements 💊',
    body: 'Magnesium, probiotic, NAC',
    logCheck: ['pm-7', 'supplements']
  },
  {
    id: 'pm-8',
    time: '20:16',
    title: 'Legs Up the Wall 🧘‍♀️',
    body: 'Final relaxation - 3 minutes to reduce swelling',
    logCheck: ['pm-8', 'legs-up', 'sleep-prep']
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
