
APP_NAME = Network
PORT = 3001
DIST_FOLDER = dist


all: deploy

build:
	@clear
	@echo "\n🚧 Building the project..."
	@npm run build

restart:
	@echo "🔄 Restarting Server..."
	@pm2 restart $(APP_NAME) || pm2 serve $(DIST_FOLDER) $(PORT) --name "$(APP_NAME)" --spa
	@pm2 save

deploy: build restart
	@echo "\n✅ SUCCESS! \n"

logs:
	@pm2 logs $(APP_NAME)