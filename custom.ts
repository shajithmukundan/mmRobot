/**
 * Blocks for operating the Makerminds NinjaBot
 * 
 */
//% weight=70 color=#570529 icon="\uf1b9" block="Ninja:Bot" 
//% groups='["Positional", "Continuous", "Configuration"]'
namespace NinjaBot{
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

    //% blockId=ninjaBot_Cservos_bias
    //% block="bias %biasDriving"
    //% bias.min=0 bias.max=100
    //% group="Configuration"

    export function biasDriving(bias: number): void {
        if (bias > 100) {
            bias = 100;
        } else if (bias < 0) {
            bias = 0;
        }
        biasToApply = bias;
    }

    /**
     * Roll forwards. Call stop to stop
     */

    //% blockId=ninjaBot_Cservos_forward
    //% block="roll forward"
    //% group="Continuous"
    
    export function rollforward(): void {
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
     * Rolls backwards. Call stop to stop
     */
    //% blockId=ninjaBot_Cservos_backward
    //% block="roll backward"
    //% group="Continuous"

    export function rollbackward(): void {
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
    * Rolls left. Call stop to stop
    */
    //% blockId=ninjaBot_Cservos_left
    //% block="roll left"
    //% group="Continuous"

    export function left(): void {
        pins.servoWritePin(AnalogPin.P8, 0);
        pins.servoWritePin(AnalogPin.P12, 0);
    }

    /**
     * Rolls right. Call ``stop`` to stop
     */
    //% blockId=ninjaBot_Cservos_right
    //% block="roll right"
    //% group="Continuous"

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
    //% blockId=ninjaBot_Cservos_stop
    //% block="stop"
    //% group="Continuous"

    export function stop(): void {
        pins.analogWritePin(AnalogPin.P8, 0);
        pins.analogWritePin(AnalogPin.P12, 0);
    }

    /**
     * Sends servos to 'neutral' position.
     * On a well trimmed 360 this is stationary, on a normal servo this is 90 degrees.
     */
    //% blockId=ninjaBot_Cservos_neutral
    //% block="goto neutral position"
    //% group="Continuous"

    export function neutral(): void {
        pins.servoWritePin(AnalogPin.P8, 90);
        pins.servoWritePin(AnalogPin.P12, 90);
    }

    /**
     * Drives forwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=ninjaBot_Cservos_drive_forwards
    //% block="roll forwards %howFar|distance" 
    //% group="Continuous"

    export function rollForwards(howFar: number): void {
        let timeToWait = (howFar * milliSecInASecond) / distancePerSec; // calculation done this way round to avoid zero rounding
        rollforward();
        basic.pause(timeToWait);
        stop();
    }

    /**
     * Rolls backwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=ninjaBot_Cservos_drive_backwards
    //% block="roll backwards %howFar|distance" 
    //% group="Continuous"

    export function rollBackwards(howFar: number): void {
        let timeToWait = (howFar * milliSecInASecond) / distancePerSec; // calculation done this way round to avoid zero rounding
        rollbackward();
        basic.pause(timeToWait);
        stop();
    }

    /**
     * Rolls right through the requested degrees and then stops
     * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
     * a simple roll right, wait, stop method.
     * Runs the servos at slower than the right function to reduce wheel slip
     * @param deg how far to turn, eg: 90
     */

    //% blockId=ninjaBot_Cservos_roll_right
    //% block="roll right %deg|degrees"
    //% group="Continuous"

    export function turnRight(deg: number): void {
        let timeToWait = (deg * milliSecInASecond) / numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(AnalogPin.P8, 130);
        pins.servoWritePin(AnalogPin.P12, 130);
        basic.pause(timeToWait);
        stop();
    }

    /**
    * Rolls left through the requested degrees and then stops
    * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
    * a simple roll left, wait, stop method.
    * Runs the servos at slower than the right function to reduce wheel slip
    * @param deg how far to turn, eg: 90
    */

    //% blockId=ninjaBot_Cservos_roll_left
    //% block="roll left %deg|degrees"
    //% group="Continuous"

    export function rollLeft(deg: number): void {
        let timeToWait = (deg * milliSecInASecond) / numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(AnalogPin.P8, 50);
        pins.servoWritePin(AnalogPin.P12, 50);
        basic.pause(timeToWait);
        stop()
    }

    /**
     * Allows the setting of the NinjaBot roll mode turn amount.
     * This allows tuning for the turn x degrees commands
     * @param degPerSec : How many degrees per second the ninjaBot does.
     */
    //% blockId=ninjaBot_Cservos_set_turn_speed_param
    //% block="calibrate turn amount to %degPerSec|degrees per second" 
    //% group="Configuration"

    export function setDegreesPerSecond(degPerSec: number): void {
        numberOfDegreesPerSec = degPerSec
    }

    /**
     * Allows the setting of the NinjaBot forward / reverse roll distance.
     * This allows tuning for the move x distance commands
     * @param distPerSec : How many mm per second the mini does.
     */
    //% blockId=ninjaBot_Cservos_set_movement_speed_param
    //% block="calibrate drive amount to %distPerSec|mm per second"
    //% group="Configuration"

    export function setDistancePerSecond(distPerSec: number): void {
        distancePerSec = distPerSec
    }
}