function searchTeams() {
    fetch('http://localhost:3000/teams')
      .then(response => response.json())
      .then(data => displayTeams(data))
      .catch(error => console.error('Error fetching data:', error))
  
  }
  
function displayTeams(teams) {
    const resultsContainer = document.getElementById('team_search_results');
    resultsContainer.innerHTML = '';
  
    if (teams.length === 0) {
      resultsContainer.innerHTML = 'No teams found.';
      return;
    }
  
    const list = document.createElement('ul');
  
    list.classList.add("search_results");
    
    teams.forEach(team => {
      const listItem = document.createElement('li');
      const linkItem = document.createElement('a');
      linkItem.title = team.team_name;
      const node = document.createTextNode(team.team_name);
      linkItem.appendChild(node);
      linkItem.href = `http://localhost:3000/teams/${team.team_id}`
      linkItem.target = "_blank";
      listItem.appendChild(linkItem);
      list.appendChild(listItem); // Corrected this line
    });
  
    resultsContainer.appendChild(list);
}

searchTeams();