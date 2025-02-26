# 🎬 Streambuster - Movie Streaming Guide & Watchlist

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Testing](#testing)
- [Development & Contribution](#development--contribution)
- [Showcased Skills](#showcased-skills)

---

## 🎥 About the Project

**Streambuster** is a movie streaming guide and watchlist manager built to demonstrate my **full-stack development skills**. The app allows users to **search for movies, save them to a personal list, track watch progress, view recommendations, and find where to stream them.**

🚀 **Purpose**: A development-focused project to highlight my expertise in frontend, backend, authentication, state management, and API integration.

---

## 🛠 Tech Stack

### **Frontend (UI & UX)**
- **Next.js** (React framework for SSR and SSG)
- **TypeScript** (Strongly typed JavaScript)
- **Tailwind CSS** (Utility-first styling)
- **shadcn/ui** (Modern UI components)
- **Lucide React** (Icon set for UI enhancements)

### **Backend & Data**
- **Firebase Firestore** (NoSQL database for watchlists)
- **TMDB API** (Movie database & streaming provider integration)
- **Firebase Authentication** (User authentication via Clerk)

### **State & Management**
- **React Hooks** (`useState`, `useEffect`, `useCallback`)
- **Client-side state management** (for watchlists, sorting, filtering)

### **Testing & Deployment**
- **Jest & React Testing Library** (For component testing)
- **Vercel** (Next.js deployment platform)

---

## 🔥 Features

✅ **Search & Filter Movies** – Users can search and sort by rating, release date, and genre.
✅ **Personal Watchlist** – Save movies, mark them as "Watched" or "In Progress".
✅ **AI-powered Recommendations** – Get suggestions based on watchlist.
✅ **Streaming Providers** – Find where to stream movies (Netflix, Disney+, Prime, etc.).
✅ **User Authentication** – Secure login via Clerk (Google & email login).
✅ **Dark Mode & Theme Toggle** – Fully responsive, mobile-friendly UI.
✅ **Trailer Preview** – Watch trailers directly before choosing a movie.

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/munaciella/videostore.git
cd videostore
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env.local` file and add:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
TMDB_API_KEY=your_tmdb_api_key
```

### **4️⃣ Start the Development Server**
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📖 Usage Guide

### **Saving Movies**
1. Search for a movie.
2. Click "Save to My List".
3. Find it later in the "My List" section.

### **Tracking Progress**
- Click **"In Progress"** to mark a movie as watched.
- Click **"Watched"** to update status.

### **Finding Where to Watch**
- Open a movie page to see available streaming providers.
- Click a provider’s logo to visit their website.

### **Watching Trailers**
- Click **"Watch Trailer"** on the movie details page.

---

## 🧪 Testing

### **Running Tests**
```bash
npm run test
```

**Tests Include:**
- Unit tests for components.
- API response validation.
- User interactions (saving, sorting, filtering movies).

---

## 🛠 Development & Contribution

Want to contribute? Follow these steps:

1. **Fork the repo**
2. **Create a new branch**
```bash
git checkout -b feature-branch
```
3. **Commit changes**
```bash
git commit -m "Added new feature"
```
4. **Push to GitHub**
```bash
git push origin feature-branch
```
5. **Open a Pull Request!**

---

## 🚀 Showcased Skills

This project highlights my **full-stack** abilities:

### **🖥 Frontend Mastery**
- **Dynamic UI with Next.js & shadcn/ui**
- **Dark mode, animations, mobile-first design**

### **📡 API Integration**
- **TMDB API for movies & streaming providers**
- **Firebase Firestore for real-time watchlist**

### **🛠 State Management & Logic**
- **Sorting, filtering, and watchlist tracking**
- **Instant UI updates with React Hooks**

### **🔒 Secure Authentication**
- **User login via Clerk (Google & email)**

---

## 📢 Contact

Feel free to connect with me:
- **GitHub**: [munaciella](https://github.com/munaciella)
- **LinkedIn**: [Francesco Vurchio](https://www.linkedin.com/in/francesco-vurchio/)

---

### **🚀 Ready to explore movies? Start now!**
🎥 **[Live Demo](https://streambuster.vercel.app)**

