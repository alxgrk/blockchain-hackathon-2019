#/bin/bash

# turn on bash's job control
set -m
set -x

# contents of createPeerAdminCard.sh
composer card create -p DevServer_connection.json -u PeerAdmin -c "/hyperledger-fabric/fabric-scripts/hlfv12/composer/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem" -k "/hyperledger-fabric/fabric-scripts/hlfv12/composer/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk" -r PeerAdmin -r ChannelAdmin --file /tmp/PeerAdmin@hlfv1.card
if ! composer card list -c PeerAdmin@hlfv1 > /dev/null; 
then 
	cp /tmp/PeerAdmin@hlfv1.card /hyperledger-fabric/admin-cards/
	#composer card delete -c PeerAdmin@hlfv1
fi
composer card import --file /hyperledger-fabric/admin-cards/PeerAdmin@hlfv1.card
rm /tmp/PeerAdmin@hlfv1.card

#while [ $(composer network ping -c PeerAdmin@hlfv1 > /dev/null; echo $?) -ne 0 ]
#do
#    echo "Waiting for Hyperledger-Fabric to come up..."
#    sleep 10
#done

# create and install archive
cd /hyperledger-fabric/the-aktivist-network
if ! composer network list -c admin@the-aktivist-network > /dev/null;
then
	composer archive create -t dir -n .
	composer network install --card PeerAdmin@hlfv1 --archiveFile the-aktivist-network@0.0.1.bna
	composer network start --networkName the-aktivist-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file the-aktivist-network-admin.card

	cp the-aktivist-network-admin.card /hyperledger-fabric/admin-cards/
fi
composer card import --file /hyperledger-fabric/admin-cards/the-aktivist-network-admin.card

nohup composer-rest-server -c admin@the-aktivist-network -n never -d n -w true -p 9876 &

# upgrade once in the beginning
/hyperledger-fabric/the-aktivist-network/upgrade.sh

composer-playground

