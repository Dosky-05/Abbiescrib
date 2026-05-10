import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const WHATSAPP_NUMBER = '2349068457533';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart();

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const total = cartTotal + shipping;

  const buildWhatsAppMessage = () => {
    const lines = cartItems.map(
      i => `• ${i.name} × ${i.qty} = $${(i.price * i.qty).toFixed(2)}`
    );
    const msg = [
      'Hello Abbies Crib! 👋',
      "I'd like to place the following order:",
      '',
      ...lines,
      '',
      `Subtotal: $${cartTotal.toFixed(2)}`,
      `Shipping: ${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}`,
      `Total: $${total.toFixed(2)}`,
      '',
      'Please confirm availability. Thank you!',
    ].join('\n');
    return encodeURIComponent(msg);
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper cart-empty">
        <div className="cart-empty__icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container cart-layout">
        {/* Items */}
        <div className="cart-items">
          <div className="cart-header">
            <h1 className="section-title" style={{ marginBottom: 0 }}>Your Cart</h1>
            <button className="cart-clear-btn" onClick={clearCart}>Clear All</button>
          </div>

          <div className="cart-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item__img">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-item__info">
                  <p className="cart-item__category">{item.category}</p>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="cart-item__name">{item.name}</h3>
                  </Link>
                  <p className="cart-item__price">${item.price.toFixed(2)} each</p>
                </div>
                <div className="cart-item__controls">
                  <div className="cart-item__qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <p className="cart-item__subtotal">${(item.price * item.qty).toFixed(2)}</p>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h2 className="cart-summary__title">Order Summary</h2>

          <div className="cart-summary__rows">
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="cart-free">FREE</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <p className="cart-summary__shipping-note">
                Add ${(100 - cartTotal).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="cart-summary__divider" />
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`}
            target="_blank"
            rel="noreferrer"
            className="cart-checkout-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.122 1.533 5.855L.057 23.62a.75.75 0 00.919.919l5.859-1.51A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.08a10.063 10.063 0 01-5.13-1.4l-.368-.217-3.815.983.999-3.735-.241-.384A10.08 10.08 0 011.92 12C1.92 6.407 6.407 1.92 12 1.92S22.08 6.407 22.08 12 17.593 22.08 12 22.08z"/>
            </svg>
            Checkout via WhatsApp
          </a>

          <p className="cart-summary__note">
            Clicking checkout opens a WhatsApp conversation with your order details. We'll confirm availability and payment method there.
          </p>

          <Link to="/shop" className="cart-continue-btn">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
