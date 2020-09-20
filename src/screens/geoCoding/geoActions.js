import API_URL_CONSTANTS from "../../constants/apiUrlConstants";
import { getMethod } from "../../helper/api";

export const emitEventToReducer = params => ({
  type: params.type,
  payload: params.payload
});
const getForwardGeocodingData = async (params, isPolygon) => {
  const forwardGeocodingResponse = await getMethod(
    API_URL_CONSTANTS.FORWARD_GEO_CODING,
    {
      "Content-Type": "application/json"
    },
    {
      street: params.street,
      state: params.state,
      country: params.country,
      postalcode: params["postal code"],
      polygon: isPolygon ? 1 : 0
    }
  );
  return forwardGeocodingResponse;
};

export const getPolygonData = params => async dispatch => {
  try {
    dispatch(
      emitEventToReducer({
        type: "STORE_ADDRESS_DATA",
        payload: params
      })
    );
    let polygonResponse = await getForwardGeocodingData(params, true);
    console.log("polygonResponse", polygonResponse);
    if (
      polygonResponse &&
      polygonResponse.data &&
      polygonResponse.data.features
    ) {
      let features = polygonResponse.data.features;
      features.map(feature => {
        console.log("feature", feature);

        if (feature.geometry.type == "Polygon") {
          let polyCord = [];
          feature.geometry.coordinates[0].map(ll => {
            polyCord.push({ lat: ll[1], lng: ll[0] });
          });
          console.log("polyCord", polyCord);
          dispatch(
            emitEventToReducer({
              type: "FORWARD_GEOCODING_SUCCESS",
              payload: polyCord
            })
          );
        }
      });
      params.history.push("/map");
    }
  } catch (error) {
    console.log("error", error);
    emitEventToReducer({
      type: "FORWARD_GEOCODING_FAILURE",
      payload: error.message
    });
  }
};

export const getPointData = params => async dispatch => {
  try {
    let pointResponse = await getForwardGeocodingData(params, false);
    console.log("pointResponse", pointResponse);
    if (pointResponse && pointResponse.data && pointResponse.data.features) {
      let pointFeatures = pointResponse.data.features;
      pointFeatures.map(feature => {
        console.log("feature", feature);
        if (feature.geometry.type == "Point") {
          dispatch(
            emitEventToReducer({
              type: "STORE_LAT_LONG",
              payload: {
                lat: feature.geometry.coordinates[1],
                lng: feature.geometry.coordinates[0]
              }
            })
          );
        }
      });
    }
  } catch (error) {
    console.log("error", error);
    emitEventToReducer({
      type: "FORWARD_GEOCODING_FAILURE",
      payload: error.message
    });
  }
};

export const getAddress = params => async dispatch => {
  try {
    const reverseGeocodingResponse = await getMethod(
      API_URL_CONSTANTS.REVERSE_GEO_CODING,
      {
        "Content-Type": "application/json"
      },
      {
        lat: params.lat,
        long: params.long
      }
    );
    console.log("reverseGeocodingResponse", reverseGeocodingResponse);
    if (reverseGeocodingResponse.status == "200") {
      params.history.push("/");
      dispatch(
        emitEventToReducer({
          type: "REVERSE_GEOCODING_SUCCESS",
          payload: reverseGeocodingResponse
        })
      );
    } else {
      dispatch(
        emitEventToReducer({
          type: "REVERSE_GEOCODING_SUCCESS",
          payload: reverseGeocodingResponse
        })
      );
    }
  } catch (error) {
    dispatch(
      emitEventToReducer({
        type: "REVERSE_GEOCODING_FAILURE",
        payload: error.message
      })
    );
  }
};
