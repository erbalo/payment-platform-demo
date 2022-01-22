## How to run the project

1. Start the docker compose

```shell
$> docker-compose up
```

2. Start each line from scripts folder

```shell
$> docker run -p 8000:8000 -d amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath .

$> aws dynamodb create-table \
   --table-name transactions \
   --attribute-definitions AttributeName=id,AttributeType=S \
   --key-schema AttributeName=id,KeyType=HASH \
   --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
   --endpoint-url http://localhost:8000

# Just to verify
$> aws dynamodb list-tables --endpoint-url http://localhost:8000
```

3. Intall dependencies

```shell
$> npm install
```

4. Run the project

```shell
$> npm start
```

5. Go to the rabbit UI http://localhost:15672 - User: guest and Password: guest

6. Search the queue

7. Publish the payload

```json
{
  "command": "command-execution",
  "args": {
    "proxy": "PAYPAL",
    "order": {
      "id": 7891,
      "items": [
        {
          "id": 1287,
          "quantity": 5,
          "price": 12.5
        },
        {
          "id": 1281,
          "quantity": 2,
          "price": 15
        }
      ]
    }
  }
}
```
