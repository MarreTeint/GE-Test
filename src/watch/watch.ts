export class Watch{
    time: Date; // Ne pas s'embeter a créer nos fonctions de date, on utilise celles de javascript
    hourOffset: number;
    minuteOffset: number;
    mode: number;
    light: boolean;

    constructor(hourOffset: number = 0, minuteOffset: number = 0){
        this.hourOffset = hourOffset;
        this.minuteOffset = minuteOffset;
        var a = new Date();
        a.setHours(a.getHours() + hourOffset);
        a.setMinutes(a.getMinutes() + minuteOffset);
        this.time = a;
        this.mode = 0;
        this.light = false;
        this.updateTime();
    }

    /**
     * Fonction pour garder l'heure à jour
     */
    private updateTime(){
        setInterval(() => {
            var a = new Date();
            a.setHours(a.getHours() + this.hourOffset);
            a.setMinutes(a.getMinutes() + this.minuteOffset);
            this.time = a;
        }, 100);
    }

    getTime(){
        return this.time;
    }

    getHourOffset(){
        return this.hourOffset;
    }

    setHourOffset(hourOffset: number){
        this.hourOffset = hourOffset;
    }

    getMinuteOffset(){
        return this.minuteOffset;
    }

    setMinuteOffset(minuteOffset: number){
        this.minuteOffset = minuteOffset;
    }

    getMode(){
        return this.mode;
    }

    setMode(){
        this.mode = (this.mode+1)%3;
    }

    getLight(){
        return this.light;
    }

    setLight(light: boolean){
        this.light = light;
    }
}