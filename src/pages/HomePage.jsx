import { useState } from "react"

import AllBoards from "../components/AllBoards"

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [createIsOpen, setCreateIsOpen] = useState(false)

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
        <button className="coral" onClick={() => setCreateIsOpen(true)}>
          Create a New Board
        </button>
      </div>

      <div>
        <AllBoards
          createIsOpen={createIsOpen}
          setCreateIsOpen={setCreateIsOpen}
        />
      </div>
    </section>
  )
}

export default HomePage
