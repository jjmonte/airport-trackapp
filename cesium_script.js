Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZjZkN2YwZC1jMmIzLTQ1YjgtYmQzNi03YTlhN2YyODY0NmUiLCJpZCI6MTEyMzEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTg0NDQzODZ9.RhJq7qyfKwm0ABZBnr4x9FFGwFaGzLXy1XEOCCbsO88";

//Cesium.Camera.DEFAULT_VIEW_RECTANGLE = 0;
//Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

var viewer = new Cesium.Viewer("cesiumContainer", {
    selectionIndicator: false,
    infoBox: false,
    imageryProvider: Cesium.createWorldImagery({
        style: Cesium.IonWorldImageryStyle.ROAD
    }),
    sceneMode: Cesium.SceneMode.SCENE2D
});
var scene = viewer.scene;

var planeIcon = "images/plane_circle.png";
var lastHovered = null;
var cameraHeight = viewer.camera.positionCartographic.height;



//var airportsArray = airportsArray;

var distanceViewModel = {
    emissionRate: 5.0,
    gravity: 0.0,
    minimumParticleLife: 1.2,
    maximumParticleLife: 1.2,
    minimumSpeed: 1.0,
    maximumSpeed: 4.0,
    startScale: 1.0,
    endScale: 5.0,
    particleSize: 25.0
};

var airportLocations = new Cesium.EntityCollection();

function drawAirportMap() {
    for (var i = 0; i < airportsArray.length - 1; ++i) {
        airportLocations.add(
            viewer.entities.add({
                id: airportsArray[i][12],
                lon: airportsArray[i][5],
                lat: airportsArray[i][4],
                position: new Cesium.Cartesian3.fromDegrees(
                    airportsArray[i][5],
                    airportsArray[i][4],
                    airportsArray[i][6]
                ),
                billboard: {
                    image: planeIcon,
                    show: true,
                    scaleByDistance: new Cesium.NearFarScalar(
                        500,
                        0.1,
                        8.0e6,
                        0.025
                    )
                },
                label: {
                    text:
                        airportsArray[i][3] +
                        "\n" +
                        airportsArray[i][10] +
                        " " +
                        airportsArray[i][9],
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                    verticalOrigin: Cesium.VerticalOrigin.TOP,
                    showBackground: true,
                    show: false
                }
            })
        );
    }
}

var hoverHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

hoverHandler.setInputAction(function(movement) {
    var pickedObject = scene.pick(movement.endPosition);
    if (
        Cesium.defined(pickedObject) &&
        airportLocations.contains(pickedObject.id)
    ) {
        var locationID = pickedObject.id;
        lastHovered = locationID;
        locationID.billboard.scale = 1.2;
        locationID.label.show = true;
    } else if (lastHovered != null) {
        lastHovered.billboard.scale = 1.0;
        lastHovered.label.show = false;
        lastHovered = null;
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

var clickHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

clickHandler.setInputAction(function(movement) {
    var pickedObject = scene.pick(movement.position);

    if (Cesium.defined(pickedObject)) {
        var locationID = pickedObject.id;

        if (distLineToggled == true) {
            selectObject(selectedTuple[0]);
            viewer.entities.remove(distLine);
            viewer.entities.remove(distLabel);
            distLineToggled = false;
            //selectObject(locationID);
        } else selectObject(locationID);

        if (selectedTuple.length > 1 && distLineToggled == false) {
            drawDistanceLine();
        } else {
            console.log("Error selecting new locationID.");
        }
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

function selectObject(locationID) {
    if (!selectedTuple.includes(locationID)) {
        if (selectedTuple.length < 2) {
            locationID.billboard.color = Cesium.Color.RED;
            selectedTuple.push(locationID);
            //selectedTuple.splice(0, 0, locationID);
            console.log("added " + locationID + "to tuple");
            console.log(selectedTuple);
        }
    } else {
        locationID.billboard.color = null;
        locationID.label.show = false;
        selectedTuple = selectedTuple.filter(loc => loc != locationID);
        console.log("removed " + locationID + "from tuple");
        console.log(selectedTuple);
    }
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

function goToLocation(tableLocationIndex) {
    viewer.flyTo(airportLocations.getById(tableLocationIndex));
}
