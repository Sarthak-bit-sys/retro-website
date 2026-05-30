# 🖥️ Retro Terminal Portfolio

A stunning portfolio website with authentic retro computer/terminal aesthetic featuring:
- Classic green phosphor CRT display effects
- Boot sequence animation
- Scan lines and screen flicker
- Terminal-style command prompts
- ASCII art decorations
- Live system clock

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install
# or
yarn install

# Start development server
npm start
# or
yarn start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
retro-portfolio/
├── src/
│   ├── App.js              # Main app component
│   ├── App.css             # Retro terminal styling
│   ├── index.css           # Base styles with Tailwind
│   ├── mock.js             # Portfolio data (EDIT THIS!)
│   ├── components/
│   │   ├── Header.jsx      # Terminal header with live clock
│   │   ├── Hero.jsx        # Boot sequence + intro
│   │   ├── CaseStudies.jsx # Project showcase
│   │   ├── About.jsx       # Bio and skills
│   │   ├── Interests.jsx   # Hobbies section
│   │   └── Footer.jsx      # Contact footer
│   └── hooks/
│       └── use-toast.js    # Toast notifications
├── package.json
└── tailwind.config.js
```

## ✏️ Customization

### 1. Update Your Content

Edit `src/mock.js` to add your personal information:
- Name and title
- Projects/case studies
- Skills and experience
- Interests and hobbies
- Contact information

### 2. Change Colors

The default is classic green phosphor (#00ff41). To change:

**For amber/orange retro look:**
Find and replace in `App.css`:
- `#00ff41` → `#ffb000`

**For other colors:**
- Blue: `#00d4ff`
- Red: `#ff4136`
- Purple: `#b10dc9`

### 3. Adjust Flicker Duration

In `App.css` line 10:
```css
animation: flicker 0.15s 20, flicker-final 0.15s 3s forwards;
```
- Change `20` (number of flickers)
- Change `3s` (when to stabilize)

### 4. Modify Boot Sequence

In `src/components/Hero.jsx` lines 11-18, edit the boot messages:
```javascript
const sequences = [
  'YOUR CUSTOM MESSAGE...',
  'LOADING YOUR DATA...',
  // Add more messages
];
```

## 🎨 Key Features

- **CRT Effect:** Authentic screen flicker for 3 seconds on load
- **Scan Lines:** Horizontal lines overlay for CRT feel
- **Text Glow:** Green phosphor glow effect on text
- **Terminal Boxes:** Bordered containers with subtle glow
- **Custom Scrollbar:** Green-themed scrollbar
- **Live Clock:** Real-time system clock in header
- **Smooth Animations:** Boot sequence, hover effects, transitions
- **Responsive Design:** Works on mobile, tablet, and desktop

## 📦 Dependencies

All necessary dependencies are in `package.json`:
- React 19
- Tailwind CSS
- Lucide React (icons)
- Shadcn/ui components

## 🛠️ Build for Production

```bash
npm run build
# or
yarn build
```

Creates optimized production build in `build/` folder.

## 📝 Notes

- The portfolio uses **mock data** from `mock.js`
- All images are from Unsplash (replace with your own)
- Icons use lucide-react (no emojis)
- Monospace font: Courier New
- Background color: #0a0e0a (dark green-black)
- Primary color: #00ff41 (terminal green)

## 🎯 Tips

1. **Performance:** The flicker effect runs only once for optimal performance
2. **Accessibility:** Ensure sufficient color contrast if changing colors
3. **Images:** Use high-quality project screenshots
4. **Content:** Keep descriptions concise and impactful
5. **Testing:** Test on different screen sizes

## 📧 Support

For questions or issues, feel free to reach out!

---

**Built with ❤️ using React and retro vibes**

*"Welcome to the matrix... of your portfolio"* 🖥️
