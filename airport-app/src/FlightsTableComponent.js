import React from "react";
import { Table } from "react-bootstrap";

import {
  airportData,
  getAirportICAO,
  getAirportName,
  getAirportState
} from "./scripts/db";
import DatePicker from "react-datepicker";
import "./datepicker-custom.css";
import { updateFlightCount } from "./AirportViewerComponent";

var arrivingFlights = [];
var departingFlights = [];

export var flightCount = 0;

// export function getFlightCount() {
//   return flightCount;
// }

export function fetchFlights(airportICAO, startDate, endDate) {
  var xhr = requestHelper(airportICAO, "api");
  xhr.onload = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var type = xhr.getResponseHeader("Content-Type");

      // Request for Departing Flights

      var departuresRequest = requestHelper(airportICAO, "departures", startDate, endDate);
      departuresRequest.onload = function() {
        if (
          departuresRequest.readyState === 4 &&
          departuresRequest.status === 200
        ) {
          var type = departuresRequest.getResponseHeader("Content-Type");
          if (type.indexOf("text") !== 1) {
            // console.log(departuresRequest.responseText);
            var departures = JSON.parse(this.response);
            departingFlights = [];
            for (var i = 0; i < departures.length; i++) {
              var departedTime = dateFormat(
                new Date(departures[i].firstSeen * 1000)
              );
              var arrivedTime = dateFormat(
                new Date(departures[i].lastSeen * 1000)
              );
              var callsignF = departures[i].callsign;
              var destinationF = getAirportName(
                departures[i].estArrivalAirport
              );
              var airportRegion = getAirportState(departures[i].estArrivalAirport);
              if (!callsignF) {
                callsignF = "unknown";
              }
              if (!destinationF) {
                destinationF = "unknown";
              }
              var fRow = {
                callsign: callsignF,
                destination: destinationF,
                departTime: departedTime,
                arriveTime: arrivedTime,
                destinationRegion: airportRegion
              };
              departingFlights.push(fRow);
              flightCount++;
              //apply changes to gui?
            }
            console.log("Departures loaded.");
            updateStateArrivals(departingFlights);
          }
        }
      };
      departuresRequest.send();

      var arrivalsRequest = requestHelper(airportICAO, "arrivals", startDate, endDate);
      arrivalsRequest.onload = function() {
        // var data = JSON.parse(this.response);
        if (
          arrivalsRequest.readyState === 4 &&
          arrivalsRequest.status === 200
        ) {
          var type = arrivalsRequest.getResponseHeader("Content-Type");
          if (type.indexOf("text") !== 1) {
            // console.log(request.responseText);
            var arrivals = JSON.parse(this.response);
            arrivingFlights = [];
            for (var i = 0; i < arrivals.length; i++) {
              var departedTime = dateFormat(
                new Date(arrivals[i].firstSeen * 1000)
              );
              var arrivedTime = dateFormat(
                new Date(arrivals[i].lastSeen * 1000)
              );
              var csignF = arrivals[i].callsign;
              var originF = getAirportName(arrivals[i].estDepartureAirport);
              var airportRegion = getAirportState(arrivals[i].estDepartureAirport);
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
                arriveTime: arrivedTime,
                originRegion: airportRegion
              };
              arrivingFlights.push(fRow);
              flightCount++;
              //apply changes to gui?
            }
            console.log("Arrivals loaded.");
            updateStateArrivals(arrivingFlights);
          }
        }
      };
      arrivalsRequest.send();
    }
  };
  xhr.send();
}

function requestHelper(airportICAO, reqType, startDate, endDate) {
  console.log(airportICAO);
  var xhr;

  // var d = new Date();
  // var startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  // var unixStartTime = Math.floor(Date.now() / 1000) - 7200; // t - 2 hours
  var unixStartTime = startDate / 1000; //86400 sec in day
  // var unixEndTime = Math.floor(Date.now() / 1000); // t
  var unixEndTime = endDate / 1000;
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

function updateStateArrivals(arrayArriving) {
  this.setState({ arrayArriving });
  updateFlightCount();
}

function updateStateDepartures(arrayDeparting) {
  this.setState({ arrayDeparting });
  updateFlightCount();
}

function renderArrivingFlight(flight, index) {
  // flightArray is either departing or arriving
  return (
    <tr className="flightRow" key={index}>
      <td>{flight.callsign}</td>
      <td title={flight.originRegion}>{flight.origin}</td>
      <td>{flight.departTime}</td>
      <td>{flight.arriveTime}</td>
    </tr>
  );
}

function renderDepartingFlight(flight, index) {
  return (
    <tr className="flightRow" key={index}>
      <td>{flight.callsign}</td>
      <td title={flight.destinationRegion}>{flight.destination}</td>
      <td>{flight.departTime}</td>
      <td>{flight.arriveTime}</td>
    </tr>
  );
}

export class FlightsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayDeparting: departingFlights,
      arrayArriving: arrivingFlights
    };
    updateStateArrivals = updateStateArrivals.bind(this);
    updateStateDepartures = updateStateDepartures.bind(this);
  }

  render() {
    return (
      <div id="flightsTableContainer">
        <div className="appTable" id="arrivingFlightsTable">
          <Table>
            <thead>
              <tr>
                <th>Callsign</th>
                <th>Origin</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
              </tr>
            </thead>

            <tbody>{arrivingFlights.map(renderArrivingFlight)}</tbody>
          </Table>
        </div>
        <div className="appTable" id="departingFlightsTable">
          <Table>
            <thead>
              <tr>
                <th>Callsign</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
              </tr>
            </thead>

            <tbody>{departingFlights.map(renderDepartingFlight)}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}
