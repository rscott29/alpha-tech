import { RxStompService } from './rx-stomp.service';
import {stompConfig} from "./stomp-config";


export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(stompConfig);
  rxStomp.activate();
  return rxStomp;
}
