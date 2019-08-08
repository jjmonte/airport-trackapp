import React from "react";
import { Table } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "./datepicker-custom.css";
import { airportData } from "./scripts/db";

var maximumDate = new Date();
maximumDate.setDate(maximumDate.getDate() - 1);

var initialStartDate = new Date();
initialStartDate.setDate(initialStartDate.getDate() - 2);

function renderOpenSkyData(airport, index) {
  return (
    <div className="airportHeader" key={index}>
      <div>
        Time Frame: <p>TIME-TIME</p> Flights: <p>#</p>
      </div>
    </div>
  );
}

class DateTimeRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: initialStartDate,
      endDate: maximumDate
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let main = this.state.startDate;
    console.log(main.format("L"));
  }

  render() {
    return (
      <div className="datePickerContainer">
        <p id="airportName_datePicker">Ellison Onizuka Kona International At Keahole Airport</p>
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
        </ul>

        <span id="flightCount">Showing 62 Flights</span>
      </div>
    );
  }
}

class AirportView extends React.Component {
  render() {
    // loading code
    return (
      <div className="airportView">
        <DateTimeRangePicker />
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
