// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCiyM9S9g-4qbf_u59ZKgpGZ3lvI5a1bMk",
    authDomain: "resto-577-cms.firebaseapp.com",
    projectId: "resto-577-cms",
    storageBucket: "resto-577-cms.firebasestorage.app",
    messagingSenderId: "937770745854",
    appId: "1:937770745854:web:bbe3cf5d2c720b46340aaf"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// State
let allMenu = [];
let allEvents = [];

// Auth
function login() {
    auth.signInAnonymously()
        .then(() => {
            document.getElementById('auth-screen').style.display = 'none';
            document.getElementById('cms-screen').style.display = 'block';
            loadData();
        })
        .catch((error) => {
            console.error(error);
            alert("Login failed: " + error.message);
        });
}

// Data Loading
function loadData() {
    // Listen for Menu Changes
    db.collection("menu").orderBy("category").onSnapshot((snapshot) => {
        allMenu = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderAdminMenu();
    });

    // Listen for Events Changes
    db.collection("events").onSnapshot((snapshot) => {
        allEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderAdminEvents();
    });
}

// Render Admin Menu List
function renderAdminMenu() {
    const query = document.getElementById('search-menu')?.value.toLowerCase() || "";
    const catFilter = document.getElementById('filter-menu-cat')?.value || "";

    const container = document.getElementById('menu-list');
    const filtered = allMenu.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(query) || (item.desc && item.desc.toLowerCase().includes(query));
        const matchCat = catFilter ? item.category === catFilter : true;
        return matchSearch && matchCat;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: #aaa; padding: 2rem;">No items found.</div>`;
        return;
    }

    container.innerHTML = filtered.map(item => `
    <div class="admin-item">
      <div>
        <strong style="color: #d4af37;">${item.name}</strong>
        <div style="font-size: 0.8rem; color: #aaa;">${item.category} • ${item.price}</div>
      </div>
      <div>
        <button class="btn-text" onclick="editMenu('${item.id}')">Edit</button>
        <button class="btn-text" style="color: #ff4444;" onclick="deleteMenu('${item.id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

// Render Admin Events List
function renderAdminEvents() {
    const query = document.getElementById('search-events')?.value.toLowerCase() || "";
    const container = document.getElementById('events-list-admin');

    const filtered = allEvents.filter(item => {
        return item.title.toLowerCase().includes(query) || (item.desc && item.desc.toLowerCase().includes(query));
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: #aaa; padding: 2rem;">No events found.</div>`;
        return;
    }

    container.innerHTML = filtered.map(item => `
    <div class="admin-item">
      <div>
        <strong style="color: #d4af37;">${item.title}</strong>
        <div style="font-size: 0.8rem; color: #aaa;">${item.date} • ${item.time}</div>
      </div>
      <div>
        <button class="btn-text" onclick="editEvent('${item.id}')">Edit</button>
        <button class="btn-text" style="color: #ff4444;" onclick="deleteEvent('${item.id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

// CRUD - MENU
async function saveMenuItem() {
    const id = document.getElementById('menu-id').value;
    const fileInput = document.getElementById('menu-image-file');
    const file = fileInput.files[0];

    // Start with manual URL or empty
    let imageUrl = document.getElementById('menu-image').value;

    // If a file is selected, upload it first
    if (file) {
        try {
            showToast("Uploading Image...", 10000);
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`menu/${Date.now()}_${file.name}`);
            await fileRef.put(file);
            imageUrl = await fileRef.getDownloadURL();
            showToast("Upload Complete!");
        } catch (error) {
            console.error("Upload failed", error);
            alert("Image upload failed: " + error.message);
            return;
        }
    }

    const data = {
        category: document.getElementById('menu-category').value,
        name: document.getElementById('menu-name').value,
        price: document.getElementById('menu-price').value,
        desc: document.getElementById('menu-desc').value,
        image: imageUrl
    };

    if (!data.category || !data.name) return alert("Name and Category required!");

    const promise = id ? db.collection("menu").doc(id).update(data) : db.collection("menu").add(data);

    promise.then(() => {
        showToast("Menu Item Saved!");
        clearMenuForm();
    }).catch(e => alert(e.message));
}

function editMenu(id) {
    const item = allMenu.find(i => i.id === id);
    if (!item) return;
    document.getElementById('menu-id').value = item.id;
    document.getElementById('menu-category').value = item.category;
    document.getElementById('menu-name').value = item.name;
    document.getElementById('menu-price').value = item.price;
    document.getElementById('menu-desc').value = item.desc;
    document.getElementById('menu-image').value = item.image || '';
    document.getElementById('menu-image-file').value = ''; // Reset file input
    document.getElementById('upload-status').textContent = item.image ? "Current Image: " + item.image.split('/').pop().split('?')[0].substring(0, 20) + "..." : "Select an image to upload.";
    window.scrollTo(0, 0);
}

function deleteMenu(id) {
    if (confirm("Are you sure?")) {
        db.collection("menu").doc(id).delete();
    }
}

function clearMenuForm() {
    document.getElementById('menu-id').value = '';
    document.getElementById('menu-name').value = '';
    document.getElementById('menu-price').value = '';
    document.getElementById('menu-desc').value = '';
    document.getElementById('menu-image').value = '';
    document.getElementById('menu-image-file').value = '';
    document.getElementById('upload-status').textContent = "Select an image to upload.";
}

// CRUD - EVENTS
function saveEvent() {
    const id = document.getElementById('event-id').value;
    const data = {
        title: document.getElementById('event-title').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        desc: document.getElementById('event-desc').value,
        icon: document.getElementById('event-icon').value
    };

    const promise = id ? db.collection("events").doc(id).update(data) : db.collection("events").add(data);

    promise.then(() => {
        showToast("Event Saved!");
        clearEventForm();
    }).catch(e => alert(e.message));
}

function editEvent(id) {
    const item = allEvents.find(i => i.id === id);
    if (!item) return;
    document.getElementById('event-id').value = item.id;
    document.getElementById('event-title').value = item.title;
    document.getElementById('event-date').value = item.date;
    document.getElementById('event-time').value = item.time;
    document.getElementById('event-desc').value = item.desc;
    document.getElementById('event-icon').value = item.icon || '';
    window.scrollTo(0, 0);
}

function deleteEvent(id) {
    if (confirm("Are you sure?")) {
        db.collection("events").doc(id).delete();
    }
}

function clearEventForm() {
    document.getElementById('event-id').value = '';
    document.getElementById('event-title').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('event-time').value = '';
    document.getElementById('event-desc').value = '';
    document.getElementById('event-icon').value = '';
}

// Utilities
function switchTab(tab) {
    document.querySelectorAll('.admin-section').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
}

function showToast(msg, duration = 3000) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(() => el.style.display = 'none', duration);
}

// SEEDER
// SEEDER
function seedDatabase() {
    if (!confirm("This will upload all items from the backup to Firebase. Do this only once! Continue?")) return;

    const SEED_MENU = [
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
    ];

    const SEED_EVENTS = [
        { title: "Wing Night", date: "Every Thursday", time: "4PM - Close", desc: "Enjoy our famous wings for just $0.99 each!", icon: "🍗" },
        { title: "Live Music", date: "Friday & Saturday", time: "7PM - 10PM", desc: "Local artists performing acoustic classics.", icon: "🎵" },
        { title: "Happy Hour", date: "Daily", time: "3PM - 6PM", desc: "$5 Drafts and half-price appetizers.", icon: "🍻" }
    ];

    let count = 0;
    // Seed Menu
    SEED_MENU.forEach(cat => {
        cat.items.forEach(item => {
            db.collection("menu").add({
                category: cat.category,
                ...item
            });
            count++;
        });
    });

    // Seed Events
    SEED_EVENTS.forEach(evt => {
        db.collection("events").add(evt);
        count++;
    });

    alert(`Seed Complete! Sent ${count} items to the database.`);
}

// Check auth state
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('cms-screen').style.display = 'block';
        loadData();
    }
});
