<?php
    include "../include/session.php";
    include "../include/dbConnect.php";
 
    $memberId = $_POST['memberId'];
    $memberPw = sha1($_POST['memberPw']);
 
    $sql = "SELECT * FROM member WHERE id = '{$memberId}' AND password = '{$memberPw}'";
    $res = $dbConnect->query($sql);
 
    $row = $res->fetch_array(MYSQLI_ASSOC);
 
    if ($row != null) {
        $_SESSION['ses_userid'] = $row['id'];
        echo $_SESSION['ses_userid'].'님 안녕하세요';
        echo '<a href="/ITtimes/member/logout.php">로그아웃 하기</a>';
    }
 
    if($row == null){
        echo '로그인 실패 아이디와 비밀번호가 일치하지 않습니다.';
    }
?>