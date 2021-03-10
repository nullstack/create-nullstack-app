import Nullstack from 'nullstack';

import './Application.scss';

class Application extends Nullstack {

  appWelcome = '';

  static async start(context) {
    await this.startProject(context);
  }

  static async startProject({project}) {
    project.name = '{{PROJECT_NAME}}';
    project.domain = 'localhost';
    project.color = '#D22365';
  }

  prepare({project, page}) {
    page.title = `${project.name} - Welcome to Nullstack!`;
    this.appWelcome = page.title.replace(' - ', '<br>');
    page.description = `${project.name} was made with Nullstack`;
    page.locale = 'pt-BR';
  }

  renderPreloader() {
    return (
      <head>
        <link
          rel="preload"
          href="/crete-round-v9-latin-regular.woff2" as="font"
          type="font/woff2"
          crossorigin
        />
      </head>
    )
  }

  render() {
    return (
      <main>
        <Preloader />
        <img
          class="nullstack-logo"
          src="/image-1200x630.png"
          width="50%" height="100%"
          alt="Nullstack full-stack framework banner"
        />

        <h1> {this.appWelcome} </h1>

        <a
          href="https://nullstack.app/documentation"
          target="_blank"
          rel="noopener noreferrer"
          class="documentation-link"
        >
          Read the Documentation
        </a>
      </main>
    )
  }

}

export default Application;