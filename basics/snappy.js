const snappy = require('snappy');

const result = snappy.compressSync('test');

console.log('------------', result.toString('base64'));

const data = snappy.uncompressSync(Buffer.from('BAx0ZXN0'));
console.log('-----data-------', data);
