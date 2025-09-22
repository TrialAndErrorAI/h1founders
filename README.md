# H1Founders Platform

Mental freedom for immigrant founders. Live at [h1founders.com](https://h1founders.com).

## Quick Start

### Prerequisites
- Node.js 18+
- Bun package manager
- Firebase CLI (for database management)

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/h1founders.git
cd h1founders

# Install dependencies
cd client
bun install

# Run development server
bun run dev
# Opens at http://localhost:5173

# Note: Firebase Auth doesn't work on localhost (domain restriction)
# Test auth features on production at h1founders.com
```

### Build for Production
```bash
cd client
bun run build
# Output in client/dist/
```

### Content Management
```bash
# Process markdown content to JSON
cd scripts
node build-content-index.js
# Generates client/src/data/contentIndex.json
```

## Project Structure
```
h1founders/
├── client/                 # React frontend app
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── pages/         # Route pages
│   │   ├── utils/         # Helper functions
│   │   └── data/          # Static data files
│   └── package.json       # Dependencies & scripts
├── content/               # Markdown content files
├── scripts/               # Build & utility scripts
├── docs/                  # Documentation
│   ├── CURRENT_STATE.md  # Live platform status
│   ├── ARCHITECTURE.md   # Technical decisions
│   └── ROADMAP.md        # Future plans
└── firestore.rules       # Database security rules
```

## Key Commands

### Development
```bash
cd client && bun run dev        # Start dev server
cd client && bun run build      # Build for production
cd client && bun run preview    # Preview production build
```

### Testing
```bash
npm run test:auth              # Run authentication tests
npm run test:auth:debug        # Debug mode with browser
npx playwright show-report     # View test results
```

### Firebase
```bash
firebase login                          # Authenticate CLI
firebase projects:list                  # List projects
firebase deploy --only firestore:rules  # Deploy rules
```

### Content Processing
```bash
node scripts/build-content-index.js    # Process markdown to JSON
```

### Git Workflow
```bash
git add .                              # Stage changes
git commit -m "Your message"          # Commit locally
git push origin master                 # Deploy (auto-triggers Cloudflare)
```

## Environment Variables

No `.env` file required for basic development. Firebase config is public and included in the source code.

For production deployment, Cloudflare Pages handles environment automatically.

## Authentication

The platform uses Firebase Phone Authentication:
1. User enters phone number
2. Firebase sends SMS with verification code
3. User enters code to complete sign-in
4. Profile automatically created/updated

**Note**: Phone auth only works on production domain (h1founders.com), not localhost.

## Badge System

Users progress through Matrix-themed levels:
- **BLUE_PILL**: Not yet registered
- **UNPLUGGED**: New members
- **FREED_MIND**: WhatsApp community members (792 verified)
- **NOMAD**: Active contributors
- **MORPHEUS**: Community guides
- **ORACLE**: Premium members
- **THE_ARCHITECT**: Platform creators

## Deployment

The platform auto-deploys to Cloudflare Pages when you push to the master branch:

```bash
git push origin master
# Automatically triggers deployment
# Live at h1founders.com within 2-3 minutes
```

## Security Notes

- Never commit sensitive data or API keys
- Firebase security rules expire Oct 8, 2025 (needs update)
- All user data is protected behind authentication
- Phone numbers are never exposed publicly

## Support & Documentation

- **Current Status**: See `docs/CURRENT_STATE.md`
- **Architecture**: See `docs/ARCHITECTURE.md`
- **Future Plans**: See `docs/ROADMAP.md`
- **Issues**: Create GitHub issue or contact team

## License

Proprietary - H1Founders Platform © 2025

---
Built with ❤️ for the H1B founder community