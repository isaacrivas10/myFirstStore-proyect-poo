<?php

    class User{

        public $name= [
            'first'=> '',
            'last'=> ''
        ];
        public $email;
        public $phone;
        public $password;
        public $occupation;
        public $location;
        public $photo="upload/profile/user.jpg";
        public $socialMedia= [
            'facebook'=> null,
            'twitter'=> null,
            'whatsapp'=>null
        ];
        public $about;
        public $accountType;
        public $enterpriseInfo= [
            'products'=> null,
            'orders'=> null,
        ];
        public $map=[
            'lng'=>null,
            'lat'=> null,
        ];

        public function __construct(Array $properties=array()){
            foreach($properties as $key => $value){
              $this->{$key} = $value;
            }
        }

        public function toArray(){
           return json_decode(json_encode($this), true);
        }

    }

?>