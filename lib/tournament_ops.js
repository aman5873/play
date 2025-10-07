import api from "./auth_ops";

export async function getCategories() {
  try {
    const response = await api.get(`/api/v1/app/tournament-categories`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function getStatuses() {
  try {
    const response = await api.get(`/api/v1/app/tournament-statuses`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function addTournament(data) {
  try {
    const response = await api.post(`/api/v1/app/tournaments`, data);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function updateTournament(id, data) {
  try {
    const response = await api.post(`/api/v1/app/tournaments/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function deleteTournament(id) {
  try {
    const response = await api.delete(`/api/v1/app/tournaments/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function getTournaments(params) {
  try {
    let url = "/api/v1/app/tournaments";

    // If params is a string or number, treat it as the tournament ID
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

export async function getFeaturedTournaments() {
  try {
    const response = await api.get(
      `/api/v1/app/tournaments?is_featured=1&all=1`
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
