import fs from 'fs';
import path from 'path';

// Path to the build directory
const buildDir = path.resolve('build');
const filePath = path.join(buildDir, '404.html');

// Check if the file exists and then process it
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`404.html file not found at: ${filePath}`);
    return;
  }

  // Read the existing 404.html file
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading 404.html:', err);
      return;
    }

    // Clean up the HTML and inject dynamic redirect script
    const updatedHtml = data
      .replace(/<script[^>]*><\/script>/g, '') // Remove empty script tags
      .replace(/<link[^>]*>/g, '') // Remove all link tags
      .replace(/<div id="root"><\/div>/, '') // Remove the empty root div
      .replace(
        /<\/body>/, // Inject dynamic JS redirect before </body>
        `<script>
          (function() {
            const { origin, pathname } = window.location;
            const basePath = origin + pathname.split('/').slice(0, 2).join('/') + '/';
            window.location.replace(basePath);
          })();
        </script>\n</body>`
      );

    // Write the updated content back to 404.html
    fs.writeFile(filePath, updatedHtml, 'utf-8', (err) => {
      if (err) {
        console.error('Error writing to 404.html:', err);
      } else {
        console.log('Successfully updated 404.html with dynamic redirect');
      }
    });
  });
});
