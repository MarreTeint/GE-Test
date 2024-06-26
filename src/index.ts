import './index.css';
import { Watch } from './watch';

const a = new Watch();
// Met a jour l'affichage
setInterval(()=>{document.getElementById('time').innerHTML = a.toHTML();}, 100);
