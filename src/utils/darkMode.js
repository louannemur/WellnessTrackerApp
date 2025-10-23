// Dark mode utilities

export const initializeDarkMode = () => {
  // Check if user has a preference saved
  const savedMode = localStorage.getItem('darkMode')

  if (savedMode !== null) {
    return savedMode === 'true'
  }

  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true
  }

  return false
}

export const toggleDarkMode = (isDark) => {
  localStorage.setItem('darkMode', isDark.toString())

  if (isDark) {
    document.documentElement.classList.add('dark-mode')
  } else {
    document.documentElement.classList.remove('dark-mode')
  }
}

// Listen for system preference changes
export const watchSystemDarkMode = (callback) => {
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handler = (e) => {
      // Only update if user hasn't set a manual preference
      if (localStorage.getItem('darkMode') === null) {
        callback(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }

  return () => {}
}
