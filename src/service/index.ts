import dynamoDBClient from "src/models";
import { InvitationService } from "src/service/invitations-service";

const invitationService = new InvitationService(dynamoDBClient());
export default invitationService;
