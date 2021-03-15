import Nullstack from 'nullstack';
import './Application.scss';
import Home from './Home';

class Application extends Nullstack {

  static async start(context) {
    await this.startProject(context);
  }

  static async startProject({project}) {
    project.name = '{{PROJECT_NAME}}';
    project.domain = 'localhost';
    project.color = '#D22365';
  }

  render() {
    return (
      <main>
        <head>
          <link 
            href="https://fonts.gstatic.com" 
            rel="preconnect"
          />
          <link 
            href="https://fonts.googleapis.com/css2?family=Crete+Round:ital@0;1&family=Roboto:ital@0;1&display=swap"
            rel="stylesheet" 
          />
        </head> 
        <Home route="/" />
      </main>
    )
  }

}

export default Application;