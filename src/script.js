import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const inputText = document.querySelector('.input-text');
const botaoCriar = document.querySelector('.input-button');
const listaContainer = document.querySelector('.container-list');
const iconContainer = document.querySelector('.icon-container');

const lista = document.querySelector('.list'); 
const botaoDeletar = document.querySelector('.icon-trash')
const botaoEditar = document.querySelector('.icon-edit')
const itemListado = document.querySelector('.list-item')

const tarefasCriadas = document.querySelector('#created-tasks')
const totalTarefas = document.querySelector('#total-tasks')
const tarefasConcluidas = document.querySelector('#completed-tasks')

const checkInput = document.querySelector('.custom-checkbox label:before');


//FUNCAO PARA CRIAR LISTA DE TAREFAS
let id = 1;
function criarListItem() {
    const listaVazia = document.querySelector('.empty');
    listaVazia.classList.add('hidden');

    const listItem = document.createElement('li');
    listItem.classList.add('list-item');

    const customCheckbox = document.createElement('div');
    customCheckbox.classList.add('custom-checkbox');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${id}`;

    const label = document.createElement('label');
    label.id = `${id}`;
    label.classList.add('check');
    label.setAttribute('for', `checkbox-${id}`);
    const span = document.createElement('span');
    span.textContent = `${inputText.value}`;
    label.appendChild(span);

    customCheckbox.appendChild(checkbox);
    customCheckbox.appendChild(label);

    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    const iconEdit = document.createElement('img');
    iconEdit.classList.add('icon-edit');
    iconEdit.src = './assets/edit.png';

    const iconTrash = document.createElement('img');
    iconTrash.classList.add('icon-trash');
    iconTrash.src = './assets/trash.png';

    iconContainer.appendChild(iconEdit);
    iconContainer.appendChild(iconTrash);

    listItem.appendChild(customCheckbox);
    listItem.appendChild(iconContainer);

    return listItem;
}

// ADICIONAR TAREFA NA LISTA
function adicionarTarefa() {
    
    lista.appendChild(criarListItem());

    inputText.value = '';
    id++;

    tarefasCriadas.textContent = lista.children.length;
    totalTarefas.textContent = lista.children.length;
}

// ADICIONAR TAREFA COM ENTER
inputText.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && inputText.value.trim() !== "") {
        adicionarTarefa()
    }
});

// ADICIONAR TAREFA COM BOTAO CRIAR
// botaoCriar.addEventListener('click', () => {
// });

botaoCriar.addEventListener('click', async () => {
    
    if (inputText.value !== '') {
        adicionarTarefa();
        try {
            const response = await axios.post('/createTask', {
                title: inputText.value,
                completed: false,
            });

            if(response.status === 200) {
                lista.appendChild(criarListItem());

                inputText.value = '';
                id++;
    
                tarefasCriadas.textContent = lista.children.length;
                totalTarefas.textContent = lista.children.length;
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            // Exiba uma mensagem de erro ao usuário se necessário
        }
    } else {
        console.log(inputText.value);
        alert('Digite uma tarefa');
    }
});


// MARCANDO TAREFA COMO CONCLUIDA
function marcarComoConcluido(checkbox) {
    const label = checkbox.nextElementSibling;
    checkbox.checked ? label.classList.add('checked') : label.classList.remove('checked');
}

listaContainer.addEventListener('click', function (event) {

    //SE CLICAR NO CHECKBOX, MARCAR COMO CONCLUIDO
    const checkbox = event.target.closest('.custom-checkbox input');
    if (checkbox) {
        marcarComoConcluido(checkbox);
        tarefasConcluidas.textContent = lista.querySelectorAll('.checked').length; //pega a quantidade de tarefas concluidas e atualiza o contador
    }
    // FAZER validacao para quando concluir todas as tarefas

    

    // REMOVE TAREFA DA LISTA
    const iconDelete = event.target.closest('.icon-trash');
    if (iconDelete) {
        const listItem = iconDelete.closest('.list-item');
        listItem.remove();


        tarefasCriadas.textContent = lista.children.length;
        totalTarefas.textContent = lista.children.length;
        tarefasConcluidas.textContent = lista.querySelectorAll('.checked').length;

        // SE A LISTA ESTIVER VAZIA, MOSTRAR MENSAGEM DE LISTA VAZIA
        if(lista.children.length === 0) {
            const listaVazia = document.querySelector('.empty');
            listaVazia.classList.remove('hidden');
        }
    }


    // // EDITA A TAREFA
    const iconEdit = event.target.closest('.icon-edit');
    if (iconEdit) {
        const listItem = iconEdit.closest('.list-item');
        const label = listItem.querySelector('label');
        const span = label.querySelector('span');

        //criando o input tipo texto com id input-edit e recebendo o valor do span
        const input = document.createElement('input');
        input.type = 'text';
        input.setAttribute('id', 'input-edit');
        input.value = span.textContent;

        listItem.appendChild(input);

        label.replaceChild(input, span);
        iconEdit.classList.add('hidden');
        checkInput.classList.add('hidden');

        console.log(input.value);
    }
});
