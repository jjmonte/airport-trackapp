// functions for GUI

// hides a component by its elementID
export function hideComponent(elementID) {
  var x = document.getElementById(elementID);
  if (x.style.display !== "none") {
    x.style.display = "none";
  } else return;
}

export function showComponent(elementID, showOnce) {
  var x = document.getElementById(elementID);
  if (x.style.display === "none" && showOnce === true) {
    x.style.display = "flex";
  } else if (showOnce !== true) {
    x.style.display = "none";
  } else return;
}
