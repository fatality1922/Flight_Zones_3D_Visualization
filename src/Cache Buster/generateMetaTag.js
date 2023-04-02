const { writeFile } = require('fs/promises');

const path = require('path');
const packageJson = require(`${process.cwd()}/package.json`);
const moment = require('moment');

const metaJson = path.join(process.cwd(), 'public', 'meta.json');
const metaJsonSrc = path.join(
  process.cwd(),
  'src',
  'Cache buster',
  'meta.json'
);

const format = 'YYYY-MM-DD-HH:mm:ss';
const currentDate = moment().format(format);

const appVersion = packageJson.version + ' build: ' + currentDate;

const jsonData = {
  version: appVersion,
};

const jsonContent = JSON.stringify(jsonData);

const doWriteAndCopy = writeFile(metaJson, jsonContent, 'utf8')
  .then(writeFile(metaJsonSrc, jsonContent, 'utf8'))
  .then(() => {
    console.log(`meta.json file has been saved with v${appVersion}`);
  })
  .catch((err) => {
    console.error(
      'An error occurred while writing JSON Object to meta.json',
      err
    );
  });
Promise.allSettled([doWriteAndCopy]);
