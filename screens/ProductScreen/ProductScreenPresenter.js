import React, {Component} from "react";
import { StatusBar } from "react-native";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import UserPartials from "../../components/UserPartials";
import UserReview from "../../components/UserReview";
import ATC from "../../components/ATC";
import { withNavigation } from "react-navigation";

const getHeight = () =>
  Layout.window.height <= 667
    ? Layout.window.height / 2.8
    : Layout.window.height / 2.3;

const Container = styled.View`
  flex: 1;
  background-color: white;
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
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const NamePriceText = styled.Text`
  font-size: 24px;
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
class ProductScreenPresenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:{image_url:"",name:"",price:"",images:[]}
     };
   }
   componentDidMount(){
    fetch("http://homia.id/api/homia/public/product/" + this.props.navigation.getParam("itemId", 0))
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
          <StatusBar barStyle="light-content" />
          <ScrollView contentContainerStyle={{ paddingBottom: 40 }} bounces={false}>
            <Swiper
              style={{ height: getHeight(), marginBottom: 20 }}
              activeDotColor="white"
              dotColor="rgba(255, 255, 255, 0.3)"
            >
              <Image
                source={{
                  uri:
                    this.state.dataSource.image_url
                }}
              />
              {
                this.state.dataSource.images.map((data) => {
                  console.log(data);
                  if(!data)
                  return null;
                  else
                  return(
                    <Image
                      source={{
                        uri:
                          data.image_url
                      }}
                    />
                  );
                })
              }
            </Swiper>
            <DataContainer>
              <TimeLocation>Seoul, S. Korea • 2h ago</TimeLocation>
              <NamePrice>
                <NamePriceText>{this.state.dataSource.name}</NamePriceText>
                <NamePriceText>Rp {this.state.dataSource.price}</NamePriceText>
              </NamePrice>
              <Divider />
              <Description>
              {this.state.dataSource.desc}
              </Description>
              <ReadMore>Read More</ReadMore>
              <Divider />
              <Bold16>
                Informasi Penjual
              </Bold16>
              <UserPartials
                name="Keith Mills"
                rating={4.6}
                avatarUrl={require("../../assets/images/smAvatar.png")}
              />
              <Divider />
              <Bold16>
                Ulasan Barang
              </Bold16>
              <UserReview
                name="Keith Mills"
                rating={4}
                title="Barangnya Oke!"
                desc="kualitas okeeee"
              />
              <Divider />
              <UserReview
                name="Jono Joni"
                rating={3}
                title="Barangnya Ga Oke!"
                desc="kualitas ga okeeee"
              />
              <ReadMoreReview>Lihat Ulasan Lainnya (81)</ReadMoreReview>
            </DataContainer>
          </ScrollView>
          <ATC 
          name="Beli Sekarang"
          />
        </Container>
      );
    }
}

export default withNavigation(ProductScreenPresenter);
