import api from "./auth_ops";

export async function getLeaderboard(params) {
  try {
    let url = "api/v1/app/leaderboard";

    // If params is a string or number, treat it as the  ID
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
