import './index.css';
import { Watch } from './watch';

const a = new Watch(1, 10);
// Met a jour l'affichage
setInterval(()=>{document.getElementById('time').innerText = a.getTime().toString();}, 100);
