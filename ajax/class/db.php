<?php
    require '../vendor/autoload.php';
    use Google\Cloud\Firestore\FirestoreClient;

    class Database{

        private $db;
        
        /**
         * Initialize Cloud Firestore with project ID.
            **/
        public function __construct(){
            $this->db = new FirestoreClient([
                'projectId' => 'honduras-dstore',
                'keyFilePath' => '../vendor/key/honduras-store-db-bdc3e9739245.json'
            ]);
        }

        public function addUser($data){
            $userRef= $this->db->collection('users');
            return $userRef->add($data)->id();
        }

        public function updateUser($id, $data){
            $userRef= $this->db->collection('users')
            ->document($id)->set($data);
        }

        public function checkUser($email, $password=null){
            $users= $this->db->collection('users');
            $query= $users->where('email', '=', $email);
            $matches= $query->documents();
            foreach($matches as $user){
                //Si se quiere obtener un ID se sumistra el password como param
                if ($password){
                    // Como solamente existe un usuario con ese correo
                    if ($user['password']==$password){
                        return $user->id();
                    } else {
                        return 3; // Contraseña incorrecta
                    }
                } else {
                    // Si llega aqui es por que existe un usuario con ese email
                    return $user;
                }
            }
            return false;
        }

        public function getUserDataByID($id){
            $users= $this->db->collection('users');
            return $users->document($id)->snapshot()->data();
        }

        public function getAllProductCategories(){
            $categories= $this->db
                ->collection('products')
                ->document('categories')
                ->collections();
            $a= array();
            foreach ($categories as $c){
                array_push($a,$c->id());
            }
            return $a;
        }

        public function setNewCategory($categoryName){
            $this->db->colection('products')
            ->document('categories')
            ->collection($categoryName)
            ->document($categoryName);
        }

        public function getProductsByCategory($category){
            $productsCollection= $this->db
                ->collection('products')
                ->document('categories')
                ->collection($category)
                ->listDocuments();
            $arr= array();
            foreach ($productsCollection as $product) {
                $arr[$product->id()]= $product->snapshot()->data();
            }
            return $arr;
        }

        public function getAllUserProducts($id){
            $data= $this->getUserDataByID($id);
            $products= $data['enterpriseInfo']['products'];
            $arr= array();
            foreach ($products as $prd) {
                array_push($arr, $this->db->document($prd)->snapshot()->data());
            }
            return $arr;
        }

        public function addProduct($data, $category){
            return $this->db
            ->collection('products')
            ->document('categories')
            ->collection($category)
            ->add($data)
            ->path();
        }

        public function deleteProduct($id, $category){
            $this->db
            ->collections('products')
            ->document('categories')
            ->collection($category)
            ->document($id)
            ->delete();
        }
    }
?>  
