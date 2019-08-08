import React from "react";
import { Table } from "react-bootstrap";

import { airportData } from "./scripts/db";
import DatePicker from "react-datepicker";
import "./datepicker-custom.css";

var arrivingFlights = [];
var departingFlights = [];

var flightCount = 0;

var selectedAirportICAO;

function fetchFlights(selectedAirportICAO) {
  var xhr = requestHelper(airportICAO, "api");
  xhr.onload = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var type = xhr.getResponseHeader("Content-Type");

      // Request for Departing Flights

      departuresRequest = requestHelper(airportICAO, "departures");
      departuresRequest.onload = function() {
        if (
          departuresRequest.readyState === 4 &&
          departuresRequest.status === 200
        ) {
          var type = departuresRequest.getResponseHeader("Content-Type");
          if (type.indexOf("text") !== 1) {
            // console.log(departuresRequest.responseText);
            departures = JSON.parse(this.response);
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
            arrivalFlights = [];
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
              arrivalFlights.push(fRow);
              flightCount++;
              //apply changes to gui?
            }
            console.log("Arrivals loaded.");
            updateStateArrivals(arrivalFlights);
          }
        }
      };
      arrivalsRequest.send();
    }
  };
  xhr.send();
}

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

function updateStateArrivals(arrayArriving) {
  this.setState({ arrayArriving });
}

function updateStateDepartures(arrayDeparting) {
  this.setState({ arrayDeparting });
}

function renderFlight(flight, index) {
  // flightArray is either departing or arriving
  return (
    <tr className="flightRow" key={index}>
      <td>{flight[0]}</td>
      <td>{flight[1]}</td>
      <td>{flight[3]}</td>
      <td>{flight[4]}</td>
    </tr>
  );
}

class FlightsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arrayDeparting: departures, arrayArriving: arrivals };
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

            <tbody>{arrivingFlights.map(renderFlight)}</tbody>
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

            <tbody>{departingFlights.map(renderFlight)}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}
