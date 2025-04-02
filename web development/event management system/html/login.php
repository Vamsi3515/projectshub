<?php
require_once 'db.php';

$errorMessage = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $select = "SELECT * FROM useraccounts WHERE email = '$username' AND password = '$password'";
    $result = mysqli_query($connect, $select);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            echo '<script>';
            echo 'alert("Login Successful! Click ok to continue...");';
            echo 'window.location.replace("../html/index.html");';
            echo '</script>';
        } else {
            $errorMessage = "Invalid Username or Password";
        }
    } else {
        echo '<script>alert("Login Failed");</script>';
    }
}

mysqli_close($connect);
?>
