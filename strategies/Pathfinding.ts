import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { MoveToPacket } from '@ssl/types/internal/control/packet'
import Strategies from '@ssl/types/internal/task-manager/tasks/strategies'
import { sin, cos, pi, sqrt, square, i } from 'mathjs'
import { state } from '../../models/GameState'
import { Vector2D } from '@ssl/types/utils/math'

/**
 * This script allows a robot to go to a certain point, avoiding obstacles around him.
 * call "MSB.pathfinding" ' { "id" : 0, "point" : {"x": 1,"y": 1} }'
 */

export default class Pathfinding extends Strategies {
  name = 'pathfinding';

  public constructor(public id: number, public point: Vector2D) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      id: {
        type: 'number', min: 0, max: 5,
      },

      point: {
        type: 'object'
      }  
    },

    handler(ctx: Context<{ id: number, point: Vector2D }>): void {
      ctx.broker.logger.info('MoveToPacket packet received')
      state.assign.register([ctx.params.id], new Pathfinding(ctx.params.id, ctx.params.point))
    },  
  }
  
  public distance(p1: Vector2D, p2: Vector2D): number {
    return (Math.sqrt((p1.x - p2.x) **2) + ((p1.y - p2.y) **2))
  }


  compute(broker: ServiceBroker): boolean {

    const epsilon = 0.2
    // we collect the position of the ball and the other robots
    let ball = state.data.ball
    let allies = state.data.robots.allies
    let opponents = state.data.robots.opponents

    // we declare an array, in which we'll put all the coordinates of the robots and the ball
    let positions = new Array()

    for (let i = 0; i < allies.length && i < opponents.length ; i++) {
      positions.push(allies[i].position, opponents[i].position, ball.position)
    }

    // broker.logger.info(position)

    // we define the number of columns and rows
    let rows = 50
    let cols = 50

    let grid = new Array()
    broker.logger.info(grid)

    /*
    if( (Math.abs(positions[i].x - this.point.x) < epsilon) && (Math.abs(positions[i].y - this.point.y) < epsilon) ) { 

      }
      */ 

    void broker.call('bots-control.moveTo', {
      id: this.id, 
      target: { x: this.point.x, y: this.point.y},
      orientation: 0,
      expectedReachTime: 10,
    } as MoveToPacket)

    return true
  }














}
