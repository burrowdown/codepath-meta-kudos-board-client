import { useState } from "react"

function SearchAndFilter({ setSearchTerm, filter, setFilter }) {
  const [searchInput, setSearchInput] = useState("")

  return (
    <>
      <div id="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search boards..."
          defaultValue={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchTerm(searchInput)
            }
          }}
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
    </>
  )
}
export default SearchAndFilter
