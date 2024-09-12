<%-- 
    Document   : excluirDep
    Created on : 12 de set. de 2024, 08:46:03
    Author     : nicolas_linhares
--%>

<%@page import= "controlefuncionario.Departamento"%>
<%
    int vIdDepto = Integer.parseInt(request.getParameter("idDepto"));

    Departamento dep = new Departamento();
    dep.setIdDepto(vIdDepto);

    boolean excluiu = dep.excluirDepartamento();

    if (excluiu) {
        response.sendRedirect("departamento.jsp");
    } else {
        response.sendRedirect("departamento.jsp");
    }
%>
