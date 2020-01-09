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



# Blockchain start manually

Pre-Install:

https://hyperledger.github.io/composer/latest/installing/development-tools.html
Step 1-2

start fabric:

```
cd hyperledger-fabric
./startFabric.sh

```

Install network:

```
cd ..
cd hyperledger-composer/the-aktivist-network
./composer network install --card PeerAdmin@hlfv1 --archiveFile the-aktivist-network@0.0.1.bna
```

Deploy network
```
./composer network start --networkName the-aktivist-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```


# Screensharing
https://whereby.com/alxgrk

# Kontaktdaten

Telefon: 0178/3537303
Email: h.freudenreich@senstim.de

# Zeitplan
![alt text](https://github.com/alxgrk/blockchain-hackathon-2019/blob/master/Screenshot%202019-12-02%20at%2012.26.47.png)
