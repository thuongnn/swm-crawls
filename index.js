let Crawler = require("crawler");
let fs = require('fs');
let urls = [];

let c = new Crawler({
    maxConnections: 99999,
    rateLimit: 1000,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            let $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            let question = `${$('.entry-content').find('b').first().text()} | ${$('.hidden-div').find('b').text().substring(3)}\n`;
            console.log(question);
            fs.appendFileSync('swmCrawl.txt', question);
        }
        done();
    }
});

for (let i = 85; i <= 100; i++) {
    urls.push(`https://pmpexamforfree.com/pmp-exam-set-g-q${i}/`)
}

c.queue(urls);