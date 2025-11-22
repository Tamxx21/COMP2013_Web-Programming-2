import CartCard from "./CartCard";

export default function CartContainer({
    cartItems,
    calculateCartTotal,
    handleEmptyCart,
    handleRemoveFromCart,
    handleAddQuantity,
    handleRemoveQuantity,
}) {
    return (
        <div className="CartContainer">
            <h3>Cart Items: {cartItems.length}</h3>

            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((cartItem) => (
                        <CartCard
                            key={cartItem.id}
                            {...cartItem}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleAddQuantity={handleAddQuantity}
                            handleRemoveQuantity={handleRemoveQuantity}
                        />
                    ))}

                    <div className="CartListBtns">
                        <button className="RemoveButton" onClick={handleEmptyCart}>
                            Empty Cart
                        </button>

                        <button id="BuyButton">
                            Checkout <br />
                            ${calculateCartTotal(cartItems).toFixed(2)}
                        </button>
                    </div>
                </>
            ) : (
                <h5>No Items In Cart</h5>
            )}
        </div>
    );
}
