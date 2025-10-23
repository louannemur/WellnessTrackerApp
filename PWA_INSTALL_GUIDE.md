# 📱 Installing Wellness Tracker on iPhone

## How to Install as a PWA (Progressive Web App)

Your Wellness Tracker app works as a **Progressive Web App**, which means you can install it on your iPhone home screen and use it just like a native app - even offline!

### Step-by-Step Installation on iPhone

1. **Open Safari** on your iPhone
   - This app works best with Safari on iOS
   - Navigate to your app URL (e.g., `localhost:3000` for local, or your deployed URL)

2. **Tap the Share Button** (⎋)
   - Located at the bottom of Safari (or top on iPad)
   - It looks like a square with an arrow pointing up

3. **Scroll down and tap "Add to Home Screen"**
   - You'll see the app icon and name
   - You can edit the name if you want

4. **Tap "Add" in the top right**
   - The app will now appear on your home screen!

5. **Open the app from your home screen**
   - It will open in full-screen mode
   - No browser bars - just like a native app!

### 🔔 Setting Up Notifications

Once installed:

1. **Open the app from your home screen**

2. **Tap the notification bell (🔔)** in the top right of the Today page

3. **Tap "Enable Smart Notifications"**
   - iOS will ask for permission to send notifications
   - Tap "Allow"

4. **Test it works** by tapping "Send Test Notification"

5. **You're all set!** You'll receive gentle reminders:
   - 7:00 AM - Morning stretches
   - 7:45 AM - Breakfast reminder
   - 10:30 AM - Second breakfast
   - 3:00 PM - Snack time
   - 8:00 PM - Evening tea

### 🎯 Smart Notification Features

- **Only sends if you haven't logged the activity yet**
- Checks your Quick Log data before sending
- Won't spam you with unnecessary reminders
- Gentle, encouraging messages

### ⚡ PWA Benefits

✅ **Works Offline** - All your data is saved locally
✅ **Fast Loading** - Cached for instant access
✅ **Full Screen** - No browser UI, just your app
✅ **Home Screen Icon** - Quick access
✅ **Data Privacy** - Everything stays on your device
✅ **No App Store** - No download, no updates needed

### 📊 Data Storage

- All data is stored in your browser's `localStorage`
- Stays on your device - private and secure
- Syncs automatically as you use the app
- Won't be lost when you close the app

### 🔧 Troubleshooting

**Notifications not working?**
- Make sure you installed the app from the home screen (not using it in Safari)
- Check Settings > Notifications > Safari > Allow Notifications
- Try tapping the bell icon again to re-enable

**App not installing?**
- Make sure you're using Safari (not Chrome or Firefox)
- Try closing Safari and reopening
- Make sure you have iOS 11.3 or later

**Data not saving?**
- Check that you're not in Private Browsing mode
- Make sure you have storage space on your device
- Try clearing Safari cache and reinstalling

### 🌐 Deploying for Production

To use this on your actual iPhone (not just localhost):

1. Deploy the app to a hosting service:
   - **Vercel** (easiest): `npm run build` then deploy
   - **Netlify**: Connect your GitHub repo
   - **GitHub Pages**: Works great for static sites

2. Make sure your hosting supports:
   - HTTPS (required for service workers and notifications)
   - Service worker files in the root directory
   - manifest.json file

3. Access your deployed URL in Safari on your iPhone

4. Follow the installation steps above!

### 📝 Notes for iPhone

- Safari on iOS has some PWA limitations compared to Android
- Background notifications may not work as reliably as native apps
- The app will "sleep" after ~30 seconds in the background
- Notifications scheduled using `setTimeout` will fire when you reopen the app

### 🎉 Enjoy Your Wellness Tracker!

You now have a personal wellness companion right on your phone, ready to help you track your PCOS, Crohn's, hypermobility, and ADHD management - all with beautiful design and smart features!

Need help? Check the SOS page (🆘) for support on difficult days!
