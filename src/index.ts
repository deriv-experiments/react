import EventEmitter from 'events';
import deepEqual from 'deep-equal';
import { startOAuthFlow } from './auth.ts';
export * from './hooks/index.ts';

const eventEmitter = new EventEmitter();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/worker.js').then(function(registration) {
      if (registration.active && !navigator.serviceWorker.controller) {
        console.log('Service worker not active, soft reloading');
        window.location.reload();
        return;
      }

      if (process.env.DERIV_WS_URL) {
        send('setWebsocketUrl', process.env.DERIV_WS_URL);
      }

      if (localStorage.getItem('access_token')) {
        send('ws', {
          "authorize": localStorage.getItem('access_token')
        });
        return;
      }

      send('ping');
    }, function(err) {
      console.log('Service worker registration failed: ', err);
    });
  });
}

navigator.serviceWorker.addEventListener('message', function(event) {
  if (event.data && event.data[0] === 'debug') {
    eventEmitter.emit('debug', event.data[1]);
  }
  if (event.data && event.data[0] === 'debug:add') {
    eventEmitter.emit('debug:add', event.data[1]);
  }
  if (event.data && event.data[0] === 'ws') {
    eventEmitter.emit('change', event.data[1]);
  }
  if (event.data && event.data[0] === 'ws' && event.data[1].authorize) {
    eventEmitter.emit('authorize', event.data[1]);
  }
});

setInterval(() => {
  send('ping');
}, 5000);

function send (...args) {
  navigator.serviceWorker.controller.postMessage(args);
}

eventEmitter.login = () => {
  startOAuthFlow();
}

eventEmitter.subscribe = (message, callback) => {
  eventEmitter.on('change', (reply) => {
    if (deepEqual(message, reply.echo_req)) {
      callback(reply);
    }
  });
  send('ws', message);

  return () => false;
}

eventEmitter.send = send;

eventEmitter.setWebsocketUrl = (url) => {
  send('setWebsocketUrl', url);
}

export default eventEmitter;
