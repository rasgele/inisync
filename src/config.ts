import {osConstants} from './osUtils';

export interface Config {
  credentialsPath: string;
  watchPath: string;
  watchPattern: string;
  keepWatchedFile: boolean;
}

export const defaultConfig: Config = {
  credentialsPath: osConstants.awsCredentialsPath,
  watchPath: osConstants.downloadDirectory,
  watchPattern: 'aws_sts*',
  keepWatchedFile: false,
};
