const showToast = (message, state) => {
  const toast = document.querySelector('.toast');
  const toastTitle = document.querySelector('.toast-title');
  const toastBody = document.querySelector('.toast-body');
  const closeButton = document.querySelector('.toast button');
  toastTitle.textContent = state;
  toastBody.textContent = message;
  toast.classList.add('toast-move', 'show');
  toast.classList.remove('hide');
  closeButton.addEventListener('click', () => {
    toast.classList.add('hide');
  });
};

module.exports.showToast = showToast;
