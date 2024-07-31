# Spectral
we can use any method to iterate the routes and match them against The swagger. I've opted to use Spectral but eslint or any other 

The advantage to swagger is that it's CI/CD ready and can use cli status code to report on passing and failing CI checks.

# Install Spectral
```bash
npm install -g @stoplight/spectral-cli
```

# routes.log
Ensure that all of the extracted routes are in a file in the following format, every line is a new endpoint , first word is the method, a space and the path.

### Normalization
| Because some path variables in REST are noted differently, we would normalize the paths in an internal step. As we don't care about the name of the path variable, just the fact that it is a variable.

routes file should look like this:
```
GET /
POST /send
PUT /profile/:id
DELETE /user/{userEmail}
```

## Validation
for the command to work without specifying the spectral custom function or the ruleset file, Spectral look for the function/ directory and loads the custom functions. And Spectral also looks for the `.spectral.yaml` file if exists as a default rule.


Run the following CLI:
```bash
spectral lint swagger.json 
```

if the routes.log is in a different directory, you can edit .spectral.yaml to specify the file path.