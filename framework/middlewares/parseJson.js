const middlewareJsonParser = (req, res, next) => {
  console.log('middlewareJsonParser');
  res.sendMy = (data, status = 200) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  }
  next();
}

export default middlewareJsonParser;