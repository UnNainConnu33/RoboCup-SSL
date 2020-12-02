import Action from '@ssl/types/internal/task-manager/tasks/actions'
import { StopPacket } from '@ssl/types/internal/control/packet'
import { Control } from '@ssl/types/internal/control'
import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { Color } from '@ssl/types/utils/utils'

import state from '../models/GameState'

export default class StopAction extends Action {
  public name = 'stop';

  constructor(public id : number) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      id: 'number',
    },
    handler(ctx: Context<StopPacket>): void {
      ctx.broker.logger.debug('stop packet received')
      state.actionManager.register(ctx.params.id, new StopAction(ctx.params.id))
    },
  }

  public compute(broker: ServiceBroker): boolean {
    void broker.call('bots-gateway.control', {
      id: this.id,
      yellow: state.data.color === Color.YELLOW,
      velocity: {
        angular: 0,
        tangent: 0,
        normal: 0,
      },
    } as Control)

    return true
  }
}
