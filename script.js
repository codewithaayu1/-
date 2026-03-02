// Navigation Functions
function goToProposal() {
    switchSection('proposal');
    showToast('मेरी बात सुनो... 💕');
}

function goToWhatsApp() {
    switchSection('whatsapp-section');
    showToast('अपना नंबर शेयर करो 📱');
}

function switchSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// WhatsApp Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('whatsappForm');
    const input = document.getElementById('whatsappNumber');
    const counterDisplay = document.getElementById('counter-display');
    const countNumber = document.getElementById('countNumber');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const phoneNumber = input.value.trim();

        // Validate phone number
        if (!phoneNumber || phoneNumber.length < 10) {
            showToast('❌ कृपया सही फोन नंबर डालें');
            return;
        }

        // Get or create counter
        let proposalCount = parseInt(localStorage.getItem('proposalCount') || '0');
        proposalCount++;
        localStorage.setItem('proposalCount', proposalCount);

        // Update counter display
        countNumber.textContent = proposalCount;
        counterDisplay.classList.remove('hidden');

        // Send WhatsApp Message
        sendWhatsAppMessage(phoneNumber, proposalCount);

        // Clear input
        input.value = '';

        // Show toast
        showToast('✅ Message भेज दिया गया! 💌');

        // Move to final section after 2 seconds
        setTimeout(() => {
            switchSection('final-message');
        }, 2000);
    });
});

function sendWhatsAppMessage(phoneNumber, count) {
    const message = encodeURIComponent(
        `🎉 आपको एक SPECIAL MESSAGE आया है! 🎉\n\n` +
        `हेलो! मैं हूँ Aayu 💖\n\n` +
        `यह मेरा ${count}वां Proposal है! 😊\n\n` +
        `मैंने एक खूबसूरत website बनाई है अपने लिए...\n` +
        `अगर तुम्हें देखना है तो यहाँ जाओ:\n\n` +
        `💌 तुम मेरी दुनिया हो!\n` +
        `💕 तुम मेरी खुशी हो!\n` +
        `💝 तुम मेरी हर चीज़ हो!\n\n` +
        `क्या तुम मेरी जीवन के सबसे बड़े फैसले में शामिल होना चाहती हो? 💍\n\n` +
        `- Aayu ❤️`
    );

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Move button function (No button)
function moveButton(button) {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;

    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Celebrate function (Yes button)
function celebrate() {
    const celebrationMsg = document.getElementById('celebration-message');
    celebrationMsg.classList.remove('hidden');

    // Trigger confetti
    triggerConfetti();

    // Add multiple hearts
    createHearts();
}

function createHearts() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = '0px';
        heart.style.fontSize = (20 + Math.random() * 30) + 'px';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'fallHearts 3s ease-in forwards';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
    }
}

function triggerConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = ['🎉', '💕', '💖', '✨'][Math.floor(Math.random() * 4)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '0px';
        confetti.style.fontSize = '30px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = 'confettiFall 3s ease-in forwards';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// Toast function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fallHearts {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
