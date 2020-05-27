import Nullstack from 'nullstack';

class ServiceWorker extends Nullstack {

  initialize({environment}) {
    if(environment.client && environment.production) {
      if((typeof(navigator) !== 'undefined') && ('serviceWorker' in navigator) && ('PushManager' in window)) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/worker.js', { scope: '/' }).then((registration) => {
            console.log('Service Worker registration completed with scope: ', registration.scope);
          }, (err) => {
            console.log('Service Worker registration failed', err);
          });
        });
      }
    }
  }

}

export default ServiceWorker;