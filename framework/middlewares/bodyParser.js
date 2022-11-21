const middlewareBodyParser = (req, res, next) => {
  console.log('middlewareBodyParser');
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      req.body = JSON.parse(body);
      next();
    } catch (err) {
      req.body = {};
      next();
    }
  });
}

export default middlewareBodyParser;