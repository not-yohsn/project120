# HESS Essay Scoring System - Complete System Documentation

HESS (High-Efficiency Student Scoring System) is a comprehensive Vue.js 3 web application designed for automated essay evaluation and scoring. Built with a modern tech stack including Vite, Vue Router, Pinia state management, and Vuetify UI components, the system provides educators with tools to manage students, submit essays, configure rubrics, and generate detailed performance reports.

## Project Overview

- **Framework**: Vue.js 3 (Composition API/Options API)
- **Build Tool**: Vite 7.1+
- **UI Framework**: Vuetify 3.10+ (Material Design components)
- **State Management**: Pinia 3.0+
- **Routing**: Vue Router 4.6+
- **HTTP Client**: Axios 1.13+
- **Charts & Analytics**: Chart.js 4.5+
- **Styling**: SASS with scoped CSS
- **Backend API**: REST API on `http://localhost:8000/api`
- **Node Version**: ^20.19.0 || >=22.12.0

## Complete Directory Structure

```
project120/
├── index.html                   # Entry HTML file with root #app div
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration with Vue plugin & path alias
├── jsconfig.json               # JavaScript project configuration
├── README.md                   # This comprehensive documentation
│
├── public/                      # Static assets (served as-is)
│
└── src/                        # Application source code
    ├── main.js                 # Application entry point (Vue app initialization)
    ├── App.vue                 # Root Vue component (app layout & routing outlet)
    │
    ├── views/                  # Full page components (one per route)
    │   ├── LoginView.vue       # Authentication/login interface
    │   └── MainApp.vue         # Main application shell with Sidebar/Header
    │
    ├── components/             # Reusable UI components
    │   ├── Sidebar.vue         # Left navigation menu
    │   ├── Header.vue          # Top application header bar
    │   ├── Dashboard.vue       # Dashboard with stats & recent submissions
    │   ├── UploadEssay.vue     # Essay file upload & metadata form
    │   ├── Students.vue        # Student list with search & management
    │   ├── Reports.vue         # Analytics & performance reports
    │   ├── RubricSettings.vue  # Rubric configuration & criteria editor
    │   ├── AccountSettings.vue # User profile & account settings
    │   └── HelpButton.vue      # Floating help/support button
    │
    ├── router/                 # Vue Router configuration
    │   └── index.js            # Route definitions & history mode setup
    │
    ├── api/                    # Backend API integration layer
    │   └── http.js             # Axios HTTP client instance
    │
    ├── styles/                 # Global styles
    │   └── global.css          # CSS variables, theme, resets
    │
    └── utils/                  # Utility functions & helpers
        └── dateFormatter.js    # Date/time formatting utilities
```

## Architecture Overview

### Data Flow Architecture

```
LoginView → Authentication
    ↓
MainApp (Layout Container)
    ├─→ Sidebar (Navigation)
    │   └─→ emits: update-nav
    ├─→ Header (Top Bar)
    │   └─→ emits: show-notifications
    └─→ Content Components (Dynamic based on active nav)
        ├─ Dashboard (receives: recentSubmissions)
        ├─ UploadEssay (receives: allStudents)
        ├─ Students (receives: allStudents)
        ├─ Reports (standalone analytics)
        ├─ RubricSettings (receives: rubricCriteria)
        └─ AccountSettings (receives: user)
```

## Core Application Files

### Entry Point

**`index.html`**
- Root HTML document with `<div id="app"></div>`
- Loads bundled Vue application

**`src/main.js`**
- Initializes Vue application instance
- Mounts Pinia store
- Registers Vue Router
- Initializes Vuetify Material Design framework
- Mounts app to DOM

### Root Components

**`App.vue`**
- Top-level application component
- Manages routing outlet (`<router-view>`)
- Conditional rendering of views based on route
- Manages global application state (user, notifications)

**`src/views/LoginView.vue`**
- Authentication interface
- User login form
- Route: `/`

**`src/views/MainApp.vue`**
- Main application layout container
- Integrates Sidebar, Header, and content area
- Route: `/mainapp`
- Manages active navigation state

