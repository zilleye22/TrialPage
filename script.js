const features = {
  "Cart and checkout": ["Cart notes","In-store pickups","Quick buy","Sign in with Shop","Slide-out cart","Sticky cart"],
  "Customer accounts and sign-in": ["Account menu"],
  "Marketing and conversion": ["Age verifier","Back-in-stock alert","Blogs","Countdown timer","Customizable contact form","EU translations (EN, FR, IT, DE, ES)","FAQ page","In-menu promos","Press coverage","Product badges","Promo banners","Promo popups","Promo tiles","Quick view","Recently viewed","Recommended products","Stock counter","Trust badges"],
  "Merchandising": ["Animation","Before/after image slider","Color swatches","High-resolution images","Image galleries","Image hotspot","Image rollover","Image zoom","Lookbooks","Product options","Product tabs","Product videos","Size chart","Slideshow","Combined listing"],
  "Product discovery": ["Breadcrumbs","Collection page navigation","Enhanced search","Infinite scroll","Mega menu","Product filtering and sorting","Recently viewed","Recommended products","Sticky header","Swatch filters"]
};
const presets = [
  ["Helix","https://cdn.shopify.com/theme-store/8q7q9ma984af6dg4vjxx35gipzrg.jpg"],
  ["Marlow","https://cdn.shopify.com/theme-store/yq48kb2afi1lzxv088ob9k4hfo21.jpg"],
  ["Selene","https://cdn.shopify.com/theme-store/ry6d4w0k1ucee1e3crcpsn5hwn8s.jpg"],
  ["Elvara","https://cdn.shopify.com/theme-store/c658xlf9kfovqd8z7yr69syi5trc.jpg"]
];
const moreThemes = [
  ["Monde","$380","https://cdn.shopify.com/theme-store/qjbhrzerqjfj9if80d69yc60f74x.jpg?width=684","New"],
  ["Soleway","$380","https://cdn.shopify.com/theme-store/hemrxw0lip4926br1uage1bjsjc3.jpg?width=684","98%"],
  ["Signature","$380","https://cdn.shopify.com/theme-store/tnqiktbhmn74aepq99hnlaasa2vn.jpg?width=684",""],
  ["Minimal","$320","https://cdn.shopify.com/theme-store/tljecywfjqi6eej01kpsfffunvno.jpg?width=600",""]
];

const featureGrid = document.getElementById("featureGrid");
Object.entries(features).forEach(([name, items])=>{
  const el=document.createElement("section");
  el.className="feature-group";
  el.innerHTML=`<h3>${name}</h3><ul>${items.map(x=>`<li>${x}${x==="Combined listing"?`<small style="margin-left:auto;border:1px solid #ddd;border-radius:5px;padding:2px 5px;font-size:9px">SHOPIFY PLUS</small>`:""}</li>`).join("")}</ul>`;
  featureGrid.appendChild(el);
});

const presetStack=document.getElementById("presetStack");
presets.forEach(([name,img],i)=>{
  const el=document.createElement("article");
  el.className="preset-card";
  el.style.right=`${i*180}px`;
  el.style.zIndex=10+i;
  el.innerHTML=`<img src="${img}" alt="${name} preset"><div class="preset-label">${name}</div>`;
  presetStack.appendChild(el);
});

const themeCarousel=document.getElementById("themeCarousel");
moreThemes.forEach(([name,price,img,badge])=>{
  const el=document.createElement("a");
  el.className="theme-card";
  el.href="#";
  el.innerHTML=`<img src="${img}" alt="${name}"><h3>${name}</h3><p>${price} ${badge?` · ${badge}`:""}</p>`;
  themeCarousel.appendChild(el);
});

const toast = (msg)=>{
  const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2200);
};

document.querySelector(".dropdown-toggle").addEventListener("click",e=>{
  e.currentTarget.setAttribute("aria-expanded", e.currentTarget.getAttribute("aria-expanded")!=="true");
  document.querySelector(".dropdown").classList.toggle("open");
});
document.addEventListener("click",e=>{
  if(!e.target.closest(".desktop-nav")) document.querySelector(".dropdown")?.classList.remove("open");
});

const searchOverlay=document.getElementById("searchOverlay");
const searchInput=document.getElementById("searchInput");
const searchResults=document.getElementById("searchResults");
document.querySelectorAll(".search-open").forEach(b=>b.addEventListener("click",()=>{
  searchOverlay.classList.add("open"); searchOverlay.setAttribute("aria-hidden","false"); searchInput.focus();
}));
document.querySelector(".search-close").addEventListener("click",()=>searchOverlay.classList.remove("open"));
searchInput.addEventListener("input",()=>{
  const q=searchInput.value.toLowerCase().trim();
  if(!q){searchResults.innerHTML="";return}
  const matches=Object.entries(features).flatMap(([g,items])=>items.filter(x=>x.toLowerCase().includes(q)).map(x=>`${x} <small>· ${g}</small>`));
  searchResults.innerHTML=matches.length?matches.slice(0,12).map(x=>`<div class="result">${x}</div>`).join(""):`<div class="result">No matching features found.</div>`;
});

const drawer=document.getElementById("mobileDrawer");
document.querySelector(".menu-open").addEventListener("click",()=>drawer.classList.add("open"));
document.querySelector(".drawer-close").addEventListener("click",()=>drawer.classList.remove("open"));
drawer.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>drawer.classList.remove("open")));

const imageModal=document.getElementById("imageModal");
document.querySelectorAll(".image-button").forEach(btn=>btn.addEventListener("click",()=>{
  document.getElementById("modalImage").src=btn.dataset.image;
  document.getElementById("modalImage").alt=btn.dataset.title;
  imageModal.showModal();
}));
document.querySelectorAll(".modal-close").forEach(b=>b.addEventListener("click",()=>b.closest("dialog").close()));

const demoModal=document.getElementById("demoModal");
["openPreview","viewDemo"].forEach(id=>document.getElementById(id).addEventListener("click",()=>demoModal.showModal()));
document.getElementById("tryTheme").addEventListener("click",()=>toast("Theme preview ready — connect this button to your Shopify install flow."));
document.getElementById("reviewBtn").addEventListener("click",()=>toast("Review form would open here."));
document.getElementById("viewAll").addEventListener("click",()=>toast("Theme collection link would open here."));
document.querySelector(".version-details").addEventListener("click",e=>{e.preventDefault();toast("Version 1.1.0 details loaded.");});

document.querySelectorAll(".device").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".device").forEach(x=>x.classList.remove("active")); btn.classList.add("active");
  const frame=document.getElementById("previewFrame");
  frame.style.width=btn.dataset.mode==="mobile"?"360px":"100%";
  frame.style.marginLeft=btn.dataset.mode==="mobile"?"auto":"";
  frame.style.marginRight=btn.dataset.mode==="mobile"?"auto":"";
}));

document.querySelector(".maximize").addEventListener("click",()=>{
  document.getElementById("previewFrame").requestFullscreen?.();
});
