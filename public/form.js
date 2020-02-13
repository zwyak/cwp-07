$('form').submit(function (e) {
    e.preventDefault();

    $.ajax({
        type: "post",
        url: "/api/articles/create",
        data: JSON.stringify({title: $("#title").val(), text: $( "#text" ).val(), author: $("#author").val() })
      });});
