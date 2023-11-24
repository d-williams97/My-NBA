async function getTeams({ queryKey }) {
  //   const { firstName, lastName } = queryKey[1];
  //   console.log(firstName, lastName);
  const API_BASE = "http://localhost:3001";
  const res = await fetch(`${API_BASE}/get-teams`);

  if (!res.ok) {
    throw new Error("Fetching teams not okay");
  }

  return res.json();
}

export default getTeams;
