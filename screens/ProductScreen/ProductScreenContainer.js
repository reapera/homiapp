import React from "react";
import { TouchableOpacity, View, Platform } from "react-native";
import ProductScreenPresenter from "./ProductScreenPresenter";

export default class extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerRight: (
      <TouchableOpacity>
        <View
          style={{
            ...Platform.select({ ios: { heigth: 45 } }),
            justifyContent: "center",
            paddingLeft: 20
          }}
        >
        </View>
      </TouchableOpacity>
    ),
    headerRightContainerStyle: {
      ...Platform.select({
        ios: {
          paddingRight: 9,
          paddingVertical: 12
        },
        android: {
          paddingRight: 20,
          paddingVertical: 12
        }
      })
    }
  };

  render() {
    return <ProductScreenPresenter />;
  }
}
