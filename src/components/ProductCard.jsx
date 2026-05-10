import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className={`product-card__badge badge ${
            product.badge === 'Sale' ? 'badge-pink' :
            product.badge === 'New' ? 'badge-teal' : 'badge-navy'
          }`}>
            {product.badge === 'Sale' && discount ? `-${discount}%` : product.badge}
          </span>
        )}
        <div className="product-card__overlay">
          <Link to={`/product/${product.id}`} className="product-card__quick-view">
            Quick View
          </Link>
        </div>
      </Link>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="product-card__stars">
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="12" height="12" viewBox="0 0 24 24"
                fill={s <= Math.round(product.rating) ? 'var(--pink)' : 'none'}
                stroke="var(--pink)" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span className="product-card__rating-text">({product.reviews})</span>
        </div>

        <div className="product-card__footer">
          <div className="product-card__price">
            <span className="product-card__price-current">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-card__price-original">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className="product-card__add-btn"
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
