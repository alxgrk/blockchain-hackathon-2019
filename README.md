# blockchain-hackathon-2019

# Start all services

```
docker-compose -f hyperledger-fabric/docker-compose.yml up -d && docker-compose up -d
```

# Recreate services after changing somethings

```
docker-compose up -d --build {{service-name}}
# or
docker-compose -f hyperledger-fabric/docker-compose.yml up --force-recreate -d
```

# Stop and clean all services

```
docker-compose -f hyperledger-fabric/docker-compose.yml down && docker-compose down
```


# Screensharing
https://whereby.com/alxgrk

# Kontaktdaten

Telefon: 0178/3537303
Email: h.freudenreich@senstim.de

# Zeitplan
![alt text](https://github.com/alxgrk/blockchain-hackathon-2019/blob/master/Screenshot%202019-12-02%20at%2012.26.47.png)
