import { describe, expect, it } from "vitest";
import { calculateClaimConfidence, mapEvidenceLevel, signalStrength, validationStatus, type SignalInput } from "../src/lib/scoring";

const strong: SignalInput[] = [
  { responseType: "would_call", relationshipType: "client", hasWrittenEvidence: true },
  { responseType: "seen_in_practice", relationshipType: "direct_manager", hasBehaviours: true },
  { responseType: "recognised", relationshipType: "direct_project_peer", hasBehaviours: true },
];
describe("evidence model", () => {
  it("maps practical signals to Miller levels", () => { expect(mapEvidenceLevel("would_call", "mentor")).toBe("does"); expect(mapEvidenceLevel("seen_in_practice", "community_contact")).toBe("shows_how"); });
  it("calculates explainable confidence", () => { expect(calculateClaimConfidence(strong)).toBeGreaterThan(40); expect(calculateClaimConfidence(strong)).toBeLessThanOrEqual(100); });
  it("requires contributor count, practice and diversity", () => { expect(validationStatus(strong)).toBe("validated"); expect(validationStatus(strong.slice(0,2))).toBe("building_evidence"); });
  it("never treats not seen or skip as negative", () => { expect(signalStrength({responseType:"not_seen",relationshipType:"client"})).toBe(0); expect(calculateClaimConfidence([{responseType:"skipped",relationshipType:"client"}])).toBe(0); expect(calculateClaimConfidence([...strong,{responseType:"not_seen",relationshipType:"client"}])).toBe(calculateClaimConfidence(strong)); });
});
