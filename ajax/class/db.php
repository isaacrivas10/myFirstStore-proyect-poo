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
                'projectId' => 'honduras-dstore'
            ]);
        }

        public function addUser($data){
            $userRef= $this->db->collection('users');
            $userRef->add($data);
        }

        public function checkUser($email, $password){
            $users= $this->db->collection('users');
            $query= $users->where('email', '=', $email);
            $matches= $query->documents();
            foreach($matches as $user){
                // Como solamente existe un usuario con ese correo
                if ($user['pass']==$password){
                    return $user->id();
                }
            }
            return false;
        }

        public function getUserDataByID($id){
            $users= $this->db->collection('users');
            return $users->document($id)->snapshot()->data();
        }
    }
?>  
