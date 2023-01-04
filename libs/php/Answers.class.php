<?php
require_once '../../config/db.php';
class Answers extends Database {
    private $con; 
    public function __construct() {
        $this->con = parent::__construct();
    }
    public function getAnswers(){
        $sql = "SELECT questions.question,answers.correct_answer,answers.explanation FROM answers
        INNER JOIN questions ON answers.question_id = questions.id";
        $stmt = $this->con->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $answers = new Answers();
    echo json_encode($answers->getAnswers());
}