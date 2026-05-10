import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products, { categories } from '../data/products';
import './Shop.css';

const PRICE_MAX = 300;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState(PRICE_MAX);
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    const q   = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (q)   setSearchQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== 'All') list = list.filter(p => p.category === selectedCategory);
    if (searchQuery.trim()) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    list = list.filter(p => p.price <= priceRange);
    if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating')     list.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'name')       list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [selectedCategory, priceRange, sortBy, searchQuery]);

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    setSearchParams({});
    setSidebarOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange(PRICE_MAX);
    setSortBy('default');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="shop-header">
        <div className="container shop-header__inner">
          <div>
            <h1 className="section-title" style={{ marginBottom: '0.25rem' }}>Our Shop</h1>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="shop-header__controls">
            <input
              className="shop-search"
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <select
              className="shop-sort"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A–Z</option>
            </select>
            <button
              className="shop-filter-toggle"
              onClick={() => setSidebarOpen(s => !s)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
                <line x1="10" y1="18" x2="14" y2="18"/>
              </svg>
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container shop-layout">
        {/* Sidebar */}
        <aside className={`shop-sidebar${sidebarOpen ? ' shop-sidebar--open' : ''}`}>
          <div className="shop-sidebar__header">
            <h3>Filters</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button className="shop-sidebar__clear" onClick={clearFilters}>Clear All</button>
              <button className="shop-sidebar__close" onClick={() => setSidebarOpen(false)} aria-label="Close filters">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="shop-filter-group">
            <h4>Category</h4>
            <ul>
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    className={`shop-category-btn${selectedCategory === cat ? ' active' : ''}`}
                    onClick={() => handleCategory(cat)}
                  >
                    {cat}
                    <span className="shop-category-count">
                      {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="shop-filter-group">
            <h4>Max Price: <strong>${priceRange}</strong></h4>
            <input
              type="range"
              min={10}
              max={PRICE_MAX}
              step={5}
              value={priceRange}
              onChange={e => setPriceRange(+e.target.value)}
              className="shop-price-range"
            />
            <div className="shop-price-labels">
              <span>$10</span>
              <span>${PRICE_MAX}</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="shop-main">
          {filtered.length === 0 ? (
            <div className="shop-empty">
              <span>🔍</span>
              <p>No products match your filters.</p>
              <button className="btn-outline" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="shop-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
