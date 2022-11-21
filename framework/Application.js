import http from "node:http";
import { EventEmitter } from "node:events";

class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware) {
    // register middleware
    this.middlewares.push(middleware);
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  // endpoints = {
  //   '/users': {
  //     'GET': handler
  //     }
  //   }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];

            handler(req, res);

        });
      });
    });
  }

  _executeMiddlewares(middlewares, req, res, next) {
    // console.log(middlewares);
    if (middlewares.length === 0) {
      return next();
    }
    const currentMiddlware = middlewares[0];
    const nextMiddlewares = middlewares.slice(1);
    return currentMiddlware(req, res, () => 
      this._executeMiddlewares(nextMiddlewares, req, res, next)
    );
  }

  _createServer() {
    return http.createServer((req, res) => {
      this._executeMiddlewares(this.middlewares, req, res, () => {
      const emmitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res); // return true or false
        if (!emmitted) {
          res.end("404 Not Found");
        }
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}

export default Application;
