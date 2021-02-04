export default class ZigZag extends Strategies {
  name = 'zigZag';

  private index = 0

  public constructor(public id: number, public points: Array<Vector2D>) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      id: {
        type: 'number',
      },
      points: {
        type: 'array',
        items: 'object',
        min: 2,
        max: 20,
      },
    },
    handler(ctx: Context<{ id: number, points: Array<{ x: number, y: number }> }>): void {
      ctx.broker.logger.info('MoveToPacket packet received')
      state.assign.register([ctx.params.id], new ZigZag(ctx.params.id, ctx.params.points))
    },
  }

  public distance(p1: Vector2D, p2: Vector2D): number {
    return (Math.sqrt((p1.x - p2.x) ** 2) + ((p1.x - p2.x) ** 2))
  }

  compute(broker: ServiceBroker): boolean {
    broker.logger.info(`${this.name}: id<${this.id.toString()}>. points.length:<${this.points.length.toString()}>`)
    const epsilon = 0.1
    const robot = state.data.robots.allies[this.id]

    if ((Math.abs(robot.position.x - this.points[this.index].x) < epsilon) && (Math.abs(robot.position.y - this.points[this.index].y) < epsilon)) {
      this.index += 1
    } else {
      void broker.call('bots-control.moveTo', {
        id: this.id,
        target: { x: this.points[this.index].x, y: this.points[this.index].y }, // on va se diriger vers le (i+1)ème point...
        orientation: -3.14,
      } as MoveToPacket)
    }

    if (this.index > this.points.length) { // on n'est pas sur aucune extrémité du zigzag
      return true // On change rien : donc on continue d'exécuter notre commande !
    }

    return false
  }// compute
}