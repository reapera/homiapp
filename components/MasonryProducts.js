import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from 'react-native';
import styled from "styled-components";
import ProductCard from "./ProductCard";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import AutoHeightImage from "react-native-auto-height-image";

const Column = styled.View``;

const ScrollView = styled.ScrollView``;

const MasonryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
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
const Space = styled.View `
margin:5px;
`;
const GreyText = styled.Text `
color:${Colors.greyColor}
`;
const splitArray = arr => {
  const { length } = arr;
  const half = length / 2;
  const firstHalf = arr.slice(0, half);
  const secondHalf = arr.slice(half, length);
  return { firstHalf, secondHalf };
};
class MasonryProducts extends Component {
  
  render() {
    let products = this.props.products.length > 0 ?
    (
    <MasonryContainer>
      
    <Column>
        {splitArray(this.props.products).firstHalf.map(product => (
          <ProductCard
            imgSrc={product.images[0].src}
            price={product.price+""}
            display_price={product.price+""}
            name={product.name}
            id={product.id}
            key={product.name}
          />
        ))}
      </Column>
      <Column>
        {splitArray(this.props.products).secondHalf.map(product => (
          <ProductCard
            imgSrc={product.images[0].src}
            price={product.price+""}
            display_price={product.price+""}
            name={product.name}
            id={product.id}
            key={product.name}
          />
        ))}
      </Column>
    </MasonryContainer>
    ):
    (
      <NoData>
        <Centering>
        <AutoHeightImage
          width={Layout.window.width /4}
          source={require("../assets/images/search_not_found.png")}
        />
        </Centering>
        <Space></Space>
        <Centering>
        <GreyText>Maaf, Pencarian tidak ditemukan</GreyText>
        </Centering>
        <Centering>
        <GreyText>Coba cari produk lainnya</GreyText>
        </Centering>
      </NoData>
    )
    return (
      <ScrollView
    contentContainerStyle={{
      paddingHorizontal: 20,
      paddingVertical: 15
    }}
  >
    {this.props.children}
    {products}
  </ScrollView>
    )
  }
}

MasonryProducts.propTypes = {
  products: PropTypes.instanceOf(Array),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default MasonryProducts;
