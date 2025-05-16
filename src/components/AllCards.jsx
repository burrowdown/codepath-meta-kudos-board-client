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
      if (!response.ok) throw new Error("Network response was not ok")
      setDisplayCards((prevCards) => prevCards.filter((card) => card.id !== id))
    } catch (error) {
      console.error("Error deleting card:", error)
    }
  }

  const handlePin = async (card) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/cards/${card.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isPinned: !card.isPinned }),
        }
      )
      if (!response.ok) throw new Error("Network response was not ok")
      const data = await response.json()
      setDisplayCards((prevCards) =>
        prevCards.map((c) => (c.id === data.id ? data : c))
      )
    } catch (error) {
      console.error("Error pinning card:", error)
    }
  }

  // Note: copilot wrote this function and I don't know why it works
  // Sort can only return one thing? Shouldn't this need sequential sorts?
  // I feel like I need a whiteboard for this
  const sortedCards = () => {
    return displayCards.toSorted((a, b) => {
      // Pinned cards first
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1

      // Both pinned: sort by updatedAt (newest to oldest)
      if (a.isPinned && b.isPinned) {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      }

      // Both unpinned: sort by createdAt (oldest to newest)
      return new Date(a.createdAt) - new Date(b.createdAt)
    })
  }

  useEffect(() => {
    setDisplayCards(cards)
  }, [cards])

  return (
    <div className="all-cards">
      {displayCards.length === 0 ? (
        <div id="no-content-warning">No cards found</div>
      ) : (
        <div id="all-boards">
          {sortedCards().map((card) => (
            <Card
              key={card.id}
              card={card}
              handleDelete={handleDelete}
              handlePin={handlePin}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllCards
