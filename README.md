# Multi-Sport Timer Pro (Jiu-Jitsu Edition) 🥋🥊

**Professional Timer for Combat Sports | Timer Profissional para Esportes de Combate**

A complete, high-performance timer application designed for Jiu-Jitsu, Boxing, MMA, and Muay Thai. Built with a "Mobile First" philosophy, it offers specialized presets, a scoreboard system, and voice coaching.

> **Project Status**: Completed & Ready for Production (Web & Mobile Native)

## 🌟 Key Features (Funcionalidades)

### ⏱️ Adaptive Timer Modes
- **Standards Presets**: 
  - **Jiu-Jitsu**: 5min Round / 1min Rest (IBJJF Style)
  - **Boxing**: 3min Round / 1min Rest (12 Rounds/Pro Style)
  - **MMA**: 5min Round / 1min Rest (5 Rounds/Championship Style)
  - **Muay Thai**: 3min Round / 2min Rest
- **Special Modes**:
  - **Tabata**: 20s Work / 10s Rest (HIIT)
  - **EMOM**: Every Minute on the Minute
  - **Open Mat**: Progressive "Count-Up" timer

### 📲 Mobile Native & Web Hybrid
- **Web App**: Responsive React app (Vite) usable in any browser.
- **Mobile Native**: React Native (Expo) version included for APK generation with local database persistence.
- **Wake Lock**: Prevents screen dampening during training.

### 🧠 Smart Features
- **Voice Coach (pt-BR)**: Announces "Fight", "10 Seconds", "Rest" using native Text-to-Speech.
- **Scoreboard**: Track Points, Advantages, and Penalties.
- **Dynamic UI**: Interface adapts branding based on the selected sport (e.g., changes title to "BOXING TIMER").

## 🛠️ Tech Stack

### Web Version (`/root`)
- **React 19**
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Styling)
- **Lucide React** (Icons)
- **Web Speech API**

### Mobile Version (`/mobile`)
- **React Native (Expo)**
- **NativeWind** (Tailwind for Mobile)
- **AsyncStorage** (Local Persistence)
- **Expo Speech** & **Expo Keep Awake**

## 🚀 Getting Started

### Web (Browser)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```

### Mobile (Android/iOS)
1. Enter mobile directory:
   ```bash
   cd mobile
   ```
2. Run Expo:
   ```bash
   npx expo start
   ```
3. Scan QR code with Expo Go app or build APK with `eas build`.

---
**Author**: Renan Durval  
*Open Source for the Martial Arts Community*
