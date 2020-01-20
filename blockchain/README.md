# blockchain-hackathon-2019

Below steps are done for you, when you are using the Dockerfile.

## Do things using docker

### Build and publish the image
```
./buildAndPublish {{github-username}} {{version}} {{personal-access-token}}

e.g.
./buildAndPublish alxgrk 1.0.0 123123123123123123123123
```
Note: make sure to create a Personal Access Token (PAT) before. This can be done [here](https://github.com/settings/tokens/new) by selecting "write:packages" scope.
You can also omit the third parameter and place the PAT in a file called `.dockerenv` like so:
```
# Github Personal Access Token
GITHUB_PAT=...
```

### Upgrade network
```
docker exec -t {{container_id}} /hyperledger-fabric/the-aktivist-network/upgrade.sh
```

## Do things manually

How to create an archive:
```
cd blockchain/the-aktivist-network
../composer archive create -t dir -n .
```

How to deploy network:
```
cd blockchain/the-aktivist-network
../composer network install --card PeerAdmin@hlfv1 --archiveFile the-aktivist-network@0.0.1.bna
../composer network start --networkName the-aktivist-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
../composer card import --file networkadmin.card
```

How to update network:
```
cd blockchain/the-aktivist-network
../composer archive create -t dir -n . -a the-aktivist-network@0.0.1.bna
../composer network update -a the-aktivist-network@0.0.1.bna --card admin@the-aktivist-network
```

Show playground:
```
cd blockchain/the-aktivist-network
../composer-playground
```

Start Rest Server:
```
cd blockchain/the-aktivist-network
../composer-rest-server -c admin@the-aktivist-network -n never -d n -w true -p 9876
```

