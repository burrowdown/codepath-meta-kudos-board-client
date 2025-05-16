import { useState } from "react"

function Card({ card, handleDelete }) {
  const [newCard, setNewCard] = useState(card)

  const vote = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/cards/${card.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ voteCount: newCard.voteCount + 1 }),
        }
      )
      if (!response.ok) throw new Error("Network response was not ok")
      const data = await response.json()
      setNewCard(data)
    } catch (error) {
      console.error("Error voting:", error)
    }
  }

  return (
    <div key={card.id} className="card">
      <h2>{card.text}</h2>
      <p>From: {card.author}</p>
      <img src={card.gifUrl} alt="" />
      <div className="button-wrapper">
        <button onClick={vote} className="coral">
          Votes: {newCard.voteCount}
        </button>
        <button onClick={() => handleDelete(card.id)}>Delete</button>
      </div>
    </div>
  )
}
export default Card
