// PARSER

function loadJSON() {
    var request = new XMLHttpRequest();
    request.open("GET", "./airports_us.json", true);
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Content-Type");
            if (type.indexOf("text") !== 1) {
                //console.log(request.responseText);
                JSONToArray(JSON.parse(request.responseText));
            }
        }
    };
}

function loadAirports(airportsArray) {
    var selectedState = document.getElementById("state_select").value;
    console.log(selectedState);
    var scope = angular.element('div[ng-controller="apCtrl"]').scope();

    var dom_el = document.querySelector('div[ng-controller="apCtrl"]');
    var ng_el = angular.element(dom_el).scope();
    ng_el.populateAirports(airportsArray);
}

function JSONToArray(json) {
    // arrData[i] = []

    for (var i = 0; i < json.length; i++) {
        airportsArray[i] = [];

        airportsArray[i].push(json[i].id);
        airportsArray[i].push(json[i].ident);
        airportsArray[i].push(json[i].type);
        airportsArray[i].push(json[i].name);
        airportsArray[i].push(json[i].latitude_deg);
        airportsArray[i].push(json[i].longitude_deg);
        airportsArray[i].push(json[i].elevation_ft);
        airportsArray[i].push(json[i].continent);
        airportsArray[i].push(json[i].iso_country);
        airportsArray[i].push(json[i].iso_region);
        airportsArray[i].push(json[i].municipality);
        airportsArray[i].push(json[i].scheduled_service);
        airportsArray[i].push(json[i].icao_code);
        airportsArray[i].push(json[i].iata_code);
        airportsArray[i].push(json[i].local_code);

        // arrData[i] = []
        // arrData[i].push(json[i].id);
        // arrData[i].push(json[i].ident);
        // arrData[i].push(json[i].type);
        // arrData[i].push(json[i].name);
        // arrData[i].push(json[i].latitude_deg);
        // arrData[i].push(json[i].longitude_deg);
        // arrData[i].push(json[i].elevation_ft);
        // arrData[i].push(json[i].continent);
        // arrData[i].push(json[i].iso_country);
        // arrData[i].push(json[i].iso_region);
        // arrData[i].push(json[i].municipality);
        // arrData[i].push(json[i].scheduled_service);
        // arrData[i].push(json[i].icao_code);
        // arrData[i].push(json[i].iata_code);
        // arrData[i].push(json[i].local_code);
    }

    loadAirports(airportsArray);
    console.log(airportsArray);
    drawAirportMap();
    // airportsArray = arrData;
}
