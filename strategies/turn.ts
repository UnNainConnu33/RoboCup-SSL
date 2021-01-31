import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { Control } from '@ssl/types/internal/control/'
import Strategies from '@ssl/types/internal/task-manager/tasks/strategies'

import { state } from '../../models/GameState'
// call "MSB.turn" '{ "id" : 1 }'
export default class Turn extends Strategies {
  name = 'turn';

  public constructor(public id: number) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      id: {
        type: 'number', min: 0, max: 15,
      },
    },
    handler(ctx: Context<{ id: number }>): void {
      state.assign.register([ctx.params.id], new Turn(ctx.params.id))
    },
  }

  compute(broker: ServiceBroker): boolean {
    broker.logger.debug(state.data.ball)
    const ball = state.data.ball
    const robot_allies = state.data.robots.allies[this.id]
    const robot_opponents = state.data.robots.opponents[this.id]

    const X_allies = robot_allies.position.x
    const Y_allies = robot_allies.position.y

    void broker.call('bots-gateway.control', {
      id: this.id,
      dribbler: false,
      kick: false,
      chipKick: true,
      power: 10,
      yellow: true,
      velocity: {
        normal : robot_allies.position.y + robot_allies.position.x*(0.2^2 - robot_allies.position.x^2 - robot_allies.position.y^2),
        angular : 0,
        tangent : - robot_allies.position.x + robot_allies.position.y*(0.2^2 - robot_allies.position.x^2 - robot_allies.position.y^2),
      }
    } as Control)

    return true
  }
}


// dx/dt = y + x*(R²-x²-y²)
// dy/dt = -x + y*(R²-x²-y²)