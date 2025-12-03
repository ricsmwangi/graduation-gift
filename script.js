document.addEventListener('DOMContentLoaded', function() {
    // Check if it's December 5, 2025 (for production)
    const now = new Date();
    // Force check for December 5, 2025
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetCheck = new Date(2025, 11, 5); // December 5
    
    const isAvailable = currentDate.getTime() === targetCheck.getTime();

    if (!isAvailable) {
        showComingSoon();
        return;
    }

    // Initialize the app
    initializeApp();
    
    // Generate clouds
    generateClouds();
});

function showComingSoon() {
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: linear-gradient(135deg, #87CEEB 0%, #E6F3FF 25%, #B4E7F5 50%, #E6D7E6 75%, #D2B48C 100%);
            background-size: 400% 400%;
            animation: gradientShift 12s ease infinite;
            color: white;
            text-align: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        ">
            <h1 style="font-size: 3rem; margin-bottom: 20px; animation: colorCycle 12s ease infinite;">🎓 Coming Soon! 🎓</h1>
            <p style="font-size: 1.5rem; margin-bottom: 40px; animation: colorCycleAlt 12s ease infinite;">A special graduation gift will be available here on December 5, 2025</p>
            <div style="font-size: 4rem;">✨🎈🎊</div>
            <style>
                @keyframes gradientShift {
                    0% { background: linear-gradient(135deg, #87CEEB 0%, #E6F3FF 25%, #B4E7F5 50%, #E6D7E6 75%, #D2B48C 100%); }
                    25% { background: linear-gradient(135deg, #E6F3FF 0%, #B4E7F5 25%, #E6D7E6 50%, #D2B48C 75%, #87CEEB 100%); }
                    50% { background: linear-gradient(135deg, #B4E7F5 0%, #E6D7E6 25%, #D2B48C 50%, #87CEEB 75%, #E6F3FF 100%); }
                    75% { background: linear-gradient(135deg, #E6D7E6 0%, #D2B48C 25%, #87CEEB 50%, #E6F3FF 75%, #B4E7F5 100%); }
                    100% { background: linear-gradient(135deg, #87CEEB 0%, #E6F3FF 25%, #B4E7F5 50%, #E6D7E6 75%, #D2B48C 100%); }
                }
                @keyframes colorCycle {
                    0% { color: #87CEEB; }
                    25% { color: #90EE90; }
                    50% { color: #DDA0DD; }
                    75% { color: #D2B48C; }
                    100% { color: #87CEEB; }
                }
                @keyframes colorCycleAlt {
                    0% { color: #90EE90; }
                    25% { color: #DDA0DD; }
                    50% { color: #D2B48C; }
                    75% { color: #87CEEB; }
                    100% { color: #90EE90; }
                }
            </style>
        </div>
    `;
}

function initializeApp() {
    // Load any saved data from localStorage
    loadSavedData();

    // Start background image slideshow
    startBackgroundSlideshow();

    // Add cycling flowers in hero
    addCyclingFlowers();

    // Add popping flowers from corners
    addPoppingFlowers();
}

function startBackgroundSlideshow() {
    // Background slideshow removed - using solid gradient instead
    console.log('Using solid gradient background');
}

function addCyclingFlowers() {
    const flowersContainer = document.getElementById('hero-flowers');
    const flowerEmojis = ['🌸', '🌼', '🌺', '🌻', '🌷', '🌹', '💐'];
    const numFlowers = 6;
    
    // Create initial flowers
    for (let i = 0; i < numFlowers; i++) {
        createHeroFlower(flowersContainer, flowerEmojis);
    }
    
    // Add new flowers periodically
    setInterval(() => {
        createHeroFlower(flowersContainer, flowerEmojis);
        // Remove old flowers to prevent memory issues
        const flowers = flowersContainer.querySelectorAll('.hero-flower');
        if (flowers.length > numFlowers * 3) {
            flowers[0].remove();
        }
    }, 2000);
}

function createHeroFlower(container, flowerEmojis) {
    const flower = document.createElement('div');
    flower.className = 'hero-flower';
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    
    // Random position
    flower.style.left = Math.random() * 100 + '%';
    flower.style.top = Math.random() * 100 + '%';
    flower.style.animationDuration = (Math.random() * 3 + 4) + 's';
    flower.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(flower);
    
    // Remove after animation
    setTimeout(() => flower.remove(), 8000);
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

// Generate animated clouds
function generateClouds() {
    const cloudsContainer = document.getElementById('clouds-container');
    const numClouds = 8;
    
    for (let i = 0; i < numClouds; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // Random size
        const size = Math.random() * 60 + 40;
        cloud.style.width = size + 'px';
        cloud.style.height = (size * 0.4) + 'px';
        
        // Random vertical position
        cloud.style.top = Math.random() * 70 + 'px';
        
        // Random animation duration
        const duration = Math.random() * 10 + 20;
        cloud.style.animationDuration = duration + 's';
        
        // Random animation delay
        cloud.style.animationDelay = Math.random() * 5 + 's';
        
        // Random opacity
        cloud.style.opacity = Math.random() * 0.4 + 0.3;
        
        cloudsContainer.appendChild(cloud);
    }
}