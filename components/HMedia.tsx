import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { TMovie } from "../screens/Movies";
import { DetailScreenNavigationProp } from "../screens/Detail";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
  font-weight: 500;
  opacity: 0.6;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
  fullData: TMovie;
}

const HMedia = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
  fullData,
}: HMediaProps) => {
  const nav = useNavigation<DetailScreenNavigationProp>();
  const goToDetail = () => nav.navigate("Stacks", { screen: "Detail", params: { ...fullData } });
  return (
    <Pressable onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>
            {originalTitle.length > 30 ? `${originalTitle.slice(0, 30)}...` : originalTitle}
          </Title>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <Overview>
            {overview !== "" && overview.length > 140 ? `${overview.slice(0, 140)}...` : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </Pressable>
  );
};

export default HMedia;
