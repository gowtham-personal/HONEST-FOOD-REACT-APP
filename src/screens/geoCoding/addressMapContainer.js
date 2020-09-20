import React, { useState } from "react";
import "./geoStyle.css";
import { emitEventToReducer, getPointData } from "./geoActions";
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
    },
    getPointData: params => {
      dispatch(getPointData(params));
    }
  };
};

/**
 * To Pass all State data to child Component
 * @param {all available states from Store} state
 */

const mapStateToProps = state => {
  return {
    locationCoordinates: state.geoReducer.locationCoordinates,
    polygonCoordinates: state.geoReducer.polygonCoordinates,
    userAddress: state.geoReducer.userAddress
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
