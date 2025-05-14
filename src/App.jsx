import { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AppLayout from "./pages/AppLayout"
import BoardPage from "./pages/BoardPage"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
