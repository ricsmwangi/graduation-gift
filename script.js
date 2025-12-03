document.addEventListener('DOMContentLoaded', function() {
    // Check if it's December 3, 2025 (for testing - change to 5 after testing)
    const now = new Date();
    const targetDate = new Date('2025-12-03');
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

    // Add popping stars and floating balloons
    addStars();
    addBalloons();
}

function startBackgroundSlideshow() {
    const hero = document.querySelector('.hero');
    const images = [
        'assets/images/mom1.jpg',
        'assets/images/mom2.jpg',
        'assets/images/mom3.jpg',
        'assets/images/mom4.jpg'
        // Add more image paths as needed
    ];

    let currentIndex = 0;

    function changeBackground() {
        hero.style.backgroundImage = `url('${images[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Change background every 5 seconds
    changeBackground(); // Set initial
    setInterval(changeBackground, 5000);
}

function addStars() {
    const numberOfStars = 50;
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(star);
    }
}

function addBalloons() {
    const numberOfBalloons = 10;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < numberOfBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(balloon);
    }
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
    // Load saved messages
    const messages = JSON.parse(localStorage.getItem('graduationMessages') || '[]');
    const container = document.getElementById('messages-container');

    messages.forEach(msg => {
        addMessageToDisplay(msg.name, msg.message);
    });
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

    .star {
        position: fixed;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        animation: twinkle 2s infinite;
        pointer-events: none;
        z-index: 9999;
    }

    @keyframes twinkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
    }

    .balloon {
        position: fixed;
        bottom: -100px;
        width: 30px;
        height: 40px;
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        animation: float 10s infinite linear;
        pointer-events: none;
        z-index: 9999;
    }

    .balloon::before {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 20px;
        background: rgba(0, 0, 0, 0.3);
    }

    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(-120vh) rotate(360deg); }
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