import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AllCards from "../components/AllCards"
import CreateCard from "../components/CreateCard"

function BoardPage() {
  const { boardId } = useParams()
  const [boardData, setBoardData] = useState(null)
  const [cards, setCards] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [createIsOpen, setCreateIsOpen] = useState(false)

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/boards/${boardId}`
        )
        if (!response.ok) throw new Error("Network response was not ok")
        const data = await response.json()
        setBoardData(data)
        setCards(data.cards)
      } catch (error) {
        console.error("Error fetching board data:", error)
        setErrorMessage("Could not fetch board data. Please try again later.")
      }
    }
    fetchBoardData()
  }, [])

  if (!boardData) {
    return (
      <div>
        <h1>Loading...</h1>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    )
  }

  return (
    <div>
      <div id="board-header">
        <h1>{boardData.title}</h1>
        {boardData && (
          <div>{boardData.author && <p>By: {boardData.author}</p>}</div>
        )}
        <button className="coral" onClick={() => setCreateIsOpen(true)}>
          Add a New Card
        </button>
      </div>
      <AllCards cards={cards.toReversed()} />
      {createIsOpen && (
        <CreateCard
          boardId={boardId}
          createIsOpen={createIsOpen}
          close={() => setCreateIsOpen(false)}
          setCards={setCards}
        />
      )}
    </div>
  )
}

export default BoardPage
