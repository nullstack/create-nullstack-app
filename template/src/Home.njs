import Nullstack from 'nullstack';
import './Home.scss';
import Logo from 'nullstack/logo';

class Home extends Nullstack {

  prepare({project, page}) {
    page.title = `${project.name} - Welcome to Nullstack!`;
    page.description = `${project.name} was made with Nullstack`;
    page.locale = 'pt-BR';
  }

  renderLink({children, href}) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      > 
        {children}
      </a>
    )
  }

  renderArticle({project}) {
    return (
      <article>
        <Logo height={50} light />
        <h1> {project.name} </h1>
        <p>
          Take a look at the src folder we made
          some examples to help you getting started! 
        </p>
        <span>
          Hint: we have a 
          <Link href="#"> VS Code Extension </Link>
        </span>
        <ul>
          <li>
            <Link href="https://nullstack.app/renderable-components"> 
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
        <div>
          <span>
            As da Vinci would say:
          </span>
          <blockquote>
            "Simplicity is the ultimate sophistication"
          </blockquote>
        </div>
      </article>
    )
  }

  renderAside() {
    return (
      <aside>
        <Link href="https://nullstack.app/waifu">
          <img src="/nullachan.png" />
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