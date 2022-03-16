const request = require('request');
const options = {
    url:'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-google-client'
    }
};

request(options,function(err,res,body){
 let json=JSON.parse(body)
    console.log(json);
});
