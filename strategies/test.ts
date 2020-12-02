import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { MoveToPacket } from '@ssl/types/internal/control/packet'
import Strategies from '@ssl/types/internal/task-manager/tasks/strategies'
import { sqrt, square, abs, sign, sin, cos, pi, and } from 'mathjs'
import { state } from '../../models/GameState'
import { AStarFinder } from "../../../../../astar-typescript/dist/astar";

/**
 * Ce script permet à un robot donné d'aller à une position relative d'un autre robot(adverse)
 * call "MSB.test" ' { "ids" : [1] }'
 */
export default class Test extends Strategies {
  name = 'test';

  public constructor(public ids: Array<number>) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      ids: {
        type: 'array', items: 'number', min: 1, max: 1,
      },
      
    },
    handler(ctx: Context<{ ids: Array<number> }>): void {
      ctx.broker.logger.info('MoveToPacket packet received')
      state.assign.register(
        ctx.params.ids, 
        new Test(ctx.params.ids)
      )
    },
  }

  compute(broker: ServiceBroker): boolean {
    const ball = state.data.ball
    // console.log(ball.position.x)

    const robot_allies = state.data.robots.allies[this.ids[0]]
    const robot_opponents = state.data.robots.opponents
    
    const X_allies = robot_allies.position.x
    const Y_allies = robot_allies.position.y

    const time1 = Date.now()
    console.log(time1)
    void broker.call('bots-control.moveTo', {
      id: this.ids[0],
      kick: {chip: false, flat: true, target: {x: 1, y: 1}, },
      dribbler: false,
      power: 10, 
      target: { x: ball.position.x , y: ball.position.y},
      orientation: pi,
      expectedReachTime: 10,
    } as MoveToPacket)

    return true
  }
}
