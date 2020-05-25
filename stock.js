const got = require('got');
const cheerio = require('cheerio');

const scrape = (async (ticker) => {
    try {
        let jsonRes = {}
        const response = await got(`https://web.tmxmoney.com/quote.php?qm_symbol=${ticker}`);
        const $ = cheerio.load(response.body);
        let price = $('span.price span').text();
        let change = $('strong.text-green').text().replace(/\s/g, '').split('(').map((x) => x.replace(')', '').replace('%', ''));
        if(change.length != 2) change = $('strong.text-red').text().replace(/\s/g, '').split('(').map((x) => x.replace(')', '').replace('%', ''));
        jsonRes.ticker = ticker;
        jsonRes.value = price;
        jsonRes.changeValue = change[0];
        jsonRes.changePercent = change[1];
        jsonRes.positiveChange = !jsonRes.changeValue.includes('-');
        return jsonRes
    } catch (e) {
        console.log(error.response.body);
    };
});