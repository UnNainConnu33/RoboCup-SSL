import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { MoveToPacket } from '@ssl/types/internal/control/packet'
import Strategies from '@ssl/types/internal/task-manager/tasks/strategies'

import { state } from '../../models/GameState'

/**
 * This class is an example of the new way to create Strategies.
 * It is basic and needs to be improved !
 * call "MSB.triangle" ' { "ids" : [1,2,3] }' (To try with npm run repl)
 */
export default class Triangle extends Strategies {
  name = 'triangle';

  public constructor(public ids: Array<number>) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      ids: {
        type: 'array', items: 'number', min: 3, max: 3,
      },
    },
    handler(ctx: Context<{ ids: Array<number> }>): void {
      ctx.broker.logger.info('MoveToPacket packet received')
      state.assign.register(ctx.params.ids, new Triangle(ctx.params.ids))
    },
  }
  
  compute(broker: ServiceBroker): boolean {
    void broker.call('bots-control.moveTo', {
      id: this.ids[0],
      target: { x: 0, y: 0 },
      orientation: -3.14,
      expectedReachTime: 10,
    } as MoveToPacket)

    void broker.call('bots-control.moveTo', {
      id: this.ids[1],
      target: { x: -0.75, y: 1.25 },
      orientation: -3.14,
      expectedReachTime: 10,
    } as MoveToPacket)

    void broker.call('bots-control.moveTo', {
      id: this.ids[2],
      target: { x: -0.75, y: -1.25 },
      orientation: -3.14,
      expectedReachTime: 10,
    } as MoveToPacket)

    return true
  }
}
