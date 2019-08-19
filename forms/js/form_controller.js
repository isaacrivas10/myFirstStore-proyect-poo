
function transition(id,param){
    document.getElementById(id).classList.toggle('fade-out');
    setTimeout(function(){
        window.location.href= './?form='+param;
        $("[autofocus]").focus();
    }, 2000);
}

function fadeIn(element){
    let e= document.getElementById(element);
    e.classList.remove('invisible');
    e.classList.toggle('fade-in');
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