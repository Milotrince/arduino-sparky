# Sparky
## Robot Controller and Driver Station for an Arduino Robot
-----

## Setting up your Arduino Bot

### Materials
1. Arduino Uno or Arduino Nano
2. HC-05 bluetooth module
3. 2 low rpm (200rpm) 12V DC motors
4. 1 high rpm (2000rpm) 12V DC motor
5. 2 L298N H-bridge motor controllers
6. Servo
7. 12V Battery (or 8 AA batteries)
8. Breadboard
9. Jumper wires
10. A-B Cable (aka printer cable); typically comes with Arduinos

### Schematic
To be posted

### Arduino Software
1. Connect a computer with the [Arduino IDE](https://www.arduino.cc/en/Main/Software) to your Arduino using the A-B cable.
2. Connect the HC-05 bluetooth module to pin 10 (RX) and 11 (TX) on the Arduino.
3. Upload the `SetupBluetooth` file onto the Arduino.
4. Once `SetupBluetooth` is successful, connect the HC-05 to pins upload the `StandardFirmata` software. You can find it under `File > Examples > Firmata > StandardFirmata` in the Arduino IDE.
5. Connect the HC-05 to pins 0 (RX) and 1 (TX).
6. You should be able to find the bluetooth device (named Sparky as a default) on your device.


# Running the Sparky robot controller
1. Make sure `node` and `npm` installed. If `node -v` or `npm -v` throws an error, install through here: https://www.npmjs.com/get-npm
2. `npm install`
3. `npm run develop`