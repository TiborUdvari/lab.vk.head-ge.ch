#!/bin/bash
CONF="users.conf"

while IFS=: read -r username password _; do
  [ -z "$username" ] && continue
  email="${username}@etu.hesge.ch"
  pass="$password"
  body="Bonjour,

Voici vos informations pour le cours laboratoire :

Serveur SFTP : lab.vk.head-ge.ch
Port : 2222
Nom d'utilisateur: $username
Mot de passe : $pass

Merci de déposer vos fichiers dans votre dossier www.

Meilleures salutations,
Tibor Udvari
"

  body_encoded="${body//$'\n'/%0A}"   # replace newline with %0A
  body_encoded="${body_encoded// /%20}" # replace spaces with %20

  open "mailto:${email}?subject=Labo%20SFTP%20&body=${body_encoded}"

done < "$CONF"
