# JavaScript


Here we can use a pre-built node express.js web application, and why not use a vulnerable one? 
https://github.com/SirAppSec/vuln-node.js-express.js-app 

### Install and start it at least once using
```bash
git clone https://github.com/SirAppSec/vuln-node.js-express.js-app
cd vuln-node.js-express.js-app
npm install
# npm install nodemon
npm run start
```

## Express
Using Express as an example of using log analysis to discover endpoints that are registered to the express.js router

Note that we need to have a log saved. This is standard practice, and this can even be used in production, by obtaining the logs(More advanced logging might use a better logging framework like winston/morgan etc): 
```json
// npm package.json:
"start": "DEBUG=* NODE_ENV=development node src/server.js --verbose > app.log 2> app_err.log"
```

After the app has been loaded and used:
```bash
chmod+x log-analysis.sh
./log-analysis.sh
```
```bash
#!/bin/bash

LOG_FILE="app_err.log"
OUTPUT_FILE="routes.log"

grep -E "express:router:route (get|post|put|delete|patch|head|options|connect|trace) " "$LOG_FILE" | \
awk '{match($0, /route (get|post|put|delete|patch|head|options|connect|trace) '\''([^'\'']+)'\''/, arr); if (arr[1] && arr[2]) print toupper(arr[1]), arr[2];}' > "$OUTPUT_FILE"
```
The routes will be saved to routes.log with their respective method  and path in every line(You might want to deduplicate)

Now let's compare the Swagger to the routes and find Shadow APis!