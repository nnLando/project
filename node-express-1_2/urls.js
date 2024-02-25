
const fs = require('fs');
const axios = require('axios');
const { URL } = require('url');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function downloadAndSave(url) {
  try {
    const response = await axios.get(url);
    const { hostname } = new URL(url);
    const fileName = `${hostname}.txt`;

    await writeFileAsync(fileName, response.data);

    console.log(`Wrote to ${hostname}`);
  } catch (error) {
    console.error(`Couldn't download ${url}`);
  }
}

async function processUrlsFile(fileName) {
  try {
    const data = await readFileAsync(fileName, 'utf8');
    const urls = data.split('\n').filter(Boolean); // Filter out empty lines

    // Start all downloads at once
    const downloadPromises = urls.map(downloadAndSave);
    await Promise.all(downloadPromises);
  } catch (error) {
    console.error(`Error reading file ${fileName}: ${error.message}`);
    process.exit(1); // Exit with an error code
  }
}

// Check if the script is called with the correct argument
if (process.argv.length !== 3) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1); // Exit with an error code
}

const fileName = process.argv[2];
processUrlsFile(fileName);

