export const fetcher = async (url: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Erreur API");
  const data = await res.json();
  console.log("Fetched data:", data);
  // const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
  return data;
};
