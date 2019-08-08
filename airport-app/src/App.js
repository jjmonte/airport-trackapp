import React from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import { showComponent, hideComponent } from "./gui_scripts";
// import airports_us from "./data/airports_us.json";

import { selectAirports, AirportTable } from "./AirportTableComponent";
import CesiumMap from "./CesiumViewerComponent";
import AirportView from "./AirportViewerComponent";

// class StateSelectButton extends React.Component {

//   render() {
//     return (

//     );
//   }
// }

class TitleStateSelect extends React.Component {
  handleClick() {
    var selectedState = this.refs.stateSelect.value;
    console.log(selectedState);
    selectAirports(selectedState);
  }

  render() {
    return (
      <div className="titlePane">
        <img
          id="title_logo"
          src={require("./data/images/paper-plane.png")}
          alt="paper airplane graphic"
        />
        <h2>Airport Tracker</h2>
        <p>Select a state to view airports in.</p>

        <select id="state_select" ref="stateSelect">
          <option value="US-AL">Alabama</option>
          <option value="US-AK">Alaska</option>
          <option value="US-AZ">Arizona</option>
          <option value="US-AR">Arkansas</option>
          <option value="US-CA">California</option>
          <option value="US-CO">Colorado</option>
          <option value="US-CT">Connecticut</option>
          <option value="US-DE">Delaware</option>
          <option value="US-DC">District Of Columbia</option>
          <option value="US-FL">Florida</option>
          <option value="US-GA">Georgia</option>
          <option value="US-HI">Hawaii</option>
          <option value="US-ID">Idaho</option>
          <option value="US-IL">Illinois</option>
          <option value="US-IN">Indiana</option>
          <option value="US-IA">Iowa</option>
          <option value="US-KS">Kansas</option>
          <option value="US-KY">Kentucky</option>
          <option value="US-LA">Louisiana</option>
          <option value="US-ME">Maine</option>
          <option value="US-MD">Maryland</option>
          <option value="US-MA">Massachusetts</option>
          <option value="US-MI">Michigan</option>
          <option value="US-MN">Minnesota</option>
          <option value="US-MS">Mississippi</option>
          <option value="US-MO">Missouri</option>
          <option value="US-MT">Montana</option>
          <option value="US-NE">Nebraska</option>
          <option value="US-NV">Nevada</option>
          <option value="US-NH">New Hampshire</option>
          <option value="US-NJ">New Jersey</option>
          <option value="US-NM">New Mexico</option>
          <option value="US-NY">New York</option>
          <option value="US-NC">North Carolina</option>
          <option value="US-ND">North Dakota</option>
          <option value="US-OH">Ohio</option>
          <option value="US-OK">Oklahoma</option>
          <option value="US-OR">Oregon</option>
          <option value="US-PA">Pennsylvania</option>
          <option value="US-RI">Rhode Island</option>
          <option value="US-SC">South Carolina</option>
          <option value="US-SD">South Dakota</option>
          <option value="US-TN">Tennessee</option>
          <option value="US-TX">Texas</option>
          <option value="US-UT">Utah</option>
          <option value="US-VT">Vermont</option>
          <option value="US-VA">Virginia</option>
          <option value="US-WA">Washington</option>
          <option value="US-WV">West Virginia</option>
          <option value="US-WI">Wisconsin</option>
          <option value="US-WY">Wyoming</option>
        </select>
        <button id="choose" onClick={ this.handleClick.bind(this) }>
          Show Airports
        </button>
      </div>
    );
  }
}

// class CtrlPane_1 extends React.Component {
//   render() {
//     return <div className="controlPane_1">{/* <AirportTable /> */}</div>;
//   }
// }

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <TitleStateSelect />
        <div id="cesiumBox">
          <CesiumMap />
        </div>
        <p id="footer" />
      </div>
    );
  }
}

class AppBody extends React.Component {
  render() {
    return (
      <div className="app_body">
        {/* <div id="no_selection">
          &#129040;
          <br />
          On the sidebar, select a state to view airports in.
        </div> */}
        <div id="airportsPane">
          <AirportTable />
        </div>
        <div id="flightsPane">
          <AirportView />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
            charset="utf-8"
          />
          <title>Airport Stats</title>

          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js" />
          <script
            data-require="bootstrap@3.3.7"
            data-semver="3.3.7"
            src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
          />
          <link
            data-require="bootstrap@3.3.7"
            data-semver="3.3.7"
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          />
          <script src="./scripts/parser.js" />
          <script src="./scripts/db.js" />
          <link
            href="https://cesiumjs.org/releases/1.57/Build/Cesium/Widgets/widgets.css"
            rel="stylesheet"
          />
        </Helmet>
        <Sidebar />
        <AppBody />
      </div>
    );
  }
  // componentDidMount() {
  //   let airportJSON = airports_us.map
  // }
}

export default App;
