const root=document.documentElement,themeBtn=document.getElementById('themeToggle');
const savedTheme=localStorage.getItem('sagnik-theme');if(savedTheme)root.dataset.theme=savedTheme;
function syncThemeIcon(){themeBtn.innerHTML=root.dataset.theme==='dark'?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>'}syncThemeIcon();
themeBtn.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('sagnik-theme',root.dataset.theme);syncThemeIcon()});
document.getElementById('year').textContent=new Date().getFullYear();

const roles=['Software Developer','AI / ML Enthusiast','Computer Vision Builder','Researcher & Innovator'];let ri=0,ci=0,del=false;
function typeRole(){const el=document.getElementById('typedRole');if(!el)return;const word=roles[ri];el.textContent=word.slice(0,ci);if(!del&&ci<word.length)ci++;else if(del&&ci>0)ci--;else if(!del){del=true;setTimeout(typeRole,1100);return}else{del=false;ri=(ri+1)%roles.length}setTimeout(typeRole,del?45:85)}typeRole();

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{e.target.classList.toggle('visible',e.isIntersecting)}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('section-active',e.isIntersecting)),{threshold:.08,rootMargin:'-8% 0px -8% 0px'});
document.querySelectorAll('main > section.section-transition').forEach(section=>sectionObserver.observe(section));

const name=document.querySelector('.name-swap');if(name){setInterval(()=>name.classList.toggle('swap-colors'),3200)}
const progress=document.getElementById('scrollProgress');
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?scrollY/h*100:0)+'%'},{passive:true});
document.querySelectorAll('.navbar-nav .nav-link').forEach(a=>a.addEventListener('click',()=>{const menu=document.getElementById('navMenu');if(menu.classList.contains('show'))bootstrap.Collapse.getOrCreateInstance(menu).hide()}));

/* Skill brand stickers: Devicon artwork where available; Font Awesome fallback for concepts. */
const skillLogo={
'Python':'python/python-original','JavaScript':'javascript/javascript-original','TypeScript':'typescript/typescript-original',
'PHP':'php/php-original','Java':'java/java-original','C':'c/c-original','HTML5':'html5/html5-original','CSS3':'css3/css3-original',
'SQL':'mysql/mysql-original','Machine Learning':'scikitlearn/scikitlearn-original','Deep Learning':'pytorch/pytorch-original',
'NLP':'tensorflow/tensorflow-original','LLM / RAG':'huggingface/huggingface-original','Computer Vision':'opencv/opencv-original',
'Scikit-learn':'scikitlearn/scikitlearn-original','PyTorch':'pytorch/pytorch-original','OpenCV':'opencv/opencv-original',
'DeepFace':'python/python-original','Pandas':'pandas/pandas-original','NumPy':'numpy/numpy-original',
'Flask':'flask/flask-original','FastAPI':'fastapi/fastapi-original','Django':'django/django-plain','React.js':'react/react-original',
'Next.js':'nextjs/nextjs-original','Node.js':'nodejs/nodejs-original','REST APIs':'fastapi/fastapi-original',
'Streamlit':'streamlit/streamlit-original','Bootstrap':'bootstrap/bootstrap-original','Tailwind':'tailwindcss/tailwindcss-original',
'MySQL':'mysql/mysql-original','MongoDB':'mongodb/mongodb-original','SQLite':'sqlite/sqlite-original','PostgreSQL':'postgresql/postgresql-original',
'Firebase':'firebase/firebase-plain','Git':'git/git-original','GitHub':'github/github-original','Vercel':'vercel/vercel-original',
'Figma':'figma/figma-original','Power BI':'powerbi/powerbi-original','MS Office':'microsoft/microsoft-original',
'Photoshop':'photoshop/photoshop-original','Canva':'canva/canva-original','DSA':'cplusplus/cplusplus-original',
'OOP':'cplusplus/cplusplus-original','DBMS':'mysql/mysql-original','Operating Systems':'linux/linux-original',
'Computer Networks':'networkx/networkx-original','IoT':'arduino/arduino-original','Prompt Engineering':'openai/openai-original'
};
const conceptIcons={'Machine Learning':'fa-brain','Deep Learning':'fa-network-wired','NLP':'fa-language','LLM / RAG':'fa-robot','Computer Vision':'fa-eye','REST APIs':'fa-plug','DSA':'fa-diagram-project','OOP':'fa-cubes','DBMS':'fa-database','Operating Systems':'fa-desktop','Computer Networks':'fa-network-wired','Prompt Engineering':'fa-wand-magic-sparkles','MS Office':'fa-file-excel'};
document.querySelectorAll('.skill-list > span').forEach(span=>{
  const label=span.textContent.trim(),chip=document.createElement('div');chip.className='skill-chip';chip.title=label;
  const wrap=document.createElement('span');wrap.className='skill-logo-wrap';
  const path=skillLogo[label];
  if(path){const img=document.createElement('img');img.className='skill-logo';img.loading='lazy';img.alt=label+' logo';img.src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/'+path+'.svg';img.onerror=()=>{wrap.innerHTML='<i class="fa-solid '+(conceptIcons[label]||'fa-code')+' skill-fallback" aria-hidden="true"></i>'};wrap.appendChild(img)}
  else{const icon=document.createElement('i');icon.className='fa-solid '+(conceptIcons[label]||'fa-code')+' skill-fallback';wrap.appendChild(icon)}
  const text=document.createElement('span');text.textContent=label;chip.append(wrap,text);span.replaceWith(chip);
});

/* Keep the bottom-right project action visible. Until a live URL is added,
   it opens the same GitHub repository; add data-demo to switch it to the live site. */
document.querySelectorAll('.demo-link').forEach(link=>{
  const liveUrl=(link.dataset.demo||'').trim();
  const repo=link.closest('.project-actions')?.querySelector('.project-link')?.href;
  link.href=liveUrl||repo||'https://github.com/PMsagnikpaul';
  link.style.display='grid';
  link.title=liveUrl?'Open live project demo':'Live demo placeholder — currently opens GitHub repository';
  link.setAttribute('aria-label',liveUrl?'Open live project demo':'Open GitHub repository (live demo placeholder)');
});


/* Experience image gallery/lightbox */
const lightbox=document.getElementById('experienceLightbox');
const lightboxImg=document.getElementById('lightboxImage');
const lightboxCaption=document.getElementById('lightboxCaption');
const closeLightbox=()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''};
document.querySelectorAll('.timeline-visual img').forEach(img=>{
  img.addEventListener('click',()=>{
    lightboxImg.src=img.src;lightboxImg.alt=img.alt;
    lightboxCaption.textContent=img.alt;
    lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});
document.getElementById('lightboxClose')?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lightbox?.classList.contains('open'))closeLightbox()});
