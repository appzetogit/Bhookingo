const g=t=>String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),o=t=>String(t).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),f=t=>{const e=String(t??"").replace(/\r\n/g,`
`).split(`
`),n=[];let c=!1;const p=()=>{c&&(n.push("</ul>"),c=!1)};for(const m of e){const l=(m??"").trim();if(!l){p(),n.push("<p><br></p>");continue}const u=l.match(/^###\s+(.*)$/),a=l.match(/^##\s+(.*)$/),i=l.match(/^#\s+(.*)$/);if(i||a||u){p();const s=o(g((i||a||u)[1]||"")),r=i?"h1":a?"h2":"h3",d=r==="h1"?'class="bg-amber-100/70 px-2 py-1 rounded-md inline-block"':r==="h2"?'class="bg-amber-100/50 px-2 py-0.5 rounded-md inline-block"':'class="bg-amber-100/30 px-2 py-0.5 rounded-md inline-block"';n.push(`<${r}><span ${d}>${s}</span></${r}>`);continue}const h=l.match(/^[-*]\s+(.*)$/);if(h){c||(n.push("<ul>"),c=!0);const s=o(g(h[1]||""));n.push(`<li>${s}</li>`);continue}p();const b=o(g(l));n.push(`<p>${b}</p>`)}return p(),n.join("")},x=t=>{if(!t)return"";let e=String(t);return e=e.replace(/<p[^>]*>/gi,"").replace(/<\/p>/gi,`
`),e=e.replace(/<br\s*\/?>/gi,`
`),e=e.replace(/<div[^>]*>/gi,"").replace(/<\/div>/gi,`
`),e=e.replace(/<\/(h1|h2|h3)>/gi,`
`),e=e.replace(/<(h1|h2|h3)[^>]*>/gi,""),e=e.replace(/<\/li>/gi,`
`),e=e.replace(/<li[^>]*>/gi,"- "),e=e.replace(/<\/ul>/gi,`
`).replace(/<ul[^>]*>/gi,""),e=e.replace(/<[^>]*>/g,""),e=e.replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&apos;/g,"'"),e=e.replace(/<[^>]*>/g,""),e=e.replace(/\n{3,}/g,`

`),e=e.split(`
`).map(n=>n.trimEnd()).join(`
`).trim(),e};export{x as l,f as p};
