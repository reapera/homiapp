import React from "react";
import HomeScreenPresenter from "./HomeScreenPresenter";
import SearchBar from "../../components/SearchBar";

export default class extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: < SearchBar onSubmit = { navigation.getParam("onSubmit", null) }
        />,
        headerStyle: {
            backgroundColor: 'white',
            height: 80,
        },
    });

    render() {
        return <HomeScreenPresenter / > ;
    }
}