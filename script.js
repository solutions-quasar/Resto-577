/**
 * Resto 577 - Main Configuration & Logic
 * Single Source of Truth for Content
 */

const CONFIG = {
  business: {
    name: "Resto 577",
    phone: "506-577-1234",
    phoneClean: "15065771234",
    address: "2680 Acadie Road, Cap-Pelé, NB, Canada",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=2680%20Acadie%20Road%2C%20Cap-Pel%C3%A9%2C%20NB",
    facebook: "https://www.facebook.com/resto577/",
    ctaPrimary: "Call Now", // Fallback since checked FB and no obvious reservation/order system
    privacyLink: "/privacy.html"
  },

  hero: {
    badge: "Welcome to Cap-Pelé",
    title: "Resto 577 — Great Food, Local Vibe.",
    subtitle: "A welcoming spot for fresh, satisfying meals. Dine in or take out.",
    cta: "Call to Order",
    image: "./assets/hero.jpg"
  },

  menu: [],

  reviews: [
    {
      text: "Absolutely delicious food! From the moment we walked in, we were greeted with smiles and enthusiasm. Sam, our waiter, was efficient, friendly and delightful. Thank you for a great experience, I highly recommend this restaurant!",
      author: "Wendy Miles",
      stars: 5
    },
    {
      text: "Our first time there! Food was AMAZING! Staff and decor were as good as the food. If travelling to NB, take my advice and go off the beaten path and eat at Resto 577.",
      author: "Dana Andrew",
      stars: 5
    },
    {
      text: "Eating out can be challenging when you're gluten-free, so I was thrilled to find a gluten-free menu with plenty of options. I had no issues at all. I'll definitely be returning!",
      author: "Carol Marie",
      stars: 5
    },
    {
      text: "Super bon! Bon service, bonne nourriture, belle atmosphere, bon prix. Merci!",
      author: "Linda Doucette-Hebert",
      stars: 5
    },
    {
      text: "Had read good things about Resto 577 so we decided to check it out - it did not disappoint! The food was delicious and the portions were generous. We will definitely be going back.",
      author: "Shari Kaster",
      stars: 5
    }
  ],

  whyUs: [
    { title: "Fresh Ingredients", image: "./assets/fresh_ingredients.jpg" },
    { title: "Friendly Staff" },
    { title: "Cozy Atmosphere" },
    { title: "Great Value" }
  ],

  events: []
};

