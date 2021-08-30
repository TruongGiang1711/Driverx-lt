// import Raven from "raven-js";

function init() {
  // Raven.config(
  //   "https://ad390042c1b14e9c9d8a3ed40644b538@o948621.ingest.sentry.io/5898099",
  //   {
  //     release: "1-0-0",
  //     environment: "development-test",
  //   }
  // ).install();
}

function log(error) {
  // Raven.captureException(error);
  console.log(error);
}

export default {
  init,
  log,
};
