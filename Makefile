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