// Render Functions
function render() {
  // Render Top Bar Info
  document.querySelector('.logo').innerHTML = `<img src="./assets/logo_v2.jpg" alt="${CONFIG.business.name}" style="height: 50px; width: auto;">`;
  const phoneLinks = document.querySelectorAll('a[data-type="phone"]');
  phoneLinks.forEach(link => {
    link.href = `tel:+${CONFIG.business.phoneClean}`;
    link.textContent = CONFIG.business.phone;
  });

  // Render Hero
  const heroHTML = `
    <div class="hero-bg"><img src="${CONFIG.hero.image}" alt="Resto 577 Atmosphere" loading="eager"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content container">
      <span style="color: var(--color-accent); font-weight: 600; letter-spacing: 1px; text-transform: uppercase; font-size: 0.8rem; display: block; margin-bottom: 8px;">${CONFIG.hero.badge}</span>
      <h1>${CONFIG.hero.title}</h1>
      <p>${CONFIG.hero.subtitle}</p>
      <div style="display: flex; gap: var(--space-3); align-items: center; flex-wrap: wrap;">
        <a href="tel:+${CONFIG.business.phoneClean}" class="btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"></path></svg>
          ${CONFIG.hero.cta}
        </a>
        <a href="#menu" class="btn-text" onclick="scrollToCategory('all')">
          View Menu <svg class="arrow-bounce" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 6px;"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
        </a>
      </div>
    </div>
  `;
  document.getElementById('hero').innerHTML = heroHTML;


  // Render Menu (formerly Services)
  const menuContainer = document.getElementById('menu-grid');
  if (menuContainer) {
    if (CONFIG.menu.length === 0) {
      menuContainer.innerHTML = `<div style="text-align: center; padding: 4rem; color: #aaa;">
            <p>Loading menu items...</p>
            <small>(If this persists, please seed the database in CMS)</small>
        </div>`;
    } else {
      // Switch to a column layout for the menu instead of strict grid
      menuContainer.style.display = 'block';

      // 1. Render Menu Nav Pills
      const navContainer = document.getElementById('menu-nav');
      if (navContainer) {
        navContainer.innerHTML = `
        <div style="position: relative; display: flex; align-items: center;">
          <button id="nav-prev" class="nav-scroll-btn prev" aria-label="Scroll Left" onclick="scrollNav(-1)">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <div class="menu-pills" id="menu-pills-container">
            <button class="menu-pill active" onclick="scrollToCategory('all')">All</button>
            ${CONFIG.menu.map((cat, index) => `
              <button class="menu-pill" id="nav-${index}" onclick="scrollToCategory('cat-${index}')">
                ${cat.category.split('/')[0].split('(')[0].trim()}
              </button>
            `).join('')}
          </div>

          <button id="nav-next" class="nav-scroll-btn next" aria-label="Scroll Right" onclick="scrollNav(1)">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      `;
      }

      // 2. Render Menu Categories with IDs
      menuContainer.innerHTML = CONFIG.menu.map((cat, index) => `
      <div id="cat-${index}" class="menu-category" style="margin-bottom: var(--space-6); scroll-margin-top: 140px;">
        <h3 style="color: var(--color-accent); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem; margin-bottom: 1.5rem; font-size: 1.5rem;">${cat.category}</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-4);">
          ${cat.items.map(item => `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; padding: 0;">
              ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-border);">` : ''}
              <div style="padding: var(--space-3); flex: 1; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                  <h4 style="font-size: 1.1rem; margin: 0;">${item.name}</h4>
                  <span style="color: var(--color-accent); font-weight: 600;">${item.price}</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--color-text-muted); margin: 0;">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
    }
  }

  // Render Reviews
  const reviewsContainer = document.getElementById('reviews-list');
  if (reviewsContainer) {
    reviewsContainer.innerHTML = CONFIG.reviews.map(r => `
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p>"${r.text}"</p>
        <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--color-text-muted);">- ${r.author}</div>
      </div>
    `).join('') + `
      <div style="text-align: center; margin-top: 2rem;">
        <a href="${CONFIG.business.facebook}" target="_blank" rel="noopener" style="text-decoration: underline; color: var(--color-accent);">Read more on Facebook</a>
      </div>
    `;
  }

  // Render Why Us
  const whyContainer = document.getElementById('why-list');
  if (whyContainer) {
    whyContainer.innerHTML = CONFIG.whyUs.map(item => {
      if (item.image) {
        return `
          <div class="card" style="position: relative; overflow: hidden; height: 200px; display: flex; align-items: flex-end; padding: 0;">
            <img src="${item.image}" alt="${item.title}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.7;">
            <div style="position: relative; z-index: 2; padding: var(--space-3); width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);">
              <h4 style="color: #fff; font-size: 1.2rem; margin: 0;">${item.title}</h4>
            </div>
          </div>
        `;
      }
      return `
        <div class="card" style="text-align: center; display: flex; align-items: center; justify-content: center; height: 100px;">
          <h4 style="color: var(--color-accent); margin: 0;">${item.title}</h4>
        </div>
      `;
    }).join('');
  }

  // Render Events
  const eventsContainer = document.getElementById('events-list');
  if (eventsContainer) {
    eventsContainer.innerHTML = CONFIG.events.map(e => `
      <div class="card event-card">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">${e.icon}</div>
        <div>
          <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #fff;">${e.title}</h4>
          <div style="color: var(--color-accent); font-weight: 600; margin-bottom: 0.5rem;">${e.date} • ${e.time}</div>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">${e.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Render Contact Info
  document.getElementById('address-display').textContent = CONFIG.business.address;
  document.getElementById('directions-btn').href = CONFIG.business.mapLink;

  // Render Footer Info
  document.getElementById('footer-phone-link').textContent = CONFIG.business.phone;
  document.getElementById('footer-phone-link').href = `tel:+${CONFIG.business.phoneClean}`;
  document.getElementById('footer-address').textContent = CONFIG.business.address;
  document.getElementById('footer-fb').href = CONFIG.business.facebook;
}

// Mobile Interaction Logic
function initMobileInteractions() {
  const menuBtn = document.getElementById('btn-menu');
  const closeBtn = document.getElementById('btn-close');
  const overlay = document.getElementById('menu-overlay');
  const menuLinks = document.querySelectorAll('.menu-link');

  function openMenu() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Map Lazy Loading
function initMap() {
  const mapContainer = document.getElementById('map-embed');
  if (!mapContainer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mapContainer.innerHTML = `
          <iframe 
            class="map-frame"
            src="https://maps.google.com/maps?q=2680%20Acadie%20Rd%2C%20Cap-Pel%C3%A9%2C%20NB&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            title="Resto 577 Location" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>`;
        observer.disconnect();
      }
    });
  }, { rootMargin: "200px" });

  observer.observe(mapContainer);
}

