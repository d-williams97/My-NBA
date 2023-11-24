import { useState } from "react";
import PlayerForm from "./playerForm/PlayerForm";
const Player = () => {
  const [player, setPlayer] = useState("");

  const playerHandler = (player) => {
    setPlayer(player);
  };

  console.log(player);

  return (
    <div>
      <PlayerForm playerHandler={playerHandler} />
    </div>
  );
};
export default Player;
