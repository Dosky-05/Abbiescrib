import { Link } from 'react-router-dom';
import { Star, Gift, MessageCircle, Rocket } from 'lucide-react';
import './About.css';

const values = [
  {
    icon: <Star size={24} strokeWidth={2} />,
    title: 'Curated with Care',
    desc: 'Every product in our store is hand-picked to ensure the highest quality and the most memorable gifting experience.',
  },
  {
    icon: <Gift size={24} strokeWidth={2} />,
    title: 'Gift-Ready Always',
    desc: 'All orders come beautifully packaged at no extra cost because presentation is part of the gift.',
  },
  {
    icon: <MessageCircle size={24} strokeWidth={2} />,
    title: 'Personal Service',
    desc: 'We\'re a small team that genuinely cares. Reach us directly on WhatsApp for personalised recommendations.',
  },
  {
    icon: <Rocket size={24} strokeWidth={2} />,
    title: 'Fast & Reliable',
    desc: 'We take pride in prompt processing and safe delivery, so your gift always arrives when it matters most.',
  },
];

export default function About() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden="true">
          <div className="about-hero__blob about-hero__blob--1" />
          <div className="about-hero__blob about-hero__blob--2" />
        </div>
        <div className="container about-hero__inner">
          <div className="about-hero__text">
            <span className="badge badge-purple" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              Our Story
            </span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '1.25rem' }}>
              We Believe Every Gift<br />Tells a Story
            </h1>
            <p className="about-hero__desc">
              Abbies Crib was born from a simple idea: that gifting should feel as special for the giver
              as it does for the recipient. We are Nigeria's premier destination for exquisite branded gift
              items, from luxury perfumes to artisan hampers, each one curated to make moments unforgettable.
            </p>
            <p className="about-hero__desc">
              Founded with passion and a deep appreciation for quality, we have served hundreds of happy customers
              across the country, helping them celebrate birthdays, anniversaries, graduations and everyday moments
              of appreciation.
            </p>
            <div className="about-hero__ctas">
              <Link to="/shop" className="btn-primary">Shop Now</Link>
              <a href="https://wa.me/2349068457533" target="_blank" rel="noreferrer" className="btn-outline">
                Chat with Us
              </a>
            </div>
          </div>
          <div className="about-hero__image">
            <img
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80"
              alt="Abbies Crib gift boxes"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container about-stats__grid">
          <div className="about-stat">
            <strong>500+</strong>
            <span>Happy Customers</span>
          </div>
          <div className="about-stat">
            <strong>100+</strong>
            <span>Premium Products</span>
          </div>
          <div className="about-stat">
            <strong>3+</strong>
            <span>Years of Gifting</span>
          </div>
          <div className="about-stat">
            <strong>5★</strong>
            <span>Customer Rating</span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="home-section">
        <div className="container">
          <p className="section-subtitle">What drives us</p>
          <h2 className="section-title">Our Core Values</h2>
          <div className="about-values">
            {values.map(v => (
              <div key={v.title} className="about-value-card">
                <span className="about-value-card__icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="about-contact-strip">
        <div className="container about-contact-strip__inner">
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
              Find Us Online
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              We're active on Instagram and Twitter, follow us for new arrivals and exclusive offers.
            </p>
          </div>
          <div className="about-contact-strip__links">
            <a href="https://instagram.com/abbies_crib" target="_blank" rel="noreferrer" className="about-social-btn">
              Instagram · @abbies_crib
            </a>
            <a href="https://twitter.com/abbies_crib" target="_blank" rel="noreferrer" className="about-social-btn">
              Twitter · @abbies_crib
            </a>
            <a href="https://wa.me/2349068457533" target="_blank" rel="noreferrer" className="about-social-btn about-social-btn--whatsapp">
              WhatsApp · +234 906 845 7533
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
