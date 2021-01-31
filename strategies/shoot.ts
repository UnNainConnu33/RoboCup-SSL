import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { MoveToPacket } from '@ssl/types/internal/control/packet'
import Strategies from '@ssl/types/internal/task-manager/tasks/strategies'
import { sqrt, square, abs, sign, sin, cos, pi, and } from 'mathjs'
import { state } from '../../models/GameState'
import { AStarFinder } from "../../../../../astar-typescript/dist/astar";

/**
 * Ce script permet à un robot donné d'aller à une position relative d'un autre robot(adverse)
 * call "MSB.test" ' { "ids" : [0] }'
 */
export default class Shoot extends Strategies {
  name = 'Shoot';

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
        new Shoot(ctx.params.ids)
      )
    },
  }

  compute(broker: ServiceBroker): boolean {
    const ball = state.data.ball
    // console.log(ball.position.x)

    //const robot_allies = state.data.robots.allies[this.ids[0]]
    //const robot_opponents = state.data.robots.opponents
    
    //const X_allies = robot_allies.position.x
    //const Y_allies = robot_allies.position.y

    // const time1 = Date.now()
    // console.log(time1)
    
    //const robot_opponent = state.data.robots.opponents[this.ids[1]]
    //const angle = robot_opponent.orientation

    void broker.call('bots-control.moveTo', {
      id: this.ids[0],
      kick: true, 
      chipKick: true,
      dribbler: false,
      power: 10, 
      target: { x: ball.position.x, y: ball.position.y},
      orientation: pi - 0.5,
      expectedReachTime: 10,
    } as MoveToPacket)

    return true
  }
}
