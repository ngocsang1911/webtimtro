// JavaScript for displaying favorites on yeuthich.html
const favoritesContainer = document.getElementById('favorites-container');

// Retrieve favorites from localStorage
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Display favorites in the container (you can use any desired HTML structure)
favorites.forEach((fav) => {
  const favoriteItem = document.createElement('div');
  favoriteItem.innerHTML = `<p>${fav.name} - ${fav.price}</p>`;
  favoritesContainer.appendChild(favoriteItem);
});
