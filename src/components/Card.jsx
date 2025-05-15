function Card({ card, handleDelete }) {
  // TODO: fill in
  return (
    <div key={card.id} className="card">
      <h2>{card.text}</h2>
      <button onClick={() => handleDelete(card.id)}>Delete</button>
    </div>
  )
}
export default Card
