import Nullstack from 'nullstack';
import { existsSync, readFileSync, writeFileSync } from 'fs';

class Counter extends Nullstack {

  count = 0

  static async getCount({ environment }) {
    const databaseFile = `${environment.production ? '.production' : '.development'}/count.json`
    if (existsSync(databaseFile)) {
      const json = readFileSync(databaseFile, 'utf-8');
      return JSON.parse(json).count;
    } else {
      return 0;
    }
  }

  async initiate() {
    this.count = await this.getCount();
  }

  static async setCount({ environment, count }) {
    const databaseFile = `${environment.production ? '.production' : '.development'}/count.json`
    const json = JSON.stringify({ count });
    return writeFileSync(databaseFile, json);
  }

  async increment() {
    this.count++;
    await this.setCount({ count: this.count });
  }

  render() {
    return (
      <button onclick={this.increment} class="bg-pink-700 text-white py-4 w-full mt-4">
        this.count = {this.count}
      </button>
    )
  }

}

export default Counter;