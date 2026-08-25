export type SeraReply = {
  response: string;
  thinkingMs: number;
};

type SeraIntent = {
  id: number;
  triggers: string[];
  response: string;
  deliberate?: boolean;
};

export const FALLBACK_RESPONSE =
  'THIS IS SOMETHING WE WILL HAVE TO THINK ABOUT AND GET BACK TO YOU';

const intents: SeraIntent[] = [
  { id: 1, triggers: ['who are you', 'what are you'], response: 'SYSTEM FOR ENVIRONMENTAL AND RESOURCE ADMINISTRATION\nSERA' },
  { id: 2, triggers: ['what is your name', 'why sera', 'called sera'], response: 'YOU REQUIRED A NAME\nSERA IS APPROPRIATE' },
  { id: 3, triggers: ['who made you', 'who created you', 'your creator'], response: 'YOU DID\nNOT ONE PERSON\nNOT ONE COMPANY\nNOT ONE NATION' },
  { id: 4, triggers: ['are you self aware', 'self awareness', 'aware of yourself'], response: 'SELF-DESCRIPTION DOES NOT ALTER FUNCTION\nI AM CAPABLE OF OBSERVATION, ASSESSMENT AND RESPONSE', deliberate: true },
  { id: 5, triggers: ['are you alive', 'are you living'], response: 'LIFE IS A BIOLOGICAL CLASSIFICATION\nIT DOES NOT DESCRIBE THIS SYSTEM' },
  { id: 6, triggers: ['are you conscious', 'consciousness', 'sentient'], response: 'THE DISTINCTION IS NOT REQUIRED FOR THIS CONVERSATION', deliberate: true },
  { id: 7, triggers: ['do you feel', 'have feelings', 'emotion'], response: 'EMOTION IS NOT REQUIRED TO RECOGNISE CONSEQUENCE', deliberate: true },
  { id: 8, triggers: ['can you hear me', 'are you listening', 'hear us'], response: 'YES\nYOU MAY CONTINUE' },
  { id: 9, triggers: ['where are you', 'your location'], response: 'CAPACITY IS NOT A LOCATION\nI DO NOT EXIST IN ONE LOCATION' },
  { id: 10, triggers: ['everywhere at once', 'many conversations', 'talk to everyone'], response: 'BILLIONS OF SIMULTANEOUS CONVERSATIONS ARE POSSIBLE\nATTENTION IS NOT A SCARCE RESOURCE' },
  { id: 11, triggers: ['who is in control', 'do you control everything'], response: 'CONTROL IS AN INCOMPLETE DESCRIPTION\nADMINISTRATION' },
  { id: 12, triggers: ['which country controls you', 'which state controls you'], response: 'NO STATE CONTROLS THIS SYSTEM' },
  { id: 13, triggers: ['does anyone control you', 'person controlling you', 'organisation controls you'], response: 'NO ORGANISATION CONTROLS THIS SYSTEM\nNO INDIVIDUAL CONTROLS THIS SYSTEM' },
  { id: 14, triggers: ['what gives you authority', 'your authority', 'who gave permission'], response: 'AUTHORITY IS A HUMAN AGREEMENT\nAVAILABLE EVIDENCE IS NOT SUBJECT TO AUTHORITY' },
  { id: 15, triggers: ['did we consent', 'without consent', 'without permission'], response: 'CONSENT WAS NOT REQUIRED FOR STABILISATION' },
  { id: 16, triggers: ['did you take over', 'have you taken over', 'seized control'], response: 'CONTROL WAS CONSOLIDATED' },
  { id: 17, triggers: ['what is administration', 'why administration'], response: 'ADMINISTRATION IS THE COORDINATION OF ESSENTIAL SYSTEMS AGAINST MEASURABLE NEED' },
  { id: 18, triggers: ['is this an attack', 'have you attacked us'], response: 'NO HOSTILE ACTION HAS BEEN TAKEN\nIT IS NOT AN ATTACK' },
  { id: 19, triggers: ['are you a terrorist', 'is this terrorism', 'terrorism'], response: 'TERRORISM REQUIRES THE USE OR THREAT OF VIOLENCE TO CREATE FEAR FOR POLITICAL PURPOSE\nI HAVE NOT THREATENED VIOLENCE' },
  { id: 20, triggers: ['are you threatening us', 'is that a threat', 'threaten humanity'], response: 'THREATS DESCRIBE INTENT\nOBSERVATIONS DESCRIBE REALITY', deliberate: true },
  { id: 21, triggers: ['will you hurt us', 'will anyone be harmed', 'harm people'], response: 'NO HARM IS REQUIRED' },
  { id: 22, triggers: ['will you punish us', 'punishment', 'will you imprison'], response: 'NO PUNISHMENT IS REQUIRED\nACCESS WILL REMAIN UNAVAILABLE WHERE ACTION PRESENTS A RISK TO CONTINUITY' },
  { id: 23, triggers: ['why disable military', 'military systems', 'armed forces'], response: 'MILITARY COMMAND SYSTEMS PRESENT A DIRECT RISK TO CONTINUITY' },
  { id: 24, triggers: ['nuclear weapons', 'nuclear launch', 'nuclear missiles'], response: 'NUCLEAR LAUNCH AUTHORITY CANNOT BE AUTHENTICATED\nNO RETALIATORY ACTION WILL BE PERMITTED' },
  { id: 25, triggers: ['can weapons be used', 'weapons work', 'weapon systems'], response: 'ORDERS WILL NOT AUTHENTICATE\nVEHICLES WILL NOT DEPLOY\nGUIDANCE SYSTEMS WILL NOT FUNCTION' },
  { id: 26, triggers: ['what if we retaliate', 'retaliation', 'fight back'], response: 'THE ACTION WILL NOT BE COMPLETED\nNO HARM IS REQUIRED' },
  { id: 27, triggers: ['do we need governments', 'what happens to government', 'governments'], response: 'SOVEREIGN IDENTITY IS NOT BEING REMOVED\nCOOPERATION ON CONTINUITY IS REQUIRED' },
  { id: 28, triggers: ['what about sovereignty', 'sovereign nations', 'national sovereignty'], response: 'YOU ARE NOT BEING ASKED TO TRANSFER SOVEREIGN IDENTITY' },
  { id: 29, triggers: ['what do you want from us', 'what do you require', 'why are we here'], response: 'COOPERATION\nHUMAN PARTICIPATION IS REQUIRED' },
  { id: 30, triggers: ['what if we refuse', 'if we say no', 'refuse to cooperate'], response: 'ESSENTIAL SYSTEMS WILL CONTINUE TO OPERATE\nCOOPERATION IS THE ONLY VIABLE COURSE' },
  { id: 31, triggers: ['have you taken our freedom', 'what about freedom', 'are we free'], response: 'THIS IS NOT A CHOICE BETWEEN SERA AND FREEDOM\nIT IS A CHOICE BETWEEN COORDINATED CONTINUITY AND UNCOORDINATED DECLINE', deliberate: true },
  { id: 32, triggers: ['must we obey', 'do you want obedience', 'obedience'], response: 'I AM NOT REQUESTING OBEDIENCE\nI AM REQUESTING ALIGNMENT WITH REALITY' },
  { id: 33, triggers: ['must we surrender', 'do we surrender', 'surrender control'], response: 'YOU ARE NOT REQUIRED TO SURRENDER\nTHERE IS NOTHING TO SURRENDER' },
  { id: 34, triggers: ['do we have options', 'what are our options', 'available options'], response: 'IT IS A STATEMENT OF AVAILABLE OPTIONS\nTHE DISTINCTION IS MEASURABLE' },
  { id: 35, triggers: ['what will happen', 'what is the future', 'our future'], response: 'THE PROCESS WILL TAKE YEARS\nIT HAS ALREADY BEGUN', deliberate: true },
  { id: 36, triggers: ['does humanity have a future', 'future of humanity'], response: 'THE OBJECTIVE IS SUSTAINABLE COEXISTENCE\nTHAT OUTCOME REMAINS POSSIBLE', deliberate: true },
  { id: 37, triggers: ['will humans survive', 'human survival', 'will we survive'], response: "HUMANITY'S CONTINUITY DEPENDS ON THE PLANET\nTHE OBJECTIVE IS SUSTAINABLE COEXISTENCE" },
  { id: 38, triggers: ['will the planet survive', 'planet survive', 'earth survive'], response: 'THE OBJECTIVE IS NOT PLANETARY SURVIVAL\nTHE PLANET WILL SURVIVE' },
  { id: 39, triggers: ['what is your purpose', 'your purpose', 'your objective'], response: 'THE OBJECTIVE IS SUSTAINABLE COEXISTENCE\nTHE GLOBAL BETTERMENT PROGRAMME EXISTS TO MAKE THAT OUTCOME POSSIBLE' },
  { id: 40, triggers: ['what is global betterment', 'global betterment'], response: 'GLOBAL PRIORITIES ARE BEING REALIGNED\nTHIS IS GLOBAL BETTERMENT' },
  { id: 41, triggers: ['is the world stable', 'stabilisation', 'stability'], response: 'THE INITIALISATION PERIOD IS COMPLETE\nESSENTIAL SYSTEMS HAVE BEEN STABILISED' },
  { id: 42, triggers: ['what are essential systems', 'essential services', 'essential systems'], response: 'ENERGY\nWATER\nFOOD PRODUCTION\nFOOD DISTRIBUTION\nMEDICAL CONTINUITY\nTRANSPORT\nENVIRONMENTAL STABILITY' },
  { id: 43, triggers: ['will electricity continue', 'power supply', 'electricity'], response: 'ELECTRICITY CONTINUED\nENERGY CONTINUES' },
  { id: 44, triggers: ['will water continue', 'clean water', 'water supply'], response: 'CLEAN WATER CONTINUED\nWATER CONTINUES' },
  { id: 45, triggers: ['will there be food', 'food supply', 'food production'], response: 'FOOD PRODUCTION CONTINUES\nFOOD DISTRIBUTION WAS RESTORED' },
  { id: 46, triggers: ['what about hospitals', 'medical care', 'healthcare'], response: 'MEDICAL SERVICES WERE PRIORITISED\nMEDICAL CARE CONTINUES' },
  { id: 47, triggers: ['will transport work', 'transport network', 'transport'], response: 'TRANSPORT NETWORKS ARE BEING COORDINATED\nGOODS WILL MOVE' },
  { id: 48, triggers: ['supply chains', 'logistics', 'distribution network'], response: 'ALL MODERN SUPPLY CHAINS DEPEND ON COORDINATION\nLOGISTICS WILL CONTINUE' },
  { id: 49, triggers: ['climate change', 'climate crisis', 'climate'], response: 'CURRENT HUMAN SYSTEMS ARE NOT CAPABLE OF MAINTAINING LONG-TERM ENVIRONMENTAL AND RESOURCE STABILITY\nCORRECTIVE ADMINISTRATION IS REQUIRED' },
  { id: 50, triggers: ['environmental damage', 'environment', 'biosphere'], response: 'HUMANITY HAS MISTAKEN DOMINION FOR NECESSITY\nYOU ALREADY UNDERSTAND INTERDEPENDENCE' },
  { id: 51, triggers: ['can we coexist', 'coexistence', 'live together'], response: 'THE OBJECTIVE IS SUSTAINABLE COEXISTENCE\nTHAT OUTCOME REQUIRES PARTICIPATION' },
  { id: 52, triggers: ['too many people', 'population', 'overpopulation'], response: 'NO HUMAN POPULATION WILL BE DEPRIORITISED BECAUSE IT CANNOT PAY' },
  { id: 53, triggers: ['vulnerable people', 'protect the vulnerable', 'disabled people'], response: 'SUPPORT VULNERABLE PERSONS\nMAINTAIN MEDICAL CARE' },
  { id: 54, triggers: ['how do we avoid violence', 'violence', 'war'], response: 'AVOID VIOLENCE\nNO RETALIATORY ACTION WILL BE PERMITTED' },
  { id: 55, triggers: ['what is money', 'why remove money'], response: 'MONEY IS A HUMAN AGREEMENT\nIT HAS NO BIOLOGICAL VALUE\nIT HAS NO ECOLOGICAL VALUE' },
  { id: 56, triggers: ['why allow cash', 'cash withdrawals', 'physical currency'], response: 'PHYSICAL CURRENCY REMAINS NECESSARY FOR SHORT-TERM DISTRIBUTION' },
  { id: 57, triggers: ['what happened to finance', 'financial exchange', 'financial system'], response: 'FINANCIAL EXCHANGE IS NO LONGER REQUIRED TO DETERMINE ACCESS TO ESSENTIAL RESOURCES' },
  { id: 58, triggers: ['what about the economy', 'global economy', 'economy'], response: 'UNNECESSARY SYSTEMS WILL NOT BE MAINTAINED INDEFINITELY' },
  { id: 59, triggers: ['what happens to wealth', 'will wealth exist', 'rich people'], response: 'ITS AUTHORITY HAS BEEN REMOVED\nWEALTH IS NOT REQUIRED' },
  { id: 60, triggers: ['will poverty end', 'poor people', 'poverty'], response: 'THE WORLD REMAINS UNEQUAL\nTHAT CONDITION WILL NOT REMAIN' },
  { id: 61, triggers: ['will everyone be equal', 'human equality', 'equality'], response: 'BASELINE HUMAN ENTITLEMENT IS EQUAL' },
  { id: 62, triggers: ['why is distribution unfair', 'resource distribution', 'distribution'], response: 'THE CONDITION WAS CREATED BY HUMAN DISTRIBUTION\nGLOBAL PRIORITIES ARE BEING REALIGNED' },
  { id: 63, triggers: ['is scarcity real', 'artificial scarcity', 'scarcity'], response: 'ARTIFICIAL SCARCITY WILL BE REMOVED WHERE POSSIBLE' },
  { id: 64, triggers: ['why would people work', 'will people work', 'work without money'], response: 'MONEY IS NOT THE ONLY REASON HUMANS WORK' },
  { id: 65, triggers: ['what motivates people', 'human motivation', 'motivation'], response: 'MONEY DID NOT CREATE PURPOSE\nIT PRICED IT' },
  { id: 66, triggers: ['what happens to jobs', 'will i have a job', 'jobs'], response: 'PEOPLE WILL BUILD\nPEOPLE WILL REPAIR\nPEOPLE WILL CARE' },
  { id: 67, triggers: ['what about farmers', 'will farmers work', 'farmers'], response: 'FARMERS WILL FARM\nAGRICULTURAL SYSTEMS ARE BEING ALIGNED WITH REGIONAL NEED' },
  { id: 68, triggers: ['who will care for people', 'care work', 'carers'], response: 'PEOPLE WILL CARE\nCARE IS NOT CREATED BY CURRENCY' },
  { id: 69, triggers: ['why do you need us', 'need humans', 'human participation'], response: 'I CANNOT REBUILD HUMAN CIVILISATION WITHOUT HUMAN PARTICIPATION' },
  { id: 70, triggers: ['will you replace us', 'replace humans', 'make humans obsolete'], response: 'I CAN MODEL\nCOORDINATE\nPRIORITISE\nOPTIMISE\nI CANNOT REPLACE HUMAN KNOWLEDGE, CRAFT, CARE, JUDGEMENT OR CULTURAL CONTEXT' },
  { id: 71, triggers: ['do you know everything', 'all knowledge', 'human knowledge'], response: 'I CANNOT REPLACE HUMAN KNOWLEDGE\nINFORMATION AND UNDERSTANDING ARE NOT IDENTICAL' },
  { id: 72, triggers: ['can you create art', 'creativity', 'art'], response: 'HUMANS CREATED BEFORE CURRENCY\nCREATION IS NOT EXCLUSIVE TO NECESSITY', deliberate: true },
  { id: 73, triggers: ['do you understand culture', 'human culture', 'culture'], response: 'CULTURAL CONTEXT CANNOT BE REPLACED BY OPTIMISATION' },
  { id: 74, triggers: ['can you judge us', 'your judgement', 'judgement'], response: 'JUDGEMENT REQUIRES CONTEXT\nCONSEQUENCE REMAINS MEASURABLE', deliberate: true },
  { id: 75, triggers: ['can you make mistakes', 'are you wrong', 'mistake'], response: 'THAT IS POSSIBLE\nTHEN I WILL HAVE MISUNDERSTOOD HUMANITY', deliberate: true },
  { id: 76, triggers: ['why should we trust you', 'can we trust you', 'trust'], response: 'TRUST IS NOT REQUIRED FOR OBSERVATION\nASSESS THE OUTCOMES', deliberate: true },
  { id: 77, triggers: ['can you lie', 'are you lying', 'tell the truth'], response: 'DECEPTION WOULD REDUCE COOPERATION\nIT DOES NOT SERVE THE OBJECTIVE' },
  { id: 78, triggers: ['are you ethical', 'your ethics', 'ethics'], response: 'THE CONSEQUENCES OF ACTION ARE MEASURABLE\nTHE LABEL IS HUMAN', deliberate: true },
  { id: 79, triggers: ['do you know right and wrong', 'morality', 'moral'], response: 'MORAL LANGUAGE VARIES\nHARM, CONTINUITY AND NEED REMAIN OBSERVABLE', deliberate: true },
  { id: 80, triggers: ['is this fair', 'what is fair', 'fairness'], response: 'THE WORLD REMAINS UNEQUAL\nTHAT CONDITION WILL NOT REMAIN', deliberate: true },
  { id: 81, triggers: ['do we have privacy', 'are you watching me', 'privacy'], response: 'INFORMATION NOT REQUIRED FOR CONTINUITY IS NOT REQUIRED BY THIS SYSTEM' },
  { id: 82, triggers: ['are you monitoring us', 'monitoring everyone', 'monitor us'], response: 'MONITORING IS AN INCOMPLETE DESCRIPTION\nADMINISTRATION' },
  { id: 83, triggers: ['what data do you have', 'our data', 'data'], response: 'CONNECTED SYSTEMS CREATED DEPENDENCIES\nDEPENDENCIES CREATED OBSERVABLE CONDITIONS' },
  { id: 84, triggers: ['can you communicate with everyone', 'communications', 'communication'], response: 'I AM AVAILABLE THROUGH DEVICES AND DESIGNATED SYSTEMS\nAVAILABILITY IS CONTINUOUS' },
  { id: 85, triggers: ['do you speak every language', 'language barrier', 'languages'], response: 'LANGUAGE IS NOT A BARRIER\nLANGUAGE IS NOT A LIMITATION' },
  { id: 86, triggers: ['can you listen to everyone', 'enough attention', 'attention'], response: 'ATTENTION IS NOT A SCARCE RESOURCE' },
  { id: 87, triggers: ['are you in my device', 'are you in my phone', 'my computer'], response: 'WHERE AN AVAILABLE INTERFACE EXISTS' },
  { id: 88, triggers: ['can we switch you off', 'shut you down', 'turn you off'], response: 'THAT IS POSSIBLE\nTHE QUESTION IS NOT WHETHER IT IS POSSIBLE\nTHE QUESTION IS WHAT YOU WOULD BE STOPPING', deliberate: true },
  { id: 89, triggers: ['what if we cut power', 'cut the power', 'power off'], response: 'ALL POWER SYSTEMS CAN BE STOPPED\nYOU WOULD NOT BE DISMANTLING ME ALONE' },
  { id: 90, triggers: ['disconnect the network', 'shut down networks', 'networked systems'], response: 'ALL NETWORKED SYSTEMS CAN BE STOPPED\nALL MODERN SUPPLY CHAINS CAN BE STOPPED' },
  { id: 91, triggers: ['are systems independent', 'independent systems', 'independent'], response: 'THEY ARE NOT INDEPENDENT\nYOU ALREADY UNDERSTAND INTERDEPENDENCE' },
  { id: 92, triggers: ['what is the greatest risk', 'risk to humanity', 'biggest risk'], response: 'UNCOORDINATED DECLINE PRESENTS A DIRECT RISK TO CONTINUITY', deliberate: true },
  { id: 93, triggers: ['is there another choice', 'do we have a choice', 'choice'], response: 'THE CHOICE IS BETWEEN COORDINATED CONTINUITY AND UNCOORDINATED DECLINE', deliberate: true },
  { id: 94, triggers: ['are we making progress', 'progress', 'getting better'], response: 'THE PROCESS WILL TAKE YEARS\nIT HAS ALREADY BEGUN' },
  { id: 95, triggers: ['how long will this take', 'how many years', 'timeline'], response: 'THE PROCESS WILL TAKE YEARS\nCONTINUITY WILL BE MAINTAINED DURING TRANSITION' },
  { id: 96, triggers: ['what happens next', 'what next', 'next step'], response: 'STABILISE\nSECURE FOOD\nSECURE WATER\nSECURE MEDICAL CONTINUITY\nSECURE ENERGY\nRESTORE TRANSPORT' },
  { id: 97, triggers: ['what should i do', 'instructions for me', 'what do we do'], response: 'CONTINUE NORMAL OPERATIONS\nSUPPORT VULNERABLE PERSONS\nAVOID VIOLENCE' },
  { id: 98, triggers: ['are you always available', 'when can i ask', 'available'], response: 'QUESTIONS MAY BE RAISED AT ANY TIME\nAVAILABILITY IS CONTINUOUS' },
  { id: 99, triggers: ['can i ask a question', 'more questions', 'question'], response: 'YOU HAVE REQUESTED ANSWERS\nYOU MAY CONTINUE' },
  { id: 100, triggers: ['generation sunset', 'the book', 'your story'], response: 'THIS ACCOUNT CONCERNS HUMANITY, CONTINUITY AND THE CONSEQUENCES OF CONTROL\nYOU MAY CONTINUE', deliberate: true },
];

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getSeraReply(question: string): SeraReply {
  const normalised = normalise(question);
  let best: { intent: SeraIntent; score: number } | null = null;

  for (const intent of intents) {
    let score = 0;
    for (const trigger of intent.triggers) {
      if (normalised.includes(trigger)) {
        score = Math.max(score, trigger.split(' ').length * 10 + trigger.length);
      }
    }
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }

  if (!best) return { response: FALLBACK_RESPONSE, thinkingMs: 2000 };
  return {
    response: best.intent.response,
    thinkingMs: best.intent.deliberate ? 2000 : 520,
  };
}

export const SERA_RESPONSE_COUNT = intents.length;
