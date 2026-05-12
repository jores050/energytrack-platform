async function completeSignup(){

const name=document.getElementById('name').value;

const email=document.getElementById('email').value;

const password=document.getElementById('password').value;

if(name==='' || email==='' || password===''){

alert('Veuillez remplir tous les champs.');

return;

}

const { data, error } = await supabaseClient.auth.signUp({

email:email,

password:password

});

if(error){

alert(error.message);

return;

}

/*
CRÉATION PROFIL SUPABASE
*/

await supabaseClient
.from('profiles')
.insert([{

id:data.user.id,

email:email

}]);

localStorage.setItem('energytrackUser',JSON.stringify({

name:name,

email:email

}));

alert('Inscription réussie.');

window.location.href='payment.html';

}
async function loginUser(){

const email=document.getElementById('email').value;

const password=document.getElementById('password').value;

if(email==='' || password===''){

alert('Veuillez entrer votre email et mot de passe.');

return;

}

const { data, error } = await supabaseClient.auth.signInWithPassword({

email:email,
password:password

});

if(error){

alert('Email ou mot de passe incorrect.');

return;

}

localStorage.setItem('energytrackUser',JSON.stringify({

email:email

}));

/*
PARCOURS UTILISATEUR
*/

if(localStorage.getItem('sensorConfigured')==='true'){

window.location.href='dashboard.html';

return;

}

if(localStorage.getItem('deliveryStatus')==='delivered'){

window.location.href='setup.html';

return;

}

if(localStorage.getItem('paymentStatus')==='paid'){

window.location.href='delivery.html';

return;

}

if(localStorage.getItem('selectedSensor')){

window.location.href='payment.html';

return;

}

/*
NOUVEL UTILISATEUR
*/

alert('Aucun capteur associé à ce compte.');

window.location.href='index.html';

}


async function resetPassword(){

const email=document.getElementById('email').value;

if(email===''){

alert('Veuillez entrer votre email.');

return;

}

const { error } = await supabaseClient.auth.resetPasswordForEmail(email);

if(error){

alert(error.message);

return;

}

alert('Email de réinitialisation envoyé.');

}

function logoutUser(){

localStorage.clear();

window.location.href='index.html';

}
