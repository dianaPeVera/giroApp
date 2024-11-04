import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * Este archivo es exclusivo para web y se usa para configurar el HTML raíz para cada página web durante la renderización estática.
 * El contenido de esta función solo se ejecuta en entornos Node.js y no tiene acceso al DOM o a las APIs del navegador.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Desactivar el desplazamiento del cuerpo en la web. Esto hace que los componentes ScrollView funcionen más como lo hacen en nativo. */}
        <ScrollViewStyleReset />

        {/* Enlace a los estilos de Leaflet */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

        {/* Usando estilos CSS en bruto como una solución para asegurar que el color de fondo nunca parpadee en modo oscuro. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Agrega cualquier otro elemento <head> que quieras disponible globalmente en la web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

// Estilos de fondo responsivos
const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
