import { visionClient } from "./firebase";

export async function imageIsSafe(imagePath: string): Promise<boolean> {
  const [{ safeSearchAnnotation }] = await visionClient.safeSearchDetection(
    `gs://doidoi-team.appspot.com/${imagePath}`
  );

  if (!safeSearchAnnotation) {
    return false;
  }

  const likelihoods = Object.values(safeSearchAnnotation);

  return (
    !likelihoods.includes("LIKELY") && !likelihoods.includes("VERY_LIKELY")
  );
}
