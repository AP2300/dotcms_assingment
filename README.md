# DotCMS Next.js Travel Website Assignment

A modern travel website built with Next.js, TypeScript, and DotCMS. Includes blog search, activity cards, products, YouTube videos, and full accessibility support.

---

## 📋 Table of Contents

- [Setup Instructions](#setup-instructions)
- [Architecture Decisions](#architecture-decisions)
- [Design & Styling](#design--styling)
- [Development Notes](#development-notes)
- [Future Improvements](#future-improvements)
- [Accessibility](#accessibility)
- [Tech Stack](#tech-stack)

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- DotCMS access

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd dotcms_assingment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root with:

   ```env
   # DotCMS Configuration
   NEXT_PUBLIC_DOTCMS_AUTH_TOKEN=your_auth_token_here
   NEXT_PUBLIC_DOTCMS_HOST=https://your-dotcms-instance.com
   NEXT_PUBLIC_DOTCMS_SITE_ID=your_dot_cms_site_id
   NEXT_PUBLIC_DOTCMS_MODE=production
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Go to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🏗️ Architecture Decisions

### Implementation Choice

Recreated the DotCMS demo homepage as a foundation. This gave clear design direction and great pre-existing content structure to work with, letting me focus on desing, implementation quality like animations, accessibility, and type safety.

### Component Structure Approach

Modular, type-safe architecture with clear separation of concerns:

```
src/
├── components/           # UI components
│   ├── Button.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── blog-components/  # Blog stuff
│   │   ├── BlogCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── LoadingState.tsx
│   │   └── ErrorState.tsx
│   └── content-types/    # DotCMS content types
│       ├── Activity.tsx
│       ├── Product.tsx
│       ├── YouTube.tsx
│       ├── Hero.tsx
│       └── index.ts
├── types/                # TypeScript definitions
├── views/                # Page components
├── hooks/                # Custom React hooks
└── utils/                # Utility functions
```

**Key Decisions:**

1. **Centralized Type System** - All types organized in `src/types/` for easy maintenance.

2. **Component Registry Pattern** - Content types registered in `src/components/content-types/index.ts` for dynamic rendering.

3. **Custom Hooks** - `useDebounce` for search, `useInfiniteScroll` for pagination.

4. **Atomic Design** - Built from small reusable pieces up to larger compositions.

### Content Types Used

1. **Activity** - Expandable cards with images and descriptions
2. **Product** - E-commerce display with "Add to Cart" and details
3. **Blog** - Article previews with author, date, and featured images
4. **YouTube** - Embedded videos with play detection
5. **Banner/Hero** - Full-width hero sections with CTAs

### UVE (Universal Visual Editor) Integration

The UVE integration was tricky, requiring careful attention to component structure and DotCMS config.

**Approach:**
- Built components first, tested them, then added UVE functionality
- Followed the official DotCMS React SDK docs and cross-referenced the starter demo
- Used `NEXT_PUBLIC_DOTCMS_MODE` to switch between preview/production rendering

**The Main Issue:**
Got a persistent "UVE Subscription: Not running inside UVE" warning even after verifying everything:
- Correct hook usage with `useEditableDotCMSPage`
- Proper component registration
- Environment variables all set
- DotCMS instance settings configured

This warning stays even though the editing functionality works. Likely a timing/initialization thing that doesn't affect functionality.

### Patterns Followed from Example

Used the DotCMS starter example as a reference for SDK patterns:

- **Layout Structure** - Followed `DotCMSLayoutBody` pattern for dynamic rendering with header/main/footer sections
- **Data Fetching** - Used example's GraphQL patterns as a starting point, adapted for additional fields
- **Component Registry** - Mirrored the `contentTypesComponents` object pattern
- **Routing** - Used catch-all routes `[[...slug]]` for handling all DotCMS pages

**Key Enhancements:**
- Centralized type system in `src/types/`
- Comprehensive WCAG 2.1 AA accessibility
- Framer Motion animations with scroll effects
- Custom UI components (Button, LoadingState, ErrorState)
- Blog search with debouncing
- Image fallbacks and error handling

---

## 🎨 Design & Styling

### Responsive Approach

Mobile-first with these breakpoints:
- **sm:** 640px - Small tablets
- **md:** 768px - Tablets  
- **lg:** 1024px - Small laptops
- **xl:** 1280px - Desktops
- **2xl:** 1536px - Large screens

Uses flexible grids, Tailwind responsive utilities, and conditional animations based on screen size.

### Design Decisions Made

**Modern dark mode with glassmorphism effects:**

- **Color Scheme** - Deep black background (#121212) for a calm, professional look
- **Typography** - Readex Pro for clean, modern feel
- **Animations** - Framer Motion with scroll-based effects, viewport triggers, stagger animations
- **Cards** - Uniform spacing, expandable hover states, image-first design
- **Visual Hierarchy** - High contrast borders, glass effects, gradient overlays, generous whitespace

**Technical Choices:**
- Custom Framer Motion animations with scroll detection
- Tailwind CSS with custom extensions
- Next.js image optimization with DotCMS loader
- Dark theme with WCAG AA contrast ratios

### Accessibility Considerations

✅ WCAG 2.1 Level AA compliant

- Keyboard navigation (Tab, Enter, Space, Escape)
- Screen reader support with ARIA labels and semantic HTML
- Focus management with visible indicators
- Reduced motion support
- High contrast (4.5:1 minimum)
- Descriptive alt text
- Skip navigation link
- Form accessibility with labels and error handling

---

## 📝 Development Notes

### Challenges Faced

**Main challenges were architectural and structural:**

1. **Understanding DotCMS SDK** - The SDK is comprehensive but initially confusing with multiple components and hooks. Solved by studying the starter example and cross-referencing the docs. Built a minimal test implementation first.

2. **Responsiveness & DOM Constraints** - The `DotCMSLayoutBody` renders layout based on CMS config, so I couldn't customize the component tree. Worked within constraints using Tailwind utilities, CSS Grid/Flexbox, and Framer Motion's media query detection instead of fighting the system.

3. **Empty GraphQL Results** - Blog queries returned nothing at first. Debugged by testing queries in the GraphQL Explorer, analyzing the example project, and gradually building up complexity. Key learning: test queries in isolation before integration.

### Most Helpful Documentation

**DotCMS React SDK documentation** was the foundation for everything.

- Comprehensive setup and configuration
- Full code examples for components and data fetching
- Cross-referenced links for UVE, GraphQL, and content types

**Other helpful resources:**
- Next.js 15 App Router docs for async/await patterns
- DotCMS GraphQL docs for query optimization

### Questions for the Team

1. **Collection Query Best Practices** - Preferred approach for querying collections? Separate queries for each type or batch queries together?

2. **Layout System Internals** - How does `DotCMSLayoutBody` work under the hood? Performance considerations for deeply nested layouts?

### Assumptions Made

1. **Content Consistency** - Assumed all content types return data in consistent formats from the API. If they vary in production, we'd need runtime validation and type guards.

2. **Structure Stability** - Assumed content modeling wouldn't change frequently. If it does, we'd need migration utilities.

3. **Technical Assumptions** - All pages follow header/main/footer layout, components are registered before rendering, and the DotCMS instance is always accessible.

---

## 🚀 Future Improvements

### What you'd do with more time

1. **Server-Side Search** - Move from client-side to DotCMS GraphQL filtering
2. **Infinite Scroll** - Complete the `useInfiniteScroll` hook integration
3. **More Content** - Add store pages, full blog page, and additional content types
4. **Testing** - Add Jest, React Testing Library, and Playwright tests

### Trade-offs Made

1. **Content Type Coverage vs. Quality** - Focused on perfecting a smaller set of content types with polished features (animations, accessibility) rather than many types with basic functionality.

2. **Query Understanding vs. Features** - Spent time debugging GraphQL queries, which was valuable for learning but meant less time for additional pages and features.

3. **Type Safety vs. Speed** - Invested in a comprehensive TypeScript system, which improved quality but slowed initial development.


### Refactoring Priorities

1. **API Abstraction** - Create a service layer for all DotCMS API calls with consistent error handling
2. **Component Composition** - Break down large components into smaller, testable pieces
3. **State Management** - Consider Zustand or Context API for global state instead of prop drilling
4. **Error Boundaries** - Add React error boundaries for component-level error handling

---

## 🛠️ Tech Stack

**Core:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

**DotCMS:**
- @dotcms/client
- @dotcms/react
- @dotcms/types
- @dotcms/uve

**Other:**
- Framer Motion (animations)
- ESLint
- PostCSS

---

**Built with ❤️ for the DotCMS Assignment**

