let usuarioEditandoId = null;
async function criarUsuario() {

    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");

    const nomeErro = document.getElementById("erroNome");

    const nome = nomeInput.value;
    const email = emailInput.value;

    if (!nome || !email) {

        nomeInput.classList.add("input-erro");
        emailInput.classList.add("input-erro");

        nomeErro.classList.add("show");

        setTimeout(() => {

            nomeInput.classList.remove("input-erro");
            emailInput.classList.remove("input-erro");

        }, 300);

        return;
    }

    nomeErro.classList.remove("show");

    await fetch("http://localhost:8080/users/usuario", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome,
            email
        })
    });

    listarUsuarios();
}

async function listarUsuarios() {

    const res = await fetch("http://localhost:8080/users/listar");

    const usuarios = await res.json();

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    usuarios.forEach(u => {

        lista.innerHTML += `
            <li>
                Id: ${u.id} -
                Nome: ${u.nome} -
                Email: ${u.email}

                <button
                    class="btn-delete"
                    onclick="deletarUsuario(${u.id})">
                    Deletar
                </button>

                <button
                    class="btn-update"
                    onclick="mostrarPopUp(${u.id})">
                    Atualizar
                </button>
            </li>
        `;
    });
}

async function atualizarUsuario(id) {

    const nome = document.getElementById("novo-nome").value;

    const email = document.getElementById("novo-email").value;

    await fetch(`http://localhost:8080/users/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome,
            email
        })
    });

    listarUsuarios();
}

async function deletarUsuario(id) {

    await fetch(`http://localhost:8080/users/${id}`, {

        method: "DELETE"
    });

    listarUsuarios();
}

const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");

[nomeInput, emailInput].forEach(input => {

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            criarUsuario();
        }
    });
});
function mostrarPopUp(id) {
    usuarioEditandoId = id;
    document.getElementById("popup").style.display = "flex";
    document.body.classList.add("no-scroll");
}
function fecharPopUp() {
    document.getElementById("popup").style.display = "none";
    document.body.classList.remove("no-scroll");
}
async function salvarEdicao(){

    await atualizarUsuario(usuarioEditandoId);

    fecharPopUp();
}