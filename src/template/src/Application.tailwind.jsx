import Nullstack from 'nullstack';
import './tailwind.css';
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
      <>
        <Head />
        <body class="bg-mainBgColor text-[#fff] font-roboto">
          <Home route="/" />
        </body>
      </>
    )
  }

}

export default Application;