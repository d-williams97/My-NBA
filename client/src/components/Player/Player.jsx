import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getTeams from "./getTeams";

const Player = () => {
  const [team, setTeam] = useState("");
  const [player, setPlayer] = useState("");

  // -- useQuery to fetch player data
  const results = useQuery({
    queryKey: ["searchPlayer"],
    queryFn: getTeams,
  }); //if data is stale or no data is found in catch searchPlayer runs. player is fetch dependancy

  if (results.isLoading) {
    return <div>loading</div>;
  }

  const nbaTeams = results?.data ?? null;

  return (
    <div>
      <form>
        <label htmlFor="teams">
          Team
          <select
            name="teams"
            id="teams"
            onChange={(e) => {
              setTeam(e.target.value);
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
          <select
            name="players"
            id="players"
            onChange={(e) => {
              setPlayer(e.target.value);
            }}
          >
            <option value="player">player</option>
          </select>
        </label>
      </form>
    </div>
  );
};
export default Player;
