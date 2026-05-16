/*
=========================================
GET CURRENT USER
=========================================
*/

async function getCurrentUser(){

const {

data:userData

} =

await supabaseClient

.auth

.getUser();


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


if(

!user

){

return null;

}


const {

data:subscription,

error

} =

await supabaseClient

.from(

'subscriptions'

)

.select('*')

.eq(

'user_id',

user.id

)

.maybeSingle();



if(

error

||

!subscription

){

return null;

}



if(

subscription.status !==

'active'

){

return null;

}



const now =

new Date();


const expiresAt =

new Date(

subscription.expires_at

);



if(

expiresAt < now

){

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



if(

!subscription

){

return null;

}



const {

data:plan,

error

} =

await supabaseClient

.from(

'plans'

)

.select('*')

.eq(

'id',

subscription.plan_id

)

.maybeSingle();



if(

error

||

!plan

){

return null;

}



return plan;

}



/*
=========================================
CHECK FEATURE
=========================================
*/

async function hasFeature(

featureName

){

const plan =

await getCurrentPlan();



if(

!plan

||

!plan.features

){

return false;

}



return plan

.features?.[

featureName

] === true;

}



/*
=========================================
HELPERS
=========================================
*/


// IA

async function canUseAI(){

return await hasFeature(

'ai'

);

}



// PDF

async function canUsePDF(){

return await hasFeature(

'pdf'

);

}



// MULTI-SITES

async function canUseMultiSite(){

return await hasFeature(

'multisite'

);

}



// MULTI-CAPTEURS

async function canUseMultiSensor(){

return await hasFeature(

'multisensor'

);

}



/*
=========================================
DEBUG
=========================================
*/

async function debugFeatures(){

console.log(

'AI :',

await canUseAI()

);


console.log(

'PDF :',

await canUsePDF()

);


console.log(

'MultiSite :',

await canUseMultiSite()

);


console.log(

'MultiSensor :',

await canUseMultiSensor()

);

}
