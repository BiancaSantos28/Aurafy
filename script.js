document.getElementById('form-login').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    try {
        const resposta = await fetch('http://localhost:8001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, senha })
        });

        const dados = await resposta.json();

        if (resposta.status === 200) {
            alert("Login bem-sucedido!");
        } else {
            alert(dados.mensagem || "Erro ao fazer login.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro ao conectar com o servidor.");
    }
});
