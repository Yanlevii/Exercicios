function mascaraNome(event) {
    let input = event.target;
    let valor = input.value.replace(/[0-9]/g, ''); // Remove os números
    input.value = valor;
}
// Máscara de telefone dinâmica
function mascaraTelefone(event) {
    let input = event.target;
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    let formatado = "";

    if (valor.length > 0) {
        formatado = `(${valor.slice(0, 2)}`;
    }
    if (valor.length > 2) {
        formatado += `) ${valor.slice(2, 7)}`;
    }
    if (valor.length > 7) {
        formatado += `-${valor.slice(7, 11)}`;
    }

    input.value = formatado;
}

// Validação de senha
function validarSenha() {
    var senha = document.getElementById("isenha").value;
    var confirmarSenha = document.getElementById("iconfirmar").value;
    var erro = document.getElementById("erroSenha");

    if (senha.length < 6) {
        erro.textContent = "A senha deve ter no mínimo 6 caracteres!";
        return false;
    }

    if (senha !== confirmarSenha) {
        erro.textContent = "As senhas não coincidem!";
        return false;
    } else {
        erro.textContent = "";
        return true;
    }
}
// Máscara para CPF (XXX.XXX.XXX-XX)
function mascaraCPF(event) {
    let input = event.target;
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 números

    let formatado = "";

    if (valor.length > 0) {
        formatado = `${valor.slice(0, 3)}`;
    }
    if (valor.length > 3) {
        formatado += `.${valor.slice(3, 6)}`;
    }
    if (valor.length > 6) {
        formatado += `.${valor.slice(6, 9)}`;
    }
    if (valor.length > 9) {
        formatado += `-${valor.slice(9, 11)}`;
    }

    input.value = formatado;
}
function toggleSenha(idCampo, idIcone) {
    let campo = document.getElementById(idCampo);
    let icone = document.getElementById(idIcone);

    if (campo.type === "password") {
        campo.type = "text";
        icone.classList.remove("bi-eye");
        icone.classList.add("bi-eye-slash");
    } else {
        campo.type = "password";
        icone.classList.remove("bi-eye-slash");
        icone.classList.add("bi-eye");
    }
}
function enviarCadastro(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    
    const form = document.getElementById('formCadastro');
    const formData = new FormData(form);

    fetch('processar_cadastro.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const mensagemResposta = document.getElementById('mensagemResposta');
        
        if (data.status === 'erro') {
            let erros = '';
            data.mensagens.forEach(erro => {
                erros += `<p>${erro}</p>`;
            });
            mensagemResposta.innerHTML = erros;
            mensagemResposta.style.color = 'red';
        } else if (data.status === 'sucesso') {
            mensagemResposta.innerHTML = `<p>${data.mensagem}</p>`;
            mensagemResposta.style.color = 'green';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
