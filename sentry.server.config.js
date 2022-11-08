import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://5ca4ee2a945f4cf78fa1c36bdd1c3129@o1414805.ingest.sentry.io/4504089257836544',
  tracesSampleRate: 1.0,
});
