const $=s=>document.querySelector(s);
$('#y').textContent=new Date().getFullYear();

const burger=$('#burger'),menu=$('#menu');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)});

// logo / brand links: scroll to the very top
document.querySelectorAll('a[href="#top"]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();menu.classList.remove('open');burger.setAttribute('aria-expanded',false);
  window.scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'',location.pathname);
}));

// scroll reveal
document.querySelectorAll('.card,.steps li,.pills,.code,.form').forEach(e=>e.classList.add('rv'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));

// counters
document.querySelectorAll('[data-n]').forEach(el=>{
  const t=+el.dataset.n,s=performance.now();
  const f=n=>{const p=Math.min((n-s)/1400,1);el.textContent=Math.round(t*p);if(p<1)requestAnimationFrame(f)};
  requestAnimationFrame(f);
});

// network background
const c=$('#net'),x=c.getContext('2d');let W,H,pts=[];
const rs=()=>{W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;pts=Array.from({length:Math.min(60,W/18|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}))};
rs();addEventListener('resize',rs);
(function draw(){
  x.clearRect(0,0,W,H);
  pts.forEach((p,i)=>{
    p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
    x.fillStyle='rgba(214,58,82,.8)';x.beginPath();x.arc(p.x,p.y,1.6,0,7);x.fill();
    for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);
      if(d<130){x.strokeStyle=`rgba(214,58,82,${.18*(1-d/130)})`;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}
  });
  requestAnimationFrame(draw);
})();

// 3D phone scene: tilt with pointer
(()=>{const box=document.getElementById('showcase'),sc=document.getElementById('scene');if(!box||!sc||matchMedia('(pointer:coarse)').matches)return;
 box.addEventListener('pointermove',e=>{const r=box.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  sc.style.setProperty('--ry',(-22+x*34)+'deg');sc.style.setProperty('--rx',(10-y*22)+'deg')});
 box.addEventListener('pointerleave',()=>{sc.style.setProperty('--ry','-22deg');sc.style.setProperty('--rx','10deg')});})();
