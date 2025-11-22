import { useState, useEffect } from "react";
import axios from "axios";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";
import ProductsContainer from "./ProductsContainer";
import ProductsForm from "./ProductsForm";

export default function GroceriesAppContainer() {
    // State
    const [products, setProducts] = useState([]);
    const [productQuantities, setProductQuantities] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({ productName: "", brand: "", image: "", price: "" });
    const [postResponse, setPostResponse] = useState({ message: "", date: "" });
    const [editProduct, setEditProduct] = useState(false);

    // useEffects
    useEffect(() => {
        handleProductsDB();
    }, [postResponse]);

    // Get products from DB
    const handleProductsDB = async () => {
        try {
            const response = await axios.get("http://localhost:3000/products");
            setProducts(response.data);
            setProductQuantities(response.data.map((prod) => ({ id: prod.id, quantity: 0 })));
        } catch (error) {
            console.log(error.message);
        }
    };

    // Reset form
    const handleResetForm = () => setFormData({ productName: "", brand: "", image: "", price: "" });

    // Add or update product
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editProduct) {
                handleOnProductUpdate(formData._id);
                handleResetForm();
                setEditProduct(false);
            } else {
                await axios.post("http://localhost:3000/products", formData)
                    .then((res) => setPostResponse(res.data))
                    .then(() => handleResetForm());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // Update form input
    const handleOnProductsFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    // Delete product
    const handleOnProductDelete = async (dbId, productId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/products/${dbId}`);
            setPostResponse(response.data);
            if (cartItems.find((item) => item.id === productId)) handleRemoveFromCart(productId);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Edit product
    const handleOnProductEdit = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3000/products/${id}`);
            setFormData({
                productName: res.data.productName,
                brand: res.data.brand,
                image: res.data.image,
                price: res.data.price,
                id: res.data.id,
                _id: res.data._id,
            });
            setEditProduct(true);
        } catch (error) {
            console.log(error);
        }
    };

    // Update product
    const handleOnProductUpdate = async (id) => {
        try {
            const res = await axios.patch(`http://localhost:3000/products/${id}`, formData);
            setPostResponse({ message: res.data.message, date: res.data.date });

            // Update cart if product exists
            const found = cartItems.find((item) => item.id === formData.id);
            if (found) {
                setCartItems(cartItems.map((item) =>
                    item.id === found.id ? { ...item, productName: formData.productName, brand: formData.brand, image: formData.image, price: formData.price, total: calculateItemTotal(formData.price, item.quantity) } : item
                ));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Calculate single item total
    const calculateItemTotal = (price, quantity) => parseFloat(price.replace("$", "")) * quantity;

    // Calculate cart total
    const calculateCartTotal = (items) => items.reduce((total, item) => total + item.total, 0);

    // Add quantity
    const handleAddQuantity = (productId, mode) => {
        if (mode === "cart") {
            setCartItems(cartItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1, total: calculateItemTotal(item.price, item.quantity + 1) } : item
            ));
        } else {
            setProductQuantities(productQuantities.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            ));
        }
    };

    // Remove quantity
    const handleRemoveQuantity = (productId, mode) => {
        if (mode === "cart") {
            setCartItems(cartItems
                .map((item) =>
                    item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1, total: calculateItemTotal(item.price, item.quantity - 1) } : item
                )
                .filter((item) => item.quantity > 0)
            );
        } else {
            setProductQuantities(productQuantities.map((item) =>
                item.id === productId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
            ));
        }
    };

    // Add to cart
    const handleAddToCart = (newItem) => {
        if (newItem.quantity === 0) return;
        const found = cartItems.find((item) => item.id === newItem.id);
        if (found) {
            setCartItems(cartItems.map((item) =>
                item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity, total: calculateItemTotal(item.price, item.quantity + newItem.quantity) } : item
            ));
        } else {
            setCartItems([{ ...newItem, total: calculateItemTotal(newItem.price, newItem.quantity) }, ...cartItems]);
        }
    };

    // Remove from cart
    const handleRemoveFromCart = (id) => setCartItems(cartItems.filter((item) => item.id !== id));

    // Empty cart
    const handleEmptyCart = () => setCartItems([]);

    return (
        <>
            <NavBar cartCount={cartItems.length} />
            <div className="GroceriesAppContainer">
                <ProductsForm
                    {...formData}
                    handleOnSubmit={handleOnSubmit}
                    handleOnProductsFormChange={handleOnProductsFormChange}
                    postResponse={postResponse}
                    editProduct={editProduct}
                />
                <ProductsContainer
                    products={products}
                    productQuantities={productQuantities}
                    handleAddToCart={handleAddToCart}
                    handleAddQuantity={handleAddQuantity}
                    handleRemoveQuantity={handleRemoveQuantity}
                    handleOnProductEdit={handleOnProductEdit}
                    handleOnProductDelete={handleOnProductDelete}
                />
                <CartContainer
                    cartItems={cartItems}
                    calculateCartTotal={calculateCartTotal}
                    handleEmptyCart={handleEmptyCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleAddQuantity={handleAddQuantity}
                    handleRemoveQuantity={handleRemoveQuantity}
                />
            </div>
        </>
    );
}
