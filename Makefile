include .env
export

push:
	-@git add .
	-@git commit -m "update"
	-@git push
	-@clear

kill:
	@kill -9 $(shell lsof -t -i :3000 2>/dev/null) || echo "No process on port 3000"

monitor:
	htop

run:
	@npm run dev

phone: push run