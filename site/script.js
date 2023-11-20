
function searchPlayers() {
    const playerName = document.getElementById('playerName').value;
  
    // Make an AJAX request to the backend
    fetch(`http://localhost:3000/players?playerName=${playerName}`)
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => console.error('Error fetching data:', error));
}
  
function displayResults(players) {
    const resultsContainer = document.getElementById('player_search_results');
    resultsContainer.innerHTML = '';
  
    if (players.length === 0) {
      resultsContainer.innerHTML = 'No players found.';
      return;
    }
  
    const list = document.createElement('ul');
    players.forEach(player => {
      const listItem = document.createElement('li');
      listItem.textContent = player.player_name;
      list.appendChild(listItem);
    });
  
    resultsContainer.appendChild(list);
}

function eventListeners() {
  const playerSearchBtn = document.getElementById('playerSearch');
  playerSearchBtn.addEventListener('click', searchPlayers);
}

document.addEventListener("DOMContentLoaded", function() { 
  eventListeners();
});