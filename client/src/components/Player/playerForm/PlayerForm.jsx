import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getTeams from "./getTeams";
import getPlayers from "./getPlayers";

const seasons = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

const PlayerForm = (props) => {
  const [team, setTeam] = useState("");
  const [year, setYear] = useState("");

  // -- useQuery to fetch player data
  const results = useQuery({
    queryKey: ["getTeams"],
    queryFn: getTeams,
  }); //if data is stale or no data is found in catch searchPlayer runs. player is fetch dependancy

  const playerResults = useQuery({
    queryKey: ["getPlayers", team],
    queryFn: getPlayers,
  });
  // Boolean team means it will only execute with a truthy value
  //returns true if team is a truthy value.

  const nbaTeams = results?.data ?? null; // nullish coalescing operator
  const nbaPlayers = playerResults?.data?.response ?? null;

  // Loading whilst getting team data
  if (results.isLoading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let formData = new FormData(e.target);
          let playerId = formData.get("players");
          let playerData = nbaPlayers.filter((player) => player.id == playerId);
          let season = formData.get("season");
          props.playerHandler({ player: playerData[0], season });
          props.setHideStats(true);
        }}
      >
        <label htmlFor="teams">
          Team
          <select
            name="teams"
            id="teams"
            onChange={(e) => {
              setTeam(e.target.value);
            }}
          >
            {nbaTeams.map((team) => (
              <option value={team.id} key={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="lastName">
          Player
          <select name="players" id="players">
            {nbaPlayers ? (
              nbaPlayers.map((playerOption) => (
                <option value={playerOption.id} key={playerOption.id}>
                  {`${playerOption.firstname} ${playerOption.lastname}`}
                </option>
              ))
            ) : (
              <option>Loading</option>
            )}
          </select>
        </label>
        <label htmlFor="season">
          Season
          <select
            name="season"
            id="season"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PlayerForm;
