
function transition(id,param){
    document.getElementById(id).classList.toggle('fade-out');
    $(id).addClass('invisible');
    setTimeout(function(){
        window.location.href= '?form='+param;
    }, 2000);
}

function fadeIn(element){
    let e= document.getElementById(element);
    e.classList.remove('invisible');
    e.classList.toggle('fade-in');
}

function completeLogin($id){
    setCookie('sessionID', $id, 1);
    window.location.href= '../index.html';
}

function postAJAX(data){
    $.ajax({
        type: 'POST',
        url: '../ajax/',
        dataType: 'json',
        data: data,
        success: function(res){
            console.log(res);
            completeLogin(res['userID']);
        },
        error: function (err) {
            console.log('Error: ');
            console.log(err);
        }
    });
}
function manageLogin(){
    if (validateEmail($('#log-email').val())){
        var data = $('#loginF').serialize()+'&form=login';
        console.log(data);
        postAJAX(data);
    } else {
        console.log('email wrong');
    }
}
function manageSignUp(){
    if (validateEmail($('#email').val())){
        if ($('#p1').val()==$('#p2').val()){
            var data = $('#signinF').serialize()+'&phone='+$("#phoneCode")+$('#phone')+'&form=signin';
            console.log(data);
            postAJAX(data);
        } else {
            console.log('pass not ok');
        }
    } else {
        console.log('not email');
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Toma el parametro de la URL al cargar 
// Segun el valor muestra el DIV correcto
document.addEventListener('DOMContentLoaded',function (){
    var params = {};
	var parser = document.createElement('a');
	parser.href = window.location.href;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	if (params['form']=='login'){
        fadeIn('loginForm');
    }
    else
        fadeIn('signupForm');
},false);