import React from "react";
import { Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font"

import AppNavigator from "./navigation/AppNavigator";
import { Provider } from 'react-redux'
import store from './store'

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  loadResourcesAsync = async () => {
    await Asset.loadAsync([
      require("./assets/images/authBackground.jpg"),
      require("./assets/images/smAvatar.png"),
      require("./assets/images/smAvatar2.png")
    ]);
    await Font.loadAsync(Ionicons.font);
  };

  handleLoadingError = error => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Container>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </Container>
    );
  }
}
