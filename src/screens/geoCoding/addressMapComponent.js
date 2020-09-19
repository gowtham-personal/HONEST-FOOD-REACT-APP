import React from "react";
import { compose, withProps, withHandlers, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import CONFIG_CONSTANTS from "../../constants/configConstants";
import { Polygon } from "react-google-maps/lib/components/Polygon";
/*global google*/
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const defaultMapOptions = () => {
  return {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  };
};

const onMarkerClick = (e, props) => {
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((position, options) =>
      showPosition(position, e, props)
    );
  } else {
  }
};

const onMarkerDragEnd = (coord, props) => {
  const { latLng } = coord;

  const lat = latLng.lat();
  const lng = latLng.lng();
  var position = {
    coords: {
      latitude: lat,
      longitude: lng
    }
  };
  showPosition(position, "geo", props);
};

const showPosition = (position, el, props) => {
  if (el === "geo") {
    this.props.emitEventToReducer({
      type: "STORE_LAT_LONG",
      payload: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  } else {
    return position;
  }
};

const AddressMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${CONFIG_CONSTANTS.GOOGLE_API_KEY}&libraries=geometry,drawing,visualization`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} class="map-container" />,
    mapElement: <div style={{ height: `100%`, position: "fixed" }} />
  }),

  lifecycle({
    componentDidMount(props) {
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(
          (position, options) => {
            console.log("position", this.props);
            this.props.emitEventToReducer({
              type: "STORE_LAT_LONG",
              payload: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
          },
          error => {
            console.log("error", error);
          }
        );
      }
    }
  }),
  withHandlers(props => {
    const refs = {
      map: undefined
    };

    return {
      onMapMounted: () => ref => {
        refs.map = ref;
        var map =
          ref &&
          ref.context &&
          ref.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        if (map) {
          const controlDiv = document.createElement("div");
          var firstChild = document.createElement("button");
          firstChild.style.backgroundColor = "#fff";
          firstChild.style.border = "none";
          firstChild.style.outline = "none";
          firstChild.style.width = "40px";
          firstChild.style.height = "40px";
          firstChild.style.borderRadius = "2px";
          firstChild.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
          firstChild.style.cursor = "pointer";
          firstChild.style.marginRight = "10px";
          firstChild.style.padding = "0px";
          firstChild.title = "Your Location";
          controlDiv.appendChild(firstChild);
          var secondChild = document.createElement("div");
          secondChild.style.margin = "auto";
          secondChild.style.width = "18px";
          secondChild.style.height = "18px";
          secondChild.style.backgroundImage =
            "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)";
          secondChild.style.backgroundSize = "180px 18px";
          secondChild.style.backgroundPosition = "0px 0px";
          secondChild.style.backgroundRepeat = "no-repeat";
          secondChild.id = "you_location_img";
          secondChild.onclick = () => {
            onMarkerClick("geo", props);
          };
          firstChild.appendChild(secondChild);
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
            controlDiv
          );
        }
      }
    };
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  console.log("props", props);
  if (props.locationCoordinates && props.locationCoordinates.lat) {
    return (
      <GoogleMap
        center={{
          lat: props.locationCoordinates.lat,
          lng: props.locationCoordinates.lng
        }}
        zoom={18}
        ref={props.onMapMounted}
        defaultOptions={defaultMapOptions()}
      >
        <Marker
          position={{
            lat: props.locationCoordinates.lat,
            lng: props.locationCoordinates.lng
          }}
          draggable={true}
          onDragEnd={event => {
            onMarkerDragEnd(event, props);
          }}
        ></Marker>

        {props.polygonCordinates && props.polygonCordinates.length > 0 && (
          <Polygon
            path={props.polygonCordinates[0]}
            options={{
              fillColor: "red",
              fillOpacity: 0.7,
              strokeColor: "red",
              strokeWeight: 1
            }}
          />
        )}
      </GoogleMap>
    );
  } else {
    return <></>;
  }
});
export default AddressMapComponent;
