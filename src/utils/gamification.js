// Gamification system

export const badges = [
  { id: 'pool-warrior', name: 'Pool Warrior', emoji: '🏊‍♀️', requirement: 'exercised pool 5 times' },
  { id: 'tea-master', name: 'Tea Master', emoji: '🍵', requirement: 'logged tea 14 days' },
  { id: 'streak-7', name: 'Week Warrior', emoji: '🔥', requirement: '7-day streak' },
  { id: 'streak-30', name: 'Month Master', emoji: '⭐', requirement: '30-day streak' },
  { id: 'morning-routine', name: 'Morning Champion', emoji: '🌅', requirement: 'morning routine 10 times' },
  { id: 'self-care', name: 'Self-Care Star', emoji: '🧴', requirement: 'skincare 14 days' },
  { id: 'hydration-hero', name: 'Hydration Hero', emoji: '💧', requirement: '50 glasses water logged' },
  { id: 'rest-master', name: 'Rest Master', emoji: '😴', requirement: 'used streak freeze wisely' }
]

export const getDailyQuests = () => {
  const today = new Date().toISOString().split('T')[0]
  const savedQuests = localStorage.getItem(`quests-${today}`)

  if (savedQuests) {
    return JSON.parse(savedQuests)
  }

  // Generate 3 random simple quests
  const allQuests = [
    { id: 'water', text: 'Log 4 glasses of water', emoji: '💧', goal: 4, type: 'count' },
    { id: 'breakfast', text: 'Eat breakfast (anything!)', emoji: '🥚', goal: 1, type: 'log' },
    { id: 'exercise', text: 'Move your body for 10 minutes', emoji: '🏊‍♀️', goal: 1, type: 'log' },
    { id: 'tea', text: 'Have your spearmint tea', emoji: '🍵', goal: 1, type: 'log' },
    { id: 'skincare', text: 'Complete skincare routine', emoji: '🧴', goal: 1, type: 'log' },
    { id: 'rest', text: 'Get 7+ hours sleep', emoji: '😴', goal: 1, type: 'log' }
  ]

  // Pick 3 random quests
  const shuffled = allQuests.sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 3).map(q => ({ ...q, completed: false }))

  localStorage.setItem(`quests-${today}`, JSON.stringify(selected))
  return selected
}

export const checkQuestProgress = (quests, logs) => {
  return quests.map(quest => {
    if (quest.type === 'count') {
      // Count specific logs
      const count = logs.filter(log => log.itemId === quest.id).length
      return { ...quest, progress: count, completed: count >= quest.goal }
    } else {
      // Just check if logged
      const logged = logs.some(log => log.itemId === quest.id)
      return { ...quest, completed: logged }
    }
  })
}

export const getStreakFreezes = () => {
  const freezes = JSON.parse(localStorage.getItem('streakFreezes') || '[]')
  const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM

  // Filter to current month
  const monthFreezes = freezes.filter(f => f.startsWith(currentMonth))

  return {
    used: monthFreezes.length,
    remaining: Math.max(0, 2 - monthFreezes.length)
  }
}

export const useStreakFreeze = () => {
  const today = new Date().toISOString().split('T')[0]
  const freezes = JSON.parse(localStorage.getItem('streakFreezes') || '[]')

  if (!freezes.includes(today)) {
    freezes.push(today)
    localStorage.setItem('streakFreezes', JSON.stringify(freezes))
    return true
  }

  return false
}

export const getEarnedBadges = () => {
  const logs = JSON.parse(localStorage.getItem('quickLogs') || '{}')
  const earned = []

  // Calculate stats
  const allLogs = Object.values(logs).flat()
  const poolExercises = allLogs.filter(l => l.itemId === 'exercise' && l.note?.includes('pool')).length
  const teaDays = Object.keys(logs).filter(date =>
    logs[date].some(l => l.itemId === 'spearmint-tea' || l.itemId === 'evening-tea')
  ).length
  const skincareDays = Object.keys(logs).filter(date =>
    logs[date].some(l => l.itemId === 'skincare-am' || l.itemId === 'skincare-pm')
  ).length
  const waterTotal = allLogs.filter(l => l.itemId === 'water').length

  // Calculate streak
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

  // Check badge requirements
  if (poolExercises >= 5) earned.push(badges.find(b => b.id === 'pool-warrior'))
  if (teaDays >= 14) earned.push(badges.find(b => b.id === 'tea-master'))
  if (streak >= 7) earned.push(badges.find(b => b.id === 'streak-7'))
  if (streak >= 30) earned.push(badges.find(b => b.id === 'streak-30'))
  if (skincareDays >= 14) earned.push(badges.find(b => b.id === 'self-care'))
  if (waterTotal >= 50) earned.push(badges.find(b => b.id === 'hydration-hero'))

  return earned.filter(Boolean)
}

export const getWellnessPetStatus = () => {
  const logs = JSON.parse(localStorage.getItem('quickLogs') || '{}')
  const last7Days = []

  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateKey = date.toISOString().split('T')[0]
    last7Days.push(logs[dateKey] || [])
  }

  const totalLogs = last7Days.reduce((sum, dayLogs) => sum + dayLogs.length, 0)
  const avgPerDay = totalLogs / 7

  // Determine pet health based on consistency
  if (avgPerDay >= 8) {
    return { status: 'thriving', emoji: '🌟', message: 'Your wellness pet is thriving!' }
  } else if (avgPerDay >= 5) {
    return { status: 'healthy', emoji: '💚', message: 'Your wellness pet is healthy!' }
  } else if (avgPerDay >= 3) {
    return { status: 'okay', emoji: '💛', message: 'Your wellness pet needs attention' }
  } else {
    return { status: 'needs-care', emoji: '🧡', message: 'Your wellness pet needs care' }
  }
}
