import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./Avatar";
import Colors from "../constants/Colors";
import SmallButton from "./SmallButton";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom:10px;
`;

const DataContainer = styled.View`
  margin-left: 10px;
`;

const Name = styled.Text`
  font-weight: 500;
  font-size: 16px;
`;

const Rating = styled.Text`
  color: ${Colors.greyColor};
`;

const FirstButtonContainer = styled.View`
  margin-right: 2.5%;
`;

const Text = styled.Text`
  margin-left:5px;
`;

const IconContainer = styled.View`
  height: 22px;
  width: 26px;
`;
const UserPartials = ({ avatarUrl, rating, name }) => (
  <Container>
    <Column>
      <Avatar source={avatarUrl} />
      <DataContainer>
        <Name>{name}</Name>
        <Rating>{`⭑ ${rating}`}</Rating>
      </DataContainer>
    </Column>
    <Column>
      <IconContainer>
        <Ionicons
        name={Platform.OS === "ios" ? "ios-pin" : "md-pin"}
        size={Platform.OS === "ios" ? 20 : 20}
      /></IconContainer>
      <Text>Bekasi Timur</Text>
    </Column>
    <Column>
      <IconContainer>
        <Ionicons
        name={Platform.OS === "ios" ? "ios-timer" : "md-timer"}
        size={Platform.OS === "ios" ? 20 : 20}
      /></IconContainer>
      <Text>
      Waktu pengantaran 1-3 hari</Text>
    </Column>
  </Container>
);

UserPartials.propTypes = {
  avatarUrl: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default UserPartials;
