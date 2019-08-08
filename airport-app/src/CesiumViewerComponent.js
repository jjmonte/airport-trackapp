import React from "react";
import {
  Viewer,
  ImageryLayer,
  Entity,
  Scene,
  Billboard,
  Label,
  BillboardCollection,
  LabelCollection,
  BillboardGraphics,
  CameraFlyTo
} from "resium";
import planeIcon from "./data/images/plane_circle.png";
// import { airportData, loadAirportData } from "./scripts/db";

import Cesium from "cesium";
import { Cartesian3 } from "cesium";
import { airportData } from "./scripts/db";
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZjZkN2YwZC1jMmIzLTQ1YjgtYmQzNi03YTlhN2YyODY0NmUiLCJpZCI6MTEyMzEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTg0NDQzODZ9.RhJq7qyfKwm0ABZBnr4x9FFGwFaGzLXy1XEOCCbsO88";

// MAKE THIS WORK

var airportLocations = [];
var billboards = [];
var labels = [];
var cameraFlight = null;

export function goToLocation(airport) {
  // viewer.flyTo(airportLocations.getById(tableLocationIndex));
  this.setState({airportSelected: true})
  var cameraDestination = Cartesian3.fromDegrees(
    airport[5],
    airport[4],
    airport[6]
  );
  cameraFlight = <CameraFlyTo destination={cameraDestination} />;
}

function drawAirportMap() {
  for (var i = 0; i < airportData.length - 1; ++i) {
    var newLocation = (
      <Entity
        key={i + "E"}
        id={airportData[i][12]}
        lon={airportData[i][5]}
        lat={airportData[i][4]}
        position={Cartesian3.fromDegrees(
          airportData[i][5],
          airportData[i][4],
          airportData[i][6]
        )}
      >
        <BillboardGraphics
          key={i + "B"}
          image={planeIcon}
          show={true}
          scaleByDistance={new Cesium.NearFarScalar(500, 0.1, 8.0e6, 0.005)}
        />
      </Entity>
    );

    var newLabel = (
      <Label
        key={i + "L"}
        text={
          airportData[i][3] +
          "\n" +
          airportData[i][10] +
          " " +
          airportData[i][9]
        }
        horizontalOrigin={Cesium.HorizontalOrigin.LEFT}
        verticalOrigin={Cesium.VerticalOrigin.TOP}
        showBackground={true}
        show={false}
      />
    );

    // var newBillboard = (
    //   <Billboard
    //     key={i + "B"}
    //     image={planeIcon}
    //     show={true}
    //     scaleByDistance={new Cesium.NearFarScalar(500, 0.1, 8.0e6, 0.025)}
    //   />
    // );

    airportLocations.push(newLocation);
    // billboards.push(newBillboard);
    labels.push(newLabel);
  }
  // END FOR LOOP
}

export class CesiumMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = { airportSelected: null };
    goToLocation = goToLocation.bind(this);
  }

  render() {
    drawAirportMap();
    return (
      <div id="cesiumContainer">
        <Viewer
          full
          selectionIndicator={false}
          infoBox={false}
          sceneMode={Cesium.SceneMode.SCENE2D}
          timeline={false}
          animation={false}
          homeButton={false}
          sceneModePicker={false}
          navigationHelpButton={false}
        >
          <ImageryLayer
            imageryProvider={Cesium.createWorldImagery({
              style: Cesium.IonWorldImageryStyle.ROAD
            })}
          />

          {airportLocations}
          {/* <BillboardCollection>{billboards}</BillboardCollection> */}
          <LabelCollection>{labels}</LabelCollection>
          {cameraFlight}
        </Viewer>
        {/* <script src={require("./scripts/cesium_script.js")} /> */}
      </div>
    );
  }
}

// export default CesiumMap;
