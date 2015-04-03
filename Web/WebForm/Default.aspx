<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="WebForm_Default" %>

<!DOCTYPE html>

<html ng-app="ngMainApp">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="../Resource/app/styles/select.css" rel="stylesheet" />
    <link href="../Resource/common/styles/bootstrap/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="../Resource/common/styles/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="../Resource/common/styles/font-awesome/font-awesome.min.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div style="margin-left:200px;overflow:inherit;">
            <city-select></city-select>
            <bank-select></bank-select>
        </div>
    </form>
    <script src="../Resource/common/scripts/jquery/jquery.min.js"></script>
    <script src="../Resource/common/scripts/angularjs/angular.min.js"></script>
    <script src="../Resource/common/scripts/angularjs/angular-route.min.js"></script>
    <script src="../Resource/common/scripts/angularjs/angular-resource.min.js"></script>
    <script src="../Resource/app/scripts/app.js"></script>
    <script src="../Resource/app/scripts/directive.js"></script>
    <script src="../Resource/app/scripts/city/services/cityService.js"></script>
    <script src="../Resource/app/scripts/bank/services/bankService.js"></script>
</body>
</html>
