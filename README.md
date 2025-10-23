# Wellness Tracker App

A mobile-first React wellness tracking application designed for PCOS, Crohn's, Hypermobility, and ADHD management.

## Features

### Today Page (Home Screen)
- **Real-time clock** - Current time and date display
- **Weather widget** - Quick weather glance
- **Smart task reminders** - Shows your next task based on your wellness routine
- **Quick-log bubbles** - One-tap logging for:
  - 💧 Water intake (tap to increment)
  - 😊 Mood tracking (slider: 1-5)
  - ⚡ Energy levels (slider: 1-5)
  - 🏊‍♀️ Exercise completion (tap to mark done)
- **Visual progress rings** - Beautiful circular progress indicators
- **Motivational messages** - Daily encouragement

## Design Features

✅ **Mobile-first** - Optimized for phone screens (max-width: 428px)
✅ **Large touch targets** - 44px minimum (hypermobility-friendly)
✅ **Smooth animations** - Delightful micro-interactions
✅ **Visual feedback** - Clear button states and transitions
✅ **ADHD-friendly** - Minimal typing, visual-first design
✅ **Accessibility** - Reduced motion support, focus states

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with CSS variables
- **SVG** - Progress ring visualizations

## Customization

The app uses CSS variables for easy theming. Edit `src/index.css` to customize:

- Colors (primary, secondary, accent)
- Spacing
- Border radius
- Transitions

## Roadmap

- [ ] Add Routines page
- [ ] Add Quick Log page with more options
- [ ] Add Trends/Analytics page
- [ ] Add SOS page for difficult days
- [ ] Add dark mode
- [ ] Add offline support (PWA)
- [ ] Add voice logging
- [ ] Add notifications

## License

Private - For personal use
