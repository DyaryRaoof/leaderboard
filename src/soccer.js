function moveBall3(el) {
  let id = null;
  let pos = el.offsetTop;
  let xpos = el.offsetLeft;
  clearInterval(id);
  function frame() {
    if (pos === window.innerHeight - 100) {
      clearInterval(id);
      el.style.display = 'none';
    } else {
      pos += 2;
      xpos += 0.5;
      el.style.top = `${pos}px`;
      el.style.left = `${xpos}px`;
    }
  }
  id = setInterval(frame, 5);
}

function moveBall2(el) {
  let id = null;
  let pos = el.offsetTop;
  let xpos = el.offsetLeft;
  clearInterval(id);
  function frame() {
    if (pos === 200) {
      clearInterval(id);
      moveBall3(el);
    } else {
      pos -= 2;
      xpos += 0.5;
      el.style.top = `${pos}px`;
      el.style.left = `${xpos}px`;
    }
  }
  id = setInterval(frame, 5);
}

function moveBall(el) {
  el.style.display = 'block';
  el.classList.add('soccer-ball');
  let id = null;
  let pos = 0;
  clearInterval(id);
  el.style.left = `${Math.random() * 300}px`;
  function frame() {
    if (pos === window.innerHeight - 100) {
      clearInterval(id);
      moveBall2(el);
    } else {
      pos += 1;
      el.style.top = `${pos}px`;
    }
  }
  id = setInterval(frame, 0.0005);
}

const animateSoccerBall = async () => {
  const soccerImg = document.querySelector('#soccer-ball');
  for (let i = 0; i < 6; i += 1) {
    setTimeout(() => {
      const clone = soccerImg.cloneNode(true);
      document.body.appendChild(clone);
      moveBall(clone);
    }, i * 1000);
  }
};

module.exports.animateSoccerBall = animateSoccerBall;
