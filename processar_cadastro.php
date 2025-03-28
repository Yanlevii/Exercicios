<?php
// Definir o tipo de resposta como JSON
header('Content-Type: application/json');

// Obter os dados do formulário via POST
$nome = htmlspecialchars($_POST['nome'] ?? '', ENT_QUOTES, 'UTF-8');
$cpf = htmlspecialchars($_POST['cpf'] ?? '', ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES, 'UTF-8');
$telefone = htmlspecialchars($_POST['num'] ?? '', ENT_QUOTES, 'UTF-8');
$senha = htmlspecialchars($_POST['senha'] ?? '', ENT_QUOTES, 'UTF-8');
$confirmar_senha = htmlspecialchars($_POST['confirmar_senha'] ?? '', ENT_QUOTES, 'UTF-8');

// Variáveis para armazenar os erros
$erros = [];

// Validação dos campos

// Nome (verifica se não está vazio)
if (empty($nome)) {
    $erros[] = ['campo' => 'nome', 'mensagem' => 'O nome é obrigatório.'];
}

// CPF (verifica se não está vazio e se tem o formato correto)
if (empty($cpf)) {
    $erros[] = ['campo' => 'cpf', 'mensagem' => 'O CPF é obrigatório.'];
} elseif (!preg_match('/\d{3}\.\d{3}\.\d{3}-\d{2}/', $cpf)) {
    $erros[] = ['campo' => 'cpf', 'mensagem' => 'O CPF está no formato inválido.'];
}

// E-mail (verifica se não está vazio e se é um e-mail válido)
if (empty($email)) {
    $erros[] = ['campo' => 'email', 'mensagem' => 'O e-mail é obrigatório.'];
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $erros[] = ['campo' => 'email', 'mensagem' => 'O e-mail fornecido é inválido.'];
}

// Telefone (verifica se não está vazio e se tem o formato correto)
if (empty($telefone)) {
    $erros[] = ['campo' => 'telefone', 'mensagem' => 'O telefone é obrigatório.'];
} elseif (!preg_match('/\(\d{2}\) \d{4,5}-\d{4}/', $telefone)) {
    $erros[] = ['campo' => 'telefone', 'mensagem' => 'O telefone está no formato inválido.'];
}

// Senha (verifica se não está vazia e se tem pelo menos 6 caracteres)
if (empty($senha)) {
    $erros[] = ['campo' => 'senha', 'mensagem' => 'A senha é obrigatória.'];
} elseif (strlen($senha) < 6) {
    $erros[] = ['campo' => 'senha', 'mensagem' => 'A senha deve ter pelo menos 6 caracteres.'];
}

// Confirmar Senha (verifica se as senhas são iguais)
if ($senha !== $confirmar_senha) {
    $erros[] = ['campo' => 'confirmar_senha', 'mensagem' => 'As senhas não coincidem.'];
}

// Verificar se há erros
if (count($erros) > 0) {
    echo json_encode([
        'status' => 'erro',
        'mensagens' => $erros
    ]);
    exit;
}

// Caso não haja erros, simula um "cadastro" com sucesso
echo json_encode([
    'status' => 'sucesso',
    'mensagem' => 'Cadastro realizado com sucesso!',
]);
?>
