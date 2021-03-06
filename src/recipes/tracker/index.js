import { Observable } from 'rxjs'

export const plugins = ['gdax', 'twitter', 'media']

const dataDir = `${process.cwd()}/.data`
const getFileDate = date =>
  date.toLocaleDateString('en-US').split('/').reverse().join('-')

export default async ({
  dependencies: { fs, log },
  events,
} = {}) => {
  Observable.fromEvent(events, 'gdax.TRADE')
    .subscribe(({ exchange, trade: { trade_id, side, size, price, product_id, time } }) => {
      log.trace('track', JSON.stringify({ price, product_id }))
      const file = `${dataDir}/tracker-${getFileDate(new Date())}.csv`
      const line = [trade_id, exchange, side, size, price, product_id, time].join(',') // eslint-disable-line camelcase
      fs.ensureDir(dataDir)
        .then(() => fs.appendFile(file, `${line}\n`, 'utf8'))
        .catch(err => log.error(err))
    })
}
