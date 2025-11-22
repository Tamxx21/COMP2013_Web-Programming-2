import ProductCard from "./ProductCard";

export default function ProductsContainer({
    products,
    productQuantities,
    handleAddQuantity,
    handleRemoveQuantity,
    handleAddToCart,
    handleOnProductEdit,
    handleOnProductDelete,
}) {
    return (
        <div className="ProductsContainer">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    {...product}
                    productQuantity={productQuantities.find((p) => p.id === product.id)?.quantity || 0}
                    handleAddQuantity={handleAddQuantity}
                    handleRemoveQuantity={handleRemoveQuantity}
                    handleAddToCart={handleAddToCart}
                    handleOnProductEdit={handleOnProductEdit}
                    handleOnProductDelete={handleOnProductDelete}
                />
            ))}
        </div>
    );
}
