import React, {Component} from "react";
import { StatusBar } from "react-native";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import UserPartials from "../../components/UserPartials";
import UserReview from "../../components/UserReview";
import ATC from "../../components/ATC";
import {SERVER_URL} from "../../constant";
import { withNavigation } from "react-navigation";
import { connect } from 'react-redux'
import {WooCommerceAPIs} from "../../WooCommerce/config";

const getHeight = () =>
  Layout.window.height <= 667
    ? Layout.window.height / 2.8
    : Layout.window.height / 2.3;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const Text = styled.Text`
  margin-left: 1px;
`;

const ScrollView = styled.ScrollView``;

const Image = styled.Image`
  width: ${Layout.window.width};
  height: ${getHeight()};
  position: relative;
`;

const DataContainer = styled.View`
  padding-horizontal: 20px;
`;

const TimeLocation = styled.Text`
  color: ${Colors.greyColor};
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const NamePrice = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const NamePriceText = styled.Text`
  font-size: 20px;
  color: ${Colors.blackColor};
  font-weight: 600;
`;

const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: rgba(151, 151, 151, 0.1);
  margin-bottom: 25px;
`;

const Description = styled.Text`
  margin-bottom: 25px;
  color: ${Colors.greyColor};
`;

const ReadMore = styled.Text`
  color: ${Colors.blackColor};
  margin-bottom: 40px;
  text-align:center;
`;

const ReadMoreReview = styled.Text`
  color: red;
  margin-bottom: 40px;
  text-align:center;
`;
const Bold16 = styled.Text`
font-size: 16px;
color: ${Colors.blackColor};
font-weight: 600;
margin-bottom: 25px;
`;
const regex = /(<([^>]+)>)/ig;
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

class ProductScreenPresenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:{image_url:"https://1zmwq81820r61pswmu19upqf-wpengine.netdna-ssl.com/wp-content/uploads/2019/02/dummy.png",name:"",price:"",images:[]},
      reviews:[]
     };
   }
   componentDidMount(){
     
   WooCommerceAPIs.get('products/' + this.props.navigation.getParam("itemId", 0),{
  })
  .then(data => {
    console.log(data);
    data.short_description = data.short_description.replace(regex, '');
    var srtDesc1 = data.short_description.split("Days").pop();
    var srtDesc2 = data.short_description.split("Delivery");
    data.short_description = srtDesc1+" "+srtDesc2[0];
    var indexOfProdFrom = data.description.indexOf('<strong>');
    var indexOfProdTo = data.description.indexOf('</strong>');
    data.product_from = data.description.substr(indexOfProdFrom+8, indexOfProdTo - indexOfProdFrom-8);
    
    var delivTimeFrom = data.description.indexOf('DKI Jakarta: ');
    var delivTimeTo = data.description.indexOf('Days');
    data.delivery_time = data.description.substr(delivTimeFrom+13, delivTimeTo - delivTimeFrom-9);
    data.image_url = data.images[0].src
    this.setState({
      loading: false,
      dataSource: data
      })
  })
  .catch(error => {
    console.log(error);
    });
    WooCommerceAPIs.get('products/reviews',{
      'product':this.props.navigation.getParam("itemId", 0)
    },{})
    .then(data => {
      console.log(data);
      this.setState({
        loading: false,
        reviews: data
        })
    })
    .catch(error => {
      console.log(error);
      });
    // fetch(SERVER_URL+"/product/" + this.props.navigation.getParam("itemId", 0))
    // .then(response => response.json())
    // .then((responseJson)=> {
    //   this.setState({
    //    loading: false,
    //    dataSource: responseJson
    //   });
    //   var joined = this.state.images.concat({"image_url":this.state.dataSource.image_url,"id":-1});
    //   joined = joined.concat(this.state.dataSource.images);
    //   this.setState({ images: joined })
    // })
    // .catch(error=>console.log(error)) //to catch the errors if any
    }
    render() {
      return (
        <Container>
          <StatusBar barStyle="light-content" />
          <ScrollView contentContainerStyle={{ paddingBottom: 40 }} bounces={false}>
            <Swiper
              style={{ height: getHeight(), marginBottom: 20 }}
              activeDotColor="white"
              dotColor="rgba(255, 255, 255, 0.3)"
            >
              {this.state.dataSource.images.map((data) => {
                  return(
                    <Image
                    key={data.id}
                      source={{
                        uri:
                          data.src
                      }}
                    />
                  );
              })}
            </Swiper>
            <DataContainer>
              <TimeLocation>Jakarta, Indonesia • 2h ago</TimeLocation>
              <NamePrice>
                <NamePriceText>{this.state.dataSource.name}</NamePriceText>
                <NamePriceText>{formatRupiah(this.state.dataSource.price+"", "")}</NamePriceText>
              </NamePrice>
              <Divider />
              <Description>
              {this.state.dataSource.short_description}
              </Description>
              <Divider />
              <Bold16>
                Supplier info
              </Bold16>
              <UserPartials
                name={this.state.dataSource.product_from ? this.state.dataSource.product_from :"..."}
                rating={4.6}
                avatarUrl={require("../../assets/images/smAvatar.png")}
                deliveryTime={this.state.dataSource.delivery_time ? this.state.dataSource.delivery_time :"..."}
              />
              <Divider />
              <Bold16>
                Reviews
              </Bold16>
              {this.state.reviews.length > 0 ? 
              (
                this.state.reviews.map((data) => {
                data.review = data.review.replace(regex, '');
                  return(
                    <UserReview
                      key={data.id}
                      name={data.reviewer}
                      rating={data.rating}
                      desc={data.review}
                    />
                  );
              })
              )
              :
              (
                <Text>No Reviews.</Text>
              )
            }
              {/* <ReadMoreReview>See more reviews (81)</ReadMoreReview> */}
            </DataContainer>
          </ScrollView>
          <ATC 
          name="Beli Sekarang"
          product={this.state.dataSource}
          onPress={this.props.addItemToCart}
          />
        </Container>
      );
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product,qty) => dispatch({ type: 'ADD_TO_CART', payload: {"product":product,"qty":qty}})
  }
}
export default connect(null, mapDispatchToProps)(withNavigation(ProductScreenPresenter));
