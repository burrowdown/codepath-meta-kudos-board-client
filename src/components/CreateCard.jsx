import { useState } from "react"

function CreateCard({ boardId, close }) {
  const [text, setText] = useState("")

  const handleCreate = async () => {
    if (!text) {
      return
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/cards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            gifUrl: "TODO: do this for real",
            boardId: Number(boardId), // TODO: why is this a string?
          }),
        }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok", response)
      }
      const data = await response.json()
      if (data.id) {
        close()
      } else {
        console.error("Failed to create card:", data)
      }
    } catch (error) {
      console.error("Error fetching cards:", error)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Add a New Card</h1>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Card Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="button-wrapper">
          <button disabled={!text} onClick={handleCreate}>
            Create
          </button>
          <button className="coral" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
export default CreateCard
