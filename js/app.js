/**
 * WEB222 – Assignment 05
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Phil Sajdak
 *      Student ID: 162386221
 *      Date:       Nov 21, 2023
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// Call createMenu on page load
document.addEventListener("DOMContentLoaded", createMenu);

/* createMenu: creates a link for each artist and appends it to the navigation menu, also now adds a request artist button */
function createMenu() {
  const menu = document.getElementById("menu");

  artists.forEach((artist) => {
    const button = document.createElement("button");
    button.textContent = artist.name;
    button.href = "#";
    button.addEventListener("click", function () {
      selectArtist(artist);
    });
    menu.appendChild(button);
  });

  selectArtist(artists[0]); // Select the first artist to display

  // Here is where the request artist button is created in the menu
  const requestArtistButton = document.createElement("button");
  requestArtistButton.classList.add("request-artist-button"); // Doing this so it has a different styling than the default buttons
  requestArtistButton.textContent = "Request New Artist";
  requestArtistButton.addEventListener("click", function () {
    window.location.href = "request.html";
  });
  menu.appendChild(requestArtistButton);
}

/* selectArtist: updates the artist header, and calls updateSongsDisplay */
function selectArtist(artist) {
  const selectedArtistHeader = document.getElementById("selected-artist");
  selectedArtistHeader.innerHTML = `
    ${artist.name} (${artist.urls
      .map((url) => `<a href="${url.url}" target="_blank">${url.name}</a>`)
      .join(", ")})
  `;

  updateSongsDisplay(artist.artistId);
}

/* updateSongsDisplay: updates the songs display for the selected artist */
function updateSongsDisplay(artistId) {
  const songsContainer = document.getElementById("songs-container");
  songsContainer.innerHTML = ""; // Clear previous content

  songs
    .filter((song) => song.artistId === artistId && !song.explicit)
    .forEach((song) => {
      songsContainer.appendChild(createSongCard(song));
    });
}

/* formatDuration: returns a duration string in mm:ss format */
function formatDuration(songDuration) {
  const minutes = Math.floor(songDuration / 60);
  const seconds = songDuration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/* createSongCard: returns a card with necessary elements appended inside it */
function createSongCard(song) {
  const card = document.createElement("div");
  const songImg = document.createElement("img");
  const songTitle = document.createElement("h3");
  const songYearContainer = document.createElement("p");
  const yearLabel = document.createElement("b");
  const yearValue = document.createTextNode(song.year);
  const songDurationContainer = document.createElement("p");
  const durationLabel = document.createElement("b");
  const songDuration = document.createTextNode(formatDuration(song.duration));

  card.classList.add("card");
  songImg.classList.add("card-image");

  songTitle.textContent = song.title;
  yearLabel.textContent = "Year: ";
  durationLabel.textContent = "Duration: ";

  songImg.src = song.imageUrl;

  if (song.url) {
    songImg.addEventListener("click", () => {
      window.open(song.url, "_blank");
    });
  }

  card.appendChild(songImg);
  card.appendChild(songTitle);
  songYearContainer.appendChild(yearLabel);
  songYearContainer.appendChild(yearValue);
  card.appendChild(songYearContainer);
  songDurationContainer.appendChild(durationLabel);
  songDurationContainer.appendChild(songDuration);
  card.appendChild(songDurationContainer);

  return card;
}
