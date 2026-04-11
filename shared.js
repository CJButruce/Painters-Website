'use strict';
// PRECISION PAINTING CO. — Shared JS

/* Header scroll */
(function(){
  const h=document.querySelector('.site-header');
  if(!h)return;
  const check=()=>h.classList.toggle('scrolled',scrollY>30);
  window.addEventListener('scroll',check,{passive:true});
  check();
})();

/* Mobile menu */
(function(){
  const btn=document.getElementById('hamburger');
  const menu=document.getElementById('mobileMenu');
  if(!btn||!menu)return;
  const bars=btn.querySelectorAll('span');
  const open=()=>{
    menu.classList.add('open'); document.body.style.overflow='hidden';
    bars[0].style.transform='translateY(6.5px) rotate(45deg)';
    bars[1].style.opacity='0';
    bars[2].style.transform='translateY(-6.5px) rotate(-45deg)';
  };
  const close=()=>{
    menu.classList.remove('open'); document.body.style.overflow='';
    bars[0].style.transform=''; bars[1].style.opacity=''; bars[2].style.transform='';
  };
  btn.addEventListener('click',()=>menu.classList.contains('open')?close():open());
  menu.querySelector('.mobile-menu__overlay')?.addEventListener('click',close);
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();

/* Scroll reveal */
(function(){
  const els=document.querySelectorAll('.reveal');
  if(!els.length)return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const idx=Array.from(els).indexOf(e.target);
        e.target.style.transitionDelay=`${(idx%5)*65}ms`;
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  },{threshold:.07,rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>obs.observe(el));
})();

/* FAQ accordion */
(function(){
  document.querySelectorAll('.faq-trigger').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.faq-item');
      const open=item.classList.contains('open');
      item.closest('.faq-list')?.querySelectorAll('.faq-item.open').forEach(i=>{
        i.classList.remove('open');
        i.querySelector('.faq-trigger')?.setAttribute('aria-expanded','false');
      });
      if(!open){item.classList.add('open');btn.setAttribute('aria-expanded','true');}
    });
  });
})();

/* Active nav */
(function(){
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.site-nav a,.mobile-menu__panel a').forEach(a=>{
    const href=(a.getAttribute('href')||'').split('/').pop();
    if(href===path)a.classList.add('active');
  });
})();

/* Before/after slider */
(function(){
  document.querySelectorAll('.before-after').forEach(wrap=>{
    const before=wrap.querySelector('.ba-before');
    const divider=wrap.querySelector('.ba-divider');
    if(!before||!divider)return;
    let dragging=false;
    const setPos=x=>{
      const rect=wrap.getBoundingClientRect();
      const pct=Math.max(5,Math.min(95,((x-rect.left)/rect.width)*100));
      before.style.width=pct+'%';
      divider.style.left=pct+'%';
    };
    divider.addEventListener('mousedown',()=>{dragging=true;});
    document.addEventListener('mousemove',e=>{if(dragging)setPos(e.clientX);});
    document.addEventListener('mouseup',()=>{dragging=false;});
    divider.addEventListener('touchstart',()=>{dragging=true;},{passive:true});
    document.addEventListener('touchmove',e=>{if(dragging)setPos(e.touches[0].clientX);},{passive:true});
    document.addEventListener('touchend',()=>{dragging=false;});
  });
})();

/* Simple form submit handler */
document.querySelectorAll('form[data-submit]').forEach(form=>{
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const btn=this.querySelector('[type=submit]');
    if(btn){btn.textContent='✓ Submitted!';btn.disabled=true;btn.style.background='#2e7d52';}
  });
});
