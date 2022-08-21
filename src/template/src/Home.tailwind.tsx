import Nullstack, { NullstackClientContext } from 'nullstack';
import Logo from 'nullstack/logo';

declare function Link(): typeof Home.prototype.renderLink
declare function ActionLink(): typeof Home.prototype.renderActionLink

interface HomeProps extends NullstackClientContext {
  route: string
}

interface HomeLinkProps extends HomeProps {
  href: string
}

class Home extends Nullstack<HomeProps> {

  prepare({ project, page }: HomeProps) {
    page.title = `${project.name} - {{i18n_welcome}}`;
    page.description = `${project.name} {{i18n_madeWith}}`;
  }

  renderLink({ children, href }: HomeLinkProps) {
    const link = href + '?ref=create-nullstack-app';
    return (
      <a class="text-pink-500 ml-1" href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  renderActionLink({ children, href }: HomeLinkProps) {
    const link = href + '?ref=create-nullstack-app';
    return (
      <a class="inline-block text-pink-500 mb-2 ml-1 px-1 py-2" href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  render({ project }: HomeProps) {
    return (
      <section class="w-full max-w-3xl min-h-screen my-0 mx-auto
       flex items-center p-6 flex-wrap md:flex-nowrap">
        <article class="w-full mb-5">
          <Link href="{{i18n_nullstackDoc}}">
            <div class="ml-1">
              <Logo height={60} light />
            </div>
          </Link>
          <h1 class="block font-crete-round tracking-widest font-bold text-lg mt-4"> {project.name} </h1>
          <p class="block mt-4">
            {{i18n_gettingStarted}}
            <Link href="vscode://file/C:/Users/sussh/Desktop/Nullstack/create-nullstack-app/boomba/src">
              {{i18n_srcFolder}}
            </Link>.
          </p>
          <span class="block mt-4">
            {{i18n_hintExtension}}
            <Link href="vscode:extension/ChristianMortaro.vscode-nullstack">
              {{i18n_vsExtension}}
            </Link>
          </span>
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