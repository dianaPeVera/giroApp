import chalk from 'chalk';
import { promises as fs } from 'fs';

const { readFile, writeFile, copyFile } = fs;

console.log(chalk.green('here'));

function log(...args: any[]) {
  console.log(chalk.yellow('[react-native-maps]'), ...args);
}

const reactNativeMaps = async () => {
  log('📦 Creating web compatibility of react-native-maps using an empty module loaded on web builds');
  const modulePath = 'node_modules/react-native-maps';

  try {
    // Crear un archivo index.web.js que exporta un módulo vacío
    await writeFile(`${modulePath}/lib/index.web.js`, `module.exports = {}`, 'utf-8');

    // Copia la definición de tipos para la plataforma web
    await copyFile(`${modulePath}/lib/index.d.ts`, `${modulePath}/lib/index.web.d.ts`);

    // Lee y modifica el package.json de react-native-maps
    const pkgPath = `${modulePath}/package.json`;
    const pkgData = await readFile(pkgPath, 'utf-8');
    const pkg = JSON.parse(pkgData);

    // Actualiza las entradas para las plataformas web y nativas
    pkg['react-native'] = 'lib/index.js';
    pkg['main'] = 'lib/index.web.js';

    // Escribe los cambios en el package.json de react-native-maps
    await writeFile(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
    log('✅ script ran successfully');
  } catch (error) {
    console.error(chalk.red('[Error in postinstall script]'), error);
  }
};

reactNativeMaps();
