<?php
require_once '../../config/db.php';
class Answers extends Database {
    private $con; 
    public function __construct() {
        $this->con = parent::__construct();
    }
    public function getAnswers(){
        $sql = "SELECT * FROM answers";
        $stmt = $this->con->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}