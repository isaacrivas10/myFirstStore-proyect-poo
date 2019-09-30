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

(()=>{
    for(i=0; i<10;i++){
        $("#products").append(
            `<div class="col-lg-4 col-md-6 mb-4">
            <div class="product">
                <div class="product-img">
                    <img src="img/bmw.jpg" alt="">
                    <div class="product-label">
                        <span class="sale">-30%</span>
                        <span class="new">NUEVO</span>
                    </div>
                </div>
                <div class="product-body">
                    <p class="product-category">Categoria</p>
                    <h3 class="product-name"><a href="#">Nombre del Prducto</a></h3>
                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                    <div class="product-rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <div class="product-btns">
                        <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">agregar a la lista de deseos</span></button>
                        <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">compara</span></button>
                        <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">vista rapida</span></button>
                    </div>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>al carrito!</button>
                </div>
            </div>
        </div>`
            )
    }
})();