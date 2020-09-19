import React, { useState } from "react";
import "./geoStyle.css";
import { emitEventToReducer } from "./geoActions";
import { connect } from "react-redux";
import AddressMapComponent from "./addressMapComponent";

/**
 * To dispatch all actions to child Component
 * @param {dispatch} event
 */
const mapDispatchToProps = dispatch => {
  return {
    emitEventToReducer: params => {
      dispatch(emitEventToReducer(params));
    }
  };
};

/**
 * To Pass all State data to child Component
 * @param {all available states from Store} state
 */

const mapStateToProps = state => {
  return {
    geoReducer: state.geoReducer,
    locationCoordinates: state.geoReducer.locationCoordinates,
    polygonCoordinates: state.geoReducer.polygonCoordinates
  };
};

const AddressMapContainer = props => {
  return <AddressMapComponent {...props} />;
};

/**
 * To connect your state and actions to child component
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressMapContainer);
