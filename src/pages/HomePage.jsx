import React from "react"

function BoardPage() {
  return (
    <section>
      <div id="search-bar-wrapper">
        <input type="text" placeholder="Search boards..." />
      </div>

      <div id="filter-buttons-wrapper">
        <button>All</button>
        <button>Recent</button>
        <button>Celebration</button>
        <button>Thank You</button>
        <button>Inspiration</button>
      </div>

      <div id="create-board-button-wrapper">
        <button className="coral">Create a New Board</button>
      </div>

      {/* Boards Component Placeholder */}
      <div>
        <Boards />
      </div>
    </section>
  )
}

// Placeholder Boards component
function Boards() {
  return <div>{/* Boards will be rendered here */}</div>
}

export default BoardPage
