<?php
// Database configuration
$servername = "localhost"; // Change this to your MySQL server hostname
$username = "your_username"; // Change this to your MySQL username
$password = "your_password"; // Change this to your MySQL password
$database = "your_database"; // Change this to your MySQL database name

// Create connection
$connect = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set UTF-8 encoding
mysqli_set_charset($connect, "utf8");

// Optionally, you can define other database-related functions or configurations here
?>
