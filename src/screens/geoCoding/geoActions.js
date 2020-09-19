import API_URL_CONSTANTS from "../../constants/apiUrlConstants";
import { getMethod } from "../../helper/api";

export const emitEventToReducer = params => ({
  type: params.type,
  payload: params.payload
});

export const getPolygonData = params => async dispatch => {
  try {
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
        polygon: 1
      }
    );
    console.log("forwardGeocodingResponse", forwardGeocodingResponse);
    if (
      forwardGeocodingResponse &&
      forwardGeocodingResponse.data &&
      forwardGeocodingResponse.data.features
    ) {
      let features = forwardGeocodingResponse.data.features;
      features.map(feature => {
        console.log("feature", feature);
        if (feature.geometry.type == "Polygon") {
          dispatch(
            emitEventToReducer({
              type: "FORWARD_GEOCODING_SUCCESS",
              payload: feature.geometry.coordinates
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
