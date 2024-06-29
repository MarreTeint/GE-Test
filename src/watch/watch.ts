export class Watch{
    private time: Date; // Ne pas s'embeter a créer nos fonctions de date, on utilise celles de javascript
    private hourOffset: number;
    private minuteOffset: number;
    private mode: number;
    private light: boolean;

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
        }, 200);
    }

    private watchHTML(){
        return `<div class="watch_time ${this.light ? "light" : "dark"}">${this.formatTime(this.time.getHours())}:${this.formatTime(this.time.getMinutes())}:${this.formatTime(this.time.getSeconds())}</div>`
    }

    private toHTML(){
        return `
        <div class="watch"></div>
        <div class="buttons">
            <button id="btn-mode">Mode</button>
            <button id="btn-up">Increase</button>
            <button id="btn-light">Light</button>
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

    print(){
        document.getElementById('app').innerHTML = this.toHTML();
        document.getElementById(`btn-mode`).addEventListener('click', () => {
            this.setMode();
        });
        document.getElementById(`btn-light`).addEventListener('click', () => {
            this.setLight();
        });
        document.getElementById(`btn-up`).addEventListener('click', () => {
            this.increase();
        });

        // Met a jour l'affichage
        setInterval(() => {
            document.querySelector('.watch').innerHTML = this.watchHTML();
        }, 1);
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
        console.log(this.mode);
    }

    getLight(){
        return this.light;
    }

    setLight(){
        this.light = !this.light;
    }
}