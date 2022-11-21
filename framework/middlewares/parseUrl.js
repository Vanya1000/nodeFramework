const middlwareParseUrl = (baseUrl) => (req, res, next) => {
  const parseUrl = new URL(req.url, baseUrl);
  //console.log(parseUrl);
  req.pathname =  parseUrl.pathname;
  const params = {};
  for (const [key, value] of parseUrl.searchParams) {
    params[key] = value;
  }
  req.params = params;
  //console.log(params);
  next();
}

export default middlwareParseUrl;