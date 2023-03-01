import { handlerPath } from "@libs/handler-resolver";

export const etInvitationById = {
  handler: `${handlerPath(__dirname)}/handler.getInvitationById`,
  events: [
    {
      http: {
        method: "get",
        path: "invitation/{id}",
      },
    },
  ],
};
