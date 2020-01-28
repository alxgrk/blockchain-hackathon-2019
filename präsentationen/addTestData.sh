#!/bin/bash

# set -x

# create verein if not existent
for id in 2 3 4
do
	body='
		{
                	"$class": "org.uni.leipzig.aktivist.Verein",
                        "akteurId": '$id'
                }
'
	curl 'http://localhost:9876/api/Verein/' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Content-Type: application/json;charset=utf-8' -H 'Origin: http://localhost:3000' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Referer: http://localhost:3000/finder' --data "$body"
done

while read -r line
do
    name=$(echo $line | awk -F',' '{printf "%s", $1}')
    beschreibung=$(echo $line | awk -F',' '{printf "%s", $2}')
    kategorie=$(echo $line | awk -F',' '{printf "%s", $3}')
    verein=$(echo $line | awk -F',' '{printf "%s", $4}')

    date=$(date +"%m/%d/%Y, %I:%M:%S AM")

    body='
{
  "$class": "org.uni.leipzig.aktivist.Aktivitaet",
  "id": "'${verein}'_'$(uuidgen -t)'",
  "name": "'$name'",
  "beschreibung": "'$beschreibung'",
  "date": "'$date'",
  "kategorie": "'$kategorie'",
  "erledigt": false,
  "anbieter": "org.uni.leipzig.aktivist.Verein$'$verein'"
}
'

   curl 'http://localhost:9876/api/Aktivitaet/' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Content-Type: application/json;charset=utf-8' -H 'Origin: http://localhost:3000' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Referer: http://localhost:3000/finder' --data "$body" 
done < testData.csv
