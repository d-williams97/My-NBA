import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import getPlayerStats from "./playerForm/getPlayerStats";

import PlayerForm from "./playerForm/PlayerForm";
const Player = () => {
  const [player, setPlayer] = useState("");

  const playerHandler = (player) => {
    setPlayer(player);
  };

  const playerStatsResults = useQuery({
    queryKey: ["getPlayerStats", player],
    queryFn: getPlayerStats,
    enabled: Boolean(player),
  });

  const seasonAverages = playerStatsResults?.data;

  if (playerStatsResults.isSuccess) {
    console.log(seasonAverages);
  }

  return (
    <div>
      <PlayerForm playerHandler={playerHandler} />
      <div>{seasonAverages && seasonAverages.ast}</div>
    </div>
  );
};
export default Player;
