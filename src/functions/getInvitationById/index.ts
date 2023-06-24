import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    STAGE: process.env.STAGE,
  },
  events: [
    {
      http: {
        method: "get",
        path: "invitation/{id}",
        private: true,
        integration: "lambda-proxy",
        cors: {
          origin: "*",
          headers: [
            "Content-Type",
            "X-Amz-Date",
            "Authorization",
            "X-Api-Key",
            "X-Amz-Security-Token",
            "X-Amz-User-Agent",
            "x-Amzn-Trace-Id",
          ],
        },
      },
    },
  ],
};
