import { marketingSiteContent } from '@/content/marketingSiteContent';

// HTML escaping utility
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function generateStaticHTML(): string {
  const { site, hero, faculty, courses, coursesExtra, contact, footer, navigation } = marketingSiteContent;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(site.name)} | ${escapeHtml(site.tagline)}</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="assets/images/favicon.png" type="image/png">
</head>
<body>
    <!-- Header -->
    <header id="header">
        <div class="container">
            <div class="header-content">
                <div class="logo" onclick="window.location.href='/'">
                    <img src="assets/images/logo.jpg" alt="${escapeHtml(site.name)} Logo">
                    <div class="logo-text">
                        <span class="logo-name">${escapeHtml(site.name)}</span>
                        <span class="logo-tagline">${escapeHtml(site.tagline)}</span>
                    </div>
                </div>
                <nav class="desktop-nav">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    ${navigation.filter(item => item.id !== 'hero' && item.id !== 'about').map(item => `<a href="#${item.id}" onclick="scrollToSection('${item.id}'); return false;">${escapeHtml(item.label)}</a>`).join('')}
                </nav>
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
            </div>
        </div>
    </header>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu">
        <button class="close-btn" onclick="toggleMobileMenu()">✕</button>
        <a href="/">Home</a>
        <a href="/about">About</a>
        ${navigation.filter(item => item.id !== 'hero' && item.id !== 'about').map(item => `<a href="#${item.id}" onclick="scrollToSection('${item.id}'); toggleMobileMenu(); return false;">${escapeHtml(item.label)}</a>`).join('')}
    </div>

    <!-- Hero Section -->
    <section id="hero" class="hero">
        <div class="hero-bg">
            <img src="assets/images/hero-banner.jpg" alt="Academic Success">
            <div class="hero-overlay"></div>
        </div>
        <div class="container hero-content">
            <h1>${escapeHtml(hero.heading)}</h1>
            <p class="hero-hindi">${escapeHtml(hero.headingHindi)}</p>
            <div class="guarantee-badge">
                <span>🏆</span>
                <span>${escapeHtml(hero.guaranteeBadge)}</span>
            </div>
            <p class="hero-description">${escapeHtml(hero.description)}</p>
            <div class="hero-cta">
                <button class="btn btn-primary" onclick="scrollToSection('contact')">${escapeHtml(hero.ctaPrimary)}</button>
                <button class="btn btn-secondary" onclick="scrollToSection('courses')">${escapeHtml(hero.ctaSecondary)}</button>
            </div>
            <div class="hero-stats">
                ${hero.stats.map(stat => `
                    <div class="stat-card">
                        <div class="stat-value">${escapeHtml(stat.value)}</div>
                        <div class="stat-label">${escapeHtml(stat.label)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Faculty Section -->
    <section id="faculty" class="faculty">
        <div class="container">
            <h2 class="section-title">Our <span class="highlight">Expert Faculty</span></h2>
            <div class="section-divider"></div>
            <p class="section-subtitle">Learn from experienced educators dedicated to your success</p>
            <div class="faculty-grid">
                ${faculty.map(member => `
                    <div class="faculty-card">
                        <div class="faculty-image">
                            <img src="${member.photoUrl}" alt="${escapeHtml(member.name)}">
                            <span class="subject-badge">${escapeHtml(member.subject)}</span>
                        </div>
                        <div class="faculty-info">
                            <h3>${escapeHtml(member.name)}</h3>
                            <p class="faculty-role">🎓 ${escapeHtml(member.role)}</p>
                            <p class="faculty-experience">🏆 Experience: ${escapeHtml(member.experience)}</p>
                            <p class="faculty-specialization">${escapeHtml(member.specialization)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Courses Section -->
    <section id="courses" class="courses">
        <div class="container">
            <h2 class="section-title">Our <span class="highlight">Courses</span></h2>
            <div class="section-divider"></div>
            <p class="section-subtitle">Comprehensive programs designed for board exam preparation and conceptual excellence</p>
            <div class="courses-grid">
                ${courses.map(course => `
                    <div class="course-card">
                        <div class="course-header">
                            <span class="course-icon">📚</span>
                            <span class="course-badge">${escapeHtml(course.name)}</span>
                        </div>
                        <h3>${escapeHtml(course.name)}</h3>
                        <p class="course-description">${escapeHtml(course.description)}</p>
                        <ul class="course-features">
                            ${course.features.map(f => `<li>✓ ${escapeHtml(f)}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            <div class="courses-extra">
                <h3>${escapeHtml(coursesExtra.heading)}</h3>
                <p>${escapeHtml(coursesExtra.description)}</p>
                <div class="subjects">
                    ${coursesExtra.subjects.map(s => `<span class="subject-tag">${escapeHtml(s)}</span>`).join('')}
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Get in <span class="highlight">Touch</span></h2>
            <div class="section-divider"></div>
            <p class="section-subtitle">Ready to start your journey to success? Contact us today!</p>
            <div class="contact-grid">
                <div class="contact-info">
                    <div class="contact-card">
                        <div class="contact-icon">📞</div>
                        <h3>Phone / WhatsApp</h3>
                        <a href="tel:+91${contact.phone}" class="contact-link">+91 ${contact.phone}</a>
                        <div class="contact-actions">
                            <button class="btn btn-small" onclick="window.location.href='tel:+91${contact.phone}'">Call Now</button>
                            <button class="btn btn-small btn-outline" onclick="window.open('https://wa.me/91${contact.phone}', '_blank')">WhatsApp</button>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon">✉️</div>
                        <h3>Email</h3>
                        <a href="mailto:${contact.email}" class="contact-link">${escapeHtml(contact.email)}</a>
                        <button class="btn btn-small" onclick="window.location.href='mailto:${contact.email}'">Send Email</button>
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon">📍</div>
                        <h3>Location</h3>
                        <p>${escapeHtml(contact.location)}</p>
                    </div>
                </div>
                <div class="contact-image">
                    <img src="${contact.backgroundImage}" alt="Visit Us">
                    <div class="contact-overlay">
                        <h3>Visit Us Today!</h3>
                        <p>Experience quality education and meet our expert faculty</p>
                        <button class="btn btn-primary" onclick="window.open('https://wa.me/91${contact.phone}', '_blank')">Schedule a Visit</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <div class="footer-logo">
                        <img src="assets/images/logo.jpg" alt="${escapeHtml(site.name)}">
                        <h3>${escapeHtml(site.name)}</h3>
                    </div>
                    <p>${escapeHtml(footer.description)}</p>
                </div>
                <div class="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        ${footer.quickLinks.filter(link => link !== 'Home' && link !== 'About').map(link => `<li><a href="#${link.toLowerCase()}" onclick="scrollToSection('${link.toLowerCase()}'); return false;">${escapeHtml(link)}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="footer-contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>Phone: +91 ${contact.phone}</li>
                        <li>Email: ${escapeHtml(contact.email)}</li>
                        <li>Location: ${escapeHtml(contact.location)}</li>
                    </ul>
                    <div class="social-links">
                        ${footer.social.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(s.platform)}">${s.platform.charAt(0)}</a>`).join('')}
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>${escapeHtml(footer.copyright)}</p>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Button -->
    <a href="https://wa.me/91${contact.phone}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn" aria-label="Contact on WhatsApp">
        💬
    </a>

    <script src="js/script.js"></script>
</body>
</html>`;
}

export function generateAboutPageHTML(): string {
  const { site, about, contact, footer } = marketingSiteContent;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Sangharsh Classes | SSC, Railway & Banking Coaching in Muzaffarpur</title>
    <meta name="description" content="Learn about Sangharsh Classes, a trusted SSC, Railway and Banking coaching institute in Muzaffarpur with experienced faculty and proven results.">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="assets/images/favicon.png" type="image/png">
</head>
<body>
    <!-- Header -->
    <header id="header">
        <div class="container">
            <div class="header-content">
                <div class="logo" onclick="window.location.href='/'">
                    <img src="assets/images/logo.jpg" alt="${escapeHtml(site.name)} Logo">
                    <div class="logo-text">
                        <span class="logo-name">${escapeHtml(site.name)}</span>
                        <span class="logo-tagline">${escapeHtml(site.tagline)}</span>
                    </div>
                </div>
                <nav class="desktop-nav">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/#faculty">Faculty</a>
                    <a href="/#courses">Courses</a>
                    <a href="/#contact">Contact</a>
                </nav>
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
            </div>
        </div>
    </header>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu">
        <button class="close-btn" onclick="toggleMobileMenu()">✕</button>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/#faculty">Faculty</a>
        <a href="/#courses">Courses</a>
        <a href="/#contact">Contact</a>
    </div>

    <!-- About Section -->
    <section class="about about-page">
        <div class="container">
            <h1 class="section-title">About Sangharsh Classes</h1>
            <div class="section-divider"></div>
            
            <div class="about-content">
                ${about.seoDescription.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
            </div>
            
            <div class="about-content">
                ${about.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3>${escapeHtml(about.feature.title)}</h3>
                <p>${escapeHtml(about.feature.description)}</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <div class="footer-logo">
                        <img src="assets/images/logo.jpg" alt="${escapeHtml(site.name)}">
                        <h3>${escapeHtml(site.name)}</h3>
                    </div>
                    <p>${escapeHtml(footer.description)}</p>
                </div>
                <div class="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/#faculty">Faculty</a></li>
                        <li><a href="/#courses">Courses</a></li>
                        <li><a href="/#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>Phone: +91 ${contact.phone}</li>
                        <li>Email: ${escapeHtml(contact.email)}</li>
                        <li>Location: ${escapeHtml(contact.location)}</li>
                    </ul>
                    <div class="social-links">
                        ${footer.social.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(s.platform)}">${s.platform.charAt(0)}</a>`).join('')}
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>${escapeHtml(footer.copyright)}</p>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Button -->
    <a href="https://wa.me/91${contact.phone}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn" aria-label="Contact on WhatsApp">
        💬
    </a>

    <script src="js/script.js"></script>
</body>
</html>`;
}

export function generateStaticCSS(): string {
  return `/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --brand-primary: #d97706;
    --brand-secondary: #3b82f6;
    --brand-accent: #8b5cf6;
    --background: #fafafa;
    --foreground: #1a1a1a;
    --card: #ffffff;
    --border: #e5e5e5;
    --muted: #f5f5f5;
    --muted-foreground: #737373;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: var(--foreground);
    background: var(--background);
    -webkit-font-smoothing: antialiased;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* Header */
#header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: linear-gradient(to right, rgba(217, 119, 6, 0.95), rgba(59, 130, 246, 0.95), rgba(139, 92, 246, 0.95));
    backdrop-filter: blur(8px);
    transition: all 0.3s;
}

#header.scrolled {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid var(--border);
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
}

.logo img {
    height: 56px;
    width: 56px;
    object-fit: contain;
}

.logo-text {
    display: flex;
    flex-direction: column;
}

.logo-name {
    font-size: 1.25rem;
    font-weight: bold;
    color: white;
}

.logo-tagline {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.9);
}

