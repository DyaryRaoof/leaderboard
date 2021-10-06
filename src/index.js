import './style.css';

const refreshButton = document.querySelector('#refresh');

const { bootstrap } = window;

const form = document.forms[0];
const URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const fetchData = async (endpoint, data, method) => {
  const result = await fetch(URL + endpoint, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; Charset=UTF-8',
    },
  });

  return result;
};

const createGame = async () => {
  const endpoint = 'games/';
  const data = { name: 'Awesome Game' };
  const result = await fetchData(endpoint, data, 'POST');
  const json = await result.json();
  const id = json.result;
  const actualId = id.split('Game with ID: ')[1].split(' added.')[0];
  return actualId;
};

const saveGameIdLocally = (id) => {
  localStorage.setItem('gameId', JSON.stringify(id));
};

const retreiveGameId = () => {
  const id = JSON.parse(localStorage.getItem('gameId'));
  return id;
};

const createScoreElement = (userName, score) => {
  const scoresTableBody = document.querySelector('#scores-table-body');

  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.innerHTML = `${userName} : ${score}`;
  tr.appendChild(td);

  scoresTableBody.appendChild(tr);
};

const renderScoreElements = (leaderboards) => {
  const scoresTableBody = document.querySelector('#scores-table-body');
  scoresTableBody.innerHTML = '';
  leaderboards.forEach((leaderboard) => {
    createScoreElement(leaderboard.user, leaderboard.score);
  });
};

const refreshLeaderboard = async () => {
  const gameId = retreiveGameId();
  const endpoint = `games/${gameId}/scores/`;
  const result = await fetch(URL + endpoint);
  const json = await result.json();
  const games = json.result;
  renderScoreElements(games);
};

const createGameAndSaveItsId = async () => {
  let id = retreiveGameId();
  if (!id) {
    id = await createGame();
    saveGameIdLocally(id);
  } else {
    refreshLeaderboard();
  }
};

window.addEventListener('load', () => {
  createGameAndSaveItsId();
});

const showModal = (title, description) => {
  const modalTitle = document.querySelector('#modal-title');
  const modalDescription = document.querySelector('#modal-description');
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  const modal = new bootstrap.Modal(document.querySelector('.modal'), {});
  modal.show();
};

const sendGameScore = async (user, score) => {
  const id = retreiveGameId();
  const endpoint = `games/${id}/scores/`;
  const method = 'POST';
  const data = { user, score };
  const result = await fetchData(endpoint, data, method);
  const json = await result.json();
  showModal('Success', json.result);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.elements[0];
  const score = form.elements[1];
  createScoreElement(name.value, score.value);
  sendGameScore(name.value, score.value);
  form.reset();
});

refreshButton.addEventListener('click', () => {
  refreshLeaderboard();
});
