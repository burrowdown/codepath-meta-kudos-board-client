import { useState } from "react"

import AllBoards from "../components/AllBoards"

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [filter, setFilter] = useState("all")
  const [createIsOpen, setCreateIsOpen] = useState(false)

  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput)
    }
    setSearchInput(e.target.value)
  }

  return (
    <section>
      <div id="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search boards..."
          defaultValue={searchInput}
          onKeyDown={handleSearchInput}
        />
        <button onClick={() => setSearchTerm(searchInput)}>Search</button>
      </div>

      <div id="filter-buttons-wrapper">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "coral" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("recent")}
          className={filter === "recent" ? "coral" : ""}
        >
          Recent
        </button>
        <button
          onClick={() => setFilter("Celebration")}
          className={filter === "Celebration" ? "coral" : ""}
        >
          Celebration
        </button>
        <button
          onClick={() => setFilter("ThankYou")}
          className={filter === "ThankYou" ? "coral" : ""}
        >
          Thank You
        </button>
        <button
          onClick={() => setFilter("Inspiration")}
          className={filter === "Inspiration" ? "coral" : ""}
        >
          Inspiration
        </button>
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
          filter={filter}
          searchTerm={searchTerm}
        />
      </div>
    </section>
  )
}

export default HomePage
