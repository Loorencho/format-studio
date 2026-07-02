import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { Client } from 'basic-ftp'
import { buildBegetFlat } from './build-beget-flat.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const deployEnvPath = path.join(root, '.env.deploy')

function loadDeployEnv() {
  if (!fs.existsSync(deployEnvPath)) {
    throw new Error(
      'Создайте файл .env.deploy (см. .env.deploy.example) с FTP-доступом к xristou7.beget.tech/public_html',
    )
  }
  dotenv.config({ path: deployEnvPath })
}

function getConfig() {
  const host = process.env.BEGET_FTP_HOST
  const user = process.env.BEGET_FTP_USER
  const password = process.env.BEGET_FTP_PASSWORD
  const remotePath = process.env.BEGET_FTP_REMOTE_PATH || '/'

  if (!host || !user || !password) {
    throw new Error('В .env.deploy задайте BEGET_FTP_HOST, BEGET_FTP_USER и BEGET_FTP_PASSWORD')
  }

  return { host, user, password, remotePath }
}

export async function deployBegetFlat({ flatDir, skipBuild = false } = {}) {
  loadDeployEnv()
  const config = getConfig()

  const buildResult = flatDir
    ? { flatDir }
    : buildBegetFlat({ skipViteBuild: skipBuild })

  const files = fs.readdirSync(buildResult.flatDir).filter((f) => fs.statSync(path.join(buildResult.flatDir, f)).isFile())

  const client = new Client(60_000)
  client.ftp.verbose = process.env.BEGET_FTP_VERBOSE === '1'

  try {
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: false,
    })

    await client.ensureDir(config.remotePath)
    await client.cd(config.remotePath)

    console.log(`FTP: ${config.user}@${config.host}${config.remotePath}`)

    for (const file of files) {
      const localPath = path.join(buildResult.flatDir, file)
      process.stdout.write(`↑ ${file} ... `)
      await client.uploadFrom(localPath, file)
      console.log('OK')
    }

    console.log(`Загружено файлов: ${files.length}`)
    if (buildResult.js) {
      console.log(`JS:  ${buildResult.js}`)
      console.log(`CSS: ${buildResult.css}`)
    }
  } finally {
    client.close()
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  deployBegetFlat().catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })
}
