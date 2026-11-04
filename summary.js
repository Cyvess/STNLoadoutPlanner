import {GAME_DATA} from './game-data.js';
import {UNIT_QUANTITIES} from './unit-quantities.js';

export const METRICS = {
  cash_pct:['Cash boost','%'], coins_pct:['Coins boost','%'], luck_pct:['Luck','%'],
  enemy_buff_pct:['Enemy buff','%'], attack_damage_pct:['Attack damage','%'],
  attack_speed_pct:['Attack speed','%'], range_pct:['Range','%'],
  money_speed_pct:['Money speed','%'], lifesteal_pct:['Lifesteal','%'],
  thorn_pct:['Thorn','%'], health_pct:['Health','%'], repair_pct_s:['Door repair','%/s'],
  exp_pct:['Experience','%'], supplies_pct:['Supplies','%'],
  enemy_slow_pct:['Enemy movement / attack slow','%'], knockback_pct:['Knockback','%'],
  money_flat:['Flat money','$'], door_levels:['Door levels',' levels'],
  stun_s:['Stun duration','s'], cooldown_s:['Cooldown','s'],
  invincible_s:['Door invincibility','s'], orange_plots:['Orange area',' plots'],
};
const GLOBAL_KEYS = new Set(Object.keys(METRICS).filter(k=>!['stun_s','cooldown_s','invincible_s','orange_plots'].includes(k)));
export const number = n => new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(Math.abs(n)<1e-10?0:n);
export function metricValue(key,value){
 if(key==='door_levels')value=Math.ceil(value);
 const unit=METRICS[key]?.[1]||'';
 if(unit==='$')return `$${number(value)}`;
 return `${number(value)}${unit}`;
}
export function metricLine(key,value){return `${METRICS[key]?.[0]||key}: ${metricValue(key,value)}`;}

export function summarize(run,catalog){
 const selected=[];
 run.players.forEach((p,index)=>p.slots.slice(0,p.capacity).forEach(slot=>{
   if(slot)selected.push({...slot,player:p.name.trim()||`Player #${index+1}`,role:catalog.find(i=>i.name===slot.item)?.role});
 }));
 const petMap=new Map(),petCounts=new Map(),unknownPets=[];
 selected.filter(s=>s.role==='PET').forEach(s=>{
   petCounts.set(s.item,(petCounts.get(s.item)||0)+1);
   if(!GAME_DATA.pets[s.item]?.levels[s.level]){unknownPets.push(s);return;}
   if(!petMap.has(s.item))petMap.set(s.item,[]);petMap.get(s.item).push(s);
 });
 const petTotals={},petGroups=[];
 for(const [name,copies] of petMap){
   const data=GAME_DATA.pets[name];copies.sort((a,b)=>b.level-a.level);
   const independent=data.stacking==='independent';
   const contributions=copies.map((copy,index)=>{
     const factor=(independent||data.stacking==='additive')?1:0.6**index;
     const values=Object.fromEntries(Object.entries(data.levels[copy.level]).map(([key,value])=>[key,value*(key==='money_flat'?1:factor)]));
     return {...copy,factor,values};
   });
   const totals={};
   if(!independent)for(const copy of contributions)for(const [key,value]of Object.entries(copy.values))totals[key]=(totals[key]||0)+value;
   if(!independent&&!data.condition)for(const [key,value]of Object.entries(totals))if(GLOBAL_KEYS.has(key))petTotals[key]=(petTotals[key]||0)+value;
   petGroups.push({name,count:copies.length,independent,condition:data.condition,contributions,totals});
 }
 const farms=[],towers=[],unknownUnits=[],unitSlots=selected.filter(s=>s.role!=='PET');
 let unitQuantity=0,unitQuantityMissing=0;
 for(const slot of unitSlots){
   const quantity=UNIT_QUANTITIES[slot.item];
   if(Number.isInteger(quantity)&&quantity>0)unitQuantity+=quantity;
   else unitQuantityMissing++;
 }
 const support={militaryDamage:0,militaryRange:0,protectorSpeed:0,medicalRepair:0,shieldCooldowns:[],militaryCount:0,protectorCount:0,medicalCount:0};
 let baseIncome=0,baseDamage=0,damageKnown=0;
 for(const slot of unitSlots){
   const data=GAME_DATA.units[slot.item],row=data?.levels.find(l=>l.level===slot.level);
   if(!row){unknownUnits.push({...slot,reason:data?'This level was not supplied':'Stats not supplied'});continue;}
   if(slot.role==='FARM'){
     const interval=row.production_interval_seconds??data.production_interval_seconds;
     const income=Number.isFinite(interval)&&interval>0?row.money_given/interval:null;
     farms.push({...slot,payout:row.money_given,interval,income,approximate:slot.item==='The Bank',autoCollect:data.auto_collect_interval_seconds});
     if(income!==null)baseIncome+=income;
   }
   if(slot.role==='DAMAGE'){
     towers.push({...slot,damage:row.attack_damage,slow:row.enemy_slow_percent});
     if(Number.isFinite(row.attack_damage)){baseDamage+=row.attack_damage;damageKnown++;}
   }
   if(slot.item==='Military Base'){
     support.militaryCount++;support.militaryDamage=Math.max(support.militaryDamage,row.attack_damage_percent);support.militaryRange=Math.max(support.militaryRange,row.range_percent);
   }
   if(slot.item==='Protector Base'){
     support.protectorCount++;support.protectorSpeed=Math.max(support.protectorSpeed,row.attack_speed_percent);
     if(row.shield_cooldown_seconds!=null)support.shieldCooldowns.push({player:slot.player,level:slot.level,seconds:row.shield_cooldown_seconds});
   }
   if(slot.item==='Medical Base'){support.medicalCount++;support.medicalRepair+=row.repair_percent/row.repair_interval_seconds;}
 }
 const damageMissing=selected.filter(s=>s.role==='DAMAGE').length-damageKnown;
 return {petTotals,petGroups,petCounts:[...petCounts].sort(([a],[b])=>a.localeCompare(b)).map(([name,count])=>({name,count})),petCount:selected.filter(s=>s.role==='PET').length,unitCount:unitSlots.length,unitQuantity,unitQuantityMissing,unknownPets,unknownUnits,farms,towers,support,baseIncome,baseDamage,damageKnown,damageMissing};
}

