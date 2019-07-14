import React, { Component }  from "react";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import {Modal, Text, TouchableHighlight, View, Alert, Image} from 'react-native';
import Colors from "../constants/Colors";
import Counter from "react-native-counters";

const Container = styled.View`
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
flex:1;
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
const CartBtn = styled.TouchableOpacity`
background-color:lightgray;
color:black;
border-radius:16px;
height:40px;
width:40px;
padding:10px;
margin-right:10px;
`;

const ModalContent = styled.View`
position:absolute;
bottom:0px;
height:auto;
background:white;
opacity:1;
padding:10px;
width:100%;
flex-direction: column;
`;
const ModalBackground = styled.View`
background:black;
opacity:0.3;
width:100%;
height:100%;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Quantity = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom:20px;
`;

const NamePrice = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  width:100%;
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
class ATC extends Component {
    state = {
        modalVisible: false,
      };
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
      onChange(number, type) {
        // 1, + or -
      }
      
      render() {
        return (
            <Container>
                <CartBtn onPress={() => { this.props.navigation.navigate("Cart") }}>
                <Ionicons name="ios-cart" size={20} color="#000"/>
            </CartBtn>
            <ATCbtn onPress={() => {
            this.setModalVisible(true);
          }}>
                <BtnText>{this.props.name}</BtnText>
            </ATCbtn>
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
                <ModalBackground></ModalBackground>
                <ModalContent>
                    <NamePrice>
                        <ModalHeader>
                            <Image
                            source={{
                                uri:
                                "https://i.pinimg.com/564x/8f/27/44/8f27446e4f69541cb465e50b93dae15e.jpg"
                            }}
                            resizeMode="cover"
                            style={{width: 64, height: 64, borderRadius:10, marginRight:10}}
                            />
                        <View>
                            <NamePriceText>MVMTH Watch</NamePriceText>
                            <NamePriceText>Rp 49</NamePriceText>
                        </View>
                        </ModalHeader>
                    <TouchableHighlight
                        onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text><Ionicons name="ios-close" size={40} color="orange"/></Text>
                    </TouchableHighlight>
                    </NamePrice>
                    <Divider/>
                    <Quantity>
                    <Text>Jumlah</Text>
                    <Counter start={1} onChange={this.onChange.bind(this)} max={100} touchableColor="gray" touchableDisabledColor="lightgray"/>
                    </Quantity>
                    <ATCbtn onPress={() => { this.props.navigation.navigate("Cart") }}>
                        <BtnText>Masukan ke Keranjang</BtnText>
                    </ATCbtn>
                </ModalContent>
            </Modal>
            </Container>
        );
      }
}

ATC.propTypes = {
    name: PropTypes.string.isRequired,
};

export default withNavigation(ATC);