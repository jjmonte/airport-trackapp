// Helper Script
import { loadJSON } from "./parser.js";

export var airportData = [];

loadJSON(airportData);

export function getAirportName(ICAO_airport) {
  for (var i = 0; i < airportData.length; i++) {
    if (airportData[i][12] === ICAO_airport) {
      return airportData[i][3];
    }
  }
}

export function getAirportICAO(airport_name) {
  for (var i = 0; i < airportData.length; i++) {
    if (airportData[i][3] === airport_name) {
      return airportData[i][12];
    }
  }
}

export function getAirportState(ICAO_airport) {
  for (var i = 0; i < airportData.length; i++) {
    if (airportData[i][12] === ICAO_airport) {
      return regionToStateName(airportData[i][9]);
    }
  }
}

export function regionToStateName(region) {
  var state;
  switch (region) {
    case "US-AL":
      state = "Alabama";
      break;
    case "US-AK":
      state = "Alaska";
      break;
    case "US-AZ":
      state = "Arizona";
      break;
    case "US-AR":
      state = "Arkansas";
      break;
    case "US-CA":
      state = "California";
      break;
    case "US-CO":
      state = "Colorado";
      break;
    case "US-CT":
      state = "Connecticut";
      break;
    case "US-DE":
      state = "Delaware";
      break;
    case "US-DC":
      state = "District Of Columbia";
      break;
    case "US-FL":
      state = "Florida";
      break;
    case "US-GA":
      state = "Georgia";
      break;
    case "US-HI":
      state = "Hawaii";
      break;
    case "US-ID":
      state = "Idaho";
      break;
    case "US-IL":
      state = "Illinois";
      break;
    case "US-IN":
      state = "Indiana";
      break;
    case "US-IA":
      state = "Iowa";
      break;
    case "US-KS":
      state = "Kansas";
      break;
    case "US-KY":
      state = "Kentucky";
      break;
    case "US-LA":
      state = "Louisiana";
      break;
    case "US-ME":
      state = "Maine";
      break;
    case "US-MD":
      state = "Maryland";
      break;
    case "US-MA":
      state = "Massachusetts";
      break;
    case "US-MI":
      state = "Michigan";
      break;
    case "US-MN":
      state = "Minnesota";
      break;
    case "US-MS":
      state = "Mississippi";
      break;
    case "US-MO":
      state = "Missouri";
      break;
    case "US-MT":
      state = "Montana";
      break;
    case "US-NE":
      state = "Nebraska";
      break;
    case "US-NV":
      state = "Nevada";
      break;
    case "US-NH":
      state = "New Hampshire";
      break;
    case "US-NJ":
      state = "New Jersey";
      break;
    case "US-NM":
      state = "New Mexico";
      break;
    case "US-NY":
      state = "New York";
      break;
    case "US-NC":
      state = "North Carolina";
      break;
    case "US-ND":
      state = "North Dakota";
      break;
    case "US-OH":
      state = "Ohio";
      break;
    case "US-OK":
      state = "Oklahoma";
      break;
    case "US-OR":
      state = "Oregon";
      break;
    case "US-PA":
      state = "Pennsylvania";
      break;
    case "US-RI":
      state = "Rhode Island";
      break;
    case "US-SC":
      state = "South Carolina";
      break;
    case "US-SD":
      state = "South Dakota";
      break;
    case "US-TN":
      state = "Tennessee";
      break;
    case "US-TX":
      state = "Texas";
      break;
    case "US-UT":
      state = "Utah";
      break;
    case "US-VT":
      state = "Vermont";
      break;
    case "US-VA":
      state = "Virginia";
      break;
    case "US-WA":
      state = "Washington";
      break;
    case "US-WV":
      state = "West Virginia";
      break;
    case "US-WI":
      state = "Wisconsin";
      break;
    case "US-WY":
      state = "Wyoming";
      break;
  }
  return state;
}

// airportData = loadJSON();

// loadAirportData();
export default airportData;

//myCtrl.apArray = airportsArray;
//drawAirportMap();
