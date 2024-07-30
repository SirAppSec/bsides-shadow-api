# Run Maven clean and install
mvn clean install

# Move the WAR file to the Tomcat webapps directory
Move-Item -Force -Path ".\target\shadow-api-1.0-SNAPSHOT.war" -Destination "C:\Program Files\Apache\Tomcat\webapps\shadow-api-1.0-SNAPSHOT.war"

# Stop Tomcat
& "C:\Program Files\Apache\Tomcat\bin\shutdown.bat"

# Wait for Tomcat to shut down completely (adjust time as needed)
Start-Sleep -Seconds 1

# Start Tomcat
& "C:\Program Files\Apache\Tomcat\bin\startup.bat"