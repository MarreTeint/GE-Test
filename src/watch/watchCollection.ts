import { Watch } from "./watch";

export class WatchCollection{
    private watches: Watch[];
    private location: string;

    constructor(location: string, watches: Watch[] = []){
        this.watches = watches;
        this.location = location;
    }

    addWatch(){
        this.watches.push(new Watch());
        const cont = document.querySelector(this.location);
        const collection = cont.querySelector("#collection");
        const watchCont = document.createElement("div");
        const id = "watch-"+(this.watches.length-1);
        watchCont.id = id;
        collection.appendChild(watchCont);
        this.watches[this.watches.length-1].print("#"+id);
    }

    private toHTML(){
        return `
            <div id="collection"></div>
            <button class="increaseWatches">Add a watch</button>
        `;
    }

    print(){
        const cont = document.querySelector(this.location);
        cont.innerHTML = this.toHTML();
        const collection = cont.querySelector("#collection");
        for(let i=0 ; i<this.watches.length ; i++){
            const watchCont = document.createElement("div");
            const id = "watch-"+i;
            watchCont.id = id;
            collection.appendChild(watchCont);
            this.watches[i].print("#"+id);
        }
        cont.querySelector(".increaseWatches").addEventListener('click', () => {
            this.addWatch();
        });
    }
}