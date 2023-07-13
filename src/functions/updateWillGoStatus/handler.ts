import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import invitationService from "../../service";
import schema from "./schema";

const updateWillGoStatus: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  if (event.body) {
    const { id, willGo } = event.body;
    try {
      await invitationService.setWillGoStatus(id, willGo);
      return formatJSONResponse({
        message: "Invitation updated successfully",
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        error: e,
      });
    }
  }
};

export const main = middyfy(updateWillGoStatus);
