import { logger, newFunction } from "./lib/firebase";

import { imageIsSafe } from "./lib/images";

export const testImageLabel = newFunction.https.onCall(async (data) => {
  logger.log(await imageIsSafe("#1116.jpg"));
});
