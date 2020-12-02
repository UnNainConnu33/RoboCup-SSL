import Turn from './turn'
import Triangle from './triangle'
import Template from './template'
import Square from './square'
import Losange from './losange'
import Stalk from './stalk'
import Test from './test'
import { FunctionAssignmentNodeDependencies } from 'mathjs'
import Follow_ball from './follow_ball'

export default {
  turn: Turn.declaration,
  triangle: Triangle.declaration,
  template: Template.declaration,
  square: Square.declaration,
  losange: Losange.declaration,
  stalk: Stalk.declaration,
  test: Test.declaration,
  follow_ball: Follow_ball.declaration,
}
