import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <div className="navbar__logo-icon">A</div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">ABBIES</span>
            <span className="navbar__logo-sub">Crib</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <button
            className="navbar__icon-btn"
            onClick={() => setSearchOpen(s => !s)}
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <Link to="/cart" className="navbar__icon-btn navbar__cart-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className="navbar__cart-count">{cartCount}</span>}
          </Link>

          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(s => !s)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="navbar__search">
          <div className="container">
            <form onSubmit={handleSearch} className="navbar__search-form">
              <input
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn-primary">Search</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
