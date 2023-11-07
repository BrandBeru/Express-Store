const express = require('express');
const routerApi = require('./routes');
const {checkApiKey} = require('./middlewares/auth.handler')
//const cors = require('cors')
const { logErrors, errorHandler, boomErrorhandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const whiteList = ['http://localhost:3000', 'https://branberu.tech']
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin)){
      callback(null, true)
      return;
    }
    callback(new Error('not allow'), false);
  }
}
require('./utils/auth')
app.get('/api/v1', checkApiKey, (req, res) => {
  res.send('Hola mi server en express');
})
routerApi(app)
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorhandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('My port ' + port);
});
