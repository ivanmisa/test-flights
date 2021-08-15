# test-flights
small aviation system project in typescript, express, and mongodb



Ejemplo rutas




1- http://localhost:3800/api/signin  -->
Json
{
	"email":"ivan@hotmail.com",
    "password":"asdf12345"
}


2 - http://localhost:3800/api/signup  -->
Json
{
	"email":"ivan@hotmail.com",
    "password":"asdf12345",
    "name": "hasda"
}

3- http://localhost:3800/api/createflight
Json
#landingTime y departureTime deben estar en formato date Unix
{
	"from": {
        "city": "GDL",
        "country": "MX"
    },
    "to": {
        "city": "NW",
        "country": "USA"
    },
    "landingTime":"2701876245",
    "departureTime": "2651876245",
    "limitPassager": "20",
    "passengers":[]
}



4- http://localhost:3800/api/registerflight/6116afafd5d4f9174477499a
#Usuario con token en req.headers.authorization


5- http://localhost:3800/api/deleteuserflight/6116afafd5d4f9174477499a/6116aca631f68d64988a2913
#usuario con token y role de admin

6- http://localhost:3800/api/getflights/1601876245/1691876245/MX/GDL/1
#Las fechas deben de estar en formato date unix

7- http://localhost:3800/api/createbaggage
#Post
{
	"flightid":"6116d9a2ae59db65aca6cec8",
	"user":"6116aca631f68d64988a2913",
    "weight":"12",
    "linear_size":"112",
    "persona_item":true,
    "hand_luggage":false
}

8- http://localhost:3800/api/deletebaggage/6116aca631f68d64988a2913/6116d9a2ae59db65aca6cec8
#usuario con token y role de admin

9- http://localhost:3800/api/getlastbaggage/1
#usuario con token y role de admin

10-  http://localhost:3800/api/getavg/MX/GDL/USA/NW  
#Presio promedio de todos los vuelos de una ciudad en espesifico a otra

11- http://localhost:3800/api/getcomparison/aeromexico/aeroaa/MX/GDL/USA/NW
Comparacion de presios y otras caracteristicas de 2 compañias aereas diferentes que van de una ciudad en especifico a otra









































