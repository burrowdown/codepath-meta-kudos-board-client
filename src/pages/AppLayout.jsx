import { useState } from "react"

import { Link, Outlet } from "react-router-dom"

function AppLayout() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  )

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
    localStorage.setItem("darkMode", !darkMode)
  }

  return (
    <div className={`app-layout ${darkMode ? "dark-mode" : ""}`}>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <header>
        <Link to="/">
          <img
            id="logo-img"
            src={
              darkMode ? "/kudoboard_logo_darkmode.png" : "/kudoboard_logo.png"
            }
            alt="Kudos Board Logo"
          />
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2025 Kudos Board by Danny Burrow</p>
      </footer>
    </div>
  )
}

export default AppLayout
