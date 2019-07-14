import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./Avatar";
import Colors from "../constants/Colors";
import SmallButton from "./SmallButton";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import StarRating from 'react-native-star-rating';

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
  margin-left: 0px;
`;

const Name = styled.Text`
  font-size: 16px;
  margin-bottom:5px;
`;
const Title = styled.Text`
  font-weight: 500;
  font-size: 16px;
  margin-bottom:5px;
  margin-top:5px;
`;
const Desc = styled.Text`
  font-size: 16px;
  margin-bottom:5px;
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
const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: rgba(151, 151, 151, 0.1);
  margin-bottom: 25px;
`;
const StarContainer = styled.View`
  width:50%;
`;
const UserReview = ({ rating, name, title, desc }) => (
  <Container>
    <Column>
      <DataContainer>
        <Name>{name}</Name>
        <StarContainer>
        <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            emptyStarColor="orange"
            fullStarColor="orange"
            starSize={20}
        />
        </StarContainer>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
      </DataContainer>
    </Column>
  </Container>
);

UserReview.propTypes = {
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default UserReview;
