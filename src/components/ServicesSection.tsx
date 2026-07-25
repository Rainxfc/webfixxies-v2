import { motion } from 'framer-motion';
import { useTheme } from '../App';

const services = [
  {
    id: 'landing',
    title: 'Landing Pages',
    desc: 'High-converting, beautiful landing pages designed to capture attention and drive sales. Perfect for product launches, marketing campaigns, and establishing your brand online.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/>
        <path d="M15 18h-5"/>
        <path d="M10 6h8v4h-8V6Z"/>
      </svg>
    )
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Websites',
    desc: 'Robust and seamless online stores that make shopping easy for your customers. We handle everything from product displays to secure checkout flows.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
        <path d="M3 6h18"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    )
  },
  {
    id: 'dashboards',
    title: 'Dashboards & Management Tools',
    desc: 'Custom internal tools that make running your business easier. View analytics, manage content, and control your data with simple, intuitive interfaces.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    )
  }
];

export default function ServicesSection() {
  const { dark } = useTheme();

  return (
    <section id="services" className="section-bg" style={{ position: 'relative', padding: '120px 16px', zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-tag" style={{ marginBottom: 24 }}>
            <div className="dot" />
            What We Do
          </div>
          <h2 className="font-display section-heading-grad" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24 }}>
            Digital solutions built for <br />
            <span className="section-heading-grad-alt" style={{ paddingBottom: '0.1em' }}>businesses like yours.</span>
          </h2>
          <p className="font-body text-desc" style={{ fontSize: 'clamp(15px, 2vw, 18px)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            We speak plain English. You tell us what your business needs, and we craft the perfect digital experience to make it happen without the complicated jargon.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="glass team-card"
              style={{
                padding: '40px 32px',
                borderRadius: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 20
              }}
            >
              <div style={{
                width: 60, height: 60,
                borderRadius: 16,
                background: dark ? 'rgba(124,58,237,0.1)' : 'rgba(124,58,237,0.06)',
                border: dark ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(139,92,246,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: dark ? '#a78bfa' : '#7c3aed'
              }}>
                {service.icon}
              </div>
              <div>
                <h3 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: dark ? '#f0eeff' : '#0a0814', marginBottom: 12, letterSpacing: '-0.02em' }}>
                  {service.title}
                </h3>
                <p className="font-body text-desc" style={{ fontSize: 15, lineHeight: 1.7 }}>
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
