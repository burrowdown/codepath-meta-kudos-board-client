import { useEffect, useState } from "react"
import Board from "./Board"

function AllBoards() {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/boards`
        )
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setBoards(data)
      } catch (error) {
        console.error("Error fetching boards:", error)
      }
    }

    fetchBoards()
  }, [])

  return (
    <div id="all-boards">
      {boards.map((board) => (
        <Board board={board} key={board.id} />
      ))}
    </div>
  )
}
export default AllBoards
