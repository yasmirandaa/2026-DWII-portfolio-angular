<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require __DIR__ . '/../conexao.php';

try {

    if (isset($_GET['id'])) {

        $stmt = $pdo->prepare("
            SELECT id, nome, descricao, tecnologias, link_github, ano
            FROM projetos
            WHERE id = :id AND status = 'publicado'
        ");

        $stmt->execute([
            'id' => $_GET['id']
        ]);

        $projeto = $stmt->fetch();

        if (!$projeto) {
            http_response_code(404);
            echo json_encode([
                "erro" => "Projeto não encontrado"
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        echo json_encode($projeto, JSON_UNESCAPED_UNICODE);
        exit;
    }

    $sql = "
        SELECT id, nome, descricao, tecnologias, link_github, ano
        FROM projetos
        WHERE status = 'publicado'
        ORDER BY ano DESC, id
    ";

    $projetos = $pdo->query($sql)->fetchAll();

    echo json_encode($projetos, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "erro" => "Erro interno no servidor"
    ], JSON_UNESCAPED_UNICODE);
}