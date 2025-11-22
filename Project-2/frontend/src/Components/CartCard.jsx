import QuantityCounter from "./QuantityCounter";

export default function CartCard({
    id,
    productName,
    image,
    price,
    quantity,
    total,
    handleRemoveFromCart,
    handleAddQuantity,
    handleRemoveQuantity,
}) {
    return (
        <div className="CartCard">
            <div className="CartCardInfo">
                <img src={image} alt={productName} />
                <h4>{productName}</h4>
                <p>{price}</p>
                <QuantityCounter
                    id={id}
                    mode="cart"
                    itemQuantity={quantity}
                    handleAddQuantity={handleAddQuantity}
                    handleRemoveQuantity={handleRemoveQuantity}
                />
            </div>

            <div className="CartCardInfo">
                <h4>Total: ${total.toFixed(2)}</h4>
                <button className="RemoveButton" onClick={() => handleRemoveFromCart(id)}>
                    Remove
                </button>
            </div>
        </div>
    );
}
