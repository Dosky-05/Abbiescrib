import { Link } from 'react-router-dom';
import { Droplets, Gift, Gem, Sparkles, ShoppingBag, Home as HomeIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './Home.css';

const categories = [
  { name: 'Perfumes', icon: <Droplets size={32} strokeWidth={1.5} />, color: 'cat--pink', image: '/Perfumes.jpg' },
  { name: 'Gift Boxes', icon: <Gift size={32} strokeWidth={1.5} />, color: 'cat--navy', image: '/GiftBoxes.jpg' },
  { name: 'Accessories', icon: <Gem size={32} strokeWidth={1.5} />, color: 'cat--purple', image: '/Accessories.jpg' },
  { name: 'Beauty', icon: <Sparkles size={32} strokeWidth={1.5} />, color: 'cat--teal', image: '/Beauty.jpg' },
  { name: 'Bags', icon: <ShoppingBag size={32} strokeWidth={1.5} />, color: 'cat--pink', image: '/Bags.jpg' },
  { name: 'Home & Lifestyle', icon: <HomeIcon size={32} strokeWidth={1.5} />, color: 'cat--navy', image: '/Home&Lifestyle.jpg' },
];

const testimonials = [
  {
    name: 'Chidinma O.',
    text: 'Absolutely loved my order! The gift box was beautifully packaged and arrived on time. Will definitely be ordering again!',
    rating: 5,
  },
  {
    name: 'Temi A.',
    text: 'Abbies Crib never disappoints. I got the crystal jewellery set for my mum\'s birthday and she was over the moon. 10/10!',
    rating: 5,
  },
  {
    name: 'Funke B.',
    text: 'The perfume gift set smells incredible and came in the most elegant packaging. Great quality for the price.',
    rating: 5,
  },
];

const usps = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Premium Quality',
    desc: 'Every product is carefully sourced and curated for the highest quality.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Fast Delivery',
    desc: 'We ensure your gifts arrive quickly and safely, beautifully packaged.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: 'Made with Love',
    desc: 'Each order is packed with care and a personal touch for every recipient.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: '24/7 Support',
    desc: 'Have a question? Reach us on WhatsApp any time we\'re always here.',
  },
];

export default function Home() {
  const featured = products.filter(p => p.badge === 'Best Seller').slice(0, 3)
    .concat(products.filter(p => p.badge === 'New').slice(0, 3));

  return (
    <div className="page-wrapper">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
        </div>
        <div className="container hero__content">
          <span className="badge badge-pink hero__eyebrow">Exquisite Branded Gift Items</span>
          <h1 className="hero__title">
            Gifts That Say<br />
            <em>Everything</em>
          </h1>
          <p className="hero__desc">
            Discover our handpicked collection of premium perfumes, jewellery,
            gift hampers and more wrapped with love, delivered with care.
          </p>
          <div className="hero__ctas">
            <Link to="/shop" className="btn-primary hero__cta-main">
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a href="https://wa.me/2349068457533" target="_blank" rel="noreferrer" className="btn-outline">
              WhatsApp Us
            </a>
          </div>
          <div className="hero__stats">
            <div className="hero__stat"><strong>500+</strong><span>Happy Customers</span></div>
            <div className="hero__stat-divider" />
            <div className="hero__stat"><strong>100+</strong><span>Premium Products</span></div>
            <div className="hero__stat-divider" />
            <div className="hero__stat"><strong>5★</strong><span>Avg. Rating</span></div>
          </div>
        </div>
        <div className="hero__image-col">
          <div className="hero__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=700&q=80"
              alt="Abbies Crib gift hamper"
            />
            <div className="hero__image-badge">
              <span>🎁</span>
              <span>Free gift wrapping on all orders</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="home-section">
        <div className="container">
          <p className="section-subtitle">Browse by Category</p>
          <h2 className="section-title">What Are You Looking For?</h2>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className={`category-card ${cat.color} ${cat.image ? 'category-card--featured' : ''}`}
                style={cat.image ? { backgroundImage: `url('${cat.image}')` } : {}}
              >
                <span className="category-card__icon">{cat.icon}</span>
                <span className="category-card__name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="home-section home-section--alt">
        <div className="container">
          <p className="section-subtitle">Hand-picked for you</p>
          <h2 className="section-title">Featured Products</h2>
          <div className="home-products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="home-view-all">
            <Link to="/shop" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ── USPs ── */}
      <section className="home-section">
        <div className="container">
          <p className="section-subtitle">Why choose us</p>
          <h2 className="section-title">The Abbies Crib Promise</h2>
          <div className="usps-grid">
            {usps.map(u => (
              <div key={u.title} className="usp-card">
                <div className="usp-card__icon">{u.icon}</div>
                <h3>{u.title}</h3>
                <p>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="home-section home-section--navy">
        <div className="container">
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>What our customers say</p>
          <h2 className="section-title" style={{ color: '#fff' }}>Loved by Many</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24"
                      fill="var(--pink)" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <span className="testimonial-card__name">— {t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="home-section">
        <div className="container">
          <div className="newsletter-banner">
            <div>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Stay in the Loop</h2>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.92rem' }}>
                Get exclusive deals, new arrivals and gift inspiration sent to your inbox.
              </p>
            </div>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
