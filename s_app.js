
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'tehmi2000',
  applicationName: 'studentserverlessapi-app',
  appUid: 'jjd8ys0SMjK5vchrgK',
  orgUid: 'wKKC63x9TsD0WgKynr',
  deploymentUid: 'ace55b30-384b-4d2b-ae6c-12411b3d6c4b',
  serviceName: 'studentserverlessapi',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '4.1.2',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'studentserverlessapi-dev-app', timeout: 6 };

try {
  const userHandler = require('./server.js');
  module.exports.handler = serverlessSDK.handler(userHandler.handler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}