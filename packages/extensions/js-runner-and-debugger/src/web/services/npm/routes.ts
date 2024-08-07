import { Container } from 'inversify';
import { Router } from '../../utils/webview/routing/router';
import { PackageJsonController } from './controllers/package-json-controller';
import { ConfigController } from './controllers/config-controller';

export default (app: Container) => {
  const router = app.get(Router);
  router.get('/package-json-files', [
    PackageJsonController,
    'getPackageJSONFiles',
  ]);
  router.post('/update-confirmation', [
    PackageJsonController,
    'showUpdateConfirmation',
  ]);
  // router.post("/depcheck", [PackageJsonController, "runDepCheck"]);
  router.post('/installed', [PackageJsonController, 'getInstalledPackages']);
  router.post('/install', [PackageJsonController, 'installPackages']);
  router.post('/remove', [PackageJsonController, 'removePackages']);
  router.post('/change-version', [PackageJsonController, 'changeVersion']);
  router.post('/update', [PackageJsonController, 'updatePackages']);
  router.get('/config', [ConfigController, 'getConfig']);
};
