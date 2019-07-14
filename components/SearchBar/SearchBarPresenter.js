import React from "react";
import { Platform, Image, StyleSheet, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Colors from "../../constants/Colors";

const Container = styled.View`
  flex: 1;
  padding-horizontal: 0px;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color:white;
  min-height:100px;
`;

const Input = styled.TextInput`
  background-color: ${Platform.OS === "ios" ? Colors.darkGreyColor :  Colors.darkGreyColor};
  border-radius: 100px;
  padding-horizontal: 10px;
  width: ${Platform.OS === "ios" ? "90%" : "91%"};
  height: ${Platform.OS === "ios" ? "40px" : "auto"};
`;
const styles = StyleSheet.create({
  image: {
      alignSelf: 'stretch',
      width: 119,
      height: 41,
      marginTop:20,
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  search:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:Colors.darkGreyColor,
    borderRadius:20,
    margin:10,
    marginTop:0,
    marginBottom:10,
    padding:10,
    minHeight:35
  },
});
const SearchBarPresenter = ({ onSubmit, value, updateValue, clearValue }) => (
  <Container>
    <View style={styles.center}>
    <Image
      style={styles.image}
      resizeMode={'contain'}
      source={require("../../assets/images/black.png")}
    />
    </View>
    <View style={styles.search}>
    <Ionicons name="ios-search" size={20} color="#000"/>
    <Input
      value={value}
      onChangeText={updateValue}
      onSubmitEditing={onSubmit}
      placeholder="Cari bahan bangunan"
      blurOnSubmit
      returnKeyType="search"
      underlineColorAndroid="white"
    />
    </View>
  </Container>
);

SearchBarPresenter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  clearValue: PropTypes.func.isRequired
};

export default SearchBarPresenter;