#header.scrolled .logo-name {
    color: var(--foreground);
}

#header.scrolled .logo-tagline {
    color: var(--muted-foreground);
}

.desktop-nav {
    display: none;
    gap: 0.5rem;
}

.desktop-nav a {
    padding: 0.5rem 1rem;
    color: white;
    text-decoration: none;
    font-weight: 500;
    border-radius: 0.375rem;
    transition: all 0.2s;
}

.desktop-nav a:hover {
    background: rgba(255, 255, 255, 0.2);
}

#header.scrolled .desktop-nav a {
    color: var(--foreground);
}

#header.scrolled .desktop-nav a:hover {
    color: var(--brand-primary);
    background: rgba(217, 119, 6, 0.1);
}

.mobile-menu-btn {
    display: block;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

#header.scrolled .mobile-menu-btn {
    color: var(--foreground);
}

.mobile-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s;
    z-index: 2000;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.mobile-menu.open {
    right: 0;
}

.mobile-menu .close-btn {
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

.mobile-menu a {
    padding: 0.75rem 1rem;
    color: var(--foreground);
    text-decoration: none;
    font-size: 1.125rem;
    border-radius: 0.375rem;
    transition: all 0.2s;
}

.mobile-menu a:hover {
    color: var(--brand-primary);
    background: rgba(217, 119, 6, 0.1);
}

@media (min-width: 768px) {
    .desktop-nav {
        display: flex;
    }
    .mobile-menu-btn {
        display: none;
    }
}

/* Hero Section */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 80px;
    overflow: hidden;
}

.hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
}

.hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, rgba(217, 119, 6, 0.9), rgba(59, 130, 246, 0.85), rgba(139, 92, 246, 0.9));
}

.hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    padding: 2rem 1rem;
}

.hero h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.hero-hindi {
    font-size: 1.5rem;
    font-style: italic;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.guarantee-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.95);
    padding: 1rem 2rem;
    border-radius: 9999px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;
    animation: bounce 3s infinite;
}

.guarantee-badge span:last-child {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--brand-primary);
}

.hero-description {
    font-size: 1.25rem;
    margin-bottom: 2.5rem;
    max-width: 48rem;
    margin-left: auto;
    margin-right: auto;
    font-weight: 500;
}

.hero-cta {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3rem;
    align-items: center;
}

.hero-stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 48rem;
    margin: 0 auto;
}

.stat-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s;
}

.stat-card:hover {
    background: rgba(255, 255, 255, 0.2);
}

.stat-value {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.stat-label {
    font-weight: 500;
    opacity: 0.9;
}

@media (min-width: 640px) {
    .hero-cta {
        flex-direction: row;
        justify-content: center;
    }
}

@media (min-width: 768px) {
    .hero h1 {
        font-size: 4.5rem;
    }
    .hero-hindi {
        font-size: 1.875rem;
    }
    .hero-stats {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Buttons */
.btn {
    padding: 0.75rem 2rem;
    border-radius: 9999px;
    font-weight: bold;
    font-size: 1.125rem;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    text-decoration: none;
    display: inline-block;
}

.btn-primary {
    background: white;
    color: var(--brand-primary);
}

.btn-primary:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
}

.btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
}

.btn-secondary:hover {
    background: white;
    color: var(--brand-primary);
    transform: scale(1.05);
}

.btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    background: var(--brand-primary);
    color: white;
}

