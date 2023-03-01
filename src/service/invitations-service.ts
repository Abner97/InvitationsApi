import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Invitation } from "../models/invitation";

export class InvitationService {
  private TableName = "InvitationsTable";

  constructor(private docClient: DocumentClient) {}

  async getAllInvitations(): Promise<Invitation[]> {
    const invitations = await this.docClient
      .scan({
        TableName: this.TableName,
      })
      .promise();

    return invitations.Items as Invitation[];
  }

  async getInvitationById(id: string): Promise<Invitation> {
    const invitation = await this.docClient
      .get({
        TableName: this.TableName,
        Key: {
          id,
        },
      })
      .promise();

    return invitation.Item as Invitation;
  }

  async setWillGoStatus(id: string, willGo: boolean): Promise<Invitation> {
    const invitation = await this.docClient
      .update({
        TableName: this.TableName,
        Key: {
          id,
        },
        UpdateExpression: "set willGo = :willGo",
        ExpressionAttributeValues: {
          ":willGo": willGo,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return invitation.Attributes as Invitation;
  }
}
