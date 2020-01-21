#!/bin/bash

#set -x

source .dockerenv

USERNAME=$1
VERSION=$2
GITHUB_PAT=${3:-$GITHUB_PAT}

OWNER=alxgrk
REPOSITORY=blockchain-hackathon-2019
NAME=blockchain

checkParams() {
    local errorMessage=""

    [[ -z $USERNAME ]] \
        && errorMessage=$'Please specify your Github username as first parameter.\n'
    [[ -z $VERSION ]] \
        && errorMessage=$(echo -e "${errorMessage}Please specify the version of your build as second parameter.\n")
    [[ -z $GITHUB_PAT ]] \
        && errorMessage=$(echo -e "${errorMessage}Please specify your Github Personal Access Token as third parameter or via .dockerenv file.\n")
    
    [[ -n $errorMessage ]] \
        && echo "$errorMessage" && echo "" && echo "Example call: './buildAndPublish.sh alxgrk 1.0.0 123123123123123123' or './start.sh alxgrk 1.0.0' if you created the .dockerenv file." && exit 1
}

checkParams

# login to github registry
docker login docker.pkg.github.com -u $USERNAME -p $GITHUB_PAT

# build image with github tag (and latest)
docker build -t docker.pkg.github.com/$OWNER/$REPOSITORY/$NAME:$VERSION .

# publish
docker push docker.pkg.github.com/$OWNER/$REPOSITORY/$NAME:$VERSION
