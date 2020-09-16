const { API } = require("../../backend");

export const createAStory = (userId, token, storyData) => {
  return fetch(`${API}/stories/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(storyData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSingleStory = (storyId) => {
  return fetch(`${API}/story/${storyId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getPublicStories = () => {
  return fetch(`${API}/stories/public`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateStory = (userId, token, storyId, story) => {
  return fetch(`${API}/story/update/${storyId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(story),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteStory = (userId, token, storyId) => {
  return fetch(`${API}/story/delete/${storyId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
