import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getTeams from "./getTeams";
import getPlayers from "./getPlayers";

const PlayerForm = (props) => {
  const [team, setTeam] = useState("");

  // -- useQuery to fetch player data
  const results = useQuery({
    queryKey: ["getTeams"],
    queryFn: getTeams,
  }); //if data is stale or no data is found in catch searchPlayer runs. player is fetch dependancy

  const playerResults = useQuery({
    queryKey: ["getPlayers", team],
    queryFn: getPlayers,
    enabled: Boolean(team),
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
          props.playerHandler(playerData[0]);
        }}
      >
        <label htmlFor="teams">
          Team
          <select
            name="teams"
            id="teams"
            onChange={(e) => {
              setTeam(e.target.value);
              // if e.target.value  = null execute function from parent component to hide stats.
            }}
          >
            <option></option>
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
              nbaPlayers.map((player) => (
                <option value={player.id} key={player.id}>
                  {`${player.firstname} ${player.lastname}`}
                </option>
              ))
            ) : (
              <option> Select A Team</option>
            )}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PlayerForm;
