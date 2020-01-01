# Rest API

## Build artifact

To build a new version of the Spring application, simply run `./mvnw clean install`.

Do so, before rebuilding docker image in project root like so: `docker-compose up --build`

To run the app on port 8091 without interacting with any docker component, run `./mvnw spring-boot:run -Dspring-boot.run.profiles=local`