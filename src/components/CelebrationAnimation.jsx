import { useEffect } from 'react'
import './CelebrationAnimation.css'

function CelebrationAnimation({ message = 'Great job!', onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="celebration-overlay">
      <div className="celebration-content">
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="confetti" style={{
              '--delay': `${Math.random() * 0.5}s`,
              '--x': `${Math.random() * 100 - 50}vw`,
              '--rotation': `${Math.random() * 360}deg`,
              '--color': ['#6366f1', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)]
            }} />
          ))}
        </div>
        <div className="celebration-emoji">🎉</div>
        <div className="celebration-message">{message}</div>
      </div>
    </div>
  )
}

export default CelebrationAnimation
