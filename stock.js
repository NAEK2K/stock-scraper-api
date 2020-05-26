const got = require('got');
const cheerio = require('cheerio');

const express = require('express');
const app = express();
const port = 8080

const scrape = (async (ticker) => {
    try {
        let jsonRes = {}
        const response = await got(`https://web.tmxmoney.com/quote.php?qm_symbol=${ticker}`);
        const $ = cheerio.load(response.body);
        let price = $('span.price span').text();
        let change = $('strong.text-green').text().replace(/\s/g, '').split('(').map((x) => x.replace(')', '').replace('%', ''));
        if (change.length != 2) change = $('strong.text-red').text().replace(/\s/g, '').split('(').map((x) => x.replace(')', '').replace('%', ''));
        jsonRes.ticker = ticker;
        jsonRes.value = price;
        jsonRes.changeValue = change[0];
        jsonRes.changePercent = change[1];
        // jsonRes.positiveChange = !jsonRes.changeValue.includes('-');
        jsonRes.positiveChange = jsonRes.changeValue > 0
        return jsonRes
    } catch (e) {
        console.log(error.response.body);
    };
});



app.get('/ticker/:ticker', (req, res) => {
    scrape(req.params.ticker).then((results) => {
        res.send(results)
    })
})

app.listen(port)