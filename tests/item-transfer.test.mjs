import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {freshState,transferItem,itemTransferError,normalizeState} from '../model.js';
const catalog=vm.runInNewContext(`${fs.readFileSync(new URL('../catalog.js',import.meta.url),'utf8')};CATALOG`);
const at=(player,slot)=>({id:`player-${player}`,slot});

test('cross-player swaps preserve levels, names, capacities, and every other slot',()=>{
 const state=freshState(),run=state.runs.easy;
 run.players[0].name='Cy';run.players[1].name='Dex';run.players[1].capacity=5;
 run.players[0].slots[0]={item:'Dragon',level:5};run.players[1].slots[2]={item:'Juggernaut',level:9};
 const expected=structuredClone(state);
 [expected.runs.easy.players[0].slots[0],expected.runs.easy.players[1].slots[2]]=[expected.runs.easy.players[1].slots[2],expected.runs.easy.players[0].slots[0]];
 assert.deepEqual(transferItem(run,at(1,0),at(2,2)),{ok:true,swapped:true});
 assert.deepEqual(state,expected);
 assert.deepEqual(normalizeState(JSON.parse(JSON.stringify(state)),catalog),state);
});

test('moving to an empty slot leaves the source empty and preserves retained fifth items',()=>{
 const run=freshState().runs.easy;run.players[0].slots[1]={item:'Dragon',level:4};run.players[0].slots[4]={item:'Cat',level:5};
 assert.deepEqual(transferItem(run,at(1,1),at(2,3)),{ok:true,swapped:false});
 assert.equal(run.players[0].slots[1],null);assert.deepEqual(run.players[1].slots[3],{item:'Dragon',level:4});assert.deepEqual(run.players[0].slots[4],{item:'Cat',level:5});
});

test('same-player swaps and moves are allowed without false duplicate detection',()=>{
 const run=freshState().runs.easy;run.players[0].slots[0]={item:'Dragon',level:5};run.players[0].slots[1]={item:'The Bank',level:9};
 assert.equal(transferItem(run,at(1,0),at(1,1)).ok,true);
 assert.deepEqual(run.players[0].slots.slice(0,2),[{item:'The Bank',level:9},{item:'Dragon',level:5}]);
 assert.equal(transferItem(run,at(1,1),at(1,3)).ok,true);
 assert.equal(run.players[0].slots[1],null);assert.deepEqual(run.players[0].slots[3],{item:'Dragon',level:5});
});

test('duplicate prevention checks both loadouts, including disabled fifth slots, without changing either',()=>{
 for(const duplicateInSource of [false,true]){
   const run=freshState().runs.easy;run.players[0].slots[0]={item:'Dragon',level:5};run.players[1].slots[0]={item:'Cat',level:4};
   run.players[duplicateInSource?0:1].slots[4]={item:duplicateInSource?'Cat':'Dragon',level:1};
   const before=structuredClone(run);
   assert.match(itemTransferError(run,at(1,0),at(2,0)),/same item twice/);
   assert.equal(transferItem(run,at(1,0),at(2,0)).ok,false);assert.deepEqual(run,before);
 }
});

test('invalid players, empty sources, same slots, and disabled fifth slots cannot lose an item',()=>{
 const run=freshState().runs.easy;run.players[0].slots[0]={item:'Dragon',level:3};
 const before=structuredClone(run);
 for(const [from,to] of [[at(1,0),at(1,0)],[at(1,1),at(2,0)],[at(1,0),at(2,4)],[at(1,4),at(2,0)],[at(1,0),at(11,0)],[at(1,0),at(2,-1)],[at(1,0),at(2,1.5)]]){
   assert.equal(transferItem(run,from,to).ok,false);assert.deepEqual(run,before);
 }
 run.players[1].capacity=5;assert.equal(transferItem(run,at(1,0),at(2,4)).ok,true);
});

test('same-item swaps between players may exchange levels without creating duplicates',()=>{
 const run=freshState().runs.easy;run.players[0].slots[0]={item:'Dragon',level:1};run.players[1].slots[0]={item:'Dragon',level:5};
 assert.equal(transferItem(run,at(1,0),at(2,0)).ok,true);
 assert.equal(run.players[0].slots[0].level,5);assert.equal(run.players[1].slots[0].level,1);
});
