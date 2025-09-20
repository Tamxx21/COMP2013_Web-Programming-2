export default function Card(props) {
    return (
        <div className="Card-Component">
            <img src={props.image} alt="" width="100px"/>
            <h5>{props.place}</h5>
            <p>{props.venue}</p>
            {props.rating}
            <p>{props.price}</p>
        </div>
    );
}