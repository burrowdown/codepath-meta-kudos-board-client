import { useState } from "react"

function SearchAndFilter({ setSearchTerm, filter, setFilter }) {
  const [searchInput, setSearchInput] = useState("")

  const handleFilterChange = (val) => {
    setFilter(val)
    setSearchInput("")
    setSearchTerm("")
  }

  const handleSearchChange = () => {
    setSearchTerm(searchInput)
    setFilter("all")
  }

  return (
    <>
      <div id="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search boards..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchChange()
          }}
        />
        <button onClick={handleSearchChange}>Search</button>
      </div>

      <div id="filter-buttons-wrapper">
        <button
          onClick={() => handleFilterChange("all")}
          className={filter === "all" ? "coral" : ""}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("recent")}
          className={filter === "recent" ? "coral" : ""}
        >
          Recent
        </button>
        <button
          onClick={() => handleFilterChange("Celebration")}
          className={filter === "Celebration" ? "coral" : ""}
        >
          Celebration
        </button>
        <button
          onClick={() => handleFilterChange("ThankYou")}
          className={filter === "ThankYou" ? "coral" : ""}
        >
          Thank You
        </button>
        <button
          onClick={() => handleFilterChange("Inspiration")}
          className={filter === "Inspiration" ? "coral" : ""}
        >
          Inspiration
        </button>
      </div>
    </>
  )
}
export default SearchAndFilter
