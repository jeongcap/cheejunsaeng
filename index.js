const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const API_KEY = require('./apiKey');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('webhook', (req, res) => {
    const companyToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.company ? req.body.result.parameters.company : 'KT'; //못찾으면 기본값(대부)
    const reqUrl = encodeURI(`http://www.saramin.co.kr/zf_user/search/company?searchword=${companyToSearch}&searchType=auto&go`);

    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
            const company = JSON.parse(completeResponse);
            let dataToSend = 'OK';

            return res.json({
                speech: dataToSend,
                displayText: dataToSend,
                source: ''
            });
        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: ''
        });
    });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});