import React, { Component } from "react";
import styled from "styled-components";
import { Text, View, Image } from 'react-native';
import { withNavigation } from "react-navigation";
import Counter from "react-native-counters";
import CheckBox from 'react-native-check-box'
import { connect } from 'react-redux'
import Layout from "../../constants/Layout";
import AutoHeightImage from "react-native-auto-height-image";

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
const NoData = styled.View `
flex-direction:column;
justify-content:center;
text-align:center;
height:80%;
`;
const Centering = styled.View `
flex-direction:row;
justify-content:center;
text-align:center;
`;

const Righting = styled.View `
flex-direction:row;
justify-content:flex-end;
text-align:right;
`;
const Lefting = styled.View `
flex-direction:row;
justify-content:flex-start;
text-align:left;
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

const ATCbtn = styled.TouchableOpacity`
background-color:orange;
color:white;
border-radius:100px;
height:40px;
width:200px;
padding:10px;
`;
const BtnText = styled.Text`
color:white;
text-align:center;
`;
const CenterText = styled.Text`
flex-direction: column;
justify-content: center;
padding-left:10px;
padding-right:10px;
padding-top:10px;
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
class CartScreenPresenter extends Component {
    onChange(number, type) {
        // 1, + or -
    }
    state = {
        isChecked: false,
    };
    render() {
      let addedItems = this.props.cartItems.length > 0 ?
      (
      this.props.cartItems.map((data) => {
          return(
            <Row key={'mykey' + data.id}>
            <CheckBoxContainer>
              <CheckBox  key={'chk' + data.id}
              onClick = {() => { }}
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
                  <QWrapper>
                  <Counter start = { data.quantity }onChange = { this.onChange.bind(this) }max = { 100 }touchableColor = "gray"touchableDisabledColor = "lightgray" />
                  </QWrapper> 
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
          <Text>Tidak ada barang di cart</Text>
          </Centering>
          <Centering>
          <Text>Mulai beli sekarang!</Text>
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
            <Lefting>
            <CheckBoxContainer>
              <CheckBox 
              onClick = {() => {this.setState({isChecked: !this.state.isChecked})    }}
              isChecked = {this.state.isChecked}
              checkBoxColor = "orange" 
              />
            </CheckBoxContainer> 
            <CenterText>Pilih Semua</CenterText>
            </Lefting>
            <Righting>
            <CenterText>SubTotal: <DiscountedPrice> {formatRupiah(this.props.total+"","")} </DiscountedPrice></CenterText>
            <ATCbtn>
                <BtnText  onPress={() => this.props.navigation.navigate("Checkout")}>Checkout</BtnText>
            </ATCbtn>
            </Righting>
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
      removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CartScreenPresenter));