// Presentation contains aggregate values only, and only for equipped effects.
export function summarySections(s){
 const units=[],support=[],pets=[],totalPets=[];
 const row=(rows,label,value)=>rows.push({label,value});
 const metric=(rows,label,key,value)=>{if(Number.isFinite(value)&&Math.abs(value)>1e-10)row(rows,label,metricValue(key,value));};
 if(s.damageKnown)row(units,'Base damage / volley',number(s.baseDamage));
 if(s.farms.length)row(units,'Base production',`${s.farms.some(f=>f.approximate)?'~':''}$${number(s.baseIncome)}/s`);
 const banks=s.farms.filter(f=>f.item==='The Bank');
 if(banks.length)row(units,`Bank (${banks.length})`,`$${number(banks.reduce((total,bank)=>total+bank.payout,0))} / cycle`);
 const slows=s.towers.map(t=>t.slow).filter(Number.isFinite);
 if(slows.length)row(units,'Turret slow (strongest)',`${number(Math.max(...slows))}%`);
 if(s.damageMissing)row(units,'Damage data missing',`${s.damageMissing} tower${s.damageMissing===1?'':'s'}`);
 const otherUnknown=s.unknownUnits.filter(u=>u.role!=='DAMAGE').length;
 if(otherUnknown)row(units,'Unit data missing',`${otherUnknown} unit${otherUnknown===1?'':'s'}`);
 if(s.unitQuantityMissing)row(units,'Quantity data missing',`${s.unitQuantityMissing} slot${s.unitQuantityMissing===1?'':'s'}`);
 if(s.unitCount)row(units,'Total units',s.unitQuantityMissing?`${number(s.unitQuantity)} + ?`:number(s.unitQuantity));
 const p=s.support;
 if(p.medicalCount)row(support,'Medical Base',String(p.medicalCount));
 if(p.protectorCount)row(support,'Protector Base',String(p.protectorCount));
 if(p.militaryCount)row(support,'Military Base',String(p.militaryCount));
 for(const [key,value]of Object.entries(s.petTotals))metric(pets,METRICS[key]?.[0]||key,key,value);
 if(s.unknownPets.length)row(pets,'Pet data missing',`${s.unknownPets.length} pet${s.unknownPets.length===1?'':'s'}`);
 for(const pet of s.petCounts)row(totalPets,pet.name,String(pet.count));
 return [['Units',units],['Support',support],['Pet bonuses',pets],['Total Pets',totalPets]]
   .filter(([,metrics])=>metrics.length)
   .map(([title,metrics])=>({title,metrics,lines:metrics.map(m=>`${m.label}: ${m.value}`)}));
}

// Fixed column positions are shared by the planner and lineup image.
export function summaryColumns(sections){
 return [
   sections.filter(s=>s.title==='Units'||s.title==='Support'),
   sections.filter(s=>s.title==='Pet bonuses'),
   sections.filter(s=>s.title==='Total Pets'),
 ];
}
