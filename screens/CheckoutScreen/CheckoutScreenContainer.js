import React from "react";
import CheckoutPresenter from "./CheckoutScreenPresenter";

export default class extends React.Component {
    static navigationOptions = () => ({
        headerTitle: "Checkout",
        headerStyle: {
            backgroundColor: 'white'
        },
    });

    render() {
        return <CheckoutPresenter / > ;
    }
}