export default function Card(props) {
    return (
        <div className="Card-Component">
            <img src={props.image} alt=""/>
            <p><b>{props.place}</b></p>
            <p className="venue">{props.venue}</p>
            {props.rating > 4 ? <p className="rGreen"> {props.rating} ★</p> : <p className="rRed"> {props.rating} ★</p>}
            <p>{props.price}</p>
        </div>
    );
}