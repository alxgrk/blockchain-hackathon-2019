# blockchain-hackathon-2019

# Hyperledger Fabric
https://hyperledger.github.io/composer/latest/installing/development-tools.html

https://hyperledger.github.io/composer/latest/integrating/getting-started-rest-api.html

## How to start fabric
```
./startFabric.sh
./createPeerAdminCard.sh
```

How to deploy network:
```
cd hyperledger-composer/aktivist-network
../composer network install --card PeerAdmin@hlfv1 --archiveFile aktivist-network@0.0.1.bna
../composer network start --networkName aktivist-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
../composer card import --file networkadmin.card
```

How to update network:
```
cd hyperledger-composer/aktivist-network
../composer archive create -t dir -n . -a aktivist-network@0.0.1.bna
../composer network update -a aktivist-network@0.0.1.bna --card admin@aktivist-network
```

Show playground:
```
cd hyperledger-composer/aktivist-network
../composer-playground
```

Start Rest Server:
```
cd hyperledger-composer/aktivist-network
../composer-rest-server -c admin@aktivist-network -n never -d n -w true -p 9876
```

# Screensharing
https://whereby.com/alxgrk

# Kontaktdaten

Telefon: 0178/3537303
Email: h.freudenreich@senstim.de

# Zeitplan
![alt text](https://github.com/alxgrk/blockchain-hackathon-2019/blob/master/Screenshot%202019-12-02%20at%2012.26.47.png)
