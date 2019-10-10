<?php

    require 'class/db.php';
    require 'class/product.php';
    require 'class/user.php';

    $status=[
        'ok'=> 1,
        'userExists'=> 2,
        'invalidPassword'=> 3,
        'userNotExists' => 4
    ];


    $db= new Database();

    function echoF($arr){
        echo '<pre>';
        echo var_dump($arr);
        echo '</pre>';
    }

    if (isset($_POST['form'])){
        $form= $_POST['form'];
        unset($_POST['form']);
        if ($form=='login'){
            $id = $db->checkUser($_POST['email'], $_POST['password']);
            // if exists
            if ($id && $id!=3){
                $confirmation= [
                    'userID'=>$id
                ];                   
            } else {
                $confirmation= [
                    'error'=>''
                ];
                if ($id == 3){
                    $confirmation['error']= $status['invalidPassword'];
                } else {
                    $confirmation['error']= $status['userNotExists'];
                }
            }
            echo json_encode($confirmation);
        }
        if ($form=='signin'){
            $_POST['name']= [
                'first'=>$_POST['firstName'],
                'last'=>$_POST['lastName']
            ];
            unset($_POST['firstName']);
            unset($_POST['lastName']);            
            $usr= new User($_POST);
            $checker= $db->checkUser($usr->email);
            if ($checker == false){
                $confirmation= [
                    'userID'=>$db->addUser($usr->toArray())
                ];                
            } else {
                $confirmation= [
                    'error'=>$status['userExists']
                ];
            }
            echo json_encode($confirmation);
        }
        if ($form=='product'){            
            $product = new Product($_POST);
            // Movemos la imagen de la carpeta temporal a su ubicacion final
            $product_img = 'upload/products/'.pathinfo($product->img, PATHINFO_FILENAME);
            copy($product->img, $product_img);
            $product->img= $product_img;
            $id= $db->addProduct($product->toArray(), $product->category);
            $confirmation= [
                'productID'=> $id
            ];
            echo json_encode($confirmation);
        }
    }

    if (isset($_GET['userID'])){
        echo json_encode($db->getUserDataByID($_GET['userID']));
    }

    if (isset($_GET['category']) && $_GET['category']=='all'){
        echo json_encode($db->getAllProductCategories());
    }

    if (isset($_GET['category']) && $_GET['category']!='all'){
        echo json_encode($db->getProductsByCategory($_GET['category']));
    }

    if (isset($_GET['category']) && isset($_GET['id'])){
        echo json_encode($db->getAllUserProducts($_GET['id']));
    }

    if ($_SERVER['REQUEST_METHOD'] =='PUT' && isset($_GET['id'])){
        $_PUT=array();
        if ($_SERVER['REQUEST_METHOD'] == 'PUT')
            parse_str(file_get_contents("php://input"), $_PUT); //Convierte de URLEncoded a Arreglo Asociativo
        
        $user= new User($db->getUserDataByID($_GET['id']));
        $data= array_merge($user->toArray(), $_PUT);
        echo json_encode($data);
        $db->updateUser($_GET['id'], $data);
    }

    if (isset($_FILES['img'])){
        $filename = $_FILES['img']['name'];

        $name= substr(md5(rand()), 0, 25);

        $response=[
            'status'=> 0,
            'file'=> null,
            'error'=> ''
        ];

        $location = "upload/temp/".$filename;

        $imageFileType = pathinfo($location,PATHINFO_EXTENSION);

        // Valid Extensions 
        $valid_extensions = array("jpg","jpeg","png");
        //Set a temporal location

        // Check file extension 
        if( !in_array(strtolower($imageFileType),$valid_extensions)) {
            $response['error']= 'Invalid File';
            $response['status']= 409;
        }

        $location = "upload/temp/".$name;

        if ($response['status']!=409){
            // File validated and secured
            // Upload file
            if(move_uploaded_file($_FILES['img']['tmp_name'],$location)){
                $response['file']= $location;
                $response['error']= 'none';
                $response['status']= 200;
                echo json_encode($response);
            }else{
                $response['error']= 'Could not move file to temporary location';
                echo json_encode($response);
            }
        } else{
            echo json_encode($response);
        }
    }
?>