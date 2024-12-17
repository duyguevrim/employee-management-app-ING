import {LitElement} from 'lit';

import {Localized} from '../../translations/localized';

export class BaseComponent extends Localized(LitElement) {
  render() {
    return this;
  }
}

export default BaseComponent;
