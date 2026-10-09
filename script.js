const usersCardsContainer = document.getElementById('userCards');
const searchInput = document.getElementById('search');
const darkModeToggle = document.getElementById('dark');

let users = [];

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    users = data;
    displayUsers(users);
  })
  .catch(error => {
    usersCardsContainer.textContent = 'Foydalanuvchilarni yuklab bo‘lmadi.';
    console.error('Foydalanuvchilarni yuklashda xatolik:', error);
  });

function displayUsers(users) {
  usersCardsContainer.innerHTML = '';
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.className = 'card';
    userCard.innerHTML = `
      <h2>${user.name}</h2>
      <p>${user.email}</p>
      <p>${user.phone}</p>
      <p>${user.address.city}, ${user.address.street}</p>
    `;
    usersCardsContainer.appendChild(userCard);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );
  displayUsers(filteredUsers);
});

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = document.body.classList.contains('dark-mode')
    ? 'Light Mode'
    : 'Dark Mode';
});