
const fs = require('fs');
const compiler = require('./utils/handlebars');
const templates = require('./templates');
const mdWriter = require('./utils/mdWriter');



exports.handler = async event => {
  if(event.httpMethod==='GET'){
    const homePage = fs.readFileSync('./templates/index.html', 'utf-8');
    return {
        statusCode: 200,
        body: homePage,
        headers:{
          'Content-Type':'text/html'
        }
    };
    }else if(event.httpMethod==='POST'){

    const mdText = mdWriter(JSON.parse(event.body))
    const compile = compiler(templates.download)
    const message = compile({ 'mdFileText': mdText });
    return{
      statusCode:200,
      body: message,
      headers:{
          'Content-Type':'text/html'
        }
    }
    };
}
