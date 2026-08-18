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
* Verzeichnisstruktur: /var/www/mein-projekt/ (mit lokalem /backups/ Verzeichnis).

### B. DNS-Konfiguration
* Manuelle Zuweisung der Domain via `/etc/hosts`:
  ```text
  127.0.0.1   nilaz.test

###  C. Sicherheit & Verschlüsselung
SSL/TLS: Erstellung eines selbstsignierten Zertifikats via OpenSSL:

* /etc/ssl/private/nilaz-selfsigned.key

* /etc/ssl/certs/nilaz-selfsigned.crt

Firewall (UFW): Absicherung gegen unbefugte Zugriffe:

* Erlaubte Dienste: SSH, Nginx Full (HTTP/HTTPS).

* Status: Aktiv.

### D. Monitoring
Überwachung der Server-Logdateien in /var/log/nginx/access.log.

### 3. Wartung & Kommandos
3. Wartung & Kommandos

* Nginx Neustart: sudo systemctl restart nginx

* Firewall Status: sudo ufw status

* Logs prüfen: sudo tail -f /var/log/nginx/access.log

*Backup manuell starten: sudo /usr/local/bin/backup-naliz.sh

* Backup-Status prüfen: ls -lh /var/www/mein-projekt/backups

### 4. Backup-Strategie

Zur Sicherstellung der Datenverfügbarkeit wurde eine automatisierte Backup-Strategie implementiert:

* Skript: Ein Shell-Skript (/usr/local/bin/backup-naliz.sh) sichert täglich die Web-Dateien (/var/www/mein-projekt) sowie die Nginx-Konfiguration (/etc/nginx/sites-available).

* Retention Policy: Automatische Löschung von Backups, die älter als 7 Tage sind.

* Automatisierung: Implementierung als Cronjob, der das Backup täglich um 03:00 Uhr ausführt.

* **Versionsverwaltung:** Das Skript wurde lokal versioniert und in das zentrale GitHub-Repository (`naliz-website-infrastruktur`) integriert. 
