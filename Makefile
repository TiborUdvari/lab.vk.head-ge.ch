setup-vps:
	@echo "Setting up VPS"
	cd infra && ansible-playbook setup-vps.yml

make update-secrets:
	@echo "Updating .secrets file with base64 files not included in git"
	./update-secrets.sh

make send-student-mail:
	@echo "Open mail client to send individual student passwords"
	./sent-pass.sh

make local-deploy:
	@echo "Running deploy worflow locally with act"
	act -P ubuntu-latest=-self-hosted

make dev:
	@echo "Running browser sync for development"
	npx browser-sync start --proxy "localhost:8080" --files "www/**/*,students/**/*" --port 3000 --no-open

make backup:
	@echo "Backing up student websites"
	@TS=$$(date +%Y-%m-%d_%H-%M-%S); \
	ssh ubuntu@lab.vk.head-ge.ch "tar -C /srv/lab.vk.head-ge.ch -czf - students --ignore-failed-read" | pv > backups/students_$$TS.tar.gz
	@echo "Opening backup locations for manual server backup"	
	open backups/onedrive-backup.webloc
	open backups

make get-dog-data:
	@echo "Downloading dog image collection from unspash"
	node www/assets/dogs/download.mjs

ig-mp4-convert:
	@echo "Converting Instagram videos"
	# usage: make ig-mp4-convert FOLDER=first.lastname SIZE=1080
	@zsh scripts/ig-convert-videos.sh $(FOLDER) $(SIZE)

ig-poster:
	@echo "Extracting Instagram posters"
	# usage: make ig-poster FOLDER=first.lastname SIZE=1080
	@zsh scripts/ig-extract-posters.sh $(FOLDER) $(SIZE)

ig-img-convert:
	@echo "Converting Instagram images"
	# usage: make ig-img-convert FOLDER=first.lastname SIZE=1080
	@zsh scripts/ig-convert-images.sh $(FOLDER) $(SIZE)

ig-size:
	@echo "Usage: make ig-size FOLDER=firstname.lastname"
	@if [ -z "$(FOLDER)" ]; then \
		echo "Error: FOLDER variable not set"; \
		exit 1; \
	fi; \
	SRC="ig_data/$(FOLDER)"; \
	if [ ! -d "$$SRC" ]; then \
		echo "Error: Folder $$SRC does not exist"; \
		exit 1; \
	fi; \
	echo "=== Folder sizes for $$SRC ==="; \
	echo "Total folder size:"; du -sh "$$SRC"; \
	echo "Total JPG size:"; \
	find "$$SRC" -type f -name "*.jpg" -exec stat -f%z {} \; | \
	awk '{total += $$1} END {printf "%.2f MB\n", total/1024/1024}'; \
	echo "Total webp size:"; \
	find "$$SRC" -type f -name "*.webp" -exec stat -f%z {} \; | \
	awk '{total += $$1} END {printf "%.2f MB\n", total/1024/1024}'; \
	echo "Total mp4 size:"; \
	find "$$SRC" -type f -name "*.mp4" -exec stat -f%z {} \; | \
	awk '{total += $$1} END {printf "%.2f MB\n", total/1024/1024}'

ig-clean-and-anon:
	@echo "Decoding and anonymising Instagram messages"
	@if [ -z "$(FOLDER)" ]; then \
		echo "Error: FOLDER variable not set"; \
		exit 1; \
	fi; \
	SRC_DIR="ig_data/$(FOLDER)/your_instagram_activity/messages/inbox"; \
	if [ ! -d "$$SRC_DIR" ]; then \
		echo "Error: Folder $$SRC_DIR does not exist"; \
		exit 1; \
	fi; \
	for f in "$$SRC_DIR"/*/message_*.json; do \
		echo "Decoding $$f"; \
		node scripts/ig-decode-content.mjs "$$f"; \
		echo "Anonymising $$f"; \
		jq -f scripts/anon.jq "$$f" | sponge "$$f"; \
	done; \
	echo "Removing all JPG and MP4 files in $$SRC_DIR"; \
	find "$$SRC_DIR" -type f \( -iname "*.jpg" -o -iname "*.mp4" \) -delete

ig-concat-messages:
	@echo "Concatenating all messages for Instagram folder"
	@if [ -z "$(FOLDER)" ]; then \
		echo "Error: FOLDER variable not set"; \
		exit 1; \
	fi; \
	SRC_DIR="ig_data/$(FOLDER)/your_instagram_activity/messages"; \
	if [ ! -d "$$SRC_DIR" ]; then \
		echo "Error: Folder $$SRC_DIR does not exist"; \
		exit 1; \
	fi; \
	find "$$SRC_DIR" -name "message_*.json" -print0 \
		| xargs -0 jq -s '[ .[] | .messages[] ]' \
		> "ig_data/$(FOLDER)/all_messages.json"; \
	echo "All messages concatenated to ig_data/$(FOLDER)/all_messages.json"

# json2csv
# jq -f scripts/anon.jq "$$f" > "$${f%.json}.anon.json"; \
