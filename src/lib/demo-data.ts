export const domains = [
  {name:"Account Management", icon:"Handshake", description:"Trust, alignment and progress across complex client relationships", claims:["Builds trust when client relationships are under pressure","Identifies the real issue behind a client objection","Aligns internal and client stakeholders","Moves a complex account decision forward","Turns customer feedback into an actionable plan"]},
  {name:"Leadership", icon:"Compass", description:"Clarity, ownership and sound decisions when the path is unclear", claims:["Brings calm and clarity during uncertainty","Creates ownership without relying on hierarchy","Makes difficult decisions with incomplete information","Gives direct feedback while preserving trust","Keeps a team aligned around a shared outcome"]},
  {name:"Communication", icon:"MessagesSquare", description:"Ideas and conversations that create shared understanding", claims:["Makes complex subjects easy to understand","Asks questions that reveal what matters","Adapts communication to senior stakeholders","Frames a compelling case for action","Handles disagreement constructively"]},
  {name:"Problem Solving", icon:"Puzzle", description:"Pragmatic thinking that turns ambiguity into action", claims:["Turns ambiguity into a clear problem definition","Sees patterns others miss","Chooses pragmatic solutions over unnecessary complexity","Connects technical and commercial considerations","Anticipates risks before they become expensive"]},
  {name:"Execution", icon:"Zap", description:"Focused momentum from vague idea to reliable result", claims:["Turns a vague idea into a workable plan","Creates momentum across multiple stakeholders","Prioritises what matters under pressure","Follows through reliably","Improves a process without waiting to be asked"]},
];

export const noor = { name:"Noor van Dijk", firstName:"Noor", initials:"ND", headline:"Customer strategy & commercial operations", company:"Northstar Labs", direction:"Turning complex customer moments into calm, shared progress.", contributors:8, claims:[
  {domain:"Account Management", claim:"Builds trust when client relationships are under pressure", status:"validated", label:"Would call for this", count:5, quote:"Noor reset a tense renewal by naming the real concern, then gave both teams a plan they could trust.", source:"Client"},
  {domain:"Leadership", claim:"Brings calm and clarity during uncertainty", status:"validated", label:"Seen in practice", count:4, quote:"When priorities changed overnight, she created clarity without pretending to have every answer.", source:"Project peer"},
  {domain:"Communication", claim:"Asks questions that reveal what matters", status:"validated", label:"Would call for this", count:3, quote:"Her questions moved us past symptoms and helped the customer say what was really at stake.", source:"Direct manager"},
  {domain:"Account Management", claim:"Aligns internal and client stakeholders", status:"building_evidence", label:"Recognised", count:2},
  {domain:"Leadership", claim:"Creates ownership without relying on hierarchy", status:"building_evidence", label:"Seen in practice", count:2},
]};

export const reviewClaims = [
  {domain:"Account Management", claim:"Noor keeps customer trust when a client relationship is under pressure.", context:"Client escalation · renewal", behaviours:["Names the real tension","Stays calm under pressure","Creates a credible next step","Balances both sides"]},
  {domain:"Communication", claim:"Noor asks questions that reveal what actually matters.", context:"Discovery · stakeholder meeting", behaviours:["Listens before framing","Finds the hidden concern","Clarifies the decision","Makes space for honesty"]},
  {domain:"Leadership", claim:"Noor brings calm and clarity when the path is uncertain.", context:"Changing priorities · delivery", behaviours:["Creates focus","Acknowledges uncertainty","Keeps people aligned","Makes the next move clear"]},
];
