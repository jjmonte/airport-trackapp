import React from "react";
import { Table } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "./datepicker-custom.css";
import { airportData } from "./scripts/db";
import { FlightsTable, flightCount, fetchFlights } from "./FlightsTableComponent";
import { airports, selectedAirportIndex } from "./AirportTableComponent";

var maximumDate = new Date();
maximumDate.setDate(maximumDate.getDate() - 1);

var initialStartDate = new Date();
initialStartDate.setDate(initialStartDate.getDate() - 2);

var selectedAirportName = null;

export function setSelectedAirportName(name) {
  selectedAirportName = name;
  this.setState({ selectedAirportName: name });
}
export function updateFlightCount() {
  this.setState({ importedFlightCount: flightCount});
}

function renderOpenSkyData(airport, index) {
  return (
    <div className="airportHeader" key={index}>
      <div>
        Time Frame: <p>TIME-TIME</p> Flights: <p>#</p>
      </div>
    </div>
  );
}

// function formatThousands(number) {
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

class DateTimeRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: initialStartDate,
      endDate: maximumDate,
      airportName: null,
      importedFlightCount: flightCount
    };
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    setSelectedAirportName = setSelectedAirportName.bind(this);
    updateFlightCount = updateFlightCount.bind(this);
  }

  handleChangeStart(date) {
    this.setState({startDate: date})
  }

  handleChangeEnd(date) {
    this.setState({endDate: date});
  }

  // handleChange(date) {
  //   this.setState({
  //     startDate: date
  //   });
  // }



  handleSubmit(e) {
    e.preventDefault();
    // let main = this.state.startDate;
    console.log(this.state.startDate / 1000);
    fetchFlights(airports[selectedAirportIndex][1], this.state.startDate, this.state.endDate);
    // console.log(main.format("L"));
  }

  render() {
    return (
      <div className="datePickerContainer">
        <p id="airportName_datePicker">{selectedAirportName}</p>
        <ul style={{ listStyle: "none" }}>
          <li>
            <p>Time Frame:</p>
          </li>
          <li>
            <DatePicker
              showTimeSelect
              dateFormat="MM/dd/yyyy h:mm aa"
              timeFormat="HH:mm"
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart}
              maxDate={maximumDate}
              timeIntervals={60}
            />
          </li>

          <li>
            <span
              style={{
                textAlign: "center",
                fontFamily: "Sansation",
                fontWeight: "bold"
              }}
            >
              To
            </span>
          </li>

          <li>
            <DatePicker
              showTimeSelect
              dateFormat="MM/dd/yyyy h:mm aa"
              timeFormat="HH:mm"
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd}
              minDate={this.state.startDate}
              maxDate={maximumDate}
              timeIntervals={60}
            />
          </li>
          <button style={{ marginTop: "2%" }} id="choose" onClick={this.handleSubmit}>Submit</button>
        </ul>

        <span id="flightCount">Showing { flightCount.toLocaleString() } Flights</span>
      </div>
    );
  }
}

// class FlightsTable extends React.Component {
//   render() {
//     return (
//       <div className="appTable">
//         <Table>
//           <thead>
//             <tr>
//               <th style={{ borderTopLeftRadius: "10px" }}>ICAO</th>
//               <th>City</th>
//               <th>Name</th>
//               <th>Size</th>
//             </tr>
//           </thead>

//           <tbody>{this.state.airportArray.map(renderAirport)}</tbody>
//         </Table>
//       </div>
//     )
//   }
// }

class AirportView extends React.Component {
  render() {
    // loading code
    return (
      <div className="airportView">
        <DateTimeRangePicker />
        <FlightsTable />
      </div>
    );
  }
}

export default AirportView;

// <div className="airportHeader">
//           <Table className="appTable">
//             <thead>
//               <tr>
//                 <th style={{ borderTopLeftRadius: "10px" }}>
//                   USA International Airport
//                   <br />
//                   City, State
//                 </th>
//                 <th
//                   style={{
//                     backgroundColor: "#181818",
//                     borderBottom: "1px solid #282828"
//                   }}
//                 >
//                   Time Frame:
//                 </th>
//                 {/* <th
//                   style={{
//                     backgroundColor: "#181818",
//                     borderBottom: "1px solid #282828",
//                     fontSize: "Small",
//                     textAlign: "center"
//                   }}
//                 >
//                   Showing 24 Flights
//                 </th> */}
//               </tr>
//             </thead>
//           </Table>
//         </div>
