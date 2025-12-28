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
    const container = document.getElementById('menu-list');
    container.innerHTML = allMenu.map(item => `
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
    const container = document.getElementById('events-list-admin');
    container.innerHTML = allEvents.map(item => `
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
function seedDatabase() {
    if (!confirm("This will upload all items from script.js to Firebase. Do this only once! Continue?")) return;

    // Seed Menu
    CONFIG.menu.forEach(cat => {
        cat.items.forEach(item => {
            db.collection("menu").add({
                category: cat.category,
                ...item
            });
        });
    });

    // Seed Events
    CONFIG.events.forEach(evt => {
        db.collection("events").add(evt);
    });

    alert("Seed Complete!");
}

// Check auth state
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('cms-screen').style.display = 'block';
        loadData();
    }
});
