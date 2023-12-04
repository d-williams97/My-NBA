import numeral from "numeral";
import { useState } from "react";

const PlayerStats = ({ playerStatsResults, hideStats, setHideStats }) => {
  const [moreStats, setMoreStats] = useState(false);
  return (
    <>
      {
        <table>
          <tbody>
            <tr>
              <td>Minutes</td>
              <td>{playerStatsResults.data.min ?? 0}</td>
            </tr>
            <tr>
              <td>Points</td>
              <td>{playerStatsResults.data.pts ?? 0}</td>
            </tr>
            <tr>
              <td>Rebounds</td>
              <td>{playerStatsResults.data.reb ?? 0}</td>
            </tr>
            <tr>
              <td>Assists</td>
              <td>{playerStatsResults.data.ast ?? 0}</td>
            </tr>
            <tr>
              <td>Field Goal %</td>
              <td>
                {playerStatsResults.data.fg_pct
                  ? numeral(playerStatsResults.data.fg_pct * 100).format("0.0")
                  : 0}
              </td>
            </tr>
            {moreStats && (
              <>
                <tr>
                  <td>Steals</td>
                  <td>{playerStatsResults.data.stl ?? 0}</td>
                </tr>
                <tr>
                  <td>Blocks</td>
                  <td>{playerStatsResults.data.blk ?? 0}</td>
                </tr>
                <tr>
                  <td>Turnovers</td>
                  <td>{playerStatsResults.data.turnover ?? 0}</td>
                </tr>
                <tr>
                  <td>Field Goal Attempts</td>
                  <td>{playerStatsResults.data.fga ?? 0}</td>
                </tr>
                <tr>
                  <td>3 Point %</td>
                  <td>
                    {playerStatsResults.data.fg3_pct
                      ? numeral(playerStatsResults.data.fg3_pct * 100).format(
                          "0.0"
                        )
                      : 0}
                  </td>
                </tr>
                <tr>
                  <td>3 Point Attempts</td>
                  <td>{playerStatsResults.data.fg3a ?? 0}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      }

      {hideStats && playerStatsResults.data && (
        <button
          onClick={() => {
            setMoreStats(true);
            setHideStats(false);
          }}
        >
          More Stats
        </button>
      )}
      {moreStats && (
        <button
          onClick={() => {
            setMoreStats(false);
            setHideStats(true);
          }}
        >
          Close
        </button>
      )}
    </>
  );
};

export default PlayerStats;
