let autocompleteLoc;
let autocompleteDest;

const currentLocButton = document.querySelector("#current-location");
const locationInputField = document.querySelector("#myInput");
const destinationInputField = document.querySelector("#myInput1");
const submitButton = document.querySelector(".result-btn");
const liveLocation = document.querySelector(".live-location");
currentLocButton.addEventListener('click', getCurrentLocation)

function initialize() {
    autocompleteLoc = new google.maps.places.Autocomplete(
        document.getElementById("myInput"),
        {
            // types: ['geocode'],
            componentRestrictions: { 'country': ['EG'] },
            fields: ['place_id', 'geometry', 'name']
        }
    );
    autocompleteDest = new google.maps.places.Autocomplete(
        document.getElementById("myInput1"),
        {
            // types: ['geocode'],
            componentRestrictions: { 'country': ['EG'] },
            fields: ['place_id', 'geometry', 'name']
        }
    );
}

function takeInput() {
    var loc = document.getElementById('myInput').value;
    var dest = document.getElementById('myInput1').value;
    console.log(loc);
    console.log(dest);
    let locationLat = autocompleteLoc.getPlace().geometry.location.lat();
    let locationLong = autocompleteLoc.getPlace().geometry.location.lng();
    let destinationLat = autocompleteDest.getPlace().geometry.location.lat();
    let destinationLong = autocompleteDest.getPlace().geometry.location.lng()
    console.log(`Location lat ${locationLat} | Location long ${locationLong}`);
    console.log(`Destination lat ${destinationLat} | Destination long ${destinationLong}`);
    locationInputField.value = `${autocompleteLoc.getPlace().geometry.location.lat()},${autocompleteLoc.getPlace().geometry.location.lng()}`;
    destinationInputField.value = `${autocompleteDest.getPlace().geometry.location.lat()},${autocompleteDest.getPlace().geometry.location.lng()}`
    localStorage.setItem('DestinationLatitude', autocompleteDest.getPlace().geometry.location.lat());
    localStorage.setItem('DestinationLongitude', autocompleteDest.getPlace().geometry.location.lng());
    }
function getCurrentLocation() {
    if (navigator.geolocation) {
        console.log("geo supported")
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // console.log(position.coords)
                let latitiude = position.coords.latitude
                let longitude = position.coords.longitude
                console.log(`latitiude: ${latitiude}`)
                console.log(`longitude: ${longitude}`)

                // convert lat , long to address
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitiude},${longitude}&key=AIzaSyBnDdZwes8n2Icz5XFeId1r5e-qhHmMWfU`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (json) {
                        let address = json.results[3].formatted_address
                        locationInputField.value = address
                        console.log(address)
                    })
            },
            function (error) {
                console.log(error)
            })
    } else {
        console.log("geo not supported")
    }
}

function initMap() {
    // Get current location
    navigator.geolocation.watchPosition(function (position) {
        const currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // convert lat & long to address
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyBnDdZwes8n2Icz5XFeId1r5e-qhHmMWfU&language=ar`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (json) {
                        let currentAddress1 = json.results[3].formatted_address.split('،')[0]
                        let currentAddress2 = json.results[3].formatted_address.split('،')[1]
                        liveLocation.innerHTML=` انت الان في ${currentAddress1} - ${currentAddress2}`;
                        
                    })
        
        // Create map centered on current location
        map = new google.maps.Map(document.getElementById("map"), {
            center: currentLocation,
            zoom: 19,
        });

        // Create directions service and renderer
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();

        // Add renderer to map
        directionsRenderer.setMap(map);

        // Define destination 
        const DestinationLatitude = localStorage.getItem('DestinationLatitude');
        const DestinationLongitude = localStorage.getItem('DestinationLongitude');
        const destination = new google.maps.LatLng(DestinationLatitude, DestinationLongitude); // Replace with our destination's latitude and longitude
        
        // Define route options
        console.log(`currentLocation: ${currentLocation}`, `destination: ${destination}`)
        const routeOptions = {
            origin: currentLocation,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
        };

        // Get route and display on map
        directionsService.route(routeOptions, function (result, status) {
            if (status == "OK") {
                directionsRenderer.setDirections(result);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    });
}

submitButton.addEventListener("click", takeInput);
window.addEventListener("load", initMap);
window.addEventListener("load", initialize);

// window.addEventListener("load", autocomplete);