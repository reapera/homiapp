import React from "react";
import { Alert } from "react-native";
import HomeScreenPresenter from "./HomeScreenPresenter";
import SearchBar from "../../components/SearchBar";

export default class extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: < SearchBar 
        onSubmit = { navigation.getParam("onSubmit", null) }
        />,
        headerStyle: {
            backgroundColor: 'white',
            height: 80,
        },
    });

    constructor(props) {
        super(props);
        props.navigation.setParams({
            onSubmit: this.onSubmit
        });
        this.state = {
            search: "",
        };
    }

    onSubmit = text => {
        this.setState({
            search: text
        })
    };
    render() {
        return <HomeScreenPresenter search = { this.state.search }
        / > ;
    }
}