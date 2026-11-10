const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-Bjlzt8a7.js","assets/index-CyihCnVh.js","assets/index-DvYUqYr7.css"])))=>i.map(i=>d[i]);
import{u as Nt,d as jt,w as vt,r as c,j as t,A as G,m as $,e as v,_ as rt}from"./index-CyihCnVh.js";import{u as Dt}from"./useRestaurantBackNavigation-b6Y0OXnV.js";import{B as St}from"./BottomNavOrders-BquFDIQF.js";import{A as Ct}from"./arrow-left-8g1f83vU.js";import{C as q}from"./chevron-down-Dl2l6ikN.js";import{W as nt}from"./wallet-BKxPIpq4.js";import{B as It}from"./bell-CfY0DL9A.js";import{M as Ft}from"./menu-eV-1SE1c.js";import{C as At}from"./calendar-CmcI_jMw.js";import{D as Pt}from"./download-BnieIpxQ.js";import{F as kt}from"./file-text-DKL2LOR7.js";import{X as Ot}from"./x-CCivUzDO.js";import"./routes-Duez7HEd.js";import"./index-DElUTK9t.js";import"./package-BH_bCDRV.js";import"./message-square-DAErc5lo.js";import"./compass-xGI1w089.js";const y=(...D)=>{},it=(...D)=>{};function Kt(){const D=Nt(),M=jt(),ot=Dt(),lt=M.state?.from,[ct]=vt(),[F,U]=c.useState(()=>ct.get("tab")==="invoices"?"invoices":"payouts"),[A,dt]=c.useState("Last 30 days"),[P,k]=c.useState(!1),[R,J]=c.useState(!1),W=c.useRef(null),mt=c.useRef(null),[i,V]=c.useState(null),[T,Q]=c.useState(!0),[m,S]=c.useState(null),[_,X]=c.useState(!1),[z,K]=c.useState(null),[Lt,Et]=c.useState(!0),[ut,C]=c.useState(!1),[N,O]=c.useState(""),[Z,tt]=c.useState(!1),[H,B]=c.useState([]),[gt,et]=c.useState(!1);c.useEffect(()=>{(async()=>{try{Q(!0);const a=await v.getFinance();if(a.data?.success&&a.data?.data){const s=a.data.data;V(s),y("? Finance data fetched:",s)}}catch(a){a.response?.status}finally{Q(!1)}})()},[]),c.useEffect(()=>{(async()=>{try{et(!0);const s=(await v.getWithdrawalHistory())?.data?.data,r=Array.isArray(s)?s:Array.isArray(s?.withdrawals)?s.withdrawals:[];B(r)}catch(a){a?.response?.status,B([])}finally{et(!1)}})()},[]),c.useEffect(()=>{i?.restaurant?K(i.restaurant):(async()=>{try{const a=await v.getRestaurantByOwner(),s=a?.data?.data?.restaurant||a?.data?.restaurant||a?.data?.data;s&&K({name:s.name,restaurantId:s.restaurantId||s._id,address:s.location?.address||s.location?.formattedAddress||s.address||""})}catch(a){a.response?.status}})()},[i]);const xt=e=>{if(!e)return"";const a=String(e),s=a.match(/(\d+)$/);return s?`REST${s[1].slice(-6).padStart(6,"0")}`:a},L=c.useMemo(()=>i?.currentCycle?{start:i.currentCycle.start.day,end:i.currentCycle.end.day,month:i.currentCycle.start.month,year:i.currentCycle.start.year}:{start:"15",end:"21",month:"Dec",year:"25"},[i]),j=c.useMemo(()=>{const e=new Map;return(i?.currentCycle?.orders||[]).forEach(r=>{const o=r.orderId||r._id||r.id;o&&e.set(o,r)}),(m?.orders||[]).forEach(r=>{const o=r.orderId||r._id||r.id;o&&!e.has(o)&&e.set(o,r)}),Array.from(e.values())},[i,m]),E=c.useMemo(()=>{const e=j.reduce((r,o)=>r+(o.payout||o.restaurantEarning||0),0),a=j.reduce((r,o)=>r+(o.commission||0),0),s=j.reduce((r,o)=>r+(o.totalAmount||o.orderTotal||0),0);return{earnings:e,commission:a,gross:s,count:j.length}},[j]),ht=e=>{const a=String(e||"").trim().toLowerCase();return a==="approved"?"bg-green-100 text-green-700":a==="rejected"?"bg-red-100 text-red-700":"bg-amber-100 text-amber-700"},yt=e=>{const a=String(e||"").trim().toLowerCase();return a?a.charAt(0).toUpperCase()+a.slice(1):"Pending"},at=e=>{if(!e)return"N/A";const a=new Date(e);return Number.isNaN(a.getTime())?"N/A":a.toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0})},pt=e=>{try{if(!e||typeof e!="string")return null;const a=new Date;if(e==="Last 7 days"){const h=new Date;return h.setDate(a.getDate()-7),{startDate:h.toISOString(),endDate:a.toISOString()}}if(e==="Last 30 days"||e==="Last 1 month"){const h=new Date;return h.setDate(a.getDate()-30),{startDate:h.toISOString(),endDate:a.toISOString()}}if(e==="This week"){const h=new Date,Y=a.getDay();return h.setDate(a.getDate()-Y),{startDate:h.toISOString(),endDate:a.toISOString()}}if(e==="This month")return{startDate:new Date(a.getFullYear(),a.getMonth(),1).toISOString(),endDate:a.toISOString()};const s=e.split(" - ");if(s.length!==2)return null;const r=s[0].trim(),o=s[1].trim().replace("'"," "),n=new Date().getFullYear(),l=r.split(" "),d=o.split(" ");if(l.length<2||d.length<2)return null;const p={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11},f=parseInt(l[0]),u=p[l[1]],g=parseInt(d[0]),b=p[d[1]],w=d.length>2?parseInt("20"+d[2]):n;if(u===void 0||b===void 0||isNaN(f)||isNaN(g))return null;const x=new Date(w,u,f),I=new Date(w,b,g);return{startDate:x.toISOString(),endDate:I.toISOString()}}catch{return null}},st=async(e,a)=>{if(!e||!a){S(null);return}try{X(!0);const s=e instanceof Date?e:new Date(e),r=a instanceof Date?a:new Date(a);if(isNaN(s.getTime())||isNaN(r.getTime())){it("Invalid date values:",{startDate:e,endDate:a}),S(null);return}const o=s.toISOString().split("T")[0],n=r.toISOString().split("T")[0],l=await v.getFinance({startDate:o,endDate:n});l.data?.success&&l.data?.data?.pastCycles?(S(l.data.data.pastCycles),y("? Past cycles data fetched:",l.data.data.pastCycles),y("?? Orders array:",l.data.data.pastCycles?.orders),y("?? Total orders:",l.data.data.pastCycles?.totalOrders)):S(null)}catch(s){s.response?.status,S(null)}finally{X(!1)}};c.useEffect(()=>{const e=pt(A);e&&e.startDate&&e.endDate?st(e.startDate,e.endDate):S(null)},[A]);const ft=()=>{const e=i?.restaurant?.name||"Restaurant",a=i?.restaurant?.restaurantId||"N/A",s=i?.currentCycle||{},r=new Map;i?.currentCycle?.orders&&Array.isArray(i.currentCycle.orders)&&i.currentCycle.orders.forEach(n=>{n.orderId&&r.set(n.orderId,{...n,cycle:"Current Cycle"})}),m?.orders&&Array.isArray(m.orders)&&m.orders.forEach(n=>{n.orderId&&!r.has(n.orderId)&&r.set(n.orderId,{...n,cycle:"Past Cycle"})});const o=Array.from(r.values());return{restaurantName:e,restaurantId:a,dateRange:A,currentCycle:{start:L.start,end:L.end,month:L.month,year:L.year,estimatedPayout:`₹${(s.estimatedPayout||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`,orders:s.totalOrders||0,payoutDate:s.payoutDate?new Date(s.payoutDate).toLocaleDateString("en-IN"):"-"},pastCycles:m,allOrders:o}},bt=e=>`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Finance Report - ${e.dateRange}</title>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 40px;
            color: #333;
            background-color: #fff;
            width: 794px; /* A4 width at 96dpi */
            box-sizing: border-box;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            color: #000;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .header p {
            margin: 5px 0;
            font-size: 14px;
            color: #444;
          }
          .section {
            margin-bottom: 30px;
            clear: both;
          }
          .section-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #000;
            border-left: 4px solid #000;
            padding-left: 10px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px dashed #ddd;
          }
          .current-cycle {
            background-color: #fcfcfc;
            padding: 25px;
            border: 1px solid #eee;
            border-radius: 12px;
            margin-bottom: 25px;
          }
          .payout-amount {
            font-size: 36px;
            font-weight: 800;
            color: #000;
            margin: 10px 0;
          }
          .orders-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            margin-top: 20px;
            border: 1px solid #000;
          }
          .orders-table th {
            background-color: #f2f2f2;
            padding: 12px 8px;
            text-align: left;
            border: 1px solid #000;
            font-weight: bold;
            font-size: 11px;
            text-transform: uppercase;
          }
          .orders-table td {
            padding: 10px 8px;
            border: 1px solid #000;
            font-size: 11px;
            word-wrap: break-word;
            vertical-align: top;
          }
          .footer {
            margin-top: 50px;
            padding-top: 25px;
            border-top: 1px solid #000;
            text-align: center;
            font-size: 12px;
            color: #555;
          }
          @media print {
            body { padding: 20px; width: auto; }
            .current-cycle { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Finance Report</h1>
          <p>${e.restaurantName}</p>
          <p>ID: ${e.restaurantId}</p>
          <p>Generated on: ${new Date().toLocaleString("en-IN")}</p>
        </div>

        <div class="section">
          <div class="section-title">Current Cycle</div>
          <div class="current-cycle">
            <p style="font-size: 12px; color: #666; margin: 0 0 5px 0;">
              Est. payout (${e.currentCycle.start} - ${e.currentCycle.end} ${e.currentCycle.month})
            </p>
            <div class="payout-amount">${e.currentCycle.estimatedPayout}</div>
            <p style="font-size: 14px; color: #666; margin: 5px 0;">${e.currentCycle.orders} orders</p>
            <div class="info-row">
              <div>
                <p class="info-label" style="font-size: 11px; margin: 5px 0;">Payout for</p>
                <p style="margin: 0; font-weight: 600;">${e.currentCycle.start} - ${e.currentCycle.end} ${e.currentCycle.month}'${e.currentCycle.year}</p>
              </div>
              <div style="text-align: right;">
                <p class="info-label" style="font-size: 11px; margin: 5px 0;">Payout date</p>
                <p style="margin: 0; font-weight: 600;">${e.currentCycle.payoutDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Detailed Order Wise Report</div>
          ${e.allOrders&&e.allOrders.length>0?`
            <table class="orders-table">
              <thead>
                <tr>
                  <th style="width: 14%;">Cycle</th>
                  <th style="width: 15%;">Order ID</th>
                  <th style="width: 12%;">Date</th>
                  <th style="width: 28%;">Items</th>
                  <th style="width: 8%;">Qty</th>
                  <th style="width: 11%;">Amount</th>
                  <th style="width: 12%;">Earning</th>
                </tr>
              </thead>
              <tbody>
                ${e.allOrders.map(a=>{const s=a.createdAt?new Date(a.createdAt).toLocaleDateString("en-IN"):a.deliveredAt?new Date(a.deliveredAt).toLocaleDateString("en-IN"):"N/A",r=a.foodNames||a.items&&a.items.map(d=>d.name).join(", ")||"N/A",o=a.items?a.items.map(d=>(d.quantity||1).toString()).join(", "):"N/A",n=a.totalAmount||a.orderTotal||a.amount||0,l=a.payout||a.restaurantEarning||0;return`
                    <tr>
                      <td>${a.cycle||"N/A"}</td>
                      <td>${a.orderId||"N/A"}</td>
                      <td>${s}</td>
                      <td>${r}</td>
                      <td>${o}</td>
                      <td>₹${n.toFixed(2)}</td>
                      <td>₹${l.toFixed(2)}</td>
                    </tr>
                  `}).join("")}
              </tbody>
              <tfoot>
                <tr style="background-color: #e8f5e9; font-weight: bold;">
                  <td colspan="5" style="text-align: right;">Total Earnings:</td>
                  <td colspan="2">₹${e.allOrders.reduce((a,s)=>a+(s.payout||s.restaurantEarning||0),0).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          `:`
          <div class="info-row">
            <span class="info-label">Status:</span>
              <span class="info-value">No orders available</span>
          </div>
          `}
        </div>

        <div class="footer">
          <p>This is an auto-generated report. For detailed information, please visit the Finance section.</p>
          <p>Total Orders: ${e.allOrders?.length||0} | Total Earnings: ₹${e.allOrders?.reduce((a,s)=>a+(s.payout||s.restaurantEarning||0),0).toFixed(2)||"0.00"}</p>
        </div>
      </body>
      </html>
    `,wt=async()=>{try{k(!1);const e=ft(),a=bt(e);y("?? Generating PDF...");const s=document.createElement("iframe");s.style.position="absolute",s.style.left="-9999px",s.style.top="0",s.style.width="210mm",s.style.height="297mm",s.style.border="none",document.body.appendChild(s),s.contentDocument.open(),s.contentDocument.write(a),s.contentDocument.close(),await new Promise(x=>{s.contentDocument.readyState==="complete"?x():(s.contentWindow.onload=x,setTimeout(x,1e3))}),await new Promise(x=>setTimeout(x,500)),y("?? Loading libraries...");const r=(await rt(async()=>{const{default:x}=await import("./html2canvas.esm-DXEQVQnt.js");return{default:x}},[])).default,{default:o}=await rt(async()=>{const{default:x}=await import("./jspdf.es.min-Bjlzt8a7.js").then(I=>I.j);return{default:x}},__vite__mapDeps([0,1,2])),n=s.contentDocument.body;y("?? Converting to canvas...");const l=await r(n,{scale:2,useCORS:!0,logging:!1,allowTaint:!0,backgroundColor:"#ffffff",width:n.scrollWidth,height:n.scrollHeight});y("? Canvas created:",l.width,"x",l.height),document.body.removeChild(s);const d=210,p=297,f=l.height*d/l.width;y("?? PDF dimensions:",d,"x",f,"mm");const u=new o("p","mm","a4");let g=f,b=0;for(u.addImage(l.toDataURL("image/png"),"PNG",0,b,d,f),g-=p;g>0;)b=g-f,u.addPage(),u.addImage(l.toDataURL("image/png"),"PNG",0,b,d,f),g-=p;const w=`finance-report-${e.dateRange.replace(/\s+/g,"-").replace(/'/g,"")}_${new Date().toISOString().split("T")[0]}.pdf`;y("?? Downloading PDF:",w),u.save(w),y("? PDF downloaded successfully!")}catch(e){it("Error details:",e.stack),alert(`Failed to download PDF: ${e.message}. Please check console for details.`),k(!1)}};return c.useEffect(()=>{const e=a=>{W.current&&!W.current.contains(a.target)&&k(!1)};return P&&document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[P]),t.jsxs("div",{className:"min-h-screen bg-gray-100 flex flex-col",children:[t.jsx("div",{className:"sticky bg-white top-0 z-40 px-4 py-3 border-b border-gray-200",children:t.jsxs("div",{className:"flex items-center justify-between gap-3",children:[lt&&t.jsx("button",{onClick:ot,className:"p-1.5 hover:bg-gray-100 rounded-lg transition-colors","aria-label":"Go back",children:t.jsx(Ct,{className:"w-5 h-5 text-gray-900"})}),t.jsx("div",{className:"flex-1 min-w-0 flex items-start gap-2",children:t.jsxs("div",{className:"flex-1 min-w-0",children:[t.jsxs("div",{className:"flex items-center gap-1",children:[t.jsx("p",{className:"text-lg font-bold text-gray-900 truncate",children:z?.name||i?.restaurant?.name||"Restaurant"}),t.jsx(q,{className:"w-4 h-4 text-gray-600 flex-shrink-0"})]}),t.jsx("p",{className:"text-xs text-gray-600 mt-0.5",children:(()=>{const e=z?.restaurantId||i?.restaurant?.restaurantId,a=z?.address||i?.restaurant?.address||"",s=[];if(e){const r=xt(e);s.push(`ID: ${r}`)}if(a){const r=a.length>40?a.substring(0,40)+"...":a;s.push(r)}return s.length>0?s.join(" • "):"Loading..."})()})]})}),t.jsxs("div",{className:"flex items-center gap-1 ml-2",children:[t.jsx("button",{className:"p-2 hover:bg-gray-100 rounded-full transition-colors",onClick:()=>D("/food/restaurant/withdrawal-history",{state:{from:M.pathname}}),title:"Withdrawal History",children:t.jsx(nt,{className:"w-5 h-5 text-gray-700"})}),t.jsx("button",{className:"p-2 hover:bg-gray-100 rounded-full transition-colors",onClick:()=>D("/food/restaurant/notifications",{state:{from:M.pathname}}),children:t.jsx(It,{className:"w-5 h-5 text-gray-700"})}),t.jsx("button",{className:"p-2 hover:bg-gray-100 rounded-full transition-colors",onClick:()=>D("/food/restaurant/explore"),children:t.jsx(Ft,{className:"w-5 h-5 text-gray-700"})})]})]})}),t.jsx("div",{className:"px-4 py-3",children:t.jsxs("div",{className:"flex gap-2",children:[t.jsx("button",{onClick:()=>U("payouts"),className:`flex-1 py-3 px-4 rounded-full font-medium text-sm transition-colors ${F==="payouts"?"bg-gradient-to-br from-restaurant-primary to-restaurant-secondary text-white":"bg-white text-gray-600 border border-gray-300"}`,children:"Payouts"}),t.jsx("button",{onClick:()=>U("invoices"),className:`flex-1 py-3 px-4 rounded-full font-medium text-sm transition-colors ${F==="invoices"?"bg-gradient-to-br from-restaurant-primary to-restaurant-secondary text-white":"bg-white text-gray-600 border border-gray-300"}`,children:"Invoices & Taxes"})]})}),t.jsxs("div",{className:"flex-1 overflow-y-auto px-4 pt-6 pb-28",children:[F==="payouts"&&t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{children:[t.jsx("h2",{className:"text-base font-bold text-gray-900 mb-3",children:"Current cycle"}),t.jsx("div",{className:"bg-white rounded-lg p-4",children:T?t.jsx("div",{className:"py-8 text-center text-gray-500",children:"Loading..."}):t.jsxs(t.Fragment,{children:[t.jsxs("p",{className:"text-4xl font-bold text-gray-900 mb-2",children:["₹",(i?.currentCycle?.estimatedPayout||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})]}),t.jsxs("p",{className:"text-sm text-gray-600 mb-4",children:[i?.currentCycle?.totalOrders||0," ",i?.currentCycle?.totalOrders===1?"order":"orders"]}),t.jsxs("button",{onClick:()=>C(!0),disabled:!(i?.currentCycle?.estimatedPayout>0),className:`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 mt-4 transition-colors ${i?.currentCycle?.estimatedPayout>0?"bg-gradient-to-br from-restaurant-primary to-restaurant-secondary text-white hover:bg-gray-800":"bg-gray-200 text-gray-500 cursor-not-allowed"}`,children:[t.jsx(nt,{className:"h-5 w-5"}),"Withdraw"]})]})})]}),t.jsxs("div",{children:[t.jsx("h2",{className:"text-base font-bold text-gray-900 mb-3",children:"Withdrawal requests"}),t.jsx("div",{className:"bg-white rounded-lg p-4",children:gt?t.jsx("div",{className:"py-6 text-center text-sm text-gray-500",children:"Loading withdrawal requests..."}):H.length===0?t.jsx("div",{className:"py-6 text-center text-sm text-gray-500",children:"No withdrawal requests found."}):t.jsxs("div",{className:"space-y-3",children:[H.slice(0,8).map((e,a)=>{const s=yt(e?.status);return t.jsx("div",{className:"border border-gray-200 rounded-lg p-3",children:t.jsxs("div",{className:"flex items-start justify-between gap-3",children:[t.jsxs("div",{children:[t.jsxs("p",{className:"text-sm font-semibold text-gray-900",children:["₹",Number(e?.amount||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})]}),t.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Requested: ",at(e?.createdAt||e?.requestedAt)]}),e?.processedAt?t.jsxs("p",{className:"text-xs text-gray-500 mt-0.5",children:["Processed: ",at(e?.processedAt)]}):null]}),t.jsx("span",{className:`px-2.5 py-1 rounded-full text-xs font-semibold ${ht(e?.status)}`,children:s})]})},e?._id||e?.id||a)}),H.length>8?t.jsx("button",{type:"button",onClick:()=>D("/food/restaurant/withdrawal-history"),className:"w-full text-sm font-medium text-black hover:underline pt-1",children:"View all requests"}):null]})})]}),t.jsxs("div",{children:[t.jsx("h2",{className:"text-base font-bold text-gray-900 mb-3",children:"Past cycles"}),t.jsxs("div",{className:"space-y-3",children:[t.jsxs("div",{className:"flex gap-2",children:[t.jsxs("div",{className:"flex-1 relative",ref:mt,children:[t.jsxs("button",{onClick:()=>J(!R),className:"w-full bg-white rounded-lg px-4 py-3 flex items-center justify-between border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer",children:[t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx(At,{className:"w-4 h-4 text-gray-600"}),t.jsx("span",{className:"text-sm font-medium text-gray-900",children:A})]}),t.jsx(q,{className:`w-4 h-4 text-gray-600 transition-transform ${R?"rotate-180":""}`})]}),t.jsx(G,{children:R&&t.jsx($.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},className:"absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50",children:t.jsxs("div",{className:"p-4",children:[t.jsx("h3",{className:"text-sm font-semibold text-gray-900 mb-3",children:"Select Date Range"}),t.jsx("div",{className:"space-y-2",children:(()=>{const e=()=>{const n=new Date;n.setHours(23,59,59,999);const l=new Date(n);l.setDate(n.getDate()-7),l.setHours(0,0,0,0);const d=new Date(n);d.setDate(n.getDate()-30),d.setHours(0,0,0,0);const p=n.getDay(),f=p===0?6:p-1,u=new Date(n);u.setDate(n.getDate()-f),u.setHours(0,0,0,0);const g=new Date(u);g.setDate(u.getDate()+6),g.setHours(23,59,59,999);const b=new Date(u);b.setDate(u.getDate()-7);const w=new Date(g);w.setDate(g.getDate()-7);const x=new Date(n.getFullYear(),n.getMonth(),1),I=new Date(n.getFullYear(),n.getMonth()+1,0,23,59,59,999),h=new Date(n.getFullYear(),n.getMonth()-1,1),Y=new Date(n.getFullYear(),n.getMonth(),0,23,59,59,999);return{today:n,last7DaysStart:l,last30DaysStart:d,thisWeekStart:u,thisWeekEnd:g,lastWeekStart:b,lastWeekEnd:w,thisMonthStart:x,thisMonthEnd:I,lastMonthStart:h,lastMonthEnd:Y}},a=n=>{const l=n.getDate(),d=n.toLocaleString("en-US",{month:"short"}),p=n.getFullYear().toString().slice(-2);return`${l} ${d}'${p}`},s=(n,l)=>`${a(n)} - ${a(l)}`,r=e();return[{label:"Last 7 days",range:s(r.last7DaysStart,r.today),startDate:r.last7DaysStart,endDate:r.today},{label:"Last 30 days",range:s(r.last30DaysStart,r.today),startDate:r.last30DaysStart,endDate:r.today},{label:"This week",range:s(r.thisWeekStart,r.thisWeekEnd),startDate:r.thisWeekStart,endDate:r.thisWeekEnd},{label:"Last week",range:s(r.lastWeekStart,r.lastWeekEnd),startDate:r.lastWeekStart,endDate:r.lastWeekEnd},{label:"This month",range:s(r.thisMonthStart,r.thisMonthEnd),startDate:r.thisMonthStart,endDate:r.thisMonthEnd},{label:"Last month",range:s(r.lastMonthStart,r.lastMonthEnd),startDate:r.lastMonthStart,endDate:r.lastMonthEnd}].map((n,l)=>t.jsxs("button",{onClick:()=>{dt(n.range),J(!1),st(n.startDate,n.endDate)},className:"w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm",children:[t.jsx("div",{className:"font-medium text-gray-900",children:n.label}),t.jsx("div",{className:"text-xs text-gray-500",children:n.range})]},l))})()})]})})})]}),t.jsxs("div",{className:"relative",ref:W,children:[t.jsxs("button",{onClick:()=>k(!P),className:"bg-gradient-to-br from-restaurant-primary to-restaurant-secondary text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors",children:[t.jsx(Pt,{className:"w-4 h-4"}),t.jsx("span",{className:"text-sm font-medium",children:"Get report"}),t.jsx(q,{className:"w-4 h-4"})]}),t.jsx(G,{children:P&&t.jsx($.div,{initial:{opacity:0,scale:.95,y:-10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:-10},transition:{duration:.2,ease:"easeOut"},className:"absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 min-w-[180px]",children:t.jsxs("button",{onClick:wt,className:"w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors",children:[t.jsx("div",{className:"w-6 h-6 rounded-md bg-red-50 flex items-center justify-center",children:t.jsx(kt,{className:"w-4 h-4 text-restaurant-primary"})}),t.jsx("span",{children:"Download PDF"})]})})})]})]}),_?t.jsx("div",{className:"bg-white rounded-lg p-4",children:t.jsx("p",{className:"text-sm text-gray-600 text-center",children:"Loading past cycles..."})}):t.jsxs(t.Fragment,{children:[m&&m.orders&&m.orders.length>0?t.jsx("div",{className:"bg-white rounded-lg p-4 space-y-3",children:m.orders.map((e,a)=>t.jsx("div",{className:"border-b border-gray-200 pb-3 last:border-b-0 last:pb-0",children:t.jsxs("div",{className:"flex justify-between items-start",children:[t.jsxs("div",{className:"flex-1",children:[t.jsxs("p",{className:"text-sm font-semibold text-gray-900 mb-1",children:["Order ID: ",e.orderId||"N/A"]}),t.jsx("p",{className:"text-xs text-gray-600",children:e.foodNames||e.items&&e.items.map(s=>s.name).join(", ")||"N/A"})]}),t.jsxs("div",{className:"text-right ml-4",children:[t.jsxs("p",{className:"text-sm font-bold text-gray-900",children:["₹",(e.payout||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})]}),t.jsx("p",{className:"text-xs text-gray-500",children:"Earning"})]})]})},e.orderId||a))}):m&&m.orders&&m.orders.length===0?t.jsx("div",{className:"bg-white rounded-lg p-8 text-center border border-dashed border-gray-300",children:t.jsx("p",{className:"text-sm text-gray-500 italic",children:"No orders found for this selected range."})}):null,(!m||!m.orders)&&!_&&i?.currentCycle?.orders&&i.currentCycle.orders.length>0&&t.jsx("div",{className:"bg-white rounded-lg p-4 space-y-3",children:i.currentCycle.orders.map((e,a)=>t.jsx("div",{className:"border-b border-gray-200 pb-3 last:border-b-0 last:pb-0",children:t.jsxs("div",{className:"flex justify-between items-start",children:[t.jsxs("div",{className:"flex-1",children:[t.jsxs("p",{className:"text-sm font-semibold text-gray-900 mb-1",children:["Order ID: ",e.orderId||"N/A"]}),t.jsx("p",{className:"text-xs text-gray-600",children:e.foodNames||e.items&&e.items.map(s=>s.name).join(", ")||"N/A"})]}),t.jsxs("div",{className:"text-right ml-4",children:[t.jsxs("p",{className:"text-sm font-bold text-gray-900",children:["₹",(e.payout||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})]}),t.jsx("p",{className:"text-xs text-gray-500",children:"Earning"})]})]})},e.orderId||a))}),(!m||!m.orders||m.orders.length===0)&&(!i?.currentCycle?.orders||i.currentCycle.orders.length===0)&&!_&&!T&&t.jsxs("div",{className:"bg-white rounded-lg p-12 text-center border border-gray-200",children:[t.jsx("p",{className:"text-gray-400 mb-2",children:"No transaction history available"}),t.jsx("p",{className:"text-xs text-gray-500",children:"Your earnings and order payouts will appear here."})]})]})]})]})]}),F==="invoices"&&t.jsxs("div",{className:"space-y-4",children:[t.jsxs("div",{className:"bg-white rounded-lg p-4 border border-gray-200",children:[t.jsx("h3",{className:"text-sm font-semibold text-gray-900 mb-3",children:"Invoices & Taxes Summary"}),t.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[t.jsxs("div",{className:"rounded-md bg-gray-50 p-3",children:[t.jsx("p",{className:"text-xs text-gray-600",children:"Orders"}),t.jsx("p",{className:"text-base font-semibold text-gray-900",children:E.count})]}),t.jsxs("div",{className:"rounded-md bg-gray-50 p-3",children:[t.jsx("p",{className:"text-xs text-gray-600",children:"Earnings"}),t.jsxs("p",{className:"text-base font-semibold text-gray-900",children:["₹",E.earnings.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})]})]}),t.jsxs("div",{className:"rounded-md bg-gray-50 p-3",children:[t.jsx("p",{className:"text-xs text-gray-600",children:"Commission"}),t.jsxs("p",{className:"text-base font-semibold text-gray-900",children:["₹",E.commission.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})]})]}),t.jsxs("div",{className:"rounded-md bg-gray-50 p-3",children:[t.jsx("p",{className:"text-xs text-gray-600",children:"Gross amount"}),t.jsxs("p",{className:"text-base font-semibold text-gray-900",children:["₹",E.gross.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})]})]})]})]}),t.jsxs("div",{className:"bg-white rounded-lg p-4 border border-gray-200",children:[t.jsx("h3",{className:"text-sm font-semibold text-gray-900 mb-3",children:"Order invoice details"}),T?t.jsx("p",{className:"text-sm text-gray-500",children:"Loading invoice data..."}):j.length===0?t.jsx("p",{className:"text-sm text-gray-500",children:"No invoice data available for selected range."}):t.jsx("div",{className:"space-y-2",children:j.map((e,a)=>t.jsx("div",{className:"border border-gray-100 rounded-md p-3",children:t.jsxs("div",{className:"flex items-start justify-between gap-3",children:[t.jsxs("div",{children:[t.jsxs("p",{className:"text-sm font-medium text-gray-900",children:["Order: ",e.orderId||"N/A"]}),t.jsxs("p",{className:"text-xs text-gray-600 mt-0.5",children:[e.paymentMethod||"N/A"," | ",e.orderStatus||"N/A"]})]}),t.jsxs("div",{className:"text-right",children:[t.jsxs("p",{className:"text-sm font-semibold text-gray-900",children:["₹",(e.totalAmount||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})]}),t.jsx("p",{className:"text-xs text-gray-500",children:"Total"})]})]})},`${e.orderId||a}-invoice`))})]})]})]}),t.jsx(G,{children:ut&&t.jsxs(t.Fragment,{children:[t.jsx($.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 bg-black/50 z-50",onClick:()=>C(!1)}),t.jsx($.div,{initial:{opacity:0,scale:.95,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:20},className:"fixed inset-0 z-50 flex items-center justify-center p-4",onClick:e=>e.stopPropagation(),children:t.jsxs("div",{className:"bg-white rounded-lg shadow-xl max-w-md w-full p-6",children:[t.jsxs("div",{className:"flex items-center justify-between mb-4",children:[t.jsx("h2",{className:"text-xl font-bold text-gray-900",children:"Withdraw Amount"}),t.jsx("button",{onClick:()=>{C(!1),O("")},className:"p-1 hover:bg-gray-100 rounded-full transition-colors",children:t.jsx(Ot,{className:"w-5 h-5 text-gray-600"})})]}),t.jsxs("div",{className:"mb-4",children:[t.jsxs("p",{className:"text-sm text-gray-600 mb-2",children:["Available Balance: ",t.jsxs("span",{className:"font-semibold text-gray-900",children:["₹",(i?.currentCycle?.estimatedPayout||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})]})]}),t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Enter Amount to Withdraw"}),t.jsx("input",{type:"number",min:"0.01",max:i?.currentCycle?.estimatedPayout||0,step:"0.01",value:N,onChange:e=>O(e.target.value),placeholder:"0.00",className:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"}),N&&parseFloat(N)>(i?.currentCycle?.estimatedPayout||0)&&t.jsx("p",{className:"text-sm text-restaurant-primary mt-1",children:"Amount cannot exceed available balance"})]}),t.jsxs("div",{className:"flex gap-3",children:[t.jsx("button",{onClick:()=>{C(!1),O("")},className:"flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors",children:"Cancel"}),t.jsx("button",{onClick:async()=>{const e=parseFloat(N);if(!e||e<=0){alert("Please enter a valid amount");return}if(e>(i?.currentCycle?.estimatedPayout||0)){alert("Amount cannot exceed available balance");return}try{tt(!0);const a=await v.createWithdrawalRequest(e);if(a.data?.success){alert("Withdrawal request submitted successfully!"),C(!1),O("");const s=await v.getFinance();s.data?.success&&s.data?.data&&V(s.data.data);const o=(await v.getWithdrawalHistory())?.data?.data,n=Array.isArray(o)?o:Array.isArray(o?.withdrawals)?o.withdrawals:[];B(n)}else alert(a.data?.message||"Failed to submit withdrawal request")}catch(a){alert(a.response?.data?.message||"Failed to submit withdrawal request. Please try again.")}finally{tt(!1)}},disabled:Z||!N||parseFloat(N)<=0||parseFloat(N)>(i?.currentCycle?.estimatedPayout||0),className:"flex-1 px-4 py-3 bg-gradient-to-br from-restaurant-primary to-restaurant-secondary text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed",children:Z?"Submitting...":"Submit Request"})]})]})})]})}),t.jsx(St,{})]})}export{Kt as default};
