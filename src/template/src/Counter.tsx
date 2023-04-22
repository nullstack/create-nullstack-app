import Nullstack, { NullstackServerContext } from 'nullstack'

import { existsSync, readFileSync, writeFileSync } from 'fs'
import './Counter.css'

interface Counter {
  setCount(SetCountProps): void
  getCount(): Promise<number>
}

interface SetCountProps {
  count: number
}

class Counter extends Nullstack {

  count = 0

  static async getDatabaseFile({ environment }): Promise<string> {
    return path.join(
      process.cwd(),
      environment.production ? '.production' : '.development',
      'count.json'
    )
  }

  static async getCount({ environment }: NullstackServerContext): Promise<number> {
    const databaseFile = await this.getDatabaseFile()
    if (existsSync(databaseFile)) {
      const json = readFileSync(databaseFile, 'utf-8')
      return JSON.parse(json).count
    }
    return 0
  }

  async initiate() {
    this.count = await this.getCount()
  }

  static async setCount({ environment, count }: NullstackServerContext<SetCountProps>) {
    const databaseFile = await this.getDatabaseFile()
    const json = JSON.stringify({ count })
    return writeFileSync(databaseFile as string, json)
  }

  increment() {
    this.count++
    this.setCount({ count: this.count })
  }

  render() {
    return <button onclick={this.increment}>this.count = {this.count}</button>
  }

}

export default Counter
