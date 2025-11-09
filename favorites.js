document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('favorites-container');
  const noFavorites = document.getElementById('no-favorites');

  let favorites = JSON.parse(localStorage.getItem('favoriteDishes')) || [];

  if (favorites.length === 0) {
    noFavorites.style.display = 'block';
    return;
  }

  favorites.forEach((dish, index) => {
    const card = document.createElement('div');
    card.classList.add('favorite-card');
    card.innerHTML = `
      <img src="${dish.foodImg}" alt="${dish.foodName}">
      <div class="favorite-card-content">
        <h3>${dish.foodName}</h3>
        <p>₹${dish.foodPrice}</p>
        <p>${dish.foodRating ? '⭐ ' + dish.foodRating : 'No rating available'}</p>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    // remove favorite logic
    card.querySelector('.remove-btn').addEventListener('click', () => {
      favorites = favorites.filter(f => f.foodName !== dish.foodName);
      localStorage.setItem('favoriteDishes', JSON.stringify(favorites));
      card.remove();

      if (favorites.length === 0) {
        noFavorites.style.display = 'block';
      }
    });

    container.appendChild(card);
  });
});
