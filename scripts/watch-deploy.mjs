import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chokidar from 'chokidar'
import { deployBegetFlat } from './deploy-beget.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const watchPaths = [
  path.join(root, 'src'),
  path.join(root, 'index.html'),
  path.join(root, '.env.production'),
]

let timer = null
let running = false
let queued = false

async function runDeploy() {
  if (running) {
    queued = true
    return
  }

  running = true
  console.log('\n--- Сборка и загрузка на Beget ---')

  try {
    await deployBegetFlat()
    console.log('--- Готово ---\n')
  } catch (error) {
    console.error('Ошибка деплоя:', error.message || error)
  } finally {
    running = false
    if (queued) {
      queued = false
      scheduleDeploy()
    }
  }
}

function scheduleDeploy() {
  clearTimeout(timer)
  timer = setTimeout(runDeploy, 1200)
}

console.log('Автодеплой включён. Следим за изменениями в src/')
console.log('Ctrl+C — остановить\n')

chokidar
  .watch(watchPaths, {
    ignoreInitial: true,
    ignored: [/node_modules/, /dist/, /xristou7-site-flat/],
  })
  .on('all', (event, filePath) => {
    console.log(`Изменение: ${path.relative(root, filePath)} (${event})`)
    scheduleDeploy()
  })

runDeploy()
