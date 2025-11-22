export default function NavBar({ cartCount }) {
    const cartFullImg = "src/assets/cart-full.png";
    const cartEmptyImg = "src/assets/cart-empty.png";

    const isCartEmpty = cartCount === 0;

    return (
        <div className="NavBar">
            <h3 className="NavUser">Welcome, user!</h3>
            <h1 className="NavTitle">My Grocery App</h1>

            <div className="cart-status">
                <img
                    className="NavCart"
                    src={isCartEmpty ? cartEmptyImg : cartFullImg}
                    alt={isCartEmpty ? "Empty cart" : "Full cart"}
                />
                <span className="CartCount">
                    {isCartEmpty ? "Empty" : cartCount}
                </span>
            </div>
        </div>
    );
}
