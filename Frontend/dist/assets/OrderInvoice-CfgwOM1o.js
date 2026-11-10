import{C as N,r as m,j as e,H as d,M as v}from"./index-CyihCnVh.js";import{A as l}from"./AnimatedPage-TZPZhL6F.js";import{S as o}from"./ScrollReveal-BcMU8daE.js";import{C as w,d as k}from"./card-ALfb-gz8.js";import{B as a}from"./button-U8ungFZ-.js";import{B as F}from"./badge-D5bfdUI_.js";import{l as D}from"./UserRouter-u1_ZH0ol.js";import{u as O}from"./useCompanyName-DI7FUnfj.js";import{A as C}from"./arrow-left-8g1f83vU.js";import{P}from"./printer-C7ENVCgL.js";import{D as I}from"./download-BnieIpxQ.js";import{F as T}from"./file-text-DKL2LOR7.js";import"./index-BdxRGAen.js";import"./index-7Fc2Hj9Q.js";import"./index.esm-Cw5Gl4di.js";import"./common-DyN_16N4.js";import"./x-CCivUzDO.js";import"./map-pin-Cb3iJMjv.js";import"./foodVariants-pQU9m6YB.js";import"./input-CzElVRUB.js";import"./search-BqeZDWdU.js";import"./clock-2FHbq7mb.js";import"./compass-xGI1w089.js";import"./utensils-crossed-D33gFLlK.js";import"./shopping-bag-pUPJ3dIt.js";import"./circle-user-OlXjrmc0.js";import"./switch-CSmP5POY.js";import"./index-Di2Lvt3B.js";import"./index-6EiaxZKb.js";import"./index-J6CDpzpi.js";import"./index-Cze8tElY.js";import"./branding-CuuUG3y2.js";import"./businessSettings-OZAwHFrx.js";import"./BhookingoWordmark-QbnrdXFQ.js";import"./chevron-down-Dl2l6ikN.js";import"./wallet-BKxPIpq4.js";import"./shopping-cart-kVZbzqan.js";import"./index-DElUTK9t.js";import"./routes-Duez7HEd.js";import"./log-out-BXW_97kJ.js";import"./Loader-C8ZTXqfr.js";import"./ProtectedRoute-BZbq5N30.js";import"./AuthRedirect-CD5BtPHr.js";import"./facilityHelpers-BjMA58os.js";import"./phone-TDoc5KLB.js";import"./mail-BT1zVf6i.js";import"./twitter-qfz1NY-3.js";import"./heart-3BZmwgwp.js";import"./chevron-right-BjpwdEFp.js";import"./checkbox-BR9IGfRC.js";import"./index-Bxdk3mSj.js";import"./check-Ct5Ok442.js";import"./OptimizedImage-Dy-3Qwgt.js";import"./bell-CfY0DL9A.js";import"./utensils-Bi0k194p.js";import"./zap-CFdzAWHS.js";import"./shopping-basket-D_g5Nnsy.js";import"./star-CaoIgS1D.js";import"./plus-e9LSsCbq.js";import"./sliders-horizontal-BCMuPKft.js";import"./flame-DM6DHRGP.js";import"./circle-check-BSAwZ3vD.js";import"./indian-rupee-BQXzmflv.js";import"./shield-check-DngCY25V.js";import"./circle-alert-CeEuzLkV.js";function Ge(){const g=O(),{orderId:i}=N(),{getOrderById:j}=D(),[t,y]=m.useState(()=>j(i)),[f,x]=m.useState(!t),[n,c]=m.useState(null),p=m.useRef(null);if(m.useEffect(()=>{if(t)return;(async()=>{try{x(!0);const r=await v.getOrderDetails(i);r.data?.success&&r.data.data?.order?y(r.data.data.order):c("Order not found")}catch{c("Failed to load invoice details")}finally{x(!1)}})()},[i,t]),f)return e.jsx(l,{className:"min-h-screen bg-background dark:bg-[#0a0a0a] p-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto text-center py-20",children:[e.jsx("div",{className:"w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"}),e.jsx("p",{className:"text-muted-foreground",children:"Generating invoice..."})]})});if(n||!t)return e.jsx(l,{className:"min-h-screen bg-background dark:bg-[#0a0a0a] p-4",children:e.jsxs("div",{className:"max-w-4xl mx-auto text-center py-20",children:[e.jsx("h1",{className:"text-lg sm:text-xl md:text-2xl font-bold mb-4",children:n||"Order Not Found"}),e.jsx(d,{to:"/user/orders",children:e.jsx(a,{children:"Back to Orders"})})]})});const b=s=>new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),h=()=>{const s=window.open("","_blank"),r=p.current.innerHTML;s.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${t.id}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #333;
            }
            .invoice-header {
              border-bottom: 2px solid var(--primary);
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .invoice-title {
              font-size: 32px;
              font-weight: bold;
              color: var(--primary);
              margin-bottom: 10px;
            }
            .invoice-details {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin: 30px 0;
            }
            .invoice-items {
              margin: 30px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #fed7aa;
              font-weight: bold;
            }
            .total-section {
              margin-top: 30px;
              text-align: right;
            }
            .total-row {
              padding: 10px 0;
              font-size: 18px;
            }
            .grand-total {
              font-size: 24px;
              font-weight: bold;
              color: var(--primary);
              border-top: 2px solid var(--primary);
              padding-top: 10px;
            }
            @media print {
              body { margin: 0; padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${r}
        </body>
      </html>
    `),s.document.close(),s.focus(),setTimeout(()=>{s.print()},250)},u=()=>{h()};return e.jsx(l,{className:"min-h-screen bg-gradient-to-b from-yellow-50/30 via-white to-orange-50/20 dark:from-[#0a0a0a] dark:via-[#1a1a1a] dark:to-[#0a0a0a] p-3 sm:p-4 md:p-6 lg:p-8",children:e.jsxs("div",{className:"max-w-6xl mx-auto space-y-4 sm:space-y-6 md:space-y-8",children:[e.jsx(o,{children:e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6",children:[e.jsxs("div",{className:"flex items-center gap-3 sm:gap-4",children:[e.jsx(d,{to:`/user/orders/${i}`,children:e.jsx(a,{variant:"ghost",size:"icon",className:"rounded-full h-8 w-8 sm:h-10 sm:w-10",children:e.jsx(C,{className:"h-4 w-4 sm:h-5 sm:w-5"})})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-lg sm:text-xl md:text-2xl font-bold",children:"Invoice"}),e.jsxs("p",{className:"text-muted-foreground text-sm sm:text-base",children:["Order ",t.id]})]})]}),e.jsxs("div",{className:"flex gap-2 no-print",children:[e.jsxs(a,{variant:"outline",onClick:h,className:"flex items-center gap-2 text-xs sm:text-sm h-9 sm:h-10",children:[e.jsx(P,{className:"h-3 w-3 sm:h-4 sm:w-4"}),e.jsx("span",{className:"hidden sm:inline",children:"Print"})]}),e.jsxs(a,{onClick:u,className:"bg-[var(--primary)] hover:bg-primary-dark flex items-center gap-2 text-xs sm:text-sm h-9 sm:h-10",children:[e.jsx(I,{className:"h-3 w-3 sm:h-4 sm:w-4 text-white"}),e.jsx("span",{className:"hidden sm:inline text-white",children:"Download PDF"}),e.jsx("span",{className:"sm:hidden text-white",children:"PDF"})]})]})]})}),e.jsx(o,{delay:.1,children:e.jsx(w,{ref:p,className:"dark:bg-[#1a1a1a] dark:border-gray-800",children:e.jsxs(k,{className:"p-4 sm:p-6 md:p-8 lg:p-10",children:[e.jsxs("div",{className:"invoice-header",children:[e.jsxs("div",{className:"flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4",children:[e.jsx(T,{className:"h-6 w-6 sm:h-8 sm:w-8 text-[var(--primary)]"}),e.jsx("h2",{className:"invoice-title text-xl sm:text-2xl md:text-3xl text-[var(--primary)] font-bold",children:"INVOICE"})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0",children:[e.jsx("div",{children:e.jsx("p",{className:"text-xs sm:text-sm text-muted-foreground",children:g})}),e.jsx(F,{className:"bg-[var(--primary)] text-white text-sm sm:text-base md:text-lg px-3 sm:px-4 py-1.5 sm:py-2 w-fit",children:t.status.toUpperCase()})]})]}),e.jsxs("div",{className:"invoice-details grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-bold mb-2 text-sm sm:text-base dark:text-gray-100",children:"Bill To:"}),e.jsx("p",{className:"text-xs sm:text-sm dark:text-gray-300",children:t.address?.street}),t.address?.additionalDetails&&e.jsx("p",{className:"text-xs sm:text-sm dark:text-gray-300",children:t.address.additionalDetails}),e.jsxs("p",{className:"text-xs sm:text-sm dark:text-gray-300",children:[t.address?.city,", ",t.address?.state," ",t.address?.zipCode]})]}),e.jsxs("div",{className:"text-left sm:text-right",children:[e.jsx("h3",{className:"font-bold mb-2 text-sm sm:text-base dark:text-gray-100",children:"Invoice Details:"}),e.jsxs("p",{className:"text-xs sm:text-sm dark:text-gray-300",children:[e.jsx("strong",{children:"Invoice #:"})," ",t.id]}),e.jsxs("p",{className:"text-xs sm:text-sm dark:text-gray-300",children:[e.jsx("strong",{children:"Date:"})," ",b(t.createdAt)]}),e.jsxs("p",{className:"text-xs sm:text-sm dark:text-gray-300",children:[e.jsx("strong",{children:"Payment:"})," ",t.paymentMethod?.type?.toUpperCase()||"Card"]})]})]}),e.jsxs("div",{className:"invoice-items mt-4 sm:mt-6",children:[e.jsx("h3",{className:"font-bold mb-3 sm:mb-4 text-sm sm:text-base dark:text-gray-100",children:"Order Items:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-xs sm:text-sm dark:text-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b dark:border-gray-800",children:[e.jsx("th",{className:"px-2 sm:px-3 py-2 text-left dark:text-gray-200",children:"Item"}),e.jsx("th",{className:"px-2 sm:px-3 py-2 text-center hidden sm:table-cell dark:text-gray-200",children:"Quantity"}),e.jsx("th",{className:"px-2 sm:px-3 py-2 text-right hidden md:table-cell dark:text-gray-200",children:"Unit Price"}),e.jsx("th",{className:"px-2 sm:px-3 py-2 text-right dark:text-gray-200",children:"Total"})]})}),e.jsx("tbody",{children:t.items.map(s=>e.jsxs("tr",{className:"border-b dark:border-gray-800",children:[e.jsx("td",{className:"px-2 sm:px-3 py-2 sm:py-3",children:e.jsxs("div",{className:"flex items-center gap-2 sm:gap-3",children:[e.jsx("img",{src:s.image,alt:s.name,className:"w-8 h-8 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("span",{className:"font-medium block dark:text-gray-100",children:s.name}),s.variantName?e.jsx("span",{className:"text-xs text-text-secondary dark:text-text-secondary",children:s.variantName}):null,e.jsxs("span",{className:"text-muted-foreground sm:hidden text-xs",children:["Qty: ",s.quantity," × ₹",s.price.toFixed(2)]})]})]})}),e.jsx("td",{className:"px-2 sm:px-3 py-2 sm:py-3 text-center hidden sm:table-cell dark:text-gray-100",children:s.quantity}),e.jsxs("td",{className:"px-2 sm:px-3 py-2 sm:py-3 text-right hidden md:table-cell dark:text-gray-100",children:["₹",s.price.toFixed(2)]}),e.jsxs("td",{className:"px-2 sm:px-3 py-2 sm:py-3 text-right font-medium dark:text-gray-100",children:["₹",(s.price*s.quantity).toFixed(2)]})]},s.id))})]})})]}),e.jsxs("div",{className:"total-section mt-4 sm:mt-6",children:[e.jsxs("div",{className:"total-row flex justify-between text-xs sm:text-sm sm:text-base py-1 sm:py-2 dark:text-gray-300",children:[e.jsx("span",{children:"Subtotal:"}),e.jsxs("span",{children:["₹",t.subtotal.toFixed(2)]})]}),t.packagingFee>0&&e.jsxs("div",{className:"total-row flex justify-between text-xs sm:text-sm sm:text-base py-1 sm:py-2 dark:text-gray-300",children:[e.jsx("span",{children:"Packaging Fee:"}),e.jsxs("span",{children:["₹",t.packagingFee.toFixed(2)]})]}),t.platformFee>0&&e.jsxs("div",{className:"total-row flex justify-between text-xs sm:text-sm sm:text-base py-1 sm:py-2 dark:text-gray-300",children:[e.jsx("span",{children:"Platform Fee:"}),e.jsxs("span",{children:["₹",t.platformFee.toFixed(2)]})]}),e.jsx("div",{className:"total-row flex justify-between text-xs sm:text-sm sm:text-base py-1 sm:py-2 dark:text-gray-300"}),e.jsxs("div",{className:"total-row flex justify-between text-xs sm:text-sm sm:text-base py-1 sm:py-2 dark:text-gray-300",children:[e.jsx("span",{children:"GST:"}),e.jsxs("span",{children:["₹",t.tax.toFixed(2)]})]}),t.discount>0&&e.jsxs("div",{className:"total-row flex justify-between text-xs sm:text-sm sm:text-base py-1 sm:py-2 text-green-600 dark:text-green-400",children:[e.jsx("span",{children:"Discount:"}),e.jsxs("span",{children:["-₹",t.discount.toFixed(2)]})]}),e.jsxs("div",{className:"grand-total flex justify-between text-base sm:text-lg md:text-xl md:text-2xl pt-2 sm:pt-3 mt-2 sm:mt-3 border-t-2 border-[var(--primary)] dark:text-gray-100",children:[e.jsx("span",{children:"Total:"}),e.jsxs("span",{children:["₹",t.total.toFixed(2)]})]})]}),e.jsxs("div",{className:"mt-6 sm:mt-8 pt-4 sm:pt-6 border-t dark:border-gray-800 text-center text-xs sm:text-sm text-muted-foreground",children:[e.jsx("p",{className:"dark:text-text-secondary",children:"Thank you for your order!"}),e.jsx("p",{className:"mt-1 sm:mt-2 dark:text-text-secondary",children:"For any queries, please contact our support team."})]})]})})}),e.jsx(o,{delay:.2,children:e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 sm:gap-4 no-print",children:[e.jsx(d,{to:`/user/orders/${i}`,className:"flex-1",children:e.jsx(a,{variant:"outline",className:"w-full text-sm sm:text-base h-10 sm:h-11",children:"Track Order"})}),e.jsx(d,{to:"/user/orders",className:"flex-1",children:e.jsx(a,{variant:"outline",className:"w-full text-sm sm:text-base h-10 sm:h-11",children:"Back to Orders"})})]})})]})})}export{Ge as default};
