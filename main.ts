input.onButtonPressed(Button.A, function () {
servo = Math.clamp(30, 240, servo - 30)
})
input.onButtonPressed(Button.B, function () {
    servo = Math.clamp(30, 240, servo + 30)
})
let WIFIgroup=153
let turn = 0
let forward = 0
let Y = 0
let X = 0
let rmotor = 0
let lmotor = 0
let forwardgap = 3
let turngap = 3
let servo = 120
serial.writeString("hello")
radio.setGroup(WIFIgroup)
let X0 = pins.analogReadPin(AnalogReadWritePin.P1)
let Y0 = pins.analogReadPin(AnalogReadWritePin.P2)
for (let index = 5; index >= 0; index--) {
radio.sendString("START")
    basic.showNumber(index)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.pause(50)
    pins.digitalWritePin(DigitalPin.P12, 0)
    basic.pause(50)

}
basic.showIcon(IconNames.Rollerskate)
basic.forever(function () {
    // read values
    X = pins.analogReadPin(AnalogReadWritePin.P2)
    Y = pins.analogReadPin(AnalogReadWritePin.P1)
    //serial.writeString("X=" + X + "; Y=" + Y)
    // to percentage
    forward = (X - 512) * 100 / 512
    // to percentage
    turn = (Y - 512) * 100 / 512
    // dead zone
    if (Math.abs(forward) < forwardgap) {
        forward = 0
    }
    if (Math.abs(turn) < turngap) {
        turn = 0
    }
    //serial.writeString("F=" + forward + "; t=" + turn)

    // tank mix
    // levý motor
    lmotor = forward + turn
    // pravý motor
    rmotor = forward - turn
    rmotor = Math.clamp(-100, 100, rmotor)
lmotor = Math.clamp(-100, 100, lmotor)
// ODESLÁNÍ DO ROBOTA
    radio.sendValue("mr", rmotor)
    radio.sendValue("ml", lmotor)
    radio.sendValue("clamp", servo)
    radio.sendString("SYNC")
    //serial.writeString("R = " + rmotor + " L = " + lmotor + " SRV = " + servo)
    //serial.writeLine(" .")
})
