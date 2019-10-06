/**
 * 
 * JS File For User Information Retriever
 * 
 */
// Send img to server and validation
$(function() {
    $("input:file").change(function (){
        var fd= new FormData();
        var file = $(this)[0].files[0];
        fd.append('img',file);

        $.ajax({
            url: '../ajax/',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                response= JSON.parse(response,true);
                console.log(response);
                if(response['status'] == 200){
                    $("#usr-img").attr('src','../ajax/'+response['file']); // Display image element
                }else{
                    alert('Invalid image file');
                }
            },
        });
    });
  });
  

function getUserData(id){
    $.ajax({
        type: 'GET',
        url: '../ajax/',
        dataType: 'json',
        data: `userID=${id}`,
        success: function(res){
          userData= res;
          loadContent();
          load.profileDashboard();
          $('#loading').fadeOut('slow');
        },
        error: function (err) {
            console.log('Error: ');
            console.log(err);
        }
    });
}

var userData= null;
userID= getCookie("sessionID");
if (userID != "") {
    getUserData(userID);
} else {
    setTimeout(
        function(){
            $('.text-success').toggle('invisible');
        },
        2000
    )
    setTimeout(
        function(){
            $('.text-danger').removeClass('invisible');
        },
        2000
    )
    setTimeout(
        function(){
            window.location.href= '../index.html';
        },
        3000
    )
}


