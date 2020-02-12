const utils = require('./utils.js');
let articles = require('./articles.json');

function getArticles(){
  let tableArr=['<table>'];
  tableArr.push('<tr><td>Title</td><td>Text</td><td>Author</td></tr>');
  for (var i = 0; i < articles.length; i++) {
    tableArr.push(`<tr><td>${articles[i].title}</td><td>${articles[i].text}</td><td>${articles[i].author}</td></tr>`);
  }
  tableArr.push('</table>');
  document.getElementById('container').innerHTML=tableArr.join('\n')
}
