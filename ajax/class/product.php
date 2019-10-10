<?php

    class Product {

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