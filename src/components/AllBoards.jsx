import { useEffect, useState } from "react"
import Board from "./Board"
import CreateBoard from "./CreateBoard"

function AllBoards({ createIsOpen, close, filter, searchTerm }) {
  const [boards, setBoards] = useState([])
  const [displayBoards, setDisplayBoards] = useState([])

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/boards`
        )
        if (!response.ok) throw new Error("Network response was not ok")
        const data = await response.json()
        setBoards(data)
        setDisplayBoards(data)
      } catch (error) {
        console.error("Error fetching boards:", error)
      }
    }
    fetchBoards()
  }, [])

  useEffect(() => {
    let newBoards = boards

    if (searchTerm) {
      newBoards = boards.filter((board) =>
        board.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } else if (filter === "all") {
      // do nothing
    } else if (filter === "recent") {
      newBoards = boards
        .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6)
    } else {
      newBoards = boards.filter((board) => board.category === filter)
    }

    setDisplayBoards(newBoards)
  }, [filter, searchTerm, boards])

  const deleteBoard = async (boardId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/boards/${boardId}`,
        {
          method: "DELETE",
        }
      )
      if (!response.ok) throw new Error("Network response was not ok")
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== boardId)
      )
    } catch (error) {
      console.error("Error deleting board:", error)
    }
  }

  return (
    <>
      {createIsOpen && <CreateBoard setBoards={setBoards} close={close} />}
      {displayBoards.length === 0 ? (
        <div id="no-content-warning">No boards found</div>
      ) : (
        <div id="all-boards">
          {displayBoards.map((board) => (
            <Board key={board.id} board={board} onDelete={deleteBoard} />
          ))}
        </div>
      )}
    </>
  )
}
export default AllBoards
