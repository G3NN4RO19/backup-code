function HardLeft () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
}
function HardRight () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    basic.pause(100)
    maqueen.motorStop(maqueen.Motors.All)
}
function Softleft () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 20)
}
function AllAhead () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
}
function SoftRight () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 20)
}
function Avoid () {
    avoiding = 1
    need_turn = 0
    HardRight()
    AllAhead()
    basic.pause(200)
    while (avoiding == 1) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            avoiding = 0
            HardRight()
        } else {
            if (need_turn2) {
                HardRight()
            }
            counter_measure = 0
            while (counter_measure < 30 && IRL + IRR == 2) {
                music.playTone(262, music.beat(BeatFraction.Eighth))
                AllAhead()
                IRR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
                IRL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
                counter_measure = counter_measure + 1
            }
            if (IRL + IRR == 2) {
                HardLeft()
            }
            if (maqueen.Ultrasonic(PingUnit.Centimeters) < 30) {
                need_turn2 = 1
            } else {
                need_turn2 = 0
            }
        }
    }
}
let left_turn = 0
let IRR = 0
let IRL = 0
let counter_measure = 0
let need_turn2 = 0
let need_turn = 0
let avoiding = 0
basic.showLeds(`
    # # # # #
    # . . . .
    # . # # #
    # . . . #
    # # # # #
    `)
maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
music.playTone(659, music.beat(BeatFraction.Quarter))
basic.pause(20)
music.playTone(659, music.beat(BeatFraction.Quarter))
music.rest(music.beat(BeatFraction.Half))
music.playTone(659, music.beat(BeatFraction.Quarter))
music.rest(music.beat(BeatFraction.Half))
music.playTone(523, music.beat(BeatFraction.Quarter))
music.playTone(659, music.beat(BeatFraction.Quarter))
music.playTone(784, music.beat(BeatFraction.Quarter))
music.rest(music.beat(BeatFraction.Half))
music.playTone(392, music.beat(BeatFraction.Half))
music.rest(music.beat(BeatFraction.Half))
while (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
    maqueen.motorStop(maqueen.Motors.All)
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) > 10 && maqueen.Ultrasonic(PingUnit.Centimeters) < 15) {
        Avoid()
    }
    IRL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    IRR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    if (IRL == 0 && IRR == 0) {
        AllAhead()
    } else if (IRL == 0) {
        Softleft()
        left_turn = 1
    } else if (IRR == 0) {
        SoftRight()
        left_turn = 0
    } else {
        if (left_turn) {
            Softleft()
        } else {
            SoftRight()
        }
    }
})
