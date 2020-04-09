import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async initiate(context) {
    context.port = 5000;
  }

  initialize({metadata}) {
    metadata.title = "Welcome to Nullstack!";
  }

  // async initiate(context) {}
  // async terminate(context) {}

  render({metadata}) {
    return (
      <main>
        <h1> {metadata.title} </h1>
        <a href="https://github.com/nullstack/nullstack" target="_blank"> Read the documentation </a>
      </main>
    )
  }


}

Application.initialize();