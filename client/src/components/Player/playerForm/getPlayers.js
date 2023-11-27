async function getPlayers({ queryKey }) {
  let teamId;
  queryKey[1] === "" ? (teamId = 1) : (teamId = queryKey[1]);
  const API_BASE = "http://localhost:3001";

  const res = await fetch(`${API_BASE}/get-players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamId,
    }),
  });

  if (!res.ok) {
    throw new Error("There was an error could not fetch players");
  }

  return res.json();
}

export default getPlayers;
