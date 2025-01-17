import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Redux/store";
import { NavigationContainer } from "@react-navigation/native";

const RootComponent = () => (
  <Provider store={store}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
);

registerRootComponent(RootComponent);
