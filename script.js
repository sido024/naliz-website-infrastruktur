// 1. Die Funktion ganz nach oben setzen, damit sie sofort global verfügbar ist
let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

// 2. Alles andere wartet auf das Laden der Seite
document.addEventListener("DOMContentLoaded", function() {

// Automatischer Slider-Wechsel (alle 4 Sekunden)
    setInterval(() => {
        moveSlide(1);
    }, 4000);

    // --- 1. BUCHUNGS-FORMULAR & MODAL LOGIK ---
    const bookingForm = document.getElementById('booking-form');
    const modal = document.getElementById('beauty-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    function showBeautyPopup(message) {
        if (modalMessage && modal) {
            modalMessage.innerHTML = message;
            modal.classList.add('show');
        }
    }

    function closeBeautyPopup() {
        if (modal) {
            modal.classList.remove('show');
        }
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const serviceSelect = document.getElementById('service');
            const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
            const date = document.getElementById('date').value;

            const formattedDate = date.split('-').reverse().join('.');

            const beautyMessage = `Vielen Dank für deine Anfrage, liebe **${name}**!<br><br>Wir haben deine Reservierung für **${serviceName}** am **${formattedDate}** erhalten. Wir prüfen unser Terminkontingent und melden uns ganz schnell bei dir. ✨`;

            showBeautyPopup(beautyMessage);
            bookingForm.reset();
        });
    }

    if (closeButton) closeButton.addEventListener('click', closeBeautyPopup);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeBeautyPopup);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBeautyPopup();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeBeautyPopup();
        }
    });

    // --- 2. 3D-SCROLL-REVEAL-EFFEKT FÜR BOXEN ---
    const boxes = document.querySelectorAll('.scroll-reveal-box');

    if (boxes.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        boxes.forEach((box) => {
            observer.observe(box);
        });
    }

});
