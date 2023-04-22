import Nullstack from 'nullstack'

import { existsSync, readFileSync, writeFileSync } from 'fs'

class Counter extends Nullstack {

  count = 0

  static async getDatabaseFile({ environment }) {
    return path.join(
      process.cwd(),
      environment.production ? '.production' : '.development',
      'count.json'
    )
  }

  static async getCount() {
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

  static async setCount({ count }) {
    const databaseFile = await this.getDatabaseFile()
    const json = JSON.stringify({ count })
    return writeFileSync(databaseFile, json)
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
