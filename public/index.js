function getArticles(){
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //var tableArr=['<table>'];
      //tableArr.push('<tr><td>Title</td><td>Text</td><td>Author</td></tr>');
      //for (var i = 0; i < this.responseText.length; i++) {
        //tableArr.push(`<tr><td>${this.responseText[i].title}</td><td>${this.responseText[i].text}</td><td>${this.responseText[i].author}</td></tr>`);
      //}
      //tableArr.push('</table>');
      //document.getElementById('container').innerHTML=tableArr.join('\n')
      document.getElementById('container').innerHTML = this.responseText;
    }
  };

  xhr.open('POST', 'api/articles/readall', false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({sortField:"id", sortOrder:"ASC", page: 1, limit: 3, includeDeps:false}));
}

getArticles();
