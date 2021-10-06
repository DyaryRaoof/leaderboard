import './style.css';

const refreshButton = document.querySelector('#refresh');

const { bootstrap } = window;

const form = document.forms[0];
const URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

async function fetchData(endpoint, data, method) {
  const result = await fetch(URL + endpoint, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; Charset=UTF-8',
    },
  });

  return result;
}
async function createGame() {
  const endpoint = 'games/';
  const data = { name: 'Awesome Game' };
  const result = await fetchData(endpoint, data, 'POST');
  const json = await result.json();
  const id = json.result;
  const actualId = id.split('Game with ID: ')[1].split(' added.')[0];
  return actualId;
}

function saveGameIdLocally(id) {
  localStorage.setItem('gameId', JSON.stringify(id));
}

function retreiveGameId() {
  const id = JSON.parse(localStorage.getItem('gameId'));
  return id;
}

async function createGameAndSaveItsId() {
  let id = retreiveGameId();
  if (!id) {
    id = await createGame();
    saveGameIdLocally(id);
  }
}

window.addEventListener('load', () => {
  createGameAndSaveItsId();
});

function showModal(title, description) {
  const modalTitle = document.querySelector('#modal-title');
  const modalDescription = document.querySelector('#modal-description');
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  const modal = new bootstrap.Modal(document.querySelector('.modal'), {});
  modal.show();
}

async function sendGameScore(user, score) {
  const id = retreiveGameId();
  const endpoint = `games/${id}/scores/`;
  const method = 'POST';
  const data = { user, score };
  const result = await fetchData(endpoint, data, method);
  const json = await result.json();
  showModal('Success', json.result);
}

function createScoreElement(userName, score) {
  const scoresTableBody = document.querySelector('#scores-table-body');

  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.innerHTML = `${userName} : ${score}`;
  tr.appendChild(td);

  scoresTableBody.appendChild(tr);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.elements[0];
  const score = form.elements[1];
  createScoreElement(name.value, score.value);
  sendGameScore(name.value, score.value);
  form.reset();
});

async function refreshLeaderboard() {
  const gameId = retreiveGameId();
  const endpoint = `games/${gameId}/scores/`;
  const result = await fetch(URL + endpoint);
  const json = await result.json();
  const games = json.result;
}

refreshButton.addEventListener('click', () => {
  refreshLeaderboard();
});
