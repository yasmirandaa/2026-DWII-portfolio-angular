<?php

header('Access-Control-Allow-Origin: https://improved-yodel-r49xpxvq99jwcwx64-4200.app.github.dev');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8'); // Garante header JSON no retorno

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Use POST.']);
    exit;
}

$dados = json_decode(file_get_contents('php://input'), true);

$nome = trim($dados['nome'] ?? '');
$email = trim($dados['email'] ?? '');
$mensagem = trim($dados['mensagem'] ?? '');

$erros = [];

if ($nome === '') $erros[] = 'O nome e obrigatorio.';

if ($email === '') $erros[] = 'O e-mail e obrigatorio.';
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $erros[] = 'O e-mail e invalido.';

if (mb_strlen($mensagem) < 10) $erros[] = 'Mensagem com 10+ caracteres.';

if (!empty($erros)) {
    http_response_code(400);
    echo json_encode(['erros' => $erros]);
    exit;
}

try {
    require __DIR__ . '/../conexao.php';

    $sql = 'INSERT INTO contatos (nome, email, mensagem) VALUES (:nome, :email, :mensagem)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':nome' => $nome, ':email' => $email, ':mensagem' => $mensagem]);

    http_response_code(201);
    echo json_encode([
        'sucesso'  => true,
        'id'       => (int) $pdo->lastInsertId(),
        'mensagem' => 'Contato recebido com sucesso!'
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro interno ao salvar no banco de dados.']);
}