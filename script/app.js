// Add a few headers - UITZONDERING
let domLocatie,
	lat = 50.8027841,
	lon = 3.2097454,
	customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');

// _ = helper functions
function _parseMillisecondsIntoReadableTime(timestamp) {
	console.log(timestamp);
	//Get hours from milliseconds
	const date = new Date(timestamp * 1000);
	// Hours part from the timestamp
	const hours = '0' + date.getHours();
	// Minutes part from the timestamp
	const minutes = '0' + date.getMinutes();
	// Seconds part from the timestamp (gebruiken we nu niet)
	// const seconds = '0' + date.getSeconds();

	// Will display time in 10:30(:23) format
	return hours.substr(-2) + ':' + minutes.substr(-2); //  + ':' + s
}

// 5 TODO: maak updateSun functie

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
const placeSunAndStartMoving = (totalMinutes, minLeft) => {
	console.log(totalMinutes, minLeft);
	// In de functie moeten we eerst wat zaken ophalen en berekenen.
	// Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
	// Bepaal het aantal minuten dat de zon al op is.
	// Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
	// We voegen ook de 'is-loaded' class toe aan de body-tag.
	// Vergeet niet om het resterende aantal minuten in te vullen.
	// Nu maken we een functie die de zon elke minuut zal updaten
	// Bekijk of de zon niet nog onder of reeds onder is
	// Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
	// PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.

	let timeLeftHTML = '';
	timeLeftHTML = `<time class="c-horizon__time js-sunrise">${minLeft}</time>`;
	domTimeLeft.innerHTML = timeLeftHTML;
};

// 3 Met de data van de API kunnen we de app opvullen
const showResult = queryResponse => {
	// We gaan eerst een paar onderdelen opvullen
	// Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
	// Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
	// Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
	// Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
	console.log(queryResponse.city.name);
	sunrise = _parseMillisecondsIntoReadableTime(queryResponse.city.sunrise);
	sunset = _parseMillisecondsIntoReadableTime(queryResponse.city.sunset);
	console.log(sunrise);
	console.log(sunset);

	let locationHTML = '';
	locationHTML = `<p class="c-app__location u-muted js-location">
	${queryResponse.city.name}, ${queryResponse.city.country}	</p>`;
	domLocatie.innerHTML = locationHTML;

	let sunsetHTML = '';
	sunsetHTML = `<time class="c-horizon__time js-sunset">${sunset}</time>`;
	domSunset.innerHTML = sunsetHTML;

	let sunriseHTML = '';
	sunriseHTML = `<time class="c-horizon__time js-sunrise">${sunrise}</time>`;
	domSunrise.innerHTML = sunriseHTML;


	const test = new Date();
	
	//console.log('test ' + test.getHours()*60);
	let totalTime= test.getHours()*60+test.getMinutes();
	let timeSunset=((parseInt(sunset[0]+sunset[1])*60)+parseInt(sunset[3]+sunset[4]))
	let minLeft= timeSunset-totalTime
	placeSunAndStartMoving(totalTime,minLeft);
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
const getAPI = async (lat, lon) => {
	// Eerst bouwen we onze url op
	// Met de fetch API proberen we de data op te halen.
	// Als dat gelukt is, gaan we naar onze showResult functie.
	const SERVER_ENDPOINT = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=aa68f50ed970b463bc2b0825c3978f77&units=metric&lang=nl&cnt=1`;
	const data = await fetchData(SERVER_ENDPOINT);

	showResult(data);
	console.log(data);
};
const fetchData = url => {
	return fetch(url).then(r => r.json());
	/* 		.then(kip=>{showResult(kip)});
	 */
};
document.addEventListener('DOMContentLoaded', function() {
	// 1 We will query the API with longitude and latitude.
	//appid=aa68f50ed970b463bc2b0825c3978f77
	domLocatie = document.querySelector('.js-location');
	domSunset = document.querySelector('.js-sunset');
	domSunrise = document.querySelector('.js-sunrise');
	domTimeLeft= document.querySelector('.js-time-left');

	getAPI(lat, lon);
});
