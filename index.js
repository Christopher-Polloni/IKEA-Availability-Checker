const request = require('request');
const cheerio = require('cheerio')
const schedule = require('node-schedule');
const notifier = require('node-notifier');

const local_stores = {
    "Long Island, NY": 156,
    "Brooklyn, NY": 921,
    "Elizabeth, NJ": 154,
    "Paramus, NJ": 409
}
const region = 'us'
const locale = 'en'
const item_name = "Besta Shelf - black/brown"
const item_id = '40295528'
const availability_url = `http://www.ikea.com/${region}/${locale}/iows/catalog/availability/${item_id}`

const rule = new schedule.RecurrenceRule();
rule.minute = [0,15,30,45];
 
const job = schedule.scheduleJob(rule, function(){
    let storeResponses = []
    request(availability_url, function (error, response, body) {
        for (x in local_stores) {
            $ = cheerio.load(body);
            let stockCount = $('availability > localStore[buCode="' + local_stores[x] + '"] > stock > availableStock').text();
    
            storeResponses.push(`${stockCount} Item(s) in stock at ${x}\n`)
        }
        let message = ''
        for (x in storeResponses){
            message = message.concat(storeResponses[x])
        }

        notifier.notify({
            title: `IKEA Availability Checker - ${item_name}`,
            message: message,
            icon: './images/ikea.png'
          });
        
    });
});
