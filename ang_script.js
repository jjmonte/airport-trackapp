var app = angular.module("apTrackApp", []);

app.controller("apCtrl", [
  "$scope",
  function($scope) {
    $scope.airports = [];
    $scope.apArray = [];
    $scope.departingFlights = [];
    $scope.arrivalFlights = [];

    $scope.populateAirports = function(apArray) {
      $scope.selectedRow = null;
      $scope.airports = [];
      $scope.$apply(); // make table blank, for now
      //airports[selected].ICAO_airport       <--get ICAO?
      var selectedState = document.getElementById("state_select").value;
      // console.log(selectedState);
      for (var i = 0; i < apArray.length; i++) {
        if (selectedState === apArray[i][9]) {
          if (apArray[i][2] === "medium_airport") {
            var newRow = {
              ICAO_airport: apArray[i][12],
              Name: apArray[i][3],
              City: apArray[i][10],
              Size: "Medium"
              //flights: []
            };
          } else if (apArray[i][2] === "large_airport") {
            var newRow = {
              ICAO_airport: apArray[i][12],
              Name: apArray[i][3],
              City: apArray[i][10],
              Size: "Large"
              //flights: []
            };
          }

          $scope.airports.push(newRow);
          $scope.$apply();
        }
      }
      // $scope.$apply();
    };

    // $scope.airports = [
    //     {
    //         ICAO_airport: "KSFO",
    //         Name: "San Francisco International Airport",
    //         City: "San Francisco",
    //         Size: "large_airport"
    //     },
    //     {
    //         ICAO_airport: "KLAX",
    //         Name: "Los Angeles International Airport",
    //         City: "Los Angeles",
    //         Size: "large_airport"
    //     }
    // ];

    // $scope.departingFlights = [
    //   {
    //     ICAO_flight: "",
    //     Callsign: "",
    //     Departure: "",
    //     Arrival: ""
    //   }
    // ];

    $scope.fetchFlights = function() {
      $scope.arrivalFlights = [];
      $scope.departingFlights = [];
      // $scope.$apply();
      var airportICAO = $scope.airports[$scope.selectedRow].ICAO_airport;

      var departures;
      var arrivals;

      var xhr = requestHelper(airportICAO, "api");
      xhr.onload = function() {
        // var data = JSON.parse(this.response);
        if (xhr.readyState === 4 && xhr.status === 200) {
          var type = xhr.getResponseHeader("Content-Type");

          // My onload handling logic

          // Request for Departing Flights

          departuresRequest = requestHelper(airportICAO, "departures");
          departuresRequest.onload = function() {
            // var data = JSON.parse(this.response);
            if (
              departuresRequest.readyState === 4 &&
              departuresRequest.status === 200
            ) {
              var type = departuresRequest.getResponseHeader("Content-Type");
              if (type.indexOf("text") !== 1) {
                // console.log(departuresRequest.responseText);
                departures = JSON.parse(this.response);
                $scope.departingFlights = [];
                for (var i = 0; i < departures.length; i++) {
                  var departedTime = dateFormat(
                    new Date(departures[i].firstSeen * 1000)
                  );
                  var arrivedTime = dateFormat(
                    new Date(departures[i].lastSeen * 1000)
                  );
                  var csignF = departures[i].callsign;
                  var destF = getAirportName(departures[i].estArrivalAirport);
                  if (!csignF) {
                    csignF = "unknown";
                  }
                  if (!destF) {
                    destF = "unknown";
                  }
                  var fRow = {
                    callsign: csignF,
                    destination: destF,
                    departTime: departedTime,
                    arriveTime: arrivedTime
                  };
                  $scope.departingFlights.push(fRow);

                  $scope.$apply();
                }
                console.log("Departures loaded.");
              }
            }
          };
          departuresRequest.send();

          // Request for Arriving Flights

          var tool = (arrivalsRequest = requestHelper(airportICAO, "arrivals"));
          arrivalsRequest.onload = function() {
            // var data = JSON.parse(this.response);
            if (
              arrivalsRequest.readyState === 4 &&
              arrivalsRequest.status === 200
            ) {
              var type = arrivalsRequest.getResponseHeader("Content-Type");
              if (type.indexOf("text") !== 1) {
                // console.log(request.responseText);
                arrivals = JSON.parse(this.response);
                $scope.arrivalFlights = [];
                for (var i = 0; i < arrivals.length; i++) {
                  var departedTime = dateFormat(
                    new Date(arrivals[i].firstSeen * 1000)
                  );
                  var arrivedTime = dateFormat(
                    new Date(arrivals[i].lastSeen * 1000)
                  );
                  var csignF = arrivals[i].callsign;
                  var originF = getAirportName(arrivals[i].estDepartureAirport);
                  if (!csignF) {
                    csignF = "unknown";
                  }
                  if (!originF) {
                    originF = "unknown";
                  }
                  var fRow = {
                    callsign: csignF,
                    origin: originF,
                    departTime: departedTime,
                    arriveTime: arrivedTime
                  };
                  $scope.arrivalFlights.push(fRow);

                  $scope.$apply();
                }
                console.log("Arrivals loaded.");
              }
            }

            // Loop through flights, add to respective arrays
          };
          arrivalsRequest.send();
          // departures.forEach(flight => {
          //   var fRow = {
          //     ICAO: flight.icao24,
          //     destination: flight.estArrivalAirport,
          //     departTime: flight.firstSeen,
          //     arriveTime: flight.lastSeen
          //   };
          //   $scope.departingFlights.push(fRow);
          // });
        }
      };
      xhr.send();
      // $scope.$apply();
    };
    $scope.selectedRow = [];

    $scope.setSelected = function(rowID) {
      if ($scope.selectedRow === rowID) {
        $scope.selectedRow = null;
      } else $scope.selectedRow = rowID;
      console.log($scope.selectedRow);
      goToLocation($scope.airports[rowID].ICAO_airport);
      $scope.fetchFlights();
    };

    $scope.viewAirport = function(rowID, flightType) {
      console.log(rowID);
      if (flightType === "arrival") {
        airportName = $scope.arrivalFlights[rowID].origin;
      } else if (flightType === "departure") {
        airportName = $scope.departingFlights[rowID].destination;
      }
      var ICAO_toView = getAirportICAO(airportName);
      document.getElementById("state_select").value = getAirportState(
        ICAO_toView
      );

      setTimeout(function() {
        document.getElementById("choose").click();
      }, 1000);

      setTimeout(function() {
        var rowIndex;
        console.log($scope.airports);

        for (var i = 0; i < $scope.airports.length; i++) {
          if ($scope.airports[i].ICAO_airport == ICAO_toView) {
            rowIndex = i;
            console.log(rowIndex);
            $scope.setSelected(rowIndex);
          }
        };
        console.log(ICAO_toView);
        console.log(location);
        
        
      }, 1000);

    };
  }
]);

