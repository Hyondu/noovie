import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import Swiper from "react-native-swiper";
import { moviesAPI } from "../fetchers";
import { Loader } from "../components/Loader";
import Slide from "../components/Slide";
import { HList } from "../components/HList";
import HMedia from "../components/HMedia";

type TMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const HSeperator = styled.View`
  height: 20px;
`;

const Movies = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movie", "nowPlaying"],
    moviesAPI.nowPlaying
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movie", "trending"],
    moviesAPI.trending
  );
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage: upcomingHasNextPage,
    fetchNextPage: upcomingFetchNextPage,
  } = useInfiniteQuery(["movie", "upcoming"], moviesAPI.upcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const loadMore = () => {
    if (upcomingHasNextPage) {
      upcomingFetchNextPage();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.refetchQueries({ queryKey: ["movie"] });
    setRefreshing(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <FlatList
        data={upcomingData?.pages.flatMap((page) => page.results) ?? []}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <HMedia
            key={item.id}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData={item}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={1}
        ItemSeparatorComponent={HSeperator}
        ListHeaderComponent={
          <>
            <Swiper
              horizontal
              loop
              autoplay
              autoplayTimeout={3}
              showsButtons={false}
              showsPagination={false}
              containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
            >
              {nowPlayingData?.results.map((movie: TMovie) => {
                return (
                  <Slide
                    key={movie.id}
                    backdropPath={movie.backdrop_path}
                    posterPath={movie.poster_path}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview}
                    fullData={movie}
                  />
                );
              })}
            </Swiper>
            {trendingData ? <HList title="Trending" data={trendingData.results} /> : null}
            <ListTitle>Upcoming</ListTitle>
          </>
        }
      />
    </Container>
  );
};

export default Movies;
