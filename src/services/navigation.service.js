import {Router} from '@vaadin/router';

export class NavigationService {
  static async navigateTo(path) {
    try {
      await Router.go(path);
      return true;
    } catch (error) {
      console.error('Navigation failed:', error);
      throw new Error('Navigation failed');
    }
  }
}
