<%-- 
    Document   : inserirdep
    Created on : 12 de set. de 2024, 08:40:24
    Author     : nicolas_linhares
--%>

<%@page import= "controlefuncionario.Departamento"%>

<%
    String vDescDepto = request.getParameter("descDepto");

    Departamento dep = new Departamento();
    dep.setDescDepto(vDescDepto);

    boolean inseriu = dep.incluirDepartamento();

    if (inseriu) {
        response.sendRedirect("departamento.jsp");
    } else {
        response.sendRedirect("departamento.jsp");
    }
%>
