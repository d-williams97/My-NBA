async function getPlayerStats({ queryKey }) {
  const firstName = queryKey[1]["player"]["firstname"];
  const lastName = queryKey[1]["player"]["lastname"];
  const season = queryKey[1]["season"];
  const API_BASE = "http://localhost:3001";
  const res = await fetch(`${API_BASE}/get-player-stats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      season,
    }),
  });

  if (!res.ok) {
    throw new Error("There was an error could not fetch player stats");
  }

  console.log(res);
  return res.json();
}

export default getPlayerStats;
