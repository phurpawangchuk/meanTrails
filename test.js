const fs = require('fs');
/*
queueMicrotask(() => console.log('microtask'));
setImmediate(() => { console.log('immediate'); });
setTimeout(() => { console.log('timeout'); }, 0);
// const data = fs.readFile('./test.js', 'utf8');
// console.log(data);
fs.readFile('./test.js', () => { console.log('readfile'); });
process.nextTick(() => console.log('nexttick'));
console.log('end');
*/

console.log('Start');

setTimeout(() => {
    console.log('Timeout 1');
}, 0);

setTimeout(() => {
    console.log('Timeout 2');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise 1');
}).then(() => {
    console.log('Promise 2');
});

console.log('End');
