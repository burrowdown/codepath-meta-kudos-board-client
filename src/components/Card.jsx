function Card({ card, handleDelete }) {
  // TODO: fill in
  return (
    <div key={card.id} className="card">
      <h2>{card.text}</h2>
      <img src={card.gifUrl} alt="" />
      <button onClick={() => handleDelete(card.id)}>Delete</button>
    </div>
  )
}
export default Card
