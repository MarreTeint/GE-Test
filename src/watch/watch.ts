export class Watch{
    private hour: number;
    private minute: number;
    private second: number;
    private hourOffset: number;
    private minuteOffset: number;
    private mode: number;
    private light: boolean;
    private h24: boolean;
    private am: boolean; // déterminer si on est en AM ou PM
    private initHourOffset: number;
    private initMinuteOffset: number;

    constructor(hourOffset: number = 0, minuteOffset: number = 0){
        this.hourOffset = hourOffset;
        this.minuteOffset = minuteOffset;
        var a = new Date();
        a.setHours(a.getHours() + hourOffset);
        a.setMinutes(a.getMinutes() + minuteOffset);
        this.hour = a.getHours();
        this.minute = a.getMinutes();
        this.second = a.getSeconds();
        this.mode = 0;
        this.light = false;
        this.h24 = true;
        this.am = true;
        this.initHourOffset = hourOffset;
        this.initMinuteOffset = minuteOffset;
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
            if(!this.h24){
                if(a.getHours() > 12){
                    a.setHours(a.getHours() - 12);
                    this.am = false;
                }else{
                    this.am = true;
                }
            }

            this.hour = a.getHours();
            this.minute = a.getMinutes();
            this.second = a.getSeconds();
        }, 1);
    }

    private watchHTML(){
        return `<div class="watch_time ${this.light ? "light" : "dark"}">${this.formatTime(this.hour)}:${this.formatTime(this.minute)}:${this.formatTime(this.second)} ${!this.h24 ? this.am ? "am" : "pm" : ""}</div>`
    }

    private toHTML(){
        return `
        <div class="watch"></div>
        <div class="buttons">
            <button class="btn-mode">Mode</button>
            <button class="btn-up">Increase</button>
            <button class="btn-light">Light</button>
            <button class="h24-ampm">24 - AM/PM</button>
            <button class="btn-reset">Reset</button>
        </div>
        `;
    }

    private formatTime(time: number): string {
        return time.toString().padStart(2, '0');
    }

    private increase(){
        switch(this.mode){
            case 1:
                this.setHourOffset(this.hourOffset + 1);
                break;
            case 2:
                this.setMinuteOffset(this.minuteOffset + 1);
                break;
            default:
                break;
        }
    }

    private reset(){
        this.setHourOffset(this.initHourOffset);
        this.setMinuteOffset(this.initMinuteOffset);
    }

    print(location:string){
        const cont = document.querySelector(location);
        cont.innerHTML = this.toHTML();
        cont.querySelector(`.btn-mode`).addEventListener('click', () => {
            this.setMode();
        });
        cont.querySelector(`.btn-light`).addEventListener('click', () => {
            this.setLight();
        });
        cont.querySelector(`.btn-up`).addEventListener('click', () => {
            this.increase();
        });
        cont.querySelector(`.h24-ampm`).addEventListener('click', () => {
            this.setH24();
        });
        cont.querySelector(`.btn-reset`).addEventListener('click', () => {
            this.reset();
        });

        // Met a jour l'affichage
        setInterval(() => {
            cont.querySelector('.watch').innerHTML = this.watchHTML();
        }, 1);
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
        console.log(this.mode);
    }

    getLight(){
        return this.light;
    }

    setLight(){
        this.light = !this.light;
    }

    getH24(){
        return this.h24;
    }

    setH24(){
        this.h24 = !this.h24;
    }
}