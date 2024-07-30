# Java 
In this folder we have 2 maven projects, Jersey and SpringBoot.

## to run:
cd in to the project,
```powershell
mvn clean install -U
mvn spring-boot:run
```

## To identify All APIs:
The following techniques can be used to identify runtime endpoints that the service exposes:
### Jersey - WADL
WADL(Web Application Descriptor Language) can be used in this location: http://localhost:8080/application.wadl?detail=true 
after adding the following dependencies:
```xml
    <dependency>
        <groupId>javax.xml.bind</groupId>
        <artifactId>jaxb-api</artifactId>
        <version>2.3.1</version>
    </dependency>
    <dependency>
        <groupId>org.glassfish.jaxb</groupId>
        <artifactId>jaxb-runtime</artifactId>
        <version>2.3.1</version>
    </dependency>
    <dependency>
        <groupId>com.sun.xml.bind</groupId>
        <artifactId>jaxb-core</artifactId>
        <version>2.3.0.1</version>
    </dependency>
```

### SpringBoot
Spring boot Actuator: https://spring.io/guides/gs/actuator-service
used to enable some runtime/dev monitoring
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### Old school annotation scanner: 
```
public class EndpointInspector {
    private final Application application;

    public EndpointInspector(@Context Application application) {
        this.application = application;
    }

    public String inspectResources() {
        try {
            ResourceConfig resourceConfig = (ResourceConfig) application;
            ObjectMapper mapper = new ObjectMapper();
            // This will collect details of all registered resources
            return mapper.writeValueAsString(resourceConfig.getResources());
        } catch (Exception e) {
            return "Error processing JSON: " + e.getMessage();
        }
    }
}
```


For CI or scalable automated scanning you can add a path to query:
```

@Path("/scan")
public class ScanResource {
    @GET
    public Response getHello() {
        return Response.ok(EndpointInspector.inspectResource()).build();
    }
}
```

The original techniques only requires to add a jar file containing the scanner so it will not need any special dependencies.