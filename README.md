# blockchain-hackathon-2019

To run everything, just call `./start.sh {{github-username}} {{github-personal-access-token}}` or `./start.sh {{github-username}}` if you have stored the Github PAT (for more information see section below) in a file called `.dockerenv`.

Example call:
```
./start.sh alxgrk
```

Otherwise, follow below instructions.

# Preparation

Before you are able to start all services (especially `blockchain` service), you need to login to the Github Docker Registry.

Do so by running `docker login docker.pkg.github.com -u {{github-username}} -p {{github-personal-access-token}}`.

Note: make sure to create a Personal Access Token (PAT) before. This can be done [here](https://github.com/settings/tokens/new) by selecting "write:packages" scope.

Additionally, you need to create the common network for hyperledger-fabric and all other services by running `docker network create --label com.docker.compose.network=default --label com.docker.compose.project=blockchain_hackathon --label com.docker.compose.version=1.24.1 --attachable blockchain_hackathon`.

# Start all services

```
docker-compose -f docker-compose.yml -f hyperledger-fabric/docker-compose.yml up -d
```

# Updating blockchain code

```
docker-compose exec blockchain /hyperledger-fabric/the-aktivist-network/upgrade.sh
```

# Recreate services after changing something

```
docker-compose -f docker-compose.yml -f hyperledger-fabric/docker-compose.yml up -d --build {{service-name}}
# or for all hyperledger-related services (`peer0.org1.example.com`, `couchdb`, `orderer.example.com`, `ca.org1.example.com` and `blockchain`)
docker-compose -f docker-compose.yml -f hyperledger-fabric/docker-compose.yml up -d --force-recreate {{service-name}}
```

# Stop and clean all services

```
docker-compose -f docker-compose.yml -f hyperledger-fabric/docker-compose.yml down
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
cd blockchain/the-aktivist-network
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
