import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const flatDir = path.join(root, 'xristou7-site-flat')
const distDir = path.join(root, 'dist')

const htaccess = `<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^cms/ - [L]
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
</IfModule>
`

export function buildBegetFlat({ skipViteBuild = false } = {}) {
  if (!skipViteBuild) {
    execSync('npm run build', { cwd: root, stdio: 'inherit' })
  }

  if (fs.existsSync(flatDir)) {
    fs.rmSync(flatDir, { recursive: true, force: true })
  }
  fs.mkdirSync(flatDir, { recursive: true })

  for (const name of ['index.html', 'favicon.svg', 'icons.svg']) {
    fs.copyFileSync(path.join(distDir, name), path.join(flatDir, name))
  }

  const assetsDir = path.join(distDir, 'assets')
  for (const file of fs.readdirSync(assetsDir)) {
    fs.copyFileSync(path.join(assetsDir, file), path.join(flatDir, file))
  }

  const js = fs.readdirSync(flatDir).find((f) => f.endsWith('.js'))
  const css = fs.readdirSync(flatDir).find((f) => f.endsWith('.css'))
  if (!js || !css) {
    throw new Error('Не найдены js/css в dist/assets')
  }

  let html = fs.readFileSync(path.join(flatDir, 'index.html'), 'utf8')
  html = html.replace(/\/assets\/[^"]+\.js/g, `/${js}`)
  html = html.replace(/\/assets\/[^"]+\.css/g, `/${css}`)
  fs.writeFileSync(path.join(flatDir, 'index.html'), html, 'utf8')

  fs.writeFileSync(path.join(flatDir, '.htaccess'), htaccess, 'ascii')

  return { flatDir, js, css }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { js, css } = buildBegetFlat()
  console.log(`Готово: xristou7-site-flat/`)
  console.log(`JS:  ${js}`)
  console.log(`CSS: ${css}`)
}
