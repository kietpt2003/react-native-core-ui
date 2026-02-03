import { WEB } from '@kietpt2003/react-native-core-ui/utils'
import { Alert } from 'react-native';

export function showAlert(
  title: string,
  message?: string
) {
  if (WEB) {
    window.alert(message ? `Title: ${title}\nMessage: ${message}` : title);
    return;
  }

  Alert.alert(title, message);
}