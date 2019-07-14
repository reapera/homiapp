import React, { Component } from "react";
import styled from "styled-components";
import MasonryProducts from "../../components/MasonryProducts";
import { StatusBar } from "react-native";

const Container = styled.View`
  background-color: white;
  flex: 1;
`;
class HomeScreenPresenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[]
     };
   }
   componentDidMount(){
    fetch("http://homia.id/api/homia/public/product")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }
    render() {
      return (
          
        <Container>
        <StatusBar barStyle="dark-content" />
        <MasonryProducts products={this.state.dataSource} />
      </Container>
      );
    }
}
export default HomeScreenPresenter;
