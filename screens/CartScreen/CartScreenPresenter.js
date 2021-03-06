import React, { Component } from "react";
import styled from "styled-components";
import { Text, View, Image } from 'react-native';
import { withNavigation } from "react-navigation";
import CheckBox from 'react-native-check-box'
import { connect } from 'react-redux'
import Layout from "../../constants/Layout";
import AutoHeightImage from "react-native-auto-height-image";
import { Ionicons } from "@expo/vector-icons";

const ScrollView = styled.ScrollView``;
const Container = styled.View `
  background-color: #e8e9ec;
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
const NoData = styled.View `
flex-direction:column;
justify-content:center;
text-align:center;
height:500;
`;
const Centering = styled.View `
flex-direction:row;
justify-content:center;
text-align:center;
`;

const CheckoutContainer = styled.View`
position:absolute;
bottom:0px;
height:60px;
background:white;
padding:10px;
width:100%;
flex-direction: row;
justify-content: space-between;
`;

const Removebtn = styled.TouchableOpacity`
flex-direction:column;
justify-content:flex-end;
`;
const ATCbtn = styled.TouchableOpacity`
background-color:orange;
color:white;
border-radius:100px;
height:40px;
padding:10px;
flex:1;
`;
const BtnText = styled.Text`
color:white;
text-align:center;
`;
const CenterText = styled.Text`
font-size:12;
`;
const CheckBoxText = styled.View`
flex-direction: column;
justify-content: center;
flex:2;
padding-left:10px;
`;

function formatRupiah(angka, prefix){
	var number_string = angka.replace(/[^,\d]/g, '').toString(),
	split   		= number_string.split(','),
	sisa     		= split[0].length % 3,
	rupiah     		= split[0].substr(0, sisa),
	ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
 
	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		var separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
 
	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : (rupiah ? 'Rp ' + rupiah : '');
}
function checker(product) {
  return product.selected;
}
class CartScreenPresenter extends Component {
    increase(product) {
        this.props.increaseItem(product);
    }
    reduce(product) {
        this.props.reduceItem(product);
    }
    remove(product){
      this.props.removeItem(product);
    }
    check(product){
      this.props.checkItem(product);
    }
    checkAll(){
      if(this.props.cartItems.every(checker))
      {
        this.props.cartItems.map((data) => {
            this.check(data)
        })
      }else{  
      this.props.cartItems.map((data) => {
        if (!data.selected){
          this.check(data)
        }
      })
      }
    }
    render() {
      let addedItems = this.props.cartItems.length > 0 ?
      (
      this.props.cartItems.map((data) => {
          return(
            <Row key={'mykey' + data.id}>
            <CheckBoxContainer>
              <CheckBox  key={'chk' + data.id}
              onClick = {()=>{this.check(data)}}
              isChecked = {data.selected}
              checkBoxColor = "orange" 
              />
            </CheckBoxContainer> 
            <CartContainer>
              <Image 
              source = {{uri: data.image_url}}
              resizeMode = "cover"
              style = {{width: 64, height: 64, borderRadius: 10, marginRight: 10 }}
              /> 
              <CartDet>
                <TitleWrapper>
                <Text> {data.name}</Text> 
                </TitleWrapper>
                <QPWrapper>
                    
                  <Removebtn onPress={()=>{this.reduce(data)}}>
                    <Ionicons
                    name="ios-remove-circle-outline"
                    color='lightgrey'
                    size={24}
                  />
                  </Removebtn>
                  <QWrapper>
                  <Text>{ data.quantity }</Text>
                  </QWrapper>
                  <Removebtn onPress={()=>{this.increase(data)}}>
                    <Ionicons
                    name="ios-add-circle-outline"
                    color='lightgrey'
                    size={24}
                  />
                  </Removebtn>
                  <Removebtn onPress={()=>{this.remove(data)}}>
                    <Ionicons
                    name="ios-trash"
                    color='lightgrey'
                    size={24}
                  />
                  </Removebtn>
                  <Price>
                    <DiscountedPrice> {formatRupiah(data.price+"","")} </DiscountedPrice> 
                    <ActualPrice style = {    { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } }> {formatRupiah(data.display_price+"","")} </ActualPrice> 
                  </Price> 
                </QPWrapper> 
              </CartDet> 
            </CartContainer> 
          </Row> 
          );
      }) 
      ):(
      <NoData>
          <Centering>
          <AutoHeightImage
            width={Layout.window.width /2}
            source={require("../../assets/images/kabut.png")}
          />
          </Centering>
          <Centering>
          <Text>No items in cart</Text>
          </Centering>
          <Centering>
          <Text>Buy now!</Text>
          </Centering>
          </NoData>
      )
        return ( 
        <Container>
          
          <ScrollView contentContainerStyle={{ paddingBottom: 40 }} bounces={false}>
          {addedItems}
          </ScrollView>
          {this.props.cartItems.length > 0 ? (
            <CheckoutContainer>
            <QPWrapper>
            <CheckBoxContainer>
              <CheckBox 
              onClick = {() => {this.checkAll()}}
              isChecked = {this.props.cartItems.every(checker)}
              checkBoxColor = "orange" 
              />
            </CheckBoxContainer> 
            <CheckBoxText>
            <CenterText>Pilih Semua</CenterText>
            <CenterText>SubTotal: <DiscountedPrice> {formatRupiah(this.props.total+"","")} </DiscountedPrice></CenterText>
            </CheckBoxText>
            <ATCbtn>
                <BtnText  onPress={() => this.props.navigation.navigate("Checkout")}>Checkout</BtnText>
            </ATCbtn>
            </QPWrapper>
          </CheckoutContainer>
          ): (<Text></Text>)}
        </Container>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      cartItems: state.items,
      total:state.total
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: {"product":product} }),
      checkItem: (product) => dispatch({ type: 'CHECK_FROM_CART', payload: {"product":product} }),
      increaseItem: (product) => dispatch({ type: 'INCREASE_FROM_CART', payload: {"product":product} }),
      reduceItem: (product) => dispatch({ type: 'REDUCE_FROM_CART', payload: {"product":product} })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CartScreenPresenter));