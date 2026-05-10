import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="page-wrapper pd-notfound">
        <h2>Product not found.</h2>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-wrapper">
      {/* Breadcrumb */}
      <div className="container pd-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      {/* Main */}
      <div className="container pd-main">
        {/* Image */}
        <div className="pd-image-wrap">
          <img src={product.image} alt={product.name} />
          {product.badge && (
            <span className={`badge pd-badge ${
              product.badge === 'Sale' ? 'badge-pink' :
              product.badge === 'New' ? 'badge-teal' : 'badge-navy'
            }`}>
              {product.badge === 'Sale' && discount ? `-${discount}%` : product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="pd-info">
          <p className="pd-category">{product.category}</p>
          <h1 className="pd-name">{product.name}</h1>

          {/* Rating */}
          <div className="pd-rating">
            <div className="pd-stars">
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="15" height="15" viewBox="0 0 24 24"
                  fill={s <= Math.round(product.rating) ? 'var(--pink)' : 'none'}
                  stroke="var(--pink)" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span>{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="pd-price">
            <span className="pd-price-current">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="pd-price-original">${product.originalPrice.toFixed(2)}</span>
            )}
            {discount && <span className="pd-price-save">Save {discount}%</span>}
          </div>

          <p className="pd-desc">{product.description}</p>

          {/* Quantity */}
          <div className="pd-qty-row">
            <div className="pd-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button
              className={`btn-primary pd-add-btn${added ? ' pd-add-btn--added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Added!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* WhatsApp order */}
          <a
            href={`https://wa.me/2349068457533?text=Hi! I'd like to order: ${encodeURIComponent(product.name)} (Qty: ${qty})`}
            target="_blank"
            rel="noreferrer"
            className="pd-whatsapp-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.122 1.533 5.855L.057 23.62a.75.75 0 00.919.919l5.859-1.51A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.08a10.063 10.063 0 01-5.13-1.4l-.368-.217-3.815.983.999-3.735-.241-.384A10.08 10.08 0 011.92 12C1.92 6.407 6.407 1.92 12 1.92S22.08 6.407 22.08 12 17.593 22.08 12 22.08z"/>
            </svg>
            Order via WhatsApp
          </a>

          {/* Meta */}
          <div className="pd-meta">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Have a question? <a href="https://wa.me/2349068457533" target="_blank" rel="noreferrer">WhatsApp us</a>
            </span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pd-related">
          <div className="container">
            <h2 className="section-title">You Might Also Like</h2>
            <div className="pd-related-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
