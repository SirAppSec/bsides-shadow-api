#BsidesLV 2024
This is a snippet folder from the Bsides Las Vegas Talk - [Prepare for the Appocalypse - Exposing Shadow and Zombie APIs](https://bsideslv.org/talks#RDFDDA)

# Shadow APIs
Shadow and Zombie APIs are pieces of old/forgotten code that is still externally reachable. They are not maintained, and often prone to have vulnerabilities or leak PIIs.

## Discovering Shadow APIs
We have several methods of extracting what the application/service is exposing.

- Source Code Analysis
- Dependency Injection
- Code Injection
- Runtime/Framework query
- Log Analysis
- Traffic Analysis
- Brute Force URIs

In this directory we have several frameworks with different methods of discovering shadow APIs.

### Java
Here we use Dependency Injection and Source Code Analysis

Deep Dive: [./Java/README.md](./Java/README.md)

### Python
Here we simply ask the managing framework what it has registered in it's router.

Deep Dive: [./Python/README.md](./Python/README.md)

### Javascript - Node
Here we use Log analysis to extract the endpoints registered to the Express.js router.

Deep Dive: [./JavaScript/README.md](./JavaScript/README.md)


## Reporting
After we've identified which APIs the service exposes. Let's compare it with what we have in our OpenAPI Specification.

Spectral is a framework used to lint OpenAPI Specification Schema file(Swagger).
We'll use this tool to run a custom function that will normalize the endpoints, and compare the routes we identified to the Specification file.

Deep Dive: [./Spectral/README.md](./Spectral/README.md)