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

  menu: [
    {
      category: "Getting Started / Pour Commencer",
      items: [
        { name: "Deep-Fried Pickles", price: "$10", desc: "Served with honey dill sauce." },
        { name: "Sweet Potato Fries", price: "$10", desc: "Served with chipotle sauce." },
        { name: "Fries", price: "$7", desc: "Classic golden fries." },
        { name: "Deep Fried Mushrooms", price: "$10", desc: "Served with ranch dressing." },
        { name: "Bacon-Wrapped Scallops (8)", price: "$16", desc: "Delicious scallops wrapped in crispy bacon." },
        { name: "Thai Chicken Bites", price: "$16", desc: "Sweet chili sauce, crispy wontons, and fresh cucumber." },
        { name: "Crispy Chicken Chunks", price: "$14", desc: "Served with choice of dipping sauce." },
        { name: "Fried Onion Rings", price: "$12", desc: "Golden and crispy." },
        { name: "Mozza Sticks", price: "$12", desc: "Served with marinara sauce." },
        { name: "Mac & Cheese Wedges", price: "$12", desc: "Served with marinara sauce." },
        { name: "Chicken Wings", price: "8-$15 | 16-$24 | 24-$32", desc: "Crispy breaded. Sauces: Honey Garlic, BBQ, Mild, Buffalo, Thai, Maple Thai." },
        { name: "Chicken Quesadilla", price: "$15", desc: "Grilled tortilla with chicken, pico de gallo, cheese. Served with salsa and sour cream." },
        { name: "Crab or Lobster Quesadilla", price: "$20", desc: "Grilled tortilla with crab or lobster, pico de gallo, chipotle sauce, cheese. Served with salsa and sour cream." },
        { name: "Crab Rangoons", price: "$15", desc: "6 golden wontons stuffed with crab and cream cheese filling, garnished with Thai drizzle." },
        { name: "BBQ Chicken Nachos", price: "$18", desc: "Tortilla chips, chicken, pico de gallo, green onions, cheese blend, BBQ sauce, ranch dressing." },
        {
          name: "Taco Nachos",
          price: "$18",
          desc: "Tortilla chips, ground beef, pico de gallo, cheese blend. Served with salsa and sour cream.",
          image: "./assets/nachos.jpg"
        }
      ]
    },
    {
      category: "Bowls / Bols",
      items: [
        { name: "Seafood Chowder", price: "$18", desc: "Fresh lobster, scallops, and shrimps." }
      ]
    },
    {
      category: "Tacos (2 - $14 | 3 - $19)",
      items: [
        { name: "Crispy Chicken Tacos", price: "$14 / $19", desc: "Coleslaw, cheese blend, tomatoes, onions, peppers, ranch or caesar." },
        {
          name: "Crispy Fish or Shrimp Tacos",
          price: "$14 / $19",
          desc: "Lettuce, corn salsa, chipotle mayo.",
          image: "./assets/tacos.jpg"
        }
      ]
    },
    {
      category: "Poutines",
      items: [
        { name: "Classic Poutine", price: "$13", desc: "Cheese blend and our famous gravy." },
        { name: "Mushroom Poutine", price: "$14", desc: "Deep-fried mushrooms, cheese, gravy." },
        {
          name: "Bacon Cheeseburger Poutine",
          price: "$17",
          desc: "Ground beef, bacon, onions, cheese blend, gravy.",
          image: "./assets/poutine.jpg"
        },
        {
          name: "BBQ Chicken Poutine",
          price: "$17",
          desc: "Crispy boneless chicken, cheese blend, green onions, BBQ & ranch sauce.",
          image: "./assets/bbq_poutine.jpg"
        },
        { name: "Seafood Poutine", price: "$25", desc: "Shrimps, scallops, lobster meat, cheese blend, special cheese sauce." }
      ]
    },
    {
      category: "Salads / Salades (Add Chicken/Shrimp +$7)",
      items: [
        { name: "Classic Caesar", price: "Side $12 | Meal $15", desc: "Romaine, bacon, croutons, parmesan, creamy caesar dressing." },
        { name: "House Salad", price: "Side $12 | Meal $15", desc: "Field greens, veggies, cheddar cheese blend, choice of dressing." },
        { name: "Greek Salad", price: "Side $12 | Meal $15", desc: "Lettuce, feta, tomatoes, peppers, cucumbers, olives, red onions, Greek dressing." }
      ]
    },
    {
      category: "Burgers & Sandwiches (Served with fries & coleslaw)",
      items: [
        { name: "Bacon Cheddar Burger", price: "$18", desc: "Bacon, cheddar, lettuce, tomato, pickles, house sauce." },
        { name: "Classic Cheeseburger", price: "$16", desc: "Cheddar cheese and ketchup." },
        {
          name: "BBQ Chicken Burger",
          price: "$18",
          desc: "Crispy or grilled breast, BBQ sauce, cheddar, bacon, lettuce, tomato, ranch.",
          image: "./assets/burger.jpg"
        },
        { name: "Crispy Chicken Wrap", price: "$16", desc: "Breaded tenders, wing sauce, lettuce, tomato, onions, cheddar." },
        { name: "Chicken Caesar Wrap", price: "$16", desc: "Grilled or crispy chicken, romaine, bacon, parmesan, creamy caesar." },
        { name: "Fish Burger", price: "$18", desc: "Crispy breaded fish, lettuce, tartar sauce." },
        { name: "Scallop Burger", price: "$18", desc: "Five golden fried scallops, lettuce, tomato, tartar sauce." },
        {
          name: "Lobster Roll",
          price: "$23",
          desc: "Chilled lobster meat with mayo, lightly seasoned on a grilled bun.",
          image: "./assets/lobster_roll.jpg"
        },
        { name: "Crab Roll", price: "$23", desc: "Chilled crab meat with mayo, lightly seasoned on a grilled bun." },
        { name: "Triple-Decker Club", price: "$17", desc: "Chicken, bacon, lettuce, tomato, mayo on toasted bread." },
        { name: "Lobster Club", price: "$25", desc: "Lobster meat with mayo, bacon, lettuce, tomato." },
        { name: "Christine's Signature Crab Club", price: "$25", desc: "Crab meat with mayo, bacon, lettuce, tomato." }
      ]
    },
    {
      category: "Baskets 'N' Platters / Plats et Paniers",
      items: [
        { name: "Fried Clams / Bar Clams", price: "Sm $25 | Lg $29", desc: "Lightly breaded and fried. (Clams only: Sm $22 | Lg $26)" },
        { name: "Seafood Casserole", price: "$26", desc: "Seafood medley in rich creamy cheese sauce." },
        { name: "Seafood Platter", price: "$34", desc: "Fried clams, fish, shrimps, scallops." },
        { name: "Bacon-Wrapped Scallops", price: "$26", desc: "10 delicious bacon-wrapped scallops." },
        { name: "Fried Scallops Platter", price: "$25", desc: "Plump scallops breaded and lightly fried." },
        {
          name: "Fish & Chips",
          price: "1pc $14 | 2pc $18 | 3pc $20",
          desc: "Flaky white fish fillet in seasoned flour.",
          image: "./assets/fish_chips.png"
        },
        { name: "Maria Special", price: "$28", desc: "Lightly fried clams and fish." },
        { name: "Crispy Fried Shrimps", price: "$20", desc: "Lightly fried shrimps." },
        { name: "Chicken Tenders", price: "$18", desc: "5 breaded chicken tenders." },
        { name: "Crispy Chicken Chunks", price: "$18", desc: "10 crispy chicken chunks." }
      ]
    },
    {
      category: "Throwback Favourites / Classiques Préférés",
      items: [
        { name: "Hot Chicken", price: "$16", desc: "Roasted chicken sandwich topped with gravy and peas." },
        { name: "Hot Hamburger", price: "$18", desc: "10oz ground beef patty sandwich topped with gravy and peas." }
      ]
    },
    {
      category: "Kids' Menu / Menu Pour Enfants",
      items: [
        { name: "Popcorn Chicken", price: "$10", desc: "Served with fries and juice/milk." },
        { name: "Grilled Cheese", price: "$9", desc: "Served with fries and juice/milk." },
        { name: "1 Piece Fish & Chips", price: "$12", desc: "Served with fries and juice/milk." }
      ]
    },
    {
      category: "Sides & Extras",
      items: [
        { name: "Poutine Upgrade", price: "+$4", desc: "Replace fries with classic poutine." },
        { name: "Sweet Potato Fries Upgrade", price: "+$2", desc: "Replace fries." },
        { name: "Onion Rings Upgrade", price: "+$2", desc: "Replace fries." },
        { name: "Gravy / Sauce", price: "$3 - $5", desc: "Small or Large." },
        { name: "Coleslaw", price: "$4 - $6", desc: "Small or Large." }
      ]
    }
  ],

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

  events: [
    { title: "Wing Night", date: "Every Thursday", time: "4PM - Close", desc: "Enjoy our famous wings for just $0.99 each!", icon: "🍗" },
    { title: "Live Music", date: "Friday & Saturday", time: "7PM - 10PM", desc: "Local artists performing acoustic classics.", icon: "🎵" },
    { title: "Happy Hour", date: "Daily", time: "3PM - 6PM", desc: "$5 Drafts and half-price appetizers.", icon: "🍻" }
  ]
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
    if (snapshot.empty) return; // Keep static if no DB data

    const items = snapshot.docs.map(doc => doc.data());

    // Group by category string
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    // Reconstruct CONFIG.menu structure
    // We strictly follow the Static Category Order for UI consistency, or just append new ones

    // Helper to get order index from original static config if possible
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
      const ia = staticOrder.findIndex(s => a.category.includes(s.split('/')[0].trim()));
      const ib = staticOrder.findIndex(s => b.category.includes(s.split('/')[0].trim()));
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    CONFIG.menu = newMenu;
    render(); // Re-render with new data
    initMenuScrollSpy(); // Re-init listeners
  });

  // Live Event Updates
  db.collection("events").onSnapshot(snapshot => {
    if (snapshot.empty) return;
    CONFIG.events = snapshot.docs.map(doc => doc.data());
    render();
  });
}
