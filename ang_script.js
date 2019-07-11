var app = angular.module("apTrackApp", []);

var request = new XMLHttpRequest();

// request.open("GET", "https://opensky-network.org/api", true);

app.controller("apCtrl", [
    "$scope",
    function($scope) {
        $scope.airports = [];
        $scope.apArray = [];
        $scope.populateAirports = function(apArray) {
            $scope.selectedRow = null;
            $scope.airports = [];
            //airports[selected].ICAO_airport       <--get ICAO?
            var selectedState = document.getElementById("state_select").value;
            console.log(selectedState);
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
                }
            }
            $scope.$apply();
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

        // $scope.flights = [

        //     {
        //         ICAO_flight: "",
        //         Callsign: "",
        //         Departure: "",
        //         Arrival: ""
        //     }
        // ];

        $scope.selectedRow = [];
        $scope.setSelected = function(rowID) {
            if ($scope.selectedRow === rowID) {
                $scope.selectedRow = null;
            } else $scope.selectedRow = rowID;
            console.log($scope.selectedRow);
            goToLocation($scope.airports[rowID].ICAO_airport);
        };
    }
]);
