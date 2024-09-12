const departmentTable = document.getElementById('departmentTable');
const departmentForm = document.getElementById('departmentForm');
const departmentNameInput = document.getElementById('departmentName');
const departmentIdInput = document.getElementById('departmentId');
const formTitle = document.getElementById('formTitle');
const cancelEditButton = document.getElementById('cancelEdit');
const idField = document.getElementById('idField'); // Campo de ID que fica oculto na inserção

let departments = [];
let isEditing = false;

departmentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const departmentName = departmentNameInput.value.trim();

    // Verifica se estamos no modo de edição ou inserção
    if (departmentName) {
        if (isEditing) {
            const departmentId = parseInt(departmentIdInput.value.trim());

            // Editando um departamento existente
            const index = departments.findIndex(dep => dep.id === parseInt(departmentIdInput.dataset.originalId));
            if (index > -1) {
                departments[index].id = departmentId;
                departments[index].name = departmentName;
            }

            isEditing = false;
            formTitle.innerText = 'Inserir Departamento';
            cancelEditButton.style.display = 'none';
            idField.style.display = 'none'; // Oculta o campo ID novamente
        } else {
            // Inserindo um novo departamento
            const newDepartment = {
                id: departments.length + 1, // Simula a geração de um ID automaticamente
                name: departmentName
            };
            departments.push(newDepartment);
        }

        renderTable(); // Atualiza a tabela após salvar
        departmentForm.reset(); // Limpa o formulário
        departmentIdInput.removeAttribute('data-original-id');
    }
});

// Função para renderizar a tabela
function renderTable() {
    departmentTable.innerHTML = '';
    departments.forEach(department => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${department.id}</td>
            <td>${department.name}</td>
            <td>
                <button class="edit" onclick="editDepartment(${department.id})">Editar</button>
                <button class="delete" onclick="deleteDepartment(${department.id})">Excluir</button>
            </td>
        `;
        departmentTable.appendChild(row);
    });
}

// Função para excluir um departamento
function deleteDepartment(id) {
    departments = departments.filter(department => department.id !== id);
    renderTable();
}

// Função para editar um departamento
function editDepartment(id) {
    const department = departments.find(dep => dep.id === id);
    if (department) {
        departmentNameInput.value = department.name;
        departmentIdInput.value = department.id;
        departmentIdInput.dataset.originalId = department.id; // Armazena o ID original
        formTitle.innerText = 'Editar Departamento';
        isEditing = true;
        cancelEditButton.style.display = 'inline-block';
        idField.style.display = 'block'; // Exibe o campo ID ao editar
    }
}

// Função para cancelar a edição
cancelEditButton.addEventListener('click', function () {
    isEditing = false;
    departmentForm.reset();
    departmentIdInput.removeAttribute('data-original-id');
    formTitle.innerText = 'Inserir Departamento';
    cancelEditButton.style.display = 'none';
    idField.style.display = 'none'; // Oculta o campo ID ao cancelar
});
