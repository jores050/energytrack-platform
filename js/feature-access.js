/*
=========================================
GET CURRENT USER
=========================================
*/

async function getCurrentUser(){

const { data:userData } =
await supabaseClient.auth.getUser();

return userData.user;

}

/*
=========================================
GET ACTIVE SUBSCRIPTION
=========================================
*/

async function getActiveSubscription(){

const user =
await getCurrentUser();

if(!user){

return null;

}

const {

data:subscription,
error

} =
await supabaseClient

.from('subscriptions')

.select('*')

.eq('user_id',user.id)

.maybeSingle();

if(error || !subscription){

return null;

}

/*
CHECK STATUS
*/

if(
subscription.status !== 'active'
){

return null;

}

/*
CHECK EXPIRATION
*/

const now = new Date();

const expiresAt =
new Date(subscription.expires_at);

if(expiresAt < now){

return null;

}

return subscription;

}

/*
=========================================
GET CURRENT PLAN
=========================================
*/

async function getCurrentPlan(){

const subscription =
await getActiveSubscription();

if(!subscription){

return null;

}

const {

data:plan,
error

} =
await supabaseClient

.from('plans')

.select('*')

.eq('id',subscription.plan_id)

.maybeSingle();

if(error || !plan){

return null;

}

return plan;

}

/*
=========================================
HAS FEATURE
=========================================
*/

async function hasFeature(featureName){

const plan =
await getCurrentPlan();

if(!plan){

return false;

}

/*
CHECK FEATURE
*/

return plan.features?.[featureName] === true;

}

/*
=========================================
HELPERS
=========================================
*/

async function canUseAI(){

return await hasFeature('ai');

}

async function canUsePDF(){

return await hasFeature('pdf');

}

async function canUseMultiSite(){

return await hasFeature('multisite');

}
async function canUseAI(){

return await hasFeature(
'ai'
);

}

async function canUsePDF(){

return await hasFeature(
'pdf'
);

}

async function canUseMultisite(){

return await hasFeature(
'multisite'
);

}
async function canUseMultiSensor(){

return await hasFeature(

'multisensor'

);

}
