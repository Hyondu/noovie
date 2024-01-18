import React from "react";
import styled from "styled-components/native";

interface VotesProps {
  votes: number;
}

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const Votes = (props: VotesProps) => (
  <Text>{props.votes > 0 ? `⭐️ ${props.votes.toFixed(1)}/10` : `Coming soon`}</Text>
);
export default Votes;
