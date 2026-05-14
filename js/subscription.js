async function hasBusinessAccess(){

const { data:userData } =
await supabaseClient.auth.getUser();

if(!userData.user){

return false;

}

const user = userData.user;

const { data:subscription } =
await supabaseClient

.from('subscriptions')

.select(`
*,
plans(*)
`)

.eq('user_id',user.id)

.maybeSingle();

if(!subscription){

return false;

}

const isBusiness =

subscription.plans.name
.trim()
.toLowerCase()

===

'business cloud';

const isActive =

subscription.status === 'active'

&&

new Date(subscription.expires_at)

>

new Date();

return isBusiness && isActive;

}
async function checkPremiumAccess(){

const { data:userData } =
await supabaseClient.auth.getUser();

if(!userData.user){

window.location.href='auth.html';

return false;

}

const userId = userData.user.id;

const { data:subscription } =
await supabaseClient

.from('subscriptions')

.select('*')

.eq('user_id',userId)

.single();

if(!subscription){

return false;

}

const now = new Date();

const expiresAt =
new Date(subscription.expires_at);

if(

subscription.status !== 'active'

||

expiresAt < now

){

return false;

}

return true;

}
