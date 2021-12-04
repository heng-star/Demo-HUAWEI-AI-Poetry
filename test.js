const { handler } = require('./src/index');
const mockdata = require('./mock');
console.log(mockdata.httpMethod);
handler(mockdata).then(data => {
    console.log(data);
});
