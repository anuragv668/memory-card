import '../styles/card.css';

export function Card({onClick, obj}) {
  const {image, name, id} = obj;
  console.log(image);
  return (
    <div id={id} className="card" onClick={onClick}>
      <img src={image} alt={name} loading='lazy'/>
    </div>
  );
}
