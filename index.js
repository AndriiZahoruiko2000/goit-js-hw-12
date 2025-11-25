import{a as v,S,i as o}from"./assets/vendor-DvfmeZXB.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();async function g(e,s){const c="https://pixabay.com/api/",t={key:"53285847-f778133efdcf1a85bc0bbba3e",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s};return(await v.get(c,{params:t})).data}const f=document.querySelector(".loader"),h=document.querySelector(".gallery"),d=document.querySelector(".js-loader-btn");let q=new S(".gallery a",{captionsData:"alt",captionDelay:1e3});function y(){f.classList.remove("hidden")}function n(){f.classList.add("hidden")}function P(e){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
      </a>

      <ul class="image-params">
        <li class="image-params-item">
          <span class="label">Likes</span>
          <span class="value">${e.likes}</span>
        </li>

        <li class="image-params-item">
          <span class="label">Views</span>
          <span class="value">${e.views}</span>
        </li>

        <li class="image-params-item">
          <span class="label">Comments</span>
          <span class="value">${e.comments}</span>
        </li>

        <li class="image-params-item">
          <span class="label">Downloads</span>
          <span class="value">${e.downloads}</span>
        </li>
      </ul>
    </li>
  `}function R(e){return e.map(P).join("")}function L(e){const s=R(e);h.insertAdjacentHTML("beforeend",s),q.refresh()}function O(){h.innerHTML=""}function D(){d.classList.remove("hidden")}function i(){d.classList.add("hidden")}const p=document.querySelector(".js-search-photo");let l=1,b=0,$=15,u;//!================================================
p.addEventListener("submit",async e=>{if(e.preventDefault(),O(),i(),y(),u=new FormData(p).get("query"),!u.trim())return n(),o.warning({position:"topRight",message:"Please enter something to search!"});l=1;try{const r=await g(u,l);if(r.totalHits===0)return n(),i(),o.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});b=Math.ceil(r.totalHits/$),L(r.hits),w()}catch{i(),o.error({position:"topRight",message:"Something went wrong"})}n(),p.reset()});//!================================================
n();//!================================================
d.addEventListener("click",async e=>{l+=1,y();try{const s=await g(u,l);L(s.hits),w(),B()}catch{i(),o.error({position:"topRight",message:"Something went wrong"})}n()});//!================================================
function w(){l>=b?(i(),o.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):D()}//!================================================
function B(){let s=document.querySelector(".gallery-item").getBoundingClientRect();console.log(s);let r=s.height*2;scrollBy({top:r,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
