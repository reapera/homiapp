import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";

const Container = styled.View`
  margin-bottom: 20px;
`;

const ImageContainer = styled.View`
  box-shadow: 0px 10px 15px rgba(60, 60, 60, 0.4);
  width: ${Layout.window.width / 2 - 30};
  border-radius: 15px;
  elevation: 4;
  margin-bottom: 15px;
`;

const Name = styled.Text`
  color: ${Colors.lightBlackColor};
  margin-left: 10px;
  width: ${Layout.window.width / 2 - 50};
  margin-bottom: 2px;
  font-size:14;
`;
const PriceContainer = styled.View`
flex-direction:column;
`;
const Price = styled.Text`
  font-weight: 600;
  margin-left: 10px;
  color:${Colors.blackColor};
`;

const ActualPriceContainer = styled.View`
flex-direction:column;
justify-content:flex-end;
`;
const ActualPrice = styled.Text `
font-size:8;
color:${Colors.greyColor};
margin-left: 10px;
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

const ProductCard = ({ imgSrc, name, price,display_price, id, navigation }) => (
  <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", {
    itemId: id,
  })}>
    <Container>
      <ImageContainer>
        <AutoHeightImage
          width={Layout.window.width / 2 - 30}
          source={{ uri: imgSrc }}
          style={{
            borderRadius: 15
          }}
        />
      </ImageContainer>
      <Name>{name}</Name>
      <PriceContainer>
      <Price>{`${formatRupiah(price,"")}`}</Price>
      <ActualPriceContainer>
      <ActualPrice style = {    { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } }> {formatRupiah(display_price+"","")} </ActualPrice> 
      </ActualPriceContainer>
      </PriceContainer>
    </Container>
  </TouchableWithoutFeedback>
);

ProductCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default withNavigation(ProductCard);
