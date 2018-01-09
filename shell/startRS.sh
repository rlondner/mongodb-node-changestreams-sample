mkdir -p data/rs1/db
mongod --dbpath ./data/rs1/db --replSet "rs" --port 27017