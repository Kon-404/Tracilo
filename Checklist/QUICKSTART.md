# Quick Start Guide

Get the Checklist App running in under 5 minutes.

## Prerequisites

Ensure you have installed:
- Node.js 18.0+ ([Download](https://nodejs.org/))
- npm 9.0+ (comes with Node.js)

Verify installation:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
```

## Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- date-fns

### 2. Run Development Server

```bash
npm run dev
```

The app will start at **http://localhost:3000**

### 3. Open in Browser

Navigate to:
```
http://localhost:3000
```

You should see the home page with three template cards:
- 🚗 Vehicle Daily Checklist
- ☀️ Solar Installation Checklist
- 🔥 Gas Installation Checklist

## Testing the App

### Complete a Checklist

1. **Select a template** - Click any template card on the home page
2. **Fill in the form**:
   - All fields marked with * are required
   - Progress bar updates as you complete fields
   - Validation errors appear in real-time
3. **Submit** - Click "Submit Checklist" button
4. **View submission** - You'll be redirected to the submission detail page

### View Submissions

1. Click **"Submissions"** in the header
2. Browse all completed checklists
3. Filter by category (Vehicle, Solar, Gas)
4. Click any submission to view details

### Test Features

- ✅ **Progress tracking** - Watch the progress bar fill as you complete fields
- ✅ **Validation** - Try submitting without filling required fields
- ✅ **Different field types** - Test text, numbers, dropdowns, checkboxes, dates
- ✅ **Mobile responsiveness** - Resize browser or use DevTools mobile view
- ✅ **Print** - Open a submission and use browser print (Cmd/Ctrl + P)

## Mobile Testing

### Using Chrome DevTools

1. Open DevTools (F12 or Cmd+Opt+I)
2. Click the device toolbar icon (or Cmd+Shift+M)
3. Select a mobile device (e.g., iPhone 12)
4. Interact with the app using mobile viewport

### Using Real Device

1. Get your local IP address:
   ```bash
   # macOS/Linux
   ifconfig | grep inet

   # Windows
   ipconfig
   ```

2. Access from mobile device:
   ```
   http://[YOUR-IP]:3000
   ```
   Example: `http://192.168.1.100:3000`

3. Ensure your mobile device is on the same WiFi network

## Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript type checking
npm run type-check

# Run linting
npm run lint
```

## Project Structure Overview

```
checklist-app/
├── app/                    # Pages and routes
│   ├── page.tsx           # Home page (/)
│   ├── form/[id]/         # Form page (/form/:id)
│   └── submissions/       # Submissions pages
│
├── components/            # Reusable components
│   ├── TemplateCard.tsx  # Template card component
│   └── FormField.tsx     # Dynamic field renderer
│
├── data/                  # Template data
│   └── templates.ts      # Hard-coded templates
│
├── lib/                   # Utilities
│   ├── storage.ts        # localStorage utilities
│   └── pdf.ts            # PDF generation (stub)
│
├── types/                 # TypeScript types
│   └── index.ts          # All type definitions
│
└── docs/                  # Documentation
    └── architecture.md   # System architecture
```

## Common Issues

### Port 3000 already in use

```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Or use a different port
PORT=3001 npm run dev
```

### TypeScript errors

```bash
# Delete and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Build errors

```bash
# Run type check to see detailed errors
npm run type-check
```

## Data Storage

Currently, all data is stored in **browser localStorage**:
- Key: `checklist_submissions`
- Contains array of all form submissions
- Persists across page refreshes
- Cleared when browser cache is cleared

To view stored data:
1. Open DevTools → Application tab
2. Expand Local Storage
3. Select `http://localhost:3000`
4. Look for `checklist_submissions`

To clear all submissions:
```javascript
// Run in browser console
localStorage.removeItem('checklist_submissions');
location.reload();
```

## Next Steps

### Customize Templates

Edit `data/templates.ts` to:
- Modify existing templates
- Add new sections
- Add new fields
- Change field configurations

### Add New Field Types

1. Update `FieldType` in `types/index.ts`
2. Add rendering logic in `components/FormField.tsx`
3. Update form submission logic if needed

### Implement PDF Export

See `lib/pdf.ts` for detailed implementation plan using `@react-pdf/renderer`.

### Add Authentication

See `docs/architecture.md` → Future Architecture section for NextAuth.js integration guide.

### Deploy to Production

**Vercel (Easiest):**
1. Push code to GitHub
2. Import to Vercel
3. Deploy automatically

**Other Hosts:**
```bash
npm run build
npm start
```

## Resources

- **Full Documentation**: See `README.md`
- **Architecture**: See `docs/architecture.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs

## Need Help?

- Check `README.md` for comprehensive documentation
- Review `docs/architecture.md` for design decisions
- Examine code comments for inline explanations
- All components and functions are fully documented with JSDoc

---

**Enjoy building with Checklist App! 🚀**
