const c=(o,s="advertisements")=>{const i=["SI","Ads ID","Ads Title","Restaurant Name","Restaurant Email","Ads Type","Duration"],a=o.map((e,d)=>[d+1,e.adsId||e.sl,e.adsTitle||e.title||"",e.restaurantName||"",e.restaurantEmail||"",e.adsType||e.type||"",e.duration||""]),n=[i.join(","),...a.map(e=>e.map(d=>`"${d}"`).join(","))].join(`
`),r=new Blob([n],{type:"text/csv;charset=utf-8;"}),t=document.createElement("a"),l=URL.createObjectURL(r);t.setAttribute("href",l),t.setAttribute("download",`${s}_${new Date().toISOString().split("T")[0]}.csv`),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t)},m=(o,s="advertisements")=>{const i=["SI","Ads ID","Ads Title","Restaurant Name","Restaurant Email","Ads Type","Duration"],a=o.map((e,d)=>[d+1,e.adsId||e.sl,e.adsTitle||e.title||"",e.restaurantName||"",e.restaurantEmail||"",e.adsType||e.type||"",e.duration||""]),n=[i.join("	"),...a.map(e=>e.join("	"))].join(`
`),r=new Blob([n],{type:"application/vnd.ms-excel"}),t=document.createElement("a"),l=URL.createObjectURL(r);t.setAttribute("href",l),t.setAttribute("download",`${s}_${new Date().toISOString().split("T")[0]}.xls`),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t)},p=(o,s="advertisements")=>{const i=["SI","Ads ID","Ads Title","Restaurant Name","Restaurant Email","Ads Type","Duration"],a=o.map((t,l)=>[l+1,t.adsId||t.sl,t.adsTitle||t.title||"",t.restaurantName||"",t.restaurantEmail||"",t.adsType||t.type||"",t.duration||""]),n=window.open("","_blank"),r=`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${s}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>${s}</h1>
        <table>
          <thead>
            <tr>
              ${i.map(t=>`<th>${t}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${a.map(t=>`<tr>${t.map(l=>`<td>${l}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;n.document.write(r),n.document.close(),n.print()},b=(o,s="advertisements")=>{const i=JSON.stringify(o,null,2),a=new Blob([i],{type:"application/json"}),n=document.createElement("a"),r=URL.createObjectURL(a);n.setAttribute("href",r),n.setAttribute("download",`${s}_${new Date().toISOString().split("T")[0]}.json`),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)};export{p as a,m as b,c,b as e};
