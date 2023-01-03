<?php
require_once '../../config/db.php';
class Results extends Database {
    private $date;
    private $ip;
    private $score;
    private $os;
    private $browser;
    private $con;
    
    private function getBrowser(){
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $browser = "Unknown Browser";
        $browser_array = array(
            '/chrome/i'     => 'Chrome',
            '/opera/i'      => 'Opera',
            '/firefox/i'    => 'Firefox',
            '/safari/i'     => 'Safari',
            '/edge/i'       => 'Edge',
            '/msie/i'       => 'Internet Explorer',
            '/mobile/i'     => 'Mobile'
        );
        foreach ($browser_array as $regex => $value) { 
            if (preg_match($regex, $user_agent)) {
                $browser = $value;
            }
        }
        return $browser;
    }

    private function getOS(){
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $browser = "Unkown OS";
        $browser_array = array(
            '/windows nt 10/i'      => 'Windows 10',
            '/windows nt 6.3/i'     => 'Windows 8.1',
            '/windows nt 6.2/i'     => 'Windows 8',
            '/windows nt 6.1/i'     => 'Windows 7',
            '/windows nt 6.0/i'     => 'Windows Vista',
            '/windows nt 5.2/i'     => 'Windows Server 2003/XP x64',
            '/windows nt 5.1/i'     => 'Windows XP',
            '/windows xp/i'         => 'Windows XP',
            '/windows nt 5.0/i'     => 'Windows 2000',
            '/windows me/i'         => 'Windows ME',
            '/win98/i'              => 'Windows 98',
            '/win95/i'              => 'Windows 95',
            '/win16/i'              => 'Windows 3.11',
            '/macintosh|mac os x/i' => 'Mac OS X',
            '/mac_powerpc/i'        => 'Mac OS 9',
            '/linux/i'              => 'Linux',
            '/ubuntu/i'             => 'Ubuntu',
            '/iphone/i'             => 'iPhone',
            '/ipod/i'               => 'iPod',
            '/ipad/i'               => 'iPad',
            '/android/i'            => 'Android',
            '/blackberry/i'         => 'BlackBerry',
            '/webos/i'              => 'Mobile'
        );
    }

    public function __construct() {
        $this->con = parent::__construct();
        $this->date = date('Y-m-d H:i:s');
        $this->ip = $_SERVER['REMOTE_ADDR'];
        $this->os = $this->getOS();
        $this->browser = $this->getBrowser();   
    }

    public function saveResult($score){
        $this->score = $score;
        $sql = "INSERT INTO results (date, ip, score, os, browser) VALUES (:date, :ip, :score, :os, :browser)";
        $stmt = $this->con->prepare($sql);
        $stmt->execute(['date' => $this->date, 'ip' => $this->ip, 'score' => $this->score, 'os' => $this->os, 'browser' => $this->browser]);
    }
}