<?php
require_once 'db.php';

$errorMessage = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $phoneNumber = $_POST['phoneNumber'];

    // Perform any necessary validation on the input fields

    // Insert the user's information into the database
    $insert = "INSERT INTO useraccounts (firstName, lastName, email, password, phoneNumber) VALUES ('$firstName', '$lastName', '$email', '$password', '$phoneNumber')";
    $result = mysqli_query($connect, $insert);

    if ($result) {
        // Redirect the user to a success page or perform any other actions
        echo '<script>alert("Sign Up Successful! You can now login."); window.location.replace("../html/login.html");</script>';
        exit; // Prevent further execution of the script
    } else {
        // Handle any errors that occur during the database operation
        $errorMessage = "Sign Up Failed. Please try again later.";
    }
}

mysqli_close($connect);
?>

