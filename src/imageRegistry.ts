import portraitImg from "./assets/images/about-me/portrait.png";
import reviseSmarterPng from "./assets/images/case-studies/revise-smarter.png";
import textileTraceabilityPng from "./assets/images/case-studies/textile-traceability.png";
import travelmaticPlatformPng from "./assets/images/case-studies/travelmatic-platform.png";
import yolearnLandingPng from "./assets/images/case-studies/yolearn-landing.png";
import hobby01 from "./assets/images/frames-beyond-design/hobby-01.png";
import hobby02 from "./assets/images/frames-beyond-design/hobby-02.png";
import hobby03 from "./assets/images/frames-beyond-design/hobby-03.png";
import hobby04 from "./assets/images/frames-beyond-design/hobby-04.png";
import hobby05 from "./assets/images/frames-beyond-design/hobby-05.png";

// Central static bundle mapping
export const IMAGES_BUNDLED: Record<string, string> = {
  "portrait": portraitImg,
  "revise-smarter": reviseSmarterPng,
  "textile-traceability": textileTraceabilityPng,
  "travelmatic-platform": travelmaticPlatformPng,
  "yolearn-landing": yolearnLandingPng,
  "hobby-01": hobby01,
  "hobby-02": hobby02,
  "hobby-03": hobby03,
  "hobby-04": hobby04,
  "hobby-05": hobby05,
};

/**
 * Gets the static bundled active image source.
 */
export function getActiveImage(key: string): string {
  return IMAGES_BUNDLED[key] || "";
}
