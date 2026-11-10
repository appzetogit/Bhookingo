const b=(l,r,i="report")=>{const n=l.map((d,a)=>r.map(p=>{const m=d[p.key]||d[p]||"";return typeof m=="object"?JSON.stringify(m):m})),o=[r.map(d=>typeof d=="string"?d:d.label).join(","),...n.map(d=>d.map(a=>`"${String(a).replace(/"/g,'""')}"`).join(","))].join(`
`),s=new Blob([o],{type:"text/csv;charset=utf-8;"}),t=document.createElement("a"),c=URL.createObjectURL(s);t.setAttribute("href",c),t.setAttribute("download",`${i}_${new Date().toISOString().split("T")[0]}.csv`),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t)},u=(l,r,i="report")=>{const n=l.map(d=>r.map(a=>{const p=d[a.key]||d[a]||"";return typeof p=="object"?JSON.stringify(p):p})),o=[r.map(d=>typeof d=="string"?d:d.label).join("	"),...n.map(d=>d.join("	"))].join(`
`),s=new Blob([o],{type:"application/vnd.ms-excel"}),t=document.createElement("a"),c=URL.createObjectURL(s);t.setAttribute("href",c),t.setAttribute("download",`${i}_${new Date().toISOString().split("T")[0]}.xls`),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t)},h=(l,r,i="report",n="Report")=>{const e=r.map(t=>typeof t=="string"?t:t.label);let o=`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${n}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 10px; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        h1 { text-align: center; }
      </style>
    </head>
    <body>
      <h1>${n}</h1>
      <p>Generated on: ${new Date().toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            ${e.map(t=>`<th>${t}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${l.map(t=>`<tr>${r.map(d=>{const a=t[d.key]||t[d]||"";return`<td>${String(a)}</td>`}).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </body>
    </html>
  `;const s=window.open("","_blank");s.document.write(o),s.document.close(),s.focus(),setTimeout(()=>{s.print(),s.close()},250)},y=(l,r="report")=>{const i=JSON.stringify(l,null,2),n=new Blob([i],{type:"application/json"}),e=document.createElement("a"),o=URL.createObjectURL(n);e.setAttribute("href",o),e.setAttribute("download",`${r}_${new Date().toISOString().split("T")[0]}.json`),e.style.visibility="hidden",document.body.appendChild(e),e.click(),document.body.removeChild(e)},x=(l,r="transaction_report")=>{const i=l.map((t,c)=>[c+1,t.orderId,t.restaurant,t.customerName,t.totalItemAmount.toFixed(2),t.couponDiscount.toFixed(2),t.vatTax.toFixed(2),Number(t.platformFee||0).toFixed(2),t.orderAmount.toFixed(2)]),n=[headers.join(","),...i.map(t=>t.map(c=>`"${c}"`).join(","))].join(`
`),e=new Blob([n],{type:"text/csv;charset=utf-8;"}),o=document.createElement("a"),s=URL.createObjectURL(e);o.setAttribute("href",s),o.setAttribute("download",`${r}_${new Date().toISOString().split("T")[0]}.csv`),o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)},f=(l,r="transaction_report")=>{const i=l.map((t,c)=>[c+1,t.orderId,t.restaurant,t.customerName,t.totalItemAmount.toFixed(2),t.couponDiscount.toFixed(2),t.vatTax.toFixed(2),Number(t.platformFee||0).toFixed(2),t.orderAmount.toFixed(2)]),n=[headers.join("	"),...i.map(t=>t.join("	"))].join(`
`),e=new Blob([n],{type:"application/vnd.ms-excel"}),o=document.createElement("a"),s=URL.createObjectURL(e);o.setAttribute("href",s),o.setAttribute("download",`${r}_${new Date().toISOString().split("T")[0]}.xls`),o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)},w=(l,r="transaction_report")=>{let i=`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Transaction Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 8px; }
        th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        h1 { text-align: center; }
      </style>
    </head>
    <body>
      <h1>Transaction Report</h1>
      <p>Generated on: ${new Date().toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            ${headers.map(e=>`<th>${e}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${l.map((e,o)=>`
            <tr>
              <td>${o+1}</td>
              <td>${e.orderId}</td>
              <td>${e.restaurant}</td>
              <td>${e.customerName}</td>
              <td>₹${e.totalItemAmount.toFixed(2)}</td>
              <td>₹${e.couponDiscount.toFixed(2)}</td>
              <td>₹${e.vatTax.toFixed(2)}</td>
              <td>₹${Number(e.platformFee||0).toFixed(2)}</td>
              <td>₹${e.orderAmount.toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </body>
    </html>
  `;const n=window.open("","_blank");n.document.write(i),n.document.close(),n.focus(),setTimeout(()=>{n.print(),n.close()},250)},g=(l,r="transaction_report")=>{const i=JSON.stringify(l,null,2),n=new Blob([i],{type:"application/json"}),e=document.createElement("a"),o=URL.createObjectURL(n);e.setAttribute("href",o),e.setAttribute("download",`${r}_${new Date().toISOString().split("T")[0]}.json`),e.style.visibility="hidden",document.body.appendChild(e),e.click(),document.body.removeChild(e)};export{h as a,u as b,b as c,g as d,y as e,w as f,f as g,x as h};
