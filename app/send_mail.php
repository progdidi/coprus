<?php

    require "PHPMailer/src/PHPMailer.php";
    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/SMTP.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

      

    $mail = new PHPMailer();
    $mail->IsSMTP(); 


    $mail->CharSet="UTF-8";
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPDebug = 1; 
    $mail->Port = 587 ; 

    $mail->SMTPSecure = "tls";  
    $mail->SMTPAuth = true; 
    $mail->IsHTML(true);

    $mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
    );

    //Authentication
    $mail->Username = "pididish25@gmail.com";
    $mail->Password = "auwbxazvjanagzzn";
    

    //Set Params
    $mail->SetFrom("pididish25@gmail.com");
    $mail->AddAddress("progdidi@gmail.com");


    $theme = "[Заявка с сайта]";
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $body = $name . ' ' . $email . ' ' . $message; 


    $mail->Subject = $theme;
    $mail->Body = $body;


    //  if(!$mail->Send()) {
    //     echo "Mailer Error: " . $mail->ErrorInfo;
    //  } else {
    //     echo "Message has been sent";
    //  }

      if (!$mail->send()) {
        $message = "Сообщение не отправлено";
    } else {
        $message = "Данные отправлены";
    }

    // $response = ["message"=> $message];
    // header('Content-type: application/json');
    // echo json_encode($response);

    