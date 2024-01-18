import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-top: 20px;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
}

export const HList = ({ title, data }: HListProps) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      horizontal
      ItemSeparatorComponent={HSeparator}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      data={data}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title ?? item.original_name}
          voteAverage={item.vote_average}
          fullData={item}
        />
      )}
    />
  </ListContainer>
);
