import { Router } from '../../utils/webview/routing/router';
import { PackageJsonController } from './controllers/package-json-controller';
import { ConfigController } from './controllers/config-controller';

export default (router: Router) => {
  router.get('/package-json-files', [
    PackageJsonController,
    'getPackageJSONFiles',
  ]);
  router.post('/update-confirmation', [
    PackageJsonController,
    'showUpdateConfirmation',
  ]);
  router.post('/security-audit', [PackageJsonController, 'getSecurityAudit']);
  // router.post("/depcheck", [PackageJsonController, "runDepCheck"]);
  router.post('/installed', [PackageJsonController, 'getInstalledPackages']);
  router.post('/install', [PackageJsonController, 'installPackages']);
  router.post('/remove', [PackageJsonController, 'removePackage']);
  router.post('/swap', [PackageJsonController, 'swapPackageType']);
  router.post('/change-version', [PackageJsonController, 'changeVersion']);
  router.post('/update', [PackageJsonController, 'updatePackages']);
  router.get('/config', [ConfigController, 'getConfig']);
};
