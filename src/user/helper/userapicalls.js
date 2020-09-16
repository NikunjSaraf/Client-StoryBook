const { API } = require("../../backend");

export const userStories = (userId, token) => {
  return fetch(`${API}/user/stories/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
