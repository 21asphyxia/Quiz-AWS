<?php
class Database {
    public function __construct() {
        return new PDO('mysql:host=localhost;dbname=quizizy', 'root', '');
    }
}