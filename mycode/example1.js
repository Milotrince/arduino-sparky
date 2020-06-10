/*
You can copy this file and use it as your base code.
*/

async function run() {
    console.log('Your logs will show up in the console, like this!')
    robot.drive(0, 1)
    await sleep(1000)
    robot.drive(1, 0)
    await sleep(1000)
    robot.drive(-1, 0)
    await sleep(1000)
    robot.drive(0, -1)
    await sleep(1000)
    robot.stop()
    console.log('Done!')
}
