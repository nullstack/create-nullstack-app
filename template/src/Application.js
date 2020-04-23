import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async initiate(context) {
    context.port = 5000;
  }

  initialize({environment}) {
    if(environment.production) {
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

  initiate({metadata}) {
    metadata.title = "Welcome to Nullstack!";
  }

  render({metadata}) {
    return (
      <main>
        <h1> {metadata.title} </h1>
        <a href="https://github.com/nullstack/nullstack" target="_blank"> Read the documentation </a>
      </main>
    )
  }


}

export default Application;