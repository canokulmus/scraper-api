const { exec } = require('child_process');

function runPythonScraper() {
  return new Promise((resolve, reject) => {
    // const command = `python ex.py`;
    const command = `python scraper.py`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }

      resolve(stdout);
    });
  });
}

module.exports = runPythonScraper;