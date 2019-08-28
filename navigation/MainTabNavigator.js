import React from "react";
import { Platform, Image, StyleSheet, View } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import Colors from "../constants/Colors";
import MessagesScreen from "../screens/MessagesScreen";

const StackNavOptions = {
    headerStyle: { borderBottomColor: Colors.tabBarBorderTop, height: 170 },
    headerTitleStyle: { fontSize: 14, color: Colors.blackColor }
};

const styles = StyleSheet.create({
    image: {
        alignSelf: 'stretch',
        width: 119,
        height: 20,
        marginTop: 5,
    },
});
const HomeStack = createStackNavigator({
    Home: HomeScreen
}, {
    navigationOptions: {...StackNavOptions }
});

HomeStack.navigationOptions = {
    tabBarIcon: ({ focused }) => ( <
        Image style = { styles.image }
        resizeMode = { 'contain' }
        source = { focused ? require("../assets/images/home_icon_lit.png") : require("../assets/images/home_icon.png") }
        />
    )
};

// const SearchStack = createStackNavigator({
//     Search: SearchScreen
// }, {
//     navigationOptions: {
//         ...StackNavOptions
//     }
// });

// SearchStack.navigationOptions = {
//     tabBarIcon: ({ focused }) => ( <
//         TabBarIcon focused = { focused }
//         name = { Platform.OS === "ios" ? "ios-search" : "md-search" }
//         />
//     )
// };

// const MessageStack = createStackNavigator({
//     Messages: MessagesScreen
// }, {
//     navigationOptions: {...StackNavOptions }
// });

// MessageStack.navigationOptions = {
//     tabBarIcon: ({ focused }) => ( <
//         TabBarIcon focused = { focused }
//         name = { Platform.OS === "ios" ? "ios-text" : "md-text" }
//         />
//     )
// };

const CartStack = createStackNavigator({
    Cart: CartScreen
}, {
    navigationOptions: {}
});

CartStack.navigationOptions = {
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = { Platform.OS === "ios" ? "ios-cart" : "md-cart" }
        />
    )
};
const ProfileStack = createStackNavigator({
    Profile: ProfileScreen
}, {
    navigationOptions: {...StackNavOptions }
});

ProfileStack.navigationOptions = {
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = { Platform.OS === "ios" ? "ios-person" : "md-person" }
        />
    )
};

export default createBottomTabNavigator({
    HomeStack,
    // SearchStack,
    // MessageStack,
    CartStack,
    ProfileStack
}, {
    initialRouteName: "HomeStack",
    tabBarOptions: {
        showLabel: false,
        style: {
            borderTopColor: Colors.tabBarBorderTop
        }
    }
});