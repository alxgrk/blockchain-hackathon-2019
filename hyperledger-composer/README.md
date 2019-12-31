# blockchain-hackathon-2019

Below steps are done for you, when you are using the Dockerfile.

## Do things manually

How to create an archive:
```
cd hyperledger-composer/the-aktivist-network
../composer archive create -t dir -n .
```

How to deploy network:
```
cd hyperledger-composer/the-aktivist-network
../composer network install --card PeerAdmin@hlfv1 --archiveFile the-aktivist-network@0.0.1.bna
../composer network start --networkName the-aktivist-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
../composer card import --file networkadmin.card
```

How to update network:
```
cd hyperledger-composer/the-aktivist-network
../composer archive create -t dir -n . -a the-aktivist-network@0.0.1.bna
../composer network update -a the-aktivist-network@0.0.1.bna --card admin@the-aktivist-network
```

Show playground:
```
cd hyperledger-composer/the-aktivist-network
../composer-playground
```

Start Rest Server:
```
cd hyperledger-composer/the-aktivist-network
../composer-rest-server -c admin@the-aktivist-network -n never -d n -w true -p 9876
```
