#!/bin/bash

#set -x

source .dockerenv

USERNAME=$1
GITHUB_PAT=${2:-$GITHUB_PAT}

checkParams() {
    local errorMessage=""

    [[ -z $USERNAME ]] \
        && errorMessage=$'Please specify your Github username as first parameter.\n'
    [[ -z $GITHUB_PAT ]] \
        && errorMessage=$(echo -e "${errorMessage}Please specify your Github Personal Access Token as second parameter or via .dockerenv file.\n")

    [[ -n $errorMessage ]] \
        && echo "$errorMessage" && echo "" && echo "Example call: './start.sh alxgrk 123123123123123123' or './start.sh alxgrk' if you created the .dockerenv file." && exit 1
}

checkParams

# login to github registry
docker login docker.pkg.github.com -u $USERNAME -p $GITHUB_PAT

docker network create --label com.docker.compose.network=default --label com.docker.compose.project=blockchain_hackathon --label com.docker.compose.version=1.24.1 --attachable blockchain_hackathon
docker-compose -f docker-compose.yml -f hyperledger-fabric/docker-compose.yml up -d
