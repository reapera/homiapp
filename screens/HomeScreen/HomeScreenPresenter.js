import React, { Component } from "react";
import styled from "styled-components";
import MasonryProducts from "../../components/MasonryProducts";
import { StatusBar } from "react-native";
import {SERVER_URL} from "../../constant";

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
   loadData = search =>{
      console.log("req"+search);
      fetch(SERVER_URL+"/product?s="+search)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
        loading: false,
        dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
   };
   componentDidMount(){
    this.loadData(this.props.search);
   }
   componentDidUpdate(prevProps) {
    if (this.props.search !== prevProps.search) {
      this.loadData(this.props.search);
    }
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
