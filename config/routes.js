const router = require('express').Router()
const plants = require('../controllers/plants')
const auth = require('../controllers/auth')
const user = require('../controllers/users')
const publicUser = require('../controllers/publicProfiles')
const secureRoute = require('../lib/secureRoute')
const apiProxies = require('../controllers/apiProxies')
const offer = require('../controllers/offers')


router.route('/plants')
  .get(plants.index)
  .post(secureRoute, plants.create)

router.route('/plants/:id')
  .get(plants.show)
  .put(secureRoute, plants.update)
  .delete(secureRoute, plants.delete)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

router.route('/profile')
  .get(secureRoute, user.profile)

router.route('/profile/:id')
  .get(publicUser.profile)
  
router.route('/trefle')
  .post(apiProxies.getTrefleInfo)

router.route('/maps')
  .post(apiProxies.getLocation)
  
router.route('/offer/:id')
  .post(secureRoute, offer.newOffers)

router.route('/response/:id/:plantid')
  .post(secureRoute, offer.respondOffer)

module.exports = router