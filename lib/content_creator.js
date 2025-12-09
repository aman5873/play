import api, { BASE_URL } from "./auth_ops";

export async function extractThumbnailFromVideo(videoUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("loadeddata", () => {
      video.currentTime = 1; //  capture 1s into video
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
      resolve(imageUrl);
    });

    video.addEventListener("error", reject);
  });
}

export async function extractThumbnailFromVideoClient(videoUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = videoUrl;
    video.load();
    video.currentTime = 1; // 1s mark

    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context not found");

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      resolve(imageData);
    });

    video.onerror = (e) => reject("Error loading video");
  });
}

export async function getPost(params) {
  try {
    let url = "/api/v1/app/content-items";

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
export async function getSelfPost(params) {
  try {
    let url = "/api/v1/app/content-items/me/list";

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
export async function getUserPost({ id, params }) {
  try {
    let url = `/api/v1/app/content-items/${id}/items`;

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

// 🔓 Public endpoint — no auth header needed
export async function getPostById(postId, userId = null) {
  try {
    // Build URL safely (works for both SSR + Client)
    const url = userId
      ? `${BASE_URL}/api/v1/app/content-items/${postId}?user_id=${userId}`
      : `${BASE_URL}/api/v1/app/content-items/${postId}`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // ✅ Enables caching + deduplication (Next.js)
    });

    if (!res.ok) throw new Error("Failed to fetch post");
    return await res.json();
  } catch (error) {
    console.error("❌ getPostById failed:", error);
    return null;
  }
}

export async function createPost(data) {
  try {
    const response = await api.post(`api/v1/app/social-hub/content`, data);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function updatePost({ id, data }) {
  try {
    const response = await api.patch(`api/v1/app/content-items/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function deletePost(id) {
  try {
    const response = await api.delete(`api/v1/app/content-items/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function fetchUserProfile(id) {
  try {
    const response = await api.get(`/api/v1/app/fetch-profile?user_id=${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function fetchSSRUserProfile(userId) {
  try {
    const url = `${BASE_URL}/api/v1/app/fetch-profile?user_id=${userId}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // ✅ Enables caching + deduplication (Next.js)
    });
    if (!res.ok) throw new Error("Failed to fetch post");
    return await res.json();
  } catch (error) {
    return error.response?.data;
  }
}

export async function toggleLikePost(id) {
  try {
    const response = await api.post(
      `api/v1/app/content-items/${id}/like-toggle`
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function getComments(postId) {
  try {
    const response = await api.get(`api/v1/app/content/comments/${postId}`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function createComment(data) {
  try {
    const response = await api.post(`api/v1/app/content/comments`, data);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function deleteComment(commentId) {
  try {
    const response = await api.delete(
      `api/v1/app/content/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function toggleLikeComment(id) {
  try {
    const response = await api.post(`api/v1/app/content/comments/${id}/like`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function toggleFollowAccount(userId) {
  try {
    const response = await api.post(`api/v1/app/creator/${userId}/follow`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function getFollowList(params, type) {
  try {
    let url = `/api/v1/app/creator/${type}`;

    // If  params is a string or number, treat it as the  ID
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

export async function toggleLiveStream(data) {
  try {
    const response = await api.post(`api/v1/app/creator/toggle-live`, data);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
//
export async function getStreamList(params) {
  try {
    let url = `api/v1/app/content-items/live/streams`;

    // If params is a string or number → treat as ID
    if (typeof params === "string" || typeof params === "number") {
      url += `/${params}`;
    }

    // If params is an object → add query string
    else if (typeof params === "object" && params !== null) {
      const queryString = new URLSearchParams(params).toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function getStreamById(user_id, authUserId) {
  try {
    // Build URL safely (works for both SSR + Client)
    const url = `${BASE_URL}/api/v1/app/content-items/live/streams?user_id=${user_id}&auth_user_id=${authUserId}`;
    const response = await fetch(
      url,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      } // ✅ Enables caching + deduplication (Next.js)
    );
    if (!response.ok) throw new Error("Failed to fetch stream");
    return await response.json();
  } catch (error) {
    console.error("❌ getStreamById failed:", error);
    return null;
  }
}

export async function postLiveMessage({ streamId, message }) {
  try {
    const response = await api.post(
      `api/v1/app/content-items/streams/${streamId}/comments`,
      { message }
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function postLiveReaction({ streamId, reaction_type }) {
  try {
    const response = await api.post(
      `api/v1/app/content-items/streams/${streamId}/reactions`,
      { reaction_type }
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function createStreamPoll({ streamId, data }) {
  try {
    const response = await api.post(
      `api/v1/app/content-items/streams/${streamId}/polls`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
export async function submitPollResponse({ streamId, poll_id, option_id }) {
  try {
    const response = await api.post(
      `api/v1/app/content-items/streams/${streamId}/polls/${poll_id}/vote`,
      { option_id }
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function connectTwitch() {
  try {
    const response = await api.post(`/api/v1/app/social/connect-twitch`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}

export async function getUserVotes(id) {
  try {
    let url = `/api/v1/app/content-items/streams/${id}/poll`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
}
