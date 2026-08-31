<?php

$origem = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origem === 'https://improved-yodel-r49xpxvq99jwcwx64-4200.app.github.dev') {
    header("Access-Control-Allow-Origin: $origem");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dados = json_decode(file_get_contents('php://input'), true);

$email = trim($dados['email'] ?? '');
$senha = $dados['senha'] ?? '';

if ($email === '' || $senha === '') {
    http_response_code(400);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'E-mail e senha são obrigatórios.'
    ]);

    exit;
}

$sql = 'SELECT id, nome, email, senha FROM usuarios WHERE email = :email LIMIT 1';

$stmt = $pdo->prepare($sql);

$stmt->execute([
    ':email' => $email
]);

$usuario = $stmt->fetch();

if (!$usuario || !password_verify($senha, $usuario['senha'])) {

    http_response_code(401);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'E-mail ou senha inválidos.'
    ]);

    exit;
}

echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Login realizado com sucesso!',
    'usuario' => [
        'id' => $usuario['id'],
        'nome' => $usuario['nome'],
        'email' => $usuario['email']
    ]
]);