.btn-small:hover {
    background: var(--brand-secondary);
}

.btn-outline {
    background: transparent;
    border: 2px solid var(--brand-primary);
    color: var(--brand-primary);
}

.btn-outline:hover {
    background: var(--brand-primary);
    color: white;
}

/* About Section */
.about {
    padding: 5rem 0;
    background: linear-gradient(to bottom, var(--background), var(--muted));
}

.about-page {
    padding-top: 8rem;
}

.section-title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
}

.section-title .highlight {
    color: var(--brand-primary);
}

.section-divider {
    width: 6rem;
    height: 0.25rem;
    background: var(--brand-primary);
    margin: 0 auto 3rem;
    border-radius: 9999px;
}

.about-content {
    background: var(--card);
    border-radius: 1rem;
    padding: 3rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
    margin-bottom: 2rem;
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
}

.about-content p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.about-content p:last-child {
    margin-bottom: 0;
}

.feature-card {
    background: var(--card);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
    text-align: center;
    max-width: 32rem;
    margin: 0 auto;
    transition: all 0.3s;
}

.feature-card:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-card h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
}

.feature-card p {
    color: var(--muted-foreground);
}

/* Faculty Section */
.faculty {
    padding: 5rem 0;
    background: var(--background);
}

.section-subtitle {
    text-align: center;
    font-size: 1.125rem;
    color: var(--muted-foreground);
    margin-bottom: 3rem;
}

.faculty-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 56rem;
    margin: 0 auto;
}

.faculty-card {
    background: var(--card);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
    transition: all 0.3s;
}

.faculty-card:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.faculty-image {
    position: relative;
    height: 20rem;
    overflow: hidden;
}