## Component Documentation

### Layout Components

#### `Sidebar.vue`
- **Purpose**: Left navigation panel
- **Props**: 
  - `activeNav`: Current active section (String)
  - `navItems`: Array of navigation items
- **Emits**: `update-nav` (when navigation item clicked)
- **Features**: 
  - Menu items for all major sections
  - Active state highlighting
  - Responsive collapsible behavior

#### `Header.vue`
- **Purpose**: Top application header bar
- **Props**: 
  - `pageTitle`: Current page title (String)
  - `user`: User object {name, role, initials}
  - `hasNotifications`: Boolean for notification indicator
- **Emits**: `show-notifications` (notification icon clicked)
- **Features**: 
  - Page title display
  - User profile section
  - Notification indicator

### Feature Components

#### `Dashboard.vue`
- **Purpose**: Main dashboard with statistics and recent submissions
- **Props**: `recentSubmissions` (Array of submission objects)
- **Emits**: `navigate` (to change view)
- **Features**: 
  - Key statistics cards (total submissions, average scores, etc.)
  - Recent submissions list
  - Quick action buttons
  - Performance trend indicators

#### `UploadEssay.vue`
- **Purpose**: File upload interface with form for essay details
- **Props**: `allStudents` (Array of student objects)
- **State**: 
  - `uploadedFile`: Currently selected file
  - `formData`: {studentName, subject, topic}
  - `isDragging`: Drag-and-drop state
- **Features**: 
  - Drag-and-drop file upload
  - File type validation (JPG, PNG, PDF)
  - File size validation (max 10MB)
  - Student selection dropdown
  - Form submission validation

#### `Students.vue`
- **Purpose**: Student management interface
- **Props**: `allStudents` (Array of student objects)
- **State**: `studentSearch` (Search filter string)
- **Computed**: `filteredStudents` (filtered by search query)
- **Features**: 
  - Search/filter by name or email
  - Student list table
  - Add/edit/delete actions
  - Student statistics

#### `Reports.vue`
- **Purpose**: Analytics and performance reporting
- **State**: 
  - `reportFilters`: {dateRange, subject}
  - `trendPoints`: Chart data points
- **Features**: 
  - Date range filtering
  - Performance trend charts (Chart.js)
  - Statistics cards
  - Export reports
  - Subject breakdown analysis

#### `RubricSettings.vue`
- **Purpose**: Evaluation criteria configuration
- **Props**: `rubricCriteria` (Array of rubric objects)
- **Computed**: `totalWeight` (Sum of all criterion weights)
- **Features**: 
  - Add/edit rubric criteria
  - Weight management (must equal 100%)
  - Description & scoring levels
  - Drag-to-reorder
  - Validation feedback

#### `AccountSettings.vue`
- **Purpose**: User profile and security settings
- **Props**: `user` (User object)
- **State**: 
  - `accountData`: {name, email, institution}
  - `passwordData`: {oldPassword, newPassword, confirm}
- **Features**: 
  - Profile information editing
  - Password change form
  - Profile picture upload
  - Account preferences

#### `HelpButton.vue`
- **Purpose**: Floating help button
- **Emits**: `show-help`
- **Features**: 
  - Floating action button
  - Positioned fixed on screen
  - Opens help/support modal

## API Integration

### `src/api/http.js`
Axios HTTP client configuration:
```javascript
baseURL: "http://localhost:8000/api"
timeout: 5000
```

**Usage**: Import in components for API calls
```javascript
import http from '@/api/http'
http.post('/essays/upload', formData)
http.get('/students')
http.put('/rubrics/:id', rubricData)
```

## Utilities

### `src/utils/dateFormatter.js`
Date formatting helper functions:
- Format dates for display
- Parse date inputs
- Calculate date ranges for reports
- Timezone handling

## Routing Configuration

### `src/router/index.js`
Vue Router setup with two main routes:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | LoginView | User authentication |
| `/mainapp` | MainApp | Main application interface |

**History Mode**: Web history (default browser history)

## Build & Development

### Scripts

