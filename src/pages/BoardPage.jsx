import { useParams } from "react-router-dom"

function BoardPage() {
  const { boardId } = useParams()
  return <div>Board Page for board id: {boardId}</div>
}

export default BoardPage
