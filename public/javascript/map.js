// const { coordinates } = require("@maptiler/client");

// const { Color } = require("maplibre-gl");

  maptilersdk.config.apiKey = mapToken;
  const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 9 // starting zoom
});


const marker = new maptilersdk.Marker({color: "red"})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({offset: 25}).setHTML(
      `<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`

  ))
  .addTo(map);