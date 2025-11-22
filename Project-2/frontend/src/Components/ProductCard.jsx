import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
    _id,
    id,
    productName,
    brand,
    image,
    price,
    productQuantity,
    handleAddToCart,
    handleAddQuantity,
    handleRemoveQuantity,
    handleOnProductDelete,
    handleOnProductEdit,
}) {
    return (
        <div className="ProductCard">
            <h4>{productName}</h4>
            <img src={image} alt={productName} />
            <h5>{brand}</h5>

            <QuantityCounter
                id={id}
                mode="product"
                itemQuantity={productQuantity}
                handleAddQuantity={handleAddQuantity}
                handleRemoveQuantity={handleRemoveQuantity}
            />
            <p>{price}</p>

            <button
                onClick={() =>
                    handleAddToCart({
                        _id,
                        id,
                        productName,
                        brand,
                        quantity: productQuantity,
                        image,
                        price,
                    })
                }
            >
                Add To Cart
            </button>

            <button className="EditButton" onClick={() => handleOnProductEdit(_id)}>
                Edit
            </button>

            <button className="RemoveButton" onClick={() => handleOnProductDelete(_id, id)}>
                Delete
            </button>
        </div>
    );
}
