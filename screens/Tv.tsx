import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvAPI } from "../fetchers";
import { Loader } from "../components/Loader";
import styled from "styled-components/native";
import { HList } from "../components/HList";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
`;

const Tv = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvAPI.trending
  );
  const { isLoading: topratedLoading, data: topratedData } = useQuery(
    ["tv", "toprated"],
    tvAPI.topRated
  );
  const { isLoading: airingLoading, data: airingData } = useQuery(
    ["tv", "airing"],
    tvAPI.airingToday
  );
  const loading = trendingLoading || topratedLoading || airingLoading;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ marginVertical: 30 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <HList title="Trending TV" data={trendingData.results} />
        <HList title="Airing Today" data={airingData.results} />
        <HList title="Top Rated" data={topratedData.results} />
      </ScrollView>
    </Container>
  );
};

export default Tv;
