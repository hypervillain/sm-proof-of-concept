const express = require('express')
const app = express()

const createPackageURLs = require("./package").createPackageURLs
const fetchSliceDef = require("./fetch").fetchSliceDef

const authorizedLibs = ["@any/thing", "sm-library", "@babel/standalone"];

app.get("/fetch/*?", async function(req, res) {
  // Todo: check if token query param is valid
  const pathname = req.params[0]
  try {
    // returns valid unpkg urls
    const { packageInfo, ...urls  } = createPackageURLs(pathname);
    
    const isAuthorized = Boolean(authorizedLibs.indexOf(packageInfo.packageName) !== -1)

    if (!isAuthorized) {
      return res.send('Unauthorized.')
    }

    const sliceDef = await fetchSliceDef(urls);

    console.log('You can store this somewhere -->', sliceDef)

    res.send(sliceDef);
  } catch(e) {
    // Notify publisher
    console.error(e)
    res.send(e)
  }
})

app.get('/', function (req, res) {
  res.send("Try this url: localhost:8000/fetch/sm-library");
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})