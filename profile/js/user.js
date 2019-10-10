/**
 * 
 * JS File For User Information Retriever
 * 
 */

function ajax(method, url, data, success=null, error=null){
    $.ajax({
        type: method,
        url: url,
        dataType: 'json',
        data: data,
        success: success,
        error: error
    });
}

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

function updateUserData(data){
    $.ajax({
        type: 'PUT',
        url: '../ajax/index.php?id='+userID,
        dataType: 'json',
        data: data,
        success: function(res){
            console.log(res);
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
    );
    setTimeout(
        function(){
            $('.text-danger').removeClass('invisible');
        },
        2000
    );
    setTimeout(
        function(){
            window.location.href= '../index.html';
        },
        3000
    );
}


