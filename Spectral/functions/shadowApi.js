const fs = require('fs');
const path = require('path');
const { createRulesetFunction } = require('@stoplight/spectral-core');

module.exports = createRulesetFunction(
  {
    input: {
      type: "object",
      additionalProperties: true,
    },
    options: {
      type: "object",
      properties: {
        routesFile: {
          type: "string",
        },
      },
      required: ["routesFile"],
    },
  },
  (targetVal, options, { path: contextPath }) => {
    const results = [];

    // Function to normalize paths
    const normalizePath = (methodPath) => {
      return methodPath
        .replace(/\/?:(\w+)/g, '/*') // Replace :var with /*
        .replace(/\/?{(\w+)}/g, '/*') // Replace {var} with /*
        .replace(/\/{2,}/g, '/') // Replace multiple slashes with a single slash
        .replace(/\/$/, '') // Remove trailing slash
        .replace(/^\//, ''); // Remove leading slash for consistency
    };

    // Resolve the path to the routes.log file relative to the current working directory
    const routesLogPath = path.join(process.cwd(), options.routesFile);
    if (!fs.existsSync(routesLogPath)) {
      return [{
        message: `The file ${options.routesFile} does not exist.`,
        code:"file-not-exist",
        path: contextPath,
      }];
    }

    const routesLogEntries = fs.readFileSync(routesLogPath, 'utf8')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(normalizePath);

    if (!targetVal) {
      return [{
        message: "The OpenAPI document does not contain paths.",
        code:"missing-paths-in-document",
        path: contextPath,
      }];
    }

    const openApiPaths = Object.entries(targetVal)
      .flatMap(([apiPath, methods]) =>
        Object.keys(methods).map(method => normalizePath(`${method.toUpperCase()} ${apiPath}`))
      );

    const missingInOpenApi = routesLogEntries.filter(route => !openApiPaths.includes(route));
    const missingInRoutesLog = openApiPaths.filter(apiPath => !routesLogEntries.includes(apiPath));

    if (missingInOpenApi.length > 0) {
      missingInOpenApi.forEach(route => {
        const [method, path] = route.split(' ');
        results.push({
          message: `Shadow API Identified: Endpoint '${route}' in routes.log is not present in the OpenAPI paths.`,
          code:'missingInOpenAPI',
          path: [...contextPath, '.paths'],
        });
      });
    }

    if (missingInRoutesLog.length > 0) {
      missingInRoutesLog.forEach(apiPath => {
        const [method, path] = apiPath.split(' ');
        results.push({
          message: `Path '${apiPath}' in OpenAPI is not registered in routes.log.`,
          code:"path-is-missing-from-routes",
          path: [...contextPath, 'paths', path, method.toLowerCase()],
        });
      });
    }

    if (results.length>0){
      results.forEach(result => {
       console.error("\nError! "+result.message)
      });
      return results
    } else {
      return undefined
    }
    // return results.length > 0 ? results : null;
  }
);
