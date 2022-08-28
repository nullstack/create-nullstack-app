import Nullstack from 'nullstack';
import './Application.css';
import Home from './Home';

class Application extends Nullstack {

  prepare({ page }) {
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
      <body>
        <Head />
        <Home route="/" greeting="{{i18n_welcome}}" />
      </body>
    )
  }

}

export default Application;