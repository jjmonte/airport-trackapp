// PARSER
// import { airportData } from "./db"
// import { airportData } from "./db";
import airportsJson from '../data/airports_us_script'

export function loadJSON(airportData) {

  // console.log(airportsJson);

  return JSONToArray(airportData, airportsJson.data);
  
  // var request = new XMLHttpRequest();
  // request.open("GET", "./airports_us.json", true);
  // request.send(null);
  // request.onreadystatechange = function() {
  //   if (request.readyState === 4 && request.status === 200) {
  //     var type = request.getResponseHeader("Content-Type");
  //     if (type.indexOf("text") !== 1) {
  //       // console.log(request.responseText);
  //       return JSONToArray(airportData, JSON.parse(request.responseText));
  //     }
  //   }
  // };
};

export function loadAirports(airportData) {
  var selectedState = document.getElementById("state_select").value;
  console.log(selectedState);
  // var scope = angular.element('div[ng-controller="apCtrl"]').scope();

  // var dom_el = document.querySelector('div[ng-controller="apCtrl"]');
  // var ng_el = angular.element(dom_el).scope();
  // ng_el.populateAirports(airportData);
};

// function getAirportName(ICAO_airport) {
//   for (var i = 0; i < airportData.length; i++) {
//     if (airportData[i][12] === ICAO_airport) {
//       return airportData[i][3];
//     }
//   }
// };

// function getAirportICAO(airport_name) {
//   for (var i = 0; i < airportData.length; i++) {
//     if (airportData[i][3] === airport_name) {
//       return airportData[i][12];
//     }
//   }
// };

// function getAirportState(ICAO_airport) {
//   for (var i = 0; i < airportData.length; i++) {
//     if (airportData[i][12] === ICAO_airport) {
//       return airportData[i][9];
//     }
//   }
// };

// PARSES PROPERLY
export function JSONToArray(airportData, jsonObject) {
  console.log("parsing JSON...");
  var json = jsonObject;
  // console.log(json);
  for (var i = 0; i < 854; i++) {
    airportData[i] = [];
    if (json[i].type === "medium_airport") {
      airportData[i].push(json[i].id);
      airportData[i].push(json[i].ident);
      airportData[i].push("Medium");
      airportData[i].push(json[i].name);
      airportData[i].push(json[i].latitude_deg);
      airportData[i].push(json[i].longitude_deg);
      airportData[i].push(json[i].elevation_ft);
      airportData[i].push(json[i].continent);
      airportData[i].push(json[i].iso_country);
      airportData[i].push(json[i].iso_region);
      airportData[i].push(json[i].municipality);
      airportData[i].push(json[i].scheduled_service);
      airportData[i].push(json[i].icao_code);
      airportData[i].push(json[i].iata_code);
      airportData[i].push(json[i].local_code);
    } else if (json[i].type === "large_airport") {
      airportData[i].push(json[i].id);
      airportData[i].push(json[i].ident);
      airportData[i].push("Large");
      airportData[i].push(json[i].name);
      airportData[i].push(json[i].latitude_deg);
      airportData[i].push(json[i].longitude_deg);
      airportData[i].push(json[i].elevation_ft);
      airportData[i].push(json[i].continent);
      airportData[i].push(json[i].iso_country);
      airportData[i].push(json[i].iso_region);
      airportData[i].push(json[i].municipality);
      airportData[i].push(json[i].scheduled_service);
      airportData[i].push(json[i].icao_code);
      airportData[i].push(json[i].iata_code);
      airportData[i].push(json[i].local_code);
    } else continue; // No small airports, no data
    // console.log(airportData[i]);
  };

  // loadAirports(airportData);
  console.log("JSON parsed.");
  // drawAirportMap();
  // console.log(airportData);
  return airportData;
  
  // airportData = arrData;
};

export default {loadJSON, JSONToArray};