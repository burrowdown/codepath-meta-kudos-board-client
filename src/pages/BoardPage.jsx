import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function BoardPage() {
  const { boardId } = useParams()
  const [boardData, setBoardData] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/boards/${boardId}`
        )
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setBoardData(data)
      } catch (error) {
        console.error("Error fetching board data:", error)
        setErrorMessage("Could not fetch board data. Please try again later.")
      }
    }

    fetchBoardData()
  }, [])

  return (
    <div>
      {boardData && (
        <div>
          <h1>{boardData.title}</h1>
          {boardData.author && <p>By: {boardData.author}</p>}
        </div>
      )}
    </div>
  )
}

export default BoardPage
