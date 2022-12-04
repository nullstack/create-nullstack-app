import Nullstack from 'nullstack'

import { existsSync, readFileSync, writeFileSync } from 'fs'
import './Counter.css'

class Counter extends Nullstack {

  count = 0

  static async getCount({ environment }) {
    const databaseFile = `${environment.production ? '.production' : '.development'}/count.json`
    if (existsSync(databaseFile)) {
      const json = readFileSync(databaseFile, 'utf-8')
      return JSON.parse(json).count
    }
    return 0
  }

  async initiate() {
    this.count = await this.getCount()
  }

  static async setCount({ environment, count }) {
    const databaseFile = `${environment.production ? '.production' : '.development'}/count.json`
    const json = JSON.stringify({ count })
    return writeFileSync(databaseFile, json)
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
