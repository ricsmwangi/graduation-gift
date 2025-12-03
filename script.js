document.addEventListener('DOMContentLoaded', function() {
    // Check if it's December 5, 2025
    const now = new Date();
    const targetDate = new Date('2025-12-05');
    const isAvailable = now.toDateString() === targetDate.toDateString();

    if (!isAvailable) {
        showComingSoon();
        return;
    }

    // Initialize the app
    initializeApp();
});

function showComingSoon() {
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        ">
            <h1 style="font-size: 3rem; margin-bottom: 20px;">🎓 Coming Soon! 🎓</h1>
            <p style="font-size: 1.5rem; margin-bottom: 40px;">A special graduation gift will be available here on December 5, 2025</p>
            <div style="font-size: 4rem;">✨🎈🎊</div>
        </div>
    `;
}

function initializeApp() {
    // Load any saved data from localStorage
    loadSavedData();

    // Start background image slideshow
    startBackgroundSlideshow();

    // Add popping flowers from corners
    addPoppingFlowers();
}

function startBackgroundSlideshow() {
    const hero = document.querySelector('.hero');
    const images = [
        'assets/images/mom1.jpg',
        'assets/images/mom2.jpg',
        'assets/images/mom3.jpg',
        'assets/images/mom4.jpg'
    ];

    let currentIndex = 0;

    function changeBackground() {
        const imageUrl = images[currentIndex];
        hero.style.backgroundImage = `url('${imageUrl}')`;
        console.log('Changing to:', imageUrl);
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Change background immediately and then every 5 seconds
    changeBackground();
    setInterval(changeBackground, 5000);
}

function addPoppingFlowers() {
    const numberOfFlowers = 8;
    const flowerEmojis = ['🌸', '🌼', '🌺', '🌻', '🌷', '🌹'];
    
    // Create flowers from top-left corner
    for (let i = 0; i < numberOfFlowers / 2; i++) {
        createFlower(true, flowerEmojis);
    }
    
    // Create flowers from top-right corner
    for (let i = 0; i < numberOfFlowers / 2; i++) {
        createFlower(false, flowerEmojis);
    }
}

function createFlower(isLeftCorner, flowerEmojis) {
    const flower = document.createElement('div');
    flower.className = 'popping-flower';
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    
    if (isLeftCorner) {
        flower.style.left = '20px';
    } else {
        flower.style.right = '20px';
    }
    
    flower.style.animationDelay = Math.random() * 3 + 's';
    document.body.appendChild(flower);
    
    // Recreate flower after animation completes
    setTimeout(() => {
        flower.remove();
        createFlower(isLeftCorner, flowerEmojis);
    }, 4000);
}

// Friends messages functionality
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.name.value.trim();
    const message = form.message.value.trim();

    if (!name || !message) {
        alert('Please fill in both name and message!');
        return;
    }

    // Add to local display
    addMessageToDisplay(name, message);

    // Save to localStorage
    saveMessageToStorage(name, message);

    // Submit to Formspree
    const formData = new FormData(form);
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showNotification('Message sent successfully! 🎉');
            form.reset();
        } else {
            showNotification('Message added locally, but email failed. Please try again.');
        }
    }).catch(error => {
        console.error('Error:', error);
        showNotification('Message added locally, but email failed. Please try again.');
    });
}

function addMessageToDisplay(name, message) {
    const container = document.getElementById('messages-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-item';
    messageDiv.innerHTML = `
        <h4>${escapeHtml(name)}</h4>
        <p>${escapeHtml(message)}</p>
    `;
    container.appendChild(messageDiv);
}

function saveMessageToStorage(name, message) {
    const messages = JSON.parse(localStorage.getItem('graduationMessages') || '[]');
    messages.push({ name, message, timestamp: new Date().toISOString() });
    localStorage.setItem('graduationMessages', JSON.stringify(messages));
}

function loadSavedData() {
    // Clear any test data from localStorage
    localStorage.removeItem('graduationMessages');
    
    // Messages will only be saved during the actual day
}

// Celebration functionality
function celebrate() {
    const effectDiv = document.getElementById('celebration-effect');

    // Clear previous effects
    effectDiv.innerHTML = '';

    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${getRandomColor()};
            left: ${Math.random() * 100}%;
            animation: confetti 3s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        effectDiv.appendChild(confetti);
    }

    // Show celebration message
    showNotification('🎊 HAPPY GRADUATION! 🎊', 5000);
}

function getRandomColor() {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, duration = 3000) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: bold;
        animation: slideIn 0.5s ease-out;
    `;

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.5s ease-in';
            setTimeout(() => notification.remove(), 500);
        }
    }, duration);
}

// Add slideOut animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .popping-flower {
        position: fixed;
        top: -50px;
        font-size: 2rem;
        animation: popFlower 4s ease-out forwards;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
    }

    @keyframes popFlower {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0.5) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: translateY(100px) scale(1.2) rotate(15deg);
        }
        100% {
            opacity: 0;
            transform: translateY(500px) scale(0.3) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to add message
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const nameInput = document.getElementById('friend-name');
        const messageInput = document.getElementById('friend-message');

        if (nameInput.value.trim() && messageInput.value.trim()) {
            // Trigger form submit
            const form = nameInput.closest('form');
            if (form) form.requestSubmit();
        }
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('div[style*="position: fixed"]');
        if (modal) modal.click();
    }
});