import api from "./auth_ops";

export async function getGames(params) {
  try {
    let url = "/api/v1/app/games";

    // If params is a string or number, treat it as the game ID
    if (typeof params === "string" || typeof params === "number") {
      url += `/${params}`;
    } else if (typeof params === "object" && params !== null) {
      const queryString = new URLSearchParams(params).toString();
      if (queryString) url += `?${queryString}`;
    }

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function getGameGenres() {
  try {
    const response = await api.get(`/api/v1/app/genres`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function getGameStatuses() {
  try {
    const response = await api.get(`/api/v1/app/statuses`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function getPlatforms() {
  try {
    const response = await api.get(`/api/v1/app/platforms`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function getNetworks() {
  try {
    const response = await api.get(`/api/v1/app/networks`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
