import { Link } from "react-router-dom"

function Board({ board, onDelete }) {
  const handleDelete = async (e) => {
    e.preventDefault()
    onDelete(board.id)
  }

  return (
    <Link to={`/board/${board.id}`}>
      <div className="board card">
        <h3>{board.title}</h3>
        <p className="board-category">{board.category}</p>
        <img
          src={`https://picsum.photos/200/300?random=${board.id}`}
          alt={board.title}
          className="board-image"
        />
        {board.author && <p>By: {board.author}</p>}
        <button
          className="delete-board-button"
          onClick={(e) => handleDelete(e)}
        >
          Delete Board
        </button>
      </div>
    </Link>
  )
}
export default Board
