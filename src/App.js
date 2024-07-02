const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');
dotenv.config();
const dataSource = require('./infrastructure/psql');
const path = require('path');
const fastifyStatic = require('@fastify/static');
const fastifyMultipart = require('@fastify/multipart');
const {logger}=require('../logger')

const contactRoute = require('./routes/contactRoutes');
const webPlaneRoute = require('./routes/webPlanesRoute');
const digitalMarketingRoute = require('./routes/digitalMarketingRoute');
const appPlaneRoute = require('./routes/appPlaneRoutes');
const seoRoute = require('./routes/seoRoute');
const logoPlaneRoute = require('./routes/logoPlaneRoutes');
const allPlanesRoutes = require('./routes/allPlanesRoutes');
const AdminAuthRoute = require('./routes/adminAuth');

fastify.register(require('@fastify/cors'), {
  origin: ['http://localhost:3000', 'https://www.softmarksolutions.com', 'http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST'],
  credentials: true,
});

fastify.register(fastifyMultipart, {
  limits: {
    fieldNameSize: 100,
    fieldSize: 1000000,
    fields: 10,
    fileSize: 1000000,
    files: 10,
    headerPairs: 2000,
  },
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../uploads'),
  prefix: '/uploads/', // This will serve files under http://yourhost/uploads/
});

fastify.get('/', async (req, res) => {
  const result = {
    code: 200,
    status: 'OK',
    message: 'Fastify server is running',
  };
  res.send(result);
});

fastify.register(contactRoute);
fastify.register(webPlaneRoute);
fastify.register(digitalMarketingRoute);
fastify.register(appPlaneRoute);
fastify.register(seoRoute);
fastify.register(logoPlaneRoute);
fastify.register(AdminAuthRoute);
fastify.register(allPlanesRoutes);

const startServer = async () => {
  try {
    await dataSource.initialize();
    logger.info("Database connection has been established");

    await fastify.listen(process.env.PORT || 4000);
    logger.info(`Server is listening on ${process.env.PORT || 4000}`);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

module.exports = startServer;