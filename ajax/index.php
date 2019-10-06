<?php

    require 'class/db.php';
    require 'class/user.php';

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
            if ($id){
                $confirmation= [
                    'userID'=>$id
                ];
                echo json_encode($confirmation);    
            }
        }
        if ($form=='signin'){
            $_POST['name']= [
                'first'=>$_POST['firstName'],
                'last'=>$_POST['lastName']
            ];
            unset($_POST['firstName']);
            unset($_POST['lastName']);            
            $usr= new User($_POST);
            $db->addUser($usr->toArray());
            $confirmation= [
                'userID'=>$db->addUser($usr->toArray())->id()
            ];
            echo json_encode($confirmation);
        }
    }

    if (isset($_GET['userID'])){
        echo json_encode($db->getUserDataByID($_GET['userID']));
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