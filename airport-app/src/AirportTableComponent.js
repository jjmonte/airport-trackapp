import React from "react";
import { Table } from "react-bootstrap";
import { airportData } from "./scripts/db";
import { goToLocation } from "./CesiumViewerComponent";
import { loadFlightsPane } from "./App";
import { setSelectedAirportName } from "./AirportViewerComponent";
// import { fetchFlights } from "./FlightsTableComponent";

export var airports = [];
export var selectedAirportIndex = null;

function handleSelection() {
  // calls functions that trigger upon selection of a new airport row
  // grab airport ICAO, fly map to airport on cesium, load flights on FlightsTableComponent.js

  var airport = airports[selectedAirportIndex]; // full airport object
  goToLocation(airport); 
  loadFlightsPane();
  setSelectedAirportName(airport[3]);
  // fetchFlights(airport[1]); // airport's ICAO
}

export function selectAirports(selectedState) {
  this.setState({ selectedAirport: null });
  selectedAirportIndex = null; // clear selected airport row, to prevent issues on loading new airports
  airports = []; // clear the current selected state's airports, if any

  // if airport ICAO matches one found in the main db array, add it to new array
  for (var i = 0; i < airportData.length; i++) {
    if (selectedState === airportData[i][9]) {
      console.log(airportData[i][9]);
      airports.push(airportData[i]);
      // apply to gui?
    }
  }
  console.log(airports);
  updateStateAirportArray(airports);
}

function renderAirport(airport, index) {
  return (
    <tr
      onClick={event => this.toggleSelectedAirport(event, index)}
      key={index}
      className={this.state.selectedAirport === index ? "selected" : ""}
    >
      <td>{airport[1]}</td>
      <td>{airport[10]}</td>
      <td>{airport[3]}</td>
      <td>{airport[2]}</td>
    </tr>
  );
}

function updateStateAirportArray(airportArray) {
  this.setState({ airportArray });
}

export class AirportTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { airportArray: airports, selectedAirport: null };
    updateStateAirportArray = updateStateAirportArray.bind(this);
    renderAirport = renderAirport.bind(this);
    selectAirports = selectAirports.bind(this);
  }

  toggleSelectedAirport(event, index) {
    if (index === this.state.selectedAirport) {
      this.setState({ selectedAirport: null });
      selectedAirportIndex = null;
    } else {
      selectedAirportIndex = index;
      this.setState({ selectedAirport: index });
      console.log(selectedAirportIndex);
      handleSelection();
    }
  }

  render() {
    // loading code
    return (
      <div className="appTable">
        <Table>
          <thead>
            <tr>
              <th style={{ borderTopLeftRadius: "10px" }}>ICAO</th>
              <th>City</th>
              <th>Name</th>
              <th>Size</th>
            </tr>
          </thead>

          <tbody>{this.state.airportArray.map(renderAirport)}</tbody>
        </Table>
        {/* </div> */}
      </div>
    );
  }
}

// export default AirportTable;
