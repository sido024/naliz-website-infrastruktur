### Master-Leitfaden: Lokaler Ubuntu Webserver mit Nginx, SSL & Firewall
Dieser Leitfaden beschreibt den standardisierten, fehlerfreien Ablauf, um einen sicheren Webserver unter Ubuntu Linux einzurichten.

### Schritt 1: System-Update & Nginx Installation
Bevor ich starte, bringe ich das System auf den neuesten Stand und installiere den Webserver.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx -y
Prüfen, ob Nginx läuft:

```bash
sudo systemctl status nginx
(Der Status sollte active (running) zeigen).

### Schritt 2: Projektverzeichnis & Berechtigungen einrichten.
Erstelle einen eigenen Ordner für die Webseite, damit er nicht im Standard-Pfad von Nginx liegt.

```bash
# Ordner erstellen (ersetze 'mein-projekt' durch Projektnamen)
sudo mkdir -p /var/www/mein-projekt

# Berechtigungen an den aktuellen Benutzer übergeben
sudo chown -R $USER:$USER /var/www/mein-projekt

# Test-Datei anlegen
echo "<h1>Hallo Welt! Mein Server läuft.</h1>" > /var/www/mein-projekt/index.html

### Schritt 3: Nginx Server-Block (Virtual Host) konfigurieren
Erstelle eine eigene Konfigurationsdatei für die Domain (z. B. nilaz.test).

```bash
sudo nano /etc/nginx/sites-available/nilaz.test
Füge folgenden Inhalt ein (Pfade und Domain entsprechend anpassen):

Nginx
server {
    listen 80;
    server_name nilaz.test www.nilaz.test;
    root /var/www/mein-projekt;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
Speichern in Nano: Strg + O, Enter, danach Strg + X.

Aktivieren der Site & Testen:

```bash
# Softlink in sites-enabled erstellen
sudo ln -s /etc/nginx/sites-available/nilaz.test /etc/nginx/sites-enabled/

# Konfiguration auf Syntaxfehler prüfen
sudo nginx -t

# Nginx neu starten
sudo systemctl restart nginx
Schritt 4: Lokale DNS-Auflösung einrichten
Damit dein Rechner die Domain nilaz.test auf dem lokalen Server findet:

```bash
sudo nano /etc/hosts
Füge ganz unten folgende Zeile hinzu:

Plaintext
127.0.0.1   nilaz.test
Speichern: Strg + O, Enter, Strg + X. (Testen im Browser unter [http://nilaz.test](http://nilaz.test)).

### Schritt 5: SSL-Verschlüsselung (HTTPS) einrichten
Erstellen eines eigenen lokalen SSL-Zertifikat mit OpenSSL.

```bash
# Zertifikat und Schlüssel generieren (gilt für 365 Tage)
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/nilaz-selfsigned.key \
  -out /etc/ssl/certs/nilaz-selfsigned.crt
(Hinweis: Bei den Abfragen kann man einfach Enter drücken oder Werte wie "Germany/Stadt" eintragen).

Nginx für SSL anpassen:
Öffnen der Server-Block-Datei erneut:

```bash
sudo nano /etc/nginx/sites-available/nilaz.test
Erweitere die Konfiguration für Port 443 (HTTPS) und leite HTTP automatisch um:

Nginx
server {
    listen 80;
    server_name nilaz.test www.nilaz.test;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name nilaz.test www.nilaz.test;

    root /var/www/mein-projekt;
    index index.html index.htm;

    ssl_certificate /etc/ssl/certs/nilaz-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nilaz-selfsigned.key;

    location / {
        try_files $uri $uri/ =404;
    }
}
Speichern, Syntax testen und Nginx neu starten:

```bash
sudo nginx -t
sudo systemctl restart nginx
(Im Browser nun über [https://nilaz.test](https://nilaz.test) aufrufen und das selbstsignierte Zertifikat im Browser bestätigen).

### Schritt 6: Firewall (UFW) absichern
Sperre unnötige Ports und erlaube nur das Nötigste.

```bash
# SSH-Zugang absichern (wichtig, damit ich mich nicht aussperre!)
sudo ufw allow ssh

# HTTP und HTTPS für Nginx erlauben
sudo ufw allow 'Nginx Full'

# Firewall aktivieren
sudo ufw enable

# Status kontrollieren
sudo ufw status verbose
Schritt 7: Monitoring & Logs prüfen
Um zu sehen, ob Anfragen auf dem Server ankommen:

```bash
sudo tail -f /var/log/nginx/access.log
(Zum Beenden: Strg + C).
