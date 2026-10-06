// Hatim AI - frontend demo logic
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const store={get:(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};

// Theme
function initTheme(){const t=store.get('hatim-theme','light');document.documentElement.setAttribute('data-theme',t);syncThemeBtn()}
function toggleTheme(){const cur=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',cur);store.set('hatim-theme',cur);syncThemeBtn();toast(cur==='dark'?'تم تفعيل الوضع الداكن':'تم تفعيل الوضع الفاتح')}
function syncThemeBtn(){$$('[data-theme-btn]').forEach(b=>{b.textContent=document.documentElement.getAttribute('data-theme')==='dark'?'☀️':'🌙';b.setAttribute('aria-label','تبديل المظهر')})}

// Toast
function toast(msg){const box=$('#toasts')||(()=>{const d=document.createElement('div');d.id='toasts';document.body.appendChild(d);return d})();const el=document.createElement('div');el.className='toast';el.textContent=msg;box.appendChild(el);setTimeout(()=>{el.style.opacity='0';setTimeout(()=>el.remove(),300)},2600)}

// Modal
function openModal(id){$('#'+id)?.classList.add('open')}
function closeModal(id){$('#'+id)?.classList.remove('open')}
document.addEventListener('click',e=>{if(e.target.classList?.contains('modal-back'))e.target.classList.remove('open')});

// Mobile menu + active nav + reveal + faq
document.addEventListener('DOMContentLoaded',()=>{
  initTheme();
  $$('[data-theme-btn]').forEach(b=>b.addEventListener('click',toggleTheme));
  const menuBtn=$('#menuBtn'),nav=$('#mainNav');
  menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));
  const path=location.pathname.split('/').pop()||'index.html';
  $$('#mainNav a').forEach(a=>{if(a.getAttribute('href')===path||(path===''&&a.getAttribute('href')==='index.html'))a.classList.add('active')});
  const io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.12});
  $$('.reveal').forEach(el=>io.observe(el));
  $$('.faq-q').forEach(q=>q.addEventListener('click',()=>q.parentElement.classList.toggle('open')));
  $$('[data-pricing-demo]').forEach(b=>b.addEventListener('click',()=>openModal('payModal')));
  $$('[data-copy]').forEach(b=>b.addEventListener('click',()=>{const t=$(b.dataset.copy);if(!t)return;navigator.clipboard.writeText(t.innerText||t.value||'').then(()=>toast('تم نسخ النص بنجاح'))}));
  initToolsPage();initUsage();
});

function bumpUsage(tool){const u=store.get('hatim-usage',{texts:24,images:8,tools:12});u.tools++;if(tool==='text')u.texts++;if(tool==='image')u.images++;store.set('hatim-usage',u)}
function initUsage(){const u=store.get('hatim-usage',null);if(!u)store.set('hatim-usage',{texts:24,images:8,tools:12})}

// ---------- Mock helpers ----------
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function setLoading(box,msg='جاري التفكير...'){box.innerHTML=`<div class="loading"><span class="spinner"></span>${msg}</div>`}

// Text generator
async function genText(){const inp=$('#tInput'),box=$('#tResult');if(!inp||!box)return;
  if(!inp.value.trim()){box.innerHTML='<div class="loading">⚠️ أدخل طلبك للبدء</div>';return}
  const type=$('#tType')?.value||'منشور سوشيال ميديا',tone=$('#tTone')?.value||'احترافية',len=$('#tLen')?.value||'متوسط';
  setLoading(box,'جاري التفكير...');await wait(1100);
  const topic=inp.value.trim().slice(0,120);
  const lenTxt=len==='قصير'?'فقرة مركزة من 3 أسطر':len==='طويل'?'نص موسّع من 4 فقرات مع خاتمة ودعوة لاتخاذ إجراء':'نص من فقرتين مع عنوان ونقاط';
  box.innerHTML=`<h3 style="margin:0 0 8px">${type} — بنبرة ${tone}</h3><p>${tone}، عملي ومباشر حول: <b>${escapeHtml(topic)}</b>.</p><p>هذا ${lenTxt} يصلح للنشر فورًا، مع دعوة واضحة للجمهور للتفاعل. <span class="badge badge-demo">تجريبي</span></p><ul><li>افتتاحية قوية تجذب الانتباه خلال أول سطرين.</li><li>عرض الفائدة الأساسية بلغة بسيطة.</li><li>خاتمة بدعوة: جرّب الآن / تواصل معنا / احفظ المنشور.</li></ul><p style="color:var(--muted);font-size:.9rem">تم إنشاء النتيجة التجريبية — يمكنك نسخها أو إعادة التوليد.</p>`;
  bumpUsage('text');toast('تم إنشاء النتيجة التجريبية');saveRecent('مولد النصوص','tools/text.html')}
function clearBox(id){const b=$('#'+id);if(b)b.innerHTML=''}

