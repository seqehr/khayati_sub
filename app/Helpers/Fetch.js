import React from "react";

const Fetch = async ({ url, method, body, token } = {}) => {
  const baseUrl = "https://lezatkhayati.com/api/";
  var newHeaders = {
    authorization: `Bearer ${token}`,
  };

  return fetch(`${baseUrl}${url}`, {
    method: method ?? "get",
    body: JSON.stringify(body),
    headers: token
      ? newHeaders
      : {
          "Content-Type": "application/json",
        },
  });
};

export default Fetch;
