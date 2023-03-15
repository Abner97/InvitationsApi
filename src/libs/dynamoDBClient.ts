import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const dynamoDBClient = () => {
  if (process.env.IS_OFFLINE) {
    console.log("Creating a local DynamoDB instance");
    return new DynamoDBClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
    });
  }

  return new DynamoDBClient({
    region: "us-east-1",
  });
};

export default dynamoDBClient;
