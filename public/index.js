import * as articles from './articles.js';

function getArticles(){
  var tableArr=['<table>'];
  tableArr.push('<tr><td>Title</td><td>Text</td><td>Author</td></tr>');
  for (var i = 0; i < articles.articles.length; i++) {
    tableArr.push(`<tr><td>${articles[i].title}</td><td>${articles[i].text}</td><td>${articles[i].author}</td></tr>`);
  }
  tableArr.push('</table>');
  document.getElementById('container').innerHTML=tableArr.join('\n')
}
