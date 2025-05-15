import { useEffect, useState } from "react"
import Card from "./Card"

function AllCards({ cards }) {
  const [displayCards, setDisplayCards] = useState(cards)

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/cards/${id}`,
        { method: "DELETE" }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      setDisplayCards((prevCards) => prevCards.filter((card) => card.id !== id))
    } catch (error) {
      console.error("Error deleting card:", error)
    }
  }

  return (
    <div className="all-cards">
      {displayCards.length === 0 ? (
        <div id="no-content-warning">No cards found</div>
      ) : (
        <div id="all-boards">
          {displayCards.map((card) => (
            <Card key={card.id} card={card} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllCards
