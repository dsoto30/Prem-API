
function searchPlayers() {
    const playerName = document.getElementById('playerName').value;
  
    // Make an AJAX request to the backend
    fetch(`http://localhost:3000/players?playerName=${playerName}`)
      .then(response => response.json())
      .then(data => displayPlayerResults(data))
      .catch(error => console.error('Error fetching data:', error));
}
  
function displayPlayerResults(players) {
  const resultsContainer = document.getElementById('player_search_results');
  resultsContainer.innerHTML = '';

  if (players.length === 0) {
    resultsContainer.innerHTML = 'No players found.';
    return;
  }

  const list = document.createElement('ul');

  list.classList.add("search_results");
  
  players.forEach(player => {
    const listItem = document.createElement('li');
    const linkItem = document.createElement('a');
    linkItem.title = player.player_name;
    const node = document.createTextNode(player.player_name);
    linkItem.appendChild(node);
    linkItem.href = `http://localhost:3000/players/${player.player_id}`
    linkItem.target = "_blank";
    listItem.appendChild(linkItem);
    list.appendChild(listItem); // Corrected this line
  });

  resultsContainer.appendChild(list);
}



/*
function searchTeams(){
  const teamName = document.getElementById('teamName').value;

}*/

function eventListeners() {
  const playerSearchBtn = document.getElementById('playerSearch');
  playerSearchBtn.addEventListener('click', searchPlayers);

  /*
  const teamSearchBtn = document.getElementById('teamSearch');
  teamSearchBtn.addEventListener('click', searchTeams);*/
}

document.addEventListener("DOMContentLoaded", function() { 
  eventListeners();
});