// Defining interfaces for the API data
interface Game {
  teamA: string;
  scoreA: number;
  teamB: string;
  scoreB: number;
  team_home_id: string;
  team_away_id: string;
}

interface Round {
  round: number;
  games: Game[];
}

let rounds: Round[] = []; // Stores all rounds
let currentRound = 0; // Keeps track of the current round

// Function to fetch data from the API
const fetchRounds = async (): Promise<void> => {
  try {
    const response = await fetch('https://sevn-pleno-esportes.deno.dev/');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    rounds = await response.json();
    renderCurrentRound(); // Render the first round when loading
    updateButtons(); // Update the navigation buttons
  } catch (error) {
    console.error('Error loading data from API', error);
    document.getElementById('round-content')!.innerHTML = '<p>Error loading data</p>';
  }
};

// Function to render the current round
const renderCurrentRound = (): void => {
  const roundContent = document.getElementById('round-content');
  if (!roundContent) return;

  roundContent.innerHTML = ''; // Clear the previous content

  rounds[currentRound].games.forEach((game, index) => {
    const matchElement = document.createElement('div');
    matchElement.classList.add('match');

    // Maps the correct shield based on team ID
    const homeShield = `./src/assets/shields/team_shield_${game.team_home_id.split('-')[1]}.png`;
    const awayShield = `./src/assets/shields/team_shield_${game.team_away_id.split('-')[1]}.png`;

    // Check if the index is even or odd to set the position of the teams
    if (index % 2 === 0) {
      // Even index - team on the left
      matchElement.innerHTML = `
        <div class="team team-left">
          <img src="${homeShield}" alt="${game.teamA}" class="team-image-left" />
          ${game.teamA}
        </div>
        <div class="score">
          <span class="team-score">${game.scoreA}</span>
          <span class="score-divider">X</span> 
          <span class="team-score">${game.scoreB}</span>
        </div>
        <div class="team team-right">
          ${game.teamB}
          <img src="${awayShield}" alt="${game.teamB}" class="team-image-right" />
        </div>
      `;
    } else {
      // Odd index - team on the right
      matchElement.innerHTML = `
        <div class="team team-right">
          <img src="${homeShield}" alt="${game.teamA}" class="team-image-left" />
          ${game.teamA}
        </div>
        <div class="score">
          <span class="team-score">${game.scoreA}</span>
          <span class="score-divider">X</span> 
          <span class="team-score">${game.scoreB}</span>
        </div>
        <div class="team team-left">
          ${game.teamB}
          <img src="${awayShield}" alt="${game.teamB}" class="team-image-right" />
        </div>
      `;
    }

    roundContent.appendChild(matchElement);
  });

  // Update the round number in the title
  const roundNumberElement = document.getElementById('round-number');
  if (roundNumberElement) {
    roundNumberElement.textContent = `Rodada ${rounds[currentRound].round}`;
  }
};

// Function to change the round
const changeRound = (direction: 'next' | 'prev'): void => {
  if (direction === 'next' && currentRound < rounds.length - 1) {
    currentRound++;
  } else if (direction === 'prev' && currentRound > 0) {
    currentRound--;
  }
  renderCurrentRound();
  updateButtons();
};

// Function to disable/enable navigation buttons
const updateButtons = (): void => {
  const prevButton = document.getElementById('prev-round') as HTMLButtonElement;
  const nextButton = document.getElementById('next-round') as HTMLButtonElement;

  prevButton.disabled = currentRound === 0;
  nextButton.disabled = currentRound === rounds.length - 1;
};

// Add event listeners to the navigation buttons
document.getElementById('next-round')?.addEventListener('click', () => changeRound('next'));
document.getElementById('prev-round')?.addEventListener('click', () => changeRound('prev'));

// Load the API data on initialization
fetchRounds();