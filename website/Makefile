
APP_NAME = Network
PORT = 3001
DIST_FOLDER = dist


all: deploy

build:
	echo "🚧 Building the project..."
	npm run build

restart:
	echo "🔄 Restarting Server..."
	# This tries to restart. If the app doesn't exist, it starts it fresh.
	pm2 restart $(APP_NAME) || pm2 serve $(DIST_FOLDER) $(PORT) --name "$(APP_NAME)" --spa
	pm2 save

deploy: build restart
	echo "✅ SUCCESS! Website updated on port $(PORT)"

logs:
	pm2 logs $(APP_NAME)