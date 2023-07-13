import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import middyJsonBodyParser from "@middy/http-json-body-parser";

export const middyfy = (handler: any) => {
  return middy(handler)
    .use(httpHeaderNormalizer())
    .use(middyJsonBodyParser())
    .use(
      httpErrorHandler({
        fallbackMessage: "An error occurred, please try again later",
      })
    );
};
