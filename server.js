var express = require('express')
var logger = require('morgan')
var useragent = require('express-useragent')

var app = express()

app.use(logger('combined', {
  skip: (req, res) => { return res.statusCode < 400 }
}))
app.use(useragent.express())

app.get('*', (req, res) => {
    var ip = req.ip.split(':')
    var jsonObj = {
        ipaddress: ip[ip.length-1],
        language: req.get('Accept-Language').split(',')[0],
        software: req.useragent.os
    }
    res.send(JSON.stringify(jsonObj))
})

app.listen(process.env.PORT, function () {
  console.log('App listening on port '+process.env.PORT+'!');
});