// Smart Menu Spy
// Smart Menu Spy
function scrollToCategory(id) {
  if (id === 'all') {
    const menu = document.getElementById('menu-grid');
    if (menu) {
      const top = menu.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollNav(direction) {
  const container = document.getElementById('menu-pills-container');
  if (container) {
    const scrollAmount = 200;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
}

function initMenuScrollSpy() {
  const cats = document.querySelectorAll('.menu-category');
  const pills = document.querySelectorAll('.menu-pill');
  if (!cats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all
        pills.forEach(p => p.classList.remove('active'));

        // Add to current
        const id = entry.target.id.replace('cat-', 'nav-');
        const activePill = document.getElementById(id);
        if (activePill) {
          activePill.classList.add('active');

          // Auto-scroll the nav bar to keep pill in view
          activePill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    });
  }, { rootMargin: "-15% 0px -75% 0px", threshold: 0 }); // Trigger when section is near top

  cats.forEach(cat => observer.observe(cat));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Render with Static Data (Fast Load)
  render();
  initMobileInteractions();
  initMenuScrollSpy();
  initMap();

  // 2. Fetch Dynamic Data from CMS
  if (typeof firebase !== 'undefined') {
    initRealtimeContent();
  }
});

function initRealtimeContent() {
  const firebaseConfig = {
    apiKey: "AIzaSyCiyM9S9g-4qbf_u59ZKgpGZ3lvI5a1bMk",
    authDomain: "resto-577-cms.firebaseapp.com",
    projectId: "resto-577-cms",
    storageBucket: "resto-577-cms.firebasestorage.app",
    messagingSenderId: "937770745854",
    appId: "1:937770745854:web:bbe3cf5d2c720b46340aaf"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Live Menu Updates
  db.collection("menu").onSnapshot(snapshot => {
    try {
      console.log("Firestore Update: Received " + snapshot.size + " items.");
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          category: data.category || "Uncategorized", // Fallback for missing category
          name: data.name || "Unknown Item"
        };
      });

      // Group by category string
      const grouped = {};
      items.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
      });

      // Reconstruct CONFIG.menu structure
      const staticOrder = [
        "Getting Started / Pour Commencer",
        "Bowls / Bols",
        "Tacos",
        "Poutines",
        "Salads / Salades",
        "Burgers & Sandwiches",
        "Baskets 'N' Platters",
        "Throwback Favourites",
        "Kids' Menu",
        "Sides & Extras"
      ];

      const newMenu = Object.keys(grouped).map(catName => {
        return {
          category: catName,
          items: grouped[catName]
        };
      }).sort((a, b) => {
        const catA = String(a.category || "");
        const catB = String(b.category || "");
        const ia = staticOrder.findIndex(s => catA.includes(s.split('/')[0].trim()));
        const ib = staticOrder.findIndex(s => catB.includes(s.split('/')[0].trim()));
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      });

      CONFIG.menu = newMenu;
      console.log("Render: Updating menu with " + newMenu.length + " categories.");
      render(); // Re-render with new data
      initMenuScrollSpy(); // Re-init listeners
    } catch (error) {
      console.error("Error processing menu data:", error);
    }
  });

  // Live Event Updates
  db.collection("events").onSnapshot(snapshot => {
    // if (snapshot.empty) return;
    CONFIG.events = snapshot.docs.map(doc => doc.data());
    render();
  });
}
