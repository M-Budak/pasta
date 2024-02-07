<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = 'frescosinfoniapasta@gmail.com'; // Alıcı e-posta adresi
    $subject = $_POST['subject'];
    $message = "Ad Soyad: " . $_POST['name'] . "\n";
    $message .= "E-posta: " . $_POST['email'] . "\n";
    $message .= "Mesaj: " . $_POST['message'];

    $headers = "From: " . $_POST['email'];

    // E-postayı gönder
    if (mail($to, $subject, $message, $headers)) {
        echo "E-posta başarıyla gönderildi.";
    } else {
        echo "E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin.";
    }
} else {
    echo "Geçersiz istek.";
}
?>
