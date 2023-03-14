import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  UpdateCommandInput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { Invitation } from "../models/invitation";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export class InvitationService {
  private TableName = "InvitationsTable";
  private ddbClient: DynamoDBClient = new DynamoDBClient({
    region: "us-east-1",
  });

  constructor(private docClient: DynamoDBClient) {
    this.ddbClient = DynamoDBDocumentClient.from(docClient);
  }

  async getAllInvitations(): Promise<Invitation[]> {
    const params: GetCommandInput = {
      TableName: this.TableName,
      Key: {},
    };
    const invitations = await this.ddbClient.send(new GetCommand(params));

    return invitations.Item as Invitation[];
  }

  async getInvitationById(id: string): Promise<Invitation> {
    const params: GetCommandInput = {
      TableName: this.TableName,
      Key: {
        id,
      },
    };
    const invitation = await this.ddbClient.send(new GetCommand(params));

    return invitation.Item as Invitation;
  }

  async setWillGoStatus(id: string, willGo: boolean): Promise<Invitation> {
    const params: UpdateCommandInput = {
      TableName: this.TableName,
      Key: {
        id,
      },
      UpdateExpression: "set willGo = :willGo",
      ExpressionAttributeValues: {
        ":willGo": willGo,
      },
      ReturnValues: "ALL_NEW",
    };
    const invitation = await this.docClient.send(new UpdateCommand(params));

    return invitation.Attributes as Invitation;
  }

  // async asyncDeleteInvitation(id: string): Promise<void> {
  //   await this.docClient
  //     .delete({
  //       TableName: this.TableName,
  //       Key: {
  //         id,
  //       },
  //     })
  //     .promise();
  // }
}
