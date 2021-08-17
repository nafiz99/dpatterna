import { Light, LightOnCommand,LightOffCommand, RedLightOnCommand, RedLightDecreaseCommand, RedLightIncreaseCommand } from "../patterns/command/command-control";

describe('Command Pattern Test', () => {

    test('Light On Test', () => {
        let expected = new Light();
        expected.checkLightOn = true;
        let reality = new LightOnCommand(expected);
        expect(expected.on()).toEqual(reality.execute());
    })
    test('Light Off Test', () => {
        let expected = new Light();
        let reality = new LightOffCommand(expected);
        expect(expected.off()).toEqual(reality.execute());
    })
    test('Red Light On Test', () => {
        let expected = new Light();
        expected.checkLightOn = true;
        let reality = new RedLightOnCommand(expected);
        expect(expected.redOne()).toEqual(reality.execute());
    })
    test('Red Light Increase Test', () => {
        let expected = new Light();
        expected.checkLightOn = true;
        expected.checkRedLightOn=true;
        expected.luminosity=1;
        let reality = new RedLightIncreaseCommand(expected);
        expect(expected.redTwo()).toEqual(reality.execute());
    })
    test('Red Light Decrease Test', () => {
        let expected = new Light();
        expected.checkLightOn = true;
        expected.checkRedLightOn=true;
        expected.luminosity=1;
        let reality = new RedLightDecreaseCommand (expected);
        expect(expected.redZero()).toEqual(reality.execute());
    })
  
  
  
})