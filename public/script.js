
$(function() {
console.log("file is loaded")
    $('#submit').on('click', function(event) {
        var movie = $('#movie').val();
    makeCall(movie);
});

    function makeCall(movie) {
        $.ajax(
          `http://www.omdbapi.com/?t=${movie}&apikey=5a994d12`,
        {
            success: function(data) {
                appendToDom(data);
                console.log(data);
            }
        });
    }

    function appendToDom(movie) {
       var $newdiv = $('<div>');
        var $result = $('#result');
        $('#title').attr({'value':`${movie.Title}`})
        $('#runtime').attr({'value':`${movie.Runtime}`})
        $('#imdb').attr({'value':`${movie.imdbID}`})
        $('#imdb2').attr({'value':`${movie.imdbID}`})
        
        
        $newdiv.text(movie.Title + " length: " + movie.Runtime);
        
        $result.append($newdiv);
       
        console.log(movie)
    }
    
$('.movie-form').submit(function (e){
    e.preventDefault()
    console.log("***SUBMITTED***")
    var data = $(this).serialize();
    $.ajax(
    {
        url: '/',
        data: data,
        type: 'POST',
        success: function(data){
            console.log(data);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
})

    // delete button;
    $("#delete").click(function(e) {
        // selecting the restaurant's id from hidden input
        e.preventDefault();
        const id = $("#movie_id").val();
        console.log(id);
        console.log(`Deleting id: ${id}`);
        // Prompt user before deleting
        const confirm = window.confirm("Are you sure you want to delete this?");
        if (confirm) {
            // execute if user selects okay
            $.ajax({
                url: `${id}`, // Path
                type: "DELETE",

                success: function(data) {
                    console.log("deleting ", data);
                    // redirect to restaurants list after deleting an individual restaurant
                    window.location.href = "/movies";
                },
                error: function(xhr, status, error) {
                    // add error handler
                }
            });
        }
    })

    $('#update').click(function(e) {

        e.preventDefault();
        const id = $("#movie_id").val();
        console.log('id', id);
        const data = $('#data').serialize();
        console.log(data)
        $.ajax({
            url: `${id}`,
            type: "PUT",
            data: data,
            
            success: data => {
                window.location.href = "/movies";
            }
        })
    })




}); // ends doc.ready