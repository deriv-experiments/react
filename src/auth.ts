const REDIRECT_URI = encodeURIComponent('https://localhost/example/');
const AUTHORIZATION_URL = 'https://oauth.deriv.com/oauth2/authorize';
const SCOPES = encodeURIComponent('your_scopes'); // Replace with your desired scopes

export function startOAuthFlow(clientId) {
  const state = Math.random().toString(36).substring(7);
  localStorage.setItem('oauth2_state', state);

  const url = `${AUTHORIZATION_URL}?app_id=${clientId}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token&state=${state}`;
  window.location.href = url;
}

export function getAccessTokenFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const state = urlParams.get('state');
  const storedState = localStorage.getItem('oauth2_state');

  if (state && state === storedState) {
      localStorage.removeItem('oauth2_state');
      localStorage.setItem('access_token', urlParams.get('token1'));
      window.location.href = window.location.pathname;
      return ;
  }

  return localStorage.getItem('access_token');
}

window.addEventListener('DOMContentLoaded', getAccessTokenFromUrl);
