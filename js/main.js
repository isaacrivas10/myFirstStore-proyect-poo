function log(){
    var
        l= document.getElementById('btn-login'),
        s= document.getElementById('btn-signin'),
        p= document.getElementById('btn-profile')
    ;
    
    if (l.classList.contains('invisible') & s.classList.contains('invisible')){
        l.classList.remove('invisible');
        s.classList.remove('invisible');
        p.classList.add('invisible');
    } else {
        p.classList.remove('invisible');
        l.classList.add('invisible');
        s.classList.add('invisible');
    }
}