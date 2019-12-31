FROM node:13.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ADD package.json /app/
RUN npm install --silent
#RUN npm install react-scripts@3.0.1 -g --silent

CMD ["npm", "start"]
