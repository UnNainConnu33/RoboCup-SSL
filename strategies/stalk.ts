import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { MoveToPacket } from '@ssl/types/internal/control/packet'
import Strategies from '@ssl/types/internal/task-manager/tasks/strategies'
import { sqrt, square, abs, sign, sin, cos, pi } from 'mathjs'
import { state } from '../../models/GameState'

/**
 * Ce script permet à un robot donné d'aller à une position relative d'un autre robot(adverse)
 * call "MSB.stalk" ' { "ids" : [1,2,0.5] }'
 */
export default class Stalk extends Strategies {
  name = 'stalk';

  public constructor(public ids: Array<number>) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      ids: {
        type: 'array', items: 'number', min: 3, max: 3,
      },//ID du robot à déplacer, ID du robot à rejoindre et distance au robot
      
    },
    handler(ctx: Context<{ ids: Array<number> }>): void {
      ctx.broker.logger.info('MoveToPacket packet received')
      state.assign.register(
        ctx.params.ids, 
        new Stalk(ctx.params.ids)
      )
    },
  }

  compute(broker: ServiceBroker): boolean {
    const robot_opponent = state.data.robots.opponents[this.ids[1]]
    const X_opponent = robot_opponent.position.x
    const Y_opponent = robot_opponent.position.y
    const angle = robot_opponent.orientation
    const distance = this.ids[2]
    const X = X_opponent + (distance * cos(angle))
    const Y = Y_opponent + (distance * sin(angle))

    void broker.call('bots-control.moveTo', {
      id: this.ids[0],
      target: { x: X, y: Y },
      orientation: angle + pi,
      expectedReachTime: 10,
    } as MoveToPacket)

    return true
  }
}
