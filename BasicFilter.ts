import { ServiceBroker } from 'moleculer'
import {
  Vision,
  VisionDetectionBall,
  VisionDetectionFrame,
  VisionDetectionRobot,
  VisionGeometry,
} from '@ssl/types/league/vision'
import { GameControllerEvent } from '@ssl/types/league/game-controller'
import { HardwareInfo } from '@ssl/types/league/grsim'
import { Robot } from '@ssl/types/internal/robot'

import filterData from '../models/FilterData'

function processGeometry(
  broker: ServiceBroker,
  geometryPacket: VisionGeometry,
): void {
  broker.logger.debug('Process field geometry packet')
  if (geometryPacket.field == null) {
    return
  }

  filterData.field.boundaryWidth = geometryPacket?.field.boundaryWidth / 1000.0
  filterData.field.length = geometryPacket?.field.length / 1000.0
  filterData.field.width = geometryPacket?.field.width / 1000.0

  filterData.field.goal.ally = {
    width: geometryPacket?.field.goal.width / 1000.0,
    depth: geometryPacket?.field.goal.depth / 1000.0,
  }
  filterData.field.goal.opponent = {
    width: geometryPacket?.field.goal.width / 1000.0,
    depth: geometryPacket?.field.goal.depth / 1000.0,
  }

  let pdepth = 0
  let pwidth = 0
  if (geometryPacket?.field?.lines) {
    geometryPacket.field.lines.forEach((line) => {
      if (line.name === 'LeftFieldLeftPenaltyStretch') {
        pdepth = Math.abs(line.p1.x - line.p2.x) / 1000.0
        pwidth = Math.abs(2 * line.p1.y) / 1000.0
      }
    })
  }

  filterData.field.penalty.ally = {
    depth: pdepth,
    width: pwidth,
  }
  filterData.field.penalty.opponent = {
    depth: pdepth,
    width: pwidth,
  }

  if (geometryPacket?.field?.arcs) {
    geometryPacket.field.arcs.forEach((arc) => {
      if (arc.name === 'CenterCircle') {
        filterData.field.center = {
          center: {
            x: arc.center.x / 1000.0,
            y: arc.center.y / 1000.0,
          },
          radius: arc.radius / 1000.0,
        }
      }
    })
  }

  if (filterData.field.width !== undefined && filterData.field.width != null) {
    filterData.field.updated = true
  }
}

function processDetections(
  broker: ServiceBroker,
  detectionPacket: VisionDetectionFrame,
): void {
  broker.logger.debug('Process detection packet')
  detectionPacket.balls.forEach((ball: VisionDetectionBall) => {
    if (ball.confidence > 0.7) {
      filterData.ball.position.x = ball.position.x / 1000.0
      filterData.ball.position.y = ball.position.y / 1000.0
    }
  })

  detectionPacket.robots.allies.forEach((robot: VisionDetectionRobot) => {
    if (
      robot.confidence > 0.7
      && robot.id != null
      && robot.position.orientation != null
    ) {
      filterData.robots.allies[robot.id] = {
        id: robot.id,
        position: {
          x: robot.position.x / 1000.0,
          y: robot.position.y / 1000.0,
        },
        orientation: robot.position.orientation,
        status: filterData.robots.allies[robot.id]
          ? filterData.robots.allies[robot.id].status
          : { infrared: false, kick: { chip: false, flat: false } },
      }
    }
  })

  detectionPacket.robots.opponents.forEach((robot: VisionDetectionRobot) => {
    if (
      robot.confidence > 0.7
      && robot.id != null
      && robot.position.orientation != null
    ) {
      filterData.robots.opponents[robot.id] = {
        id: robot.id,
        position: {
          x: robot.position.x / 1000.0,
          y: robot.position.y / 1000.0,
        },
        orientation: robot.position.orientation,
        status: filterData.robots.opponents[robot.id]
          ? filterData.robots.opponents[robot.id].status
          : { infrared: false, kick: { chip: false, flat: false } },
      }
    }
  })
}

export default {
  processVisionPacket: (broker: ServiceBroker, receivePacket: Vision): void => {
    // Packet geometry
    if (!filterData.field.updated && receivePacket.geometry !== null) {
      processGeometry(broker, receivePacket.geometry)
    }

    // Detection geometry
    if (receivePacket.detection != null) {
      processDetections(broker, receivePacket.detection)
    }

    filterData.color = receivePacket.allyColor
  },
  processGameControllerPacket: (
    broker: ServiceBroker,
    receivePacket: GameControllerEvent,
  ): void => {
    if (receivePacket) filterData.gameController = receivePacket
  },
  processRobotsStatusPacket: (
    broker: ServiceBroker,
    receivePacket: Array<HardwareInfo>,
  ): void => {
    broker.logger.debug('Process robot status packet')
    if (receivePacket) {
      receivePacket.forEach((element: HardwareInfo) => {
        const robot: Robot | undefined = filterData.robots.allies.find(
          (x) => x.id === element.id,
        )
        if (robot !== undefined) {
          robot.status = {
            infrared: element.infrared,
            kick: element.kick,
          }
        }
      })
    }
  },
}
