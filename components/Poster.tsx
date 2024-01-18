import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const ImgPost = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => <ImgPost source={{ uri: makeImgPath(path) }} />;

export default Poster;