.faculty-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.subject-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--brand-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-weight: bold;
    font-size: 0.875rem;
}

.faculty-info {
    padding: 1.5rem;
}

.faculty-info h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
}

.faculty-role,
.faculty-experience {
    font-size: 1rem;
    color: var(--muted-foreground);
    margin-bottom: 0.5rem;
}

.faculty-specialization {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    margin-top: 0.75rem;
}

@media (min-width: 768px) {
    .faculty-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Courses Section */
.courses {
    padding: 5rem 0;
    background: linear-gradient(to bottom, var(--muted), var(--background));
}

.courses-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
}

.course-card {
    background: var(--card);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
    transition: all 0.3s;
}

.course-card:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.course-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.course-icon {
    font-size: 2rem;
}

.course-badge {
    background: var(--brand-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-weight: bold;
    font-size: 0.875rem;
}

.course-card h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
}

.course-description {
    color: var(--muted-foreground);
    margin-bottom: 1rem;
}

.course-features {
    list-style: none;
    padding: 0;
}

.course-features li {
    padding: 0.5rem 0;
    color: var(--foreground);
}

.courses-extra {
    background: var(--card);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
    text-align: center;
}

.courses-extra h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.courses-extra p {
    color: var(--muted-foreground);
    margin-bottom: 1.5rem;
}

.subjects {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.subject-tag {
    background: var(--brand-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-weight: 500;
}

@media (min-width: 768px) {
    .courses-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .courses-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Contact Section */
.contact {
    padding: 5rem 0;
    background: var(--background);
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

.contact-info {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

.contact-card {
    background: var(--card);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border);
    text-align: center;
}

.contact-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.contact-card h3 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
}

.contact-link {
    display: block;
    color: var(--brand-primary);
    text-decoration: none;
    font-size: 1.125rem;
    margin-bottom: 1rem;
}

.contact-link:hover {
    text-decoration: underline;
}

.contact-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 1rem;
}

.contact-image {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    height: 20rem;
}

.contact-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.contact-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    color: white;
}

.contact-overlay h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.contact-overlay p {
    margin-bottom: 1rem;
}

@media (min-width: 768px) {
    .contact-grid {
        grid-template-columns: 1fr 1fr;
    }
    .contact-image {
        height: auto;
    }
}

/* Footer */
.footer {
    background: linear-gradient(to right, var(--brand-primary), var(--brand-secondary), var(--brand-accent));
    color: white;
    padding: 3rem 0 1.5rem;
}

.footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.footer-logo img {
    height: 48px;
    width: 48px;
    object-fit: contain;
}

.footer-logo h3 {
    font-size: 1.25rem;
    font-weight: bold;
}

.footer-about p {
    opacity: 0.9;
    line-height: 1.6;
}

.footer-links h3,
.footer-contact h3 {
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.footer-links ul,
.footer-contact ul {
    list-style: none;
    padding: 0;
}

.footer-links li,
.footer-contact li {
    margin-bottom: 0.5rem;
}

.footer-links a {
    color: white;
    text-decoration: none;
    opacity: 0.9;
    transition: opacity 0.2s;
}

.footer-links a:hover {
    opacity: 1;
    text-decoration: underline;
}

.social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.2s;
}

.social-links a:hover {
    background: white;
    color: var(--brand-primary);
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-bottom p {
    opacity: 0.9;
}

@media (min-width: 768px) {
    .footer-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* WhatsApp Button */
.whatsapp-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    background: #25D366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 100;
    transition: all 0.3s;
    text-decoration: none;
}

.whatsapp-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
}

/* Animations */
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

/* Utility Classes */
.text-center {
    text-align: center;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: var(--muted);
}

::-webkit-scrollbar-thumb {
    background: var(--brand-primary);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--brand-secondary);
}`;
}

export function generateStaticJS(): string {
  return `// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
}

// Smooth scroll to section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobile-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (menu.classList.contains('open') && 
        !menu.contains(event.target) && 
        !menuBtn.contains(event.target)) {
        menu.classList.remove('open');
    }
});`;
}
