# 📺 Angular TVMaze Show Explorer

This is a modern, performant Angular 19 app built as a frontend test assignment. It provides a smooth and scalable interface to explore TV shows using the [TVMaze API](https://www.tvmaze.com/api#show-index).

---

## 🚀 Features

- 🔍 **Search and browse TV shows** using the TVMaze API.
- ⚡ **CDK Virtual Scrolling** for rendering large lists efficiently.
- 🧠 **Lazy loading** of heavy components (details, all-shows).
- 💡 **Skeleton loaders & fallback images** to prevent UI flickering.
- 🎨 **Modern design** with semantic HTML, polished CSS, and mobile responsiveness.
- 📦 **Angular 19 Standalone Components** + Signals (future-ready architecture).
- 🌐 **Routing with lazy loading**, fallback route handling.
- 🔒 Safe HTML rendering and DOM sanitation.

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── features/                # Feature components (shows, all-shows, show-details)
│   ├── shared/                  # Reusable components, constants, styles
│   ├── models/                  # Typed interfaces for API models
│   ├── services/                # API integration with TVMaze
│   └── app.routes.ts           # Route config with lazy loading
├── assets/                     # Static assets (if any)
└── styles/
    └── global_styles.css       # App-wide styles
```

---

## 🧱 Core Components

| Component              | Purpose                                                   |
|------------------------|-----------------------------------------------------------|
| `ShowCardComponent`    | Displays each show card with summary, rating, and fallback handling. |
| `AllShowsComponent`    | Uses virtual scroll to render all shows efficiently.       |
| `ShowDetailsComponent` | Detailed view with cast, metadata, and full description.   |
| `ShowListComponent`    | Handles show list rendering with infinite scroll.          |
| `ShowsComponent`       | Main home/search page (default route).                    |

---

## 📡 API Used

- **TVMaze Shows Index**  
  `https://api.tvmaze.com/shows?page=N`

- **TVMaze Show Details**  
  `https://api.tvmaze.com/shows/:id?embed=cast`

---

## 💄 UI Design Notes

- **Component-specific CSS**: Scoped styles per component.
- **Global styles** for layout, nav, cards, loading/error states.
- **Transparent background effects** using `rgba()` and `backdrop-filter`.
- **Responsive layout** with flexbox and media queries.

---

## 🧪 Testing

> Test coverage is set up for core components. Example tests include:
- ShowCard renders title and fallback image
- ShowDetails correctly loads and sanitizes summary

---

## 🏁 Run Locally

```bash
# Install dependencies
npm install

# Run dev server
ng serve
```

Open `http://localhost:4200` in your browser.

---

### 💡 Future Enhancements (Ideas Documented in Code)

There's always room for improvement — including enhanced accessibility, refined layout structure, and more visually appealing styling using modern CSS practices and design systems.
- 🧱 **UI design and layout structure can be further refined** to improve visual hierarchy, spacing, and overall aesthetics
- ♿ **Accessibility improvements** such as semantic HTML, ARIA labels, and keyboard navigation support to ensure the app is usable for everyone.
- 🧰 Unit testing support with Jest or Karma
- 🌙 Dark/Light theme toggle
- 🧩 UI component libraries (e.g., Angular Material, Tailwind)

**🎨 Styling Improvements (Future Scope):**

While the current app focuses on functionality and architecture, CSS can be further enhanced:
- ♻️ Create a **centralized SCSS variables file** for colors, spacing, and typography
- ✨ Use **CSS preprocessors** like SCSS to improve maintainability and reuse
- 🎯 Adopt utility-first styling with **TailwindCSS**
- 📚 Modularize styles per component and avoid redundant global styles
- 📱 Further polish for animations, transitions, and responsive design

---

## 👨‍💻 Author

**Nadeem Gori**  
Senior Frontend Developer  
Dubai, UAE  
[LinkedIn](https://www.linkedin.com/in/nadeemgori)

---

## 📃 License

This project is provided as part of a technical assessment and is not intended for production use.