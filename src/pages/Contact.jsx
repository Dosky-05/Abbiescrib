import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const msg = `Hi! I'm ${form.name}.\n\nSubject: ${form.subject}\n\n${form.message}\n\nEmail: ${form.email}`;
    const url = `https://wa.me/2349068457533?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="contact-header">
        <div className="contact-header__bg" aria-hidden="true">
          <div className="contact-header__blob contact-header__blob--1" />
          <div className="contact-header__blob contact-header__blob--2" />
        </div>
        <div className="container contact-header__inner">
          <span className="badge badge-teal" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            Get in Touch
          </span>
          <h1 className="section-title" style={{ marginBottom: '0.75rem' }}>
            We'd Love to Hear from You
          </h1>
          <p style={{ color: 'var(--gray-600)', maxWidth: '480px', lineHeight: 1.7 }}>
            Whether you have a question about an order, need gift advice, or just want to say hello,
            we're always here.
          </p>
        </div>
      </div>

      <div className="container contact-layout">
        {/* Info */}
        <div className="contact-info">
          <h2 className="contact-info__title">Contact Details</h2>

          <div className="contact-info__cards">
            <a href="https://wa.me/2349068457533" target="_blank" rel="noreferrer" className="contact-info-card">
              <div className="contact-info-card__icon contact-info-card__icon--green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.122 1.533 5.855L.057 23.62a.75.75 0 00.919.919l5.859-1.51A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.08a10.063 10.063 0 01-5.13-1.4l-.368-.217-3.815.983.999-3.735-.241-.384A10.08 10.08 0 011.92 12C1.92 6.407 6.407 1.92 12 1.92S22.08 6.407 22.08 12 17.593 22.08 12 22.08z" />
                </svg>
              </div>
              <div>
                <h4>WhatsApp</h4>
                <p>+234 906 845 7533</p>
                <span>Click to chat now</span>
              </div>
            </a>

            <a href="https://instagram.com/abbies_crib" target="_blank" rel="noreferrer" className="contact-info-card">
              <div className="contact-info-card__icon contact-info-card__icon--pink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div>
                <h4>Instagram</h4>
                <p>@abbies_crib</p>
                <span>Follow for updates</span>
              </div>
            </a>

            <a href="https://twitter.com/abbies_crib" target="_blank" rel="noreferrer" className="contact-info-card">
              <div className="contact-info-card__icon contact-info-card__icon--navy">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div>
                <h4>Twitter / X</h4>
                <p>@abbies_crib</p>
                <span>Tweet us anytime</span>
              </div>
            </a>
          </div>

          <div className="contact-hours">
            <h4>Business Hours</h4>
            <div className="contact-hours__row"><span>Monday – Friday</span><span>9am – 6pm</span></div>
            <div className="contact-hours__row"><span>Saturday</span><span>10am – 4pm</span></div>
            <div className="contact-hours__row"><span>Sunday</span><span>Closed</span></div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          <h2 className="contact-info__title">Send a Message</h2>
          <p className="contact-form-note">
            Your message will be sent directly to our WhatsApp so we can respond quickly.
          </p>

          {submitted && (
            <div className="contact-success">
              ✅ Opening WhatsApp with your message… we'll reply shortly!
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" placeholder="e.g. Chidinma" required
                  value={form.name} onChange={handleChange} />
              </div>
              <div className="contact-form__field">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="you@email.com" required
                  value={form.email} onChange={handleChange} />
              </div>
            </div>
            <div className="contact-form__field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="What's this about?" required
                value={form.subject} onChange={handleChange} />
            </div>
            <div className="contact-form__field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={6}
                placeholder="Tell us how we can help…" required
                value={form.message} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-primary contact-submit-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.122 1.533 5.855L.057 23.62a.75.75 0 00.919.919l5.859-1.51A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.08a10.063 10.063 0 01-5.13-1.4l-.368-.217-3.815.983.999-3.735-.241-.384A10.08 10.08 0 011.92 12C1.92 6.407 6.407 1.92 12 1.92S22.08 6.407 22.08 12 17.593 22.08 12 22.08z" />
              </svg>
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
