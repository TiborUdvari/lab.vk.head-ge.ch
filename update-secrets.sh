#!/usr/bin/env bash
set -e

SECRETS_FILE=".secrets"

# Function to set/update a secret
update_secret() {
    local var_name=$1
    local file_path=$2

    if [ ! -f "$file_path" ]; then
        echo "Warning: $file_path does not exist, skipping $var_name"
        return
    fi

    local encoded
    encoded=$(base64 < "$file_path" | tr -d '\n')

    # If the variable exists, replace the line; else, append
    if grep -q "^${var_name}=" "$SECRETS_FILE"; then
        # Replace existing line
        sed -i.bak "s|^${var_name}=.*|${var_name}=${encoded}|" "$SECRETS_FILE"
        rm -f "$SECRETS_FILE.bak"
        echo "Updated $var_name from $file_path"
    else
        # Append new line
        echo "${var_name}=${encoded}" >> "$SECRETS_FILE"
        echo "Added $var_name from $file_path"
    fi
}

# Example usage
update_secret "VPS_SSH_KEY_B64" "./infra/ci-deploy-key"
update_secret "USERS_CONF_B64" "./users.conf"
update_secret "SSH_HOST_ED25519_KEY_B64" "./ssh_host_ed25519_key"
update_secret "SSH_HOST_RSA_KEY_B64" "./ssh_host_rsa_key"

echo "✅ .secrets updated!"
