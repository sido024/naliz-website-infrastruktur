# Server Infrastruktur & Dokumentation: nilaz.test

Dieses Dokument beschreibt den Aufbau und die Absicherung des lokalen Webservers für das Projekt *naliz-website.infrastruktur*.

## 1. Übersicht
* **System:** Ubuntu Linux (VM)
* **Webserver:** Nginx
* **Domain:** `https://nilaz.test`
* **Verschlüsselung:** TLS/SSL (selbstsigniert)

## 2. Implementierte Schritte
### A. Webserver-Konfiguration (Nginx)
* Installation und Einrichtung von Nginx.
* Konfiguration des `server_blocks` für die Domain `nilaz.test`.
* Verzeichnisstruktur: `/var/www/nilaz/`.

### B. DNS-Konfiguration
* Manuelle Zuweisung der Domain via `/etc/hosts`:
  ```text
  127.0.0.1   nilaz.test

###  C. Sicherheit & Verschlüsselung
SSL/TLS: Erstellung eines selbstsignierten Zertifikats via OpenSSL:

/etc/ssl/private/nilaz-selfsigned.key

/etc/ssl/certs/nilaz-selfsigned.crt

Firewall (UFW): Absicherung gegen unbefugte Zugriffe:

Erlaubte Dienste: SSH, Nginx Full (HTTP/HTTPS).

Status: Aktiv.

### D. Monitoring
Überwachung der Server-Logdateien in /var/log/nginx/access.log.

### 3. Wartung & Kommandos
Nginx Neustart: sudo systemctl restart nginx

Firewall Status: sudo ufw status

Logs prüfen: sudo tail -f /var/log/nginx/access.log