function requestHelper(airportICAO, reqType) {
  console.log(airportICAO);
  var xhr;

  var d = new Date();
  var startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  // var unixStartTime = Math.floor(Date.now() / 1000) - 7200; // t - 2 hours
  var unixStartTime = startOfDay / 1000 - 86400; //86400 sec in day
  // var unixEndTime = Math.floor(Date.now() / 1000); // t
  var unixEndTime = startOfDay / 1000;
  // time span is 2nd half of yesterday

  if (reqType === "arrivals") {
    // Request for arrivals
    var arrRequest =
      "https://jjmonte:codingairports1@opensky-network.org/api/flights/arrival?airport=" +
      airportICAO +
      "&begin=" +
      unixStartTime +
      "&end=" +
      unixEndTime;
    console.log(arrRequest);
    var request = new XMLHttpRequest();
    request.open("GET", arrRequest, true);
    return request;
  } else if (reqType === "departures") {
    // Request for departures
    var depRequest =
      "https://jjmonte:codingairports1@opensky-network.org/api/flights/departure?airport=" +
      airportICAO +
      "&begin=" +
      unixStartTime +
      "&end=" +
      unixEndTime;

    console.log(depRequest);
    var request = new XMLHttpRequest();
    request.open("GET", depRequest, true);
    return request;
  } else if (reqType === "api") {
    // Request to connect API
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://opensky-network.org/api/states/all", true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    return xhr;
  }
}

function dateFormat(dateObject) {
  var dateString =
    dateObject.getUTCFullYear() +
    "/" +
    ("0" + (dateObject.getUTCMonth() + 1)).slice(-2) +
    "/" +
    ("0" + dateObject.getUTCDate()).slice(-2) +
    " @ " +
    ("0" + dateObject.getUTCHours()).slice(-2) +
    ":" +
    ("0" + dateObject.getUTCMinutes()).slice(-2);

  return dateString;
}
