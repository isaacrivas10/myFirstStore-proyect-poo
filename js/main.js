function userLogged(){
    $('#btn-login').toggle('invisible');
    $('#btn-signin').toggle('invisible');
    $('#btn-profile').removeClass('invisible')
}

(()=>{
   loadProducts();
   if (checkCookie('sessionID')){
       userLogged();
   }
})();