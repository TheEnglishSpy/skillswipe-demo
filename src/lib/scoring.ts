export type ResponseType = "not_seen" | "recognised" | "seen_in_practice" | "would_call" | "skipped";
export type RelationshipType = "client" | "direct_manager" | "direct_project_peer" | "cross_functional_colleague" | "mentor" | "community_contact";
export type EvidenceLevel = "knows" | "knows_how" | "shows_how" | "does";
export interface SignalInput { responseType: ResponseType; relationshipType: RelationshipType; hasBehaviours?: boolean; hasWrittenEvidence?: boolean; createdAt?: Date }

const evidenceWeight: Record<ResponseType, number> = { not_seen: 0, skipped: 0, recognised: .35, seen_in_practice: .7, would_call: 1 };
const relationshipWeight: Record<RelationshipType, number> = { client: 1, direct_manager: .95, direct_project_peer: .85, cross_functional_colleague: .7, mentor: .65, community_contact: .45 };

export function mapEvidenceLevel(response: ResponseType, relationship: RelationshipType): EvidenceLevel {
  if (response === "would_call") return "does";
  if (response === "seen_in_practice") return ["client","direct_manager","direct_project_peer"].includes(relationship) ? "does" : "shows_how";
  return "knows";
}

export function signalStrength(signal: SignalInput, now = new Date()): number {
  const base = evidenceWeight[signal.responseType];
  if (base === 0) return 0;
  const specificity = signal.hasWrittenEvidence ? 1 : signal.hasBehaviours ? .7 : .4;
  const ageDays = signal.createdAt ? Math.max(0, (now.getTime() - signal.createdAt.getTime()) / 86_400_000) : 0;
  const recency = ageDays <= 365 ? 1 : ageDays <= 730 ? .85 : .7;
  return Math.round(base * relationshipWeight[signal.relationshipType] * specificity * recency * 100);
}

export function calculateClaimConfidence(signals: SignalInput[]): number {
  const positive = signals.filter(s => evidenceWeight[s.responseType] > 0);
  if (!positive.length) return 0;
  const strengths = positive.map(s => signalStrength(s)).sort((a,b) => b-a);
  const weightedAverage = strengths.reduce((sum, value, i) => sum + value * Math.pow(.78, i), 0) / strengths.reduce((sum, _, i) => sum + Math.pow(.78, i), 0);
  const corroboration = Math.min(1, .55 + positive.length * .15);
  const diversity = Math.min(1, .7 + new Set(positive.map(s => s.relationshipType)).size * .1);
  return Math.min(100, Math.round(weightedAverage * corroboration * diversity));
}

export function validationStatus(signals: SignalInput[]): "building_evidence" | "validated" {
  const positive = signals.filter(s => evidenceWeight[s.responseType] > 0);
  const practical = positive.some(s => s.responseType === "seen_in_practice" || s.responseType === "would_call");
  const relationships = new Set(positive.map(s => s.relationshipType));
  return positive.length >= 3 && practical && relationships.size >= 2 ? "validated" : "building_evidence";
}
