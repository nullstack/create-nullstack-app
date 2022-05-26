import Nullstack from 'nullstack';
import Logo from 'nullstack/logo';
import './Home.css';
class Home extends Nullstack {

  prepare({ project, page }) {
    page.title = `${project.name} - {{i18n_welcome}}`;
    page.description = `${project.name} {{i18n_madeWith}}`;
  }

  renderLink({ children, href }) {
    const link = href + '?ref=create-nullstack-app';
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
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
          <h1 class="tracking-[1px] font-bold text-lg"> {project.name} </h1>
          <p class="leading-[18px]">
            We made some examples to help you getting started! Take a look at the
            <Link href="vscode://file/C:/Users/sussh/Desktop/Nullstack/create-nullstack-app/boomba/src">
              src folder
            </Link>.
          </p>
          <span>
            Hint: we have a
            <Link href="vscode:extension/ChristianMortaro.vscode-nullstack">
              VS Code Extension
            </Link>
          </span>
          <ul class="leading-snug">
            <li>
              <Link href="https://nullstack.app/stateless-components">
                🎉 Create your first component 
              </Link>
            </li>
            <li>
              <Link href="https://nullstack.app/routes-and-params">
                ✨ Set your first route
              </Link>
            </li>
            <li>
              <Link href="https://nullstack.app/context">
                ⚡ Define your context
              </Link>
            </li>
            <li>
              <Link href="https://github.com/nullstack/nullstack/stargazers">
                ⭐ Leave a star on github
              </Link>
            </li>
            <li>
              <Link href="https://youtube.com/nullstack">
                🎬 Subscribe to our Youtube Channel
              </Link>
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