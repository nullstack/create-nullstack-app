import Nullstack from 'nullstack';
import type { NullstackClientContext } from 'nullstack/types';
import './Application.css';
import Home from './Home';

declare function Head(): typeof Application.prototype.renderHead

class Application extends Nullstack {

  prepare({ page }: NullstackClientContext) {
    page.locale = '{{PROJECT_LANG}}';
  }

  renderHead() {
    return (
      <head>
        <link
          href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet" />
      </head>
    )
  }

  render() {
    return (
      <main>
        <Head />
        <Home route="/" />
      </main>
    )
  }

}

export default Application;