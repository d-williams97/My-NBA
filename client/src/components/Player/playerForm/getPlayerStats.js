async function getPlayerStats({ queryKey }) {
  const firstName = queryKey[1]["firstname"];
  const lastName = queryKey[1]["lastname"];
  const API_BASE = "http://localhost:3001";
  const res = await fetch(`${API_BASE}/get-player-stats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
    }),
  });

  if (!res.ok) {
    throw new Error("There was an error could not fetch player stats");
  }

  return res.json();
}

export default getPlayerStats;
