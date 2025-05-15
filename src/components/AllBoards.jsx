import { useEffect, useState } from "react"
import Board from "./Board"
import CreateBoard from "./CreateBoard"

function AllBoards({ createIsOpen, setCreateIsOpen, filter }) {
  const [boards, setBoards] = useState([])
  const [displayBoards, setDisplayBoards] = useState([])

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
        setDisplayBoards(data)
      } catch (error) {
        console.error("Error fetching boards:", error)
      }
    }

    fetchBoards()
  }, [])

  useEffect(() => {
    if (filter === "all") {
      setDisplayBoards(boards)
    } else if (filter === "recent") {
      setDisplayBoards(
        boards.toSorted((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
      )
    } else {
      setDisplayBoards(boards.filter((board) => board.category === filter))
    }
  }, [filter])

  const deleteBoard = async (boardId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/boards/${boardId}`,
        {
          method: "DELETE",
        }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== boardId)
      )
    } catch (error) {
      console.error("Error deleting board:", error)
    }
  }

  return (
    <>
      {createIsOpen && (
        <CreateBoard
          setBoards={setBoards}
          close={() => setCreateIsOpen(false)}
        />
      )}
      <div id="all-boards">
        {displayBoards.map((board) => (
          <Board key={board.id} board={board} onDelete={deleteBoard} />
        ))}
      </div>
    </>
  )
}
export default AllBoards
