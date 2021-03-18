import Nullstack from 'nullstack';
import './Home.scss';
import Logo from 'nullstack/logo';

class Home extends Nullstack {

  static async loadLang({ lang }) {
    return require(`./locales/${lang}.json`);
  }

  async initiate(context) {
    const { project, page, params } = context;
    const langs = ['{{PROJECT_LANGS}}'];
    page.locale = params.lang === "" ? langs[0] : langs[1];
    context.$t = await this.loadLang({ lang: page.locale });

    page.title = `${project.name} - ${context.$t.welcome}`;
    page.description = `${project.name} ${context.$t.madeWith}`;
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

  renderArticle({ project, $t, page }) {
    const isBR = page.locale === 'pt-BR';

    return (
      <article>
        <Link href={$t.nullstackDoc}>
          <Logo height={60} light />
        </Link>
        <h1> {project.name} </h1>
        <p>
          {$t.gettingStarted}
          <Link href="{{PROJECT_SRC}}">
            {$t.srcFolder}
          </Link>.
        </p>
        <span>
          {$t.hintExtension}
          <Link
            href="https://marketplace.visualstudio.com/items?itemName=ChristianMortaro.vscode-nullstack"
          >{$t.vsExtension}
          </Link>
        </span>
        <ul>
          {$t.links.map(link => (
            <li>
              <Link href={link[0]}> 
                { link[1] }
              </Link>
            </li>
          ))}
        </ul>
        <span>
          {$t.changeLang}
        </span>
        <ul>
          <li>
            <a
              href="/{{PROJECT_BRLINK}}"
              class={isBR && "activated-link"}
            >
              {$t.langs['pt-BR']}
            </a>
          </li>
          <li>
            <a
              href="/{{PROJECT_USLINK}}"
              class={!isBR && "activated-link"}
            >
              {$t.langs['en-US']}
            </a>
          </li>
        </ul>
        <div>
          <span>
            {$t.authorQuote}
          </span>
          <blockquote>
            {$t.footerQuote}
          </blockquote>
        </div>
      </article>
    )
  }

  renderAside({ $t }) {
    return (
      <aside>
        <head>
          <link href="https://raw.githubusercontent.com" rel="preconnect" />
        </head> 
        <Link href={$t.nulla.link}>
          <img 
            src="https://raw.githubusercontent.com/nullstack/create-nullstack-app/master/nulla-chan.webp" 
            alt={$t.nulla.altImage}
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