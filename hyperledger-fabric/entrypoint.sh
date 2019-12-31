#!/bin/bash

# turn on bash's job control and debugging output
set -m
set -x

peer node start &

sleep 20

peer channel create -o orderer.example.com:7050 -c composerchannel -f /etc/hyperledger/configtx/composer-channel.tx
export CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp 
peer channel join -b composerchannel.block

fg
