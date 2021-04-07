export function getPlaceCoords(stringExpr, processData) {
  let url = new URL("https://nominatim.openstreetmap.org/search");
  url.search = new URLSearchParams({
    q: stringExpr,
    format: "geojson",
    //polygon_geojson: 1,
    "accept-language": "pl",
  });

  //fetch(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => processData(data));
}

export function getIsoline(coords, timerange, setIsoline) {
  let url = new URL(
    "https://isoline.route.ls.hereapi.com/routing/7.2/calculateisoline.json"
  );
  url.search = new URLSearchParams({
    apiKey: "tT0xJxu5VUFgwFIUzD8Dkz4UxWJwm-q_l8xmaxu_FI8",
    mode: "fastest;car",
    start: [coords[1], coords[0]],
    rangetype: "time",
    range: timerange,
  });
  fetch(url)
    .then((response) => response.json())
    .then((data) => setIsoline(data));
  //?mode=fastest%3Bcar&start=59.94999286952315%2C10.869465150213026&rangetype=time&range=900&apiKey=tT0xJxu5VUFgwFIUzD8Dkz4UxWJwm-q_l8xmaxu_FI8")
  //.then(response=>response.json()).then(data=>setIsoline(data)).then(console.log("lo"))
}

export function getIsolineDist(coords, distrange, setIsoline) {
  let range = distrange * 1000;
  let url = new URL(
    "https://isoline.route.ls.hereapi.com/routing/7.2/calculateisoline.json"
  );
  url.search = new URLSearchParams({
    apiKey: "tT0xJxu5VUFgwFIUzD8Dkz4UxWJwm-q_l8xmaxu_FI8",
    mode: "fastest;car",
    start: [coords[1], coords[0]],
    rangetype: "distance",
    range: range,
  });
  fetch(url)
    .then((response) => response.json())
    .then((data) => setIsoline(data));
  //?mode=fastest%3Bcar&start=59.94999286952315%2C10.869465150213026&rangetype=time&range=900&apiKey=tT0xJxu5VUFgwFIUzD8Dkz4UxWJwm-q_l8xmaxu_FI8")
  //.then(response=>response.json()).then(data=>setIsoline(data)).then(console.log("lo"))
}

export function getCompartments(bbox, setData) {
  let username = "admin";
  let password = "geoserver";
  let authString = `${username}:${password}`;
  let headers = new Headers();
  headers.append("Authorization", "Basic " + btoa(authString));
  let url = new URL("http://159.65.197.227:8080/geoserver/wfs");
  url.search = new URLSearchParams({
    service: "wfs",
    request: "getFeature",
    typeNames: "lasy:g_compartment",
    outputFormat: "application/json",
    bbox: `${bbox._southWest.lat},${bbox._southWest.lng},${bbox._northEast.lat},${bbox._northEast.lng}`,
  });
  fetch(url, { headers: headers })
    .then((response) => response.json())
    .then((data) => setData(data));
}
