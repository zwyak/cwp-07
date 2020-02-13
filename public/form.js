$('#submit').click(function () {
    $.ajax({
        type: "post",
        url: "/api/articles/create",
        data: JSON.stringify({title: $("#title").val(), text: $( "#text" ).val(), author: $("#author").val() }),
        success: function (data) {
          alert('Success!');
        }
      });
});
