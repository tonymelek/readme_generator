const Handlebars = require('handlebars');

const compiler = template => {
    return Handlebars.compile(template);
}


module.exports = compiler