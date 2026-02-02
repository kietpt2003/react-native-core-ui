import { Platform } from 'react-native';

export const ANDROID = Platform.OS === 'android';
export const IOS = Platform.OS === 'ios';
export const MACOS = Platform.OS === 'macos';
export const WEB = Platform.OS === 'web';
export const WINDOWS = Platform.OS === 'windows';
