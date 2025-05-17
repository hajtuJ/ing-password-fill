'use strict';

import './popup.css';

document.getElementById('saveBtn').addEventListener('click', () => {
  const password = document.getElementById('passwordInput').value;
  console.log(password)
  chrome.storage.local.set({ savedPassword: password }, () => {
    alert('Password saved!');
  });
});