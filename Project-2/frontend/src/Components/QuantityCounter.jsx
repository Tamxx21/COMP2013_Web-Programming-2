export default function QuantityCounter({
    id,
    mode,
    itemQuantity,
    handleAddQuantity,
    handleRemoveQuantity,
}) {
    return (
        <div className="QuantityCounter">
            <div>
                <button onClick={() => handleRemoveQuantity(id, mode)}>-</button>
            </div>

            <p>{itemQuantity}</p>

            <div>
                <button onClick={() => handleAddQuantity(id, mode)}>+</button>
            </div>
        </div>
    );
}
