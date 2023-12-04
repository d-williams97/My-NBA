import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import numeral from "numeral";

import getPlayerStats from "./getPlayerStats";
import getWikiPlayerData from "./playerWikiCard/getWikiPlayerData";

import PlayerForm from "./playerForm/PlayerForm";
import PlayerStats from "./playerStats/PlayerStats";
const Player = () => {
  const [player, setPlayer] = useState("");
  const [hideStats, setHideStats] = useState(false);

  const playerHandler = (player) => {
    setPlayer(player);
  };

  const playerStatsResults = useQuery({
    queryKey: ["getPlayerStats", player],
    queryFn: getPlayerStats,
    enabled: Boolean(player),
  });

  const playerWikiResults = useQuery({
    queryKey: ["getWikiPlayer", player],
    queryFn: getWikiPlayerData,
    enabled: Boolean(player),
  });

  if (playerStatsResults.isSuccess) console.log(player);
  if (playerWikiResults.isSuccess) console.log(playerWikiResults);

  return (
    <div>
      <PlayerForm playerHandler={playerHandler} setHideStats={setHideStats} />
      {playerStatsResults.data && (
        <PlayerStats
          playerStatsResults={playerStatsResults}
          hideStats={hideStats}
          setHideStats={setHideStats}
        />
      )}
    </div>
  );
};
export default Player;
