import Nullstack, { NullstackServerContext } from 'nullstack'

import * as fs from 'fs'
import * as path from 'path'

interface Counter {
  setCount(SetCountProps): void
  getCount(): Promise<number>
}

interface SetCountProps {
  count: number
}

class Counter extends Nullstack {

  count = 0

  static async getDatabaseFile(context?: NullstackServerContext) {
    const { environment } = context
    const folder = environment.production ? '.production' : '.development'
    return path.join(process.cwd(), folder, 'count.json')
  }

  static async getCount() {
    const databaseFile = await this.getDatabaseFile()
    if (fs.existsSync(databaseFile)) {
      const json = fs.readFileSync(databaseFile, 'utf-8')
      return JSON.parse(json).count
    }
    return 0
  }

  async initiate() {
    this.count = await this.getCount()
  }

  static async setCount({ count }) {
    const databaseFile = await this.getDatabaseFile()
    const json = JSON.stringify({ count })
    return fs.writeFileSync(databaseFile, json)
  }

  increment() {
    this.count++
    this.setCount({ count: this.count })
  }

  render() {
    return (
      <button onclick={this.increment} class="bg-pink-700 text-white py-4 w-full mt-4">
        this.count = {this.count}
      </button>
    )
  }

}

export default Counter
