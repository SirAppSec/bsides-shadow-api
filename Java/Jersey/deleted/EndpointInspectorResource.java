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