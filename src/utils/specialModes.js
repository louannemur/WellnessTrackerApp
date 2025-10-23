// Special modes for different situations

export const checkStruggleBusMode = () => {
  const logs = JSON.parse(localStorage.getItem('quickLogs') || '{}')
  const today = new Date().toISOString().split('T')[0]
  const todayLogs = logs[today] || []

  const currentHour = new Date().getHours()

  // Activate if not logged by 10 AM
  if (currentHour >= 10 && todayLogs.length === 0) {
    return true
  }

  // Check low energy 3 days in a row
  const last3Days = []
  for (let i = 0; i < 3; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateKey = date.toISOString().split('T')[0]
    last3Days.push(logs[dateKey] || [])
  }

  // If very few logs in last 3 days
  const totalLogs = last3Days.reduce((sum, dayLogs) => sum + dayLogs.length, 0)
  if (totalLogs < 6) { // Less than 2 logs per day average
    return true
  }

  return false
}

export const getActiveModes = () => {
  const modes = {
    struggleBus: checkStruggleBusMode(),
    flare: localStorage.getItem('flareMode') === 'true',
    period: localStorage.getItem('periodMode') === 'true',
    morning: new Date().getHours() < 10
  }

  return modes
}

export const setFlareMode = (enabled) => {
  localStorage.setItem('flareMode', enabled.toString())
}

export const setPeriodMode = (enabled) => {
  localStorage.setItem('periodMode', enabled.toString())
}

export const getModeConfig = (modes) => {
  // Struggle Bus Mode takes priority
  if (modes.struggleBus) {
    return {
      name: 'Struggle Bus Mode',
      emoji: '🚌',
      color: '#8b5cf6',
      message: 'Today we focus on just existing. That\'s enough.',
      simplifiedRoutine: true,
      encouragingMessages: true
    }
  }

  // Flare Mode
  if (modes.flare) {
    return {
      name: 'Flare Mode',
      emoji: '🔥',
      color: '#ef4444',
      message: 'Safe foods only. Rest is medicine.',
      safeFood: true,
      gentleExercise: true
    }
  }

  // Period Mode
  if (modes.period) {
    return {
      name: 'Period Mode',
      emoji: '🌙',
      color: '#ec4899',
      message: 'Be extra gentle with yourself today.',
      ironRichFoods: true,
      gentleExercise: true,
      crampTracking: true
    }
  }

  // Morning Mode
  if (modes.morning) {
    return {
      name: 'Morning Mode',
      emoji: '🌅',
      color: '#f59e0b',
      message: 'Extra large buttons for foggy morning brain.',
      largeButtons: true
    }
  }

  return null
}
