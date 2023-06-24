import type { AWS } from "@serverless/typescript";
import getInvitationById from "@functions/getInvitationById";
import updateWillGoStatus from "@functions/updateWillGoStatus";
import getAllInvitations from "@functions/getAllInvitations";
import deleteInvitation from "@functions/deleteInvitation";

const serverlessConfiguration: AWS = {
  service: "invitationsapi",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    logs: {
      restApi: true,
    },
    apiGateway: {
      apiKeys: ["InvitationsApi"],
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },

    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: "arn:aws:dynamodb:us-west-2:*:table/TodosTable",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    getInvitationById,
    updateWillGoStatus,
    getAllInvitations,
    deleteInvitation,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
        seed: true,
        convertEmptyValues: true,
      },
      seed: {
        domain: {
          sources: [
            {
              table: "InvitationsTable",
              sources: ["./seed/invitations.json"],
            },
          ],
        },
      },
      stages: "dev",
    },
  },

  resources: {
    Resources: {
      InvitationsTable: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Retain",
        Properties: {
          TableName: "InvitationsTable",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
