import { useState } from "react"

import AllBoards from "../components/AllBoards"
import SearchAndFilter from "../components/SearchAndFilter"

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [createIsOpen, setCreateIsOpen] = useState(false)

  return (
    <section>
      <SearchAndFilter
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />

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
