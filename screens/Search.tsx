import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesAPI, tvAPI } from "../fetchers";
import { Loader } from "../components/Loader";
import { HList } from "../components/HList";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Searchbar = styled.TextInput`
  background-color: white;
  width: 90%;
  padding: 10px 15px;
  margin: 10px auto;
  border-radius: 15px;
  margin-bottom: 30px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovie", query], moviesAPI.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvAPI.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <Searchbar
        placeholder="Search for Movies and TV Shows..."
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? <HList title="Movie Results" data={moviesData.results} /> : null}
      {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;
