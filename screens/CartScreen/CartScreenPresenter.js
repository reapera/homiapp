import React, { Component } from "react";
import styled from "styled-components";
import { Text, View, Image } from 'react-native';
import Counter from "react-native-counters";
import CheckBox from 'react-native-check-box'

const Container = styled.View `
  background-color: lightgray;
  flex: 1;
  width:100%;
`;
const CartContainer = styled.View `
  flex-direction: row;
  background-color:white;
  padding:10px;
  margin:10px;
  margin-bottom:0px;
  border-radius:20px;
  flex:1;
`;

const CartDet = styled.View `
  flex-direction: column;
  justify-content: space-between;
  flex:1;
  `;

const Price = styled.View `
flex-direction: column;
justify-content:flex-end;
`;

const QPWrapper = styled.View `
  flex-direction: row;
  justify-content: space-between;
  flex:1;
`;

const TitleWrapper = styled.View `
  flex-direction: row;
  justify-content: space-between;
`;

const QWrapper = styled.View `
  flex-direction: column;
  justify-content:flex-end;
  height:100%;
`;
const DiscountedPrice = styled.Text `
text-align:right;
color:orange;
`;
const ActualPrice = styled.Text `
text-align:right;
font-size:10;
`;
const CheckBoxContainer = styled.View `
flex-direction: column;
justify-content: center;
margin-left:10px;
`;
const Row = styled.View `
flex-direction:row;
`;
class CartScreenPresenter extends Component {
    onChange(number, type) {
        // 1, + or -
    }
    state = {
        isChecked: false,
    };
    render() {
        return ( 
        <Container>
          <Row>
            <CheckBoxContainer>
              <CheckBox 
              onClick = {() => {this.setState({isChecked: !this.state.isChecked})    }}
              isChecked = {this.state.isChecked}
              checkBoxColor = "orange" 
              />
            </CheckBoxContainer> 
            <CartContainer>
              <Image 
              source = {{uri: "https://i.pinimg.com/564x/8f/27/44/8f27446e4f69541cb465e50b93dae15e.jpg"}}
              resizeMode = "cover"
              style = {{width: 64, height: 64, borderRadius: 10, marginRight: 10 }}
              /> 
              <CartDet>
                <TitleWrapper>
                <Text> MVMTH Watch </Text> 
                </TitleWrapper>
                <QPWrapper>
                  <QWrapper>
                  <Counter start = { 1 }onChange = { this.onChange.bind(this) }max = { 100 }touchableColor = "gray"touchableDisabledColor = "lightgray" />
                  </QWrapper> 
                  <Price>
                    <DiscountedPrice> Rp 200.000 </DiscountedPrice> 
                    <ActualPrice style = {    { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } }> Rp 250.000 </ActualPrice> 
                  </Price> 
                </QPWrapper> 
              </CartDet> 
            </CartContainer> 
          </Row> 
      </Container>
        );
    }
}

export default CartScreenPresenter;