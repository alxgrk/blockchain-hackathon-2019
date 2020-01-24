#!/bin/bash

set -x

cd /hyperledger-fabric/the-aktivist-network/

NEW_VERSION=$(npm version patch | sed 's/v//')

composer archive create -t dir -n .
composer network install -a the-aktivist-network@${NEW_VERSION}.bna -c PeerAdmin@hlfv1
composer network upgrade -n the-aktivist-network -V ${NEW_VERSION} -c PeerAdmin@hlfv1

# restart rest server
ps -ef | grep [c]omposer-rest-server | awk '{print $2}' | xargs kill
composer-rest-server -c admin@the-aktivist-network -n never -d n -w true -p 9876
