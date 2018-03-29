# Ontourage

## Description: 
A web app for users to search for bands/musicians on tour, and to compare travel costs for each destination to determine which tour date to book.

## NOTE:
The QPX Express API (fka Google Flights) will be discontinued on April 10, 2018. As of this commit, I have not taken steps to find an alternative free flight API.

## Authors:
Al Rodis github: alrodis
Gintas Vasiliauskas, github: GintasVasiliauskas
Trey Hepner, github: ggh3
Whitney Webster, github: whitaweb
Will Alt, github: wla312

## Live Version: 
https://kingsguard-nu815.github.io/Have-To-See/

## Libraries:
Firebase 4.5.0
Moment.js 2.12.0
Bootstrap 3.3.7
jQuery 3.2.1

## APIs:
Bandsintown
Airportsfinder
QPX Express (google flights)
Firebase

## Known Bugs/Limitations:
Airportsfinder currently identifies the IATA code for the airport nearest to the music venue based on music venue lat/long coordinates, and this IATA code is used as the ‘destination’ input value for the QPX Express API. In some searches, the nearest airport will not be a commercial airport, but rather a military airport, airport used for private aviation, and/or shipping/freight. The QPX Express search does not work if the destination airport IATA code is for an airport that does not service the commercial major airlines.

The ‘origin’ input for the QPX Express API is set to ‘CHI’, so all travel originates from ORD or MDW airports.

The ‘date’ input for the QPX Express API is defined as 1 day prior to the performance/tour date.

Flights are one-way.

We built this project using free APIs. As a result, some of the APIs have daily usage limitations. If these are exceeded, the app will not work. The API with the strictest limitations is QPX Express. During building and testing, we rotated through three different API keys to get around daily limitations.

