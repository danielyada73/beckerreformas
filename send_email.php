<?php
/**
 * Becker Reformas - Lead Handler
 * Sent from: hopecompany.com.br
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = strip_tags(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST['phone']));
    $service = strip_tags(trim($_POST['service']));
    $location = strip_tags(trim($_POST['location']));
    $message = strip_tags(trim($_POST['message']));

    // User Metadata
    $ip = $_SERVER['REMOTE_ADDR'];
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $date = date('d/m/Y H:i:s');

    // Recipients
    $to = 'contato.yadastudio@gmail.com, beckerluciano09@gmail.com';
    
    // Subject
    $subject = 'Orçamento Rápido - Site Becker';

    // Headers
    $headers = "From: Becker Reformas <no-reply@hopecompany.com.br>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Email Body
    $body = "
    <html>
    <head>
        <style>
            body { font-family: sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 20px auto; border: 1px solid #eee; padding: 20px; border-radius: 10px; }
            .header { background: #012D46; color: #fff; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
            .field { margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f4f4f4; }
            .label { font-weight: bold; color: #012D46; display: block; font-size: 12px; text-transform: uppercase; }
            .value { font-size: 16px; margin-top: 5px; }
            .footer { font-size: 11px; color: #999; margin-top: 30px; text-align: center; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Novo Lead: Becker Reformas</h2>
            </div>
            
            <div class='field'>
                <span class='label'>Nome Completo</span>
                <div class='value'>$name</div>
            </div>
            
            <div class='field'>
                <span class='label'>E-mail</span>
                <div class='value'>$email</div>
            </div>
            
            <div class='field'>
                <span class='label'>Telefone</span>
                <div class='value'>$phone</div>
            </div>
            
            <div class='field'>
                <span class='label'>Tipo de Serviço</span>
                <div class='value'>$service</div>
            </div>
            
            <div class='field'>
                <span class='label'>Localização da Obra</span>
                <div class='value'>$location</div>
            </div>
            
            <div class='field'>
                <span class='label'>Mensagem / Detalhes</span>
                <div class='value'>$message</div>
            </div>

            <div class='footer'>
                <p><strong>Informações Técnicas:</strong></p>
                <p>IP: $ip</p>
                <p>Data/Hora: $date</p>
                <p>Navegador: $user_agent</p>
                <p>Enviado via: hopecompany.com.br</p>
            </div>
        </div>
    </body>
    </html>
    ";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Orçamento enviado com sucesso!']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Erro ao enviar e-mail.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
}
