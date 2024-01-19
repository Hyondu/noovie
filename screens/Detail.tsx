import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Dimensions, Platform, Share, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import { moviesAPI, tvAPI } from "../fetchers";
import { Loader } from "../components/Loader";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { StacksParamList } from "../navigation/Stacks";
import { RootParamList } from "../navigation/Root";

type TVideo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type TDetail = {
  id: number;
  original_title?: string;
  original_name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
};

type DetailScreenProps = NativeStackScreenProps<StacksParamList, "Detail">;

export type DetailScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<StacksParamList, "Detail">,
  NativeStackNavigationProp<RootParamList>
>;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding-left: 10px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Title = styled.Text`
  color: white;
  font-size: 36px;
  font-weight: 500;
  margin-left: 10px;
  align-self: flex-end;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0;
  padding-horizontal: 10px;
`;
const YTLinks = styled.View`
  padding: 0 20px;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  margin-left: 10px;
  font-weight: 600;
  line-height: 24px;
`;

const Detail = ({ route: { params } }: DetailScreenProps) => {
  // setup
  const nav = useNavigation();
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movie" : "tv", params.id],
    isMovie ? moviesAPI.detail : tvAPI.detail
  );

  // local functions and components
  const openYTLink = async (videoKey: string) => {
    const baseURL = `https://m.youtube.com/watch?v=${videoKey}`;
    // await Linking.openURL(baseURL);
    await WebBrowser.openBrowserAsync(baseURL);
  };

  const onShare = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie ? `https://www.imdb.com/title/${data.imdb_id}/` : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\n Check this out: ${homepage}`,
        title: isMovie ? data.original_title : data.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        message: isMovie ? data.original_title : data.original_name,
      });
    }
  };

  const ShareBtn = () => (
    <TouchableOpacity onPress={onShare}>
      <Ionicons name="share-outline" size={24} color="white" />
    </TouchableOpacity>
  );

  // on load - useEffect hook
  useEffect(() => {
    nav.setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, [nav]);
  useEffect(() => {
    if (data) {
      nav.setOptions({
        headerRight: () => <ShareBtn />,
      });
    }
  }, [data]);

  return (
    <Container>
      <Header>
        <Background
          source={{ uri: makeImgPath(params.backdrop_path) || "" }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient colors={["transparent", BLACK_COLOR]} style={StyleSheet.absoluteFill} />
        <Column>
          <Poster path={params.poster_path} />
          <Title>{"original_title" in params ? params.original_title : params.original_name}</Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
      {isLoading ? <Loader /> : null}
      {data?.videos?.results?.map((video: TVideo) =>
        video.site === "YouTube" ? (
          <YTLinks key={video.id}>
            <VideoBtn onPress={() => openYTLink(video.key)}>
              <Ionicons name="logo-youtube" size={24} color="white" />
              <BtnText>{video.name}</BtnText>
            </VideoBtn>
          </YTLinks>
        ) : null
      )}
    </Container>
  );
};

export default Detail;
