const inputText = document.querySelector('.input-text');
const botaoCriar = document.querySelector('.input-button');
const lista = document.querySelector('.list');
const botaoDeletar = document.querySelector('.icon-trash')
const botaoEditar = document.querySelector('.icon-edit')
const tarefasCriadas = document.querySelector('#created-tasks')
const totalTarefas = document.querySelector('#total-tasks')

let id = 1;

function adicionarTarefa () {
    const listaVazia = document.querySelector('.empty');
    listaVazia.classList.add('hidden');
    lista.innerHTML += `
        <li class="list-item">
            <div class="custom-checkbox">
                <input id="checkbox-${id}" type="checkbox">
                <label for="checkbox-${id}">${inputText.value}</label>
            </div>
            <div>
                <img class="icon-edit" src="./assets/edit.png">
                <img class="icon-trash" src="./assets/trash.png">
            </div>
        </li>
    `
    inputText.value = '';
    id++;
    
    tarefasCriadas.textContent = lista.children.length;
    totalTarefas.textContent = lista.children.length;
}


botaoCriar.addEventListener('click', () => {
    inputText.value ? adicionarTarefa() : alert('Digite uma tarefa');
})



