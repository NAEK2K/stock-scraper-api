const got = require('got');
const cheerio = require('cheerio');

const scrape = (async (ticker) => {
    try {
        const response = await got(`https://web.tmxmoney.com/quote.php?qm_symbol=${ticker}`);
        const $ = cheerio.load(response.body);
        let price = $('span.price span').text();
        let change = $('strong.text-green').text().replace(/\s/g, '').split('(').map((x) => x.replace(')', '').replace('%', ''));
        if(change.length != 2) change = $('strong.text-red').text().replace(/\s/g, '').split('(').map((x) => x.replace(')', '').replace('%', ''));
        console.log(`Ticker: ${ticker}`)
        console.log(`Value: \$${price}`)
        console.log(`Change: \$${change[0]} (${change[1]}%)`)
    } catch (e) {
        console.log(error.response.body);
    };
});

scrape('WEED')