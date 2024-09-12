const departmentTable = document.getElementById('departmentTable');
const departmentForm = document.getElementById('departmentForm');
const departmentNameInput = document.getElementById('departmentName');
const departmentIdInput = document.getElementById('departmentId');
const formTitle = document.getElementById('formTitle');
const cancelEditButton = document.getElementById('cancelEdit');

let departments = [];
let isEditing = false;

departmentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const departmentName = departmentNameInput.value.trim();
    const departmentId = parseInt(departmentIdInput.value.trim());

    if (departmentName && departmentId) {
        if (isEditing) {
            // Editando um departamento existente
            const index = departments.findIndex(dep => dep.id === parseInt(departmentIdInput.dataset.originalId));
            departments[index].id = departmentId;
            departments[index].name = departmentName;
            isEditing = false;
            formTitle.innerText = 'Inserir Departamento';
            cancelEditButton.style.display = 'none';
        } else {
            // Inserindo um novo departamento
            const newDepartment = {
                id: departmentId,
                name: departmentName
            };
            departments.push(newDepartment);
        }

        renderTable();
        departmentForm.reset();
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
    departmentNameInput.value = department.name;
    departmentIdInput.value = department.id;
    departmentIdInput.dataset.originalId = department.id; // Armazena o ID original
    formTitle.innerText = 'Editar Departamento';
    isEditing = true;
    cancelEditButton.style.display = 'inline-block';
}

// Função para cancelar a edição
cancelEditButton.addEventListener('click', function () {
    isEditing = false;
    departmentForm.reset();
    departmentIdInput.removeAttribute('data-original-id');
    formTitle.innerText = 'Inserir Departamento';
    cancelEditButton.style.display = 'none';
});
