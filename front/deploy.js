const mime = require('mime');
const fs = require('fs');
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

const BUILD_PATH = './build';

const client = new S3Client({
  region: 'fr-par',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  },
  endpoint: `https://${process.env.DOMAIN}`
});

const upload = async (filename) => {
  const content = fs.readFileSync(filename);
  const key = filename.replace(`${BUILD_PATH}/`, '');
  const mimeType = mime.getType(filename);

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: content,
    ACL: 'public-read',
    StorageClass: 'ONEZONE_IA',
    ContentType: mimeType,
    ContentLength: content.length
  });

  try {
    const response = await client.send(command);
    console.log(`Uploaded ${key}`);
  } catch (err) {
    console.error(`Error while uploading ${key} ${err}`);
  }
};

function listBuiltFiles(path) {
  const elements = fs.readdirSync(path);
  for (const element of elements) {
    const elementPath = `${path}/${element}`;
    if (fs.statSync(elementPath).isDirectory()) {
      listBuiltFiles(elementPath)
    } else if (fs.statSync(elementPath).isFile()) {
      upload(elementPath)
    }
  }
}

listBuiltFiles(BUILD_PATH);
