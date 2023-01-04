<?php
require_once '../../config/db.php';
class Answers extends Database {
    private $con; 
    public function __construct() {
        $this->con = parent::__construct();
    }
    public function getAnswers(){
        $sql = "SELECT questions.id,questions.question,answers.correct_answer,answers.explanation FROM answers
        INNER JOIN questions ON answers.question_id = questions.id";
        $stmt = $this->con->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}







if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $inc = json_decode($_POST['data']);
    $answers = new Answers();
    $data = $answers->getAnswers();
    foreach ($inc as $key => $value) {
        foreach ($data as $key2 => $value2) {
            if($value->question == $value2['id']){
                $inc[$key]->correct_answer = $value2['correct_answer'];
                $inc[$key]->explanation = $value2['explanation'];
                $inc[$key]->question = $value2['question'];
            }
        }
    }
    echo json_encode($inc);
}