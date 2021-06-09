import React, { Component } from "react";
import { Provider } from "react-redux";
import { YellowBox } from "react-native";
import AppNavigator from "./src/routes/rootNavigator";
import { store, persistor } from './src/public/redux/store';
import OneSignal from "react-native-onesignal";
import { PersistGate } from 'redux-persist/integration/react';
YellowBox.ignoreWarnings(["ViewPagerAndroid"]);
const axios = require("axios");
import NavigationService from "./src/screens/NavigationService";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}
