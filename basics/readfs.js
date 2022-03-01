import { readFileSync } from 'fs';
import data from '33.json';
const file = readFileSync('template.js');

console.log(file.toString('base64'));
// console.log(content);
const obj = JSON.parse(data.content);
console.log(obj.source);