import { Link } from "react-router-dom"

function Board({ board }) {
  return (
    <Link to={`/board/${board.id}`}>
      <div className="board card">
        <img
          src={`https://picsum.photos/200/300?random=${board.id}`}
          alt={board.title}
          className="board-image"
        />
        <h3>{board.title}</h3>
      </div>
    </Link>
  )
}
export default Board
