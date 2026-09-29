const fs = require('fs');
const https = require('https');

const apiKey = process.env.POSTMAN_API_KEY;
const workspaceId = process.env.POSTMAN_WORKSPACE_ID;

if (!apiKey) {
  console.error('Vui lòng cài d?t bi?n môi tru?ng POSTMAN_API_KEY tru?c khi ch?y.');
  process.exit(1);
}

const collectionData = JSON.parse(fs.readFileSync('./postman/Student-Management-API.postman_collection.json', 'utf8'));
const payload = JSON.stringify({ collection: collectionData });
const apiPath = workspaceId ? /collections?workspace= : '/collections';

const req = https.request({
  hostname: 'api.getpostman.com',
  path: apiPath,
  method: 'POST',
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', (err) => console.error(err));
req.write(payload);
req.end();
