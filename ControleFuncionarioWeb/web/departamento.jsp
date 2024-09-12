<%@page import="java.util.List"%>
<%@page import="controlefuncionario.Departamento"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gestão de Departamentos</title>
        <link rel="stylesheet" href="estilos/departamento.css">
    </head>
    <body>

        <div class="container">
            <h1>Gestão de Departamentos</h1>

            <!-- Formulário para Inserir e Editar Departamento -->
            <div class="form-container">
                <h2 id="formTitle">Inserir Departamento</h2>
                
                    <!-- Campo de ID, oculto por padrão (exibido apenas ao editar) -->
                    <form action="inserirdep.jsp">
                        <div class="form-group">
                            <label for="descDepto">Inserir Departamento</label>
                            <input type="text" id="descDepto" name="descDepto" class="form-control" placeholder="Digite o nome do departamento">
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Inserir</button>
                        <button type="reset" class="btn btn-secondary btn-block">Cancelar</button>
                    
                </form>
            </div>

            <!-- Tabela de Departamentos Cadastrados -->
            <div class="table-container">
                <h2>Departamentos Cadastrados</h2>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do Departamento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="departmentTable">
                        <!-- Aqui vai o código JSP para listar os departamentos -->
                        <%
                            Departamento dep = new Departamento();
                            List<Departamento> lista = dep.listarDeptos();

                            for (Departamento d : lista) {
                        %>
                        <tr>
                            <td><%= d.getIdDepto()%></td>
                            <td><%= d.getDescDepto()%></td>
                            <td>
                                <button class="btn btn-warning" onclick="editDepartment('<%= d.getIdDepto()%>', '<%= d.getDescDepto()%>')">Editar</button>
                                <form action="excluirDep.jsp" method="post" style="display:inline;">
                                    <input type="hidden" name="idDepto" value="<%= d.getIdDepto()%>">
                                    <button type="submit" class="btn btn-danger">Excluir</button>
                                </form>
                            </td>
                        </tr>
                        <%
                            }
                        %>
                    </tbody>
                </table>
            </div>
        </div>

        <script src="scripts/departamento.js"></script>
    </body>
</html>
