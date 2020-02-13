function getArticles(){
  $.ajax({
  type: "POST",
  url: "api/articles/readall",
  data: JSON.stringify({sortField:"id", sortOrder:"ASC", page: 1, limit: 5, includeDeps:false}),
  success: function(data){
    data = JSON.parse(data);
    var markup = "";
    for (var i = 0; i < data.items.length; i++) {
      markup += "<tr><td>" + data.items[i].title +" </td><td>" + data.items[i].text + "</td><td>" + new Date(data.items[i].date).toString()+ "</td><td>" +data.items[i].author +"</td></tr>";
    }
    $("#articles tbody").append(markup);
  }
});
}

getArticles();
