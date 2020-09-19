import React, { useState } from "react";
import { getPolygonData } from "./geoActions";
import { connect } from "react-redux";

/**
 * To dispatch all actions to child Component
 * @param {dispatch} event
 */
const mapDispatchToProps = dispatch => {
  return {
    getPolygonData: params => {
      dispatch(getPolygonData(params));
    }
  };
};

/**
 * To Pass all State data to child Component
 * @param {all available states from Store} state
 */

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer
  };
};

const AddressFormComponent = ({ history, getPolygonData }) => {
  const [state, setState] = useState({
    street: "",
    state: "",
    country: "",
    postalCode: "",
    errors: {}
  });

  const handleChange = e => {
    e.persist();
    delete state.errors[e.target.name];
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
      errors: state.errors
    }));
  };

  const validateOnBlur = e => {
    e.persist();
    if (!state[e.target.name]) {
      state.errors[
        e.target.name
      ] = `${e.target.name[0].toUpperCase()}${e.target.name.slice(
        1
      )} is Required`;
    }
    setState(prevState => ({
      ...prevState,
      errors: state.errors
    }));
  };

  const saveAddress = e => {
    e.preventDefault();
    if (
      Object.keys(state.errors).length == 0 &&
      state.street &&
      state.state &&
      state.country &&
      state["postal code"]
    ) {
      getPolygonData({ ...state, history });
    } else {
      if (!state.street) {
        state.errors.street = "Street is Required";
      }
      if (!state.state) {
        state.errors.state = "State is Required";
      }
      if (!state.country) {
        state.errors.country = "Country is Required";
      }
      if (!state["postal code"]) {
        state.errors["postal code"] = "Postal code is Required";
      }
    }
    setState(prevState => ({
      ...prevState,
      errors: state.errors
    }));
    console.log("state", state);
  };

  return (
    <div className="signup-form">
      <form>
        <h2>Address Lookup</h2>
        <p>Please fill in this form to create an address!</p>
        <hr />
        <div className="form-group address-form">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="fa fa-street-view" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="street"
              placeholder="Street"
              required="required"
              onBlur={e => validateOnBlur(e)}
              onChange={e => handleChange(e)}
            />
          </div>
          {state.errors.street && (
            <div className="error-text">{state.errors.street}</div>
          )}
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-flag" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="state"
              placeholder="State"
              required="required"
              onBlur={e => validateOnBlur(e)}
              onChange={e => handleChange(e)}
            />
          </div>
          {state.errors.state && (
            <div className="error-text">{state.errors.state}</div>
          )}
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-file-zip-o" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="country"
              placeholder="Country"
              maxLength="30"
              required="required"
              onBlur={e => validateOnBlur(e)}
              onChange={e => handleChange(e)}
            />
          </div>
          {state.errors.country && (
            <div className="error-text">{state.errors.country}</div>
          )}
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-map-marker" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="postal code"
              placeholder="Postal Code"
              required="required"
              maxLength="30"
              onBlur={e => validateOnBlur(e)}
              onChange={e => handleChange(e)}
            />
          </div>
          {state.errors["postal code"] && (
            <div className="error-text">{state.errors["postal code"]}</div>
          )}
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            onClick={e => saveAddress(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

/**
 * To connect your state and actions to child component
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressFormComponent);
