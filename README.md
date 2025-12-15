# maneuver-core

**A year-agnostic framework for building FRC scouting apps**

`maneuver-core` is the foundational framework that powers multi-year FRC scouting applications. It provides all the infrastructure you need—offline-first PWA capabilities, data transfer, match validation, and more—while remaining completely game-agnostic.

## ��� What is this?

Every year, FRC teams face the same problem: rebuilding their scouting app from scratch for the new game. `maneuver-core` solves this by separating the **framework** (year-agnostic) from the **game logic** (year-specific).

**You build once, adapt annually.**

## ���️ Architecture

```
┌─────────────────────────────────────┐
│         maneuver-core               │  ← This repository
│  (Framework - year-agnostic)        │
│  • Database (Dexie/IndexedDB)       │
│  • PWA Infrastructure               │
│  • Data Transfer (QR, WebRTC)       │
│  • UI Components (shadcn/ui)        │
│  • Routing & Navigation             │
│  • TBA Integration                  │
└─────────────────────────────────────┘
              ↓ implements
┌─────────────────────────────────────┐
│       maneuver-YYYY                 │  ← Your game implementation
│  (Game-specific logic)              │
│  • GameConfig (scoring constants)   │
│  • ScoutingEntry (data structure)   │
│  • ScoringCalculations              │
│  • ValidationRules                  │
│  • StrategyAnalysis                 │
│  • UIComponents                     │
└─────────────────────────────────────┘
```

## ✨ Features

- **Offline-First PWA**: Works without internet, installs like a native app
- **Match Scouting**: Pre-match setup, auto, teleop, endgame screens
- **Pit Scouting**: Robot specifications and capabilities
- **Data Transfer**: QR codes and WebRTC peer-to-peer
- **Match Validation**: Compare scouted data against TBA official results
- **Team Statistics**: Averages, totals, performance analysis
- **Match Strategy**: Pre-match planning and robot selection
- **Pick List**: Alliance selection support
- **Scout Gamification**: Leaderboards and performance tracking
- **Dark Mode**: Full light/dark theme support
- **Responsive Design**: Works on tablets and phones

## ��� Quick Start

### Option 1: Use as Template (Recommended)

1. Click "Use this template" on GitHub
2. Create your `maneuver-2025` (or 2026, 2027, etc.) repository
3. Implement the 6 core interfaces for your game year
4. Deploy to Netlify/Vercel

### Option 2: Clone and Customize

```bash
# Clone the template
git clone https://github.com/ShinyShips/maneuver-core.git my-scouting-app
cd my-scouting-app

# Install dependencies
npm install

# Implement game interfaces (see docs/INTEGRATION_GUIDE.md)
# ...

# Start development server
npm run dev

# Build for production
npm run build
```

## ��� What You Need to Implement

To create a scouting app for your game year, implement these 6 interfaces:

### 1. **GameConfig** - Metadata & Scoring Constants
```typescript
export const gameConfig2025: GameConfig = {
  year: 2025,
  gameName: "Reefscape",
  scoring: {
    auto: { coralL4: 7, algaeNet: 4, /* ... */ },
    teleop: { coralL4: 5, algaeNet: 4, /* ... */ },
    endgame: { deepClimb: 12, /* ... */ },
  },
};
```

### 2. **ScoutingEntry** - Data Structure
```typescript
export interface ScoutingEntry2025 extends ScoutingEntryBase {
  autoCoralPlaceL4Count: number;
  teleopAlgaeNetCount: number;
  endgameAttempt: 'none' | 'park' | 'shallow' | 'deep';
  // ... your game-specific fields
}
```

### 3. **ScoringCalculations** - Point Calculations
```typescript
export const scoring2025: ScoringCalculations = {
  calculateAutoPoints(entry) { /* ... */ },
  calculateTeleopPoints(entry) { /* ... */ },
  calculateEndgamePoints(entry) { /* ... */ },
  calculateTotalPoints(entry) { /* ... */ },
};
```

### 4. **ValidationRules** - Match Validation
```typescript
export const validation2025: ValidationRules = {
  getDataCategories() { /* define categories */ },
  mapFieldsForValidation(entries, tbaData) { /* map fields */ },
  calculateAllianceScore(entries) { /* sum scores */ },
  validateTeamsInMatch(entries, tbaMatch) { /* check teams */ },
};
```

### 5. **StrategyAnalysis** - Statistics
```typescript
export const analysis2025: StrategyAnalysis = {
  calculateBasicStats(entries) {
    // Calculate averages, totals, etc.
  },
};
```

### 6. **UIComponents** - Game Screens
```typescript
export const components2025: GameUIComponents = {
  GameStartScreen,   // Starting position
  AutoScreen,        // Autonomous scouting
  ScoringScreen,     // Teleop scouting
  EndgameScreen,     // Endgame scouting
  ResultsScreen,     // Match summary
  TeamStatsDisplay,  // Team statistics page
};
```

## ��� Documentation

- **[Integration Guide](docs/INTEGRATION_GUIDE.md)** - Step-by-step implementation guide
- **[Framework Design](docs/FRAMEWORK_DESIGN.md)** - Interface specifications and contracts
- **[Architecture Strategy](docs/ARCHITECTURE_STRATEGY.md)** - Multi-year vision and decision framework
- **[API Reference](docs/API_REFERENCE.md)** - Complete API documentation

## ���️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Dexie.js (IndexedDB wrapper)
- **PWA**: Vite PWA plugin (service workers, offline support)
- **Data Transfer**: QR code generation/scanning + WebRTC
- **API**: The Blue Alliance (TBA) for match data
- **Deployment**: Netlify/Vercel (static hosting)

## ��� For Teams

### Why Use maneuver-core?

1. **Save Development Time**: Don't rebuild from scratch every year
2. **Proven Architecture**: Battle-tested offline-first design
3. **Easy Customization**: Just implement game-specific logic
4. **Professional Quality**: Production-ready PWA with all features
5. **Community Support**: Used by multiple teams, actively maintained

### Adapting for 2026+

When the new game is announced:

1. Fork/clone `maneuver-core`
2. Create your 6 game interfaces
3. Build your game-specific UI components
4. Test and deploy

## ��� Contributing

Contributions to the core framework are welcome! Please:

1. Keep changes **game-agnostic** (no 2025/2026 specific logic)
2. Maintain backward compatibility with existing interfaces
3. Add tests for new features
4. Update documentation

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## ��� License

MIT License - feel free to use, modify, and distribute.

## ��� Credits

Developed by **Andy Nguyen (ShinyShips) - FRC Team 3314 Alumni and Strategy Mentor)** for the FRC community.

Special thanks to:
- The Blue Alliance for their excellent API
- All the open-source libraries that make this possible
- FRC teams who provided feedback and testing

## ��� Support

- **Issues**: [GitHub Issues](https://github.com/ShinyShips/maneuver-core/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ShinyShips/maneuver-core/discussions)

---

**Built for extensibility, designed for simplicity.** ���
