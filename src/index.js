const express = require('express');
const routerApi = require('./routes');
const {checkApiKey} = require('./middlewares/auth.handler')
const cors = require('cors')
const { logErrors, errorHandler, boomErrorhandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const whiteList = ['localhost:3000', 'https://api.branberu.tech']
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin)){
      callback(null, true)
      return;
    }
    callback(new Error('not allow'), false);
  }
}
app.use(cors(options))
require('./utils/auth')
app.get('/store/v1', checkApiKey, (req, res) => {
  res.send('API para una tienda en linea con un server en express');
})
routerApi(app)
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorhandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('My port ' + port);
});
