/**
 * Blocks for driving the Makerminds NinjaBot
//% weight=100 color=#00A654 icon="\uf1b9" block="Makerminds" */
namespace Makerminds{
    /**
     * **********************************************************************************************************************************************
     * micro:bit Makerminds NinjaBot
     ************************************************************************************************************************************************/

    //* Some parameters used for controlling the turn and length of the ninjaBoard 

    const milliSecInASecond = 1000
    let distancePerSec = 100
    let numberOfDegreesPerSec = 200
    let biasToApply = 50 //in the middle is the place to start

    /**
     * Apply a bias to the wheels. 0 to 50 for left, 50 to 100 for right.
     * @param bias eg: 50
     */

    //% blockId=kitronik_servolite_servos_bias
    //% block="bias %biasDriving"
    //% bias.min=0 bias.max=100

    export function biasDriving(bias: number): void {
        if (bias > 100) {
            bias = 100;
        } else if (bias < 0) {
            bias = 0;
        }
        biasToApply = bias;
    }

    /**
     * Drives forwards. Call stop to stop
     */

    //% blockId=kitronik_servolite_servos_forward
    //% block="drive forward"
    
    export function forward(): void {
        let P8Output = 0;
        let P12Output = 180;

        if (biasToApply < 50) {
            // Want to move 180 towards 90
            P12Output -= 50 - biasToApply;
        } else if (biasToApply > 50) {
            // Want to move 0 towards 90
            P8Output += biasToApply - 50;
        }

        pins.servoWritePin(AnalogPin.P8, P8Output);
        pins.servoWritePin(AnalogPin.P12, P12Output);
    }

    /**
     * Drives backwards. Call stop to stop
     */
    //% blockId=kitronik_servolite_servos_backward
    //% block="drive backward"
    export function backward(): void {
        let P8Output = 180;
        let P12Output = 0;

        if (biasToApply < 50) {
            // Want to move 0 towards 90
            P12Output += 50 - biasToApply;
        } else if (biasToApply > 50) {
            // Want to move 180 towards 90
            P8Output -= biasToApply - 50;
        }

        pins.servoWritePin(AnalogPin.P8, P8Output);
        pins.servoWritePin(AnalogPin.P12, P12Output);
    }

    /**
    * Turns left. Call stop to stop
    */
    //% blockId=kitronik_servolite_servos_left
    //% block="turn left"
    export function left(): void {
        pins.servoWritePin(AnalogPin.P8, 0);
        pins.servoWritePin(AnalogPin.P12, 0);
    }

    /**
     * Turns right. Call ``stop`` to stop
     */
    //% blockId=kitronik_servolite_servos_right
    //% block="turn right"
    export function right(): void {
        pins.servoWritePin(AnalogPin.P8, 180);
        pins.servoWritePin(AnalogPin.P12, 180);
    }

    /**
     * Stop for 360 servos.
     * rather than write 90, which may not stop the servo moving if it is out of trim
     * this stops sending servo pulses, which has the same effect.
     * On a normal servo this will stop the servo where it is, rather than return it to neutral position.
     * It will also not provide any holding force.
     */
    //% blockId=kitronik_servolite_servos_stop
    //% block="stop"
    export function stop(): void {
        pins.analogWritePin(AnalogPin.P8, 0);
        pins.analogWritePin(AnalogPin.P12, 0);
    }

    /**
     * Sends servos to 'neutral' position.
     * On a well trimmed 360 this is stationary, on a normal servo this is 90 degrees.
     */
    //% blockId=kitronik_servolite_servos_neutral
    //% block="goto neutral position"
    export function neutral(): void {
        pins.servoWritePin(AnalogPin.P8, 90);
        pins.servoWritePin(AnalogPin.P12, 90);
    }

    /**
     * Drives forwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=kitronik_servolite_drive_forwards
    //% block="drive forwards %howFar|distance" 
    export function driveForwards(howFar: number): void {
        let timeToWait = (howFar * milliSecInASecond) / distancePerSec; // calculation done this way round to avoid zero rounding
        forward();
        basic.pause(timeToWait);
        stop();
    }

    /**
     * Drives backwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=kitronik_servolite_drive_backwards
    //% block="drive backwards %howFar|distance" 
    export function driveBackwards(howFar: number): void {
        let timeToWait = (howFar * milliSecInASecond) / distancePerSec; // calculation done this way round to avoid zero rounding
        backward();
        basic.pause(timeToWait);
        stop();
    }

    /**
     * Turns right through the requested degrees and then stops
     * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
     * a simple turn, wait, stop method.
     * Runs the servos at slower than the right function to reduce wheel slip
     * @param deg how far to turn, eg: 90
     */
    //% blockId=kitronik_servolite_turn_right
    //% block="turn right %deg|degrees"
    export function turnRight(deg: number): void {
        let timeToWait = (deg * milliSecInASecond) / numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(AnalogPin.P8, 130);
        pins.servoWritePin(AnalogPin.P12, 130);
        basic.pause(timeToWait);
        stop();
    }

    /**
    * Turns left through the requested degrees and then stops
    * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
    * a simple turn, wait, stop method.
    * Runs the servos at slower than the right function to reduce wheel slip
    * @param deg how far to turn, eg: 90
    */
    //% blockId=kitronik_servolite_turn_left
    //% block="turn left %deg|degrees"
    export function turnLeft(deg: number): void {
        let timeToWait = (deg * milliSecInASecond) / numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(AnalogPin.P8, 50);
        pins.servoWritePin(AnalogPin.P12, 50);
        basic.pause(timeToWait);
        stop()
    }

    /**
     * Allows the setting of the :MOVE mini turn amount.
     * This allows tuning for the turn x degrees commands
     * @param degPerSec : How many degrees per second the mini does.
     */
    //% blockId=kitronik_servolite_set_turn_speed_param
    //% block="calibrate turn amount to %degPerSec|degrees per second" 
    export function setDegreesPerSecond(degPerSec: number): void {
        numberOfDegreesPerSec = degPerSec
    }

    /**
     * Allows the setting of the :MOVE mini forward / reverse distance.
     * This allows tuning for the move x distance commands
     * @param distPerSec : How many mm per second the mini does.
     */
    //% blockId=kitronik_servolite_set_movement_speed_param 
    //% block="calibrate drive amount to %distPerSec|mm per second"
    export function setDistancePerSecond(distPerSec: number): void {
        distancePerSec = distPerSec
    }
}