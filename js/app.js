function scrollToPricing(){

document.getElementById('pricing').scrollIntoView({

behavior:'smooth'

});

}

function buySensor(sensor){

localStorage.setItem('selectedSensor',sensor);

window.location.href='auth.html';

}

function confirmPayment(){

localStorage.setItem('paymentStatus','paid');

alert('Paiement confirmé avec succès.');

window.location.href='delivery.html';

}

function simulateDelivery(){

localStorage.setItem('deliveryStatus','delivered');

alert('Capteur livré avec succès.');

window.location.href='setup.html';

}

function configureSensor(){

const code=document.getElementById('sensorCode').value;

if(code===''){

alert('Veuillez entrer le code du capteur.');

return;

}

localStorage.setItem('sensorConfigured','true');

localStorage.setItem('sensorCode',code);

alert('Capteur configuré avec succès.');

window.location.href='dashboard.html';

}

function generateAlert(){

const alerts=[

'⚠️ Nouvelle surtension détectée.',

'⚡ Coupure SBEE détectée.',

'🔋 Groupe électrogène actif.'

];

const random=alerts[Math.floor(Math.random()*alerts.length)];

document.getElementById('newAlert').innerHTML=

'<div class=\"alert alert-warning\">'+random+'</div>';

}

function generateAI(){

const analyses=[

'IA : Réduction possible de 18% de consommation.',

'IA : Consommation anormale détectée.',

'IA : Pic énergétique entre 18h et 22h.'

];

const result=analyses[Math.floor(Math.random()*analyses.length)];

document.getElementById('aiResult').innerHTML=

'<div class=\"alert alert-success\">'+result+'</div>';

}

function saveSettings(){

document.getElementById('saveMessage').innerHTML=

'✅ Paramètres enregistrés avec succès.';

}
