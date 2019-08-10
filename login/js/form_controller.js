function fade(){
    var element= document.getElementById('signupForm');
    element.classList.add('fade-out');
    element.classList.add('invisible');
    var e= document.getElementById('loginForm');
    e.classList.remove('invisible');
    e.classList.add('fade-in');
}