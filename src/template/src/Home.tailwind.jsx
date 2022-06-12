import Nullstack from 'nullstack';
import Logo from 'nullstack/logo';
class Home extends Nullstack {

  prepare({ project, page }) {
    page.title = `${project.name} - {{i18n_welcome}}`;
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
      <a class="inline-block text-pink-500 mb-2 ml-1 px-1 py-2" href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  render({ project }) {
    return (
      <section class="w-full max-w-[800px] min-h-screen my-0 mx-auto
       flex items-center p-6 flex-wrap md:flex-nowrap">
        <article class="w-full mb-5">
          <Link href="https://nullstack.app/">
            <div class="ml-1">
              <Logo height={60} light />
            </div>
          </Link>
          <h1 class="block font-crete-round tracking-[1px] font-bold text-lg mt-4"> {project.name} </h1>
          <p class="block leading-[18px] mt-4">
            We made some examples to help you getting started! Take a look at the
            <Link href="vscode://file/C:/Users/sussh/Desktop/Nullstack/create-nullstack-app/boomba/src">
              src folder
            </Link>.
          </p>
          <span class="block mt-4">
            Hint: we have a
            <Link href="vscode:extension/ChristianMortaro.vscode-nullstack">
              VS Code Extension
            </Link>
          </span>
          <ul class="block leading-snug mt-4">
            <li>
              <ActionLink href="https://nullstack.app/stateless-components">
                🎉 Create your first component 
              </ActionLink>
            </li>
            <li>
              <ActionLink href="https://nullstack.app/routes-and-params">
                ✨ Set your first route
              </ActionLink>
            </li>
            <li>
              <ActionLink href="https://nullstack.app/context">
                ⚡ Define your context
              </ActionLink>
            </li>
            <li>
              <ActionLink href="https://github.com/nullstack/nullstack/stargazers">
                ⭐ Leave a star on github
              </ActionLink>
            </li>
            <li>
              <ActionLink href="https://youtube.com/nullstack">
                🎬 Subscribe to our Youtube Channel
              </ActionLink>
            </li>
          </ul>
        </article>
        <aside class="w-full">
          <Link href="https://nullstack.app/waifu">
            <img class="w-full inline-block" src="/nulla-chan.webp" alt="Nulla-Chan: Nullstack's official waifu" />
          </Link>
        </aside>
      </section>
    )
  }

}

export default Home;