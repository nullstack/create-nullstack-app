import Nullstack from 'nullstack';
import './Home.scss';
import Logo from 'nullstack/logo';

class Home extends Nullstack {

  prepare({ project, page }) {
    page.title = `${project.name} - {{i18n_welcome}}`;
    page.description = `${project.name} {{i18n_madeWith}}`;
    page.locale = '{{PROJECT_LANG}}';
  }

  renderLink({ children, href }) {
    const link = (
      href.indexOf('visualstudio') > -1
        ? href
        : href + '?ref=create-nullstack-app'
    );

    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  renderArticle({ project }) {
    return (
      <article>
        <Link href="{{i18n_nullstackDoc}}">
          <Logo height={60} light />
        </Link>
        <h1> {project.name} </h1>
        <p>
          {{i18n_gettingStarted}}<Link href="{{PROJECT_SRC}}">
            {{i18n_srcFolder}}
          </Link>.
        </p>
        <span>
          {{i18n_hintExtension}}
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=ChristianMortaro.vscode-nullstack"
          >{{i18n_vsExtension}}
          </Link>
        </span>
        <ul>
          <li>
            <Link href="{{i18n_link0:0}}">
              {{i18n_link0:1}}
            </Link>
          </li>
          <li>
            <Link href="{{i18n_link1:0}}">
              {{i18n_link1:1}}
            </Link>
          </li>
          <li>
            <Link href="{{i18n_link2:0}}">
              {{i18n_link2:1}}
            </Link>
          </li>
          <li>
            <Link href="{{i18n_link3:0}}">
              {{i18n_link3:1}}
            </Link>
          </li>
          <li>
            <Link href="{{i18n_link4:0}}">
              {{i18n_link4:1}}
            </Link>
          </li>
        </ul>
        <div>
          <span>
            {{i18n_authorQuote}}
          </span>
          <blockquote>
            {{i18n_footerQuote}}
          </blockquote>
        </div>
      </article>
    )
  }

  renderAside() {
    return (
      <aside>
        <head>
          <link href="https://raw.githubusercontent.com" rel="preconnect" />
        </head>
        <Link href="{{i18n_nulla.link}}">
          <img
            src="https://raw.githubusercontent.com/nullstack/create-nullstack-app/master/nulla-chan.webp"
            alt="{{i18n_nulla.altImage}}"
          />
        </Link>
      </aside>
    )
  }

  render() {
    return (
      <section>
        <Article />
        <Aside />
      </section>
    )
  }

}

export default Home;