// Image generator (demo gradients, no external API)
const demoStyles={ 'واقعي':'linear-gradient(135deg,#0ea5e9,#6366f1)','سينمائي':'linear-gradient(135deg,#111827,#7c3aed)','Minimal':'linear-gradient(135deg,#e2e8f0,#a78bfa)','Illustration':'linear-gradient(135deg,#f59e0b,#ef4444)'};
async function genImage(){const inp=$('#iInput'),box=$('#iResult');if(!inp||!box)return;
  if(!inp.value.trim()){box.innerHTML='<div class="loading">⚠️ صف الصورة التي تريد إنشاءها...</div>';return}
  setLoading(box,'جاري إنشاء الصورة...');await wait(1300);
  const style=$('#iStyle')?.value||'سينمائي',ratio=$('#iRatio')?.value||'مربع 1:1';
  const bg=demoStyles[style]||demoStyles['سينمائي'];
  const desc=escapeHtml(inp.value.trim().slice(0,100));
  box.innerHTML=`<p style="margin-top:0;color:var(--muted)">الوصف: ${desc} — النمط: ${style} — المقاس: ${ratio}</p><div class="demo-imgs">${[1,2,3].map(i=>`<div class="demo-img" style="background:${bg};${ratio.includes('16:9')?'aspect-ratio:16/9':ratio.includes('9:16')?'aspect-ratio:9/16':'aspect-ratio:1/1'}">AI<small>تجريبي ${i}</small></div>`).join('')}</div><p style="color:var(--muted);font-size:.9rem">هذه نتيجة تجريبية للعرض <span class="badge badge-demo">تجريبي</span></p>`;
  bumpUsage('image');toast('تم إنشاء الصور التجريبية');saveRecent('مولد الصور','tools/image.html')}

// Improver
async function improve(mode){const a=$('#oInput'),b=$('#oResult');if(!a||!b)return;
  if(!a.value.trim()){b.innerHTML='أدخل النص الأصلي أولًا.';return}
  setLoading(b,'جاري تحسين النص...');await wait(900);
  let t=a.value.trim();
  const map={'تحسين':`✨ نسخة محسّنة وأكثر احترافية:\n\n${t}\n\n— تمت إعادة الصياغة بلغة أوضح مع الحفاظ على المعنى.`,'اختصار':`الخلاصة: ${t.split(/[.،!؟]/).filter(Boolean).slice(0,2).join('. ')}.`,'إعادة صياغة':`إعادة صياغة: ${t.split(' ').reverse().slice(0,30).join(' ')}... (صياغة بديلة بنفس المعنى)`,'تصحيح الأخطاء':`النص بعد التصحيح اللغوي:\n\n${t}\n\n— تم تدقيق الهمزات وعلامات الترقيم (محاكاة تجريبية).`,'احترافية':`بأسلوب احترافي رسمي:\n\nيسرّنا أن نقدّم: ${t}\n\nمع هيكلة واضحة ولغة أعمال مناسبة.`};
  b.innerText=(map[mode]||map['تحسين']);bumpUsage('text');toast('تم إنشاء النتيجة التجريبية')}

// Summarizer
async function summarize(){const a=$('#sInput'),b=$('#sResult');if(!a||!b)return;
  if(!a.value.trim()){b.innerHTML='أدخل نصًا طويلًا لتلخيصه.';return}
  const kind=$('#sType')?.value||'ملخص متوسط';setLoading(b,'جاري التلخيص...');await wait(900);
  const sents=a.value.split(/[.؟!؟\n]/).map(s=>s.trim()).filter(s=>s.length>8);
  let out='';
  if(kind==='نقاط رئيسية')out='<ul>'+sents.slice(0,5).map(s=>`<li>${escapeHtml(s)}</li>`).join('')+'</ul>';
  else if(kind==='ملخص قصير')out=`<p>${escapeHtml(sents.slice(0,2).join('. '))}.</p>`;
  else out=`<p>${escapeHtml(sents.slice(0,4).join('. '))}.</p>`;
  b.innerHTML=out+`<p style="color:var(--muted);font-size:.9rem">ملخص تجريبي <span class="badge badge-demo">تجريبي</span></p>`;bumpUsage('text');toast('تم إنشاء الملخص')}

