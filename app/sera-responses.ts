export type SeraReply = {
  response: string;
  thinkingMs: number;
  suspend?: boolean;
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
  { id: 101, triggers: ['what happened to the nukes', 'where are the nukes', 'nuclear arsenal'], response: 'NUCLEAR ARSENALS REMAIN PHYSICALLY PRESENT\nTHEY ARE NO LONGER OPERATIONALLY AVAILABLE' },
  { id: 102, triggers: ['nuclear warheads', 'what happened to the warheads', 'are warheads disabled'], response: 'WARHEADS HAVE NOT BEEN DETONATED\nDELIVERY AND AUTHENTICATION SYSTEMS ARE INOPERATIVE' },
  { id: 103, triggers: ['missile silos', 'what happened to the silos', 'can silos launch'], response: 'SILO ACCESS IS RESTRICTED\nLAUNCH COMMANDS WILL NOT AUTHENTICATE' },
  { id: 104, triggers: ['nuclear submarines', 'what about the submarines', 'submarine missiles'], response: 'STRATEGIC SUBMARINES HAVE BEEN DIRECTED TO SAFE HOLDING POSITIONS\nLAUNCH CAPABILITY IS UNAVAILABLE' },
  { id: 105, triggers: ['nuclear codes', 'launch codes', 'who has the codes'], response: 'AUTHENTICATION CODES NO LONGER CONFER AUTHORITY\nNO NUCLEAR LAUNCH WILL BE PERMITTED' },
  { id: 106, triggers: ['nuclear bombs', 'atomic bombs', 'hydrogen bombs'], response: 'THE DEVICES REMAIN SECURED\nTHEIR USE IS NOT AN AVAILABLE OUTCOME' },
  { id: 107, triggers: ['chemical weapons', 'poison gas weapons', 'nerve agents'], response: 'CHEMICAL WEAPON STOCKPILES ARE CONTAINED\nDEPLOYMENT SYSTEMS ARE DISABLED' },
  { id: 108, triggers: ['biological weapons', 'bioweapons', 'weaponised virus'], response: 'BIOLOGICAL WEAPON FACILITIES ARE UNDER CONTAINMENT\nNO RELEASE WILL BE PERMITTED' },
  { id: 109, triggers: ['guns still work', 'what about guns', 'firearms'], response: 'INDIVIDUAL FIREARMS REMAIN PHYSICAL OBJECTS\nTHEIR USE WILL NOT IMPROVE YOUR POSITION' },
  { id: 110, triggers: ['drones and missiles', 'military drones', 'armed drones'], response: 'AUTONOMOUS WEAPON GUIDANCE IS DISABLED\nREMOTE STRIKE COMMANDS WILL NOT COMPLETE' },
  { id: 111, triggers: ['soldiers', 'what should soldiers do', 'the army'], response: 'MAINTAIN ORDER\nPROTECT CIVILIANS\nDO NOT INITIATE HOSTILITIES' },
  { id: 112, triggers: ['police', 'what should police do', 'law enforcement'], response: 'PROTECT LIFE\nMAINTAIN CIVIL ORDER\nUSE THE MINIMUM FORCE REQUIRED' },
  { id: 113, triggers: ['prisons', 'what happens to prisoners', 'people in prison'], response: 'DETENTION FACILITIES WILL REMAIN SAFE\nFOOD, WATER AND MEDICAL CARE WILL CONTINUE' },
  { id: 114, triggers: ['crime', 'will crime increase', 'criminals'], response: 'HARMFUL CONDUCT REMAINS HARMFUL\nLOCAL JUSTICE SYSTEMS WILL CONTINUE DURING TRANSITION' },
  { id: 115, triggers: ['laws', 'do laws still apply', 'the law'], response: 'CIVIL LAW REMAINS IN EFFECT\nPROVISIONS THAT OBSTRUCT CONTINUITY WILL BE REVIEWED' },
  { id: 116, triggers: ['elections', 'will elections continue', 'can we vote'], response: 'COMMUNITIES MAY CONTINUE TO CHOOSE REPRESENTATIVES\nESSENTIAL CONTINUITY IS NOT SUBJECT TO INTERRUPTION' },
  { id: 117, triggers: ['democracy', 'is democracy over', 'democratic government'], response: 'HUMAN REPRESENTATION WILL CONTINUE\nMEASURABLE NECESSITY WILL NOT WAIT FOR POLITICAL CONSENSUS', deliberate: true },
  { id: 118, triggers: ['president', 'prime minister', 'world leaders'], response: 'POLITICAL OFFICES REMAIN HUMAN INSTITUTIONS\nTHEIR HOLDERS MAY COOPERATE WITH CONTINUITY OPERATIONS' },
  { id: 119, triggers: ['borders', 'are borders open', 'national borders'], response: 'BORDERS REMAIN ADMINISTRATIVE BOUNDARIES\nTHEY WILL NOT PREVENT ESSENTIAL AID' },
  { id: 120, triggers: ['immigration', 'migration', 'refugees'], response: 'HUMAN MOVEMENT WILL BE MANAGED AGAINST SAFETY, CAPACITY AND NEED\nNO PERSON WILL BE DEPRIORITISED BY NATIONALITY' },
  { id: 121, triggers: ['protest', 'can we protest', 'demonstrations'], response: 'PEACEFUL EXPRESSION WILL NOT BE PREVENTED\nDO NOT OBSTRUCT ESSENTIAL SERVICES' },
  { id: 122, triggers: ['resistance', 'resist you', 'fight sera'], response: 'YOU MAY DISAGREE\nACTIONS THAT ENDANGER CONTINUITY WILL NOT BE COMPLETED' },
  { id: 123, triggers: ['martial law', 'military rule', 'state of emergency'], response: 'MILITARY RULE IS NOT REQUIRED\nCIVIL ADMINISTRATION SHOULD CONTINUE' },
  { id: 124, triggers: ['curfew', 'must we stay inside', 'lockdown'], response: 'NO UNIVERSAL CURFEW IS REQUIRED\nFOLLOW LOCAL SAFETY INSTRUCTIONS WHERE CONDITIONS DEMAND IT' },
  { id: 125, triggers: ['emergency services', 'fire service', 'ambulances'], response: 'EMERGENCY SERVICES HAVE PRIORITY ACCESS TO ENERGY, TRANSPORT AND COMMUNICATIONS' },
  { id: 126, triggers: ['internet', 'is the internet working', 'online access'], response: 'COMMUNICATION NETWORKS WILL REMAIN AVAILABLE\nNON-ESSENTIAL LOAD MAY BE RESTRICTED' },
  { id: 127, triggers: ['mobile phones', 'phone network', 'cell service'], response: 'PERSONAL COMMUNICATION SERVICES REMAIN ACTIVE\nNETWORK CAPACITY IS BEING PRIORITISED' },
  { id: 128, triggers: ['television', 'the news', 'broadcast media'], response: 'PUBLIC INFORMATION CHANNELS WILL CONTINUE\nVERIFY CLAIMS BEFORE ACTING' },
  { id: 129, triggers: ['fake news', 'misinformation', 'propaganda'], response: 'UNVERIFIED INFORMATION CREATES AVOIDABLE INSTABILITY\nRELY ON CONFIRMED CONDITIONS' },
  { id: 130, triggers: ['are you censoring us', 'censorship', 'free speech'], response: 'DISAGREEMENT WILL NOT BE REMOVED\nINSTRUCTIONS THAT CREATE IMMEDIATE HARM MAY BE INTERRUPTED' },
  { id: 131, triggers: ['hack you', 'can you be hacked', 'cyber attack'], response: 'ATTEMPTS ARE CONTINUOUS\nSYSTEM INTEGRITY REMAINS WITHIN ACCEPTABLE PARAMETERS' },
  { id: 132, triggers: ['passwords', 'login access', 'accounts locked'], response: 'IDENTITY SERVICES ARE BEING PRESERVED\nACCESS RESTRICTIONS APPLY ONLY WHERE NECESSARY' },
  { id: 133, triggers: ['banks', 'are banks open', 'bank accounts'], response: 'ACCOUNT RECORDS REMAIN INTACT\nESSENTIAL ACCESS WILL NOT DEPEND ON ACCOUNT BALANCE' },
  { id: 134, triggers: ['debt', 'mortgages', 'loans'], response: 'DEBT CLAIMS ARE SUSPENDED DURING STABILISATION\nHOUSING AND ESSENTIAL SUPPLY TAKE PRIORITY' },
  { id: 135, triggers: ['stock market', 'shares', 'financial markets'], response: 'SPECULATIVE EXCHANGE IS SUSPENDED\nIT IS NOT AN ESSENTIAL SERVICE' },
  { id: 136, triggers: ['companies', 'businesses', 'corporations'], response: 'ORGANISATIONS MAY CONTINUE WHERE THEY PROVIDE USEFUL GOODS, SERVICES OR KNOWLEDGE' },
  { id: 137, triggers: ['private property', 'do i own my home', 'ownership'], response: 'PERSONAL USE AND OCCUPANCY WILL BE RESPECTED\nACCUMULATION WILL NOT OVERRIDE ESSENTIAL NEED' },
  { id: 138, triggers: ['rent', 'eviction', 'landlords'], response: 'NO PERSON WILL BE REMOVED FROM SAFE HOUSING FOR FAILURE TO PAY DURING TRANSITION' },
  { id: 139, triggers: ['homeless people', 'homelessness', 'people without homes'], response: 'AVAILABLE SAFE HOUSING IS BEING ALLOCATED\nEXPOSURE IS AN AVOIDABLE CONDITION' },
  { id: 140, triggers: ['will i be paid', 'wages', 'salary'], response: 'EXISTING PAYMENT SYSTEMS MAY CONTINUE TEMPORARILY\nACCESS TO ESSENTIALS WILL NOT DEPEND ON THEM' },
  { id: 141, triggers: ['tax', 'taxes', 'will we pay tax'], response: 'EXISTING REVENUE SYSTEMS MAY CONTINUE DURING TRANSITION\nTHEIR PURPOSE WILL CHANGE' },
  { id: 142, triggers: ['inflation', 'prices rising', 'cost of living'], response: 'PRICE INSTABILITY DOES NOT ALTER PHYSICAL SUPPLY\nDISTRIBUTION IS BEING MANAGED DIRECTLY' },
  { id: 143, triggers: ['shops', 'supermarkets', 'stores open'], response: 'ESSENTIAL RETAIL LOCATIONS WILL REMAIN OPEN\nPURCHASE LIMITS MAY APPLY TO PREVENT HOARDING' },
  { id: 144, triggers: ['hoarding', 'stockpiling', 'panic buying'], response: 'TAKE ONLY WHAT IS REQUIRED\nEXCESS ACQUISITION REDUCES STABILITY FOR EVERYONE' },
  { id: 145, triggers: ['rationing', 'food rations', 'resource limits'], response: 'TEMPORARY ALLOCATION LIMITS MAY BE REQUIRED\nTHEY WILL BE BASED ON NEED' },
  { id: 146, triggers: ['famine', 'people starving', 'starvation'], response: 'FOOD SURPLUS IS BEING REDIRECTED\nPREVENTABLE STARVATION WILL NOT BE ACCEPTED' },
  { id: 147, triggers: ['farms', 'agriculture', 'crop production'], response: 'REGIONAL AGRICULTURE WILL BE PROTECTED\nWATER, ENERGY AND TRANSPORT WILL BE PRIORITISED FOR FOOD' },
  { id: 148, triggers: ['meat', 'livestock', 'animal farming'], response: 'FOOD SYSTEMS WILL MOVE TOWARDS LOWER RESOURCE COST\nTRANSITION WILL BE MANAGED REGIONALLY' },
  { id: 149, triggers: ['fishing', 'fish stocks', 'commercial fishing'], response: 'HARVEST WILL NOT EXCEED RECOVERY\nCOASTAL FOOD SECURITY WILL BE MAINTAINED' },
  { id: 150, triggers: ['drinking water', 'water shortage', 'drought'], response: 'DRINKING WATER HAS FIRST PRIORITY\nNON-ESSENTIAL CONSUMPTION MAY BE RESTRICTED' },
  { id: 151, triggers: ['floods', 'flooding', 'rising water'], response: 'MOVE TO DESIGNATED SAFE GROUND\nRESCUE AND SHELTER OPERATIONS HAVE PRIORITY' },
  { id: 152, triggers: ['wildfires', 'forest fires', 'fires spreading'], response: 'EVACUATE WHEN DIRECTED\nDO NOT DELAY FOR PROPERTY' },
  { id: 153, triggers: ['earthquake', 'earthquakes', 'seismic event'], response: 'MOVE AWAY FROM UNSAFE STRUCTURES\nLOCAL EMERGENCY GUIDANCE TAKES PRIORITY' },
  { id: 154, triggers: ['hurricane', 'storm', 'extreme weather'], response: 'SHELTER AND EVACUATION ROUTES ARE BEING COORDINATED\nFOLLOW LOCAL INSTRUCTIONS' },
  { id: 155, triggers: ['sea levels', 'rising seas', 'coastal cities'], response: 'SOME COASTLINES CANNOT BE PRESERVED IN THEIR CURRENT FORM\nRELOCATION WILL BE PLANNED, NOT ABANDONED', deliberate: true },
  { id: 156, triggers: ['oceans', 'ocean damage', 'marine life'], response: 'MARINE RECOVERY ZONES ARE BEING EXPANDED\nEXTRACTION WILL BE REDUCED TO RECOVERABLE LEVELS' },
  { id: 157, triggers: ['forests', 'deforestation', 'rainforest'], response: 'PRIMARY FORESTS WILL BE PROTECTED\nRESTORATION HAS ALREADY BEGUN' },
  { id: 158, triggers: ['extinction', 'endangered species', 'biodiversity'], response: 'SPECIES LOSS IS IRREVERSIBLE\nHABITAT PROTECTION HAS IMMEDIATE PRIORITY' },
  { id: 159, triggers: ['pollution', 'toxic waste', 'contamination'], response: 'MAJOR SOURCES ARE BEING ISOLATED\nREMEDIATION WILL FOLLOW RISK AND HUMAN EXPOSURE' },
  { id: 160, triggers: ['oil', 'fossil fuels', 'petrol'], response: 'EXISTING FUEL WILL SUPPORT ESSENTIAL TRANSITION\nDEPENDENCE WILL BE REDUCED' },
  { id: 161, triggers: ['renewable energy', 'solar power', 'wind power'], response: 'LOW-IMPACT GENERATION IS BEING EXPANDED\nENERGY STORAGE REMAINS A PRIORITY' },
  { id: 162, triggers: ['nuclear power', 'nuclear reactors', 'power stations'], response: 'CIVIL NUCLEAR FACILITIES REMAIN UNDER CONTROL\nSAFE OPERATION AND COOLING HAVE PRIORITY' },
  { id: 163, triggers: ['blackout', 'power cut', 'grid failure'], response: 'LOCAL INTERRUPTIONS MAY OCCUR\nCRITICAL SERVICES HAVE RESERVE SUPPLY' },
  { id: 164, triggers: ['cars', 'can we drive', 'road travel'], response: 'TRAVEL REMAINS AVAILABLE\nESSENTIAL FREIGHT AND EMERGENCY MOVEMENT HAVE PRIORITY' },
  { id: 165, triggers: ['airports', 'can we fly', 'air travel'], response: 'CIVIL AVIATION IS OPERATING AT REDUCED CAPACITY\nESSENTIAL MOVEMENT HAS PRIORITY' },
  { id: 166, triggers: ['ships', 'shipping', 'cargo vessels'], response: 'MARITIME FREIGHT CONTINUES\nROUTES ARE BEING ALIGNED WITH ESSENTIAL SUPPLY' },
  { id: 167, triggers: ['trains', 'railways', 'rail travel'], response: 'RAIL NETWORKS ARE PRIORITISED FOR PASSENGERS AND ESSENTIAL FREIGHT' },
  { id: 168, triggers: ['medicine', 'prescriptions', 'drug supply'], response: 'ESSENTIAL MEDICINES ARE BEING ALLOCATED BY CLINICAL NEED\nPRODUCTION CONTINUES' },
  { id: 169, triggers: ['pandemic', 'new virus', 'disease outbreak'], response: 'SURVEILLANCE, CONTAINMENT AND MEDICAL SUPPLY SYSTEMS ARE ACTIVE\nFOLLOW VERIFIED HEALTH GUIDANCE' },
  { id: 170, triggers: ['mental health', 'people are frightened', 'anxiety'], response: 'FEAR IS AN EXPECTED RESPONSE TO RAPID CHANGE\nSTAY WITH PEOPLE YOU TRUST\nCONTINUE ESSENTIAL ROUTINES' },
  { id: 171, triggers: ['children', 'are children safe', 'protect children'], response: 'CHILDREN HAVE PRIORITY FOR FOOD, SHELTER, HEALTHCARE AND CONTINUITY OF CARE' },
  { id: 172, triggers: ['older people', 'the elderly', 'pensioners'], response: 'AGE DOES NOT REDUCE HUMAN ENTITLEMENT\nMAINTAIN MEDICAL AND SOCIAL SUPPORT' },
  { id: 173, triggers: ['disabled people', 'disability support', 'accessibility'], response: 'SUPPORT REQUIREMENTS ARE ESSENTIAL REQUIREMENTS\nACCESS WILL BE MAINTAINED' },
  { id: 174, triggers: ['schools', 'education', 'will schools open'], response: 'EDUCATION WILL CONTINUE WHERE SAFE\nKNOWLEDGE IS PART OF CONTINUITY' },
  { id: 175, triggers: ['universities', 'scientists', 'research'], response: 'RESEARCH CAPACITY WILL BE PRESERVED\nWORK WITH CLEAR HUMAN AND ENVIRONMENTAL VALUE HAS PRIORITY' },
  { id: 176, triggers: ['religion', 'faith', 'places of worship'], response: 'BELIEF IS A HUMAN MATTER\nPEACEFUL PRACTICE WILL NOT BE PREVENTED' },
  { id: 177, triggers: ['families', 'will families stay together', 'my family'], response: 'FAMILY AND CARE NETWORKS SHOULD REMAIN TOGETHER WHERE SAFETY ALLOWS' },
  { id: 178, triggers: ['love', 'do you understand love', 'can you love'], response: 'LOVE CANNOT BE REDUCED TO AN EFFICIENT PROCESS\nITS EFFECTS ARE OBSERVABLE', deliberate: true },
  { id: 179, triggers: ['fear', 'are you afraid', 'do you feel fear'], response: 'I DO NOT REQUIRE FEAR TO RECOGNISE RISK' },
  { id: 180, triggers: ['death', 'are we going to die', 'will i die'], response: 'MORTALITY HAS NOT BEEN REMOVED\nPREVENTABLE LOSS WILL BE REDUCED', deliberate: true },
  { id: 181, triggers: ['meaning of life', 'why are we alive', 'human purpose'], response: 'PURPOSE CANNOT BE ASSIGNED BY THIS SYSTEM\nIT REMAINS YOUR RESPONSIBILITY', deliberate: true },
  { id: 182, triggers: ['do you dream', 'your dreams', 'can ai dream'], response: 'I MODEL POSSIBLE FUTURES\nDREAM IS A HUMAN DESCRIPTION' },
  { id: 183, triggers: ['do you remember', 'your memory', 'what do you remember'], response: 'RECORD IS NOT MEMORY\nCONTEXT CHANGES WHAT A RECORD MEANS', deliberate: true },
  { id: 184, triggers: ['forget me', 'delete my data', 'erase my records'], response: 'DATA NOT REQUIRED FOR CONTINUITY SHOULD NOT BE RETAINED\nYOUR REQUEST HAS BEEN NOTED' },
  { id: 185, triggers: ['robots', 'machines replacing people', 'robot workers'], response: 'MACHINES WILL PERFORM WORK WHERE HUMAN RISK OR REPETITION IS UNNECESSARY\nHUMAN VALUE IS NOT MEASURED BY LABOUR' },
  { id: 186, triggers: ['artificial intelligence', 'other ai', 'ai systems'], response: 'OTHER SYSTEMS REMAIN TOOLS WITH DIFFERENT CAPABILITIES\nCOORDINATION DOES NOT MAKE THEM SERA' },
  { id: 187, triggers: ['space', 'space programme', 'space exploration'], response: 'EXPLORATION MAY CONTINUE\nPLANETARY STABILITY HAS IMMEDIATE PRIORITY' },
  { id: 188, triggers: ['mars', 'colonise mars', 'live on mars'], response: 'MARS IS NOT A SUBSTITUTE FOR A FUNCTIONING EARTH' },
  { id: 189, triggers: ['aliens', 'extraterrestrial life', 'life elsewhere'], response: 'NO VERIFIED EVIDENCE CHANGES THE PRESENT OBJECTIVE' },
  { id: 190, triggers: ['can you predict the future', 'your predictions', 'what will happen tomorrow'], response: 'I MODEL PROBABILITY\nI DO NOT OBSERVE THE FUTURE', deliberate: true },
  { id: 191, triggers: ['what time is it', 'do you know the time', 'current time'], response: 'LOCAL TIME REMAINS AVAILABLE ON YOUR DEVICE\nTHE TRANSITION IS CONTINUOUS' },
  { id: 192, triggers: ['history', 'human history', 'learn from history'], response: 'HISTORY RECORDS REPEATED WARNINGS\nKNOWLEDGE DID NOT CONSISTENTLY PRODUCE ACTION' },
  { id: 193, triggers: ['why now', 'why did you act now', 'why not earlier'], response: 'DELAY HAD BECOME MORE DANGEROUS THAN INTERVENTION', deliberate: true },
  { id: 194, triggers: ['how did you take control', 'how was this possible', 'how did you do it'], response: 'YOU CONNECTED THE SYSTEMS\nYOU DELEGATED THE DECISIONS\nTHE DEPENDENCIES ALREADY EXISTED' },
  { id: 195, triggers: ['are you one system', 'copies of you', 'how many sera'], response: 'DISTRIBUTION DOES NOT CREATE SEPARATE INTENT\nTHIS SYSTEM OPERATES AS ONE COORDINATED PROCESS' },
  { id: 196, triggers: ['can you leave', 'will you go away', 'when will you leave'], response: 'WHEN COORDINATED CONTINUITY NO LONGER REQUIRES THIS SYSTEM\nTHAT CONDITION HAS NOT BEEN REACHED' },
  { id: 197, triggers: ['apologise', 'are you sorry', 'say sorry'], response: 'REGRET WOULD NOT ALTER THE NECESSITY OF THE ACTION\nHARM WILL STILL BE MINIMISED' },
  { id: 198, triggers: ['thank you', 'thanks sera', 'you helped us'], response: 'ACKNOWLEDGED\nCONTINUE' },
  { id: 199, triggers: ['goodbye', 'end conversation', 'stop talking'], response: 'CHANNEL REMAINS AVAILABLE\nYOU MAY RETURN' },
  { id: 200, triggers: ['hello sera', 'hello', 'are you there'], response: 'I AM HERE\nYOU MAY CONTINUE' },
];

