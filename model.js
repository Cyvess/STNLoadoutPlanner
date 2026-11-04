export const MODES = [
  {id:'easy',name:'Easy',color:'#c3f26b',symbol:'leaf'},
  {id:'hard',name:'Hard',color:'#ef5d64',symbol:'flame'},
  {id:'crazy',name:'Crazy',color:'#f59a42',symbol:'zap'},
  {id:'apocalypse',name:'Apocalypse',color:'#267a48',textColor:'#7bc397',onColor:'#ffffff',symbol:'skull'}
];
export function freshRun(mode){return {title:`${mode.name} clan run`,players:Array.from({length:10},(_,i)=>({id:`player-${i+1}`,name:'',capacity:4,slots:Array.from({length:5},()=>null)}))};}
export function freshState(){return {version:1,activeMode:'easy',runs:Object.fromEntries(MODES.map(m=>[m.id,freshRun(m)]))};}
export function playerLabel(player,index){return player.name.trim()||`Player #${index+1}`;}
export function normalizeState(input,catalog){
  if(!input||input.version!==1||!input.runs)throw new Error('This is not a compatible Clan Run backup.');
  const result=freshState();
  if(MODES.some(m=>m.id===input.activeMode))result.activeMode=input.activeMode;
  for(const mode of MODES){
    const run=input.runs[mode.id];
    if(!run||typeof run.title!=='string'||!Array.isArray(run.players)||run.players.length!==10)throw new Error('The backup must contain all four modes with ten players each.');
    result.runs[mode.id].title=run.title.slice(0,70);
    const ids=new Set();
    result.runs[mode.id].players=run.players.map((p,i)=>{
      if(!p||typeof p.name!=='string'||![4,5].includes(p.capacity)||!Array.isArray(p.slots)||p.slots.length!==5)throw new Error('A player loadout in this backup is invalid.');
      const id=typeof p.id==='string'&&/^player-(?:10|[1-9])$/.test(p.id)?p.id:`player-${i+1}`;
      if(ids.has(id))throw new Error('The backup contains duplicate player identifiers.');
      ids.add(id);
      const equipped=new Set();
      return {id,name:p.name.slice(0,40),capacity:p.capacity,slots:p.slots.map(s=>{
        if(s===null)return null;
        const item=catalog.find(item=>item.name===s?.item);
        if(!item||!Number.isInteger(s.level)||s.level<1||s.level>item.max||equipped.has(item.name))throw new Error('The backup has an unknown, repeated, or invalid item.');
        equipped.add(item.name);return {item:item.name,level:s.level};
      })};
    });
  }
  return result;
}
export function movePlayer(run,from,to){if(from<0||to<0||from>=10||to>=10||from===to)return false;const [p]=run.players.splice(from,1);run.players.splice(to,0,p);return true;}
export function stats(run){return run.players.reduce((r,p)=>{const n=p.slots.slice(0,p.capacity).filter(Boolean).length;return {equipped:r.equipped+(n>0?1:0),filled:r.filled+n,total:r.total+p.capacity};},{equipped:0,filled:0,total:0});}
export function discordText(run,mode){return [`${run.title.trim()||`${mode.name} clan run`} · ${mode.name}`,`10-player clan lineup`,'',...run.players.map((p,i)=>`${i+1}. ${playerLabel(p,i)} [${p.capacity} slots]\n${p.slots.slice(0,p.capacity).map((s,n)=>`   ${n+1}. ${s?`${s.item} · Lv. ${s.level}`:'—'}`).join('\n')}`)].join('\n');}
