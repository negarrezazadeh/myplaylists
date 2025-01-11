import http from "@/utils/http";

export const getArtists = async () => {
  const response = await http.get("/api/artists");
  return response.data;
};


export const getArtistSongs = async (artistName) => {
  if(!artistName) return;

  const response = await http.get(`/api/artists/${artistName}`);
  return response.data;
};