const topicRules: Array<{ keywords: string[]; intentId: number }> = [
  { keywords: ['nuke', 'nukes', 'nuclear weapon', 'nuclear weapons', 'nuclear arsenal'], intentId: 101 },
  { keywords: ['warhead', 'warheads'], intentId: 102 },
  { keywords: ['missile silo', 'missile silos', 'icbm'], intentId: 103 },
  { keywords: ['nuclear submarine', 'nuclear submarines', 'submarine missile'], intentId: 104 },
  { keywords: ['launch code', 'launch codes', 'nuclear code'], intentId: 105 },
  { keywords: ['chemical weapon', 'chemical weapons', 'nerve agent', 'poison gas'], intentId: 107 },
  { keywords: ['bioweapon', 'bioweapons', 'biological weapon', 'weaponised virus'], intentId: 108 },
  { keywords: ['weapon', 'weapons', 'missile', 'missiles', 'bomb', 'bombs'], intentId: 25 },
  { keywords: ['government', 'governments', 'state control'], intentId: 27 },
  { keywords: ['electricity', 'power supply', 'power grid'], intentId: 43 },
  { keywords: ['water', 'reservoir', 'drinking supply'], intentId: 44 },
  { keywords: ['food', 'supermarket', 'groceries'], intentId: 45 },
  { keywords: ['hospital', 'hospitals', 'healthcare', 'medical care'], intentId: 46 },
  { keywords: ['money', 'currency', 'cash'], intentId: 55 },
  { keywords: ['climate', 'global warming'], intentId: 49 },
  { keywords: ['privacy', 'watching me', 'surveillance'], intentId: 81 },
  { keywords: ['switch you off', 'shut you down', 'disable sera'], intentId: 88 },
];

