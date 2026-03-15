const env = process.env.ABC_D||'development'
const credentials = require(`./.credentials.${env}`)
module.exports = {credentials}