/**
 * 
 *  JS File for Product Information Retriever
 * 
 */

 
tempImg= null;
categorues= null;
 
 // Send img to server and validation
function loadImg(input, imgTag){
    var fd= new FormData();
    var file = input[0].files[0];
    fd.append('img',file);

    console.log('ajax started');
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
                tempImg= response['file'];
                imgTag.attr('src','../ajax/'+response['file']); // Display image element
            }else{
                alert('Invalid image file');
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
    console.log('done');
}

function setProduct(data){
    if(tempImg){
        data= data+'&form=product&img='+tempImg+'&vendor='+userID;
        postAJAX(data);
        setTimeout(
            ()=>{
                updateUserData(userData);
            }, 2000
        );
    } else {
        alert('Image Required');
    }    
}

function postAJAX(data){
    $.ajax({
        type: 'POST',
        url: '../ajax/',
        dataType: 'json',        
        data: data,
        success: function(res){
            console.log(res);
            pr= userData.enterpriseInfo.products;
            if (pr){
                userData.enterpriseInfo.products.push(res['productID']);
            } else {
                userData.enterpriseInfo.products= [res['productID']];
            }
        },
        error: function (err) {
            console.log('Error: ');
            console.log(err);
        }
    });
}

// Obtenemos las categorias en tiempo real
(()=>{
    $.ajax({
        type: 'GET',
        url: '../ajax/',
        dataType: 'json',
        data: 'category=all',
        success: function(res){
            for (let i=0; i<res.length; i++){
                $('#category').append(
                    `<option value="${res[i]}">${res[i]}</option>`
                )
            }
        },
        error: function (err) {
            console.log('Error: ');
            console.log(err);
        }
    });
})();