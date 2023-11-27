import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import getPlayerStats from "./playerForm/getPlayerStats";

import PlayerForm from "./playerForm/PlayerForm";
const Player = () => {
  const [player, setPlayer] = useState("");
  const [moreStats, setMoreStats] = useState(false);
  const [hideStats, setHideStats] = useState(false);

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
      <PlayerForm playerHandler={playerHandler} setHideStats={setHideStats} />
      {hideStats && seasonAverages && (
        <table>
          <tbody>
            <tr>
              <td>Minutes</td>
              <td>{seasonAverages.min}</td>
            </tr>
            <tr>
              <td>Points</td>
              <td>{seasonAverages.pts}</td>
            </tr>
            <tr>
              <td>Rebounds</td>
              <td>{seasonAverages.reb}</td>
            </tr>
            <tr>
              <td>Assists</td>
              <td>{seasonAverages.ast}</td>
            </tr>
            <tr>
              <td>Field Goal %</td>
              <td>{seasonAverages.fg_pct * 100}</td>
            </tr>
            {moreStats && (
              <>
                <tr>
                  <td>Steals</td>
                  <td>{seasonAverages.stl}</td>
                </tr>
                <tr>
                  <td>Blocks</td>
                  <td>{seasonAverages.blk}</td>
                </tr>
                <tr>
                  <td>Turnovers</td>
                  <td>{seasonAverages.turnover}</td>
                </tr>
                <tr>
                  <td>Field Goal Attempts</td>
                  <td>{seasonAverages.fga}</td>
                </tr>
                <tr>
                  <td>3 Point %</td>
                  <td>{seasonAverages.fg3_pct * 100}</td>
                </tr>
                <tr>
                  <td>3 Point Attempts</td>
                  <td>{seasonAverages.fg3a}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      )}
      {hideStats && seasonAverages && (
        <button
          onClick={() => {
            setMoreStats(true);
          }}
        >
          More Stats
        </button>
      )}
      {moreStats && (
        <button
          onClick={() => {
            setMoreStats(false);
          }}
        >
          Close
        </button>
      )}
    </div>
  );
};
export default Player;
