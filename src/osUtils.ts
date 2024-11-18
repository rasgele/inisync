import * as os from 'os';

interface OSConstants {
  readonly downloadDirectory: string;
  readonly awsCredentialsPath: string;
}

export const osConstants: OSConstants = {
  awsCredentialsPath: os.homedir() + '/.aws/credentials',
  downloadDirectory: os.homedir() + '/Downloads',
};
