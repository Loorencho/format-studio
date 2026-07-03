import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { Client } from 'basic-ftp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: path.join(root, '.env.deploy') })

const host = process.env.BEGET_FTP_HOST || 'xristou7.beget.tech'
const user = process.env.BEGET_FTP_USER
const password = process.env.BEGET_FTP_PASSWORD

if (!user || !password) {
  console.error('Заполните BEGET_FTP_USER и BEGET_FTP_PASSWORD в .env.deploy (нужен xristou7_beget)')
  process.exit(1)
}

const htaccessLocal = path.join(root, 'wordpress', 'cms.htaccess')
const client = new Client(60_000)

try {
  await client.access({ host, user, password, secure: false })
  await client.cd('/cms')

  console.log('Удаляю cms/index.html ...')
  try {
    await client.remove('index.html')
    console.log('OK')
  } catch {
    console.log('index.html не найден (возможно уже удалён)')
  }

  console.log('Загружаю cms/.htaccess ...')
  await client.uploadFrom(htaccessLocal, '.htaccess')
  console.log('Готово. Проверьте wp-config и активируйте плагин (см. FIX-CMS.txt)')
} catch (error) {
  console.error(error.message || error)
  process.exit(1)
} finally {
  client.close()
}
