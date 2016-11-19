<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Тест скорости интернет соединения</title>
    
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css">
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery.min.js"></script>
    <script src="js/ping.js"></script>
</head>

<body>
    <div class="container">
        <div class="raw">
            <div class="col-xs-4">
                <h4 class="text-center">Информация о поставщике услуг интернет связи</h4>
                <div id="inet_info">
                    <table id="inetinfo__table" class="table table-striped table-bordered table-condensed">
                        <thead>
                            <tr class="info">
                                <th>
                                    <p class="text">№</p>
                                </th>
                                <th>
                                    <p class="text">Виды данных</p>
                                </th>
                                <th>
                                    <p class="text">Данные</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p class="text-info">1</p>
                                </td>
                                <td>
                                    <p class="text-info">IP Адрес</p>
                                </td>
                                <td id="ii__ip"> </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="text-info">2</p>
                                </td>
                                <td>
                                    <p class="text-info">Провайдер</p>
                                </td>
                                <td id="ii__provider"> </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="text-info">3</p>
                                </td>
                                <td>
                                    <p class="text-info">Сайт</p>
                                </td>
                                <td id="ii_site"> </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="text-info">4</p>
                                </td>
                                <td>
                                    <p class="text-info">Маршрут</p>
                                </td>
                                <td id="ii__route"> </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="text-info">5</p>
                                </td>
                                <td>
                                    <p class="text-info">Маска</p>
                                </td>
                                <td id="ii__mask"> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-xs-8">
                <h4 class="text-center">Тест скорости интернет соединения <br><br></h4>
                <div id="inet_test">
                   
                </div>
                <script src="js/inettest.js"></script>
            </div>
        </div>
    </div>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
</body>

</html>