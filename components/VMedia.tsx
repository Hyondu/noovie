import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const VMovie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Object;
}

const VMedia: React.FC<VMediaProps> = ({ posterPath, originalTitle, voteAverage, fullData }) => {
  const nav = useNavigation();
  const goToDetail = () => nav.navigate("Stacks", { screen: "Detail", params: { ...fullData } });
  return (
    <Pressable onPress={goToDetail}>
      <VMovie>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 13)}
          {originalTitle.length > 13 ? "..." : null}
        </Title>
        <Votes votes={voteAverage} />
      </VMovie>
    </Pressable>
  );
};

export default VMedia;
