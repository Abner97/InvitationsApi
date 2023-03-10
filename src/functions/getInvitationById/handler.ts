import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import invitationService from "../../service";

const getInvitationById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters;
  try {
    const invitation = await invitationService.getInvitationById(id);
    return formatJSONResponse({
      ...invitation,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      error: e,
    });
  }
};

export const main = middyfy(getInvitationById);
