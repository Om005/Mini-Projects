import { app, prisma } from './app';
import { env } from './config/env';

const server = app.listen(env.port, () => {
  console.log(`✅ Server running on port ${env.port} in ${env.nodeEnv} mode`);
});

const shutdown = async () => {
  console.log('🛑 Shutting down server...');
  await prisma.$disconnect();
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', shutdown);
process.on('unhandledRejection', shutdown);
