FROM node:8-slim

WORKDIR /hyperledger-fabric

ENV PATH /hyperledger-fabric/node_modules/.bin:$PATH

RUN apt-get update || : && apt-get install python make build-essential g++ -y

ADD entrypoint.sh /hyperledger-fabric/
ADD fabric-scripts /hyperledger-fabric/fabric-scripts/
ADD *.sh /hyperledger-fabric/
ADD package.json DevServer_connection.json /hyperledger-fabric/

ADD the-aktivist-network/features /hyperledger-fabric/the-aktivist-network/features/
ADD the-aktivist-network/lib /hyperledger-fabric/the-aktivist-network/lib/
ADD the-aktivist-network/models /hyperledger-fabric/the-aktivist-network/models/
ADD the-aktivist-network/test /hyperledger-fabric/the-aktivist-network/test/
ADD the-aktivist-network/package.json the-aktivist-network/permissions.acl the-aktivist-network/README.md /hyperledger-fabric/the-aktivist-network/

RUN npm install

CMD ./entrypoint.sh
