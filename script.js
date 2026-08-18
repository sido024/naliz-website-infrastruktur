document.addEventListener("DOMContentLoaded", function() {

    // --- 0. HERO-SLIDER LOGIK ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slider .slide');

    // Globale Funktion machen, damit der "onclick" im HTML sie findet
    window.moveSlide = function(direction) {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + direction + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    };
    
    // --- 1. BUCHUNGS-FORMULAR & MODAL LOGIK ---
    const bookingForm = document.getElementById('booking-form');
    const modal = document.getElementById('beauty-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    // Funktion, um das Popup anzuzeigen
    function showBeautyPopup(message) {
        if (modalMessage && modal) {
            modalMessage.innerHTML = message;
            modal.classList.add('show');
        }
    }

    // Funktion, um das Popup zu schließen
    function closeBeautyPopup() {
        if (modal) {
            modal.classList.remove('show');
        }
    }

    // Event Listener für das Formular (nur wenn es auf der Seite existiert)
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const serviceSelect = document.getElementById('service');
            const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
            const date = document.getElementById('date').value;

            const formattedDate = date.split('-').reverse().join('.');

            const beautyMessage = `Vielen Dank für deine Anfrage, liebe **${name}**!<br><br>Wir haben deine Reservierung für **${serviceName}** am **${formattedDate}** erhalten. Wir prüfen unser Termincouch und melden uns ganz schnell bei dir. ✨`;

            showBeautyPopup(beautyMessage);
            bookingForm.reset();
        });
    }

    // Modal schließen Event-Listener
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
