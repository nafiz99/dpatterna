export class Light {
    public HIGH:number = 3;
    public MEDIUM:number = 2;
    public LOW:number = 1;
    public VERYLOW:number = 0;
    checkRedLightOn:boolean;
    checkLightOn:boolean;
    luminosity:number;

    

    constructor(){
        this.luminosity = this.VERYLOW
        this.checkRedLightOn = false
        this.checkLightOn = false
    }
    

    public on(){
        this.checkLightOn = true;
        this.checkRedLightOn = false;
        return "on";
    }
    public off(){
        this.checkLightOn = false;
        this.checkRedLightOn = false;
        return "off"
    }
    public redZero(){
        this.luminosity=this.VERYLOW;
        
        return 'red0';
    }
    public redOne(){
        this.luminosity=this.LOW;
        this.checkRedLightOn = true;
        return "red1"
    }
    public redTwo(){
        this.luminosity=this.MEDIUM;
        return "red2"
    }
    public redThree(){
        this.luminosity=this.HIGH;
        return "red3"
    }
    public  getLuminosity(){
        return this.luminosity;
    }
    public getRedLightStatus(){
        return this.checkRedLightOn;
    }
    public getLightOnStatus(){
        return this.checkLightOn;
    }
}


export interface Command {
    execute():string
}

export class LightOnCommand implements Command {
    light:Light;
    constructor(light:Light) {
        this.light = light;
    }
    execute():string{
        return this.light.on()
    }
}

export class LightOffCommand implements Command {
    light:Light;
    constructor(light:Light) {
        this.light = light;
    }
    execute():string{
        return this.light.off()
    }
}



export class RedLightIncreaseCommand implements Command {
    light:Light;
    currentLuminosity:number;
    checkRedLightOn:boolean;
    checkLightOn:boolean;
    constructor(light:Light) {
        this.light = light;
        this.currentLuminosity=light.getLuminosity();
        this.checkRedLightOn=light.getRedLightStatus();
        this.checkLightOn=light.getLightOnStatus();
    }
    execute():string{
        if(!this.checkLightOn){
            return this.light.off()
        }
        else if(!this.checkRedLightOn){
            return this.light.on();
        }
        else if(this.currentLuminosity === this.light.HIGH){
           return this.light.redThree()
        }
        else if(this.currentLuminosity === this.light.MEDIUM){
           return this.light.redThree();
        }
        else if(this.currentLuminosity === this.light.LOW){
           return this.light.redTwo();
        }
        else {
           return this.light.redOne();
        }
    }
}

export class RedLightDecreaseCommand implements Command {
    light:Light;
    currentLuminosity:number;
    checkRedLightOn:boolean;
    checkLightOn:boolean;
    constructor(light:Light) {
        this.light = light;
        this.currentLuminosity=light.getLuminosity();
        this.checkRedLightOn=light.getRedLightStatus();
        this.checkLightOn=light.getLightOnStatus();
    }
    execute():string{
        if(!this.checkLightOn){
            return this.light.off()
        }
        else if(!this.checkRedLightOn){
            return this.light.on();
        }
        else if(this.currentLuminosity === this.light.HIGH){
           return this.light.redTwo()
        }
        else if(this.currentLuminosity === this.light.MEDIUM){
           return this.light.redOne();
        }
        else if(this.currentLuminosity === this.light.LOW){
           return this.light.redZero();
        }
        else {
           return this.light.redZero();
        }
    }
}

export class RedLightOnCommand implements Command {
    light:Light;
    currentLuminosity:number;
    checkLightOn:boolean;
    constructor(light:Light) {
        this.light = light;
        this.currentLuminosity=light.getLuminosity();
        this.checkLightOn=light.getLightOnStatus()
    }
    execute():string{
        if(this.checkLightOn){
            return this.light.redOne();
        }else{
            return this.light.off();
        }
    }
}

export class RemoteControl{
    command!:Command

    setCommand(command:Command){
        this.command = command
    }

    buttonWasPressed(){
       return this.command.execute()
    }
}