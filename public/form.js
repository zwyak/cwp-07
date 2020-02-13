$('#submit').click(function () {

    alert('Request was sent');

    $.ajax({
        type: "post",
        url: "/api/articles/create",
        data: JSON.stringify({title: $("#title").val(), text: $( "#text" ).val(), author: $("#author").val() }),
        success: function (data) {
          alert('Request was sent');
        }
      });
});
