import api from "./auth_ops";

export async function getQuests(params) {
  try {
    let url = "/api/v1/app/quests";

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
export async function getQuestSummary(params) {
  try {
    let url = "/api/v1/app/quests/summary";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function claimStreakQuest(id) {
  try {
    let url = `/api/v1/app/quests/claim-streak/${id}`;
    const response = await api.post(url);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function claimQuest({ id, data }) {
  try {
    const response = await api.post(`/api/v1/app/quests/${id}/claim`, data);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function finalClaimQuest({ completion_id }) {
  try {
    const response = await api.post(
      `/api/v1/app/quest-completions/${completion_id}/final-claim`
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
