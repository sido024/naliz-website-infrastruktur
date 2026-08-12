// Wartet, bis die Seite vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    
    // Neue Modal-Elemente holen
    const modal = document.getElementById('beauty-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    // Funktion, um das süße Popup anzuzeigen
    function showBeautyPopup(message) {
        modalMessage.innerHTML = message; // Die personalisierte Nachricht einfügen
        modal.classList.add('show'); // Popup einblenden
    }

    // Funktion, um das Popup zu schließen
    function closeBeautyPopup() {
        modal.classList.remove('show');
    }

    // Event Listener für das Formular
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            // Verhindert, dass die Seite beim Absenden neu lädt
            e.preventDefault();

            // Werte aus den Eingabefeldern auslesen
            const name = document.getElementById('name').value;
            const serviceSelect = document.getElementById('service');
            const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
            const date = document.getElementById('date').value;

            // Formatiertes Datum für die Anzeige (JJJJ-MM-TT zu TT.MM.JJJJ)
            const formattedDate = date.split('-').reverse().join('.');

            // --- HIER IST DIE ÄNDERUNG: Statt alert() rufen wir unser Popup auf ---
            
            // Wunderschöne, personalisierte Nachricht erstellen
            const beautyMessage = `Vielen Dank für deine Anfrage, liebe **${name}**!<br><br>Wir haben deine Reservierung für **${serviceName}** am **${formattedDate}** erhalten. Wir prüfen unser Termincouch und melden uns ganz schnell bei dir. ✨`;

            // Popup anzeigen
            showBeautyPopup(beautyMessage);

            // Formular nach dem Absenden zurücksetzen
            bookingForm.reset();
        });
    }

    // --- POPUP SCHLIESSEN LOGIK ---
    
    // Schließen, wenn man auf das 'X' klickt
    closeButton.addEventListener('click', closeBeautyPopup);
    
    // Schließen, wenn man auf den 'Verstanden'-Button klickt
    closeModalBtn.addEventListener('click', closeBeautyPopup);

    // Schließen, wenn man irgendwo AUF den dunklen Hintergrund klickt
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBeautyPopup();
        }
    });

    // Schließen, wenn man die 'ESC'-Taste drückt
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeBeautyPopup();
        }
    });
});