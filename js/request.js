/**
 * request.js
 *
 * I need to implement this js file just to dynamically load new inputs
 */

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-video-url");
  const container = document.getElementById("video-urls-container");

  addButton.addEventListener("click", function () {
    const newURL = document.createElement("input");
    newURL.type = "url";
    newURL.name = "video_urls";
    newURL.required = true;
    container.appendChild(newURL); // Appends to the container I made
  });
});
