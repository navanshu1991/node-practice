const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`

    console.log(log);
    fs.appendFile('server.log', log + "\n", (err) => {
        if(err){
            console.log('Error while logging to file');
        }
    })

    next();
});
app.use((request, response, next) => {
    response.render('maintainence.hbs');
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear(),
        welcomeMsg: 'Welcome to ExpressJS learning!'
    })
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (request, response) => {
    response.send({
        error: "This is an error message"
    });
});

app.listen(4000, () => {
    console.log('Server is up on port 4000');
});