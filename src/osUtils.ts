import * as os from 'os';
import path = require('path');

interface OSConstants {
  readonly downloadDirectory: string;
  readonly awsCredentialsPath: string;
}

export const osConstants: OSConstants = {
  awsCredentialsPath: path.join(os.homedir(), '.aws', 'credentials'),
  downloadDirectory: path.join(os.homedir(), 'Downloads'),
};
