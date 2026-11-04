import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {MODES,freshState,createLineupBackup,readLineupBackup,restoreLineupBackup,movePlayer} from '../model.js';
import {summarize} from '../summary.js';
const catalog=vm.runInNewContext(`${fs.readFileSync(new URL('../catalog.js',import.meta.url),'utf8')};CATALOG`);

test('a current-mode backup can be imported into every mode without touching other modes',()=>{
  for(const source of MODES)for(const target of MODES){
    const state=freshState();state.activeMode=source.id;
    for(const mode of MODES)state.runs[mode.id].title=`${mode.name} original`;
    state.runs[source.id].players[0].name='Cy';
    state.runs[source.id].players[0].slots[0]={item:'Jinx',level:3};
    const backup=JSON.parse(JSON.stringify(createLineupBackup(state)));
    assert.equal(backup.sourceMode,source.id);assert.equal(backup.runs,undefined);
    state.activeMode=target.id;
    const before=structuredClone(state);
    const restored=restoreLineupBackup(state,backup,catalog);
    assert.equal(restored.activeMode,target.id);
    assert.deepEqual(restored.runs[target.id],backup.run);
    for(const mode of MODES)if(mode.id!==target.id)assert.deepEqual(restored.runs[mode.id],before.runs[mode.id]);
    assert.deepEqual(state,before);
  }
});

test('lineup backups retain reordered names, mixed levels, capacities, and disabled fifth slots',()=>{
  const state=freshState();const player=state.runs.easy.players[0];
  player.name='Cy';player.slots[0]={item:'Cat',level:2};player.slots[4]={item:'Jinx',level:5};
  state.runs.easy.players[1].capacity=5;
  movePlayer(state.runs.easy,0,9);
  const backup=createLineupBackup(state);
  state.runs.easy.players[9].name='Changed after download';
  state.activeMode='apocalypse';
  const restored=restoreLineupBackup(state,JSON.parse(JSON.stringify(backup)),catalog);
  assert.deepEqual(restored.runs.apocalypse,backup.run);
  assert.equal(restored.runs.apocalypse.players[9].name,'Cy');
  assert.equal(restored.runs.apocalypse.players[9].capacity,4);
  assert.deepEqual(restored.runs.apocalypse.players[9].slots[4],{item:'Jinx',level:5});
});

test('legacy all-mode backups import their saved active lineup into the selected destination',()=>{
  const legacy=freshState();legacy.activeMode='hard';legacy.runs.hard.title='Saved hard team';
  legacy.runs.hard.players[0].slots[0]={item:'The Bank',level:9};
  const destination=freshState();destination.activeMode='apocalypse';
  const restored=restoreLineupBackup(destination,legacy,catalog);
  assert.deepEqual(readLineupBackup(legacy,catalog),{sourceMode:'hard',run:legacy.runs.hard});
  assert.equal(restored.activeMode,'apocalypse');
  assert.deepEqual(restored.runs.apocalypse,legacy.runs.hard);
  assert.deepEqual(restored.runs.hard,destination.runs.hard);
});

test('invalid lineup backups fail validation without modifying the current plans',()=>{
  const state=freshState(),before=structuredClone(state);
  for(const mutate of [
    b=>{b.version=2;},b=>{b.sourceMode='unknown';},b=>{b.run.players.pop();},
    b=>{b.run.players[0].slots[0]={item:'Cat',level:99};},
    b=>{b.run.players[0].slots[0]={item:'Unknown',level:1};},
    b=>{b.run.players[0].slots[0]={item:'Cat',level:1};b.run.players[0].slots[4]={item:'Cat',level:5};},
    b=>{b.run.players[1].id=b.run.players[0].id;},
  ]){
    const backup=createLineupBackup(state);mutate(backup);
    assert.throws(()=>restoreLineupBackup(state,backup,catalog));
    assert.deepEqual(state,before);
  }
});

test('the confirmed destination stays fixed if the active mode changes while reading a backup',()=>{
  const state=freshState();state.runs.easy.title='Copied team';
  const backup=createLineupBackup(state);state.activeMode='crazy';
  const restored=restoreLineupBackup(state,backup,catalog,'apocalypse');
  assert.equal(restored.runs.apocalypse.title,'Copied team');
  assert.deepEqual(restored.runs.crazy,state.runs.crazy);
  assert.equal(restored.activeMode,'crazy');
});

test('imported lineups drive destination stats without combining other mode loadouts',()=>{
  const state=freshState();
  for(let i=0;i<6;i++)state.runs.easy.players[i].slots[0]={item:'Cat',level:5};
  const backup=createLineupBackup(state);state.activeMode='apocalypse';
  state.runs.apocalypse.players[0].slots[0]={item:'The Bank',level:9};
  const restored=restoreLineupBackup(state,backup,catalog);
  const stats=summarize(restored.runs.apocalypse,catalog);
  assert.equal(stats.petCount,6);assert.equal(stats.baseIncome,0);
  assert.ok(Math.abs(stats.petTotals.cash_pct-47.6672)<1e-8);
});
