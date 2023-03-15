import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import invitationService from "src/service";

const deleteInvitation = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters;
  try {
    await invitationService.deleteInvitation(id);
    return formatJSONResponse({
      message: `Invitation with id ${id} deleted successfully`,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      error: e,
    });
  }
};

export const main = middyfy(deleteInvitation);
