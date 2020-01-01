# blockchain-hackathon-2019

# Start all services

```
docker-compose -f hyperledger-fabric/docker-compose.yml up -d && docker-compose up -d
```

# Updating blockchain code

```
docker-compose exec blockchain /hyperledger-fabric/the-aktivist-network/upgrade.sh
```

# Recreate services after changing something

```
docker-compose up -d --build {{service-name}}
# or
docker-compose -f hyperledger-fabric/docker-compose.yml up --force-recreate -d
```

# Stop and clean all services

```
docker-compose -f hyperledger-fabric/docker-compose.yml down && docker-compose down
```

# Problem recovery

Stop and restart all services.


# Screensharing
https://whereby.com/alxgrk

# Kontaktdaten

Telefon: 0178/3537303
Email: h.freudenreich@senstim.de

# Zeitplan
![alt text](https://github.com/alxgrk/blockchain-hackathon-2019/blob/master/Screenshot%202019-12-02%20at%2012.26.47.png)
