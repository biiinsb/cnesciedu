// Add or replace photos here: src, title, date, and credit.
const photos=[
{src:'assets/group.jpg',title:'함께 떠난 교육박람회',date:'2026.01.22',credit:'송민규'},
{src:'assets/seminar.jpg',title:'새로운 수업을 만나는 시간',date:'2026.01.22',credit:'송민규'},
{src:'assets/new-year.jpg',title:'새 학년을 함께 준비하며',date:'2026.02.26',credit:'송민규'},
{src:'assets/resources.jpg',title:'함께 나누는 과학의 날 자료',date:'2026.04.21',credit:'송민규'},
{src:'assets/meeting.jpg',title:'서로의 경험을 나누는 자리',date:'2026.05.28',credit:'송민규'},
{src:'assets/museum.jpg',title:'아이들과 함께한 과학관',date:'2026.08.08',credit:'송민규'},
{src:'assets/ai.jpg',title:'AI로 만드는 우리 수업',date:'2026.09.03',credit:'송민규'},
{src:'assets/festival.jpg',title:'송악마을예술제 과학체험 부스',date:'2026.10.24',credit:'김윤솔',extraPhotos:[{src:'assets/festival-team.jpg',title:'송악마을예술제 · 함께 운영한 선생님들'}]}
];
const gallery=document.querySelector('#photos'),dialog=document.querySelector('#lightbox');
const available=photos.filter(p=>p.src).flatMap(p=>[p,...(p.extraPhotos||[]).map(extra=>({...p,...extra,extraPhotos:undefined}))]);let current=0;
photos.forEach(p=>{const card=document.createElement(p.src?'button':'div');card.className='photo-card'+(p.src?' available':'');if(p.src){card.type='button';card.setAttribute('aria-label',p.title+' 사진 크게 보기');}
const frame=document.createElement('div');frame.className='frame';
if(p.src){const img=document.createElement('img');img.src=p.src;img.alt=p.title;img.loading='lazy';frame.append(img);if(p.extraPhotos?.length){const badge=document.createElement("span");badge.className="album-count";badge.textContent="사진 "+(p.extraPhotos.length+1)+"장";frame.append(badge);}card.onclick=()=>{current=available.indexOf(p);show();dialog.showModal();document.body.style.overflow='hidden';};}else{frame.innerHTML='<div class="placeholder"><i>＋</i><span>사진 준비 중</span></div>';}
const date=document.createElement('span');date.className='card-date';date.textContent=p.date;const title=document.createElement('span');title.className='card-title';title.textContent=p.title;card.append(frame,date,title);gallery.append(card);});
function show(){const p=available[current],img=document.querySelector('#large-photo');img.src=p.src;img.alt=p.title;document.querySelector('#photo-caption').textContent=p.date+' · '+p.title+' / 사진: '+p.credit;document.querySelector('#photo-count').textContent=(current+1)+' / '+available.length;}
function move(n){current=(current+n+available.length)%available.length;show();}
document.querySelector('.close').onclick=()=>dialog.close();document.querySelector('.previous').onclick=()=>move(-1);document.querySelector('.next').onclick=()=>move(1);dialog.addEventListener('close',()=>document.body.style.overflow='');dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1);});let startX=0;dialog.addEventListener('touchstart',e=>startX=e.changedTouches[0].screenX,{passive:true});dialog.addEventListener('touchend',e=>{const delta=e.changedTouches[0].screenX-startX;if(Math.abs(delta)>55)move(delta<0?1:-1);},{passive:true});
