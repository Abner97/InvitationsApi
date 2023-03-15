import { dynamoDBDocClient } from "@libs/dynamoDBDocClient";
import { InvitationService } from "src/service/invitations-service";

const invitationService = new InvitationService(dynamoDBDocClient);
export default invitationService;
