<?php

$response = [];

if ($_GET["request"] == "init")
{
    $clientIp = $_SERVER['REMOTE_ADDR'];
    $clientBrowser = $_SERVER['HTTP_USER_AGENT'];
    
    $getInternetInfo = curl_init();

    curl_setopt_array($getInternetInfo, array(
        CURLOPT_URL => 'http://api.2ip.ua/provider.json?ip='.$clientIp."",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query(array(/*здесь массив параметров запроса*/))
    ));
    
    array_push($response, curl_exec($getInternetInfo));
    curl_close($getInternetInfo);
    
    echo json_encode($response);
}
else
{
    array_push($response, '"dev"');
    echo json_encode($response);
}

?>