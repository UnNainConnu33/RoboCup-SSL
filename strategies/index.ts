import Turn from './turn'
import Triangle from './triangle'
import Template from './template'
import Square from './square'
import Losange from './losange'
import Stalk from './stalk'
import Test from './shoot'
import { FunctionAssignmentNodeDependencies } from 'mathjs'
import Follow_ball from './follow_ball'
import Avoids from './avoids'
import ZigZag from './zigZag'
import UseZigZag from './useZigZag'
import MoveTo from './MoveTo'
import Shoot from './shoot'
import Ball from './ball'

export default {
  turn: Turn.declaration,
  triangle: Triangle.declaration,
  template: Template.declaration,
  square: Square.declaration,
  losange: Losange.declaration,
  stalk: Stalk.declaration,
  shoot: Shoot.declaration,
  follow_ball: Follow_ball.declaration,
  avoids: Avoids.declaration,
  zigZag: ZigZag.declaration,
  useZigZag: UseZigZag.declaration,
  MoveTo: MoveTo.declaration,
  Ball: Ball.declaration,
}
