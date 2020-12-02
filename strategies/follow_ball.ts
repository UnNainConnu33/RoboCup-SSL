import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { MoveToPacket } from '@ssl/types/internal/control/packet'
import Strategies from '@ssl/types/internal/task-manager/tasks/strategies'

import { state } from '../../models/GameState'
import { pi, cos, sin } from 'mathjs';

/**
 * Ce script permet à deux robots d'aller à une position précise (ici la balle)
 * call "MSB.follow_ball" ' { "ids" : [1] }'
 */
export default class Follow_ball extends Strategies {
  name = 'follow_ball';

  public constructor(public ids: Array<number>) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      ids: {
        type: 'array', items: 'number', min: 1, max: 2,
      },

    },
    handler(ctx: Context<{ ids: Array<number> }>): void {
      ctx.broker.logger.info('MoveToPacket packet received')
      state.assign.register(ctx.params.ids, new Follow_ball(ctx.params.ids))
    },
  }

  compute(broker: ServiceBroker): boolean {
    const robot_allies = state.data.robots.allies[0]
    const ball = state.data.ball
    // console.log(ball.position.x)

    const robot_opponents = state.data.robots.opponents
    // console.log(robot_allies[1].position)
    const max = 5
    let X_allies = robot_allies.position.x
    let Y_allies = robot_allies.position.y

    void broker.call('bots-control.moveTo', {
      id: this.ids[0],
      target: { x: ball.position.x + 0.2 , y: ball.position.y },
      orientation: pi,
      expectedReachTime: 10,
    } as MoveToPacket)

    return false
  }
}
