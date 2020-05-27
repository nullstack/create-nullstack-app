import Nullstack from 'nullstack';

import ServiceWorker from './ServiceWorker';

class Application extends Nullstack {

  static async initiate(context) {
    context.port = 5000;
  }

  initiate({metadata}) {
    metadata.title = "Welcome to Nullstack!";
  }

  render({metadata}) {
    return (
      <main>
        <h1> {metadata.title} </h1>
        <a href="https://github.com/nullstack/nullstack" target="_blank"> Read the documentation </a>
        <ServiceWorker />
      </main>
    )
  }


}

export default Application;