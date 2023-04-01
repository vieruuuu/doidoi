import { visionClient } from "./firebase";

export async function isImageSpam(imagePath: string): Promise<boolean> {
  const [{ safeSearchAnnotation }] = await visionClient.safeSearchDetection(
    imagePath
  );

  if (!safeSearchAnnotation) {
    return true;
  }

  const likelihoods = Object.values(safeSearchAnnotation);

  return likelihoods.includes("LIKELY") || likelihoods.includes("VERY_LIKELY");
}
