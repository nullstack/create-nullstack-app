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

  render(context) {
    return (
      <main>
        <h1> Welcome to Nullstack! </h1>
        <a href="https://github.com/Mortaro/nullstack" target="_blank"> Read the documentation </a>
      </main>
    )
  }


}

Application.initialize();