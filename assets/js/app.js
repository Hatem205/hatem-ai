// Hatim AI - frontend demo logic (visual v2)
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const store={get:(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const SVG_MOON='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
const SVG_SUN='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"/></svg>';

// ---------- AR/EN language toggle (frontend demo, no backend) ----------
const I18N={
'الرئيسية':'Home','الأدوات':'Tools','الخدمات':'Services','الأسعار':'Pricing','عن المنصة':'About','دخول':'Sign in','ابدأ الآن':'Start now',
'جرّب الأدوات الآن':'Try the tools now','استكشف المنصة':'Explore the platform','استكشف الخدمات':'Explore services',
'نسخة تجريبية للعرض والتدريب':'Demo version for showcase and training',
'كل أدوات':'All','الذكاء الاصطناعي':'AI','التي تحتاجها، في مكان واحد':'tools you need, in one place',
'حوّل أفكارك إلى نصوص وصور ومحتوى جديد بأدوات ذكية وسهلة.':'Turn your ideas into texts, images and new content with smart, easy tools.',
'بدون تسجيل':'No sign-up','يعمل على الجوال':'Mobile friendly','نتائج فورية تجريبية':'Instant demo results',
'المفضلة':'Favorites','الاستخدام':'Usage','اكتب منشورًا تسويقيًا لمطعم برجر في جدة...':'Write a marketing post for a burger restaurant in Jeddah...',
'تم الإنشاء':'Created','نص جديد جاهز':'New text ready','جاهز للنسخ':'ready to copy','صورة جديدة':'New image','3 أفكار جديدة':'3 new ideas',
'أدواتك في مكان واحد':'All your tools in one place','اختر الأداة وابدأ التجربة فورًا — بدون تسجيل.':'Pick a tool and start instantly — no sign-up.',
'مولد الصور':'Image generator','صور تسويقية وإبداعية من وصف نصي.':'Marketing and creative images from a text description.',
'جرّب الأداة':'Try the tool','تجريبي':'Demo','مولد النصوص':'Text generator','منشورات وإعلانات ووصف منتجات.':'Posts, ads and product descriptions.',
'تلخيص المحتوى':'Content summarizer','نصوص طويلة تتحول لنقاط واضحة.':'Long texts turned into clear points.',
'مساعد الأفكار':'Idea assistant','أفكار مشاريع ومحتوى وحملات.':'Project, content and campaign ideas.',
'مولد البرومبتات':'Prompt generator','احترافي جاهز للنسخ.':'professional, ready to copy.','تحسين النصوص':'Text improver','تصحيح وصياغة بأسلوب احترافي.':'Proofreading and rephrasing, professionally.',
'عرض كل الأدوات':'View all tools','المعرض':'Gallery','شاهد ما يمكنك إنشاؤه':'See what you can create',
'أمثلة تجريبية لمخرجات صور المنصة.':'Demo examples of the platform image outputs.',
'جرّب الآن':'Try now','إنشاء صورة':'Generate image','أنشئ صورتك التجريبية':'Create your demo image',
'تجربة فورية':'Instant try','جرّب حاتم AI الآن':'Try Hatim AI now','اختر أداة وشاهد نتيجة تجريبية مباشرة.':'Pick a tool and see an instant demo result.',
'كتابة':'Writing','صور':'Images','أفكار':'Ideas','تلخيص':'Summarize','النتيجة التجريبية':'Demo result',
'كيف يعمل':'How it works','من الفكرة إلى النتيجة':'From idea to result','أربع خطوات مرئية — بدون تعقيد.':'Four visual steps — no complexity.',
'اختر الأداة':'Choose the tool','6 أدوات في لوحة واحدة':'6 tools in one dashboard','اكتب طلبك':'Write your request',
'فكرة أو نص أو وصف':'An idea, text or description','المعالجة':'Processing','النتيجة':'Result',
'لماذا حاتم AI':'Why Hatim AI','مصمم ليكون بسيطًا وسريعًا':'Designed to be simple and fast','بسيط':'Simple',
'واجهة سهلة حتى لغير المتخصصين.':'Easy interface even for non-experts.','سريع':'Fast','كل الأدوات في مكان واحد.':'All tools in one place.',
'متعدد الاستخدامات':'Versatile','للدراسة والعمل وصناعة المحتوى.':'For study, work and content creation.','تجربة ذكية':'Smart experience','تجعل الذكاء الاصطناعي أسهل.':'Makes AI easier.',
'خطط بسيطة للجميع':'Simple plans for everyone','للتجربة فقط — الدفع غير مفعّل.':'Demo only — payments are disabled.',
'مجاني':'Free','ريال / شهريًا':'SAR /mo','ريال':'SAR','استخدام محدود':'Limited usage','أدوات أساسية':'Core tools','تجربة المنصة':'Platform trial',
'ابدأ مجانًا':'Start free','الأكثر شعبية':'Most popular','أدوات أكثر':'More tools','استخدام أكبر':'Higher usage','ميزات متقدمة':'Advanced features',
'جميع الأدوات':'All tools','أولوية في الاستخدام':'Priority usage','مناسب للفرق الصغيرة':'For small teams','اختر الخطة':'Choose plan',
'الأسئلة الشائعة':'FAQ','عندك سؤال؟':'Have a question?','هل حاتم AI خدمة حقيقية؟':'Is Hatim AI a real service?',
'هذا الإصدار تجريبي ومخصص للعرض والتدريب فقط.':'This version is a demo for showcase and training only.',
'هل النتائج حقيقية؟':'Are the results real?','الأدوات تستخدم نتائج تجريبية Mock Data لأغراض العرض.':'Tools use mock demo data for showcase.',
'هل يعمل على الهاتف؟':'Does it work on mobile?','نعم، الموقع متجاوب بالكامل مع الجوال والتابلت.':'Yes, fully responsive on mobile and tablet.',
'كل الأسئلة':'All questions','فكرتك القادمة تبدأ هنا':'Your next idea starts here',
'اختر أداة وابدأ تجربتك الآن — بدون تسجيل.':'Pick a tool and start now — no sign-up.','ابدأ تجربتك':'Start your trial',
'هذه نسخة تجريبية':'This is a demo version','نظام الدفع غير مفعّل في هذا المشروع.':'Payments are disabled in this project.','فهمت':'Got it',
'المنصة':'Platform','معلومات':'Info','قانوني':'Legal','تواصل معنا':'Contact us','سياسة الخصوصية':'Privacy policy','الشروط والأحكام':'Terms and conditions',
'تسجيل الدخول':'Sign in','جميع الحقوق محفوظة.':'All rights reserved.','مشروع تجريبي لأغراض التدريب والعرض فقط.':'Demo project for training and showcase only.',
'أدوات الذكاء الاصطناعي':'AI tools','ابحث عن أداة...':'Search for a tool...','الكل':'All','تسويق':'Marketing','دراسة':'Study','إنتاجية':'Productivity',
'لا توجد نتائج مطابقة.':'No matching results.','خدمات حاتم AI':'Hatim AI services','الفائدة':'Benefit',
'مولد النصوص بالذكاء الاصطناعي':'AI text generator','اكتب ما تحتاجه وسننشئ لك نصًا مناسبًا.':'Write what you need and we will create a suitable text.',
'مثال: اكتب منشورًا تسويقيًا لمطعم برجر جديد في جدة...':'Example: write a marketing post for a new burger restaurant in Jeddah...',
'نوع المحتوى':'Content type','منشور سوشيال ميديا':'Social media post','إعلان':'Ad','مقال':'Article','وصف منتج':'Product description',
'بريد إلكتروني':'Email','فكرة محتوى':'Content idea','النبرة':'Tone','احترافية':'Professional','ودية':'Friendly','إبداعية':'Creative','مختصرة':'Concise',
'طول النص':'Text length','قصير':'Short','متوسط':'Medium','طويل':'Long','توليد النص':'Generate text','نسخ':'Copy','إعادة التوليد':'Regenerate','مسح':'Clear',
'مولد الصور بالذكاء الاصطناعي':'AI image generator','صف الصورة التي تريد إنشاءها...':'Describe the image you want to create...',
'نسبة الصورة':'Aspect ratio','مربع 1:1':'Square 1:1','أفقي 16:9':'Landscape 16:9','عمودي 9:16':'Portrait 9:16',
'الأسلوب':'Style','واقعي':'Realistic','سينمائي':'Cinematic','تحسين النص':'Improve text','النص الأصلي':'Original text','النص المحسّن':'Improved text',
'تحسين':'Improve','اختصار':'Shorten','إعادة صياغة':'Rephrase','تصحيح الأخطاء':'Fix errors',
'تلخيص النصوص':'Text summarizer','ملخص قصير':'Short summary','ملخص متوسط':'Medium summary','نقاط رئيسية':'Key points',
'ما الموضوع الذي تريد أفكارًا حوله؟':'What topic do you want ideas about?','توليد الأفكار':'Generate ideas',
'ما الذي تريد القيام به؟':'What do you want to do?','لمن؟':'For whom?','طالب':'Student','مسوق':'Marketer','صاحب مشروع':'Business owner',
'صانع محتوى':'Content creator','مبرمج':'Developer','اللغة':'Language','العربية':'Arabic','الإنجليزية':'English',
'إنشاء Prompt':'Create prompt','نسخ Prompt':'Copy prompt','مرحبًا بك في حاتم AI':'Welcome to Hatim AI','أنشئ الآن':'Create now',
'الأدوات المستخدمة':'Tools used','النصوص المنشأة':'Texts created','الصور التجريبية':'Demo images','الرصيد التجريبي':'Demo credit',
'استخدام الأسبوع':'Week usage','أدواتك الأخيرة':'Your recent tools','فتح':'Open','استُخدمت مؤخرًا':'Used recently',
'لا توجد عناصر مفضلة بعد.':'No favorites yet.','الإعدادات':'Settings','الحساب':'Account','الإشعارات':'Notifications','المظهر':'Appearance',
'مرحبًا بعودتك':'Welcome back','البريد الإلكتروني':'Email','كلمة المرور':'Password','إنشاء حساب':'Create account',
'الاسم':'Name','الرسالة':'Message','إرسال':'Send','تم استلام رسالتك (تجريبي)':'Message received (demo)',
'أدخل طلبك للبدء.':'Enter your request to start.','جاري إنشاء النتيجة':'Generating result','تم إنشاء النتيجة التجريبية':'Demo result created',
'تم نسخ النص بنجاح':'Text copied successfully','تم إنشاء الملخص':'Summary created','تم توليد الأفكار':'Ideas generated',
'تم إنشاء الصور التجريبية':'Demo images created','تم حفظ الإعداد':'Setting saved','تم تحديث المفضلة':'Favorites updated',
'تم تفعيل الوضع الداكن':'Dark mode on','تم تفعيل الوضع الفاتح':'Light mode on','عن حاتم AI':'About Hatim AI','القائمة':'Menu','تبديل المظهر':'Toggle theme',
'تغيير اللغة':'Change language','كل الأدوات':'All tools','العودة للرئيسية':'Back home','الصفحة غير موجودة':'Page not found',
'الصفحة المطلوبة غير موجودة أو نُقلت إلى مكان آخر.':'The requested page was not found or moved.'};
function initLang(){injectLangBtn();applyLang()}
function injectLangBtn(){$$('.header-actions').forEach(h=>{if(h.querySelector('[data-lang-btn]'))return;const b=document.createElement('button');b.className='icon-btn lang-btn';b.setAttribute('data-lang-btn','');b.setAttribute('aria-label','Language / اللغة');b.textContent=store.get('hatim-lang','ar')==='en'?'عربي':'EN';b.addEventListener('click',()=>{store.set('hatim-lang',store.get('hatim-lang','ar')==='en'?'ar':'en');location.reload()});h.insertBefore(b,h.firstChild)})}
function applyLang(){const en=store.get('hatim-lang','ar')==='en';document.documentElement.lang=en?'en':'ar';document.documentElement.dir=en?'ltr':'rtl';if(!en)return;document.title=repStr(document.title);
const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{if(!n.nodeValue.trim())return NodeFilter.FILTER_REJECT;const p=n.parentElement;if(p&&p.closest('script,style,.code-box'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}});
const ns=[];while(w.nextNode())ns.push(w.currentNode);ns.forEach(n=>{n.nodeValue=repStr(n.nodeValue)});
$$('[placeholder]').forEach(el=>el.setAttribute('placeholder',repStr(el.getAttribute('placeholder'))));
$$('option').forEach(o=>{o.textContent=repStr(o.textContent)})}
function repStr(s){if(!s)return s;let v=s;const ents=Object.entries(I18N).sort((a,b)=>b[0].length-a[0].length);for(const[ar,e]of ents){if(v.includes(ar))v=v.split(ar).join(e)}return v}
// Theme
function initTheme(){const t=store.get('hatim-theme','light');document.documentElement.setAttribute('data-theme',t);syncThemeBtn()}
function toggleTheme(){const cur=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',cur);store.set('hatim-theme',cur);syncThemeBtn();const sw=$('#swDark');if(sw)sw.setAttribute('aria-checked',cur==='dark');toast(cur==='dark'?'تم تفعيل الوضع الداكن':'تم تفعيل الوضع الفاتح')}
function syncThemeBtn(){$$('[data-theme-btn]').forEach(b=>{b.innerHTML=document.documentElement.getAttribute('data-theme')==='dark'?SVG_SUN:SVG_MOON;b.setAttribute('aria-label','تبديل المظهر')})}

// Toast
function toast(msg){const box=$('#toasts')||(()=>{const d=document.createElement('div');d.id='toasts';document.body.appendChild(d);return d})();const el=document.createElement('div');el.className='toast';el.textContent=msg;box.appendChild(el);setTimeout(()=>{el.style.opacity='0';setTimeout(()=>el.remove(),300)},2600)}

// Modal
function openModal(id){$('#'+id)?.classList.add('open')}
function closeModal(id){$('#'+id)?.classList.remove('open')}
document.addEventListener('click',e=>{if(e.target.classList?.contains('modal-back'))e.target.classList.remove('open');const t=e.target.closest?.('[data-copy]');if(t){const el=$(t.dataset.copy);if(el){navigator.clipboard.writeText(el.innerText||el.value||'').then(()=>toast('تم نسخ النص بنجاح'))}}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.modal-back.open').forEach(m=>m.classList.remove('open'))});

document.addEventListener('DOMContentLoaded',()=>{
  initTheme();
  initLang();
  $$('[data-theme-btn]').forEach(b=>b.addEventListener('click',toggleTheme));
  const menuBtn=$('#menuBtn'),nav=$('#mainNav');
  menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));
  const head=$('#siteHeader');const onScroll=()=>head?.classList.toggle('scrolled',scrollY>8);addEventListener('scroll',onScroll,{passive:true});onScroll();
  const path=location.pathname.split('/').pop()||'index.html';
  $$('#mainNav a').forEach(a=>{if(a.getAttribute('href')===path||(path===''&&a.getAttribute('href')==='index.html'))a.classList.add('active')});
  const io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&{ }&&x.target.classList.add('in')),{threshold:.1});
  $$('.reveal').forEach(el=>io.observe(el));
  $$('.faq-q').forEach(q=>q.addEventListener('click',()=>q.parentElement.classList.toggle('open')));
  $$('[data-pricing-demo]').forEach(b=>b.addEventListener('click',()=>openModal('payModal')));
  initToolsPage();initUsage();renderDash();initQuickDemo();
  bindSwitch('swNotif','hatim-notif',true);bindSwitch('swMail','hatim-mail',false);
  bindSwitch('swDark','hatim-darkmode',document.documentElement.getAttribute('data-theme')==='dark',v=>{document.documentElement.setAttribute('data-theme',v?'dark':'light');store.set('hatim-theme',v?'dark':'light');syncThemeBtn()});
});

function bumpUsage(tool){const u=store.get('hatim-usage',{texts:24,images:8,tools:12});u.tools++;if(tool==='text')u.texts++;if(tool==='image')u.images++;store.set('hatim-usage',u)}
function initUsage(){if(!store.get('hatim-usage',null))store.set('hatim-usage',{texts:24,images:8,tools:12})}

// ---------- Quick demo on homepage ----------
const QD={
  text:{t:'مولد النصوص',ph:'مثال: اكتب منشورًا تسويقيًا لمقهى مختص في الرياض...',btn:'توليد النص',fn:'qdText'},
  image:{t:'مولد الصور',ph:'مثال: صورة منتج عطر فاخر بإضاءة سينمائية...',btn:'إنشاء الصورة',fn:'qdImage'},
  ideas:{t:'مساعد الأفكار',ph:'مثال: أفكار لحملة إطلاق متجر عطور...',btn:'توليد الأفكار',fn:'qdIdeas'},
  sum:{t:'التلخيص',ph:'الصق فقرة طويلة هنا لتلخيصها...',btn:'تلخيص',fn:'qdSum'}
};
function initQuickDemo(){const box=$('#qdBox');if(!box)return;qdShow('text')}
function qdShow(k){$$('.demo-tabs .chip').forEach(c=>c.classList.toggle('active',c.dataset.qd===k));const d=QD[k];$('#qdBox').innerHTML=`<div class="demo-in"><label for="qdInput">${d.t}</label><textarea class="textarea" id="qdInput" placeholder="${d.ph}"></textarea><div class="toolbar"><button class="btn btn-primary" onclick="${d.fn}()">${d.btn}</button></div></div><div class="demo-out"><b>النتيجة التجريبية</b><div class="result" id="qdResult" style="margin-top:10px"></div></div>`}
async function qdRun(html){const box=$('#qdResult');box.innerHTML='<div class="loading"><span class="spinner"></span>جاري إنشاء النتيجة <span class="typing"><i></i><i></i><i></i></span></div>';await wait(1000);box.innerHTML=html+'<p style="margin:8px 0 0"><span class="badge badge-demo">تجريبي</span></p>';toast('تم إنشاء النتيجة التجريبية')}
function qdNeed(){const v=$('#qdInput')?.value.trim();if(!v){$('#qdResult').innerHTML='أدخل طلبك للبدء.';return null}return v.slice(0,110)}
function qdText(){const v=qdNeed();if(v===null)return;qdRun(`<b>منشور جاهز حول: ${escapeHtml(v)}</b><div class="tile-preview" style="margin-top:10px"><div class="pl"></div><div class="pl"></div><div class="pl short"></div></div><p style="color:var(--muted);font-size:.9rem">افتتاحية قوية + فائدة واضحة + دعوة للتفاعل.</p>`)}
function qdImage(){const v=qdNeed();if(v===null)return;qdRun(`<div class="demo-imgs" style="grid-template-columns:1fr 1fr"><div class="demo-img"><img loading="lazy" alt="نتيجة تجريبية 1" src="https://picsum.photos/seed/hatimq1/400/300"></div><div class="demo-img"><img loading="lazy" alt="نتيجة تجريبية 2" src="https://picsum.photos/seed/hatimq2/400/300"></div></div><p style="color:var(--muted);font-size:.9rem">هذه نتيجة تجريبية للعرض.</p>`)}
function qdIdeas(){const v=qdNeed();if(v===null)return;qdRun(`<div style="display:grid;gap:8px;margin-top:8px">${['إطلاق نسخة مصغّرة أولًا','محتوى أسبوعي بقصص قصيرة','عرض تجريبي لأول 20 عميلًا'].map((x,i)=>`<div class="card idea" style="padding:12px"><span class="idea-num">${i+1}</span><div><b>${escapeHtml(v)}</b><p style="margin:2px 0 0;color:var(--muted);font-size:.88rem">${x}.</p></div></div>`).join('')}</div>`)}
function qdSum(){const v=qdNeed();if(v===null)return;qdRun(`<p><b>الخلاصة:</b> ${escapeHtml(v.split(/[.؟!]/)[0]||v)}.</p><ul><li>النقطة الأولى المستخلصة من النص.</li><li>النقطة الثانية باختصار.</li></ul>`)}

// ---------- Mock generators ----------
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function setLoading(box,msg='جاري إنشاء النتيجة'){box.innerHTML=`<div class="loading"><span class="spinner"></span>${msg} <span class="typing"><i></i><i></i><i></i></span></div>`}
async function genText(){const inp=$('#tInput'),box=$('#tResult');if(!inp||!box)return;
  if(!inp.value.trim()){box.innerHTML='أدخل طلبك للبدء.';return}
  const type=$('#tType')?.value||'منشور سوشيال ميديا',tone=$('#tTone')?.value||'احترافية',len=$('#tLen')?.value||'متوسط';
  setLoading(box);await wait(1100);
  const topic=inp.value.trim().slice(0,120);
  box.innerHTML=`<div class="mock-screen"><div class="dash-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dash-url">hatim.ai/result</span></div><div style="padding:16px;display:grid;gap:10px"><span class="tag-ai">تم الإنشاء ✓</span><h3 style="margin:0">${type} — بنبرة ${tone}</h3><p style="margin:0">نص ${len==='قصير'?'مركّز من 3 أسطر':len==='طويل'?'موسّع بأربع فقرات ودعوة لاتخاذ إجراء':'من فقرتين مع عنوان ونقاط'} حول: <b>${escapeHtml(topic)}</b>.</p><div class="tile-preview"><div class="pl"></div><div class="pl"></div><div class="pl short"></div></div></div></div><p style="color:var(--muted);font-size:.9rem;margin-bottom:0">نتيجة تجريبية <span class="badge badge-demo">تجريبي</span></p>`;
  bumpUsage('text');toast('تم إنشاء النتيجة التجريبية');saveRecent('مولد النصوص','tools/text.html')}
function clearBox(id){const b=$('#'+id);if(b)b.innerHTML=''}
const demoStyles={'واقعي':'hatimr','سينمائي':'hatimc','Minimal':'hatimm','Illustration':'hatimi'};
async function genImage(){const inp=$('#iInput'),box=$('#iResult');if(!inp||!box)return;
  if(!inp.value.trim()){box.innerHTML='صف الصورة التي تريد إنشاءها...';return}
  setLoading(box,'جاري إنشاء الصورة');await wait(1300);
  const style=$('#iStyle')?.value||'سينمائي',ratio=$('#iRatio')?.value||'مربع 1:1';
  const seed=demoStyles[style]||'hatimc';
  const ar=ratio.includes('16:9')?'640/360':ratio.includes('9:16')?'360/560':'500/400';
  box.innerHTML=`<p style="margin-top:0;color:var(--muted)">الوصف: ${escapeHtml(inp.value.trim().slice(0,100))} — ${style} — ${ratio}</p><div class="demo-imgs">${[1,2,3].map(i=>`<div class="demo-img"><img loading="lazy" alt="نتيجة تجريبية ${i}" src="https://picsum.photos/seed/${seed}${i}/${ar}"></div>`).join('')}</div><p style="color:var(--muted);font-size:.9rem">هذه نتيجة تجريبية للعرض <span class="badge badge-demo">تجريبي</span> <span class="tag-ai">تم الإنشاء ✓</span></p>`;
  bumpUsage('image');toast('تم إنشاء الصور التجريبية');saveRecent('مولد الصور','tools/image.html')}
async function improve(mode){const a=$('#oInput'),b=$('#oResult');if(!a||!b)return;
  if(!a.value.trim()){b.innerHTML='أدخل النص الأصلي أولًا.';return}
  setLoading(b,'جاري تحسين النص');await wait(900);
  let t=a.value.trim();
  const map={'تحسين':`نسخة محسّنة وأكثر احترافية:\n\n${t}\n\n— أُعيدت الصياغة بلغة أوضح مع الحفاظ على المعنى.`,'اختصار':`الخلاصة: ${t.split(/[.،!؟]/).filter(Boolean).slice(0,2).join('. ')}.`,'إعادة صياغة':`صياغة بديلة بنفس المعنى:\n\n${t}\n\n— بترتيب مختلف للجمل ومفردات مرادفة (محاكاة تجريبية).`,'تصحيح الأخطاء':`النص بعد التصحيح اللغوي:\n\n${t}\n\n— تم تدقيق الهمزات وعلامات الترقيم (محاكاة تجريبية).`,'احترافية':`بأسلوب أعمال رسمي:\n\nيسرّنا أن نقدّم: ${t}\n\n— بهيكلة واضحة ولغة مناسبة.`};
  b.innerText=(map[mode]||map['تحسين']);bumpUsage('text');toast('تم إنشاء النتيجة التجريبية')}
async function summarize(){const a=$('#sInput'),b=$('#sResult');if(!a||!b)return;
  if(!a.value.trim()){b.innerHTML='أدخل نصًا طويلًا لتلخيصه.';return}
  const kind=$('#sType')?.value||'ملخص متوسط';setLoading(b,'جاري التلخيص');await wait(900);
  const sents=a.value.split(/[.؟!؟\n]/).map(s=>s.trim()).filter(s=>s.length>8);
  let out='';
  if(kind==='نقاط رئيسية')out='<ul>'+sents.slice(0,5).map(s=>`<li>${escapeHtml(s)}</li>`).join('')+'</ul>';
  else if(kind==='ملخص قصير')out=`<p>${escapeHtml(sents.slice(0,2).join('. '))}.</p>`;
  else out=`<p>${escapeHtml(sents.slice(0,4).join('. '))}.</p>`;
  b.innerHTML=`<span class="tag-ai">تم الإنشاء ✓</span>`+out+`<p style="color:var(--muted);font-size:.9rem">ملخص تجريبي <span class="badge badge-demo">تجريبي</span></p>`;bumpUsage('text');toast('تم إنشاء الملخص')}
async function genIdeas(){const a=$('#dInput'),b=$('#dResult');if(!a||!b)return;
  if(!a.value.trim()){b.innerHTML='اكتب الموضوع أولًا.';return}
  const n=parseInt($('#dCount')?.value||'5',10);setLoading(b,'جاري توليد الأفكار');await wait(900);
  const t=a.value.trim().slice(0,80);
  const tpl=['إطلاق نسخة مصغّرة للتجربة أولًا ثم التوسّع','محتوى أسبوعي يشرح الفكرة بقصص قصيرة','شراكة مع مشروع محلي مكمّل','عرض تجريبي مجاني لأول 20 عميلًا','سلسلة فيديوهات قصيرة للأسئلة الشائعة','مسابقة تفاعلية باسم المشروع','باقة أسعار مبسطة بثلاث مستويات','نشرة بريدية أسبوعية بقيمة عملية','تجربة ميدانية وجمع آراء حقيقية','هوية بصرية بسيطة وموحدة','صفحة هبوط بعنوان واضح ودعوة واحدة','تحويل آراء العملاء إلى محتوى','تعاون مع صانع محتوى واحد','ورشة مجانية للتعريف بالخدمة','دليل PDF مجاني للمهتمين'];
  b.innerHTML=`<span class="tag-ai">تم الإنشاء ✓</span>`+tpl.slice(0,n).map((x,i)=>`<div class="card idea" style="margin-top:10px"><span class="idea-num">${i+1}</span><div><b>فكرة حول: ${escapeHtml(t)}</b><p style="margin:4px 0 0;color:var(--muted)">${x}.</p></div></div>`).join('')+`<p style="color:var(--muted)">نتائج تجريبية <span class="badge badge-demo">تجريبي</span></p>`;
  bumpUsage('text');toast('تم توليد الأفكار')}
function genPrompt(){const goal=$('#pGoal')?.value.trim(),aud=$('#pAud')?.value||'صانع محتوى',tone=$('#pTone')?.value||'احترافية',lang=$('#pLang')?.value||'العربية',box=$('#pResult');if(!box)return;
  if(!goal){box.value='اكتب أولًا: ما الذي تريد القيام به؟';return}
  box.value=`أنت مساعد ذكاء اصطناعي ${tone==='إبداعية'?'مبدع':tone==='مختصرة'?'مختصر ومباشر':'احترافي'}.\nالجمهور: ${aud}.\nاللغة: ${lang}.\nالمهمة: ${goal}.\n\nالمطلوب:\n1. قدّم إجابة منظمة بعناوين ونقاط.\n2. اجعل الأسلوب مناسبًا لـ ${aud}.\n3. اختم بخطوة مقترحة واحدة.\n4. تجنّب الحشو والتكرار.`;toast('تم إنشاء الـ Prompt');bumpUsage('text')}

// Tools page filter
function initToolsPage(){const search=$('#toolSearch');if(!search)return;
  const apply=()=>{const q=search.value.trim(),f=$('.chip.active')?.dataset.filter||'all';
    $$('.tool-card').forEach(c=>{const okQ=!q||(c.dataset.name+c.dataset.desc).includes(q);const okF=f==='all'||c.dataset.cat===f;c.style.display=okQ&&okF?'':'none'});
    const any=$$('.tool-card').some(c=>c.style.display!=='none');const e=$('#emptyTools');if(e)e.style.display=any?'none':''};
  search.addEventListener('input',apply);
  $$('.filters .chip').forEach(ch=>ch.addEventListener('click',()=>{$$('.filters .chip').forEach(x=>x.classList.remove('active'));ch.classList.add('active');apply()}))}

// Favorites + recents
function toggleFav(name,link){let f=store.get('hatim-fav',[]);f=f.some(x=>x.name===name)?f.filter(x=>x.name!==name):[...f,{name,link}];store.set('hatim-fav',f);toast('تم تحديث المفضلة');renderFav()}
function renderFav(){const box=$('#favBox');if(!box)return;const f=store.get('hatim-fav',[]);box.innerHTML=f.length?f.map(x=>`<a class="card" href="${x.link}"><b>${x.name}</b><span style="color:var(--muted)">فتح الأداة ←</span></a>`).join(''):'<div class="card"><p>لا توجد عناصر مفضلة بعد. جرّب أداة وأضفها من صفحة الأدوات.</p></div>'}
function saveRecent(name,link){let r=store.get('hatim-recent',[]);r=[{name,link},...r.filter(x=>x.name!==name)].slice(0,4);store.set('hatim-recent',r)}
function renderDash(){const u=store.get('hatim-usage',{texts:24,images:8,tools:12});
  if($('#stTools')){$('#stTools').textContent=u.tools;$('#stTexts').textContent=u.texts;$('#stImgs').textContent=u.images}
  const r=store.get('hatim-recent',[{name:'مولد النصوص',link:'tools/text.html'},{name:'مولد الصور',link:'tools/image.html'}]);const rb=$('#recentBox');if(rb)rb.innerHTML=r.map(x=>`<div class="card" style="flex-direction:row;align-items:center;gap:12px"><span class="idea-num">✦</span><div style="flex:1"><b>${x.name}</b><div style="color:var(--muted);font-size:.85rem">استُخدمت مؤخرًا</div></div><a class="btn btn-ghost btn-sm" href="${x.link}">فتح</a></div>`).join('');
  renderFav()}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function bindSwitch(id,key,def,cb){const el=document.getElementById(id);if(!el)return;const cur=store.get(key,def);el.setAttribute('aria-checked',cur?'true':'false');el.addEventListener('click',()=>{const v=el.getAttribute('aria-checked')!=='true';el.setAttribute('aria-checked',v);store.set(key,v);cb?.(v);toast('تم حفظ الإعداد')})}
