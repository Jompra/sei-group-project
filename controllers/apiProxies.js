const axios = require('axios')

async function getTrefleInfo(req, res) {
  try {
    console.log('backend recieved: ', req.body)
    const query = req.body.search
    
    const response = await axios.get(`https://trefle.io/api/plants?q=${query}&token=S2RkU2JTY2tqbjJPVUV6MFRsYmUvdz09`)
    console.log('BE Response', response.data)
    res.status(200).json(response.data)
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  getTrefleInfo
}