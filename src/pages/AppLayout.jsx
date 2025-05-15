import { Link, Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <div className="app-layout">
      <header>
        <Link to="/">
          <img
            id="logo-img"
            src="/src/assets/kudoboard_logo.png"
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
