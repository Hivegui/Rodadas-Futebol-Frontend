// Defining interfaces for API data
interface Game {
  team_home_id: string;
  team_home_name: string;
  team_home_score: number;
  team_away_id: string;
  team_away_name: string;
  team_away_score: number;
}

interface Round {
  round: number;
  games: Game[];
}

let data: Round[] = [];
let currentRound = 0;

// Function to fetch data from the API
const fetchRounds = async () => {
  try {
    const response = await fetch('https://sevn-pleno-esportes.deno.dev/');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    data = await response.json();
    renderRound(data[currentRound]); // Render the first round on load
    updateButtonState(); // Update the navigation button state
  } catch (error) {
    console.error('Error fetching data from API:', error);
    document.getElementById('round-content')!.innerHTML = '<p>Error loading data</p>';
  }
};

// Function to render the current round
const renderRound = (round: Round) => {
  const roundContainer = document.getElementById('round-content')!;
  roundContainer.innerHTML = ''; // Clear previous content

  round.games.forEach((game) => {
    const matchElement = document.createElement('div');
    matchElement.classList.add('match');

    // Map the correct shield based on the team's ID
    const homeShield = `./src/assets/shields/team_shield_${game.team_home_id.split('-')[1]}.png`;
    const awayShield = `./src/assets/shields/team_shield_${game.team_away_id.split('-')[1]}.png`;

    matchElement.innerHTML = `
      <div class="team">
        <img src="${homeShield}" alt="${game.team_home_name}" class="team-image-left" />
        ${game.team_home_name}
      </div>
      <div class="score">
        <span class="team-score">${game.team_home_score}</span>
        <span class="score-divider">X</span> 
        <span class="team-score">${game.team_away_score}</span>
      </div>
      <div class="team">
        ${game.team_away_name}
        <img src="${awayShield}" alt="${game.team_away_name}" class="team-image-right" />
      </div>
    `;
    roundContainer.appendChild(matchElement);
  });

  // Update the round number in the title
  const roundTitle = document.getElementById('round-number');
  roundTitle!.textContent = `Round ${round.round}`;
};

// Function to change the round
const changeRound = (direction: 'next' | 'prev') => {
  if (direction === 'next' && currentRound < data.length - 1) {
    currentRound++;
  } else if (direction === 'prev' && currentRound > 0) {
    currentRound--;
  }
  renderRound(data[currentRound]);
  updateButtonState();
};

// Function to update the button states
const updateButtonState = () => {
  const prevButton = document.getElementById('prev-round') as HTMLButtonElement;
  const nextButton = document.getElementById('next-round') as HTMLButtonElement;

  // Disable the "Previous" button if on the first round
  if (currentRound === 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  // Disable the "Next" button if on the last round
  if (currentRound === data.length - 1) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
};

// Adding events to the navigation buttons
document.getElementById('next-round')!.addEventListener('click', () => changeRound('next'));
document.getElementById('prev-round')!.addEventListener('click', () => changeRound('prev'));

// Load the data on initialization
fetchRounds();