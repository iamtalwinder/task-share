import { UNAUTHORIZED_EVENT } from './contants';

export class EventDispatcher {
  static dispatch(eventType, eventDetail = null) {
    window.dispatchEvent(new CustomEvent(eventType, { detail: eventDetail }));
  }

  static dispatchUnauthorized(message = '') {
    this.dispatch(UNAUTHORIZED_EVENT, { message });
  }
}
