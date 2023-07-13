import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import invitationService from "src/service";

const getAllInvitations = async (
  _: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const invitations = await invitationService.getAllInvitations();

    return formatJSONResponse({
      invitations,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      error: e,
    });
  }
};

export const main = middyfy(getAllInvitations);
