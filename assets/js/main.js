/* Shared behaviour: nav, reveal, hero parallax, videos, lightbox, UGV scroll rail */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- mobile nav ---------- */
const menu=$('#menu'),burger=$('#burger');
if(burger){burger.addEventListener('click',()=>{const open=menu.classList.toggle('hidden')===false;burger.setAttribute('aria-expanded',open)})}
$$('#menu a').forEach(a=>a.addEventListener('click',()=>menu&&menu.classList.add('hidden')));

/* ---------- nav glass gets denser after scrolling ---------- */
const nav=$('#navbar');
if(nav){const f=()=>nav.classList.toggle('bg-void/80',scrollY>40);addEventListener('scroll',f,{passive:true});f()}

/* ---------- reveal on scroll ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.08});
window.observeReveals=(r=document)=>$$('.reveal:not(.show)',r).forEach(el=>io.observe(el));
observeReveals();

/* ---------- active section in nav ---------- */
const secs=$$('section[id]').filter(s=>$(`[data-nav="${s.id}"]`));
if(secs.length){
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){
    $$('[data-nav]').forEach(a=>a.classList.toggle('text-ice',a.dataset.nav===e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(s=>so.observe(s));
}

/* ---------- hero parallax: drone follows the cursor, ghost name drifts the other way ---------- */
const stage=$('#stage');
if(stage&&!reduce&&matchMedia('(pointer:fine)').matches){
  const layers=$$('[data-depth]',stage);let tx=0,ty=0,cx=0,cy=0,raf=0;
  stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;if(!raf)raf=requestAnimationFrame(step)});
  stage.addEventListener('pointerleave',()=>{tx=0;ty=0;if(!raf)raf=requestAnimationFrame(step)});
  function step(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;
    layers.forEach(l=>{const d=+l.dataset.depth;l.style.transform=`translate3d(${cx*d}px,${cy*d}px,0)`});
    raf=(Math.abs(tx-cx)+Math.abs(ty-cy)>.001)?requestAnimationFrame(step):0}
}

/* ---------- videos ---------- */
const vids=[];
window.initVideos=function(r=document){
  $$('.vf',r).forEach(f=>{
    if(f.dataset.ready)return;const v=$('video',f),ov=$('.ov',f),bar=$('.bar',f);if(!v||!ov)return;f.dataset.ready=1;
    vids.push({v,ov});
    const play=()=>{vids.forEach(o=>{if(o.v!==v&&!o.v.paused){o.v.pause();o.ov.classList.remove('hidden')}});
      v.play().then(()=>ov.classList.add('hidden')).catch(()=>ov.classList.remove('hidden'))};
    ov.addEventListener('click',play);
    v.addEventListener('click',()=>v.paused?play():(v.pause(),ov.classList.remove('hidden')));
    v.addEventListener('timeupdate',()=>{if(v.duration&&bar)bar.style.width=(v.currentTime/v.duration*100)+'%'});
    v.addEventListener('ended',()=>{ov.classList.remove('hidden');if(bar)bar.style.width='0'});
    v.addEventListener('error',()=>{const l=$('.lbl',ov);if(l)l.textContent='Video unavailable'});
  });
};
window.pauseAllVideos=(r=document)=>$$('video',r).forEach(v=>{v.pause();const o=v.parentElement.querySelector('.ov');if(o)o.classList.remove('hidden')});
initVideos();

/* ---------- lightbox ---------- */
let lb=$('.lb');
if(!lb){lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Image viewer');
  lb.innerHTML='<button class="btn btn-ice absolute right-5 top-5" aria-label="Close image">Close ✕</button><img alt=""/><div class="font-mono text-[11px] uppercase tracking-[.1em] text-dim"></div>';document.body.appendChild(lb)}
const lbImg=$('img',lb),lbCap=lb.lastElementChild;
lb.addEventListener('click',e=>{if(e.target!==lbImg)lb.classList.remove('open')});
document.addEventListener('click',e=>{const s=e.target.closest('[data-zoom]');if(!s)return;
  const im=$('img',s);lbImg.src=s.dataset.zoom||im.src;lbImg.alt=im.alt;lbCap.textContent=s.dataset.cap||im.alt;lb.classList.add('open')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')});

/* ---------- scroll rail: ice-blue line with a tiny UGV riding it ---------- */
const rail=document.createElement('div');rail.className='rail';rail.setAttribute('aria-hidden','true');
rail.innerHTML=`<div class="f"></div><svg class="r" viewBox="0 0 24 13" fill="none"><rect x="3" y="2" width="18" height="6" rx="1.5" fill="#14171b" stroke="#a8c7ff" stroke-width="1.2"/><circle cx="7" cy="10" r="2.4" fill="#050607" stroke="#eef1f3" stroke-width="1.2"/><circle cx="17" cy="10" r="2.4" fill="#050607" stroke="#eef1f3" stroke-width="1.2"/></svg>`;
document.body.appendChild(rail);
const fill=$('.f',rail),rov=$('.r',rail);let tick=false;
const upd=()=>{tick=false;const h=document.documentElement.scrollHeight-innerHeight,p=h>0?Math.min(1,scrollY/h):0;fill.style.width=(p*100)+'%';rov.style.left=(p*100)+'%'};
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();
})();
