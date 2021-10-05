import './style.css';

const form = document.forms[0];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.elements[0];
  const score = form.elements[1];
  const scoresTableBody = document.querySelector('#scores-table-body');

  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.innerHTML = `${name.value} : ${score.value}`;
  tr.appendChild(td);

  scoresTableBody.appendChild(tr);
  form.reset();
});