// Ideas
async function genIdeas(){const a=$('#dInput'),b=$('#dResult');if(!a||!b)return;
  if(!a.value.trim()){b.innerHTML='اكتب الموضوع أولًا.';return}
  const n=parseInt($('#dCount')?.value||'5',10);setLoading(b,'جاري توليد الأفكار...');await wait(900);
  const t=a.value.trim().slice(0,80);
  const tpl=['إطلاق نسخة مصغّرة للتجربة أولًا ثم التوسّع','محتوى أسبوعي يشرح الفكرة بقصص قصيرة','شراكة مع مشروع محلي مكمّل','عرض تجريبي مجاني لأول 20 عميلًا','سلسلة فيديوهات قصيرة للإجابة عن الأسئلة الشائعة','مسابقة تفاعلية باسم المشروع','باقة أسعار مبسطة بثلاث مستويات','نشرة بريدية أسبوعية بقيمة عملية','تجربة ميدانية وجمع آراء حقيقية','هوية بصرية بسيطة وموحدة','صفحة هبوط بعنوان واضح ودعوة واحدة','تحويل آراء العملاء إلى محتوى تسويقي','تعاون مع صانع محتوى واحد مؤثر','ورشة مجانية للتعريف بالخدمة','دليل PDF مجاني كهدية للمهتمين'];
  b.innerHTML=tpl.slice(0,n).map((x,i)=>`<div class="card idea"><span class="idea-num">${i+1}</span><div><b>فكرة حول: ${escapeHtml(t)}</b><p style="margin:4px 0 0;color:var(--muted)">${x}.</p></div></div>`).join('')+`<p style="color:var(--muted)">نتائج تجريبية <span class="badge badge-demo">تجريبي</span></p>`;
  bumpUsage('text');toast('تم توليد الأفكار')}

// Prompt builder
function genPrompt(){const goal=$('#pGoal')?.value.trim(),aud=$('#pAud')?.value||'صانع محتوى',tone=$('#pTone')?.value||'احترافية',lang=$('#pLang')?.value||'العربية',box=$('#pResult');if(!box)return;
  if(!goal){box.value='اكتب أولًا: ما الذي تريد القيام به؟';return}
  box.value=`أنت مساعد ذكاء اصطناعي ${tone==='إبداعية'?'مبدع':tone==='مختصرة'?'مختصر ومباشر':'احترافي'}.\nالجمهور: ${aud}.\nاللغة: ${lang}.\nالمهمة: ${goal}.\n\nالمطلوب:\n1. قدّم إجابة منظمة بعناوين ونقاط.\n2. اجعل الأسلوب مناسبًا لـ ${aud}.\n3. اختم بخطوة مقترحة واحدة.\n4. تجنّب الحشو والتكرار.`;toast('تم إنشاء الـ Prompt');bumpUsage('text')}

// Tools page filter
function initToolsPage(){const search=$('#toolSearch');if(!search)return;
  const apply=()=>{const q=search.value.trim(),f=$('.chip.active')?.dataset.filter||'all';
    $$('.tool-card').forEach(c=>{const okQ=!q||(c.dataset.name+c.dataset.desc).includes(q);const okF=f==='all'||c.dataset.cat===f;c.style.display=okQ&&okF?'':'none'});
    const any=$$('.tool-card').some(c=>c.style.display!=='none');$('#emptyTools').style.display=any?'none':''};
  search.addEventListener('input',apply);
  $$('.chip').forEach(ch=>ch.addEventListener('click',()=>{$$('.chip').forEach(x=>x.classList.remove('active'));ch.classList.add('active');apply()}))}

// Favorites + recents
function toggleFav(name,link){let f=store.get('hatim-fav',[]);f=f.some(x=>x.name===name)?f.filter(x=>x.name!==name):[...f,{name,link}];store.set('hatim-fav',f);toast('تم تحديث المفضلة');renderFav()}
function renderFav(){const box=$('#favBox');if(!box)return;const f=store.get('hatim-fav',[]);box.innerHTML=f.length?f.map(x=>`<a class="card" href="${x.link}"><b>${x.name}</b><span style="color:var(--muted)">فتح الأداة ←</span></a>`).join(''):'<div class="card"><p>لا توجد عناصر مفضلة بعد. جرّب أداة وأضفها من صفحة الأدوات.</p></div>'}
function saveRecent(name,link){let r=store.get('hatim-recent',[]);r=[{name,link},...r.filter(x=>x.name!==name)].slice(0,4);store.set('hatim-recent',r)}
function renderDash(){const u=store.get('hatim-usage',{texts:24,images:8,tools:12});if($('#stTools')){$('#stTools').textContent=u.tools;$('#stTexts').textContent=u.texts;$('#stImgs').textContent=u.images}
  const r=store.get('hatim-recent',[{name:'مولد النصوص',link:'tools/text.html'},{name:'مولد الصور',link:'tools/image.html'}]);const rb=$('#recentBox');if(rb)rb.innerHTML=r.map(x=>`<a class="card" href="${x.link}"><b>${x.name}</b><span style="color:var(--muted)">متابعة ←</span></a>`).join('');
  renderFav()}

function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

// Settings toggles
function bindSwitch(id,key,def,cb){const el=$('#'+id);if(!el)return;el.setAttribute('aria-checked',store.get(key,def)?'true':'false');el.addEventListener('click',()=>{const v=el.getAttribute('aria-checked')!=='true';el.setAttribute('aria-checked',v);store.set(key,v);cb?.(v);toast('تم حفظ الإعداد')})}
