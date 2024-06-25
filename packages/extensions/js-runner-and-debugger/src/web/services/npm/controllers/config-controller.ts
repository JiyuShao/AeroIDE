import { Controller } from '../../../utils/webview/routing/controller';
import { workspace } from 'vscode';

export class ConfigController extends Controller {
  async hideSupportIcon() {
    const config = workspace.getConfiguration('js-runner-and-debugger.npm');
    config.update('showSupportIcon', false);
  }

  async getConfig() {
    const config = workspace.getConfiguration('js-runner-and-debugger.npm');
    return {
      runAudit: config.get('runAudit'),
      showAnalyzeTab: config.get('showAnalyzeTab'),
      showSupportIcon: config.get('showSupportIcon'),
      showResultDescription: config.get('showResultDescription'),
      excludeVersions: config.get('excludeVersions'),
      showAlgoliaInfo: config.get('showAlgoliaInfo'),
      showShortcuts: config.get('showShortcuts'),
      maxNumberOfResults: config.get('maxNumberOfResults'),
      analyze: config.get('analyze'),
    };
  }
}
