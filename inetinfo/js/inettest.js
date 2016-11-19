'use strict'

// Переписать глобальные константы и переменные, скрыть

const serverUrl = "http://srvinetinf/";

let resultJson = {};

window.onload = function getInternetInfo() {
    
    function renderResultGetInternetInfo(data) {
        
        let d = JSON.parse(data);
        
        //Тестовые данные для проверки
        d = {
            "ip":"5.35.42.34",
            "name_ripe":"Multiscan LLC",
            "name_rus":"\u041e\u041e\u041e \"\u041c\u0443\u043b\u044c\u0442\u0438\u0441\u043a\u0430\u043d\"",
            "site":"http:\/\/www.smile-net.ru\/",
            "as":"31514",
            "ip_range_start":"86179840",
            "ip_range_end":"86196223",
            "route":"5.35.0.0",
            "mask":"18"
        }
        
        resultJson = d;
        
        function setTableInfo(obj) {
            
            let mask = parseFloat(obj.mask);
            
            if (obj.ip.length < 8){
                $('#ii__ip').append("IP адрес некорректный");
            }else{
                $('#ii__ip').append(obj.ip);
            }
            
            if (obj.name_ripe === undefined){
                $('#ii__provider').append("Ошибка определения провайдера");
            }else{
                $('#ii__provider').append(obj.name_ripe);
            }
            
            if (obj.site.length < 5){
                $('#ii_site').append("Ошибка определения провайдера");
            }else{
                $('#ii_site').append("<a target='_blank' href='" + obj.site + "'>" + obj.site + "</a>");
            }
            
            if (obj.route.length < 8){
                $('#ii__route').append("Ошибка определения маршрута");
            }else{
                $('#ii__route').append(obj.route);
            }
            
            if (mask === NaN){
                $('#ii__mask').append("Ошибка определения маски");
            }else{
                $('#ii__mask').append(mask);
            }
        }
        
        setTableInfo(d);
    }
    
    $.ajax({
        url: serverUrl + "API/listener.php",
        success: renderResultGetInternetInfo,
        dataType: "json",
        data: {
            request: "init2" // Для корректного ответа сервера, требуется отправить init, иначе сервер будет присылать JSON {"dev"} и не делать запрос в API Информация об интернет соединении (там можно производить 100 запросов в сутки с одного IP)
        }
    })
};

function appInternetTestStartRender() {
    const deployAppElementsTarget = "#initial_div";
    $('#inet_test').append("<div id='initial_div' class='row'></div>");
    $(deployAppElementsTarget).append("<div class='preloader'><i id='preloader' class='fa fa-cog fa-3x fa-fw'></i></div>");
    $(deployAppElementsTarget).append("<p class='lead'>Тестовый сервер: <a href='" + serverUrl + "'target='_blank'>" + serverUrl + "</a></p>");
    
    $(deployAppElementsTarget).append("<p id='ping' class='lead'>Пинг: </p>");
    $(deployAppElementsTarget).append("<p id='download' class='lead'>Входящая скорость: </p>");
    $(deployAppElementsTarget).append("<p id='upload' class='lead'>Исходящая скорость: </p>");
    $(deployAppElementsTarget).append("<div class='progress'> <div id='progress_bar' class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%;'> 0% </div></div>");
    
    $(deployAppElementsTarget).append('<div class="buttons"> </div>');
    $('.buttons').append("<button id='start_button' class='btn btn-primary btn_test'>Запустить тест</button>");
    $('.buttons').append("<button id='save_button' class='btn btn-danger btn_test' disabled>Сохранить результат</button>");
    
}

{
    let initial_state = appInternetTestStartRender();
}

function startTest() {
    
    $('#start_button').prop('disabled', true);
    $('.preloader').css('display', 'inline-block');
    $('#preloader').prop('class', 'fa fa-cog fa-spin fa-3x fa-fw');
    
    let p = new Ping();
    p.ping(serverUrl, function (data) {
        $("#ping").html("Пинг: " + data);
        resultJson.ping = data;
        
        $('#progress_bar').attr('aria-valuenow', "30");
        $('#progress_bar').css('width', "30%");
        $('#progress_bar').html('30%');
    })

    function checkSpeed() {
        let image_file = serverUrl + "files/File_test1mb.jpg?" + (new Date().getTime()), //image src
            images_size = 12283, // Размер файла скачивания
            time_load = 0, // количество скачиваний
            time_start = parseInt(new Date().getTime()),
            testFile = new Image();

        function checkUploadSpeed(iterations, update) {
            var average = 0
                , index = 0
                , timer = window.setInterval(check, 2000); //check every 2 seconds
            check();

            function check() {
                var xhr = new XMLHttpRequest(),
                    url = serverUrl + 'API/uploader.php?cache=' + Math.floor(Math.random() * 10000), //prevent url cache
                    data = getRandomString(3), //Нужно узнать максимальный объём пост запроса, для корректного указания функции агрумента
                    startTime, speed = 0;
                xhr.onreadystatechange = function (event) {
                    if (xhr.readyState == 4) {
                        speed = Math.round(1024 / ((new Date() - startTime) / 1000));
                        average == 0 ? average = speed : average = Math.round((average + speed) / 2);
                        update(speed, average);
                        index++;
                        if (index == iterations) {
                            window.clearInterval(timer);
                            $('#save_button').prop('disabled', false);
                            $('#progress_bar').attr('aria-valuenow', "100");
                            $('#progress_bar').css('width', "100%");
                            $('#progress_bar').html('100%');
                            
                            $('.preloader').css('display', 'none');
                            $('#preloader').prop('class', 'fa fa-spinner fa-3x fa-fw');
                        }
                    }
                }
                xhr.open('POST', url, true);
                startTime = new Date();
                xhr.send(data);
            }

            function getRandomString(sizeInMb) {
                var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+`-=[]\{}|;':,./<>?", //random data prevents gzip effect
                    iterations = sizeInMb * 1024 * 1024, //get byte count
                    result = '';
                for (var index = 0; index < iterations; index++) {
                    result += chars.charAt(Math.floor(Math.random() * chars.length));
                };
                return result;
            }
        }
        testFile.src = image_file;
        testFile.onload = function () {
            let time_end = parseInt(new Date().getTime());
            time_load = time_load + (time_end - time_start);
            let speed = parseInt(images_size / (time_load / 1024), 10), 
                speedDownloadMbitS = Math.round((speed / 1024) * 100) / 100;
            
            $("#download").html('Входящая скорость: ' + speedDownloadMbitS + " Мбит/с");
            resultJson.download_speed = speedDownloadMbitS;
            $('#progress_bar').attr('aria-valuenow', "60");
            $('#progress_bar').css('width', "60%");
            $('#progress_bar').html('60%');
            
            checkUploadSpeed(10, function (speed, average) {
                
                let speedUploadMbtitS = Math.round((average / 1024) * 100) / 100;
                
                $('#upload').html('Исходящая скорость: ' + speedUploadMbtitS + " Мбит/c");
                resultJson.upload_speed = speedUploadMbtitS;
            })
            
        }
        testFile.onerror = function () {
            console.log("Ошибка загрузки файла" + this.src);
        }
    }
    checkSpeed();
}

function saveTest(){
        $('#save_button').prop('disabled', true);
        console.log(resultJson);
};

start_button.addEventListener("click", startTest);
save_button.addEventListener('click', saveTest);