export function buildExpressCallback(requestHandler) {
  return async function expressCallback(req, res) {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };

    const httpResponse = await requestHandler(httpRequest);

    if (httpResponse.headers) {
      res.set(httpResponse.headers);
    }

    res.type('json');
    res.status(httpResponse.status).json(httpResponse.json);
  };
}
