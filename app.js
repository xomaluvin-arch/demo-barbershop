const S=[
{id:1,n:'Мужская стрижка',d:'Машинка и ножницы, мытьё головы, укладка',p:900,m:45,e:'✂️',hit:1},
{id:2,n:'Стрижка + борода',d:'Полный образ: стрижка и оформление бороды',p:1400,m:75,e:'💈',hit:1},
{id:3,n:'Оформление бороды',d:'Моделирование, чёткий контур, масло для бороды',p:600,m:30,e:'🧔'},
{id:4,n:'Королевское бритьё',d:'Опасная бритва, горячее полотенце, уход после',p:800,m:40,e:'🪒',hit:1},
{id:5,n:'Детская стрижка',d:'Для мальчиков до 12 лет',p:600,m:30,e:'👦'},
{id:6,n:'Камуфляж седины',d:'Мягкое тонирование волос или бороды',p:500,m:20,e:'🎨'},
{id:7,n:'Укладка',d:'Стайлинг с текстурирующим средством',p:400,m:15,e:'💨'},
{id:8,n:'Отец и сын',d:'Две стрижки подряд у одного мастера',p:1300,m:75,e:'👨‍👦'}];
const M=['Артём','Кирилл','Денис'];
const $=(s,r=document)=>r.querySelector(s);
const fmt=n=>n.toLocaleString('ru-RU')+' ₽';
const find=id=>S.find(s=>s.id==id);
let sel=[];try{sel=JSON.parse(localStorage.getItem('lez-sel'))||[]}catch(e){}
let master=null,date='',time=null,flip=0;
const views=[...document.querySelectorAll('main[data-view]')],single=views.length>1;
let page=views[0].dataset.view;
const hf=n=>single?'#'+n:n+'.html';
const pages=[['index','Главная'],['services','Услуги'],['booking','Запись'],['contacts','Контакты']];
function refresh(){const b=$('#cnt');b.textContent=sel.length;b.hidden=!sel.length;
document.querySelectorAll('[data-add].btn').forEach(x=>{const on=sel.includes(+x.dataset.add);x.textContent=on?'Выбрано ✓':'Выбрать';x.classList.toggle('ghost',on)})}
function save(){try{localStorage.setItem('lez-sel',JSON.stringify(sel))}catch(e){}refresh()}
let tt;function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('show'),1900)}
document.body.insertAdjacentHTML('afterbegin',
`<header class="top glass"><a class="logo" href="${hf('index')}">Лезвие</a><nav aria-label="Основная навигация">${pages.map(([h,t])=>`<a href="${hf(h)}" data-p="${h}">${t}${h=='booking'?'<span id="cnt" hidden>0</span>':''}</a>`).join('')}</nav></header>`);
document.body.insertAdjacentHTML('beforeend','<footer>© Лезвие — демо-сайт барбершопа. Все данные вымышленные.</footer><div class="toast glass" id="toast" role="status"></div>');
document.querySelectorAll('[data-go]').forEach(a=>a.href=hf(a.dataset.go));
const card=s=>`<article class="card glass tilt"><span class="em">${s.e}</span><h3>${s.n}</h3><p>${s.d}</p><small>${s.m} мин</small><div class="row"><b>${fmt(s.p)}</b><button class="btn sm" data-add="${s.id}">Выбрать</button></div></article>`;
if($('#hits'))$('#hits').innerHTML=S.filter(s=>s.hit).map(card).join('');
if($('#svc'))$('#svc').innerHTML=S.map(card).join('');
const rv=$('#revs');
if(rv){
const R=[{n:'Игорь',s:5,t:'Стрижка ровно такая, как просил по фото. Артём всё объяснил про укладку.'},{n:'Сергей',s:5,t:'Королевское бритьё — отдельное удовольствие. Горячее полотенце, никакого раздражения.'},{n:'Андрей',s:4,t:'Запись по времени, без ожидания. Парковка рядом была бы плюсом.'},{n:'Михаил',s:5,t:'Ходим с сыном по пакету «Отец и сын». Ребёнок доволен, я тоже.'}];
let mine=[];try{mine=JSON.parse(localStorage.getItem('lez-rev'))||[]}catch(e){}
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const drawR=()=>{rv.innerHTML=[...mine,...R].map(r=>`<article class="card glass tilt"><div class="stars" aria-label="Оценка ${r.s} из 5">${'★'.repeat(r.s)}${'☆'.repeat(5-r.s)}</div><p>${esc(r.t)}</p><b>${esc(r.n)}</b></article>`).join('')};
drawR();
$('#rf').onsubmit=e=>{e.preventDefault();const f=e.target.elements;mine.unshift({n:f.n.value.trim(),s:+f.s.value,t:f.t.value.trim()});mine=mine.slice(0,6);try{localStorage.setItem('lez-rev',JSON.stringify(mine))}catch(er){}e.target.reset();drawR();toast('Спасибо за отзыв!')}}
function drawSlots(){const el=$('#slots');if(!el)return;
if(!master||!date){el.innerHTML='<p>Выберите мастера и дату — покажем свободное время.</p>';return}
el.innerHTML=[10,11,12,13,14,15,16,17,18,19].map(h=>{const t=h+':00';let k=0;for(const c of date+master+h)k=(k*31+c.charCodeAt(0))%97;
return `<button class="slot${time==t?' on':''}" data-t="${t}"${k%4==0?' disabled':''}>${t}</button>`}).join('')}
function drawBook(){
if(!$('#sl'))return;
const L=sel.map(find);
$('#sl').innerHTML=L.length?L.map(s=>`<div class="line"><span class="em">${s.e}</span><div><b>${s.n}</b><br><small>${s.m} мин</small></div><b>${fmt(s.p)}</b><button class="x" data-add="${s.id}" aria-label="Убрать">×</button></div>`).join(''):`<p>Пока ничего не выбрано. <a href="${hf('services')}"><u>Выбрать услуги</u></a></p>`;
$('#calc').innerHTML=`<div><span>Услуг</span><span>${L.length}</span></div><div><span>Время</span><span>${L.reduce((a,s)=>a+s.m,0)} мин</span></div><div class="tot"><span>Итого</span><span>${fmt(L.reduce((a,s)=>a+s.p,0))}</span></div>`;
drawSlots()}
if($('#ms')){
$('#ms').innerHTML=M.map(n=>`<button class="chip" data-m="${n}">${n}</button>`).join('');
$('#dt').min=new Date().toISOString().slice(0,10);
$('#dt').onchange=e=>{date=e.target.value;time=null;drawSlots()};
$('#bf').onsubmit=e=>{e.preventDefault();
if(!sel.length)return toast('Выберите хотя бы одну услугу');
if(!master)return toast('Выберите мастера');
if(!date)return toast('Выберите дату');
if(!time)return toast('Выберите время');
const d=new Date(date+'T00:00').toLocaleDateString('ru-RU',{day:'numeric',month:'long'});
$('#bk').hidden=true;$('#done').hidden=false;
$('#dtxt').textContent=`${master}, ${d}, ${time}. Ждём вас в «Лезвие». (Это демо — запись никуда не отправляется.)`;
sel=[];time=null;e.target.reset();save()}}
if($('#msg'))$('#msg').onsubmit=e=>{e.preventDefault();e.target.reset();toast('Сообщение отправлено (демо)')};
document.addEventListener('click',e=>{
const a=e.target.closest('[data-add]'),m=e.target.closest('[data-m]'),t=e.target.closest('[data-t]'),f=e.target.closest('.flip');
if(a){const id=+a.dataset.add,i=sel.indexOf(id);i<0?sel.push(id):sel.splice(i,1);save();drawBook();if(i<0)toast('Добавлено: '+find(id).n)}
if(m){master=m.dataset.m;time=null;document.querySelectorAll('#ms .chip').forEach(c=>c.classList.toggle('on',c.dataset.m==master));drawSlots()}
if(t){time=t.dataset.t;drawSlots()}
if(f)f.classList.toggle('on');
if(e.target.closest('.scene'))flip+=180});
let last;
document.addEventListener('pointermove',e=>{
const t=e.target.closest&&e.target.closest('.tilt');
if(last&&last!==t)last.style.transform='';
if(t){const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(800px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(6px)`}
last=t;
document.documentElement.style.setProperty('--lx',((e.clientX/innerWidth-.5)*40).toFixed(1))
});
const coin=$('.coin');
if(coin){
const RZ='<rect x="-70" y="-6" width="58" height="12" rx="6" fill="#8c1d2f"/><path d="M-12 -7H58L72 7H-12Z" fill="#e8e1d2"/><path d="M-12 -7H58L61 -4H-12Z" fill="#fff" opacity=".6"/><circle cx="-12" r="4" fill="#d4a853"/>';
const BASE=`<svg viewBox="0 0 300 300"><defs><path id="rg" d="M150 150m-108 0a108 108 0 1 1 216 0a108 108 0 1 1-216 0"/><radialGradient id="fg" cx=".4" cy=".3"><stop offset="0" stop-color="#2c2c3a"/><stop offset="1" stop-color="#0e0e14"/></radialGradient></defs><circle cx="150" cy="150" r="146" fill="url(#fg)" stroke="#d4a853" stroke-width="5"/><circle cx="150" cy="150" r="128" fill="none" stroke="#d4a853" stroke-width="1.5" opacity=".7"/><circle cx="150" cy="150" r="86" fill="none" stroke="#d4a853" stroke-width="1.5" opacity=".7"/><text font-family="Oswald,sans-serif" font-size="20" font-weight="600" letter-spacing="4" fill="#e6c27a"><textPath href="#rg" startOffset="1%">ЛЕЗВИЕ · БАРБЕРШОП · СМОЛЕНСК · </textPath></text><text x="150" y="212" text-anchor="middle" font-family="Oswald,sans-serif" font-size="15" letter-spacing="6" fill="#d4a853">С 2016</text></svg>`;
const RAZ=`<svg viewBox="0 0 300 300"><g transform="translate(150 140) scale(.92)"><g transform="rotate(-36)">${RZ}</g><g transform="rotate(36) scale(-1 1)">${RZ}</g></g></svg>`;
const MUS=`<svg viewBox="0 0 300 300"><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4d995"/><stop offset="1" stop-color="#b8862f"/></linearGradient><filter id="ds"><feDropShadow dx="0" dy="5" stdDeviation="3" flood-opacity=".7"/></filter></defs><g transform="translate(150 134) scale(.78)" filter="url(#ds)"><path d="M0 -6C-14 -22-40 -22-62 -8C-78 2-92 -6-96 -22C-86 -4-80 14-56 14C-34 14-16 6 0 14C16 6 34 14 56 14C80 14 86 -4 96 -22C92 -6 78 2 62 -8C40 -22 14 -22 0 -6Z" fill="url(#mg)" stroke="#3a2a0a" stroke-width="2.5" stroke-linejoin="round"/></g></svg>`;
const BACK=`<svg viewBox="0 0 300 300"><defs><path id="rg2" d="M150 150m-108 0a108 108 0 1 1 216 0a108 108 0 1 1-216 0"/></defs><circle cx="150" cy="150" r="146" fill="#12121a" stroke="#d4a853" stroke-width="5"/><circle cx="150" cy="150" r="128" fill="none" stroke="#d4a853" stroke-width="1.5" opacity=".7"/><text font-family="Oswald,sans-serif" font-size="20" font-weight="600" letter-spacing="4" fill="#e6c27a"><textPath href="#rg2" startOffset="1%">ТОЧНОСТЬ · СТИЛЬ · ХАРАКТЕР · ТОЧНОСТЬ · </textPath></text><text x="150" y="196" text-anchor="middle" font-family="Oswald,sans-serif" font-size="120" font-weight="600" fill="#d4a853">Л</text></svg>`;
for(let z=-12;z<=12;z+=3)coin.insertAdjacentHTML('beforeend',`<i class="disc" style="transform:translateZ(${z}px)"></i>`);
[[BASE,13],[RAZ,26],[MUS,40]].forEach(([h,z])=>coin.insertAdjacentHTML('beforeend',`<div class="fc" style="transform:translateZ(${z}px)">${h}</div>`));
coin.insertAdjacentHTML('beforeend',`<div class="fc" style="transform:rotateY(180deg) translateZ(13px)">${BACK}</div>`);
let cur=0,mx=0,my=0,t=0;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
(function f(){t+=.016;cur+=(flip-cur)*.08;coin.style.transform=`rotateX(${-my*22}deg) rotateY(${cur+(calm?0:Math.sin(t*.9)*16)+mx*38}deg)`;requestAnimationFrame(f)})()}
function setNav(){document.querySelectorAll('nav a').forEach(a=>{const on=a.dataset.p==page;a.classList.toggle('on',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')})}
function route(){
if(single){const h=location.hash.slice(1);page=views.some(v=>v.dataset.view==h)?h:'index';views.forEach(v=>v.hidden=v.dataset.view!=page);scrollTo(0,0)}
setNav();
if(page=='booking'){$('#bk').hidden=false;$('#done').hidden=true;drawBook()}
refresh()}
if(single)addEventListener('hashchange',route);
route();
