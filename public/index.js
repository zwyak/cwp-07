var $pagination = $('#pagination'),
totalRecords = 0,
records = [],
displayRecords = [],
recPerPage = 5,
page = 1,
totalPages = 0;

// function getArticles(){
//   $.ajax({
//   type: "POST",
//   url: "api/articles/readall",
//   data: JSON.stringify({sortField:"id", sortOrder:"ASC", page: 1, limit: 5, includeDeps:false}),
//   success: function(data){
//     data = JSON.parse(data);
//     var markup = "";
//     for (var i = 0; i < data.items.length; i++) {
//       markup += "<tr><td>" + data.items[i].title +" </td><td>" + data.items[i].text + "</td><td>" + new Date(data.items[i].date).toString()+ "</td><td>" +data.items[i].author +"</td></tr>";
//     }
//     $("#articles tbody").append(markup);
//   }
// });
// }

function generate_table() {
      var tr;
      $('#arBody').html('');
      for (var i = 0; i < displayRecords.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + displayRecords[i].title + "</td>");
            tr.append("<td>" + displayRecords[i].text + "</td>");
            tr.append("<td>" + new Date(displayRecords[i].date).toString() + "</td>");
            tr.append("<td>" + displayRecords[i].author + "</td>");
            $('#arBody').append(tr);
      }
}

function apply_pagination() {
      $pagination.twbsPagination({
            totalPages: totalPages,
            visiblePages: 1,
            onPageClick: function (event, page) {
                  displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
                  endRec = (displayRecordsIndex) + recPerPage;

                  displayRecords = records.slice(displayRecordsIndex, endRec);
                  generate_table();
            }
      });
}

$.ajax({
      type: "POST",
      url: "api/articles/readall",
      data: JSON.stringify({}),
      success: function (data) {
                  records = JSON.parse(data);
                  totalRecords = records.length;
                  totalPages = Math.ceil(totalRecords / recPerPage);
                  apply_pagination();
      }
});
