import Nullstack from 'nullstack';
import Logo from 'nullstack/logo';
import Counter from './Counter';

class Home extends Nullstack {

  prepare({ project, page, greeting }) {
    page.title = `${project.name} - ${greeting}`;
    page.description = `${project.name} {{i18n_madeWith}}`;
  }

  renderLink({ children, href }) {
    const link = href + '?ref=create-nullstack-app';
    return (
      <a class="text-pink-500 ml-1" href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  renderActionLink({ children, href }) {
    const link = href + '?ref=create-nullstack-app';
    return (
      <a class="inline-block text-pink-500 mb-1" href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  render({ project, greeting }) {
    return (
      <section class="w-full max-w-3xl min-h-screen my-0 mx-auto flex items-center p-6 flex-wrap md:flex-nowrap">
        <article class="w-full mb-5">
          <Link href="{{i18n_nullstackDoc}}">
            <div class="ml-1">
              <Logo height={60} light />
            </div>
          </Link>
          <h1 class="block font-crete-round tracking-widest font-bold text-lg mt-4"> {project.name} </h1>
          <p class="block mt-4"> {greeting} </p>
          <p class="block mt-4">
            {{i18n_gettingStarted}}
            <Link href="{{PROJECT_SRC}}">
              {{i18n_srcFolder}}
            </Link>.
          </p>
          <ul class="block leading-snug mt-4">
            <li>
              <ActionLink href="{{i18n_link0:0}}">
                {{i18n_link0:1}}
              </ActionLink>
            </li>
            <li>
              <ActionLink href="{{i18n_link1:0}}">
                {{i18n_link1:1}}
              </ActionLink>
            </li>
            <li>
              <ActionLink href="{{i18n_link2:0}}">
                {{i18n_link2:1}}
              </ActionLink>
            </li>
            <li>
              <ActionLink href="{{i18n_link3:0}}">
                {{i18n_link3:1}}
              </ActionLink>
            </li>
            <li>
              <ActionLink href="{{i18n_link4:0}}">
                {{i18n_link4:1}}
              </ActionLink>
            </li>
          </ul>
           <span class="block mt-2">
            {{i18n_hintExtension}}
            <Link href="vscode:extension/ChristianMortaro.vscode-nullstack">
              {{i18n_vsExtension}}
            </Link>
          </span>
          <Counter />
        </article>
        <aside class="w-full">
          <Link href="{{i18n_nulla.link}}">
            <img class="w-full inline-block" src="/nulla-chan.webp" alt="{{i18n_nulla.altImage}}" />
          </Link>
        </aside>
      </section>
    )
  }

}

export default Home;