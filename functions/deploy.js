import { dirname } from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';
import fs from 'fs';
import axios from 'axios';

const SCRIPT_DIR_NAME = dirname(fileURLToPath(import.meta.url));
const FUNCTION_ARCHIVE="functions.zip";
const FUNCTION_ID= process.env.FUNCTION_ID;

function createArchive() {
  const zip = AdmZip()
  zip.addLocalFolder(`${SCRIPT_DIR_NAME}/build/`, 'build')
  zip.addLocalFolder(`${SCRIPT_DIR_NAME}/node_modules/`, 'node_modules')
  zip.addLocalFile(`${SCRIPT_DIR_NAME}/package.json`)
  zip.writeZip(`${SCRIPT_DIR_NAME}/${FUNCTION_ARCHIVE}`)
}

async function getUploadLink(zipSize) {
  const config = {
    headers: {
      "X-Auth-Token": process.env.SECRET_KEY
    }
  }
  const response = await axios.get(`https://api.scaleway.com/functions/v1beta1/regions/${process.env.REGION}/functions/${FUNCTION_ID}/upload-url?content_length=${zipSize}`, config)
  return response.data;
}

async function uploadZip(uploadEndpoint) {
  const config = {
    headers: {
      ...uploadEndpoint.headers,
      "X-Auth-Token": process.env.SECRET_KEY
    }
  }

  const data = fs.readFileSync(`${SCRIPT_DIR_NAME}/${FUNCTION_ARCHIVE}`);
  const response = await axios.put(uploadEndpoint.url, data, config)
}

async function deploy() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": process.env.SECRET_KEY
    }
  }

  axios.post(`https://api.scaleway.com/functions/v1beta1/regions/fr-par/functions/${FUNCTION_ID}/deploy`, {}, config)
    .then(() => console.info('Function deployment launched'))
    .catch(() => console.error('Function deployment failed'))
}

async function main() {
  createArchive()
  const zipSize = fs.statSync(`${SCRIPT_DIR_NAME}/${FUNCTION_ARCHIVE}`).size;
  const uploadEndpoint = await getUploadLink(zipSize);
  uploadZip(uploadEndpoint);
  deploy();
}

main()
