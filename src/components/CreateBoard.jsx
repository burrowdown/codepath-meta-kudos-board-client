import { useState } from "react"

function CreateBoard({ close, setBoards }) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")

  const handleClose = () => {
    setTitle("")
    setAuthor("")
    setCategory("")
    close()
  }

  const handleCreate = async () => {
    if (!title || !category) {
      return
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/boards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, author, category }),
        }
      )
      if (!response.ok) throw new Error("Network response was not ok")
      const data = await response.json()
      if (data.id) {
        handleClose()
        setBoards((prevBoards) => [...prevBoards, data])
      } else {
        console.error("Failed to create board:", data)
      }
    } catch (error) {
      console.error("Error fetching boards:", error)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Create a New Board</h1>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Board Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Celebration">Celebration</option>
            <option value="ThankYou">Thank You</option>
            <option value="Inspiration">Inspiration</option>
          </select>
        </div>
        <div className="button-wrapper">
          <button disabled={!title || !category} onClick={handleCreate}>
            Create
          </button>
          <button className="coral" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
export default CreateBoard
