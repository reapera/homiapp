import React, { Component } from "react";
import styled from "styled-components";
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux'
import Layout from "../../constants/Layout";
import AutoHeightImage from "react-native-auto-height-image";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

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
  const CheckoutDetail = styled.View `
    flex:10;
    flex-direction: column;
    justify-content: space-between;
    padding:10px;
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
const CheckoutContainer = styled.View`
position:absolute;
bottom:0px;
background:white;
padding:10px;
width:100%;
flex-direction: column;
justify-content: flex-end;
`;

const ATCbtn = styled.TouchableOpacity`
background-color:orange;
color:white;
border-radius:100px;
height:40px;
padding:10px;
`;
const BtnText = styled.Text`
color:white;
text-align:center;
`;
const TotalText = styled.Text`
font-size:20px;
font-weight:bold;
`;
const TextBetween = styled.View`
flex-direction: row;
justify-content: space-between;
margin-bottom:10px;
`;
const TotalTextBetween = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top:10px;
`;
const SubtotalDetails = styled.View`
flex-direction: column;
justify-content: flex-end;
padding:20px;
`;
const ViewBox = styled.View`
padding-left:25px;
padding-top:5px;
`;
const IconContainer = styled.View`
width:22px;
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
class CheckoutScreenPresenter extends Component {
    onChange(number, type) {
        // 1, + or -
    }
    state = {
        isChecked: false,
    };
    render() {
      let sendAddress = (
      <Row>
      <CartContainer>
        <CheckoutDetail>
          <Row>
          <IconContainer>
            <Ionicons
              name={"ios-pin"}
              color={Colors.blackColor}
              size={24}
            />
          </IconContainer>
          <TotalText> Alamat Pengiriman</TotalText> 
          </Row>
          <ViewBox>
          <Text style={{fontWeight:'bold'}}>Spain Louis Senduk</Text>
          <Text>089698795462</Text>
          <Text>Jalan Cemara, Tambun - Bekasi</Text>
          <Text>Jawa Barat</Text>
          </ViewBox>
        </CheckoutDetail>  
        <View style={{flexGrow: 1, justifyContent:'center', alignItems: 'center'}}>
          <Ionicons
            name={"ios-arrow-forward"}
            color={Colors.blackColor}
            size={26}
          />
        </View>
      </CartContainer> 
    </Row> 
    );
    
    let paymentMethod = (
      <Row>
      <CartContainer>
        <CheckoutDetail>
          <Row>
          <IconContainer>
            <Ionicons
              name={"ios-cash"}
              color={Colors.blackColor}
              size={20}
            />
          </IconContainer>
          <TotalText> Metode Pembayaran</TotalText> 
          </Row>
          <ViewBox>
          <Text>BCA Virtual Account</Text>
          </ViewBox>
        </CheckoutDetail>  
        <View style={{flexGrow: 1, justifyContent:'center', alignItems: 'center'}}>
          <Ionicons
            name={"ios-arrow-forward"}
            color={Colors.blackColor}
            size={26}
          />
        </View>
      </CartContainer> 
    </Row> 
    );
      let addedItems = this.props.cartItems.length > 0 ?
      (
      this.props.cartItems.map((data) => {
          return(
            <Row key={'mykey' + data.id}>
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
                    <Text>Qty: { data.quantity }</Text>
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
          {sendAddress}
          {paymentMethod}
          {addedItems}
          </ScrollView>
          <CheckoutContainer>
            <SubtotalDetails>
            <TextBetween>
              <Text>SubTotal untuk Produk:</Text> 
              <Text>{formatRupiah(this.props.total+"","")}</Text>
            </TextBetween>
            <TextBetween>
              <Text>SubTotal untuk Pengiriman:</Text> 
              <Text>{formatRupiah(90000+"","")}</Text>
            </TextBetween>
            <TotalTextBetween>
              <TotalText>Total Pembayaran:</TotalText> 
              <TotalText><DiscountedPrice>{formatRupiah(this.props.total+90000+"","")}</DiscountedPrice></TotalText>
            </TotalTextBetween>
            </SubtotalDetails>
            <ATCbtn>
                <BtnText>Buat Pesanan</BtnText>
            </ATCbtn>
          </CheckoutContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreenPresenter);