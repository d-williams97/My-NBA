async function getWikiPlayerData({ queryKey }) {
  console.log(queryKey);
  const firstName = queryKey[1]["player"]["firstname"];
  const lastName = queryKey[1]["player"]["lastname"];
  const API_BASE = "http://localhost:3001";
  const res = await fetch(`${API_BASE}/get-wiki-player`, {
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
    throw new Error(
      `There was an error could not get wiki data for ${firstName} ${lastName} `
    );
  }

  console.log(res);

  return res.json();
}

export default getWikiPlayerData;
