up:
	docker-compose -f docker-compose.yaml up --build --remove-orphans --force-recreate

run-node:
	npm run start

start:run-node