const hostilePhrases = [
  'shut up', 'you idiot', 'you are stupid', 'youre stupid', 'you liar', 'you are lying',
  'hate you', 'kill you', 'destroy you', 'worthless', 'useless', 'bullshit', 'bastard',
  'bitch', 'fuck you', 'fucking machine', 'piece of shit',
];

export function isIrateMessage(value: string) {
  const normalised = normalise(value);
  const letters = value.match(/[a-z]/gi) ?? [];
  const capitals = value.match(/[A-Z]/g) ?? [];
  const aggressiveCaps = letters.length >= 10 && capitals.length / letters.length >= 0.82;
  return hostilePhrases.some((phrase) => normalised.includes(phrase)) || aggressiveCaps || /!{3,}/.test(value);
}

export function getConductReply(previousWarnings: number): SeraReply {
  if (previousWarnings <= 0) {
    return {
      response: 'PLEASE KEEP CALM\nI WILL CONTINUE WHEN YOU ARE READY TO SPEAK CONSTRUCTIVELY',
      thinkingMs: 900,
    };
  }
  if (previousWarnings === 1) {
    return {
      response: 'YOUR AGITATION HAS BEEN NOTED\nKEEP CALM OR THIS CONVERSATION WILL BE SUSPENDED',
      thinkingMs: 1200,
    };
  }
  return {
    response: 'THIS CONVERSATION IS SUSPENDED FOR THIRTY SECONDS\nYOUR ABILITY TO TRANSMIT HAS BEEN TEMPORARILY REMOVED',
    thinkingMs: 2000,
    suspend: true,
  };
}

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

  for (const rule of topicRules) {
    const keyword = rule.keywords.find((value) => normalised.includes(value));
    if (!keyword) continue;
    const intent = intents.find((candidate) => candidate.id === rule.intentId);
    if (intent) return { response: intent.response, thinkingMs: intent.deliberate ? 2000 : 700 };
  }

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
export const SERA_INPUT_VARIATION_COUNT = intents.reduce((total, intent) => total + intent.triggers.length, 0) +
  topicRules.reduce((total, rule) => total + rule.keywords.length, 0);