```bash
# Install dependencies
npm install

# Development server with hot-reload
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Development Environment

- **Vite Dev Server**: Hot Module Replacement (HMR) for instant updates
- **Vue DevTools**: Available in browser for component inspection
- **Source Maps**: Enabled for debugging
- **Path Alias**: `@` points to `src/` directory

## Key Features

- **Modular Architecture**: Components separated by responsibility
- **Props & Events**: Parent-child communication via props and custom events
- **Computed Properties**: Reactive derived state
- **Scoped Styles**: Component-specific CSS without conflicts
- **Form Validation**: Built-in validation for uploads and forms
- **Responsive Design**: Mobile-friendly grid layouts
- **Material Design**: Vuetify UI components for consistent UX
- **State Management**: Pinia for global state (user, notifications, etc.)
- **HTTP Integration**: Axios for backend communication
- **Charts & Analytics**: Chart.js for data visualization
- **Dark Mode Support**: Theme support via CSS variables
- **Accessibility**: WCAG 2.1 AA compliant design

## Design System

### Color Palette
- Primary: `#4285f4` (Google Blue)
- Success: `#34a853` (Google Green)
- Text Primary: `#1f2937` (Dark Gray)
- Text Secondary: `#6b7280` (Medium Gray)
- Background: `#ffffff` / `#0f172a` (dark)

### Spacing & Layout
- Border Radius: `8px`, `12px`
- Box Shadows: `0 1px 3px rgba(0,0,0,0.1)`
- Grid-based layouts with Vuetify

## Performance Considerations

- **Code Splitting**: Route-based lazy loading via Vue Router
- **Asset Optimization**: Vite minification and bundling
- **Caching**: Browser cache headers on static assets
- **API Timeout**: 5-second timeout on HTTP requests
- **Debouncing**: Search and filter operations debounced

## Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| vue | ^3.5.22 | Frontend framework |
| vue-router | ^4.6.3 | Client-side routing |
| pinia | ^3.0.4 | State management |
| vuetify | ^3.10.11 | UI component library |
| axios | ^1.13.2 | HTTP client |
| chart.js | ^4.5.1 | Data visualization |
| sass | ^1.94.2 | CSS preprocessing |
| vite | ^7.1.11 | Build tool |

## Development Workflow

1. **Setup**: Clone repo, run `npm install`
2. **Development**: Run `npm run dev`, navigate to `http://localhost:5173`
3. **Editing**: Components auto-reload with HMR
4. **Testing**: Write tests in `*.spec.js` files (when added)
5. **Build**: Run `npm run build` for production
6. **Deploy**: Output in `dist/` folder

## Future Enhancements

- [ ] Add authentication service (JWT tokens)
- [ ] Implement Pinia store modules
- [ ] Add unit & integration tests
- [ ] Add error boundary components
- [ ] Implement toast notifications
- [ ] Add file export (PDF, CSV)
- [ ] Real-time updates with WebSockets
- [ ] Backend service integration
- [ ] User role-based access control
- [ ] Essay preview/annotation viewer
- [ ] Bulk operations on students/essays
- [ ] Email notifications

## Configuration Files

**`vite.config.js`**
- Vue 3 SFC plugin
- Path alias `@` → `src`
- Vue DevTools plugin

**`jsconfig.json`**
- JavaScript language configuration
- Path mappings for IDE intellisense

## IDE Recommendations

- **VS Code** with [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (Vue official)
- Disable Vetur if previously installed
- ESLint & Prettier extensions for code quality

## Browser Support

- Chrome 51+
- Firefox 54+
- Safari 10+
- Edge 15+

Requires ES2020+ JavaScript support (no IE11)

## Troubleshooting

**Port 5173 already in use**: Change in vite.config.js
```javascript
export default defineConfig({
  server: { port: 5174 }
})
```

**API connection errors**: Verify backend running on `http://localhost:8000/api`

**Components not updating**: Check Vite dev server running, clear browser cache

## Contributing

- Follow Vue 3 Composition API patterns
- Use scoped styles for components
- Add descriptive prop validation
- Document complex component logic
- Test changes before committing
