import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  UpdateCommandInput,
  UpdateCommand,
  DeleteCommandInput,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Invitation } from "../models/invitation";
import { ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";

export class InvitationService {
  private TableName = `${process.env.STAGE}-InvitationsTable`;

  constructor(private docClient: DynamoDBDocumentClient) {}

  async getAllInvitations(): Promise<Invitation[]> {
    const params: ScanCommandInput = {
      TableName: this.TableName,
    };
    const invitations = await this.docClient.send(new ScanCommand(params));

    return invitations.Items as unknown as Invitation[];
  }

  async getInvitationById(id: string): Promise<Invitation> {
    const params: GetCommandInput = {
      TableName: this.TableName,
      Key: {
        id,
      },
    };
    const invitation = await this.docClient.send(new GetCommand(params));

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

  async deleteInvitation(id: string): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: this.TableName,
      Key: {
        id,
      },
    };
    await this.docClient.send(new DeleteCommand(params));
  }
}
