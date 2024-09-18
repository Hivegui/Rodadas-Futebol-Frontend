let data: any[] = [];
let currentRound = 0; // Keeps track of the current round

// Function to fetch data from the API
export const fetchRounds = async () => {
    try {
        const response = await fetch('https://sevn-pleno-esportes.deno.dev/');
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Process the received data
        const fetchedData = await response.json();
        return fetchedData;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return null;
    }
}

// Function to render the data into the DOM
const renderData = (data: any[], round: number) => {
    const roundContainer = document.getElementById('round-content');
    roundContainer!.innerHTML = ''; // Clear the previous content

    if (data && data.length > 0) {
        const roundData = data[round];
        if (roundData) {
            roundData.games.forEach((game: any) => {
                const matchElement = document.createElement('div');
                matchElement.classList.add('match');
                matchElement.innerHTML = `
                    <div class="team">${game.teamA}</div>
                    <div class="score">${game.scoreA} ${game.scoreB}</div>
                    <div class="team">${game.teamB}</div>
                `;
                roundContainer!.appendChild(matchElement);
            });
        } else {
            roundContainer!.innerHTML = '<p>Round not found</p>';
        }
    } else {
        roundContainer!.innerHTML = '<p>Error loading data</p>';
    }
}

// Function to load data and render the first round
const load = async () => {
    data = await fetchRounds();
    if (data) {
        renderData(data, currentRound); // Display the first round
    }
}

// Function to change the round
const changeRound = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentRound < data.length - 1) {
        currentRound++;
    } else if (direction === 'prev' && currentRound > 0) {
        currentRound--;
    }
    renderData(data, currentRound); // Render the new round
}

// Add event listeners to buttons
document.getElementById('next-round')?.addEventListener('click', () => changeRound('next'));
document.getElementById('prev-round')?.addEventListener('click', () => changeRound('prev'));

// Load data on page load
load();