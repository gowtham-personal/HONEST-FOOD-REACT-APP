import React from "react";
import { Route, Switch } from "react-router-dom";
import AddressMapContainer from "../screens/geoCoding/addressMapContainer";
import AddressFormComponent from "../screens/geoCoding/addressFormComponent";
class RoutesComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/"
            exact
            render={props => {
              return (
                <React.Fragment>
                  <AddressFormComponent {...props} />
                </React.Fragment>
              );
            }}
          />
        </Switch>
        <Switch>
          <Route
            path="/map"
            exact
            render={props => {
              return (
                <React.Fragment>
                  <AddressMapContainer {...props} />
                </React.Fragment>
              );
            }}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default RoutesComponent;
