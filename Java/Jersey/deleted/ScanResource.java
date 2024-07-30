package com.bsides;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.server.ResourceConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.glassfish.jersey.server.model.Resource;

import javax.ws.rs.core.Application;
import javax.ws.rs.core.Context;

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
@Path("/hello")
public class HelloWorldResource {
    @GET
    public Response getHello() {
        return Response.ok("Hello, World!").build();
    }
}

@Path("/scan")
public class ScanResource {
    @GET
    public Response getHello() {
        return Response.ok(EndpointInspector.inspectResource()).build();
    }
}