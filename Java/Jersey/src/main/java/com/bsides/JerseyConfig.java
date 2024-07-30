package com.bsides;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

@Component
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
        packages("com.bsides"); // Specify the package to scan for resources
    }
}