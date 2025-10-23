import { useState } from 'react'
import './SOSPage.css'

function SOSPage() {
  const [activeSection, setActiveSection] = useState(null)

  const sosOptions = [
    {
      id: 'cant-get-up',
      emoji: '🛏️',
      title: "Can't Get Up",
      color: '#8b5cf6',
      content: {
        type: 'routine',
        title: 'Modified Morning Routine',
        items: [
          '🌊 Stay in bed: Do ankle pumps & circles (1 min)',
          '💧 Keep water by bedside - just sip it',
          '☀️ Open curtains from bed if possible',
          '⏰ Set 5-minute timer, then reassess',
          '🥚 Grab a snack from nightstand (crackers, almonds)',
          '💪 Remember: Getting up counts as a win today'
        ]
      }
    },
    {
      id: 'nausea',
      emoji: '🤢',
      title: 'Nausea Bad',
      color: '#10b981',
      content: {
        type: 'list',
        title: 'Safe Foods & Tips',
        items: [
          '🍋 Sip lemon water very slowly',
          '🍘 Plain crackers (keep by bed)',
          '🫚 Ginger candy or ginger tea',
          '🍌 Small piece of banana',
          '🍚 Plain white rice when ready',
          '🥕 Cooked carrots (very gentle)',
          '🍗 Plain chicken breast (later)',
          '💊 Take B6 supplement if you have it',
          '❄️ Cold foods often easier (popsicles, cold water)'
        ]
      }
    },
    {
      id: 'joint-pain',
      emoji: '🦴',
      title: 'Joint Pain',
      color: '#f59e0b',
      content: {
        type: 'exercises',
        title: 'Gentle Movement Options',
        items: [
          '❄️ Ice for 10 minutes first',
          '🏊‍♀️ Pool walking (water supports joints)',
          '🧘 Qi Gong - "Lifting the Sky" (very gentle)',
          '🔄 Ankle/wrist circles in bed',
          '🦵 Gentle leg slides on bed',
          '💪 Isometric holds (no movement, just squeeze)',
          '🚫 SKIP any exercise that hurts',
          '🩹 KT tape or compression if available',
          '⏸️ Rest is productive today'
        ]
      }
    },
    {
      id: 'stressed',
      emoji: '😰',
      title: 'Stressed AF',
      color: '#ec4899',
      content: {
        type: 'meditation',
        title: '2-Minute Calm Down',
        items: [
          '👁️ Close your eyes',
          '4️⃣ Breathe in for 4 counts',
          '⏸️ Hold for 4 counts',
          '4️⃣ Breathe out for 4 counts',
          '⏸️ Hold for 4 counts',
          '🔁 Repeat 5 times',
          '🤲 Press Yin Tang point (between eyebrows) - 30 sec',
          '👂 Gentle earlobe pulls - 10 times',
          '🍵 Make tea mindfully after',
          '💭 Just this moment. Just this breath.'
        ]
      }
    },
    {
      id: 'crohns-flare',
      emoji: '🔥',
      title: "Crohn's Flare",
      color: '#ef4444',
      content: {
        type: 'protocol',
        title: 'Flare Day Protocol',
        items: [
          '🍚 White rice only',
          '🥕 Well-cooked carrots',
          '🍗 Plain chicken breast',
          '🥚 Scrambled eggs (plain)',
          '🍜 Clear bone broth',
          '🚫 NO fermented foods today',
          '🚫 NO kimchi or spicy foods',
          '🚫 NO raw vegetables',
          '💊 Take medications as prescribed',
          '💧 Hydrate constantly',
          '🛏️ Extra rest is medicine',
          '📞 Call doctor if severe'
        ]
      }
    },
    {
      id: 'no-energy',
      emoji: '😴',
      title: 'No Energy',
      color: '#6366f1',
      content: {
        type: 'minimal',
        title: 'Bare Minimum Routine',
        items: [
          '💧 Drink water (even just 4 oz)',
          '🍋 Lemon water if you can',
          '🧴 Splash face, moisturizer, SPF (1 min)',
          '🥚 Eat ANYTHING small (5 almonds counts)',
          '🚶 Walk to mailbox OR 2-min stretch',
          '🧼 Evening: Oil cleanse, moisturizer',
          '✅ That\'s it. This IS enough today.',
          '💪 You did something. That\'s a win.',
          '🌙 Tomorrow is a new day'
        ]
      }
    }
  ]

  const quickWins = [
    { emoji: '💧', text: 'Drank 1 glass of water', points: 10 },
    { emoji: '🚿', text: 'Took a shower', points: 20 },
    { emoji: '🧴', text: 'Applied sunscreen', points: 15 },
    { emoji: '🍋', text: 'Had lemon water', points: 15 },
    { emoji: '🥚', text: 'Ate something (anything)', points: 20 },
    { emoji: '🚶', text: 'Walked 2 minutes', points: 10 },
    { emoji: '😴', text: 'Rested without guilt', points: 25 },
    { emoji: '📱', text: 'Asked for help', points: 30 },
    { emoji: '🧘', text: '5 deep breaths', points: 10 },
    { emoji: '☀️', text: 'Opened curtains', points: 5 }
  ]

  const emergencyMeals = [
    {
      emoji: '🥚',
      name: 'Scrambled Egg',
      time: '3 min',
      description: 'Just egg + salt. Protein = win.'
    },
    {
      emoji: '🍌',
      name: 'Banana + Almond Butter',
      time: '1 min',
      description: 'Quick energy, easy digestion'
    },
    {
      emoji: '🥣',
      name: 'Overnight Oats',
      time: '0 min',
      description: 'Made yesterday? Perfect.'
    },
    {
      emoji: '🍜',
      name: 'Instant Bone Broth',
      time: '2 min',
      description: 'Hot water + broth powder'
    },
    {
      emoji: '🥜',
      name: '5 Almonds',
      time: '0 min',
      description: 'Literally 5. That counts.'
    },
    {
      emoji: '🍞',
      name: 'Toast + Avocado',
      time: '3 min',
      description: 'Simple, satisfying, done'
    }
  ]

  const whyReminders = [
    "You deserve to feel better",
    "Your body is healing, even on hard days",
    "Small steps are still steps forward",
    "Rest is part of the routine",
    "You're doing this for future you",
    "Progress isn't always visible",
    "Your effort matters, even when tiny",
    "You're stronger than you think"
  ]

  const [currentWhy] = useState(whyReminders[Math.floor(Math.random() * whyReminders.length)])

  const handleSOSClick = (id) => {
    setActiveSection(activeSection === id ? null : id)
  }

  return (
    <div className="sos-page">

      {/* Header */}
      <header className="sos-header">
        <h1 className="page-title">SOS Center</h1>
        <div className="header-subtitle">
          When you're struggling - we've got you
        </div>
      </header>

      {/* Your Why */}
      <div className="why-card">
        <div className="why-icon">💝</div>
        <p className="why-text">{currentWhy}</p>
      </div>

      {/* SOS Buttons */}
      <section className="sos-buttons-section">
        <h2 className="section-title">What's Going On?</h2>
        <div className="sos-buttons-grid">
          {sosOptions.map(option => (
            <button
              key={option.id}
              className={`sos-button ${activeSection === option.id ? 'active' : ''}`}
              style={{ '--sos-color': option.color }}
              onClick={() => handleSOSClick(option.id)}
            >
              <span className="sos-emoji">{option.emoji}</span>
              <span className="sos-title">{option.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Active Section Content */}
      {activeSection && (
        <section className="sos-content">
          {sosOptions.find(opt => opt.id === activeSection)?.content && (
            <div className="content-card">
              <h3 className="content-title">
                {sosOptions.find(opt => opt.id === activeSection).content.title}
              </h3>
              <ul className="content-list">
                {sosOptions.find(opt => opt.id === activeSection).content.items.map((item, index) => (
                  <li key={index} className="content-item">
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className="close-content-btn"
                onClick={() => setActiveSection(null)}
              >
                ✓ Got it
              </button>
            </div>
          )}
        </section>
      )}

      {/* Emergency Meals */}
      <section className="emergency-meals-section">
        <h2 className="section-title">Emergency Meals (When Cooking = Impossible)</h2>
        <div className="meals-grid">
          {emergencyMeals.map((meal, index) => (
            <div key={index} className="meal-card">
              <div className="meal-emoji">{meal.emoji}</div>
              <div className="meal-info">
                <div className="meal-name">{meal.name}</div>
                <div className="meal-time">⏱️ {meal.time}</div>
                <div className="meal-description">{meal.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Wins */}
      <section className="quick-wins-section">
        <h2 className="section-title">Quick Wins (Every Tiny Thing Counts)</h2>
        <p className="wins-subtitle">
          Check off anything you did today. Seriously, anything.
        </p>
        <div className="wins-grid">
          {quickWins.map((win, index) => (
            <div key={index} className="win-item">
              <span className="win-emoji">{win.emoji}</span>
              <span className="win-text">{win.text}</span>
              <span className="win-points">+{win.points}</span>
            </div>
          ))}
        </div>
        <div className="wins-message">
          <p>Every single one of these is a victory. 🏆</p>
          <p>On hard days, survival = success.</p>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="crisis-section">
        <h2 className="section-title">If You Need More Help</h2>
        <div className="crisis-card">
          <p className="crisis-text">
            💚 It's okay to not be okay
          </p>
          <p className="crisis-text">
            📞 Talk to your doctor if symptoms are severe
          </p>
          <p className="crisis-text">
            👥 Reach out to someone you trust
          </p>
          <p className="crisis-text">
            🌈 This moment is temporary
          </p>
        </div>
      </section>

    </div>
  )
}

export default SOSPage
