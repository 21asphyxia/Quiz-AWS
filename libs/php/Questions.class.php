<?php
require_once '../../config/db.php';
class Questions extends Database {
    private $con; 
    public function __construct() {
        $this->con = parent::__construct();
    }
    public function getQuestions(){
        $sql = "SELECT * FROM questions";
        $stmt = $this->con->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $questions = new Questions();
    echo json_encode($questions->getQuestions());
}
?>