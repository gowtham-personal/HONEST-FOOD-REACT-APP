const INITIAL_STATE = {
  locationCoordinates: {},
  addressDetails: {},
  polygonCoordinates: [],
  errorMessage: undefined
};

const geoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "STORE_LAT_LONG":
      return {
        ...state,
        locationCoordinates: action.payload
      };
    case "FORWARD_GEOCODING_SUCCESS":
      return {
        ...state,
        polygonCoordinates: action.payload
      };
    case "REVERSE_GEOCODING_SUCCESS":
      return {
        ...state,
        addressDetails: action.payload
      };
    default:
      return state;
  }
};
export default geoReducer;
