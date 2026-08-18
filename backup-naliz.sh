#!/bin/bash
# NALIZ Backup Skript

SOURCE_WEB="/var/www/mein-projekt"
SOURCE_CONFIG="/etc/nginx/sites-available"
BACKUP_DIR="/var/www/mein-projekt/backups"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_FILE="$BACKUP_DIR/naliz_backup_$DATE.tar.gz"

# Verzeichnis sicherstellen
mkdir -p $BACKUP_DIR

# Archiv erstellen
tar -czf $BACKUP_FILE $SOURCE_WEB $SOURCE_CONFIG

# Aufräumen: Backups älter als 7 Tage löschen
find $BACKUP_DIR -type f -name "*.tar.gz" -mtime +7 -delete

echo "Backup erfolgreich: $BACKUP_FILE"
diesen text speichern?