import React from "react";
import CartScreenPresenter from "./CartScreenPresenter";

export default class extends React.Component {
    static navigationOptions = () => ({
        headerTitle: "Keranjang Saya",
        headerStyle: {
            backgroundColor: 'white'
        },
    });

    render() {
        return <CartScreenPresenter / > ;
    }
}