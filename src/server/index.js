const express = require('express');
const { handler } = require('../../dist/index');
const mockData = require('../../mock');

const app = express();

app.post('/', async (req, res) => {
    const funcRes = await handler(mockData);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', 'GET,POST');
    res.send(funcRes.body);
});

app.listen('8088', () => {
    console.log('App listening to 8088...');
});
