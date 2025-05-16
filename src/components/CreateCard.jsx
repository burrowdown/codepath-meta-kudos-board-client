import { useState } from "react"

const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs/search"
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY

function CreateCard({ boardId, close, setCards }) {
  const [text, setText] = useState("")
  const [author, setAuthor] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [gifs, setGifs] = useState([])
  const [selectedGif, setSelectedGif] = useState(null)

  const fetchGifs = async () => {
    try {
      const response = await fetch(
        `${GIPHY_BASE_URL}/?api_key=${GIPHY_API_KEY}&limit=7&q=${searchTerm}&rating=pg`
      )
      if (!response.ok) throw new Error("Network response was not ok")
      const data = await response.json()
      if (data.data) setGifs(data.data)
      else console.error("Failed to fetch GIFs:", data)
    } catch (error) {
      console.error("Error fetching GIFs:", error)
    }
  }

  const handleCreate = async () => {
    if (!text || !selectedGif) {
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
            author,
            gifUrl: selectedGif.images.original.url,
            boardId: Number(boardId),
          }),
        }
      )
      if (!response.ok) throw new Error("Network response was not ok", response)
      const data = await response.json()
      if (data.id) {
        setCards((prevCards) => [...prevCards, data])
        close()
      } else console.error("Failed to create card:", data)
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
          <input
            type="text"
            placeholder="Author (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <div className="gif-search-input">
            <input
              type="text"
              placeholder="Search GIFs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={fetchGifs}>Search</button>
          </div>
        </div>
        <div className="gif-results">
          {gifs.map((gif) => (
            <img
              className={`gif ${
                selectedGif?.id === gif.id ? "selected-gif" : ""
              }`}
              onClick={() => setSelectedGif(gif)}
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.alt_text}
            />
          ))}
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
