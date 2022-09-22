import Nullstack, { NullstackServerContext } from 'nullstack';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import './Counter.css';

interface Counter {
  setCount(SetCountProps): void
  getCount(): Promise<number>
}

interface SetCountProps {
  count: number
}

class Counter extends Nullstack {

  count = 0

  static async getCount({ environment }: NullstackServerContext): Promise<number> {
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

  static async setCount({ environment, count }: NullstackServerContext<SetCountProps>) {
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
      <button
        onclick={this.increment}>
        this.count = {this.count}
      </button>
    )
  }

}

export default Counter;