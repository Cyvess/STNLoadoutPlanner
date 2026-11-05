/* Catalog adapted from the user-provided STNShowcase reference. */
(async()=>{
const {MODES,freshState,freshRun,normalizeState,createLineupBackup,readLineupBackup,restoreLineupBackup,playerLabel,movePlayer,itemTransferError,transferItem,stats}=await import('./model.js');
const {summarize,summarySections,summaryColumns}=await import('./summary.js');
const icons={
 shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
 moon:'<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z"/>',
 image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m21 16-6-6L4 21"/>',
 'arrow-up-right':'<path d="M6 18 18 6M6 6h12v12"/>',
 copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
 grip:'<circle cx="8" cy="5" r=".7"/><circle cx="16" cy="5" r=".7"/><circle cx="8" cy="12" r=".7"/><circle cx="16" cy="12" r=".7"/><circle cx="8" cy="19" r=".7"/><circle cx="16" cy="19" r=".7"/>',
 more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',
 search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 leaf:'<path d="M20 4S8 1 5 9s5 13 11 7 4-12 4-12ZM6 18 16 8"/>',
 flame:'<path d="M12 3s1 5-4 8c-5 4-2 10 4 10s9-7 5-11c0 3-3 3-3 3s2-5-2-10Z"/>',
 zap:'<path d="m13 2-9 12h7l-1 8L21 9h-8z"/>',
 skull:'<path d="M7 17c-3-1-4-4-4-7a9 9 0 0 1 18 0c0 3-1 6-4 7v4H7z"/><circle cx="8" cy="11" r="2"/><circle cx="16" cy="11" r="2"/><path d="m11 16 1-2 1 2M10 18v3m4-3v3"/>'
};
const $=s=>document.querySelector(s),svg=name=>`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.shield}</svg>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function paintIcons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=svg(el.dataset.icon));}
paintIcons();
const STORAGE='stn-clan-run-v1';let state=freshState(),storageHealthy=true;
try{const saved=localStorage.getItem(STORAGE);if(saved)state=normalizeState(JSON.parse(saved),CATALOG);}catch{storageHealthy=false;}
const currentRun=()=>state.runs[state.activeMode],currentMode=()=>MODES.find(m=>m.id===state.activeMode);
const PICKER_CATEGORIES=[['ALL','All items'],['DAMAGE','Damage'],['SUPPORT','Support'],['FARM','Farms'],['PET','Pets']];
const PICKER_RARITIES=[['exclusive','Exclusive','#f97316'],['divine','Divine','#f8fafc'],['legendary','Legendary','#f59e0b'],['mythic','Mythic','#ef4444'],['epic','Epic','#a855f7'],['rare','Rare','#38bdf8'],['common','Common','#22c55e'],['unspecified','Rarity unspecified','#9aabbf']];
const PICKER_STORAGE='stn-clan-run-picker-category';
let toastTimer,pickerTarget=null,category='ALL',dragId=null;
try{const savedCategory=localStorage.getItem(PICKER_STORAGE);if(PICKER_CATEGORIES.some(([key])=>key===savedCategory))category=savedCategory;}catch{}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));storageHealthy=true;$('#saveStatus').textContent='Saved on this browser';}catch{storageHealthy=false;$('#saveStatus').textContent='Could not save · download a backup';}updateStats();}
function updateStats(){const s=stats(currentRun());$('#playerCount').textContent=s.equipped;$('#slotCount').textContent=`${s.filled} / ${s.total}`;renderOverallStats();}
function renderOverallStats(){
 const target=$('#overallStats'),sections=summarySections(summarize(currentRun(),CATALOG));
 target.hidden=sections.length===0;
 const jump=$('.stats-jump');if(jump)jump.hidden=target.hidden;
 const metricMarkup=m=>{const item=m.item?CATALOG.find(i=>i.name===m.item):null;return `<div><dt>${item?`<img class="intel-item-icon" src="${esc(item.img)}" alt="" width="24" height="24" decoding="async">`:''}<span>${esc(m.label)}</span></dt>${m.value?`<dd>${esc(m.value)}</dd>`:''}</div>`;};
 target.innerHTML=sections.length?`<div class="intel-heading"><div><div class="section-kicker">RUN INTEL</div><h2>Overall stats</h2></div></div><div class="intel-sections">${summaryColumns(sections).map((column,index)=>column.length?`<div class="intel-column" style="--column:${index+1}">${column.map(section=>`<section><h3>${section.title}</h3><dl class="intel-metrics">${section.metrics.map(metricMarkup).join('')}</dl></section>`).join('')}</div>`:'').join('')}</div>`:'';
}
function render(){
 const mode=currentMode();document.documentElement.style.setProperty('--accent',mode.color);document.documentElement.style.setProperty('--accent-text',mode.textColor||mode.color);document.documentElement.style.setProperty('--on-accent',mode.onColor||'#11180c');
 $('#modes').innerHTML=MODES.map(m=>`<button class="mode-button ${m.id===mode.id?'active':''}" data-mode="${m.id}" style="--mode-color:${m.color}" aria-pressed="${m.id===mode.id}"><span class="mode-dot"></span>${m.name}<span class="mode-arrow">↗</span></button>`).join('');
 $('#runTitle').value=currentRun().title;$('#modeName').textContent=mode.name;$('#modeSymbol').innerHTML=svg(mode.symbol);renderPlayers();updateStats();
}
function renderPlayers(){
 if(pointerDrag)cancelPointerDrag();
 $('#players').innerHTML=currentRun().players.map((p,i)=>{
 const filled=p.slots.slice(0,p.capacity).filter(Boolean).length,label=playerLabel(p,i);
 return `<article class="player-card" data-id="${p.id}" aria-label="${esc(label)} loadout"><div class="card-header"><button class="drag-handle" draggable="false" aria-label="Drag ${esc(label)} to reorder" title="Drag to reorder">${svg('grip')}</button><span class="player-number">${String(i+1).padStart(2,'0')}</span><input class="player-name" maxlength="40" value="${esc(p.name)}" placeholder="Player #${i+1}" aria-label="Name for player ${i+1}" title="Edit player name" autocomplete="off"><div class="capacity-control"><span>Loadout slots</span><div class="slot-toggle" role="group" aria-label="Slot count for ${esc(label)}"><button data-capacity="4" class="${p.capacity===4?'selected':''}" aria-pressed="${p.capacity===4}">4 slots</button><button data-capacity="5" class="${p.capacity===5?'selected':''}" aria-pressed="${p.capacity===5}">5 slots</button></div></div></div><div class="loadout-slots">${p.slots.map((s,n)=>{
 if(n>=p.capacity)return `<div class="slot-wrap"><div class="item-slot locked" data-locked-slot="${n}" aria-label="Slot 5 disabled. Switch to 5 slots to use it.">${svg('lock')}<span class="empty-label">5-slot only</span></div></div>`;
 const item=s?CATALOG.find(x=>x.name===s.item):null;
 return `<div class="slot-wrap"><button class="item-slot ${item?'equipped':''}" data-slot="${n}" draggable="false" title="${item?'Drag to move or swap; click to change':'Choose an item'}" ${item?`style="--rarity:${item.hex}"`:''} aria-label="${item?`Change ${esc(item.name)}`:`Add item to slot ${n+1}`} for ${esc(label)}"><span class="slot-index">${n+1}</span>${item?`<img src="${item.img}" alt="" draggable="false"><span class="item-name">${esc(item.name)}</span>`:'<span class="plus">+</span><span class="empty-label">Add item</span>'}</button>${item?`<select class="level-input" data-level="${n}" title="Change ${esc(item.name)} level (max ${item.max})" aria-label="${esc(item.name)} level for ${esc(label)}">${Array.from({length:item.max},(_,l)=>`<option value="${l+1}" ${s.level===l+1?'selected':''}>Lv. ${l+1}</option>`).join('')}</select>`:''}</div>`;
 }).join('')}</div><div class="card-footer"><span class="equipped-count ${filled===p.capacity?'complete':''}">${filled===p.capacity?'Loadout ready':`${filled} of ${p.capacity} equipped`}</span><div class="card-move-buttons"><button data-move="-1" ${i===0?'disabled':''} aria-label="Move ${esc(label)} up" title="Move up">↑</button><button data-move="1" ${i===9?'disabled':''} aria-label="Move ${esc(label)} down" title="Move down">↓</button></div></div></article>`;
 }).join('');
}
$('#modes').addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(!b||b.dataset.mode===state.activeMode)return;state.activeMode=b.dataset.mode;save();render();});
$('#runTitle').addEventListener('input',e=>{currentRun().title=e.target.value;save();});
const cardPlayer=target=>{const card=target.closest('[data-id]');return card?currentRun().players.find(p=>p.id===card.dataset.id):null;};
$('#players').addEventListener('input',e=>{if(e.target.matches('.player-name')){cardPlayer(e.target).name=e.target.value;save();}});
$('#players').addEventListener('change',e=>{if(e.target.matches('[data-level]')){const p=cardPlayer(e.target);p.slots[Number(e.target.dataset.level)].level=Number(e.target.value);save();}});
$('#players').addEventListener('click',e=>{
 const p=cardPlayer(e.target);if(!p)return;
 const cap=e.target.closest('[data-capacity]'),slot=e.target.closest('[data-slot]'),move=e.target.closest('[data-move]');
 if(cap){p.capacity=Number(cap.dataset.capacity);save();renderPlayers();}
 if(slot)openPicker(p.id,Number(slot.dataset.slot));
 if(move){const from=currentRun().players.indexOf(p);if(movePlayer(currentRun(),from,from+Number(move.dataset.move))){save();renderPlayers();const focus=$(`[data-id="${p.id}"] [data-move="${move.dataset.move}"]`);if(!focus.disabled)focus.focus();toast(`${playerLabel(p,currentRun().players.indexOf(p))} moved to position ${currentRun().players.indexOf(p)+1}`);}}
});
// Player handles reorder cards; equipped item tiles move or swap their contents.
let pointerDrag=null,suppressedDropClick=null;
document.addEventListener('click',e=>{
 if(suppressedDropClick&&e.detail>0&&performance.now()<suppressedDropClick.until&&Math.hypot(e.clientX-suppressedDropClick.x,e.clientY-suppressedDropClick.y)<12){e.preventDefault();e.stopImmediatePropagation();suppressedDropClick=null;}
},true);
$('#players').addEventListener('pointerdown',e=>{
 if(pointerDrag||e.button!==0||e.isPrimary===false)return;
 const handle=e.target.closest('.drag-handle'),item=e.target.closest('.item-slot.equipped'),control=handle||item;if(!control)return;
 if(handle){e.preventDefault();handle.focus();}
 control.setPointerCapture(e.pointerId);
 pointerDrag={type:handle?'player':'item',pointer:e.pointerId,x:e.clientX,y:e.clientY,clientX:e.clientX,clientY:e.clientY,id:control.closest('[data-id]').dataset.id,slot:item?Number(item.dataset.slot):null,mode:state.activeMode,control,started:false,target:null,preview:null,frame:null};
});
function itemDropTarget(x,y){
 const tile=document.elementFromPoint(x,y)?.closest('#players .item-slot');
 if(!tile)return null;
 return {tile,id:tile.closest('[data-id]').dataset.id,slot:Number(tile.dataset.slot??tile.dataset.lockedSlot)};
}
function highlightItemTarget(d){
 document.querySelectorAll('.item-drop-target,.item-drop-invalid').forEach(tile=>{tile.classList.remove('item-drop-target','item-drop-invalid');delete tile.dataset.dropAction;});
 const target=itemDropTarget(d.clientX,d.clientY);d.target=target;
 if(!target||(target.id===d.id&&target.slot===d.slot))return;
 const error=itemTransferError(currentRun(),{id:d.id,slot:d.slot},target);
 target.tile.classList.add(error?'item-drop-invalid':'item-drop-target');
 target.tile.dataset.dropAction=error?'Blocked':target.tile.classList.contains('equipped')?'Swap':'Move';
}
function animateItemDrag(){
 const d=pointerDrag;if(!d||d.type!=='item'||!d.started)return;
 const edge=80,rawSpeed=d.clientY<edge?-Math.ceil((edge-d.clientY)/5):d.clientY>innerHeight-edge?Math.ceil((d.clientY-innerHeight+edge)/5):0,speed=Math.max(-24,Math.min(24,rawSpeed));
 if(speed)window.scrollBy(0,speed);
 highlightItemTarget(d);
 d.frame=requestAnimationFrame(animateItemDrag);
}
document.addEventListener('pointermove',e=>{
 if(!pointerDrag||e.pointerId!==pointerDrag.pointer)return;
 if(pointerDrag.mode!==state.activeMode){cancelPointerDrag();return;}
 const d=pointerDrag;d.clientX=e.clientX;d.clientY=e.clientY;
 if(!d.started&&Math.hypot(e.clientX-d.x,e.clientY-d.y)<8)return;
 if(d.type==='item'){
   e.preventDefault();
   if(!d.started){
     d.started=true;d.control.classList.add('item-drag-source');document.body.classList.add('item-drag-active');
     const rect=d.control.getBoundingClientRect(),preview=d.control.cloneNode(true);preview.className='item-slot equipped item-drag-preview';preview.removeAttribute('data-slot');preview.setAttribute('aria-hidden','true');preview.tabIndex=-1;
     preview.style.width=`${Math.min(120,Math.max(80,rect.width))}px`;preview.style.height=`${Math.min(160,Math.max(95,rect.height))}px`;
     document.body.append(preview);d.preview=preview;d.frame=requestAnimationFrame(animateItemDrag);
   }
   d.preview.style.transform=`translate3d(${Math.max(4,Math.min(innerWidth-d.preview.offsetWidth-4,e.clientX+14))}px,${Math.max(4,Math.min(innerHeight-d.preview.offsetHeight-4,e.clientY+14))}px,0)`;
   highlightItemTarget(d);return;
 }
 pointerDrag.started=true;dragId=pointerDrag.id;$(`[data-id="${dragId}"]`).classList.add('dragging');
 const card=document.elementFromPoint(e.clientX,e.clientY)?.closest('.player-card');
 document.querySelectorAll('.drop-target').forEach(c=>c.classList.remove('drop-target'));
 pointerDrag.target=card?.dataset.id||null;if(card&&card.dataset.id!==dragId)card.classList.add('drop-target');
 if(e.clientY>innerHeight-65)window.scrollBy(0,14);else if(e.clientY<65)window.scrollBy(0,-14);
},{passive:false});
function cancelPointerDrag(){
 const d=pointerDrag;pointerDrag=null;dragId=null;
 if(d?.frame)cancelAnimationFrame(d.frame);d?.preview?.remove();
 if(d?.control.hasPointerCapture(d.pointer))d.control.releasePointerCapture(d.pointer);
 document.body.classList.remove('item-drag-active');
 document.querySelectorAll('.dragging,.drop-target,.item-drag-source,.item-drop-target,.item-drop-invalid').forEach(tile=>{tile.classList.remove('dragging','drop-target','item-drag-source','item-drop-target','item-drop-invalid');delete tile.dataset.dropAction;});
 return d;
}
function finishDrag(e){
 if(!pointerDrag||e.pointerId!==pointerDrag.pointer)return;
 const d=pointerDrag;
 if(d.type==='item'){
   const target=itemDropTarget(e.clientX,e.clientY);cancelPointerDrag();
   if(!d.started)return;
   suppressedDropClick={x:e.clientX,y:e.clientY,until:performance.now()+300};
   if(e.type!=='pointerup'||d.mode!==state.activeMode||!target||(target.id===d.id&&target.slot===d.slot))return;
   const result=transferItem(currentRun(),{id:d.id,slot:d.slot},target);
   if(!result.ok){toast(result.error);return;}
   save();renderPlayers();$(`[data-id="${target.id}"] [data-slot="${target.slot}"]`)?.focus();toast(result.swapped?'Items swapped':'Item moved');return;
 }
 cancelPointerDrag();
 if(e.type==='pointerup'&&d.started&&d.target){const players=currentRun().players,from=players.findIndex(p=>p.id===d.id),to=players.findIndex(p=>p.id===d.target);if(movePlayer(currentRun(),from,to)){save();renderPlayers();$(`[data-id="${d.id}"] .drag-handle`).focus();toast(`Player moved to position ${to+1}`);return;}}
 document.querySelectorAll('.dragging,.drop-target').forEach(c=>c.classList.remove('dragging','drop-target'));
}
document.addEventListener('pointerup',finishDrag);document.addEventListener('pointercancel',finishDrag);
$('#players').addEventListener('lostpointercapture',e=>{if(pointerDrag?.pointer===e.pointerId)cancelPointerDrag();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&pointerDrag){cancelPointerDrag();e.preventDefault();}});
window.addEventListener('blur',()=>{if(pointerDrag)cancelPointerDrag();});
function openPicker(id,slot){pickerTarget={id,slot};$('#itemSearch').value='';const p=currentRun().players.find(p=>p.id===id),i=currentRun().players.indexOf(p);$('#pickerTitle').textContent=`Choose an item`;$('#pickerSubtitle').textContent=`${playerLabel(p,i)} · Slot ${slot+1} of ${p.capacity}`;$('#removeItem').hidden=!p.slots[slot];renderCatalog();$('#picker').showModal();$('#itemSearch').focus();}
function renderCatalog(){
 $('#categoryTabs').innerHTML=PICKER_CATEGORIES.map(([key,name])=>`<button data-category="${key}" class="${category===key?'active':''}" aria-pressed="${category===key}">${name}</button>`).join('');
 const p=currentRun().players.find(p=>p.id===pickerTarget.id),q=$('#itemSearch').value.trim().toLowerCase(),matches=CATALOG.filter(x=>(category==='ALL'||x.role===category)&&`${x.name} ${x.role} ${x.rarity}`.toLowerCase().includes(q));
 $('#itemResults').innerHTML=matches.length?PICKER_RARITIES.map(([rarity,label,color])=>{
   const items=matches.filter(x=>(PICKER_RARITIES.some(([key])=>key===x.rarity)?x.rarity:'unspecified')===rarity).sort((a,b)=>a.name.localeCompare(b.name));
   if(!items.length)return '';
   return `<h3 class="rarity-heading" style="--rarity:${color}"><span>${label}</span><small>${items.length} item${items.length===1?'':'s'}</small></h3>`+items.map(x=>{const duplicate=p.slots.some((s,n)=>n!==pickerTarget.slot&&s?.item===x.name);return `<button class="catalog-item" style="--rarity:${x.hex}" data-item="${esc(x.name)}" ${duplicate?'disabled':''} aria-label="${esc(x.name)}, ${x.rarity}${duplicate?', already in this loadout':''}"><span class="role-tag">${duplicate?'EQUIPPED':x.role}</span><img src="${x.img}" alt="" loading="lazy"><b>${esc(x.name)}</b><small>${x.rarity} · Max ${x.max}</small></button>`;}).join('');
 }).join(''):'<p class="empty-results">No items found. Try another name or category.</p>';
}
$('#categoryTabs').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){category=b.dataset.category;try{localStorage.setItem(PICKER_STORAGE,category);}catch{}renderCatalog();$('#itemResults').scrollTop=0;}});
$('#itemSearch').addEventListener('input',renderCatalog);
$('#itemResults').addEventListener('click',e=>{const b=e.target.closest('[data-item]');if(!b||b.disabled)return;const p=currentRun().players.find(p=>p.id===pickerTarget.id),item=CATALOG.find(x=>x.name===b.dataset.item);p.slots[pickerTarget.slot]={item:item.name,level:1};save();$('#picker').close();renderPlayers();focusSlot();});
function focusSlot(){if(pickerTarget)$(`[data-id="${pickerTarget.id}"] [data-slot="${pickerTarget.slot}"]`)?.focus();}
$('#closePicker').onclick=()=>{$('#picker').close();focusSlot();};
$('#removeItem').onclick=()=>{const p=currentRun().players.find(p=>p.id===pickerTarget.id);p.slots[pickerTarget.slot]=null;save();$('#picker').close();renderPlayers();focusSlot();};
$('#picker').addEventListener('click',e=>{if(e.target===$('#picker')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){e.target.close();focusSlot();}}});
const menu=$('#moreMenu');function closeMenu(){menu.hidden=true;$('#moreButton').setAttribute('aria-expanded','false');}
$('#moreButton').onclick=()=>{menu.hidden=!menu.hidden;$('#moreButton').setAttribute('aria-expanded',String(!menu.hidden));};
document.addEventListener('click',e=>{if(!e.target.closest('.menu-wrap'))closeMenu();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);}
$('#exportBackup').onclick=()=>{download(new Blob([JSON.stringify(createLineupBackup(state),null,2)],{type:'application/json'}),`stn-${state.activeMode}-lineup-backup.json`);closeMenu();toast(`${currentMode().name} backup downloaded · import into any mode`);};
function confirmAction(title,message,action){$('#confirmTitle').textContent=title;$('#confirmMessage').textContent=message;$('#acceptConfirm').onclick=()=>{$('#confirmDialog').close();action();};$('#confirmDialog').showModal();}
$('#cancelConfirm').onclick=()=>$('#confirmDialog').close();
$('#resetMode').onclick=()=>{closeMenu();confirmAction(`Reset ${currentMode().name} lineup?`,'This clears the names and loadouts in this mode. Download a backup first if you want to keep a copy.',()=>{state.runs[state.activeMode]=freshRun(currentMode());save();render();toast('Lineup reset');});};
$('#importBackup').onclick=()=>{closeMenu();$('#backupFile').click();};
$('#backupFile').onchange=async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;const targetMode={...currentMode()};try{if(file.size>1000000)throw new Error('Choose a Clan Run backup smaller than 1 MB.');const backup=JSON.parse(await file.text()),imported=readLineupBackup(backup,CATALOG),source=MODES.find(m=>m.id===imported.sourceMode);confirmAction(`Import into ${targetMode.name}?`,`This replaces only your ${targetMode.name} lineup with the ${source.name} backup. Your other modes stay as they are.`,()=>{state=restoreLineupBackup(state,backup,CATALOG,targetMode.id);save();render();toast(`Backup imported into ${targetMode.name}`);});}catch(err){toast(err instanceof SyntaxError?'That file is not valid JSON.':err.message);}};
const imageCache=new Map();async function getItemImage(item){if(imageCache.has(item.img))return imageCache.get(item.img);const promise=new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=item.img;});imageCache.set(item.img,promise);return promise;}
// Both copy and download render the same snapshot of the active ten-player lineup.
async function createLineupImage(run,mode){
 const used=[...new Set(run.players.flatMap(p=>p.slots.slice(0,p.capacity).filter(Boolean).map(s=>s.item)))];const images=new Map(await Promise.all(used.map(async name=>{const item=CATALOG.find(x=>x.name===name);return [name,await getItemImage(item)];})));
 await document.fonts.ready;
 const intel=summarize(run,CATALOG),sections=summarySections(intel);
 const canvas=document.createElement('canvas');canvas.width=1600;let c=canvas.getContext('2d');c.font='17px "DM Sans", sans-serif';
 const intelColumns=summaryColumns(sections).map(column=>{
 const lines=[];
 for(const section of column){
   lines.push({text:section.title.toUpperCase(),heading:true});
   for(const metric of section.metrics){const paragraph=metric.value?`${metric.label}: ${metric.value}`:metric.label,indent=metric.item?30:0;let line='',first=true;for(const word of paragraph.split(' ')){const next=line?`${line} ${word}`:word;if(line&&c.measureText(next).width>462-indent){lines.push({text:line,indent,item:first?metric.item:null});first=false;line=word;}else line=next;}if(line)lines.push({text:line,indent,item:first?metric.item:null});}
   lines.push({text:''});
 }
 return lines;
 });
 const rows=Math.max(...intelColumns.map(lines=>lines.length)),intelTop=1472,intelHeight=88+rows*29;
 canvas.height=sections.length?intelTop+intelHeight+75:1530;c=canvas.getContext('2d');
 c.fillStyle='#0b0d12';c.fillRect(0,0,1600,canvas.height);c.fillStyle=mode.color;c.fillRect(55,184,1490,3);c.fillStyle=mode.textColor||mode.color;c.font='600 17px "DM Sans", sans-serif';c.fillText('STN  /  CLAN COMMAND',55,55);c.fillStyle='#edf1f7';c.font='600 54px "Barlow Condensed", sans-serif';c.fillText((run.title.trim()||`${mode.name} clan run`).slice(0,60),55,122,1430);c.fillStyle='#91a3bf';c.font='20px "DM Sans", sans-serif';c.fillText(`${mode.name.toUpperCase()}  ·  10-PLAYER CLAN LINEUP`,55,165);
 function box(x,y,w,h,r,color){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
 function fit(text,x,y,max,size,color){c.fillStyle=color;while(size>9){c.font=`${size}px "DM Sans", sans-serif`;if(c.measureText(text).width<=max)break;size--;}c.fillText(text,x,y,max);}
 run.players.forEach((p,i)=>{
 const x=55+(i%2)*755,y=205+Math.floor(i/2)*246;box(x,y,735,226,12,'#18202c');box(x+15,y+15,35,35,7,'#2c3b50');fit(String(i+1).padStart(2,'0'),x+21,y+39,26,19,mode.textColor||mode.color);fit(playerLabel(p,i),x+63,y+39,480,19,'#e2eaf6');fit(`${p.capacity} SLOTS`,x+626,y+38,95,13,'#98acc9');
 for(let n=0;n<5;n++){const sx=x+16+n*142,sy=y+66,s=p.slots[n];box(sx,sy,133,141,7,n<p.capacity?'#0f1724':'#141c29');if(n>=p.capacity){fit('5-slot only',sx+24,sy+76,105,13,'#566c8d');continue;}if(!s){fit('+',sx+56,sy+65,40,30,'#7794bd');fit('Empty slot',sx+27,sy+100,100,12,'#8299ba');continue;}const item=CATALOG.find(item=>item.name===s.item),img=images.get(s.item);if(img){const ratio=Math.min(99/img.naturalWidth,76/img.naturalHeight);const w=img.naturalWidth*ratio,h=img.naturalHeight*ratio;c.drawImage(img,sx+(133-w)/2,sy+10+(76-h)/2,w,h);}fit(s.item,sx+8,sy+108,117,13,'#e2eaf6');fit(`Lv. ${s.level}${s.level===item.max?' · MAX':''}`,sx+8,sy+129,117,11,item.hex);}
 });
 if(sections.length){box(55,intelTop,1490,intelHeight,12,'#141d2a');c.fillStyle=mode.textColor||mode.color;c.font='600 28px "Barlow Condensed", sans-serif';c.fillText('OVERALL STATS',78,intelTop+43);
 intelColumns.forEach((lines,col)=>lines.forEach((line,row)=>{const x=78+col*495,y=intelTop+78+row*29;if(line.heading){box(x,y-21,462,27,4,'#233349');c.fillStyle=mode.color;c.fillRect(x,y-21,3,27);}const icon=line.item?images.get(line.item):null;if(icon){const scale=Math.min(22/icon.naturalWidth,22/icon.naturalHeight),w=icon.naturalWidth*scale,h=icon.naturalHeight*scale;c.drawImage(icon,x+(22-w)/2,y-18+(22-h)/2,w,h);}const indent=line.heading?12:(line.indent||0);c.font=line.heading?'700 19px "Barlow Condensed", sans-serif':'400 17px "DM Sans", sans-serif';c.fillStyle=line.heading?(mode.textColor||mode.color):'#b6c5db';c.fillText(line.text,x+indent,y,462-indent);}));}
 c.fillStyle='#8297b7';c.font='15px "DM Sans", sans-serif';c.fillText('SURVIVE TOGETHER. EVERY SLOT HAS A PURPOSE.',55,canvas.height-29);c.textAlign='right';c.fillText('STN CLAN RUN',1545,canvas.height-29);
 const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('Image could not be created.');return blob;
}
async function downloadLoadouts(){
 const buttons=[$('#downloadLoadouts')];buttons.forEach(b=>b.disabled=true);
 const run=structuredClone(currentRun()),mode={...currentMode()};
 try{const blob=await createLineupImage(run,mode);download(blob,`stn-${mode.id}-loadouts.png`);toast('Loadouts image downloaded');}
 catch(err){toast('Could not create the image. Please try again.');console.error(err);}
 finally{buttons.forEach(b=>b.disabled=false);}
}
$('#downloadLoadouts').onclick=downloadLoadouts;
let fallbackImage=null,fallbackImageUrl=null;
function showImageFallback(blob,mode){
 fallbackImage={blob,mode};fallbackImageUrl=URL.createObjectURL(blob);$('#lineupPreview').src=fallbackImageUrl;$('#imageDialog').showModal();
}
$('#copyImage').onclick=async()=>{
 const button=$('#copyImage');button.disabled=true;
 const run=structuredClone(currentRun()),mode={...currentMode()};
 const imagePromise=createLineupImage(run,mode);
 try{
   if(!navigator.clipboard?.write||typeof ClipboardItem==='undefined')throw new Error('Image clipboard unavailable');
   // Start the clipboard write in the click handler to retain browser user activation.
   await navigator.clipboard.write([new ClipboardItem({'image/png':imagePromise})]);
   toast('Lineup image copied · paste it in Discord');
 }catch{
   try{showImageFallback(await imagePromise,mode);}catch(err){toast('Could not create the image. Please try again.');console.error(err);}
 }finally{button.disabled=false;}
};
$('#closeImageDialog').onclick=()=>$('#imageDialog').close();
$('#fallbackDownload').onclick=()=>{if(fallbackImage)download(fallbackImage.blob,`stn-${fallbackImage.mode.id}-loadouts.png`);};
$('#imageDialog').addEventListener('close',()=>{if(fallbackImageUrl)URL.revokeObjectURL(fallbackImageUrl);fallbackImageUrl=null;fallbackImage=null;$('#lineupPreview').removeAttribute('src');});
render();if(!storageHealthy){$('#saveStatus').textContent='Saved data unavailable · download backups';toast('Saved data could not be loaded. Import a backup to restore your plans.');}
})();
