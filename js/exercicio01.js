// Função para gerar o arquivo JSON e permitir o download
function enviarCadastro(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    
    const form = document.getElementById('formCadastro');
    const formData = new FormData(form);

    // Coletando os dados do formulário
    const nome = document.getElementById("inome").value;
    const cpf = document.getElementById("icpf").value;
    const email = document.getElementById("iemail").value;
    const telefone = document.getElementById("inum").value;
    const senha = document.getElementById("isenha").value;
    const confirmarSenha = document.getElementById("iconfirmar").value;
    
    // Validação da senha
    const erroSenha = document.getElementById("erroSenha");
    if (senha.length < 6) {
        erroSenha.textContent = "A senha deve ter no mínimo 6 caracteres!";
        return;
    }
    if (senha !== confirmarSenha) {
        erroSenha.textContent = "As senhas não coincidem!";
        return;
    }
    erroSenha.textContent = ""; // Limpa a mensagem de erro

    // Criando o objeto com os dados
    const dados = {
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        senha: senha,
        confirmarSenha: confirmarSenha
    };

    // Convertendo o objeto em uma string JSON
    const jsonDados = JSON.stringify(dados);

    // Criando o Blob com o conteúdo JSON
    const blob = new Blob([jsonDados], { type: 'application/json' });

    // Gerando o link para o download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'dados_cadastro.json'; // Nome do arquivo JSON
    link.style.display = 'none'; // Link invisível
    document.body.appendChild(link);

    // Clicando automaticamente para baixar o arquivo
    link.click();

    // Removendo o link após o clique
    document.body.removeChild(link);

    // Exibindo mensagem de sucesso
    const mensagemResposta = document.getElementById('mensagemResposta');
    mensagemResposta.innerHTML = `<p>Cadastro concluído e arquivo JSON gerado!</p>`;
    mensagemResposta.style.color = 'green';
}
