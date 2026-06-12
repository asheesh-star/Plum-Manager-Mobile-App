// ─────────────── DATA ───────────────
const menuItems = [
  { id:1, extId:'ITEM-PP-001', name:'Pepperoni Pizza', price:9.99, cat:'Pizza', menuGroup:'Mains', stock:25, active:true, is86:false, emoji:'🍕', type:'Item' },
  { id:2, extId:'ITEM-BCW-002', name:'BBQ Chicken Wings', price:12.49, cat:'Wings', menuGroup:'Starters', stock:0, active:true, is86:true, emoji:'🍗', type:'Item' },
  { id:3, extId:'ITEM-CS-003', name:'Caesar Salad', price:8.99, cat:'Salads', menuGroup:'Starters', stock:18, active:true, is86:false, emoji:'🥗', type:'Item' },
  { id:4, extId:'ITEM-MP-004', name:'Margherita Pizza', price:8.49, cat:'Pizza', menuGroup:'Mains', stock:30, active:false, is86:false, emoji:'🍕', type:'Item' },
  { id:5, extId:'ITEM-FA-005', name:'Fettuccine Alfredo', price:11.99, cat:'Pasta', menuGroup:'Mains', stock:12, active:true, is86:false, emoji:'🍝', type:'Item' },
  { id:6, extId:'ITEM-TIR-006', name:'Tiramisu', price:6.49, cat:'Desserts', menuGroup:'Desserts', stock:8, active:true, is86:false, emoji:'🍰', type:'Item' },
  { id:7, extId:'ITEM-SW-007', name:'Sparkling Water', price:2.99, cat:'Beverages', menuGroup:'Drinks', stock:50, active:true, is86:false, emoji:'💧', type:'Item' },
  { id:8, extId:'ITEM-CP-008', name:'Corn Pizza', price:9.49, cat:'Pizza', menuGroup:'Mains', stock:20, active:true, is86:false, emoji:'🍕', type:'Item' },
  { id:9, extId:'MOD-EC-009', name:'Extra Cheese', price:1.50, cat:'Pizza', menuGroup:'Add-ons', stock:100, active:true, is86:false, emoji:'🧀', type:'Modifier' },
  { id:10, extId:'MOD-RD-010', name:'Ranch Dip', price:0.50, cat:'Wings', menuGroup:'Add-ons', stock:50, active:true, is86:false, emoji:'🥣', type:'Modifier' }
];

const categories = ['All','Pizza','Wings','Pasta','Salads','Desserts','Beverages'];
let activeCat = 'All';
let activeStatusFilter = 'all';
let menuTypeFilter = 'all'; // 'all' | 'item' | 'modifier'
let menuSearch = '';
let currentEditId = null;

const openOrders = [
  { num:'#10231', channel:'Uber Eats', status:'Preparing', amount:'$18.50', time:'2 min', cardType:'Visa', card4:'4589',
    customer:{ name:'James R.', phone:'(512) 304-8812', address:'142 Oak St, Apt 3B' },
    lineItems:[ {name:'Pepperoni Pizza', qty:1, price:'$9.99',mods:[{name:'Extra cheese',price:1.5},{name:'Well done',price:0}]}, {name:'Corn Pizza', qty:1, price:'$9.49',mods:[{name:'No jalapeños',price:0}]} ],
    subtotal:'$19.48', discount:'-$0.98', tax:'$1.56', tip:'$0.00', total:'$20.06', notes:'Extra napkins please' },
  { num:'#10232', channel:'DoorDash', status:'Confirmed', amount:'$24.98', time:'5 min', cardType:'Mastercard', card4:'3817',
    customer:{ name:'Maria G.', phone:'(512) 908-3341', address:'88 Elm Ave' },
    lineItems:[ {name:'BBQ Chicken Wings', qty:2, price:'$24.98',mods:[{name:'Extra sauce',price:0.75},{name:'Celery on side',price:0}]} ],
    subtotal:'$24.98', discount:'$0.00', tax:'$2.00', tip:'$3.00', total:'$29.98', notes:'' },
  { num:'#10233', channel:'In-House', status:'Ready', amount:'$20.98', time:'8 min', cardType:'Visa', card4:'7241',
    customer:{ name:'Table 7', phone:'—', address:'Dine-In' },
    lineItems:[ {name:'Caesar Salad', qty:1, price:'$8.99',mods:[{name:'No croutons',price:0},{name:'Dressing on side',price:0}]}, {name:'Fettuccine Alfredo', qty:1, price:'$11.99',mods:[{name:'Extra parmesan',price:0.75}]} ],
    subtotal:'$20.98', discount:'$0.00', tax:'$1.68', tip:'$4.00', total:'$26.66', notes:'Allergy: no croutons', server:{name:'Sarah M.',role:'Server #4',terminal:'Terminal #2 – Bar'} },
  { num:'#10234', channel:'GrubHub', status:'Preparing', amount:'$8.49', time:'10 min', cardType:'Amex', card4:'1092',
    customer:{ name:'Alex T.', phone:'(737) 221-5509', address:'55 Main Blvd' },
    lineItems:[ {name:'Margherita Pizza', qty:1, price:'$8.49',mods:[{name:'Thin crust',price:0},{name:'Extra basil',price:0}]} ],
    subtotal:'$8.49', discount:'$0.00', tax:'$0.68', tip:'$1.50', total:'$10.67', notes:'' },
  { num:'#10235', channel:'Uber Eats', status:'New', amount:'$19.47', time:'1 min', cardType:'Visa', card4:'6634',
    customer:{ name:'Sarah K.', phone:'(512) 445-7821', address:'10 River Rd, Suite 5' },
    lineItems:[ {name:'Tiramisu', qty:3, price:'$19.47',mods:[]} ],
    subtotal:'$19.47', discount:'$0.00', tax:'$1.56', tip:'$2.00', total:'$23.03', notes:'Birthday delivery — add a note' },
  { num:'#10236', channel:'In-House', status:'Preparing', amount:'$24.94', time:'12 min', cardType:'Visa', card4:'9021',
    customer:{ name:'Table 3', phone:'—', address:'Dine-In' },
    lineItems:[ {name:'Sparkling Water', qty:4, price:'$11.96',mods:[{name:'No ice',price:0},{name:'Slice of lemon',price:0}]}, {name:'BBQ Chicken Wings', qty:1, price:'$12.49',mods:[{name:'Extra sauce',price:0.75},{name:'Celery on side',price:0}]} ],
    subtotal:'$24.45', discount:'$0.00', tax:'$1.96', tip:'$5.00', total:'$31.41', notes:'', server:{name:'Tom B.',role:'Server #2',terminal:'Terminal #1 – Front'} },
  { num:'#10237', channel:'DoorDash', status:'New', amount:'$16.99', time:'3 min', cardType:'Discover', card4:'5503',
    customer:{ name:'Luis P.', phone:'(737) 889-2204', address:'321 Cedar Ln' },
    lineItems:[ {name:'Buffalo Wings', qty:1, price:'$13.99',mods:[{name:'Extra hot sauce',price:0.5}]}, {name:'Ranch Dip', qty:1, price:'$3.00',mods:[]} ],
    subtotal:'$16.99', discount:'$0.00', tax:'$1.36', tip:'$2.50', total:'$20.85', notes:'Extra ranch on side' },
  { num:'#10238', channel:'Uber Eats', status:'Preparing', amount:'$14.50', time:'6 min', cardType:'Mastercard', card4:'2278',
    customer:{ name:'Chen W.', phone:'(512) 776-0043', address:'7 Lakeview Dr' },
    lineItems:[ {name:'Pasta Carbonara', qty:1, price:'$14.50',mods:[{name:'Extra bacon',price:2.0},{name:'Less cream',price:0}]} ],
    subtotal:'$14.50', discount:'$0.00', tax:'$1.16', tip:'$2.00', total:'$17.66', notes:'' },
  { num:'#10239', channel:'In-House', status:'Confirmed', amount:'$22.48', time:'9 min', cardType:'Visa', card4:'8814',
    customer:{ name:'Table 12', phone:'—', address:'Dine-In' },
    lineItems:[ {name:'Garlic Bread', qty:2, price:'$7.98',mods:[{name:'Extra butter',price:0}]}, {name:'Lasagna', qty:1, price:'$14.50',mods:[{name:'Well done',price:0}]} ],
    subtotal:'$22.48', discount:'$0.00', tax:'$1.80', tip:'$4.50', total:'$28.78', notes:'', server:{name:'Jake R.',role:'Server #3',terminal:'Terminal #1 – Front'} },
  { num:'#10240', channel:'GrubHub', status:'Ready', amount:'$13.99', time:'11 min', cardType:'Visa', card4:'3365',
    customer:{ name:'Pat O.', phone:'(512) 334-9981', address:'99 Sunset Blvd' },
    lineItems:[ {name:'Fish & Chips', qty:1, price:'$13.99',mods:[{name:'Tartar sauce extra',price:0.5}]} ],
    subtotal:'$13.99', discount:'$0.00', tax:'$1.12', tip:'$1.50', total:'$16.61', notes:'' },
  { num:'#10241', channel:'Uber Eats', status:'New', amount:'$12.48', time:'4 min', cardType:'Mastercard', card4:'7729',
    customer:{ name:'Priya N.', phone:'(737) 560-1123', address:'14 Palm Ave, Unit 2' },
    lineItems:[ {name:'Chicken Wrap', qty:1, price:'$9.99',mods:[{name:'No onions',price:0},{name:'Extra ranch',price:0.5}]}, {name:'Diet Coke', qty:1, price:'$2.49',mods:[{name:'No ice',price:0}]} ],
    subtotal:'$12.48', discount:'$0.00', tax:'$1.00', tip:'$1.00', total:'$14.48', notes:'No onions' },
  { num:'#10242', channel:'DoorDash', status:'Preparing', amount:'$17.00', time:'7 min', cardType:'Visa', card4:'4402',
    customer:{ name:'Tom B.', phone:'(512) 447-3302', address:'60 Hill St' },
    lineItems:[ {name:'Mushroom Risotto', qty:1, price:'$17.00',mods:[{name:'Extra parmesan',price:0.75},{name:'No truffle',price:0}]} ],
    subtotal:'$17.00', discount:'$0.00', tax:'$1.36', tip:'$3.00', total:'$21.36', notes:'' },
  { num:'#10243', channel:'In-House', status:'Preparing', amount:'$28.99', time:'14 min', cardType:'Amex', card4:'6618',
    customer:{ name:'Table 5', phone:'—', address:'Dine-In' },
    lineItems:[ {name:'Steak Frites', qty:1, price:'$28.99',mods:[{name:'Medium-rare',price:0},{name:'Sauce on side',price:0}]} ],
    subtotal:'$28.99', discount:'$0.00', tax:'$2.32', tip:'$6.00', total:'$37.31', notes:'Medium-rare', server:{name:'Marcus J.',role:'Server #6',terminal:'Terminal #2 – Bar'} },
  { num:'#10244', channel:'Uber Eats', status:'Confirmed', amount:'$15.48', time:'5 min', cardType:'Visa', card4:'1155',
    customer:{ name:'Rachel M.', phone:'(512) 889-5541', address:'25 Orchid Way' },
    lineItems:[ {name:'Veggie Burger', qty:1, price:'$10.99',mods:[{name:'No pickles',price:0},{name:'Avocado add',price:2.0}]}, {name:'Fries', qty:1, price:'$4.49',mods:[{name:'Extra salt',price:0}]} ],
    subtotal:'$15.48', discount:'$0.00', tax:'$1.24', tip:'$2.00', total:'$18.72', notes:'' },
  { num:'#10245', channel:'GrubHub', status:'New', amount:'$11.99', time:'2 min', cardType:'Mastercard', card4:'9987',
    customer:{ name:'Kevin L.', phone:'(737) 221-8890', address:'33 Maple Dr' },
    lineItems:[ {name:'Nachos Supreme', qty:1, price:'$11.99',mods:[{name:'Jalapeños on side',price:0},{name:'Extra guac',price:1.5}]} ],
    subtotal:'$11.99', discount:'$0.00', tax:'$0.96', tip:'$1.50', total:'$14.45', notes:'Jalapeños on the side' },
  { num:'#10246', channel:'DoorDash', status:'Preparing', amount:'$21.97', time:'8 min', cardType:'Visa', card4:'0043',
    customer:{ name:'Aisha B.', phone:'(512) 776-4430', address:'77 Birch St' },
    lineItems:[ {name:'Shrimp Tacos', qty:3, price:'$21.97',mods:[{name:'Corn tortilla',price:0},{name:'Extra lime',price:0}]} ],
    subtotal:'$21.97', discount:'$0.00', tax:'$1.76', tip:'$3.50', total:'$27.23', notes:'' },
  { num:'#10247', channel:'In-House', status:'Ready', amount:'$18.97', time:'16 min', cardType:'Discover', card4:'3391',
    customer:{ name:'Table 9', phone:'—', address:'Dine-In' },
    lineItems:[ {name:'Lemonade', qty:2, price:'$6.98',mods:[{name:'No sugar',price:0},{name:'Extra ice',price:0}]}, {name:'Club Sandwich', qty:1, price:'$11.99',mods:[{name:'No mayo',price:0},{name:'Wheat bread',price:0}]} ],
    subtotal:'$18.97', discount:'$0.00', tax:'$1.52', tip:'$3.00', total:'$23.49', notes:'', server:{name:'Amy K.',role:'Host',terminal:'Terminal #1 – Front'} },
  { num:'#10248', channel:'Uber Eats', status:'Confirmed', amount:'$26.99', time:'3 min', cardType:'Visa', card4:'7762',
    customer:{ name:'Dana H.', phone:'(512) 334-6612', address:'18 Willow Rd' },
    lineItems:[ {name:'BBQ Ribs Half Rack', qty:1, price:'$26.99',mods:[{name:'Extra BBQ sauce',price:0.5},{name:'Coleslaw sub fries',price:0}]} ],
    subtotal:'$26.99', discount:'$0.00', tax:'$2.16', tip:'$5.00', total:'$34.15', notes:'' },
  { num:'#10249', channel:'DoorDash', status:'New', amount:'$13.48', time:'6 min', cardType:'Mastercard', card4:'4456',
    customer:{ name:'Omar F.', phone:'(737) 889-7743', address:'4 Cypress Ct' },
    lineItems:[ {name:'Greek Salad', qty:1, price:'$8.99',mods:[{name:'Extra feta',price:0.75},{name:'No olives',price:0}]}, {name:'Pita Bread', qty:1, price:'$4.49',mods:[{name:'Warm',price:0},{name:'Hummus on side',price:1.0}]} ],
    subtotal:'$13.48', discount:'$0.00', tax:'$1.08', tip:'$2.00', total:'$16.56', notes:'' },
  { num:'#10250', channel:'GrubHub', status:'Preparing', amount:'$14.98', time:'10 min', cardType:'Visa', card4:'5512',
    customer:{ name:'Nina C.', phone:'(512) 660-2213', address:'92 Magnolia Ave' },
    lineItems:[ {name:'Truffle Fries', qty:1, price:'$8.49',mods:[{name:'Extra truffle oil',price:1.5}]}, {name:'Onion Rings', qty:1, price:'$6.49',mods:[]} ],
    subtotal:'$14.98', discount:'$0.00', tax:'$1.20', tip:'$2.00', total:'$18.18', notes:'' },
  { num:'#10251', channel:'Uber Eats', status:'New', amount:'$9.99', time:'1 min', cardType:'Visa', card4:'8831',
    customer:{ name:'Felix D.', phone:'(512) 441-8890', address:'3 Rosewood Ln' },
    lineItems:[ {name:'Lobster Bisque', qty:1, price:'$9.99',mods:[{name:'Extra cream',price:0.75}]} ],
    subtotal:'$9.99', discount:'$0.00', tax:'$0.80', tip:'$1.00', total:'$11.79', notes:'' },
  { num:'#10252', channel:'DoorDash', status:'Confirmed', amount:'$16.50', time:'4 min', cardType:'Mastercard', card4:'6647',
    customer:{ name:'Yuki S.', phone:'(737) 221-4456', address:'56 Pine St, Apt 1A' },
    lineItems:[ {name:'Pad Thai Noodles', qty:1, price:'$16.50',mods:[{name:'Mild spice',price:0},{name:'Extra peanuts',price:0.5}]} ],
    subtotal:'$16.50', discount:'$0.00', tax:'$1.32', tip:'$3.00', total:'$20.82', notes:'Mild spice' },
  { num:'#10253', channel:'In-House', status:'Preparing', amount:'$19.48', time:'18 min', cardType:'Visa', card4:'2290',
    customer:{ name:'Table 2', phone:'—', address:'Dine-In' },
    lineItems:[ {name:'House Burger', qty:1, price:'$13.99',mods:[{name:'Medium',price:0},{name:'No pickles',price:0},{name:'Add bacon',price:2.0}]}, {name:'Coleslaw', qty:1, price:'$5.49',mods:[{name:'Dressing on side',price:0}]} ],
    subtotal:'$19.48', discount:'$0.00', tax:'$1.56', tip:'$4.00', total:'$25.04', notes:'', server:{name:'Dana H.',role:'Server #7',terminal:'Terminal #3 – Patio'} },
  { num:'#10254', channel:'Uber Eats', status:'Preparing', amount:'$13.98', time:'7 min', cardType:'Discover', card4:'7714',
    customer:{ name:'Bella W.', phone:'(512) 776-9981', address:'11 Sycamore Dr' },
    lineItems:[ {name:'Mozzarella Sticks', qty:2, price:'$13.98',mods:[{name:'Marinara extra',price:0.5}]} ],
    subtotal:'$13.98', discount:'$0.00', tax:'$1.12', tip:'$2.00', total:'$17.10', notes:'' },
  { num:'#10255', channel:'GrubHub', status:'New', amount:'$18.99', time:'2 min', cardType:'Mastercard', card4:'3358',
    customer:{ name:'Marcus J.', phone:'(737) 560-3321', address:'74 Aspen Way' },
    lineItems:[ {name:'Salmon Teriyaki Bowl', qty:1, price:'$18.99',mods:[{name:'Brown rice',price:0},{name:'No sesame',price:0}]} ],
    subtotal:'$18.99', discount:'$0.00', tax:'$1.52', tip:'$3.00', total:'$23.51', notes:'Brown rice please' },
  { num:'#10256', channel:'In-House', status:'Ready', amount:'$15.96', time:'20 min', cardType:'Visa', card4:'9923',
    customer:{ name:'Table 6', phone:'—', address:'Dine-In' },
    lineItems:[ {name:'Soft Drinks', qty:3, price:'$7.47',mods:[{name:'No ice',price:0}]}, {name:'Pizza Slice', qty:1, price:'$8.49',mods:[{name:'Extra cheese',price:1.5}]} ],
    subtotal:'$15.96', discount:'$0.00', tax:'$1.28', tip:'$3.00', total:'$20.24', notes:'', server:{name:'Lisa M.',role:'Bartender',terminal:'Terminal #2 – Bar'} },
  { num:'#10257', channel:'DoorDash', status:'Preparing', amount:'$17.99', time:'5 min', cardType:'Visa', card4:'1176',
    customer:{ name:'Chloe A.', phone:'(512) 334-7723', address:'38 Hawthorn Blvd' },
    lineItems:[ {name:'Chicken Tikka Masala', qty:1, price:'$17.99',mods:[{name:'Extra naan',price:1.5},{name:'Mild',price:0}]} ],
    subtotal:'$17.99', discount:'$0.00', tax:'$1.44', tip:'$3.50', total:'$22.93', notes:'Extra naan bread' },
];


const refundTransactions = [
  { num:'#10198', server:'Sarah M. (Server #4)', time:'18 min ago', amount:'$62.00', reason:'Customer complaint — food quality', items:[ {name:'Steak Frites', qty:1, price:'$28.99',mods:[{name:'Medium-rare',price:0},{name:'Sauce on side',price:0}]}, {name:'Truffle Fries', qty:1, price:'$8.49',mods:[{name:'Extra truffle oil',price:1.5}]}, {name:'Wine Glass', qty:2, price:'$24.52',mods:[]} ] },
  { num:'#10204', server:'Tom B. (Server #2)',   time:'34 min ago', amount:'$71.50', reason:'Wrong order delivered', items:[ {name:'Lobster Bisque', qty:2, price:'$19.98',mods:[{name:'Extra cream',price:0.75}]}, {name:'Salmon Teriyaki', qty:1, price:'$18.99',mods:[]}, {name:'Sparkling Water', qty:3, price:'$8.97',mods:[{name:'No ice',price:0},{name:'Slice of lemon',price:0}]} ] },
  { num:'#10211', server:'Amy K. (Server #7)',   time:'51 min ago', amount:'$46.50', reason:'Allergy issue — item returned', items:[ {name:'Caesar Salad', qty:2, price:'$17.98',mods:[{name:'No croutons',price:0},{name:'Dressing on side',price:0}]}, {name:'Garlic Bread', qty:2, price:'$7.98',mods:[{name:'Extra butter',price:0}]}, {name:'Pasta Carbonara', qty:1, price:'$14.50',mods:[{name:'Extra bacon',price:2.0},{name:'Less cream',price:0}]} ] },
];

const voidTransactions = [
  { num:'#10219', server:'Jake R. (Server #3)', time:'8 min ago',  amount:'$38.97', reason:'Customer changed mind', items:[ {name:'Margherita Pizza', qty:2, price:'$16.98',mods:[{name:'Thin crust',price:0},{name:'Extra basil',price:0}]}, {name:'Caesar Salad', qty:1, price:'$8.99',mods:[{name:'No croutons',price:0},{name:'Dressing on side',price:0}]}, {name:'Tiramisu', qty:2, price:'$12.98',mods:[]} ] },
  { num:'#10222', server:'Jake R. (Server #3)', time:'15 min ago', amount:'$54.48', reason:'Entered on wrong table', items:[ {name:'BBQ Ribs Half Rack', qty:1, price:'$26.99',mods:[{name:'Extra BBQ sauce',price:0.5},{name:'Coleslaw sub fries',price:0}]}, {name:'Steak Frites', qty:1, price:'$28.99',mods:[{name:'Medium-rare',price:0},{name:'Sauce on side',price:0}]} ] },
  { num:'#10225', server:'Jake R. (Server #3)', time:'22 min ago', amount:'$47.96', reason:'Duplicate entry', items:[ {name:'Shrimp Tacos', qty:4, price:'$29.32',mods:[{name:'Corn tortilla',price:0},{name:'Extra lime',price:0}]}, {name:'Nachos Supreme', qty:1, price:'$11.99',mods:[{name:'Jalapeños on side',price:0},{name:'Extra guac',price:1.5}]} ] },
  { num:'#10228', server:'Jake R. (Server #3)', time:'28 min ago', amount:'$34.50', reason:'Item out of stock after order', items:[ {name:'Lobster Bisque', qty:2, price:'$19.98',mods:[{name:'Extra cream',price:0.75}]}, {name:'Mushroom Risotto', qty:1, price:'$17.00',mods:[{name:'Extra parmesan',price:0.75},{name:'No truffle',price:0}]} ] },
  { num:'#10230', server:'Sarah M. (Server #4)', time:'35 min ago', amount:'$64.09', reason:'POS error — re-rung', items:[ {name:'Salmon Teriyaki Bowl', qty:2, price:'$37.98',mods:[{name:'Brown rice',price:0},{name:'No sesame',price:0}]}, {name:'Truffle Fries', qty:2, price:'$16.98',mods:[{name:'Extra truffle oil',price:1.5}]} ] },
];

const compTransactions = [
  { num:'#10215', server:'Tom B. (Server #2)',   time:'3 min ago',  amount:'$47.00', reason:'Customer complaint — long wait', items:[ {name:'BBQ Wings', qty:2, price:'$24.98',mods:[]}, {name:'House Burger', qty:1, price:'$13.99',mods:[{name:'No pickles',price:0}]} ] },
  { num:'#10218', server:'Sarah M. (Server #4)', time:'19 min ago', amount:'$28.50', reason:'Wrong item delivered to table', items:[ {name:'Fettuccine Alfredo', qty:1, price:'$11.99',mods:[{name:'Extra parmesan',price:0.75}]}, {name:'Caesar Salad', qty:1, price:'$8.99',mods:[{name:'Dressing on side',price:0}]} ] },
  { num:'#10221', server:'Jake R. (Server #3)',  time:'31 min ago', amount:'$19.50', reason:'Manager goodwill — birthday guest', items:[ {name:'Tiramisu', qty:2, price:'$12.98',mods:[]}, {name:'Sparkling Water', qty:2, price:'$5.98',mods:[]} ] },
];

const alertsData = [
  { icon:'📵', title:'POS Offline', sub:'Terminal #2 at Bar station offline for 12 min', sev:'high', color:'red', action:'ping' },
  { icon:'🚫', title:'High Void Alert', sub:'$240 in voids last hour — exceeds threshold ($150)', sev:'high', color:'red', action:'voids' },
  { icon:'🚫', title:'High Void Alert', sub:'Server #4 voided 5 items in 30 min', sev:'high', color:'red', action:'voids' },
  { icon:'💸', title:'High Refund Alert', sub:'$180 in refunds — 3 transactions flagged', sev:'medium', color:'amber', action:'refunds' },
  { icon:'🎁', title:'High Comp Alert', sub:'$95 in comps — manager approval pending', sev:'medium', color:'amber', action:'comps',
    compDetails: { order:'#10215', item:'BBQ Wings × 2, House Burger × 1', amount:'$47.00', server:'Tom B. (Server #2)', terminal:'Terminal #1 – Front', reason:'Customer complaint — long wait', requested:'3 min ago' } },
  { icon:'❌', title:'Online Order Cancel', sub:'4 DoorDash orders auto-cancelled due to delay', sev:'low', color:'blue', action:'online' },
];

const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const defaultHours = [
  { open:'09:00', close:'22:00', enabled:true },
  { open:'09:00', close:'22:00', enabled:true },
  { open:'09:00', close:'23:00', enabled:true },
  { open:'09:00', close:'23:00', enabled:true },
  { open:'10:00', close:'00:00', enabled:true },
  { open:'10:00', close:'01:00', enabled:true },
  { open:'11:00', close:'21:00', enabled:true },
];

// ─────────────── DRAWER ───────────────
function toggleDrawer() {
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('drawerOverlay').classList.toggle('open');
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
}

// ─────────────── NAVIGATION ───────────────
const pageNames = { dashboard:'Dashboard', menu:'Menu Management', staff:'Staff', orders:'Orders', online:'Plum Ordering', store:'Store Controls', auth:'Authentication', alerts:'Alerts', devices:'Devices', tax:'Taxes', coupons:'Coupons & Discounts' };
const drnavMap = { dashboard:'drnav-dashboard', menu:'drnav-menu', staff:'drnav-staff', orders:'drnav-orders', online:'drnav-online', store:'drnav-store', auth:'drnav-auth', alerts:'drnav-alerts', devices:'drnav-devices', tax:'drnav-tax', coupons:'drnav-coupons' };

// ─────────────── REPORTS ───────────────
let _reportsOpen = false;
let _currentReport = null;
let _currentReportTab = 0;

const reportsMeta = {
  daily:  { title:'Daily Sales Report',  tabs:[] },
  weekly: { title:'Weekly Sales Report', tabs:[] },
  server: { title:'Server Report',       tabs:['Performance','Transactions']      },
  labour: { title:'Labour Report',       tabs:['Summary','Clock Details']         },
};

function toggleReportsDrawer(el) {
  const sub     = document.getElementById('reportsSubMenu');
  const chevron = document.getElementById('reportsChevron');
  const open    = sub.style.display !== 'none';
  sub.style.display = open ? 'none' : 'block';
  chevron.style.transform = open ? '' : 'rotate(180deg)';
  // Mark parent active when open
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (!open) el.classList.add('active');
}

function openReport(type) {
  _currentReport = type;
  _currentReportTab = 0;
  const meta = reportsMeta[type];
  document.getElementById('reportsPageTitle').textContent = meta.title;

  // Build tab bar — hide entirely if no tabs
  const tabBar = document.getElementById('reportsTypeTabs');
  if (meta.tabs.length === 0) {
    tabBar.innerHTML = '';
    tabBar.style.display = 'none';
  } else {
    tabBar.style.display = 'flex';
    tabBar.innerHTML = meta.tabs.map((t,i) => `
      <button class="report-tab${i===0?' active':''}" onclick="switchReportTab(${i})">${t}</button>
    `).join('');
  }

  renderReportBody(type, 0);

  const page = document.getElementById('reportsPage');
  page.style.display = 'flex';
  const hdr  = document.getElementById('reportsPageHeader');
  const body = document.getElementById('reportsPageBody');
  const isL  = isLight;
  if (isL) {
    page.style.background       = '#f2f4f8';
    hdr.style.background        = '#ffffff';
    hdr.style.borderBottomColor = '#e5e7eb';
    body.style.background       = '#f2f4f8';
  } else {
    page.style.background       = 'var(--surface)';
    hdr.style.background        = 'var(--surface)';
    hdr.style.borderBottomColor = 'var(--border)';
    body.style.background       = 'var(--surface2)';
  }

  // Mark sub-item active
  document.querySelectorAll('.nav-sub-item').forEach(n => n.classList.remove('active'));
  const subEl = document.getElementById('drnav-report-'+type);
  if (subEl) subEl.classList.add('active');
}

function closeReportsPage() {
  document.getElementById('reportsPage').style.display = 'none';
  _currentReport = null;
}

function switchReportTab(idx) {
  _currentReportTab = idx;
  document.querySelectorAll('.report-tab').forEach((t,i) => {
    t.classList.toggle('active', i === idx);
  });
  renderReportBody(_currentReport, idx);
  document.getElementById('reportsPageBody').scrollTop = 0;
}

function reportExport() {
  showSuccess('Exported', 'Report downloaded as CSV.');
}

function renderReportBody(type, tabIdx) {
  const isL      = isLight;
  const bdr      = isL ? '#e5e7eb' : 'var(--border)';
  const cardBg   = isL ? '#ffffff' : 'var(--surface)';
  const textMain = isL ? '#111827' : 'var(--text)';
  const textSub  = isL ? '#374151' : 'var(--text2)';
  const textMuted= isL ? '#9ca3af' : 'var(--text3)';
  const surface2 = isL ? '#f3f4f6' : 'var(--surface2)';

  const body = document.getElementById('reportsPageBody');

  // ── Date range selector (always shown) ──
  const dateBarHtml = `
    <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
      ${['Today','Yesterday','This Week','Last Week','This Month'].map((d,i)=>`
        <button onclick="this.parentNode.querySelectorAll('button').forEach(b=>b.style.background='transparent');this.parentNode.querySelectorAll('button').forEach(b=>{b.style.color='${textMuted}';b.style.borderColor='${bdr}'});this.style.background='rgba(124,58,237,.1)';this.style.color='var(--accent)';this.style.borderColor='var(--accent)'"
          style="padding:6px 12px;border-radius:20px;border:1.5px solid ${i===0?'var(--accent)':bdr};background:${i===0?'rgba(124,58,237,.1)':'transparent'};
            color:${i===0?'var(--accent)':textMuted};font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s;white-space:nowrap">${d}</button>`).join('')}
    </div>`;

  const kpiGrid = (items) => `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
      ${items.map(k=>`
        <div class="report-kpi" style="background:${cardBg};border-color:${bdr}">
          <div class="report-kpi-label" style="color:${textMuted}">${k.label}</div>
          <div class="report-kpi-val" style="color:${k.color||textMain}">${k.value}</div>
          ${k.sub ? `<div class="report-kpi-sub" style="color:${k.subColor||textMuted}">${k.sub}</div>` : ''}
        </div>`).join('')}
    </div>`;

  const sectionCard = (title, content) => `
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:16px;overflow:hidden;margin-bottom:12px">
      ${title ? `<div style="padding:14px 16px 10px;border-bottom:1px solid ${bdr}">
        <div style="font-size:13px;font-weight:800;color:${textMain}">${title}</div>
      </div>` : ''}
      ${content}
    </div>`;

  const tableRow = (cells, header=false) => `
    <div class="report-table-row" style="${header?'background:'+surface2+';cursor:default':''}">
      ${cells.map((c,i)=>`<div style="flex:${c.flex||1};font-size:${header?'10':'12'}px;font-weight:${header?'800':c.bold?'800':'500'};
        color:${header?textMuted:c.color||textSub};text-align:${c.align||'left'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        ${header?'text-transform:uppercase;letter-spacing:.06em':''}">${c.v}</div>`).join('')}
    </div>`;

  // ── DAILY SALES ──
  if (type === 'daily') {
    // Date navigator (matches screenshot: ‹ | 📅 May 19 '26 ▾ | ›)
    const dateNavHtml = `
      <div style="display:flex;align-items:center;justify-content:center;margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:0;background:${cardBg};border:1px solid ${bdr};border-radius:30px;padding:4px 6px;gap:6px">
          <button onclick="" style="width:28px;height:28px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:${textMuted};font-size:14px;border-radius:50%">‹</button>
          <div style="width:1px;height:20px;background:${bdr}"></div>
          <div style="display:flex;align-items:center;gap:7px;padding:0 8px;cursor:pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span style="font-size:13px;font-weight:700;color:${textMain}">May 19 '26</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style="width:1px;height:20px;background:${bdr}"></div>
          <button onclick="" style="width:28px;height:28px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:${textMuted};font-size:14px;border-radius:50%">›</button>
        </div>
      </div>`;

    // Shared helpers for this report's table style (matches screenshot: blue header row, alternating rows)
    const rptSection = (title, headerCells, rows, noDataMsg) => {
      const headerBg = isL ? '#b8d8e8' : 'rgba(107,168,194,.35)';
      const headerTxt = isL ? '#374151' : 'var(--text2)';
      const rowAlt    = isL ? '#f9fafb' : 'rgba(255,255,255,.03)';
      const rowBg     = cardBg;
      const emptyBg   = isL ? '#fff5f5' : 'rgba(239,68,68,.06)';

      const headerRow = `
        <div style="background:${headerBg};padding:10px 14px;display:flex;align-items:center;gap:8px">
          ${headerCells.map(h=>`<div style="flex:${h.flex||1};font-size:12px;font-weight:700;color:${headerTxt};text-align:${h.align||'left'}">${h.v}</div>`).join('')}
        </div>`;

      const dataRows = rows.length === 0 ? `
        <div style="background:${emptyBg};border-left:3px solid var(--red);padding:12px 14px;display:flex;align-items:center;gap:10px">
          <span style="font-size:12px;font-weight:600;color:var(--red)">No Data to Display</span>
        </div>` :
        rows.map((cells, ri) => `
          <div style="background:${ri%2===0?rowBg:rowAlt};padding:10px 14px;display:flex;align-items:center;gap:8px;border-top:1px solid ${bdr}">
            ${cells.map(c=>`<div style="flex:${c.flex||1};font-size:12px;font-weight:${c.bold?'700':'400'};color:${c.color||textSub};text-align:${c.align||'left'}">${c.v}</div>`).join('')}
          </div>`).join('');

      return `
        <div style="background:${cardBg};border:1px solid ${bdr};border-radius:14px;overflow:hidden;margin-bottom:10px">
          <div style="background:${headerBg};padding:11px 14px;text-align:center">
            <span style="font-size:13px;font-weight:700;color:${headerTxt}">${title}</span>
          </div>
          ${rows.length > 0 ? headerRow : ''}
          ${dataRows}
        </div>`;
    };

    const cv = (v) => ({v, align:'right'});
    const cb = (v, color) => ({v, align:'right', bold:true, color: color||textMain});

    body.innerHTML = dateNavHtml +

      // 1. Cash Reconciliation (full-width table, no header row cols, just name + # + amount)
      rptSection('Cash Reconciliation',
        [{v:'Cash Reconciliation',flex:2},{v:'#'},{v:'Amount ($)',align:'right'}],
        [
          [{v:'Gross Sales',flex:2},{v:''},{v:'5,713.17',align:'right',bold:true}],
          [{v:'Total Discount',flex:2},{v:''},{v:'365.30',align:'right'}],
          [{v:'Total tax',flex:2},{v:''},{v:'406.66',align:'right'}],
          [{v:'Total Gratuity',flex:2},{v:''},{v:'0.00',align:'right'}],
          [{v:'Total Transactions',flex:2},{v:'257'},{v:'0.00',align:'right'}],
          [{v:'Net Sales',flex:2},{v:''},{v:'4,941.21',align:'right',bold:true}],
          [{v:'Total Cash Dep...',flex:2},{v:''},{v:'1,062.00',align:'right'}],
          [{v:'Adjusted Gross...',flex:2},{v:''},{v:'5,307.38',align:'right'}],
          [{v:'Total Refund',flex:2},{v:''},{v:'0.00',align:'right'}],
          [{v:'Gift Card Issued',flex:2},{v:''},{v:'0.00',align:'right'}],
          [{v:'Gift Card Reload...',flex:2},{v:''},{v:'0.00',align:'right'}],
          [{v:'Total Service C...',flex:2},{v:''},{v:'0.00',align:'right'}],
          [{v:'Exempt Sales',flex:2},{v:''},{v:'0.00',align:'right'}],
          [{v:'Total Tips',flex:2},{v:''},{v:'79.53',align:'right',bold:true}],
        ]) +

      // 2. Sales By Minor Category
      rptSection('Sales By Minor Category',
        [{v:'Name',flex:1.5},{v:'Net Sales ($)',align:'right'},{v:'Net Sales %',align:'right'}],
        [
          [{v:'Adult Beverage',flex:1.5},cv('678.41'),cv('13.68')],
          [{v:'Adult Buffet',flex:1.5},cv('2,735.17'),cv('55.14')],
          [{v:'Charges',flex:1.5},cv('19.12'),cv('0.39')],
          [{v:'Child Beverage',flex:1.5},cv('35.99'),cv('0.73')],
          [{v:'Child Buffet',flex:1.5},cv('185.28'),cv('3.74')],
          [{v:'CYO Pizza',flex:1.5},cv('340.37'),cv('6.86')],
          [{v:'OLO Deals',flex:1.5},cv('116.95'),cv('2.36')],
          [{v:'Sides & Desserts',flex:1.5},cv('218.28'),cv('4.40')],
          [{v:'Specialty Pizza',flex:1.5},cv('446.93'),cv('9.01')],
          [{v:'Toppings',flex:1.5},cv('40.57'),cv('0.82')],
          [{v:'Wings',flex:1.5},cv('143.26'),cv('2.89')],
        ]) +

      // 3. Sales By Daypart
      rptSection('Sales By Daypart',
        [{v:'Name',flex:1.5},{v:'Net Sales ($)',align:'right'},{v:'Net Sales %',align:'right'}],
        [
          [{v:'Dinner',flex:1.5},cv('3,013.30'),cv('60.98')],
          [{v:'Lunch',flex:1.5},cv('1,927.91'),cv('39.02')],
        ]) +

      // 4. Surcharge Details — no data
      rptSection('Surcharge Details',
        [{v:'Name'},{v:'Amount ($)',align:'right'}],
        []) +

      // 5. Payment By Mode
      rptSection('Payment By Mode',
        [{v:'Name',flex:1.5},{v:'# Payments',align:'right'},{v:'Amount ($)',align:'right'}],
        [
          [{v:'American Expr...',flex:1.5},cv('4'),cv('110.68')],
          [{v:'Cash',flex:1.5},cb('56'),cv('1,062.53')],
          [{v:'Discover',flex:1.5},cv('6'),cv('115.84')],
          [{v:'Doordash',flex:1.5},cv('10'),cv('225.35')],
          [{v:'Master Card',flex:1.5},cb('52'),cv('1,001.09')],
          [{v:'OLO Credit Card',flex:1.5},cv('11'),cv('318.92')],
          [{v:'OLO Gift Card',flex:1.5},cv('10'),cv('216.35')],
          [{v:'Ubereats',flex:1.5},cv('6'),cv('157.94')],
          [{v:'Visa',flex:1.5},cb('104'),cv('2,159.16')],
        ]) +

      // 6. Sales By Type/Revenue Center
      rptSection('Sales By Type/Revenue Center',
        [{v:'Name',flex:1.5},{v:'# Check',align:'right'},{v:'Net Sales ($)',align:'right'}],
        [
          [{v:'Dine IN',flex:1.5},cv('196'),cv('3,716.92')],
          [{v:'DOORDASH',flex:1.5},cv('0'),cv('208.33')],
          [{v:'OLO',flex:1.5},cv('0'),cv('551.64')],
          [{v:'OLO Dispatch',flex:1.5},cv('2'),cv('68.91')],
          [{v:'OLO Doordash...',flex:1.5},cv('10'),cv('208.33')],
          [{v:'OLO Pickup',flex:1.5},cv('25'),cv('482.73')],
          [{v:'OLO UberEats...',flex:1.5},cv('6'),cv('145.90')],
          [{v:'Takeout',flex:1.5},cv('2'),cv('8.99')],
          [{v:'ToGo',flex:1.5},cv('16'),cv('309.43')],
          [{v:'UBER',flex:1.5},cv('0'),cv('145.90')],
        ]) +

      // 7. Bank Deposit
      rptSection('Bank Deposit',
        [{v:'Name'},{v:'Amount ($)',align:'right'}],
        [
          [{v:'Maria Isabel Velazquez'},cv('1,062.00')],
        ]) +

      // 8. Paid In/Out — no data
      rptSection('Paid In/Out',
        [{v:'Name'},{v:'Amount ($)',align:'right'}],
        []) +

      // 9. Discounts
      rptSection('Discounts',
        [{v:'Name',flex:1.5},{v:'# Discount',align:'right'},{v:'Amount ($)',align:'right'}],
        [
          [{v:'$ Off - 10006',flex:1.5},cv('2'),cv('7.00')],
          [{v:'$5.99 Adult Buf...',flex:1.5},cv('10'),cv('40.00')],
          [{v:'10% - 10001',flex:1.5},cv('7'),cv('17.75')],
          [{v:'AARP 15%',flex:1.5},cv('1'),cv('5.18')],
          [{v:'Loyalty Discount',flex:1.5},cv('46'),cv('292.18')],
          [{v:'Military Discount',flex:1.5},cv('1'),cv('1.00')],
          [{v:'OLO Discount',flex:1.5},cv('1'),cv('2.19')],
        ]) +

      // 10. Timeslip(s) Details
      rptSection('Timeslip(s) Details',
        [{v:'Name',flex:1.5},{v:'Net Sales ($)',align:'right'},{v:'Open Cash',align:'right'}],
        [
          [{v:'Henry Zelada-c...',flex:1.5},cv('30.15'),cv('200.00')],
          [{v:'Maria Isabel Ve...',flex:1.5},cv('4,015.41'),cv('200.00')],
          [{v:'Maria Isabel Ve...',flex:1.5},cv('0.00'),cv('0.00')],
          [{v:'Outstore Order',flex:1.5},cv('908.76'),cv('0.00')],
        ]) +

      // 11. Cash Drop(s) Detail — no data
      rptSection('Cash Drop(s) Detail',
        [{v:'Name'},{v:'Amount ($)',align:'right'}],
        []) +

      // 12. Voids
      rptSection('Voids',
        [{v:'Name',flex:1.5},{v:'# Voids',align:'right'},{v:'Amount ($)',align:'right'}],
        [
          [{v:'Cancelled Order',flex:1.5},cv('27'),cv('147.04')],
        ]) +

      // 13. Comps — no data
      rptSection('Comps',
        [{v:'Name'},{v:'# Comps',align:'right'},{v:'Amount ($)',align:'right'}],
        []) +

      // 14. House Detail — no data
      rptSection('House Detail',
        [{v:'Name'},{v:'Amount ($)',align:'right'}],
        []) +

      // 15. Taxes
      rptSection('Taxes',
        [{v:'Name'},{v:'Amount ($)',align:'right'}],
        [
          [{v:'State Tax'},cv('407.53')],
        ]) +

      // 16. Miscellaneous
      rptSection('Miscellaneous',
        [{v:'Name'},{v:'Amount ($)',align:'right'}],
        [
          [{v:'Surcharges'},cv('0.00')],
          [{v:'Gift Cert/Card'},cv('0.00')],
          [{v:'Gc comps'},cv('41.00')],
          [{v:'Refunded Tax'},cv('0.00')],
          [{v:'Deposit Tender'},cv('0.00')],
          [{v:'All Tips'},cv('79.53')],
        ]);

  // ── WEEKLY SALES ──
  } else if (type === 'weekly') {
    // Date range navigator pill (matches screenshot)
    const weekNavHtml = `
      <div style="display:flex;align-items:center;justify-content:center;margin-bottom:16px">
        <div style="display:flex;align-items:center;background:${cardBg};border:1px solid ${bdr};border-radius:30px;padding:4px 6px;gap:6px">
          <button style="width:28px;height:28px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:${textMuted};font-size:14px;border-radius:50%">‹</button>
          <div style="width:1px;height:20px;background:${bdr}"></div>
          <div style="display:flex;align-items:center;gap:7px;padding:0 8px;cursor:pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span style="font-size:13px;font-weight:700;color:${textMain}">May 18 '26 – May 24 '26</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style="width:1px;height:20px;background:${bdr}"></div>
          <button style="width:28px;height:28px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:${textMuted};font-size:14px;border-radius:50%">›</button>
        </div>
      </div>`;

    // Column definitions — Week to Date + each day
    const cols = [
      { label:'Week to Date', data:{cashRecon:{gross:'12,803.84',disc:'975.65',tax:'899.67',txnCount:'558',net:'10,928.52',nonRev:'19.12',cashDep:'1,757.09',adjGross:'12,823.83',tips:'211.85'}, payments:{amex:['7','164.70'],cash:['115','2,104.15'],disc:['18','342.80'],door:['22','518.46'],grub:['1','21.65'],mc:['108','2,085.67'],oloCC:['17','508.48'],oloGC:['14','307.58'],uber:['14','437.58'],visa:['247','5,357.11']}, rcenter:{dineIn:['—','—'],doordash:['—','—'],grubhub:['—','—'],olo:['—','—'],oloDisp:['—','—'],oloDDpickup:['—','—'],oloGHpickup:['—','—'],oloPickup:['—','—'],oloUEpickup:['—','—'],takeout:['—','—'],togo:['—','—'],uber:['—','—']}, minorCat:{adultBev:'—',adultBuf:'—',charges:'—',childBev:'—',childBuf:'—',cyoPizza:'—',oloDeal:'—',sides:'—',specPizza:'—',toppings:'—',wings:'—'}, daypart:{dinner:'—',lunch:'—'}, deposit:{maria:'—'}, paidInOut:{window:'—'}, discounts:{off10006:'—',one80044:'—',buffet23054:'—',ten10001:'—',aarp:'—',bogo:'—',free:'—',loyalty:'—',military:'—',olo:'—'}, voids:{cancelled:'—'}, comps:'—', house:'—' } },
      { label:'Monday', data:{cashRecon:{gross:'6,048.01',disc:'595.68',tax:'414.70',txnCount:'253',net:'5,037.63',nonRev:'0.00',cashDep:'695.09',adjGross:'6,048.01',tips:'112.05'}, payments:{amex:['1','29.16'],cash:['45','755.09'],disc:['10','188.04'],door:['12','293.11'],grub:['1','21.65'],mc:['45','832.75'],oloCC:['6','189.56'],oloGC:['4','91.23'],uber:['7','224.05'],visa:['125','2,827.69']}, rcenter:{dineIn:['—','—'],doordash:['—','—'],grubhub:['—','—'],olo:['—','—'],oloDisp:['—','—'],oloDDpickup:['—','—'],oloGHpickup:['—','—'],oloPickup:['—','—'],oloUEpickup:['—','—'],takeout:['—','—'],togo:['—','—'],uber:['—','—']}, minorCat:{adultBev:'—',adultBuf:'—',charges:'—',childBev:'—',childBuf:'—',cyoPizza:'—',oloDeal:'—',sides:'—',specPizza:'—',toppings:'—',wings:'—'}, daypart:{dinner:'—',lunch:'—'}, deposit:{maria:'—'}, paidInOut:{window:'—'}, discounts:{off10006:'—',one80044:'—',buffet23054:'—',ten10001:'—',aarp:'—',bogo:'—',free:'—',loyalty:'—',military:'—',olo:'—'}, voids:{cancelled:'—'}, comps:'—', house:'—' } },
      { label:'Tuesday', data:{cashRecon:{gross:'5,713.17',disc:'365.30',tax:'406.66',txnCount:'257',net:'4,941.21',nonRev:'19.12',cashDep:'1,062.00',adjGross:'5,733.16',tips:'79.53'}, payments:{amex:['4','110.68'],cash:['56','1,062.53'],disc:['6','115.84'],door:['10','225.35'],grub:['—','—'],mc:['52','1,001.09'],oloCC:['11','318.92'],oloGC:['10','216.35'],uber:['6','157.94'],visa:['104','2,159.16']}, rcenter:{dineIn:['—','—'],doordash:['—','—'],grubhub:['—','—'],olo:['—','—'],oloDisp:['—','—'],oloDDpickup:['—','—'],oloGHpickup:['—','—'],oloPickup:['—','—'],oloUEpickup:['—','—'],takeout:['—','—'],togo:['—','—'],uber:['—','—']}, minorCat:{adultBev:'—',adultBuf:'—',charges:'—',childBev:'—',childBuf:'—',cyoPizza:'—',oloDeal:'—',sides:'—',specPizza:'—',toppings:'—',wings:'—'}, daypart:{dinner:'—',lunch:'—'}, deposit:{maria:'—'}, paidInOut:{window:'—'}, discounts:{off10006:'—',one80044:'—',buffet23054:'—',ten10001:'—',aarp:'—',bogo:'—',free:'—',loyalty:'—',military:'—',olo:'—'}, voids:{cancelled:'—'}, comps:'—', house:'—' } },
      { label:'Wednesday', data:{cashRecon:{gross:'1,042.66',disc:'14.67',tax:'78.31',txnCount:'48',net:'949.68',nonRev:'0.00',cashDep:'0.00',adjGross:'1,042.66',tips:'20.27'}, payments:{amex:['2','24.86'],cash:['14','286.53'],disc:['2','38.92'],door:['—','—'],grub:['—','—'],mc:['11','251.83'],oloCC:['—','—'],oloGC:['—','—'],uber:['1','55.59'],visa:['18','370.26']}, rcenter:{dineIn:['—','—'],doordash:['—','—'],grubhub:['—','—'],olo:['—','—'],oloDisp:['—','—'],oloDDpickup:['—','—'],oloGHpickup:['—','—'],oloPickup:['—','—'],oloUEpickup:['—','—'],takeout:['—','—'],togo:['—','—'],uber:['—','—']}, minorCat:{adultBev:'—',adultBuf:'—',charges:'—',childBev:'—',childBuf:'—',cyoPizza:'—',oloDeal:'—',sides:'—',specPizza:'—',toppings:'—',wings:'—'}, daypart:{dinner:'—',lunch:'—'}, deposit:{maria:'—'}, paidInOut:{window:'—'}, discounts:{off10006:'—',one80044:'—',buffet23054:'—',ten10001:'—',aarp:'—',bogo:'—',free:'—',loyalty:'—',military:'—',olo:'—'}, voids:{cancelled:'—'}, comps:'—', house:'—' } },
      { label:'Thursday', data:{cashRecon:{gross:'—',disc:'—',tax:'—',txnCount:'—',net:'—',nonRev:'—',cashDep:'—',adjGross:'—',tips:'—'}, payments:{amex:['—','—'],cash:['—','—'],disc:['—','—'],door:['—','—'],grub:['—','—'],mc:['—','—'],oloCC:['—','—'],oloGC:['—','—'],uber:['—','—'],visa:['—','—']}, rcenter:{dineIn:['—','—'],doordash:['—','—'],grubhub:['—','—'],olo:['—','—'],oloDisp:['—','—'],oloDDpickup:['—','—'],oloGHpickup:['—','—'],oloPickup:['—','—'],oloUEpickup:['—','—'],takeout:['—','—'],togo:['—','—'],uber:['—','—']}, minorCat:{adultBev:'—',adultBuf:'—',charges:'—',childBev:'—',childBuf:'—',cyoPizza:'—',oloDeal:'—',sides:'—',specPizza:'—',toppings:'—',wings:'—'}, daypart:{dinner:'—',lunch:'—'}, deposit:{maria:'—'}, paidInOut:{window:'—'}, discounts:{off10006:'—',one80044:'—',buffet23054:'—',ten10001:'—',aarp:'—',bogo:'—',free:'—',loyalty:'—',military:'—',olo:'—'}, voids:{cancelled:'—'}, comps:'—', house:'—' } },
      { label:'Friday',   data:{cashRecon:{gross:'—',disc:'—',tax:'—',txnCount:'—',net:'—',nonRev:'—',cashDep:'—',adjGross:'—',tips:'—'}, payments:{amex:['—','—'],cash:['—','—'],disc:['—','—'],door:['—','—'],grub:['—','—'],mc:['—','—'],oloCC:['—','—'],oloGC:['—','—'],uber:['—','—'],visa:['—','—']}, rcenter:{dineIn:['—','—'],doordash:['—','—'],grubhub:['—','—'],olo:['—','—'],oloDisp:['—','—'],oloDDpickup:['—','—'],oloGHpickup:['—','—'],oloPickup:['—','—'],oloUEpickup:['—','—'],takeout:['—','—'],togo:['—','—'],uber:['—','—']}, minorCat:{adultBev:'—',adultBuf:'—',charges:'—',childBev:'—',childBuf:'—',cyoPizza:'—',oloDeal:'—',sides:'—',specPizza:'—',toppings:'—',wings:'—'}, daypart:{dinner:'—',lunch:'—'}, deposit:{maria:'—'}, paidInOut:{window:'—'}, discounts:{off10006:'—',one80044:'—',buffet23054:'—',ten10001:'—',aarp:'—',bogo:'—',free:'—',loyalty:'—',military:'—',olo:'—'}, voids:{cancelled:'—'}, comps:'—', house:'—' } },
      { label:'Saturday', data:{cashRecon:{gross:'—',disc:'—',tax:'—',txnCount:'—',net:'—',nonRev:'—',cashDep:'—',adjGross:'—',tips:'—'}, payments:{amex:['—','—'],cash:['—','—'],disc:['—','—'],door:['—','—'],grub:['—','—'],mc:['—','—'],oloCC:['—','—'],oloGC:['—','—'],uber:['—','—'],visa:['—','—']}, rcenter:{dineIn:['—','—'],doordash:['—','—'],grubhub:['—','—'],olo:['—','—'],oloDisp:['—','—'],oloDDpickup:['—','—'],oloGHpickup:['—','—'],oloPickup:['—','—'],oloUEpickup:['—','—'],takeout:['—','—'],togo:['—','—'],uber:['—','—']}, minorCat:{adultBev:'—',adultBuf:'—',charges:'—',childBev:'—',childBuf:'—',cyoPizza:'—',oloDeal:'—',sides:'—',specPizza:'—',toppings:'—',wings:'—'}, daypart:{dinner:'—',lunch:'—'}, deposit:{maria:'—'}, paidInOut:{window:'—'}, discounts:{off10006:'—',one80044:'—',buffet23054:'—',ten10001:'—',aarp:'—',bogo:'—',free:'—',loyalty:'—',military:'—',olo:'—'}, voids:{cancelled:'—'}, comps:'—', house:'—' } },
      { label:'Sunday',   data:{cashRecon:{gross:'—',disc:'—',tax:'—',txnCount:'—',net:'—',nonRev:'—',cashDep:'—',adjGross:'—',tips:'—'}, payments:{amex:['—','—'],cash:['—','—'],disc:['—','—'],door:['—','—'],grub:['—','—'],mc:['—','—'],oloCC:['—','—'],oloGC:['—','—'],uber:['—','—'],visa:['—','—']}, rcenter:{dineIn:['—','—'],doordash:['—','—'],grubhub:['—','—'],olo:['—','—'],oloDisp:['—','—'],oloDDpickup:['—','—'],oloGHpickup:['—','—'],oloPickup:['—','—'],oloUEpickup:['—','—'],takeout:['—','—'],togo:['—','—'],uber:['—','—']}, minorCat:{adultBev:'—',adultBuf:'—',charges:'—',childBev:'—',childBuf:'—',cyoPizza:'—',oloDeal:'—',sides:'—',specPizza:'—',toppings:'—',wings:'—'}, daypart:{dinner:'—',lunch:'—'}, deposit:{maria:'—'}, paidInOut:{window:'—'}, discounts:{off10006:'—',one80044:'—',buffet23054:'—',ten10001:'—',aarp:'—',bogo:'—',free:'—',loyalty:'—',military:'—',olo:'—'}, voids:{cancelled:'—'}, comps:'—', house:'—' } },
    ];

    // ── Table styling
    const hdrBg  = isL ? '#b8d8e8' : 'rgba(107,168,194,.35)';
    const hdrTxt = isL ? '#374151' : 'var(--text2)';
    const rowAlt = isL ? '#f0f7fb' : 'rgba(107,168,194,.08)';
    const pinW   = 130; // px width of pinned left column
    const colW   = 120; // px width of each data column
    const numCols = cols.length;

    // Helper: value cell — shows # and Amount side by side
    const valCells = (num, amt) => `
      <div style="width:${colW}px;flex-shrink:0;display:flex;gap:0;border-left:1px solid ${bdr}">
        <div style="flex:1;text-align:center;font-size:11px;color:${num==='—'?textMuted:textSub};padding:8px 4px;border-right:1px solid ${bdr}">${num}</div>
        <div style="flex:1.4;text-align:right;font-size:11px;color:${amt==='—'?textMuted:textMain};padding:8px 6px 8px 4px;font-weight:${amt==='—'?'400':'600'}">${amt}</div>
      </div>`;

    // Helper: single-value cell (for Cash Recon which has no # column)
    const singleCell = (val) => `
      <div style="width:${colW}px;flex-shrink:0;border-left:1px solid ${bdr};text-align:right;font-size:11px;color:${val==='—'?textMuted:textMain};padding:8px 8px;font-weight:${val==='—'?'400':'600'}">${val}</div>`;

    // Section header row (blue, spans full width)
    const sectionHeaderRow = (label, showHash) => `
      <div style="display:flex;position:sticky;left:0;z-index:2">
        <div style="width:${pinW}px;flex-shrink:0;background:${hdrBg};padding:9px 10px;font-size:12px;font-weight:700;color:${hdrTxt};border-bottom:1px solid rgba(0,0,0,.08)">${label}</div>
        ${cols.map(c=>`
          <div style="width:${colW}px;flex-shrink:0;background:${hdrBg};border-left:1px solid rgba(0,0,0,.08);padding:9px 6px;display:flex;gap:0">
            ${showHash ? `<div style="flex:1;text-align:center;font-size:11px;font-weight:700;color:${hdrTxt}">#</div><div style="flex:1.4;text-align:right;font-size:11px;font-weight:700;color:${hdrTxt}">Amount($)</div>` : `<div style="flex:1;text-align:right;font-size:11px;font-weight:700;color:${hdrTxt}">Amount($)</div>`}
          </div>`).join('')}
      </div>`;

    // Data row
    const dataRow = (label, getCells, rowIdx) => {
      const bg = rowIdx % 2 === 0 ? cardBg : rowAlt;
      return `
        <div style="display:flex;min-width:${pinW + colW * numCols}px">
          <div style="width:${pinW}px;flex-shrink:0;background:${bg};padding:8px 10px;font-size:12px;color:${textSub};border-bottom:1px solid ${bdr};position:sticky;left:0;z-index:1">${label}</div>
          ${cols.map((c,ci) => `<div style="background:${bg};border-bottom:1px solid ${bdr}">${getCells(c.data, ci)}</div>`).join('')}
        </div>`;
    };

    // Build all rows
    let rowIdx = 0;
    const cashRows = [
      ['Gross Sales',              (d)=>singleCell(d.cashRecon.gross)],
      ['Total Discount',           (d)=>singleCell(d.cashRecon.disc)],
      ['Total tax',                (d)=>singleCell(d.cashRecon.tax)],
      ['Total Transaction Count',  (d)=>singleCell(d.cashRecon.txnCount)],
      ['Net Sales',                (d)=>singleCell(d.cashRecon.net)],
      ['Non Revenue Sales',        (d)=>singleCell(d.cashRecon.nonRev)],
      ['Total Cash Deposit',       (d)=>singleCell(d.cashRecon.cashDep)],
      ['Adjusted Gross Sales',     (d)=>singleCell(d.cashRecon.adjGross)],
      ['Total Tips',               (d)=>singleCell(d.cashRecon.tips)],
    ];
    const payRows = [
      ['American Express', (d)=>valCells(...d.payments.amex)],
      ['Cash',             (d)=>valCells(...d.payments.cash)],
      ['Discover',         (d)=>valCells(...d.payments.disc)],
      ['Doordash',         (d)=>valCells(...d.payments.door)],
      ['Grubhub',          (d)=>valCells(...d.payments.grub)],
      ['Master Card',      (d)=>valCells(...d.payments.mc)],
      ['OLO Credit Card',  (d)=>valCells(...d.payments.oloCC)],
      ['OLO Gift Card',    (d)=>valCells(...d.payments.oloGC)],
      ['Ubereats',         (d)=>valCells(...d.payments.uber)],
      ['Visa',             (d)=>valCells(...d.payments.visa)],
    ];
    const rcRows = [
      ['Dine IN',              (d)=>valCells(...d.rcenter.dineIn)],
      ['DOORDASH',             (d)=>valCells(...d.rcenter.doordash)],
      ['GRUBHUB',              (d)=>valCells(...d.rcenter.grubhub)],
      ['OLO',                  (d)=>valCells(...d.rcenter.olo)],
      ['OLO Dispatch',         (d)=>valCells(...d.rcenter.oloDisp)],
      ['OLO Doordash Pickup',  (d)=>valCells(...d.rcenter.oloDDpickup)],
      ['OLO Grubhub Pickup',   (d)=>valCells(...d.rcenter.oloGHpickup)],
      ['OLO Pickup',           (d)=>valCells(...d.rcenter.oloPickup)],
      ['OLO UberEats Pickup',  (d)=>valCells(...d.rcenter.oloUEpickup)],
      ['Takeout',              (d)=>valCells(...d.rcenter.takeout)],
      ['ToGo',                 (d)=>valCells(...d.rcenter.togo)],
      ['UBER',                 (d)=>valCells(...d.rcenter.uber)],
    ];
    const minorRows = [
      ['Adult Beverage',  (d)=>valCells('—',d.minorCat.adultBev)],
      ['Adult Buffet',    (d)=>valCells('—',d.minorCat.adultBuf)],
      ['Charges',         (d)=>valCells('—',d.minorCat.charges)],
      ['Child Beverage',  (d)=>valCells('—',d.minorCat.childBev)],
      ['Child Buffet',    (d)=>valCells('—',d.minorCat.childBuf)],
      ['CYO Pizza',       (d)=>valCells('—',d.minorCat.cyoPizza)],
      ['OLO Deals',       (d)=>valCells('—',d.minorCat.oloDeal)],
      ['Sides & Desserts',(d)=>valCells('—',d.minorCat.sides)],
      ['Specialty Pizza', (d)=>valCells('—',d.minorCat.specPizza)],
      ['Toppings',        (d)=>valCells('—',d.minorCat.toppings)],
      ['Wings',           (d)=>valCells('—',d.minorCat.wings)],
    ];
    const daypartRows = [
      ['Dinner', (d)=>valCells('—',d.daypart.dinner)],
      ['Lunch',  (d)=>valCells('—',d.daypart.lunch)],
    ];
    const depositRows = [
      ['Maria Isabel Velazquez', (d)=>valCells('—',d.deposit.maria)],
    ];
    const paidInOutRows = [
      ['Window Cleaning', (d)=>valCells('—',d.paidInOut.window)],
    ];
    const discountRows = [
      ['$ Off - 10006',              (d)=>valCells('—',d.discounts.off10006)],
      ['$1 - 80044',                 (d)=>valCells('—',d.discounts.one80044)],
      ['$5.99 Adult Buffet - 23054', (d)=>valCells('—',d.discounts.buffet23054)],
      ['10% - 10001',                (d)=>valCells('—',d.discounts.ten10001)],
      ['AARP 15%',                   (d)=>valCells('—',d.discounts.aarp)],
      ['BOGO AB + Drink (40621)',     (d)=>valCells('—',d.discounts.bogo)],
      ['Free KC w/ AB Purchase...',  (d)=>valCells('—',d.discounts.free)],
      ['Loyalty Discount',           (d)=>valCells('—',d.discounts.loyalty)],
      ['Military Discount',          (d)=>valCells('—',d.discounts.military)],
      ['OLO Discount',               (d)=>valCells('—',d.discounts.olo)],
    ];
    const voidRows = [
      ['Cancelled Order', (d)=>valCells('—',d.voids.cancelled)],
    ];

    const buildSection = (label, showHash, rows) => {
      rowIdx = 0;
      return sectionHeaderRow(label, showHash) +
        rows.map(([lbl, fn]) => dataRow(lbl, fn, rowIdx++)).join('');
    };

    // Sticky column header row (All Days | day names)
    const colHeaderRow = `
      <div style="display:flex;position:sticky;top:0;z-index:3;min-width:${pinW + colW * numCols}px">
        <div style="width:${pinW}px;flex-shrink:0;background:${hdrBg};padding:10px;font-size:12px;font-weight:700;color:${hdrTxt};border-bottom:2px solid rgba(0,0,0,.12);position:sticky;left:0;z-index:4">All Days</div>
        ${cols.map(c=>`
          <div style="width:${colW}px;flex-shrink:0;background:${hdrBg};border-left:1px solid rgba(0,0,0,.08);padding:10px 6px;text-align:center;font-size:12px;font-weight:700;color:${hdrTxt};border-bottom:2px solid rgba(0,0,0,.12)">${c.label}</div>`).join('')}
      </div>`;

    // Assemble full matrix
    const matrixHtml = `
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid ${bdr};border-radius:14px;background:${cardBg}">
        <div style="min-width:${pinW + colW * numCols}px">
          ${colHeaderRow}
          ${buildSection('Cash Reconciliation', false, cashRows)}
          ${buildSection('Payment By Mode', true, payRows)}
          ${buildSection('Sales By Type/Revenue Center', true, rcRows)}
          ${buildSection('Sales By Minor Category', true, minorRows)}
          ${buildSection('Sales By Daypart', true, daypartRows)}
          ${buildSection('Deposit', true, depositRows)}
          ${buildSection('Paid In/Out', true, paidInOutRows)}
          ${buildSection('Discounts', true, discountRows)}
          ${buildSection('Voids', true, voidRows)}
          ${buildSection('Comps', true, [['—', (d)=>valCells('—','—')]])}
          ${buildSection('House Detail', true, [['—', (d)=>valCells('—','—')]])}
        </div>
      </div>`;

    body.innerHTML = weekNavHtml + matrixHtml;

  // ── SERVER REPORT ──
  } else if (type === 'server') {
    if (tabIdx === 0) { // Performance
      body.innerHTML = dateBarHtml +
        sectionCard('Server Performance', `
          ${tableRow([{v:'Server'},{v:'Orders',align:'right',flex:.7},{v:'Sales',align:'right'},{v:'Avg',align:'right',flex:.7},{v:'Tips',align:'right',flex:.7}], true)}
          ${[
            ['Sarah M.',  '34','$687','$20','$82'],
            ['Jake R.',   '28','$543','$19','$71'],
            ['Tom B.',    '21','$413','$20','$54'],
            ['Lisa M.',   '18','$893','$50','$124'],
            ['Marcus J.', '15','$299','$20','$38'],
            ['Dana H.',   '9', '$187','$21','$26'],
            ['Amy K.',    '0', '—',   '—',  '—'],
          ].map(r=>tableRow([{v:r[0],bold:true,color:textMain},{v:r[1],align:'right',flex:.7},{v:r[2],align:'right',bold:true,color:'var(--green)'},{v:r[3],align:'right',flex:.7},{v:r[4],align:'right',flex:.7,color:'var(--accent)'}])).join('')}
        `) +
        kpiGrid([
          {label:'Top Server',     value:'Lisa M.',  sub:'$893 sales today', subColor:'var(--green)'},
          {label:'Top Avg Check',  value:'$50',      sub:'Lisa M.',          subColor:textMuted},
          {label:'Total Tips',     value:'$395',     sub:'All servers today', subColor:'var(--accent)'},
          {label:'Total Labor $',  value:'$448',     sub:'8 clocked in',     subColor:textMuted},
        ]);
    } else { // Transactions
      body.innerHTML = dateBarHtml +
        sectionCard('Voids & Comps Today', `
          ${tableRow([{v:'Server'},{v:'Voids',align:'right',flex:.6},{v:'Comps',align:'right',flex:.6},{v:'Refunds',align:'right',flex:.7}], true)}
          ${[
            ['Jake R.',  '5','$47','$0'],
            ['Sarah M.', '1','$0', '$18'],
            ['Tom B.',   '0','$12','$0'],
            ['Lisa M.',  '0','$0', '$0'],
          ].map(r=>tableRow([{v:r[0],bold:true,color:textMain},{v:r[1],align:'right',flex:.6,color:r[1]!=='0'?'var(--red)':textMuted},{v:r[2],align:'right',flex:.6,color:r[2]!=='$0'?'var(--amber)':textMuted},{v:r[3],align:'right',flex:.7,color:r[3]!=='$0'?'var(--amber)':textMuted}])).join('')}
        `);
    }

  // ── LABOUR REPORT ──
  } else if (type === 'labour') {
    if (tabIdx === 0) { // Summary
      body.innerHTML = dateBarHtml +
        kpiGrid([
          {label:'Total Labor Cost',  value:'$448',   sub:'Today',              subColor:textMuted},
          {label:'Labor %',           value:'9.3%',   sub:'▼ Target <30%',      subColor:'var(--green)'},
          {label:'Clocked In Now',    value:'8',      sub:'6 active · 2 break', subColor:textMuted},
          {label:'Avg Hourly Rate',   value:'$14.25', sub:'Across all staff',   subColor:textMuted},
        ]) +
        sectionCard('Staff Hours Today', `
          ${tableRow([{v:'Name'},{v:'Role',flex:.8},{v:'Hours',align:'right',flex:.6},{v:'Cost',align:'right',flex:.7},{v:'Status',align:'right'}], true)}
          ${[
            ['Sarah M.',  'Server',    '6h 38m','$92.9', '🟢 In Shift'],
            ['Tom B.',    'Server',    '6h 25m','$89.8', '🟡 Break'],
            ['Jake R.',   'Server',    '5h 40m','$79.3', '🟢 In Shift'],
            ['Amy K.',    'Host',      '5h 10m','$67.2', '🟢 In Shift'],
            ['Lisa M.',   'Bartender', '4h 40m','$74.5', '🟢 In Shift'],
            ['Marcus J.', 'Server',    '4h 10m','$58.3', '🟢 In Shift'],
            ['Dana H.',   'Server',    '2h 0m', '$28.0', '🟢 In Shift'],
            ['Felix D.',  'Busser',    '1h 30m','$18.0', '🟡 Break'],
          ].map(r=>tableRow([{v:r[0],bold:true,color:textMain},{v:r[1],flex:.8,color:textMuted},{v:r[2],align:'right',flex:.6},{v:r[3],align:'right',flex:.7,color:'var(--accent)'},{v:r[4],align:'right',color:r[4].includes('🟢')?'var(--green)':'var(--amber)'}])).join('')}
        `);
    } else { // Clock Details
      body.innerHTML = dateBarHtml +
        sectionCard('Clock In / Out Log', `
          ${tableRow([{v:'Name'},{v:'Clock In',flex:.8},{v:'Clock Out',flex:.8},{v:'Total',align:'right',flex:.6}], true)}
          ${[
            ['Nina C.',  '8:00 AM','2:00 PM','6h 0m'],
            ['Omar F.',  '10:00 AM','4:00 PM','6h 0m'],
            ['Sarah M.', '9:02 AM','—','6h 38m+'],
            ['Tom B.',   '9:15 AM','—','6h 25m+'],
            ['Jake R.',  '10:00 AM','—','5h 40m+'],
            ['Amy K.',   '10:30 AM','—','5h 10m+'],
            ['Lisa M.',  '11:00 AM','—','4h 40m+'],
            ['Marcus J.','11:30 AM','—','4h 10m+'],
            ['Dana H.',  '2:00 PM','—','2h 0m+'],
            ['Felix D.', '2:30 PM','—','1h 30m+'],
          ].map(r=>tableRow([{v:r[0],bold:true,color:textMain},{v:r[1],flex:.8},{v:r[2],flex:.8,color:r[2]==='—'?'var(--amber)':textSub},{v:r[3],align:'right',flex:.6,color:r[3].includes('+')?'var(--green)':textMuted}])).join('')}
        `);
    }
  }
}

function navTo(page, el, navId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.getElementById('pageTitle').textContent = pageNames[page];
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const targetId = navId || drnavMap[page];
  if (targetId) document.getElementById(targetId)?.classList.add('active');
  // Sync bottom nav active state
  document.querySelectorAll('.bnav-item').forEach(n => n.classList.remove('active'));
  const bnavEl = document.getElementById('bnav-'+page);
  if (bnavEl) bnavEl.classList.add('active');
  if (page === 'orders') renderOrdersPage();
  if (page === 'devices') renderDevicesPage();
  if (page === 'staff')  { renderStaffDashCard(); renderStaffPage(); }
  if (page === 'menu')   { buildMenuToolbar(); renderMenuItems(); }
  if (page === 'tax')    { renderTaxPage(); }
  if (page === 'coupons') { renderCouponsPage(); }
  closeDrawer();
}

// ─────────────── MODALS ───────────────
function openOrdersModal(label, countElId) {
  const count = document.getElementById(countElId)?.textContent || openOrders.length;
  document.getElementById('ordersModalTitle').textContent = label + ' (' + count + ')';
  let filtered;
  if (countElId === 'ordersOnline') filtered = openOrders.filter(o => o.channel !== 'In-House');
  else if (countElId === 'ordersInStore') filtered = openOrders.filter(o => o.channel === 'In-House');
  else filtered = openOrders; // all
  // Sort newest first (smallest time value = most recently placed)
  filtered = [...filtered].sort((a, b) => {
    const aMin = parseInt(a.time) || 0;
    const bMin = parseInt(b.time) || 0;
    return aMin - bMin;
  });
  buildOrdersList(filtered);
  openModal('ordersModal');
  setTimeout(() => applyModalTheme('#ordersModal'), 10);
}
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
function closeModalOutside(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

// ─────────────── TOAST ───────────────
function showToast(icon, msg) {
  const c = document.getElementById('toastContainer');
  // Remove any existing toasts instantly (singleton)
  c.innerHTML = '';
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg">${msg}</span><span class="toast-close" onclick="this.parentNode.remove()">✕</span>`;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 350); }, 3000);
}

// ─────────────── CONFIRMATION + SUCCESS ───────────────
let _confirmCallback = null;
let _cancelCallback = null;

function showConfirm({ icon, title, desc, okLabel, danger, detailCard, onConfirm, onCancel }) {
  document.getElementById('confirmIcon').textContent = icon || '⚠️';
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmDesc').textContent = desc;
  const dc = document.getElementById('confirmDetailCard');
  if (detailCard) {
    dc.innerHTML = detailCard;
    dc.classList.add('visible');
  } else {
    dc.innerHTML = '';
    dc.classList.remove('visible');
  }
  const btn = document.getElementById('confirmOkBtn');
  btn.textContent = okLabel || 'Confirm';
  btn.className = 'confirm-ok' + (danger ? ' danger' : '');
  _confirmCallback = onConfirm;
  _cancelCallback = onCancel || null;
  document.getElementById('confirmOverlay').classList.add('open');
}

function cancelConfirm() {
  document.getElementById('confirmOverlay').classList.remove('open');
  if (_cancelCallback) { _cancelCallback(); _cancelCallback = null; }
  _confirmCallback = null;
  renderMenuItems(); // re-render to revert any optimistic UI
}

function executeConfirm() {
  document.getElementById('confirmOverlay').classList.remove('open');
  if (_confirmCallback) { _confirmCallback(); _confirmCallback = null; }
  _cancelCallback = null;
}

function showSuccess(title, sub) {
  const banner = document.getElementById('successBanner');
  banner.innerHTML = '';
  banner.style.display = 'block';
  banner.innerHTML = `
    <div class="success-card">
      <div class="success-check">✓</div>
      <div class="success-text">
        <div class="success-title">${title}</div>
        <div class="success-sub">${sub || 'Changes saved successfully'}</div>
      </div>
    </div>`;
  clearTimeout(banner._timer);
  banner._timer = setTimeout(() => {
    const card = banner.querySelector('.success-card');
    if (card) { card.classList.add('out'); setTimeout(() => { banner.style.display='none'; banner.innerHTML=''; }, 350); }
  }, 2500);
}

function showDenial(title, sub) {
  const banner = document.getElementById('successBanner');
  banner.innerHTML = '';
  banner.style.display = 'block';
  banner.innerHTML = `
    <div class="denial-card">
      <div class="denial-check">✕</div>
      <div class="success-text">
        <div class="denial-title">${title}</div>
        <div class="success-sub">${sub || 'Request denied and logged.'}</div>
      </div>
    </div>`;
  clearTimeout(banner._timer);
  banner._timer = setTimeout(() => {
    const card = banner.querySelector('.denial-card');
    if (card) { card.classList.add('out'); setTimeout(() => { banner.style.display='none'; banner.innerHTML=''; }, 350); }
  }, 2500);
}

// ─────────────── LOCATION SWITCHER ───────────────
function selectLocation(name, shortName) {
  document.querySelector('.store-name').textContent = shortName + ' ▾';
  document.querySelector('.drawer-sub').textContent = name;
  closeModal('locationModal');
  showSuccess('Location Switched', `Now managing ${name}.`);
}

// ─────────────── THEME TOGGLE ───────────────
let isLight = true;
function toggleTheme() {
  isLight = !isLight;
  const device = document.getElementById('app');
  const pill = document.getElementById('themePill');
  const thumb = document.getElementById('themePillThumb');
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  if (isLight) {
    device.classList.add('light');
    pill.classList.add('light-on');
    thumb.textContent = '☀️';
    icon.textContent = '☀️';
    label.textContent = 'Light Mode';
    document.body.style.background = '#d8dce8';
  } else {
    device.classList.remove('light');
    pill.classList.remove('light-on');
    thumb.textContent = '🌙';
    icon.textContent = '🌙';
    label.textContent = 'Dark Mode';
    document.body.style.background = '#0a0c12';
  }
  updateChartColors();
  syncSettingsPill();
  renderStaffDashCard();
  renderStaffPage();
  renderOrdersPage();
}
function syncSettingsPill() {
  const sp = document.getElementById('settingsThemePill');
  const st = document.getElementById('settingsThemePillThumb');
  if (!sp) return;
  if (isLight) { sp.classList.add('light-on'); if(st) st.textContent='☀️'; }
  else          { sp.classList.remove('light-on'); if(st) st.textContent='🌙'; }
}

// ─────────────── SETTINGS + LOGOUT ───────────────
function triggerLogout() {
  closeDrawer();
  openModal('logoutModal');
  setTimeout(() => applyModalTheme('#logoutModal'), 10);
}
function confirmLogout() {
  closeModal('logoutModal');
  // Show a brief "logging out" state then reset to welcome
  const app = document.getElementById('app');
  app.style.transition = 'opacity .4s';
  app.style.opacity = '0';
  setTimeout(() => {
    app.style.opacity = '1';
    // Navigate back to dashboard and show locked state
    navTo('dashboard', null, 'drnav-dashboard');
    showSuccess('Logged Out', 'Session ended. Please PIN in to continue.');
  }, 500);
}
// ─────────────── DATE NAVIGATION ───────────────
const today = new Date();
let viewOffset = 0; // 0 = today, -1 = yesterday, etc.

const dateData = {
  0:  { label:'Today, Mar 9',    total:4820, orders:82,  values:[340,520,880,760,620,480,530,690], orderCounts:[14,9,14,11,8,7,9,10], new:5, inProg:19, ready:3, openOrders:27, online:20, instore:7,
        rc:[ {icon:'🍽',name:'Dine-In',orders:34,total:1770,trend:'+8%',up:true}, {icon:'🥡',name:'Takeout',orders:21,total:798,trend:'-3%',up:false}, {icon:'🛵',name:'Delivery',orders:18,total:1118,trend:'+22%',up:true}, {icon:'🍸',name:'Bar',orders:9,total:1134,trend:'+5%',up:true} ],
        pay:[ {icon:'💳',name:'Credit Card', total:2890, tips:312, orders:49}, {icon:'💵',name:'Cash',        total:820,  tips:64,  orders:18}, {icon:'📱',name:'Apple/Google Pay', total:742, tips:98, orders:11}, {icon:'🎁',name:'Gift Card',  total:368,  tips:0,   orders:4} ] },
  '-1':{ label:'Yesterday, Mar 8', total:4310, orders:74, values:[280,460,810,700,590,420,490,560], orderCounts:[11,8,13,10,7,6,8,9],  new:0, inProg:0, ready:0, openOrders:0,
        rc:[ {icon:'🍽',name:'Dine-In',orders:30,total:1558,trend:'+3%',up:true}, {icon:'🥡',name:'Takeout',orders:20,total:760,trend:'+1%',up:true}, {icon:'🛵',name:'Delivery',orders:16,total:984,trend:'+11%',up:true}, {icon:'🍸',name:'Bar',orders:8,total:1008,trend:'-2%',up:false} ],
        pay:[ {icon:'💳',name:'Credit Card', total:2540, tips:278, orders:44}, {icon:'💵',name:'Cash',        total:760,  tips:52,  orders:16}, {icon:'📱',name:'Apple/Google Pay', total:680, tips:82, orders:10}, {icon:'🎁',name:'Gift Card',  total:330,  tips:0,   orders:4} ] },
  '-2':{ label:'Mar 7',           total:3980, orders:68,  values:[210,400,750,670,540,380,440,590], orderCounts:[10,7,12,9,6,5,7,8],  new:0, inProg:0, ready:0, openOrders:0,
        rc:[ {icon:'🍽',name:'Dine-In',orders:28,total:1426,trend:'-2%',up:false}, {icon:'🥡',name:'Takeout',orders:18,total:682,trend:'+4%',up:true}, {icon:'🛵',name:'Delivery',orders:14,total:866,trend:'+8%',up:true}, {icon:'🍸',name:'Bar',orders:8,total:1006,trend:'+1%',up:true} ],
        pay:[ {icon:'💳',name:'Credit Card', total:2310, tips:244, orders:40}, {icon:'💵',name:'Cash',        total:710,  tips:48,  orders:15}, {icon:'📱',name:'Apple/Google Pay', total:620, tips:71, orders:9},  {icon:'🎁',name:'Gift Card',  total:340,  tips:0,   orders:4} ] },
  '-3':{ label:'Mar 6',           total:5120, orders:91,  values:[380,560,940,820,700,560,610,750], orderCounts:[15,10,16,13,10,9,11,12], new:0, inProg:0, ready:0, openOrders:0,
        rc:[ {icon:'🍽',name:'Dine-In',orders:38,total:1976,trend:'+12%',up:true}, {icon:'🥡',name:'Takeout',orders:23,total:874,trend:'+6%',up:true}, {icon:'🛵',name:'Delivery',orders:20,total:1010,trend:'+18%',up:true}, {icon:'🍸',name:'Bar',orders:10,total:1260,trend:'+9%',up:true} ],
        pay:[ {icon:'💳',name:'Credit Card', total:3010, tips:334, orders:52}, {icon:'💵',name:'Cash',        total:890,  tips:72,  orders:19}, {icon:'📱',name:'Apple/Google Pay', total:820, tips:105,orders:13}, {icon:'🎁',name:'Gift Card',  total:400,  tips:0,   orders:7} ] },
};

// RC channel weights for live distribution (must sum to 1)
const rcWeights = [0.41, 0.26, 0.22, 0.11]; // Dine-In, Takeout, Delivery, Bar

function renderRCRows() {
  const container = document.getElementById('rcRowsContainer');
  if (!container) return;
  const d = dateData[getDateKey()];
  if (!d || !d.rc) return;
  container.innerHTML = d.rc.map(r => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:16px">${r.icon}</span>
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--text)">${r.name}</div>
          <div style="font-size:10px;color:var(--text3)">${r.orders} orders · avg $${Math.round(r.total/r.orders)}</div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-size:14px;font-weight:900;color:var(--text)">$${r.total.toLocaleString()}</div>
        <div style="font-size:10px;color:var(--${r.up ? 'green' : 'red'})">${r.up ? '▲' : '▼'} ${r.trend}</div>
      </div>
    </div>`).join('');
}

function getDateKey() { return String(viewOffset); }

function changeDate(dir) {
  const newOffset = viewOffset + dir;
  if (newOffset > 0) return; // can't go to future
  viewOffset = newOffset;
  updateDateDisplay();
  updateDashboardData();
}

function updateDateDisplay() {
  updateChartColors();
}

function updateDashboardData() {
  const d = dateData[getDateKey()];
  const isToday = viewOffset === 0;

  if (!d) {
    document.getElementById('salesTotalDisplay').textContent = '—';
    document.getElementById('avgOrderVal').textContent = '—';
    document.getElementById('openOrdersCount').textContent = '—';
    const onlineEl = document.getElementById('ordersOnline');
    const instoreEl = document.getElementById('ordersInStore');
    if (onlineEl) onlineEl.textContent = '—';
    if (instoreEl) instoreEl.textContent = '—';
    document.getElementById('chartSubLabel').innerHTML = `No data available for this date`;
    if (salesChart) {
      salesChart.data.datasets[0].data = [0,0,0,0,0,0,0,0];
      salesChart.data.datasets[0].backgroundColor = Array(8).fill('rgba(124,58,237,0.1)');
      salesChart.update('active');
    }
    return;
  }

  document.getElementById('salesTotalDisplay').textContent = '$' + d.total.toLocaleString();
  document.getElementById('avgOrderVal').textContent = '$' + (d.total / d.orders).toFixed(2);
  const onlineEl = document.getElementById('ordersOnline');
  const instoreEl = document.getElementById('ordersInStore');
  const onlineCount = isToday ? openOrders.filter(o => o.channel !== 'In-House').length : '—';
  const instoreCount = isToday ? openOrders.filter(o => o.channel === 'In-House').length : '—';
  if (onlineEl) onlineEl.textContent = onlineCount;
  if (instoreEl) instoreEl.textContent = instoreCount;
  // Update 86'd and Inactive menu item counts
  const count86  = menuItems.filter(i => i.is86 && i.stock === 0).length;
  const countInactive = menuItems.filter(i => !i.active).length;
  const el86Count = document.getElementById('dash86Count');
  const el86Label = document.getElementById('dash86Label');
  const elInCount = document.getElementById('dashInactiveCount');
  const elInLabel = document.getElementById('dashInactiveLabel');
  if (el86Count)  el86Count.textContent  = count86;
  if (el86Label)  el86Label.textContent  = count86;
  if (elInCount)  elInCount.textContent  = countInactive;
  if (elInLabel)  elInLabel.textContent  = countInactive;
  const openTotal = isToday ? openOrders.length : '—';
  document.getElementById('openOrdersCount').textContent = openTotal;
  document.getElementById('chartSubLabel').textContent = `Hourly breakdown · ${d.orders} orders`;
  const rcOrders = document.getElementById('rcTotalOrders');
  const rcSales  = document.getElementById('rcTotalSales');
  if (rcOrders) rcOrders.textContent = `${d.orders} total orders today`;
  if (rcSales)  rcSales.textContent  = `Total: $${d.total.toLocaleString()}`;
  renderRCRows();
  renderPaymentRows();

  // Update chart
  if (salesChart) {
    salesChart.data.datasets[0].data = d.values;
    salesChart.data.datasets[0].backgroundColor = d.values.map((_, i) =>
      i === d.values.indexOf(Math.max(...d.values)) ? 'rgba(124,58,237,0.9)' : 'rgba(124,58,237,0.25)'
    );
    salesChart.update('active');
  }
}

function initChart() {
  const ctx = document.getElementById('salesChart').getContext('2d');
  const d = dateData['0'];
  salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['10a','11a','12p','1p','2p','3p','4p','5p'],
      datasets: [{
        data: d.values,
        backgroundColor: d.values.map((_, i) => i === 2 ? 'rgba(124,58,237,0.9)' : 'rgba(124,58,237,0.25)'),
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1d2e',
          titleColor: '#a0a8c8',
          bodyColor: '#f0f2f8',
          borderColor: '#7c3aed',
          borderWidth: 1.5,
          padding: { top: 10, bottom: 10, left: 14, right: 14 },
          cornerRadius: 12,
          displayColors: false,
          titleFont: { size: 11, weight: '700', family: 'DM Sans' },
          bodyFont: { size: 13, weight: '800', family: 'DM Sans' },
          callbacks: {
            title: ctx => '🕐 ' + ctx[0].label,
            label: ctx => [
              '🛒  ' + d.orderCounts[ctx.dataIndex] + ' orders',
              '💵  $' + Number(ctx.raw).toLocaleString()
            ],
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#5d6480', font: { size: 10 } } },
        y: { display: false, grid: { display: false } }
      },
      animation: { duration: 500 }
    }
  });
  startLiveSales();
}

// ─────────────── LIVE SALES SIMULATION ───────────────
const liveItems = [
  { name:'Pepperoni Pizza', price:9.99 }, { name:'BBQ Chicken Wings', price:12.49 },
  { name:'Caesar Salad', price:8.99 }, { name:'Fettuccine Alfredo', price:11.99 },
  { name:'Tiramisu', price:6.49 }, { name:'Sparkling Water × 2', price:5.98 },
  { name:'Corn Pizza', price:9.49 }, { name:'Margherita Pizza', price:8.49 },
  { name:'Wings × 2', price:24.98 }, { name:'Pasta + Salad', price:20.98 },
];
const liveChannels = ['Uber Eats','DoorDash','In-House','GrubHub','Plum'];
let liveOrderNum = 10241;
let currentHourIndex = 4; // simulate current hour is 2p (index 4)

function startLiveSales() {
  // Fire a new order every 6–12 seconds
  function fireOrder() {
    if (viewOffset !== 0) return; // only simulate on today
    const item = liveItems[Math.floor(Math.random() * liveItems.length)];
    const channel = liveChannels[Math.floor(Math.random() * liveChannels.length)];
    const qty = Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 2 : 1;
    const amount = (item.price * qty).toFixed(2);
    const orderNum = liveOrderNum++;

    // Bump the current hour bar value
    const d = dateData['0'];
    d.values[currentHourIndex] += parseFloat(amount);
    d.orders += qty;
    d.total += parseFloat(amount);
    d.openOrders = Math.min(d.openOrders + 1, 35);
    d.new = Math.min(d.new + 1, 12);

    // Distribute order to a weighted RC channel
    const rand = Math.random();
    let cumulative = 0;
    const rcIdx = rcWeights.findIndex(w => { cumulative += w; return rand < cumulative; });
    if (d.rc && d.rc[rcIdx] !== undefined) {
      d.rc[rcIdx].orders += qty;
      d.rc[rcIdx].total  += parseFloat(amount);
    }

    // Also distribute to a payment method so Payment tab stays in sync
    const payWeights = [0.60, 0.17, 0.15, 0.08]; // Credit Card, Cash, Apple/Google Pay, Gift Card
    const rand2 = Math.random();
    let cumPay = 0;
    const payIdx = payWeights.findIndex(w => { cumPay += w; return rand2 < cumPay; });
    if (d.pay && d.pay[payIdx] !== undefined) {
      d.pay[payIdx].total  += parseFloat(amount);
      d.pay[payIdx].orders += 1;
    }

    // Re-render totals + chart
    updateDashboardData();

    // Pulse the chart bar
    if (salesChart) {
      salesChart.data.datasets[0].data = [...d.values];
      salesChart.data.datasets[0].backgroundColor = d.values.map((_, i) =>
        i === currentHourIndex ? 'rgba(124,58,237,1)' : 'rgba(124,58,237,0.25)'
      );
      salesChart.update('active');
    }

    // Schedule next
    const delay = 6000 + Math.random() * 8000;
    setTimeout(fireOrder, delay);
  }
  setTimeout(fireOrder, 3000);
}

// ─────────────── CHART THEME ADAPTATION ───────────────
function updateChartColors() {
  if (!salesChart) return;
  const light = document.getElementById('app').classList.contains('light');
  salesChart.options.plugins.tooltip.backgroundColor = light ? '#ffffff' : '#1a1d2e';
  salesChart.options.plugins.tooltip.titleColor       = light ? '#7c3aed' : '#a0a8c8';
  salesChart.options.plugins.tooltip.bodyColor        = light ? '#111827' : '#e8ecf8';
  salesChart.options.plugins.tooltip.borderColor      = light ? '#7c3aed' : '#7c3aed';
  salesChart.options.plugins.tooltip.borderWidth      = 1.5;
  salesChart.options.scales.x.ticks.color = light ? '#9ca3af' : '#5d6480';
  salesChart.update('none');
}


function buildMenuToolbar() {
  const isL = isLight;
  const bdr      = isL ? '#e5e7eb' : 'var(--border)';
  const inputBg  = isL ? '#ffffff' : 'var(--surface2)';
  const textMain = isL ? '#111827' : 'var(--text)';
  const textMuted= isL ? '#9ca3af' : 'var(--text3)';
  const activeMenuFilterCount = (activeStatusFilter !== 'all') ? 1 : 0;
  const allItems   = menuItems.filter(i=>i.type!=='Modifier').length;
  const allMods    = menuItems.filter(i=>i.type==='Modifier').length;
  const typeTabs = [
    {id:'all',     label:'All',       count: menuItems.length},
    {id:'item',    label:'Items',     count: allItems},
    {id:'modifier',label:'Modifiers', count: allMods},
  ];

  document.getElementById('menuToolbar').innerHTML = `
    <!-- Search + Filter row -->
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;padding:14px 16px 0">
      <div style="position:relative;flex:1">
        <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);width:13px;height:13px;pointer-events:none" viewBox="0 0 24 24" fill="none" stroke="${textMuted}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input id="menuSearch" type="text" placeholder="Search items, modifiers…" value="${menuSearch}"
          oninput="setMenuSearch(this.value)"
          style="width:100%;box-sizing:border-box;padding:9px 30px 9px 30px;border-radius:10px;
            border:1.5px solid ${menuSearch?'var(--accent)':bdr};
            background:${inputBg};color:${textMain};font-size:12px;font-family:inherit;outline:none;transition:border-color .15s"/>
        ${menuSearch ? `<button onclick="setMenuSearch('');document.getElementById('menuSearch').value=''"
          style="position:absolute;right:8px;top:50%;transform:translateY(-50%);border:none;background:${isL?'#e5e7eb':'rgba(255,255,255,.12)'};
            color:${textMuted};width:17px;height:17px;border-radius:50%;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0">✕</button>` : ''}
      </div>
      <!-- Filter button -->
      <button onclick="openMenuFilterModal()" style="position:relative;display:flex;align-items:center;gap:5px;padding:8px 12px;border-radius:10px;border:1.5px solid ${activeMenuFilterCount>0?'var(--accent)':bdr};background:${activeMenuFilterCount>0?'rgba(124,58,237,.08)':inputBg};color:${activeMenuFilterCount>0?'var(--accent)':textMuted};font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
        Filter${activeMenuFilterCount>0?` <span style="background:var(--accent);color:#fff;border-radius:10px;padding:1px 6px;font-size:10px;font-weight:800">${activeMenuFilterCount}</span>`:''}
      </button>
    </div>
    <!-- Item / Modifier tabs (like Orders module) -->
    <div style="display:flex;border-bottom:1px solid ${bdr};margin:0 16px 0;gap:0">
      ${typeTabs.map(t=>`
        <button onclick="setMenuTypeFilter('${t.id}')"
          style="flex:1;border:none;border-bottom:2px solid ${menuTypeFilter===t.id?'var(--accent)':'transparent'};
            padding:8px 4px;font-size:11px;font-weight:700;cursor:pointer;transition:all .15s;background:transparent;
            color:${menuTypeFilter===t.id?'var(--accent)':textMuted}">
          ${t.label} <span style="font-size:10px;font-weight:600;opacity:.7">${t.count}</span>
        </button>`).join('')}
    </div>
    <!-- Category chips -->
    <div class="cats-scroll" id="catScroll" style="padding:6px 16px 8px">
      ${categories.map(c=>`<div class="cat-chip${c===activeCat?' active':''}" onclick="setCat('${c}')">${c}</div>`).join('')}
    </div>
  `;
}
function setCat(c) {
  activeCat = c;
  buildMenuToolbar();
  renderMenuItems();
}
function setMenuTypeFilter(t) {
  menuTypeFilter = t;
  buildMenuToolbar();
  renderMenuItems();
}
function setStatusFilter(f) {
  activeStatusFilter = f;
  buildMenuToolbar();
  renderMenuItems();
}
function setMenuSearch(val) {
  menuSearch = val.toLowerCase().trim();
  buildMenuToolbar();
  renderMenuItems();
  const input = document.getElementById('menuSearch');
  if (input) { input.focus(); input.setSelectionRange(val.length, val.length); }
}
// ══════════════ TAX MANAGEMENT ══════════════
const taxData = [
  { id:1,       extId:'Tax1',   name:'County Tax',  receipt:'County Tax',  rate:0,  type:'Exclusive', active:false },
  { id:2,       extId:'Tax2',   name:'Local Tax',   receipt:'Local Tax',   rate:0,  type:'Exclusive', active:false },
  { id:3,       extId:'Tax3',   name:'State Tax',   receipt:'State Tax',   rate:10, type:'Exclusive', active:true  },
  { id:5,       extId:'NoTax',  name:'No Tax',      receipt:'No Tax',      rate:0,  type:'Exclusive', active:true  },
  { id:6,       extId:'FL TAX', name:'FL TAX',      receipt:'FL TAX',      rate:0,  type:'Exclusive', active:false },
  { id:7,       extId:'Inclusive', name:'Inclusive', receipt:'Inclusive',  rate:0,  type:'Inclusive', active:false },
  { id:8,       extId:'Tax 4',  name:'City',        receipt:'City',        rate:0,  type:'Exclusive', active:false },
  { id:999999,  extId:'999999', name:'Default',     receipt:'Default',     rate:0,  type:'Exclusive', active:true  },
];
let taxEditId = null; // null = add mode, number = edit mode

function renderTaxPage() {
  const isL = isLight;
  const bdr       = isL ? '#e5e7eb' : 'var(--border)';
  const textMain  = isL ? '#111827' : 'var(--text)';
  const textMuted = isL ? '#9ca3af' : 'var(--text3)';
  const cardBg    = isL ? '#ffffff' : 'var(--surface)';
  const surface2  = isL ? '#f3f4f6' : 'var(--surface2)';

  const el = document.getElementById('taxListEl');
  if (!el) return;

  el.innerHTML = taxData.map(t => `
    <div onclick="openTaxEditDetail(${t.id})" style="background:${cardBg};border:1px solid ${bdr};border-radius:14px;margin-bottom:10px;overflow:hidden;cursor:pointer;transition:box-shadow .15s"
      onmouseover="this.style.boxShadow='0 2px 12px rgba(124,58,237,.12)'" onmouseout="this.style.boxShadow='none'">
      <!-- Row top -->
      <div style="display:flex;align-items:center;gap:10px;padding:12px 14px">
        <!-- ID badge -->
        <div style="width:36px;height:36px;border-radius:10px;background:${isL?'#f3f4f6':'var(--surface2)'};border:1px solid ${bdr};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-size:10px;font-weight:800;color:${textMuted}">#${t.id}</span>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:800;color:${textMain};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.name}</div>
          <div style="font-size:11px;color:${textMuted};margin-top:1px">${t.extId} · ${t.type}</div>
        </div>
        <!-- Toggle -->
        <label class="toggle" onclick="event.stopPropagation()">
          <input type="checkbox" ${t.active?'checked':''} onchange="toggleTaxActive(${t.id},this.checked,this)">
          <div class="toggle-track"></div><div class="toggle-thumb"></div>
        </label>
        <!-- Chevron -->
        <span style="font-size:14px;color:${textMuted};flex-shrink:0">›</span>
      </div>
      <!-- Info strip -->
      <div style="display:flex;border-top:1px solid ${bdr}">
        <div style="flex:1;padding:8px 14px;border-right:1px solid ${bdr}">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${textMuted};margin-bottom:2px">Tax Rate</div>
          <div style="font-size:13px;font-weight:800;color:${t.rate>0?'var(--accent2)':textMain}">${t.rate}%</div>
        </div>
        <div style="flex:1;padding:8px 14px;border-right:1px solid ${bdr}">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${textMuted};margin-bottom:2px">On Receipt</div>
          <div style="font-size:11px;font-weight:600;color:${textMain};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.receipt}</div>
        </div>
        <div style="flex:1;padding:8px 14px">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${textMuted};margin-bottom:2px">Status</div>
          <span style="font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;${t.active?'background:rgba(34,197,94,.12);color:var(--green)':'background:rgba(107,114,128,.12);color:'+textMuted}">${t.active?'Active':'Inactive'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleTaxActive(id, checked, checkboxEl) {
  const t = taxData.find(x => x.id === id);
  if (!t) return;
  // Only confirm when deactivating
  if (!checked) {
    // Optimistically revert checkbox while waiting
    if (checkboxEl) checkboxEl.checked = true;
    showConfirm({
      icon: '⏸',
      title: 'Deactivate Tax?',
      desc: `"${t.name}" will no longer be applied at checkout.`,
      okLabel: 'Deactivate',
      danger: true,
      detailCard: `<div style="display:flex;gap:16px"><div><div class="confirm-detail-label">Tax Name</div><div class="confirm-detail-val">${t.name}</div></div><div class="confirm-detail-divider"></div><div><div class="confirm-detail-label">Tax Rate</div><div class="confirm-detail-val">${t.rate}%</div></div></div>`,
      onConfirm: () => { t.active = false; renderTaxPage(); },
      onCancel: () => { renderTaxPage(); }
    });
  } else {
    // Confirm activation too
    if (checkboxEl) checkboxEl.checked = false;
    showConfirm({
      icon: '✅',
      title: 'Activate Tax?',
      desc: `"${t.name}" will be applied at checkout.`,
      okLabel: 'Activate',
      danger: false,
      detailCard: `<div style="display:flex;gap:16px"><div><div class="confirm-detail-label">Tax Name</div><div class="confirm-detail-val">${t.name}</div></div><div class="confirm-detail-divider"></div><div><div class="confirm-detail-label">Tax Rate</div><div class="confirm-detail-val">${t.rate}%</div></div></div>`,
      onConfirm: () => { t.active = true; renderTaxPage(); },
      onCancel: () => { renderTaxPage(); }
    });
  }
}

function openTaxEditDetail(id) {
  taxEditId = id;
  const t = taxData.find(x => x.id === id);
  document.getElementById('taxDetailTitle').textContent = t ? t.name : 'Edit Tax';
  renderTaxDetailForm(t);
  document.getElementById('taxDetailView').style.display = 'flex';
}

function openTaxAddDetail() {
  taxEditId = null;
  document.getElementById('taxDetailTitle').textContent = 'Add Tax';
  renderTaxDetailForm(null);
  document.getElementById('taxDetailView').style.display = 'flex';
}

function closeTaxDetail() {
  document.getElementById('taxDetailView').style.display = 'none';
  taxEditId = null;
}

function saveTaxDetail() {
  const rateVal = parseFloat(document.getElementById('taxFieldRate')?.value) || 0;
  if (taxEditId !== null) {
    const t = taxData.find(x => x.id === taxEditId);
    if (!t) return;
    // If new rate differs from current, confirm
    if (rateVal !== t.rate) {
      showConfirm({
        icon: '🧾',
        title: 'Save Tax Changes?',
        desc: `Update tax rate for "${t.name}"?`,
        okLabel: 'Save',
        danger: false,
        detailCard: `<div style="display:flex;gap:16px"><div><div class="confirm-detail-label">Old Rate</div><div class="confirm-detail-val">${t.rate}%</div></div><div class="confirm-detail-divider"></div><div><div class="confirm-detail-label">New Rate</div><div class="confirm-detail-val">${rateVal}%</div></div></div>`,
        onConfirm: () => { t.rate = rateVal; closeTaxDetail(); renderTaxPage(); }
      });
    } else {
      closeTaxDetail();
    }
  }
}

function renderTaxDetailForm(t) {
  const isL = isLight;
  const bdr      = isL ? '#e5e7eb' : 'var(--border)';
  const textMain = isL ? '#111827' : 'var(--text)';
  const textMuted= isL ? '#9ca3af' : 'var(--text3)';
  const inputBg  = isL ? '#ffffff' : 'var(--surface2)';
  const roBg     = isL ? '#f3f4f6' : 'var(--surface3)';
  const isEdit   = t !== null;

  const label  = (txt, req) => `<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${textMuted};margin-bottom:6px">${txt}${req ? ` <span style="color:var(--red)">*</span>` : ''}</div>`;
  const roField = (id, val) => `<input id="${id}" type="text" value="${val}" readonly style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1.5px solid ${bdr};background:${roBg};color:${textMuted};font-size:13px;font-family:inherit;outline:none;cursor:not-allowed"/>`;
  const rwField = (id, val, ph, type, extra) => `<input id="${id}" type="${type || 'text'}" value="${val}" placeholder="${ph || ''}" ${extra || ''} style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1.5px solid ${bdr};background:${inputBg};color:${textMain};font-size:13px;font-family:inherit;outline:none;transition:border-color .15s" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='${bdr}'"/>`;

  document.getElementById('taxDetailBody').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:14px;padding-bottom:8px">

      <!-- Row 1: ID | External ID -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          ${label('ID')}
          ${roField('taxFieldId', isEdit ? t.id : '—')}
        </div>
        <div>
          ${label('External ID')}
          ${roField('taxFieldExt', isEdit ? t.extId : '—')}
        </div>
      </div>

      <!-- Row 2: Tax Name | Name on Receipt -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          ${label('Tax Name')}
          ${roField('taxFieldName', isEdit ? t.name : '—')}
        </div>
        <div>
          ${label('Name on Receipt')}
          ${roField('taxFieldReceipt', isEdit ? t.receipt : '—')}
        </div>
      </div>

      <!-- Row 3: Type | Variable Tax Rate -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:end">
        <div>
          ${label('Type')}
          ${roField('taxFieldType', isEdit ? t.type : 'Exclusive')}
        </div>
        <div>
          ${label('Variable Tax Rate')}
          <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;border:1.5px solid ${bdr};background:${roBg};height:42px;box-sizing:border-box">
            <label class="toggle">
              <input type="checkbox" id="taxFieldVariable" ${isEdit && t.rate === 0 ? 'checked' : ''}>
              <div class="toggle-track"></div><div class="toggle-thumb"></div>
            </label>
            <span style="font-size:11px;font-weight:600;color:${textMuted}" id="taxVarLabel">${isEdit && t.rate === 0 ? 'On' : 'Off'}</span>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div style="height:1px;background:${bdr}"></div>

      <!-- Row 4: Tax Rate (%) — full width, editable -->
      <div>
        ${label('Tax Rate (%)', true)}
        ${rwField('taxFieldRate', isEdit ? t.rate.toFixed(3) : '0.000', '0.000', 'number', 'step="0.001" min="0"')}
      </div>

    </div>
  `;

  // Wire variable toggle label
  const varChk = document.getElementById('taxFieldVariable');
  const varLbl = document.getElementById('taxVarLabel');
  if (varChk && varLbl) {
    varChk.addEventListener('change', () => { varLbl.textContent = varChk.checked ? 'On' : 'Off'; });
  }
}


// ══════════════ COUPONS & DISCOUNTS ══════════════
const couponData = [
  { id:161, name:'TT1 (Texas Tech Discount)',              appliesTo:'Item',  discountType:'Fixed To Charge Amount', autoApplied:false, minCheck:0.00, value:7.99,  active:false },
  { id:162, name:'TT2 (Texas Tech Discount)',              appliesTo:'Item',  discountType:'Fixed To Charge Amount', autoApplied:false, minCheck:0.00, value:15.99, active:false },
  { id:160, name:'BOGO AB + Drink (40621)',                appliesTo:'Item',  discountType:'Fixed Percentage %',     autoApplied:false, minCheck:0.00, value:100,   active:true  },
  { id:29,  name:"Applebee's $7 Large",                   appliesTo:'Item',  discountType:'Fixed To Charge Amount', autoApplied:false, minCheck:0.00, value:7,     active:true  },
  { id:9,   name:'$1 - 80044',                             appliesTo:'Check', discountType:'Open $ Amount',          autoApplied:false, minCheck:0.00, value:0,     active:true  },
  { id:24,  name:'Loyalty Discount',                       appliesTo:'Check', discountType:'Open $ Amount',          autoApplied:false, minCheck:0.00, value:0,     active:true  },
  { id:27,  name:'MIL - 30002',                            appliesTo:'Check', discountType:'Fixed Percentage %',     autoApplied:false, minCheck:0.00, value:10,    active:true  },
  { id:147, name:'To Go - PI DAY - 1 Large Topping Pizza - 23067', appliesTo:'Item', discountType:'Fixed To Charge Amount', autoApplied:false, minCheck:0.00, value:3.14, active:true },
  { id:153, name:"$5 Kid's Game Card - 40567",            appliesTo:'Item',  discountType:'Fixed To Charge Amount', autoApplied:false, minCheck:0.00, value:0,     active:true  },
  { id:999999, name:'OLO Discount',                        appliesTo:'Check', discountType:'Open $ Amount',          autoApplied:false, minCheck:0.00, value:0,     active:true  },
];

let couponEditId = null;

function renderCouponsPage() {
  const isL      = isLight;
  const bdr      = isL ? '#e5e7eb' : 'var(--border)';
  const textMain = isL ? '#111827' : 'var(--text)';
  const textMuted= isL ? '#9ca3af' : 'var(--text3)';
  const cardBg   = isL ? '#ffffff' : 'var(--surface)';
  const roBg     = isL ? '#f3f4f6' : 'var(--surface3)';

  const el = document.getElementById('couponListEl');
  if (!el) return;

  el.innerHTML = couponData.map(c => `
    <div onclick="openCouponDetail(${c.id})"
      style="background:${cardBg};border:1px solid ${bdr};border-radius:14px;margin-bottom:10px;overflow:hidden;cursor:pointer;transition:box-shadow .15s"
      onmouseover="this.style.boxShadow='0 2px 12px rgba(124,58,237,.12)'" onmouseout="this.style.boxShadow='none'">

      <!-- Header row -->
      <div style="display:flex;align-items:center;gap:10px;padding:12px 14px">
        <div style="width:36px;height:36px;border-radius:10px;background:${isL?'#f3f4f6':'var(--surface2)'};border:1px solid ${bdr};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-size:10px;font-weight:800;color:${textMuted}">#${c.id}</span>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:800;color:${textMain};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.name}</div>
          <div style="display:flex;align-items:center;gap:6px;margin-top:3px">
            <span style="font-size:10px;font-weight:700;padding:1px 7px;border-radius:5px;background:${c.appliesTo==='Item'?'rgba(59,130,246,.1)':'rgba(245,158,11,.1)'};color:${c.appliesTo==='Item'?'var(--blue)':'var(--amber)'}">${c.appliesTo}</span>
            <span style="font-size:10px;color:${textMuted}">${c.discountType}</span>
          </div>
        </div>
        <label class="toggle" onclick="event.stopPropagation()">
          <input type="checkbox" ${c.active?'checked':''} onchange="toggleCouponActive(${c.id},this.checked,this)">
          <div class="toggle-track"></div><div class="toggle-thumb"></div>
        </label>
      </div>

      <!-- Read-only strip -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;border-top:1px solid ${bdr}">
        <div style="padding:8px 10px;border-right:1px solid ${bdr}">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${textMuted};margin-bottom:3px">Min. Check</div>
          <div style="font-size:13px;font-weight:800;color:${textMain}">${c.minCheck.toFixed(2)}</div>
        </div>
        <div style="padding:8px 10px;border-right:1px solid ${bdr}">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${textMuted};margin-bottom:3px">Value</div>
          <div style="font-size:13px;font-weight:800;color:${c.value>0?'var(--accent2)':textMain}">${c.value}</div>
        </div>
        <div style="padding:8px 10px;display:flex;flex-direction:column;justify-content:center">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${textMuted};margin-bottom:3px">Status</div>
          <span style="font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;align-self:flex-start;${c.active?'background:rgba(34,197,94,.12);color:var(--green)':'background:rgba(107,114,128,.12);color:'+textMuted}">${c.active?'Active':'Inactive'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openCouponDetail(id) {
  couponEditId = id;
  const c = couponData.find(x => x.id === id);
  if (!c) return;
  document.getElementById('couponDetailTitle').textContent = c.name;
  renderCouponDetailBody(c);
  document.getElementById('couponDetailView').style.display = 'flex';
}

function closeCouponDetail() {
  document.getElementById('couponDetailView').style.display = 'none';
  couponEditId = null;
}

function renderCouponDetailBody(c) {
  const isL      = isLight;
  const bdr      = isL ? '#e5e7eb' : 'var(--border)';
  const textMain = isL ? '#111827' : 'var(--text)';
  const textMuted= isL ? '#9ca3af' : 'var(--text3)';
  const inputBg  = isL ? '#ffffff' : 'var(--surface2)';
  const roBg     = isL ? '#f3f4f6' : 'var(--surface3)';

  const label   = (txt) => `<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${textMuted};margin-bottom:6px">${txt}</div>`;
  const roField = (val) => `<div style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1.5px solid ${bdr};background:${roBg};color:${textMuted};font-size:13px;font-family:inherit;cursor:not-allowed">${val}</div>`;
  const rwField = (id, val, ph) => `<input id="${id}" type="number" step="0.01" min="0" value="${val}" placeholder="${ph}"
    style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1.5px solid ${bdr};background:${inputBg};color:${textMain};font-size:13px;font-family:inherit;outline:none;transition:border-color .15s"
    onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='${bdr}'"/>`;

  document.getElementById('couponDetailBody').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:14px;padding-bottom:8px">

      <!-- Row 1: ID | Applies To -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>${label('ID')}${roField('#' + c.id)}</div>
        <div>${label('Applies To')}${roField(c.appliesTo)}</div>
      </div>

      <!-- Row 2: Discount Type | Auto Applied -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>${label('Discount Type')}${roField(c.discountType)}</div>
        <div>${label('Auto Applied')}${roField(c.autoApplied ? 'Yes' : 'No')}</div>
      </div>

      <!-- Divider -->
      <div style="height:1px;background:${bdr}"></div>

      <!-- Row 3: Min. Check | Value — editable -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>${label('Min. Check Amount')}${rwField('couponFieldMin', c.minCheck.toFixed(2), '0.00')}</div>
        <div>${label('Value')}${rwField('couponFieldValue', c.value, '0')}</div>
      </div>

      <!-- Divider -->
      <div style="height:1px;background:${bdr}"></div>

      <!-- Enable / Disable toggle -->
      <div style="display:flex;align-items:center;justify-content:space-between;background:${inputBg};border:1.5px solid ${bdr};border-radius:10px;padding:12px 14px">
        <div>
          <div style="font-size:13px;font-weight:700;color:${textMain}">Active</div>
          <div style="font-size:11px;color:${textMuted};margin-top:2px">Discount is available at checkout</div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="couponFieldActive" ${c.active ? 'checked' : ''}>
          <div class="toggle-track"></div><div class="toggle-thumb"></div>
        </label>
      </div>

    </div>
  `;
}

function saveCouponDetail() {
  const c = couponData.find(x => x.id === couponEditId);
  if (!c) return;
  const newMin    = parseFloat(document.getElementById('couponFieldMin')?.value) || 0;
  const newVal    = parseFloat(document.getElementById('couponFieldValue')?.value) || 0;
  const newActive = document.getElementById('couponFieldActive')?.checked;
  const changed   = newMin !== c.minCheck || newVal !== c.value || newActive !== c.active;
  if (!changed) { closeCouponDetail(); return; }

  // Build a clean 2-col grid — each changed field gets label on top, "old → new" value below
  const cells = [];
  if (newMin !== c.minCheck)
    cells.push(`<div><div class="confirm-detail-label">Min. Check</div><div class="confirm-detail-val" style="font-size:13px;font-weight:700;text-align:left">${c.minCheck.toFixed(2)} → ${newMin.toFixed(2)}</div></div>`);
  if (newVal !== c.value)
    cells.push(`<div><div class="confirm-detail-label">Value</div><div class="confirm-detail-val" style="font-size:13px;font-weight:700;text-align:left">${c.value} → ${newVal}</div></div>`);
  if (newActive !== c.active)
    cells.push(`<div><div class="confirm-detail-label">Status</div><div class="confirm-detail-val" style="font-size:13px;font-weight:700;text-align:left">${c.active ? 'Inactive → Active' : 'Active → Inactive'}</div></div>`);

  // Lay out in a 2-col grid, divider between rows
  const rows = [];
  for (let i = 0; i < cells.length; i += 2) {
    if (i > 0) rows.push('<div class="confirm-detail-divider"></div>');
    const pair = cells.slice(i, i + 2);
    rows.push(`<div style="display:grid;grid-template-columns:${pair.length === 2 ? '1fr 1fr' : '1fr'};gap:12px">${pair.join('')}</div>`);
  }
  const detailCard = rows.join('');

  showConfirm({
    icon: '🏷️',
    title: 'Save Changes?',
    desc: `Update "${c.name}"?`,
    okLabel: 'Save',
    danger: false,
    detailCard,
    onConfirm: () => {
      c.minCheck = newMin;
      c.value    = newVal;
      c.active   = newActive;
      closeCouponDetail();
      renderCouponsPage();
    }
  });
}

function toggleCouponActive(id, checked, checkboxEl) {
  const c = couponData.find(x => x.id === id);
  if (!c) return;
  if (!checked) {
    if (checkboxEl) checkboxEl.checked = true;
    showConfirm({
      icon: '⏸',
      title: 'Deactivate Discount?',
      desc: `"${c.name}" will no longer be available at checkout.`,
      okLabel: 'Deactivate',
      danger: true,
      detailCard: `<div style="display:flex;gap:16px"><div><div class="confirm-detail-label">Applies To</div><div class="confirm-detail-val">${c.appliesTo}</div></div><div class="confirm-detail-divider"></div><div><div class="confirm-detail-label">Type</div><div class="confirm-detail-val">${c.discountType}</div></div></div>`,
      onConfirm: () => { c.active = false; renderCouponsPage(); },
      onCancel:  () => { renderCouponsPage(); }
    });
  } else {
    if (checkboxEl) checkboxEl.checked = false;
    showConfirm({
      icon: '✅',
      title: 'Activate Discount?',
      desc: `"${c.name}" will be available at checkout.`,
      okLabel: 'Activate',
      danger: false,
      detailCard: `<div style="display:flex;gap:16px"><div><div class="confirm-detail-label">Applies To</div><div class="confirm-detail-val">${c.appliesTo}</div></div><div class="confirm-detail-divider"></div><div><div class="confirm-detail-label">Type</div><div class="confirm-detail-val">${c.discountType}</div></div></div>`,
      onConfirm: () => { c.active = true; renderCouponsPage(); },
      onCancel:  () => { renderCouponsPage(); }
    });
  }
}

function filterMenu() {
  renderMenuItems();
}

// ── Menu Filter Modal ──
function openMenuFilterModal() {
  window._tmpMenuStatusFilter = activeStatusFilter;
  renderMenuFilterModal();
  document.getElementById('menuFilterModal').style.display = 'flex';
}

function closeMenuFilterModal() {
  document.getElementById('menuFilterModal').style.display = 'none';
}

function applyMenuFilterModal() {
  activeStatusFilter = window._tmpMenuStatusFilter;
  closeMenuFilterModal();
  buildMenuToolbar();
  renderMenuItems();
}

function clearMenuFilterModal() {
  window._tmpMenuStatusFilter = 'all';
  renderMenuFilterModal();
}

function setTmpMenuStatus(id) {
  window._tmpMenuStatusFilter = id;
  renderMenuFilterModal();
}

function renderMenuFilterModal() {
  const isL = isLight;
  const bdr      = isL ? '#e5e7eb' : 'var(--border)';
  const textMuted= isL ? '#9ca3af' : 'var(--text3)';
  const textMain = isL ? '#111827' : 'var(--text)';
  const textSub  = isL ? '#6b7280' : 'var(--text2)';
  const rowBg    = isL ? '#f9fafb' : 'var(--surface2)';
  const sel = window._tmpMenuStatusFilter || 'all';
  const hasFilters = sel !== 'all';

  const statusOptions = [
    { id:'all',      emoji:'🔘', label:'All Items',  desc:'Show everything' },
    { id:'active',   emoji:'✅', label:'Active',      desc:'Currently on the menu' },
    { id:'inactive', emoji:'⏸',  label:'Inactive',    desc:'Hidden from the menu' },
    { id:'86d',      emoji:'🚫', label:"86'd",        desc:'Out of stock & unavailable' },
    { id:'avail',    emoji:'🟢', label:'Available',   desc:'Active and not 86\'d' },
  ];

  const optionRow = (opt) => {
    const isActive = sel === opt.id;
    return `<div onclick="setTmpMenuStatus('${opt.id}')" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;cursor:pointer;transition:background .12s;background:${isActive?'rgba(124,58,237,.07)':'transparent'}"
      onmouseover="this.style.background='${isActive?'rgba(124,58,237,.10)':rowBg}'"
      onmouseout="this.style.background='${isActive?'rgba(124,58,237,.07)':'transparent'}'">
      <span style="font-size:18px;width:24px;text-align:center;flex-shrink:0">${opt.emoji}</span>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;color:${textMain}">${opt.label}</div>
        <div style="font-size:11px;color:${textMuted};margin-top:1px">${opt.desc}</div>
      </div>
      <span style="width:20px;height:20px;border-radius:50%;border:2px solid ${isActive?'var(--accent)':bdr};background:${isActive?'var(--accent)':'transparent'};
        display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s">
        ${isActive?'<svg width="9" height="9" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3" fill="#fff"/></svg>':''}
      </span>
    </div>`;
  };

  document.getElementById('menuFilterModalBody').innerHTML = `
    <!-- Status -->
    <div style="margin-bottom:8px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:${textMuted}">Item Status</div>
        ${hasFilters ? `<button onclick="clearMenuFilterModal()" style="font-size:10px;color:var(--accent);font-weight:700;background:none;border:none;cursor:pointer;font-family:inherit;padding:0">Clear</button>` : `<span style="font-size:11px;color:${textMuted}">Any</span>`}
      </div>
      <div style="border:1.5px solid ${bdr};border-radius:14px;overflow:hidden">
        ${statusOptions.map((opt,i)=>optionRow(opt)+(i<statusOptions.length-1?`<div style="height:1px;background:${bdr};margin:0 14px"></div>`:'')).join('')}
      </div>
    </div>

    ${hasFilters ? `
    <div style="height:1px;background:${bdr};margin:16px 0"></div>
    <button onclick="clearMenuFilterModal()"
      style="width:100%;border:1.5px solid rgba(239,68,68,.25);padding:10px;border-radius:10px;background:rgba(239,68,68,.06);color:var(--red);font-size:12px;font-weight:800;cursor:pointer;font-family:inherit">
      Clear All Filters
    </button>` : ''}
  `;
}
function renderMenuItems() {
  const el = document.getElementById('menuItemsList');
  const filtered = menuItems.filter(i => {
    const catOk = activeCat === 'All' || i.cat === activeCat;
    const qOk = !menuSearch || i.name.toLowerCase().includes(menuSearch);
    const is86 = i.is86 && i.stock === 0;
    const statusOk =
      activeStatusFilter === 'all'      ? true :
      activeStatusFilter === 'active'   ? i.active :
      activeStatusFilter === 'inactive' ? !i.active :
      activeStatusFilter === '86d'      ? is86 :
      activeStatusFilter === 'avail'    ? (!is86 && i.active) : true;
    const typeOk =
      menuTypeFilter === 'all'      ? true :
      menuTypeFilter === 'item'     ? (i.type !== 'Modifier') :
      menuTypeFilter === 'modifier' ? (i.type === 'Modifier') : true;
    return catOk && qOk && statusOk && typeOk;
  });
  const isL = isLight;
  const textMain = isL ? '#111827' : 'var(--text)';
  const textSub  = isL ? '#374151' : 'var(--text2)';
  const textMuted= isL ? '#9ca3af' : 'var(--text3)';
  const bdr      = isL ? '#e5e7eb' : 'var(--border)';
  if (filtered.length === 0) {
    el.innerHTML = `
      <div style="text-align:center;padding:52px 20px 40px">
        <div style="width:64px;height:64px;border-radius:20px;background:${isL?'#f3f4f6':'rgba(255,255,255,.06)'};display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 14px">🔍</div>
        <div style="font-size:14px;font-weight:800;color:${textMain};margin-bottom:6px">No items found</div>
        <div style="font-size:12px;color:${textMuted}">Try a different search, category or filter.</div>
        ${menuSearch || activeStatusFilter !== 'all' ? `<button onclick="setMenuSearch('');setStatusFilter('all');document.getElementById('menuSearch')&&(document.getElementById('menuSearch').value='')"
          style="margin-top:14px;padding:8px 18px;border-radius:10px;border:1.5px solid ${bdr};background:transparent;color:${textMuted};font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">Clear filters</button>` : ''}
      </div>`;
    return;
  }
  el.innerHTML = filtered.map(i => `
    <div class="menu-item-card" onclick="openItemEditor(${i.id})">
      <div class="menu-item-thumb">${i.emoji}</div>
      <div class="menu-item-info">
        <div class="menu-item-name">${i.name} ${!i.active?'<span class="badge-inactive">Inactive</span>':''}</div>
        <div class="menu-item-meta">
          <span class="menu-item-price">$${i.price.toFixed(2)}</span>
          <span>•</span>
          <span style="font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;background:${(i.type==='Modifier')?'rgba(245,158,11,.15)':'rgba(59,130,246,.15)'};color:${(i.type==='Modifier')?'var(--amber)':'var(--blue)'};text-transform:uppercase;letter-spacing:.04em">${i.type || 'Item'}</span>
          <span>•</span><span>${i.cat}</span>
          ${i.is86 && i.stock > 0 ? `<span>•</span><span style="color:var(--amber);font-size:10px;font-weight:700">Stock: ${i.stock}</span>` : ''}
          ${i.is86 && i.stock === 0 ? '<span>•</span><span class="badge-86">86\'d</span>' : ''}
        </div>
      </div>
      <div class="menu-item-controls">
        <label class="toggle" onclick="event.stopPropagation()">
          <input type="checkbox" ${i.active?'checked':''} onchange="toggleItemActive(${i.id},this)">
          <div class="toggle-track"></div><div class="toggle-thumb"></div>
        </label>
      </div>
    </div>
  `).join('');
}

function toggleItemActive(id, checkboxEl) {
  const item = menuItems.find(i => i.id===id);
  const newState = checkboxEl.checked;
  const action = newState ? 'activate' : 'deactivate';
  const icon = newState ? '✅' : '⛔';
  // Revert checkbox immediately — let confirmation decide
  checkboxEl.checked = !newState;
  showConfirm({
    icon,
    title: newState ? 'Activate Item?' : 'Deactivate Item?',
    desc: newState
      ? `"${item.name}" will become visible and orderable across all active channels.`
      : `"${item.name}" will be hidden and removed from all ordering channels immediately.`,
    okLabel: newState ? 'Yes, Activate' : 'Yes, Deactivate',
    danger: !newState,
    onConfirm: () => {
      item.active = newState;
      renderMenuItems();
      showSuccess(
        newState ? 'Item Activated' : 'Item Deactivated',
        `"${item.name}" has been ${newState ? 'activated' : 'deactivated'} successfully.`
      );
    }
  });
}
function openItemEditor(id) {
  const item = menuItems.find(i => i.id===id);
  if (!item) return;
  currentEditId = id;

  const isL        = isLight;
  const bdr        = isL ? '#e5e7eb' : 'var(--border)';
  const cardBg     = isL ? '#ffffff' : 'var(--surface)';
  const surface2   = isL ? '#f3f4f6' : 'var(--surface2)';
  const inputBg    = isL ? '#ffffff' : 'var(--surface2)';
  const textMain   = isL ? '#111827' : 'var(--text)';
  const textSub    = isL ? '#374151' : 'var(--text2)';
  const textMuted  = isL ? '#9ca3af' : 'var(--text3)';
  const isModifier = item.type === 'Modifier';
  const typeColor  = isModifier ? 'var(--amber)' : 'var(--blue)';
  const typeBg     = isModifier ? 'rgba(245,158,11,.12)' : 'rgba(59,130,246,.12)';
  const is86Now    = item.is86 && item.stock === 0;

  // Weekly data seeded per item
  const seed      = item.id * 7;
  const weekDays  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const baseUsage = weekDays.map((_,i) => {
    const base = isModifier ? 5 : 10;
    return Math.round(base + ((seed * (i+1) * 13) % (isModifier ? 12 : 18)));
  });
  const maxUsage    = Math.max(...baseUsage);
  const totalSold   = baseUsage.reduce((a,b)=>a+b,0);
  const weekRevenue = (totalSold * item.price).toFixed(0);
  const peakIdx     = baseUsage.indexOf(maxUsage);
  const peakDay     = weekDays[peakIdx];
  const trendPct    = (((seed * 3) % 26) - 10);
  const trendUp     = trendPct >= 0;

  // All matching orders (open + completed)
  const allOrders = [...openOrders, ...completedOrders];
  const historyOrders = allOrders.filter(o =>
    o.lineItems && o.lineItems.some(li =>
      li.name.toLowerCase().includes(item.name.split(' ')[0].toLowerCase()) ||
      (li.mods && li.mods.some(m => m.name.toLowerCase().includes(item.name.split(' ')[0].toLowerCase())))
    )
  );
  // Show up to 10 recent orders
  const recentOrders = historyOrders.slice(0, 10);

  // ── Chart bars with hover tooltips ──
  const chartH   = 88;
  const barsHtml = baseUsage.map((v, i) => {
    const barH    = maxUsage > 0 ? Math.max(6, Math.round((v / maxUsage) * chartH)) : 6;
    const isPeak  = i === peakIdx;
    const isToday = i === 6;
    const barCol  = isPeak
      ? 'var(--accent)'
      : isToday ? 'rgba(124,58,237,.5)'
      : isL ? 'rgba(124,58,237,.15)' : 'rgba(124,58,237,.25)';
    const revenue = (v * item.price).toFixed(2);
    // Tooltip shown on hover via CSS-driven absolute div
    return `
      <div class="chart-bar-wrap" style="flex:1;display:flex;flex-direction:column;align-items:center;position:relative;cursor:pointer"
        onmouseenter="this.querySelector('.chart-tip').style.opacity='1';this.querySelector('.chart-tip').style.transform='translateX(-50%) translateY(0)'"
        onmouseleave="this.querySelector('.chart-tip').style.opacity='0';this.querySelector('.chart-tip').style.transform='translateX(-50%) translateY(4px)'">
        <!-- Tooltip -->
        <div class="chart-tip" style="position:absolute;bottom:${barH+14}px;left:50%;transform:translateX(-50%) translateY(4px);
          background:${isL?'#1f2330':'#1f2330'};color:#fff;border-radius:8px;padding:6px 9px;white-space:nowrap;
          pointer-events:none;z-index:10;opacity:0;transition:opacity .15s,transform .15s;
          box-shadow:0 4px 12px rgba(0,0,0,.25)">
          <div style="font-size:10px;font-weight:800;color:#fff">${weekDays[i]}</div>
          <div style="font-size:11px;font-weight:900;color:var(--accent);margin-top:1px">${v} ${isModifier?'uses':'sold'}</div>
          <div style="font-size:10px;color:rgba(255,255,255,.6);margin-top:1px">$${revenue}</div>
          <div style="position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:8px;height:8px;background:#1f2330;clip-path:polygon(0 0,100% 0,50% 100%)"></div>
        </div>
        <!-- Bar -->
        <div style="width:100%;border-radius:4px 4px 0 0;background:${barCol};height:${barH}px;transition:filter .15s"
          onmouseenter="this.style.filter='brightness(1.2)'" onmouseleave="this.style.filter='none'"></div>
        <!-- Day label -->
        <div style="font-size:9px;font-weight:${isPeak||isToday?'800':'500'};color:${isPeak?'var(--accent)':isToday?'var(--accent)':textMuted};margin-top:5px">${weekDays[i]}</div>
      </div>`;
  }).join('');

  // ── Row renderer for recent orders ──
  const orderRowsHtml = (orders) => orders.length === 0 ? `
    <div style="padding:28px 16px;text-align:center">
      <div style="font-size:28px;margin-bottom:8px">📭</div>
      <div style="font-size:12px;font-weight:700;color:${textSub}">No matching orders</div>
      <div style="font-size:11px;color:${textMuted};margin-top:3px">Orders with this ${isModifier?'modifier':'item'} appear here</div>
    </div>` :
    orders.map((o, idx, arr) => `
      <div onclick="openOrderDetailFromAll('${o.num}')"
        style="display:flex;align-items:center;gap:10px;padding:11px 16px;${idx < arr.length-1 ? 'border-bottom:1px solid '+bdr : ''};cursor:pointer;transition:background .12s"
        onmouseover="this.style.background='${isL?'#f9fafb':'rgba(255,255,255,.03)'}'" onmouseout="this.style.background='transparent'">
        <div style="width:8px;height:8px;border-radius:50%;background:${statusColor[o.status]||'var(--text3)'};flex-shrink:0"></div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:2px">
            <span style="font-size:12px;font-weight:800;color:${textMain}">${o.num}</span>
            <span style="font-size:10px;color:${textMuted}">${o.time} ago</span>
          </div>
          <div style="font-size:11px;color:${textMuted};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${channelIcon[o.channel]||'📦'} ${o.channel} · ${o.customer && o.customer.name ? o.customer.name : o.customer}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:13px;font-weight:900;color:${textMain}">${o.amount}</div>
          <div style="font-size:9px;font-weight:700;color:${statusColor[o.status]||'var(--text3)'};margin-top:2px;text-transform:uppercase;letter-spacing:.04em">${o.status}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${textMuted}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`).join('');

  // ── Info row helper ──
  const infoRow = (label, value, last=false) => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;${last?'':'border-bottom:1px solid '+bdr}">
      <span style="font-size:12px;font-weight:600;color:${textMuted}">${label}</span>
      <span style="font-size:12px;font-weight:700;color:${textMain}">${value}</span>
    </div>`;

  // ── TAB 1: ITEM DETAIL (no hero tile — name already in page header) ──
  const detailHtml = `

    <!-- Item Info card: ID, Group, Category -->
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:16px;overflow:hidden;margin-bottom:12px">
      <div style="padding:12px 16px 8px">
        <div style="font-size:10px;font-weight:800;letter-spacing:.08em;color:${textMuted};text-transform:uppercase">Item Info</div>
      </div>
      <div style="height:1px;background:${bdr}"></div>
      ${infoRow('Item ID', '#' + item.id)}
      ${infoRow('External ID', item.extId ? `<span style="font-family:'DM Mono',monospace;font-size:11px;background:${isL?'#f3f4f6':'rgba(124,58,237,.1)'};color:${isL?'#374151':'var(--accent2)'};padding:2px 7px;border-radius:6px;letter-spacing:.02em">${item.extId}</span>` : '<span style="color:'+textMuted+'">—</span>')}
      ${infoRow('Menu Group', item.menuGroup || '—')}
      ${infoRow('Item Category', item.cat, true)}
    </div>

    <!-- Edit Details card -->
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:16px;overflow:hidden;margin-bottom:12px">
      <div style="padding:12px 16px 8px">
        <div style="font-size:10px;font-weight:800;letter-spacing:.08em;color:${textMuted};text-transform:uppercase">Edit Details</div>
      </div>
      <div style="height:1px;background:${bdr}"></div>

      <div style="padding:12px 16px 0">
        <div style="font-size:11px;font-weight:700;color:${textSub};margin-bottom:6px">Price</div>
        <div style="position:relative">
          <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:13px;font-weight:700;color:${textMuted};pointer-events:none">$</span>
          <input class="field-input" id="editPrice" type="number" step="0.01" placeholder="0.00" value="${item.price.toFixed(2)}"
            style="padding-left:26px;width:100%;box-sizing:border-box"
            oninput="document.getElementById('editPriceError').style.display='none';this.style.borderColor='';this.style.boxShadow=''">
        </div>
        <div id="editPriceError" style="display:none;margin-top:4px;font-size:11px;font-weight:700;color:var(--red)"></div>
      </div>

      <div style="height:1px;background:${bdr};margin:12px 0 0"></div>

      <div style="padding:12px 16px 0">
        <div style="font-size:11px;font-weight:700;color:${textSub};margin-bottom:8px">Availability</div>
        <div style="display:flex;align-items:center;gap:10px">
          <label class="toggle" id="edit86Toggle">
            <input type="checkbox" id="edit86" ${item.is86?'checked':''} onchange="toggle86()">
            <div class="toggle-track"></div><div class="toggle-thumb"></div>
          </label>
          <span style="font-size:12px;color:${textSub};flex:1">Enable item count</span>
          <input class="field-input" id="editQty" type="number" placeholder="Qty" value="${item.stock}"
            ${item.is86?'':'disabled'}
            style="width:72px;text-align:center;opacity:${item.is86?'1':'0.4'};background:${item.is86?inputBg:'var(--surface3)'};transition:opacity .2s,background .2s">
        </div>
      </div>

      <div style="height:1px;background:${bdr};margin:12px 0 0"></div>

      <div style="padding:12px 16px 0;display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-size:11px;font-weight:700;color:${textSub}">Item Active</div>
          <div style="font-size:11px;color:${textMuted};margin-top:1px">Visible & orderable on all channels</div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="editActive" ${item.active?'checked':''}>
          <div class="toggle-track"></div><div class="toggle-thumb"></div>
        </label>
      </div>

      <div style="height:1px;background:${bdr};margin:12px 0 0"></div>

      <div style="padding:12px 16px 16px">
        <div style="font-size:11px;font-weight:700;color:${textSub};margin-bottom:10px">Channel Visibility</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${[
            {icon:'🖥', label:'Kiosk',        checked:true},
            {icon:'📱', label:'Handheld',      checked:true},
            {icon:'🌸', label:'Plum Ordering', checked:false},
            {icon:'🍽', label:'Plum Catering', checked:true},
          ].map(ch => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:${surface2};border-radius:10px;border:1px solid ${bdr}">
              <span style="font-size:12px;font-weight:600;color:${textSub};display:flex;align-items:center;gap:6px">
                <span style="font-size:14px">${ch.icon}</span>${ch.label}
              </span>
              <label class="toggle" style="flex-shrink:0">
                <input type="checkbox" ${ch.checked?'checked':''} onchange="showSuccess('Channel Updated','${ch.label} visibility saved.')">
                <div class="toggle-track"></div><div class="toggle-thumb"></div>
              </label>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <button class="save-btn" onclick="saveItemFromDetailPage()">Save Changes</button>`;

  // ── Pre-compute analytics data for sales tab ──
  const channelBreakdown = {};
  historyOrders.forEach(o => {
    const ch = o.channel || 'Other';
    if (!channelBreakdown[ch]) channelBreakdown[ch] = { count: 0, rev: 0 };
    channelBreakdown[ch].count++;
    channelBreakdown[ch].rev += parseFloat((o.amount || '$0').replace('$','')) || 0;
  });
  const channelTotal = Object.values(channelBreakdown).reduce((a,b) => a + b.count, 0) || 1;
  const channelEntries = Object.entries(channelBreakdown).sort((a,b) => b[1].count - a[1].count);
  const channelColors = { 'Uber Eats':'var(--green)', 'DoorDash':'var(--red)', 'GrubHub':'var(--amber)', 'In-House':'var(--accent)' };
  const avgOrderVal = historyOrders.length > 0
    ? (historyOrders.reduce((a,o) => a + (parseFloat((o.amount||'$0').replace('$',''))||0), 0) / historyOrders.length).toFixed(2)
    : '0.00';
  const modCounts = {};
  historyOrders.forEach(o => {
    (o.lineItems||[]).forEach(li => {
      if (li.name && li.name.toLowerCase().includes(item.name.split(' ')[0].toLowerCase())) {
        (li.mods||[]).forEach(m => { if (m && m.name) modCounts[m.name] = (modCounts[m.name]||0) + 1; });
      }
    });
  });
  const topMods = Object.entries(modCounts).sort((a,b)=>b[1]-a[1]).slice(0,4);
  const hourBuckets = { 'Morning':0, 'Lunch':0, 'Afternoon':0, 'Dinner':0 };
  const hourLabels  = { 'Morning':'6 – 11 AM', 'Lunch':'11 AM – 2 PM', 'Afternoon':'2 – 5 PM', 'Dinner':'5 – 10 PM' };
  const hourIcons   = { 'Morning':'🌅', 'Lunch':'☀️', 'Afternoon':'🌤', 'Dinner':'🌙' };
  historyOrders.forEach(o => {
    const t = o.time || '';
    const hMatch = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (hMatch) {
      let h = parseInt(hMatch[1]); const pm = hMatch[3].toUpperCase()==='PM';
      if (pm && h !== 12) h += 12; if (!pm && h === 12) h = 0;
      if      (h >= 6  && h < 11) hourBuckets['Morning']++;
      else if (h >= 11 && h < 14) hourBuckets['Lunch']++;
      else if (h >= 14 && h < 17) hourBuckets['Afternoon']++;
      else if (h >= 17 && h < 22) hourBuckets['Dinner']++;
    }
  });
  const maxHourCount = Math.max(...Object.values(hourBuckets), 1);
  const dateRangeOpts = [
    { val:'thisweek',   label:'This Week'   },
    { val:'lastweek',   label:'Last Week'   },
    { val:'last2weeks', label:'Last 2 Wks'  },
    { val:'thismonth',  label:'This Month'  },
  ];

  // ── TAB 2: SALES ANALYTICS (manager view) ──
  const salesHtml = `

    <!-- Date range filter pills (same UI as menu category chips) -->
    <div style="margin-bottom:12px">
      <div style="display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px">
        ${dateRangeOpts.map(opt => `
          <div onclick="switchSalesDateRange('${opt.val}', ${item.id})"
            id="salesRangeBtn-${opt.val}"
            class="cat-chip${opt.val==='thisweek'?' active':''}">
            ${opt.label}
          </div>`).join('')}
      </div>
    </div>

    <!-- KPI strip: sold / revenue / peak / per-order -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:7px;margin-bottom:12px">
      <div style="background:${cardBg};border:1px solid ${bdr};border-radius:14px;padding:11px 6px;text-align:center">
        <div style="font-size:16px;font-weight:900;color:var(--accent)" id="kpiSold">${totalSold}</div>
        <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${textMuted};margin-top:3px">${isModifier?'Uses':'Sold'}</div>
      </div>
      <div style="background:${cardBg};border:1px solid ${bdr};border-radius:14px;padding:11px 6px;text-align:center">
        <div style="font-size:16px;font-weight:900;color:var(--green)" id="kpiRevenue">$${weekRevenue}</div>
        <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${textMuted};margin-top:3px">Revenue</div>
      </div>
      <div style="background:${cardBg};border:1px solid ${bdr};border-radius:14px;padding:11px 6px;text-align:center">
        <div style="font-size:16px;font-weight:900;color:${textMain}">${peakDay}</div>
        <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${textMuted};margin-top:3px">Peak Day</div>
      </div>
      <div style="background:${cardBg};border:1px solid ${bdr};border-radius:14px;padding:11px 6px;text-align:center">
        <div style="font-size:16px;font-weight:900;color:var(--blue)" id="kpiAvgOrder">$${avgOrderVal}</div>
        <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${textMuted};margin-top:3px">Per Order</div>
      </div>
    </div>

    <!-- Sales by day chart -->
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:16px;overflow:visible;margin-bottom:12px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;padding:16px 16px 0">
        <div>
          <div style="font-size:13px;font-weight:800;color:${textMain}">${isModifier ? 'Usage by Day' : 'Sales by Day'}</div>
          <div style="font-size:11px;color:${textMuted};margin-top:2px">Selected period · hover bars for details</div>
        </div>
        <div style="text-align:right">
          <span style="font-size:11px;font-weight:700;color:${trendUp?'var(--green)':'var(--red)'}">
            ${trendUp?'▲':'▼'} ${Math.abs(trendPct)}%
          </span>
          <div style="font-size:10px;color:${textMuted};margin-top:1px">vs prior period</div>
        </div>
      </div>
      <div style="padding:20px 16px 4px;overflow:visible">
        <div style="display:flex;align-items:flex-end;gap:5px;height:${chartH}px;overflow:visible">
          ${barsHtml}
        </div>
      </div>
      <div style="padding:4px 16px 14px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:10px;color:${textMuted}">
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:var(--accent);margin-right:4px;vertical-align:middle"></span>Peak: ${peakDay} (${maxUsage})
        </span>
        <span style="font-size:10px;color:${textMuted}">
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:rgba(124,58,237,.5);margin-right:4px;vertical-align:middle"></span>Today (Sun)
        </span>
      </div>
    </div>

    <!-- Channel breakdown -->
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:16px;overflow:hidden;margin-bottom:12px">
      <div style="padding:14px 16px 10px">
        <div style="font-size:13px;font-weight:800;color:${textMain}">Channel Breakdown</div>
        <div style="font-size:11px;color:${textMuted};margin-top:2px">Where ${isModifier?'modifier usage':'orders'} come from</div>
      </div>
      <div style="height:1px;background:${bdr}"></div>
      <div style="padding:12px 16px">
        ${channelEntries.length === 0
          ? `<div style="font-size:12px;color:${textMuted};text-align:center;padding:8px 0">No channel data available</div>`
          : channelEntries.map(([ch, data]) => {
              const pct = Math.round((data.count / channelTotal) * 100);
              const color = channelColors[ch] || 'var(--text3)';
              return `<div style="margin-bottom:10px">
                <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
                  <span style="font-size:12px;font-weight:700;color:${textMain}">${channelIcon[ch]||'📦'} ${ch}</span>
                  <span style="font-size:11px;font-weight:700;color:${textMuted}">${data.count} · $${data.rev.toFixed(0)}</span>
                </div>
                <div style="height:6px;background:${isL?'#f3f4f6':'var(--surface3)'};border-radius:3px;overflow:hidden">
                  <div style="height:100%;width:${pct}%;background:${color};border-radius:3px"></div>
                </div>
                <div style="font-size:10px;color:${textMuted};margin-top:2px">${pct}% of orders</div>
              </div>`;
            }).join('')}
      </div>
    </div>

    <!-- Peak hours heatmap -->
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:16px;overflow:hidden;margin-bottom:12px">
      <div style="padding:14px 16px 10px">
        <div style="font-size:13px;font-weight:800;color:${textMain}">Peak Hours</div>
        <div style="font-size:11px;color:${textMuted};margin-top:2px">When this ${isModifier?'modifier':'item'} is ordered most</div>
      </div>
      <div style="height:1px;background:${bdr}"></div>
      <div style="padding:12px 16px;display:grid;grid-template-columns:1fr 1fr;gap:10px">
        ${Object.entries(hourBuckets).map(([key, count]) => {
          const opacity = (0.08 + (count / maxHourCount) * 0.28).toFixed(2);
          const borderOp = (parseFloat(opacity) * 1.8).toFixed(2);
          return `<div style="background:rgba(124,58,237,${opacity});border:1px solid rgba(124,58,237,${borderOp});border-radius:12px;padding:10px 12px">
            <div style="font-size:18px;margin-bottom:3px">${hourIcons[key]}</div>
            <div style="font-size:11px;font-weight:800;color:${textMain}">${key}</div>
            <div style="font-size:10px;color:${textMuted};margin-top:1px">${hourLabels[key]}</div>
            <div style="font-size:15px;font-weight:900;color:var(--accent);margin-top:6px">${count}<span style="font-size:10px;font-weight:600;color:${textMuted}"> orders</span></div>
          </div>`;
        }).join('')}
      </div>
    </div>

    ${topMods.length > 0 ? `
    <!-- Most requested modifications -->
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:16px;overflow:hidden;margin-bottom:12px">
      <div style="padding:14px 16px 10px">
        <div style="font-size:13px;font-weight:800;color:${textMain}">Frequently Paired Mods</div>
        <div style="font-size:11px;color:${textMuted};margin-top:2px">Most requested modifications on this item</div>
      </div>
      <div style="height:1px;background:${bdr}"></div>
      ${topMods.map(([mod, count], idx, arr) => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;${idx<arr.length-1?'border-bottom:1px solid '+bdr:''}">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:24px;height:24px;border-radius:7px;background:rgba(124,58,237,.1);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:var(--accent)">${idx+1}</div>
            <span style="font-size:12px;font-weight:600;color:${textMain}">${mod}</span>
          </div>
          <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:10px;background:rgba(124,58,237,.08);color:var(--accent)">${count}×</span>
        </div>`).join('')}
    </div>` : ''}

    <!-- Orders list — fully clickable -->
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:16px;overflow:hidden;margin-bottom:12px" id="salesOrdersList">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px">
        <div>
          <div style="font-size:13px;font-weight:800;color:${textMain}">Orders</div>
          <div style="font-size:11px;color:${textMuted};margin-top:2px">${isModifier ? 'Orders using this modifier' : 'Orders containing this item'} · tap to view detail</div>
        </div>
        ${historyOrders.length > 0 ? `<span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;background:rgba(124,58,237,.1);color:var(--accent)">${historyOrders.length}</span>` : ''}
      </div>
      <div style="height:1px;background:${bdr}"></div>
      ${orderRowsHtml(recentOrders)}
      ${historyOrders.length > 10 ? `
        <div style="height:1px;background:${bdr}"></div>
        <div onclick="expandSalesOrders(${item.id})" style="padding:12px 16px;text-align:center;font-size:11px;font-weight:700;color:var(--accent);cursor:pointer" id="salesShowMoreBtn">
          View ${historyOrders.length - 10} more orders ›
        </div>` : ''}
    </div>`;

  // Store tabs + render
  const page = document.getElementById('itemDetailPage');
  page._tabDetail = detailHtml;
  page._tabSales  = salesHtml;
  page._activeTab = 'detail';

  document.getElementById('itemDetailTitle').textContent = item.name;
  document.getElementById('itemDetailBody').innerHTML = detailHtml;

  // Reset tab bar
  const tDetail = document.getElementById('itemTab-detail');
  const tSales  = document.getElementById('itemTab-sales');
  if (tDetail) { tDetail.style.borderBottomColor = 'var(--accent)'; tDetail.style.color = 'var(--accent)'; }
  if (tSales)  { tSales.style.borderBottomColor  = 'transparent';   tSales.style.color  = isL ? '#9ca3af' : 'var(--text3)'; }

  page.style.display = 'flex';
  const hdr  = document.getElementById('itemDetailHeader');
  const body = document.getElementById('itemDetailBody');
  if (isL) {
    page.style.background       = '#f2f4f8';
    hdr.style.background        = '#ffffff';
    hdr.style.borderBottomColor = '#e5e7eb';
    body.style.background       = '#f2f4f8';
  } else {
    page.style.background       = 'var(--surface)';
    hdr.style.background        = 'var(--surface)';
    hdr.style.borderBottomColor = 'var(--border)';
    body.style.background       = 'var(--surface2)';
  }
}

// ── Date range switcher for item sales tab ──
function switchSalesDateRange(range, itemId) {
  // Toggle the active chip (same behaviour as menu category chips)
  ['thisweek','lastweek','last2weeks','thismonth'].forEach(r => {
    const btn = document.getElementById('salesRangeBtn-' + r);
    if (!btn) return;
    btn.classList.toggle('active', r === range);
  });

  // Re-compute seeded data scaled by range multiplier
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;
  const multipliers = { thisweek:1, lastweek:0.85, last2weeks:1.85, thismonth:3.4 };
  const m = multipliers[range] || 1;
  const seed = item.id * 7;
  const isModifier = item.type === 'Modifier';
  const base = isModifier ? 5 : 10;
  const weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const usage = weekDays.map((_,i) => Math.round((base + ((seed * (i+1) * 13) % (isModifier ? 12 : 18))) * m));
  const maxU   = Math.max(...usage);
  const totalU = usage.reduce((a,b)=>a+b,0);
  const revU   = (totalU * item.price).toFixed(0);
  const peakI  = usage.indexOf(maxU);
  const trendPct = (((seed * 3) % 26) - 10);
  const trendUp  = trendPct >= 0;
  const isL = isLight;
  const textMuted = isL ? '#9ca3af' : 'var(--text3)';
  const textMain  = isL ? '#111827' : 'var(--text)';
  const chartH = 88;

  // Update KPI chips
  const kpiSold = document.getElementById('kpiSold');
  const kpiRev  = document.getElementById('kpiRevenue');
  const kpiAvg  = document.getElementById('kpiAvgOrder');
  if (kpiSold) kpiSold.textContent = totalU;
  if (kpiRev)  kpiRev.textContent  = '$' + revU;

  // ── Rebuild orders list for the selected range ──
  // The base matched orders for this item:
  const allOrders = [...openOrders, ...completedOrders];
  const baseMatched = allOrders.filter(o =>
    o.lineItems && o.lineItems.some(li =>
      li.name && (
        li.name.toLowerCase().includes(item.name.split(' ')[0].toLowerCase()) ||
        (li.mods && li.mods.some(mm => mm && mm.name && mm.name.toLowerCase().includes(item.name.split(' ')[0].toLowerCase())))
      )
    )
  );
  // Scale order volume by range so longer windows show more orders.
  const orderMultipliers = { thisweek:1, lastweek:1, last2weeks:2, thismonth:4 };
  const om = orderMultipliers[range] || 1;
  let rangeOrders = [];
  for (let k = 0; k < om; k++) {
    baseMatched.forEach(o => {
      // For repeated copies, give a unique-looking order number suffix
      rangeOrders.push(k === 0 ? o : { ...o, num: o.num.replace('#', '#' + (9 - k)) });
    });
  }
  // Recompute avg order value over the range set
  if (kpiAvg) {
    const avg = rangeOrders.length
      ? (rangeOrders.reduce((a,o)=>a+(parseFloat((o.amount||'$0').replace('$',''))||0),0) / rangeOrders.length).toFixed(2)
      : '0.00';
    kpiAvg.textContent = '$' + avg;
  }

  // Re-render the orders list card body
  const listEl = document.getElementById('salesOrdersList');
  if (listEl) {
    const bdr2 = isL ? '#e5e7eb' : 'var(--border)';
    const cardBg2 = isL ? '#ffffff' : 'var(--surface)';
    const orderRows = (orders) => orders.length === 0 ? `
      <div style="padding:28px 16px;text-align:center">
        <div style="font-size:28px;margin-bottom:8px">📭</div>
        <div style="font-size:12px;font-weight:700;color:${isL?'#374151':'var(--text2)'}">No matching orders</div>
        <div style="font-size:11px;color:${textMuted};margin-top:3px">Orders with this ${isModifier?'modifier':'item'} appear here</div>
      </div>` :
      orders.map((o, idx, arr) => `
        <div onclick="openOrderDetailFromAll('${o.num}')"
          style="display:flex;align-items:center;gap:10px;padding:11px 16px;${idx < arr.length-1 ? 'border-bottom:1px solid '+bdr2 : ''};cursor:pointer;transition:background .12s"
          onmouseover="this.style.background='${isL?'#f9fafb':'rgba(255,255,255,.03)'}'" onmouseout="this.style.background='transparent'">
          <div style="width:8px;height:8px;border-radius:50%;background:${statusColor[o.status]||'var(--text3)'};flex-shrink:0"></div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:2px">
              <span style="font-size:12px;font-weight:800;color:${textMain}">${o.num}</span>
              <span style="font-size:10px;color:${textMuted}">${o.time} ago</span>
            </div>
            <div style="font-size:11px;color:${textMuted};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${channelIcon[o.channel]||'📦'} ${o.channel} · ${o.customer && o.customer.name ? o.customer.name : o.customer}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:13px;font-weight:900;color:${textMain}">${o.amount}</div>
            <div style="font-size:9px;font-weight:700;color:${statusColor[o.status]||'var(--text3)'};margin-top:2px;text-transform:uppercase;letter-spacing:.04em">${o.status}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${textMuted}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>`).join('');

    const shown = rangeOrders.slice(0, 10);
    listEl.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px">
        <div>
          <div style="font-size:13px;font-weight:800;color:${textMain}">Orders</div>
          <div style="font-size:11px;color:${textMuted};margin-top:2px">${isModifier ? 'Orders using this modifier' : 'Orders containing this item'} · tap to view detail</div>
        </div>
        ${rangeOrders.length > 0 ? `<span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;background:rgba(124,58,237,.1);color:var(--accent)">${rangeOrders.length}</span>` : ''}
      </div>
      <div style="height:1px;background:${bdr2}"></div>
      ${orderRows(shown)}
      ${rangeOrders.length > 10 ? `
        <div style="height:1px;background:${bdr2}"></div>
        <div onclick="expandSalesOrders(${item.id}, '${range}')" style="padding:12px 16px;text-align:center;font-size:11px;font-weight:700;color:var(--accent);cursor:pointer" id="salesShowMoreBtn">
          View ${rangeOrders.length - 10} more orders ›
        </div>` : ''}`;
  }

  // Re-render chart bars inside existing card
  const barWrap = document.querySelector('#itemDetailBody .chart-bar-wrap')?.parentElement;
  if (barWrap) {
    const barsHtml = usage.map((v, i) => {
      const barH   = maxU > 0 ? Math.max(6, Math.round((v / maxU) * chartH)) : 6;
      const isPeak = i === peakI;
      const isToday= i === 6;
      const barCol = isPeak ? 'var(--accent)' : isToday ? 'rgba(124,58,237,.5)' : isL ? 'rgba(124,58,237,.15)' : 'rgba(124,58,237,.25)';
      const revenue = (v * item.price).toFixed(2);
      return `<div class="chart-bar-wrap" style="flex:1;display:flex;flex-direction:column;align-items:center;position:relative;cursor:pointer"
        onmouseenter="this.querySelector('.chart-tip').style.opacity='1';this.querySelector('.chart-tip').style.transform='translateX(-50%) translateY(0)'"
        onmouseleave="this.querySelector('.chart-tip').style.opacity='0';this.querySelector('.chart-tip').style.transform='translateX(-50%) translateY(4px)'">
        <div class="chart-tip" style="position:absolute;bottom:${barH+14}px;left:50%;transform:translateX(-50%) translateY(4px);background:#1f2330;color:#fff;border-radius:8px;padding:6px 9px;white-space:nowrap;pointer-events:none;z-index:10;opacity:0;transition:opacity .15s,transform .15s;box-shadow:0 4px 12px rgba(0,0,0,.25)">
          <div style="font-size:10px;font-weight:800;color:#fff">${weekDays[i]}</div>
          <div style="font-size:11px;font-weight:900;color:var(--accent);margin-top:1px">${v} ${isModifier?'uses':'sold'}</div>
          <div style="font-size:10px;color:rgba(255,255,255,.6);margin-top:1px">$${revenue}</div>
          <div style="position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:8px;height:8px;background:#1f2330;clip-path:polygon(0 0,100% 0,50% 100%)"></div>
        </div>
        <div style="width:100%;border-radius:4px 4px 0 0;background:${barCol};height:${barH}px;transition:filter .15s"
          onmouseenter="this.style.filter='brightness(1.2)'" onmouseleave="this.style.filter='none'"></div>
        <div style="font-size:9px;font-weight:${isPeak||isToday?'800':'500'};color:${isPeak?'var(--accent)':isToday?'var(--accent)':textMuted};margin-top:5px">${weekDays[i]}</div>
      </div>`;
    }).join('');
    barWrap.innerHTML = barsHtml;
  }
}

// ── Expand full order list in sales tab ──
function expandSalesOrders(itemId, range) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;
  const allOrders = [...openOrders, ...completedOrders];
  const baseMatched = allOrders.filter(o =>
    o.lineItems && o.lineItems.some(li =>
      li.name && (
        li.name.toLowerCase().includes(item.name.split(' ')[0].toLowerCase()) ||
        (li.mods && li.mods.some(m => m && m.name && m.name.toLowerCase().includes(item.name.split(' ')[0].toLowerCase())))
      )
    )
  );
  // Apply same range scaling used in switchSalesDateRange
  const orderMultipliers = { thisweek:1, lastweek:1, last2weeks:2, thismonth:4 };
  const om = orderMultipliers[range] || 1;
  let historyOrders = [];
  for (let k = 0; k < om; k++) {
    baseMatched.forEach(o => {
      historyOrders.push(k === 0 ? o : { ...o, num: o.num.replace('#', '#' + (9 - k)) });
    });
  }
  const isL = isLight;
  const bdr = isL ? '#e5e7eb' : 'var(--border)';
  const textMain  = isL ? '#111827' : 'var(--text)';
  const textMuted = isL ? '#9ca3af' : 'var(--text3)';
  const isModifier = item.type === 'Modifier';

  const orderRowsHtml = (orders) => orders.map((o, idx, arr) => `
    <div onclick="openOrderDetailFromAll('${o.num}')"
      style="display:flex;align-items:center;gap:10px;padding:11px 16px;${idx < arr.length-1 ? 'border-bottom:1px solid '+bdr : ''};cursor:pointer;transition:background .12s"
      onmouseover="this.style.background='${isL?'#f9fafb':'rgba(255,255,255,.03)'}'" onmouseout="this.style.background='transparent'">
      <div style="width:8px;height:8px;border-radius:50%;background:${statusColor[o.status]||'var(--text3)'};flex-shrink:0"></div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:2px">
          <span style="font-size:12px;font-weight:800;color:${textMain}">${o.num}</span>
          <span style="font-size:10px;color:${textMuted}">${o.time} ago</span>
        </div>
        <div style="font-size:11px;color:${textMuted};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${channelIcon[o.channel]||'📦'} ${o.channel} · ${o.customer && o.customer.name ? o.customer.name : o.customer}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:13px;font-weight:900;color:${textMain}">${o.amount}</div>
        <div style="font-size:9px;font-weight:700;color:${statusColor[o.status]||'var(--text3)'};margin-top:2px;text-transform:uppercase;letter-spacing:.04em">${o.status}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${textMuted}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>`).join('');

  const listEl  = document.getElementById('salesOrdersList');
  const moreBtn = document.getElementById('salesShowMoreBtn');
  if (listEl && moreBtn) {
    // Replace from divider onward with full list
    const divider = listEl.querySelector('[style*="height:1px"]');
    if (divider) {
      // Remove show-more button
      moreBtn.remove();
      // Append remaining rows
      const extra = historyOrders.slice(10);
      const frag = document.createElement('div');
      frag.innerHTML = orderRowsHtml(extra);
      while (frag.firstChild) listEl.appendChild(frag.firstChild);
    }
  }
}

function switchItemTab(tab) {
  const page  = document.getElementById('itemDetailPage');
  const body  = document.getElementById('itemDetailBody');
  const tDetail = document.getElementById('itemTab-detail');
  const tSales  = document.getElementById('itemTab-sales');
  const isL   = isLight;
  const inactiveColor = isL ? '#9ca3af' : 'var(--text3)';

  if (tab === 'detail') {
    body.innerHTML = page._tabDetail || '';
    tDetail.style.borderBottomColor = 'var(--accent)'; tDetail.style.color = 'var(--accent)';
    tSales.style.borderBottomColor  = 'transparent';   tSales.style.color  = inactiveColor;
  } else {
    body.innerHTML = page._tabSales || '';
    tSales.style.borderBottomColor  = 'var(--accent)'; tSales.style.color = 'var(--accent)';
    tDetail.style.borderBottomColor = 'transparent';   tDetail.style.color = inactiveColor;
  }
  page._activeTab = tab;
  body.scrollTop = 0;
}


function closeItemDetailPage() {
  document.getElementById('itemDetailPage').style.display = 'none';
  currentEditId = null;
}

function saveItemFromDetailPage() {
  if (!currentEditId) return;
  const item = menuItems.find(i => i.id===currentEditId);
  const rawPrice = document.getElementById('editPrice').value.trim();
  const parsedPrice = parseFloat(rawPrice);
  const priceInput = document.getElementById('editPrice');
  const priceErr = document.getElementById('editPriceError');
  if (!rawPrice || isNaN(parsedPrice) || parsedPrice < 0) {
    priceInput.style.borderColor = 'var(--red)';
    priceInput.style.boxShadow = '0 0 0 3px rgba(239,68,68,.15)';
    if (priceErr) { priceErr.textContent = 'Please enter a valid price (e.g. 9.99)'; priceErr.style.display = 'block'; }
    priceInput.focus();
    return;
  }
  priceInput.style.borderColor = '';
  priceInput.style.boxShadow = '';
  if (priceErr) priceErr.style.display = 'none';

  const newActive = document.getElementById('editActive').checked;
  const newIs86   = document.getElementById('edit86').checked;
  const newStock  = parseInt(document.getElementById('editQty').value) || item.stock;
  const isL = isLight;

  // Build change summary for confirmation
  const changes = [];
  if (parsedPrice !== item.price)    changes.push(`Price: $${item.price.toFixed(2)} → $${parsedPrice.toFixed(2)}`);
  if (newActive !== item.active)     changes.push(`Status: ${item.active?'Active':'Inactive'} → ${newActive?'Active':'Inactive'}`);
  if (newIs86 !== item.is86)         changes.push(`Item Count: ${item.is86?'On':'Off'} → ${newIs86?'On':'Off'}`);
  if (newIs86 && newStock !== item.stock) changes.push(`Qty: ${item.stock} → ${newStock}`);

  const detailCardHtml = changes.length > 0
    ? `<div style="display:flex;flex-direction:column;gap:4px">
        ${changes.map(c => `<div style="display:flex;align-items:center;gap:8px;font-size:12px">
          <span style="color:var(--text3)">•</span>
          <span style="color:var(--text2)">${c}</span>
        </div>`).join('')}
       </div>`
    : `<div style="font-size:12px;color:var(--text3)">No fields changed.</div>`;

  showConfirm({
    icon: '💾',
    title: `Save Changes?`,
    desc: `Review changes to "${item.name}" before saving.`,
    detailCard: detailCardHtml,
    okLabel: 'Save Changes',
    danger: false,
    onConfirm: () => {
      item.price  = parsedPrice;
      item.active = newActive;
      item.is86   = newIs86;
      item.stock  = newStock;
      closeItemDetailPage();
      renderMenuItems();
      showSuccess('Changes Saved', `"${item.name}" has been updated successfully.`);
    }
  });
}
function toggle86() {
  const is86 = document.getElementById('edit86').checked;
  const qtyInput = document.getElementById('editQty');
  const isL = isLight;
  qtyInput.disabled = !is86;
  qtyInput.style.opacity = is86 ? '1' : '0.4';
  qtyInput.style.background = is86 ? (isL ? '#ffffff' : 'var(--surface2)') : 'var(--surface3)';
  qtyInput.style.cursor = is86 ? 'text' : 'not-allowed';
  if (is86) qtyInput.focus();
}
function saveItem() {
  if (!currentEditId) return;
  const item = menuItems.find(i => i.id===currentEditId);
  const rawPrice = document.getElementById('legacyEditPrice').value.trim();
  const parsedPrice = parseFloat(rawPrice);
  const priceInput = document.getElementById('legacyEditPrice');
  const priceErr = document.getElementById('legacyEditPriceError');
  if (!rawPrice || isNaN(parsedPrice) || parsedPrice < 0) {
    priceInput.style.borderColor = 'var(--red)';
    priceInput.style.boxShadow = '0 0 0 3px rgba(239,68,68,.15)';
    if (priceErr) { priceErr.textContent = 'Please enter a valid price (e.g. 9.99)'; priceErr.style.display = 'block'; }
    priceInput.focus();
    return;
  }
  priceInput.style.borderColor = '';
  priceInput.style.boxShadow = '';
  if (priceErr) priceErr.style.display = 'none';
  item.price = parsedPrice;
  item.active = document.getElementById('legacyEditActive').checked;
  item.is86 = document.getElementById('legacyEdit86').checked;
  item.stock = parseInt(document.getElementById('legacyEditQty').value) || item.stock;
  closeModal('itemModal');
  renderMenuItems();
  showSuccess('Changes Saved', `"${item.name}" has been updated successfully.`);
}

// Legacy modal's item-count toggle (kept for the unused itemModal)
function toggleLegacy86() {
  const is86 = document.getElementById('legacyEdit86').checked;
  const qtyInput = document.getElementById('legacyEditQty');
  const isL = isLight;
  qtyInput.disabled = !is86;
  qtyInput.style.opacity = is86 ? '1' : '0.4';
  qtyInput.style.background = is86 ? (isL ? '#ffffff' : 'var(--surface2)') : 'var(--surface3)';
  qtyInput.style.cursor = is86 ? 'text' : 'not-allowed';
  if (is86) qtyInput.focus();
}

// ─────────────── ONLINE ORDERING ───────────────
let delayMins = 10, throttleOrders = 12;
// ─── Plum Ordering — state ───
let _posTerminalPaused = false, _posResumeTimer = null;
let _posTerminalOpt = 1, _posTerminalHours = 4;
let _posCustomPauseTime = '14:30';
let _storeDisabled = false, _storeReenableHours = null, _storeResumeTimer = null;
let _storePublicMsgType = 'default';
let _throttleEnabled = false, _throttleOrders = 10, _throttleAmount = 500;
let _posBannerSubText = 'Paused until manually re-enabled';
let _disableStoreBannerSub = 'Not accepting Plum Ordering orders';

// ─── Combined Online Banner renderer ───
function renderOnlineBanner() {
  const banner = document.getElementById('onlineBanner');
  if (!banner) return;
  const posPaused = _posTerminalPaused;
  const storeDis  = _storeDisabled;

  if (!posPaused && !storeDis) { banner.style.display = 'none'; return; }

  const pauseSub = document.getElementById('pauseBannerSub_val') || { textContent: '' };
  const posSub   = _posBannerSubText || 'Paused until manually re-enabled';
  const storeSub = _disableStoreBannerSub || 'Not accepting Plum Ordering orders';

  if (posPaused && storeDis) {
    // Both active — one combined card with two rows inside
    banner.style.display = 'block';
    banner.innerHTML = `
      <div style="background:rgba(245,158,11,.12);border:1.5px solid var(--amber);border-radius:14px;padding:11px 14px;display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <span style="font-size:16px">⚠️</span>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:800;color:var(--amber)">POS Blocking All Online Orders</div>
          <div style="font-size:11px;color:var(--text2);margin-top:1px" id="pauseBannerSub">${posSub}</div>
        </div>
        <button onclick="resumeFromBanner()" style="padding:4px 10px;border-radius:8px;border:1.5px solid var(--amber);background:transparent;color:var(--amber);font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap">Resume</button>
      </div>
      <div style="background:rgba(239,68,68,.08);border:1.5px solid rgba(239,68,68,.3);border-radius:14px;padding:11px 14px;display:flex;align-items:center;gap:10px">
        <span style="font-size:16px">🚫</span>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:800;color:var(--red)">Plum Store Disabled</div>
          <div style="font-size:11px;color:var(--text2);margin-top:1px" id="disableStoreBannerSub">${storeSub}</div>
        </div>
      </div>`;
  } else if (posPaused) {
    banner.style.display = 'block';
    banner.innerHTML = `
      <div style="background:rgba(245,158,11,.12);border:1.5px solid var(--amber);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:10px">
        <span style="font-size:18px">⚠️</span>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:800;color:var(--amber)">POS Blocking All Online Orders</div>
          <div style="font-size:11px;color:var(--text2);margin-top:2px" id="pauseBannerSub">${posSub}</div>
        </div>
        <button onclick="resumeFromBanner()" style="padding:5px 10px;border-radius:8px;border:1.5px solid var(--amber);background:transparent;color:var(--amber);font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap">Resume</button>
      </div>`;
  } else {
    banner.style.display = 'block';
    banner.innerHTML = `
      <div style="background:rgba(239,68,68,.08);border:1.5px solid rgba(239,68,68,.3);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:10px">
        <span style="font-size:18px">🚫</span>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:800;color:var(--red)">Plum Store Disabled</div>
          <div style="font-size:11px;color:var(--text2);margin-top:2px" id="disableStoreBannerSub">${storeSub}</div>
        </div>
      </div>`;
  }
}

// ─── POS Terminal Pause ───
function handlePauseToggle(cb) {
  if (cb.checked) {
    _posTerminalOpt = 1; _posTerminalHours = 1;
    renderPosTerminalModal();
    document.getElementById('posTerminalModal').style.display = 'flex';
  } else {
    resumeFromBanner();
  }
}

function renderPosTerminalModal() {
  const isL = isLight;
  const bdr = isL ? '#e5e7eb' : 'var(--border)';
  const textMain = isL ? '#111827' : 'var(--text)';
  const textMuted = isL ? '#9ca3af' : 'var(--text3)';
  const optBg = (active) => active ? 'rgba(124,58,237,.07)' : (isL ? '#fff' : 'var(--surface2)');
  const optBdr = (active) => active ? 'var(--accent)' : bdr;

  const posHourOpts = [
    { val: 0.5, label: '30 Mins' },
    { val: 1, label: '1 Hr' },
    { val: 2, label: '2 Hrs' },
    { val: 24, label: '1 Day' },
    { val: 48, label: '2 Days' }
  ];
  const hourChips = posHourOpts.map(o => {
    const active = _posTerminalHours === o.val;
    return `<button onclick="setPosHours(${o.val}); event.stopPropagation();" style="padding:5px 11px;border-radius:20px;border:1.5px solid ${active?'var(--accent)':bdr};background:${active?'rgba(124,58,237,.1)':'transparent'};color:${active?'var(--accent)':textMuted};font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s">${o.label}</button>`;
  }).join('');

  document.getElementById('posTerminalModalBody').innerHTML = `
    <p style="font-size:12px;color:${textMuted};margin-bottom:14px">Stops the POS from accepting new online orders from Plum Ordering and third-party platforms. In-store and kiosk orders are not affected.</p>
    
    <div onclick="setPosTerminalOpt(1)" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;border:1.5px solid ${optBdr(_posTerminalOpt===1)};background:${optBg(_posTerminalOpt===1)};cursor:pointer;margin-bottom:10px;transition:all .15s">
      <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${_posTerminalOpt===1?'var(--accent)':bdr};background:${_posTerminalOpt===1?'var(--accent)':'transparent'};flex-shrink:0;display:flex;align-items:center;justify-content:center">
        ${_posTerminalOpt===1?'<div style="width:7px;height:7px;border-radius:50%;background:#fff"></div>':''}
      </div>
      <div><div style="font-size:13px;font-weight:700;color:${textMain}">Until manually re-enabled</div><div style="font-size:11px;color:${textMuted};margin-top:1px">Pauses until you turn it back on</div></div>
    </div>
    
    <div onclick="setPosTerminalOpt(2)" style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:12px;border:1.5px solid ${optBdr(_posTerminalOpt===2)};background:${optBg(_posTerminalOpt===2)};cursor:pointer;margin-bottom:10px;transition:all .15s">
      <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${_posTerminalOpt===2?'var(--accent)':bdr};background:${_posTerminalOpt===2?'var(--accent)':'transparent'};flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center">
        ${_posTerminalOpt===2?'<div style="width:7px;height:7px;border-radius:50%;background:#fff"></div>':''}
      </div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700;color:${textMain}">Pause for a set duration</div>
        <div style="font-size:11px;color:${textMuted};margin-top:1px;margin-bottom:${_posTerminalOpt===2?'10':'0'}px">Auto-resumes after selected time</div>
        ${_posTerminalOpt===2 ? `
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:8px" onclick="event.stopPropagation()">
          ${hourChips}
        </div>` : ''}
      </div>
    </div>
    
    <div onclick="setPosTerminalOpt(3)" style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:12px;border:1.5px solid ${optBdr(_posTerminalOpt===3)};background:${optBg(_posTerminalOpt===3)};cursor:pointer;transition:all .15s">
      <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${_posTerminalOpt===3?'var(--accent)':bdr};background:${_posTerminalOpt===3?'var(--accent)':'transparent'};flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center">
        ${_posTerminalOpt===3?'<div style="width:7px;height:7px;border-radius:50%;background:#fff"></div>':''}
      </div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700;color:${textMain}">Pause until a custom time</div>
        <div style="font-size:11px;color:${textMuted};margin-top:1px;margin-bottom:${_posTerminalOpt===3?'10':'0'}px">Select a specific time to automatically resume</div>
        ${_posTerminalOpt===3 ? `
        <div style="display:flex;align-items:center;gap:10px;margin-top:8px" onclick="event.stopPropagation()">
           <button onclick="openClockPicker('pause')" style="padding:8px 16px;border-radius:8px;border:1.5px solid ${bdr};background:var(--surface2);font-size:13px;font-family:'DM Mono', monospace;font-weight:700;cursor:pointer;color:${textMain};transition:all .15s">🕒 ${fmt12(_posCustomPauseTime)}</button>
        </div>` : ''}
      </div>
    </div>
  `;
}

function setPosTerminalOpt(n) { _posTerminalOpt = n; renderPosTerminalModal(); }
function setPosHours(val) { 
  _posTerminalHours = val; 
  _posTerminalOpt = 2; // Auto-select the set duration option
  renderPosTerminalModal(); 
}
function changePosHours(d) {
  _posTerminalHours = Math.max(1, Math.min(48, _posTerminalHours + d));
  const el = document.getElementById('posHoursVal');
  if (el) el.textContent = _posTerminalHours + ' hrs';
}
function closePosTerminalModal() {
  document.getElementById('posTerminalModal').style.display = 'none';
  document.getElementById('pauseToggle').checked = false;
}
function confirmPosTerminalPause() {
  if (_posResumeTimer) { clearTimeout(_posResumeTimer); _posResumeTimer = null; }
  let msg, bannerSub, toastSub;
  if (_posTerminalOpt === 1) {
    msg = 'POS blocking all online orders'; bannerSub = 'Paused until manually re-enabled'; toastSub = 'Will resume when you manually re-enable it.';
  } else if (_posTerminalOpt === 2) {
    const resume = new Date(Date.now() + _posTerminalHours * 3600000);
    const rs = resume.toLocaleTimeString([], { hour:'numeric', minute:'2-digit', hour12:true });
    msg = `Paused until ${rs}`; bannerSub = `Auto-resumes at ${rs}`; toastSub = `Auto-resumes at ${rs}.`;
  } else if (_posTerminalOpt === 3) {
    const rs = fmt12(_posCustomPauseTime);
    msg = `Paused until ${rs}`; bannerSub = `Auto-resumes at ${rs}`; toastSub = `Auto-resumes at ${rs}.`;
  }

  if (_posTerminalOpt !== 1) {
    _posResumeTimer = setTimeout(() => {
      _posTerminalPaused = false;
      _posBannerSubText = 'Paused until manually re-enabled';
      renderOnlineBanner();
      document.getElementById('dashPauseBanner').style.display = 'none';
      document.getElementById('pauseStatus').textContent = 'POS is accepting online orders';
      document.getElementById('pauseToggle').checked = false;
      const rTime = _posTerminalOpt === 3 ? fmt12(_posCustomPauseTime) : new Date(Date.now() + _posTerminalHours * 3600000).toLocaleTimeString([], { hour:'numeric', minute:'2-digit', hour12:true });
      showToast('✅', `Online ordering auto-resumed at ${rTime}.`);
      _posResumeTimer = null;
    }, 8000);
  }
  
  document.getElementById('pauseStatus').textContent = msg;
  _posBannerSubText = bannerSub;
  renderOnlineBanner();
  document.getElementById('dashPauseBannerSub').textContent = bannerSub;
  document.getElementById('dashPauseBanner').style.display = 'flex';
  document.getElementById('posTerminalModal').style.display = 'none';
  _posTerminalPaused = true;
  showSuccess('Online Ordering Paused', toastSub);
}

function resumeFromBanner() {
  if (_posResumeTimer) { clearTimeout(_posResumeTimer); _posResumeTimer = null; }
  _posTerminalPaused = false;
  _posBannerSubText = 'Paused until manually re-enabled';
  renderOnlineBanner();
  document.getElementById('dashPauseBanner').style.display = 'none';
  document.getElementById('pauseStatus').textContent = 'POS is accepting online orders';
  document.getElementById('pauseToggle').checked = false;
  showSuccess('Online Orders Resumed', 'POS is now accepting online orders from all platforms.');
}

// ─── Disable Store (Plum Ordering Settings) ───
let _reEnableOpt = null; // hours value or null=never
const _publicMsgs = {
  default:    'Online ordering is currently unavailable. Please use the location finder to choose another nearby store.',
  weather:    'This store is temporarily closed due to inclement weather conditions.',
  holiday:    'Observance of a Holiday.',
  remodel:    'This store is temporarily closed for renovation or maintenance. Please use the location finder to select another nearby store.'
};

function renderDisableStoreCard() {
  const isL = isLight;
  const bdr = isL ? '#e5e7eb' : 'var(--border)';
  const textMain = isL ? '#111827' : 'var(--text)';
  const textMuted = isL ? '#9ca3af' : 'var(--text3)';
  const inputBg = isL ? '#fff' : 'var(--surface2)';

  const reEnableOpts = [
    { val: 0.25, label: '15 min' }, { val: 0.5, label: '30 min' }, { val: 1, label: '1 Hr' },
    { val: 2, label: '2 Hrs' }, { val: 3, label: '3 Hrs' }, { val: 4, label: '4 Hrs' },
    { val: 8, label: '8 Hrs' }, { val: 72, label: '72 Hrs' }, { val: null, label: 'Never' }
  ];
  const chips = reEnableOpts.map(o => {
    const active = _reEnableOpt === o.val;
    return `<button onclick="setReEnable(${JSON.stringify(o.val)})" style="padding:5px 11px;border-radius:20px;border:1.5px solid ${active?'var(--accent)':bdr};background:${active?'rgba(124,58,237,.1)':'transparent'};color:${active?'var(--accent)':textMuted};font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s">${o.label}</button>`;
  }).join('');

  const msgBtnStyle = (key) => {
    const a = _storePublicMsgType === key;
    return `padding:5px 11px;border-radius:20px;border:1.5px solid ${a?'var(--accent)':bdr};background:${a?'rgba(124,58,237,.1)':'transparent'};color:${a?'var(--accent)':textMuted};font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s`;
  };

  document.getElementById('disableStoreModalBody').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:16px">
      <!-- Schedule Re-Enablement -->
      <div>
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:${textMuted};margin-bottom:8px">Schedule Re-Enablement</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">${chips}</div>
      </div>
      <!-- Divider -->
      <div style="height:1px;background:${bdr}"></div>
      <!-- Internal Reason -->
      <div>
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:${textMuted};margin-bottom:6px">Internal Reason</div>
        <input id="internalReason" type="text" placeholder="Enter reason for disabling store…"
          style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1.5px solid ${bdr};background:${inputBg};color:${textMain};font-size:12px;font-family:inherit;outline:none;transition:border-color .15s"
          onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='${bdr}'"/>
      </div>
      <!-- Divider -->
      <div style="height:1px;background:${bdr}"></div>
      <!-- Public Message -->
      <div>
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:${textMuted};margin-bottom:8px">Public Message</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
          <button onclick="setPublicMsg('default')" style="${msgBtnStyle('default')}">Default</button>
          <button onclick="setPublicMsg('weather')" style="${msgBtnStyle('weather')}">Inclement Weather</button>
          <button onclick="setPublicMsg('holiday')" style="${msgBtnStyle('holiday')}">Holiday</button>
          <button onclick="setPublicMsg('remodel')" style="${msgBtnStyle('remodel')}">Remodeling</button>
        </div>
        <textarea id="publicMsgText" rows="3"
          style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1.5px solid ${bdr};background:${inputBg};color:${textMain};font-size:12px;font-family:inherit;outline:none;resize:none;transition:border-color .15s;line-height:1.5"
          onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='${bdr}'"
        >${_publicMsgs[_storePublicMsgType]}</textarea>
      </div>
    </div>
  `;
}

function setReEnable(val) { _reEnableOpt = val; renderDisableStoreCard(); }
function setPublicMsg(key) {
  _storePublicMsgType = key;
  renderDisableStoreCard();
}

function openDisableStoreModal() {
  _reEnableOpt = null;
  _storePublicMsgType = 'default';
  renderDisableStoreCard();
  const backdrop = document.getElementById('disableStoreModalBackdrop');
  const modal    = document.getElementById('disableStoreModal');
  backdrop.style.display = 'block';
  modal.style.display    = 'flex';
  // Slide up animation
  modal.style.transform  = 'translateY(100%)';
  modal.style.transition = 'none';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.style.transition = 'transform .3s cubic-bezier(.32,1,.28,1)';
      modal.style.transform  = 'translateY(0)';
    });
  });
}

function closeDisableStoreModal() {
  const modal    = document.getElementById('disableStoreModal');
  const backdrop = document.getElementById('disableStoreModalBackdrop');
  modal.style.transition = 'transform .25s ease-in';
  modal.style.transform  = 'translateY(100%)';
  setTimeout(() => {
    modal.style.display    = 'none';
    backdrop.style.display = 'none';
    // Always reset toggle on dismiss/cancel — user did not confirm
    const chk = document.getElementById('disableStoreToggleChk');
    if (chk) chk.checked = _storeDisabled; // keep ON only if already disabled
  }, 260);
}

function handleDisableStoreToggle(cb) {
  if (cb.checked) {
    openDisableStoreModal();
  } else {
    if (_storeDisabled) {
      showConfirm({
        icon: '✅', title: 'Re-enable Store?',
        desc: 'Plum Ordering will resume accepting orders.',
        okLabel: 'Re-enable',
        onConfirm: () => {
          _storeDisabled = false;
          _disableStoreBannerSub = 'Not accepting Plum Ordering orders';
          renderOnlineBanner();
          const dashBanner = document.getElementById('dashDisableStoreBanner');
          if (dashBanner) dashBanner.style.display = 'none';
          showSuccess('Store Re-enabled', 'Plum Ordering is now accepting orders.');
        }
      });
    }
  }
}

function saveDisableStore() {
  const reason = document.getElementById('internalReason')?.value?.trim() || '';
  const msg    = document.getElementById('publicMsgText')?.value?.trim() || _publicMsgs[_storePublicMsgType];
  _storeDisabled = true;

  // Compute subtext from re-enable option
  if (_reEnableOpt === null) {
    _disableStoreBannerSub = 'Re-enables manually only';
  } else {
    const resume = new Date(Date.now() + _reEnableOpt * 3600000);
    const rs = resume.toLocaleTimeString([], { hour:'numeric', minute:'2-digit', hour12:true });
    _disableStoreBannerSub = `Re-enables at ${rs}`;
  }

  // Close modal with slide-down
  const modal    = document.getElementById('disableStoreModal');
  const backdrop = document.getElementById('disableStoreModalBackdrop');
  modal.style.transition = 'transform .25s ease-in';
  modal.style.transform  = 'translateY(100%)';
  setTimeout(() => {
    modal.style.display    = 'none';
    backdrop.style.display = 'none';
    // Keep toggle ON
    const chk = document.getElementById('disableStoreToggleChk');
    if (chk) chk.checked = true;
    // Show on Plum Ordering page
    renderOnlineBanner();
    // Show on dashboard
    const dashBanner = document.getElementById('dashDisableStoreBanner');
    const dashSub    = document.getElementById('dashDisableStoreBannerSub');
    if (dashBanner) dashBanner.style.display = 'flex';
    if (dashSub)    dashSub.textContent = _disableStoreBannerSub;
    showSuccess('Store Disabled', _reEnableOpt === null
      ? 'Plum Ordering will stop accepting new orders until manually re-enabled.'
      : `Plum Ordering paused. ${_disableStoreBannerSub}.`);
  }, 260);
}

// ─── Order Throttling ───
function handleThrottleToggle(cb) {
  document.getElementById('throttleExpanded').style.display = cb.checked ? 'block' : 'none';
  _throttleEnabled = cb.checked;
}
function changeThrottleOrders(d) {
  _throttleOrders = Math.max(1, _throttleOrders + d);
  document.getElementById('throttleOrdersVal').textContent = _throttleOrders;
}
function changeThrottleAmount(d) {
  _throttleAmount = Math.max(0, _throttleAmount + d);
  document.getElementById('throttleAmountVal').textContent = _throttleAmount;
}

// ─── Delay ───
let pendingDelayMins = 10;
function changeDelay(d) {
  pendingDelayMins = Math.max(0, pendingDelayMins + d);
  document.getElementById('delayVal').textContent = pendingDelayMins + ' min';
}

// ─── Save settings ───
function saveOnlineSettings() {
  delayMins = pendingDelayMins;
  showSuccess('Settings Saved', 'Plum Ordering settings have been updated.');
}

// ─── Legacy compat ───
function closePauseModal() { closePosTerminalModal(); }
function confirmPause() { confirmPosTerminalPause(); }
function selectPauseOpt(n) { setPosTerminalOpt(n); }
function changePauseHours(d) { changePosHours(d); }
function changeThrottle(d) {
  pendingThrottleOrders = Math.max(1, pendingThrottleOrders + d);
  const el = document.getElementById('throttleVal');
  if (el) el.textContent = pendingThrottleOrders + ' orders';
}

// ─────────────── STORE HOURS ───────────────
function buildHours() {
  const el = document.getElementById('hoursListEl');
  el.innerHTML = days.map((d, i) => {
    const h = defaultHours[i];
    return `
      <div class="hours-row-v2" data-day="${i}">
        <div class="hours-row-top">
          <div class="day-label">${d}</div>
          <label class="toggle" style="flex-shrink:0">
            <input type="checkbox" ${h.enabled?'checked':''} onchange="confirmDayToggle(this,'${d}')">
            <div class="toggle-track"></div><div class="toggle-thumb"></div>
          </label>
        </div>
        <div class="hours-row-times">
          <span class="time-label">Open</span>
          <button class="time-btn" data-day="${i}" data-type="open" onclick="openClockPicker(${i},'open')">${fmt12(h.open)}</button>
          <span class="time-sep" style="color:var(--text3);font-size:12px;margin:0 4px">→</span>
          <span class="time-label">Close</span>
          <button class="time-btn" data-day="${i}" data-type="close" onclick="openClockPicker(${i},'close')">${fmt12(h.close)}</button>
        </div>
      </div>
    `;
  }).join('');
}

// ─────────────── PIN APPROVAL MODAL ───────────────
// ─────────────── SALES VIEW TOGGLE ───────────────
function renderPaymentRows() {
  const container = document.getElementById('payRowsContainer');
  if (!container) return;
  const d = dateData[getDateKey()];
  if (!d || !d.pay) return;
  const totalTips = d.pay.reduce((s,p) => s + p.tips, 0);
  container.innerHTML = d.pay.map(p => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:16px">${p.icon}</span>
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--text)">${p.name}</div>
          <div style="font-size:10px;color:var(--text3)">${p.orders} orders · tip $${p.tips.toFixed(0)}</div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-size:14px;font-weight:900;color:var(--text)">$${p.total.toLocaleString()}</div>
        <div style="font-size:10px;color:var(--text3)">${((p.total/d.total)*100).toFixed(1)}% of sales</div>
      </div>
    </div>`).join('');
  document.getElementById('payTotalTips').textContent = `Total tips: $${totalTips.toFixed(0)}`;
  const payTotal = document.getElementById('payTotalAmount');
  if (payTotal) payTotal.textContent = `Total: $${d.total.toLocaleString()}`;
}

function setSalesView(view) {
  const chartView = document.getElementById('salesChartView');
  const rcView    = document.getElementById('salesRCView');
  const payView   = document.getElementById('salesPayView');
  const tabChart  = document.getElementById('salesTabChart');
  const tabRC     = document.getElementById('salesTabRC');
  const tabPay    = document.getElementById('salesTabPay');
  const chartFooter = document.getElementById('chartFooter');
  if (!chartView) return;

  // Hide all views
  chartView.style.display = 'none';
  rcView.style.display    = 'none';
  if (payView) payView.style.display = 'none';
  if (chartFooter) chartFooter.style.display = 'none';

  // Reset all tabs
  const inactiveStyle = { background: 'transparent', color: 'var(--text2)' };
  const activeStyle   = { background: 'var(--accent)', color: '#fff' };
  [tabChart, tabRC, tabPay].forEach(t => { if(t) { t.style.background = inactiveStyle.background; t.style.color = inactiveStyle.color; }});

  if (view === 'chart') {
    chartView.style.display = 'block';
    if (chartFooter) chartFooter.style.display = 'flex';
    tabChart.style.background = activeStyle.background; tabChart.style.color = activeStyle.color;
  } else if (view === 'rc') {
    rcView.style.display = 'block';
    tabRC.style.background = activeStyle.background; tabRC.style.color = activeStyle.color;
    renderRCRows();
  } else if (view === 'pay') {
    if (payView) payView.style.display = 'block';
    if (tabPay) { tabPay.style.background = activeStyle.background; tabPay.style.color = activeStyle.color; }
    renderPaymentRows();
  }
}

let mPin = '';
function resolveCard(card, approved) {
  // Step 1: green flash
  card.style.transition = 'background .25s ease, border-color .25s ease, transform .25s ease';
  card.style.background = approved ? 'rgba(34,197,94,.18)' : 'rgba(239,68,68,.12)';
  card.style.borderLeftColor = approved ? 'var(--green)' : 'var(--red)';
  card.style.transform = 'scale(.98)';
  card.style.pointerEvents = 'none';

  // Step 2: collapse out
  setTimeout(() => {
    const h = card.offsetHeight;
    card.style.transition = 'opacity .3s ease, max-height .35s ease, padding .35s ease, margin .35s ease';
    card.style.overflow = 'hidden';
    card.style.maxHeight = h + 'px';
    requestAnimationFrame(() => {
      card.style.opacity = '0';
      card.style.maxHeight = '0';
      card.style.padding = '0';
      card.style.marginBottom = '0';
    });
    setTimeout(() => checkAllPendingDone(), 380);
  }, 420);
}

function buildRequestDetailCard(card, actionType) {
  const label      = card.querySelector('.pending-label')?.textContent.replace('⚠ ','') || '';
  const desc       = card.querySelector('.pending-desc')?.textContent || '';
  const staff      = card.querySelector('.pending-staff')?.textContent.replace('👤 ','') || '';
  const terminal   = card.querySelector('.pending-terminal')?.textContent.replace('🖥 ','') || '';
  const amount     = card.querySelector('.pending-amount')?.textContent || '';
  const time       = card.querySelector('[id^="ptime"]')?.textContent || '';
  const checkTotal = card.dataset.checkTotal || '—';
  const customer   = card.dataset.customer || '—';
  const rc         = card.dataset.rc || '—';

  const orderMatch = desc.match(/Order\s+(#\d+)/);
  const orderNum   = orderMatch ? orderMatch[1] : '—';
  const itemStr    = desc.includes('—') ? desc.split('—').slice(1).join('—').trim() : desc;

  const badgeType = label.toLowerCase().includes('void') ? 'void'
                  : label.toLowerCase().includes('comp') ? 'comp'
                  : label.toLowerCase().includes('cancel') ? 'cancel'
                  : 'discount';
  const badgeIcon = badgeType === 'void' ? '🚫' : badgeType === 'comp' ? '🎁' : badgeType === 'cancel' ? '✕' : '%';

  // For comp requests, show a meaningful item description
  let itemDisplay = itemStr;
  if (badgeType === 'comp') {
    const pctMatch = itemStr.match(/(\d+)%/);
    if (pctMatch) {
      itemDisplay = `${pctMatch[1]}% comp on full check`;
    } else {
      itemDisplay = itemStr || 'Full check comp';
    }
  }

  const amountColor = badgeType==='void' ? 'var(--red)' : badgeType==='comp' ? 'var(--amber)' : badgeType==='cancel' ? 'var(--text2)' : 'var(--blue)';

  return `
    <div class="confirm-detail-row" style="margin-bottom:10px">
      <span class="confirm-detail-type-badge ${badgeType}">${badgeIcon} ${label}</span>
      <span class="confirm-detail-amount" style="color:${amountColor}">${amount}</span>
    </div>
    <div class="confirm-detail-divider"></div>
    <div class="confirm-detail-row">
      <span class="confirm-detail-label">Order</span>
      <span class="confirm-detail-val">${orderNum}</span>
    </div>
    <div class="confirm-detail-row">
      <span class="confirm-detail-label">Name</span>
      <span class="confirm-detail-val">${itemDisplay}</span>
    </div>
    <div class="confirm-detail-row">
      <span class="confirm-detail-label">Check Total</span>
      <span class="confirm-detail-val" style="font-weight:800;color:var(--text)">${checkTotal}</span>
    </div>
    <div class="confirm-detail-divider"></div>
    <div class="confirm-detail-row">
      <span class="confirm-detail-label">Customer</span>
      <span class="confirm-detail-val">${customer.includes('—') ? customer.split('—')[0].trim() : customer}</span>
    </div>
    <div class="confirm-detail-row">
      <span class="confirm-detail-label">Revenue Center</span>
      <span class="confirm-detail-val">${rc}</span>
    </div>
    <div class="confirm-detail-divider"></div>
    <div class="confirm-detail-row">
      <span class="confirm-detail-label">Server</span>
      <span class="confirm-detail-val">${staff}</span>
    </div>
    <div class="confirm-detail-row">
      <span class="confirm-detail-label">Terminal</span>
      <span class="confirm-detail-val">${terminal}</span>
    </div>
    <div class="confirm-detail-row">
      <span class="confirm-detail-label">Requested</span>
      <span class="confirm-detail-val">${time}</span>
    </div>`;
}

function triggerApprove(btn, msg) {
  const card = btn.closest('.pending-card');
  const label = card.querySelector('.pending-label').textContent;
  const desc = card.querySelector('.pending-desc').textContent;
  const staff = card.querySelector('.pending-staff').textContent;
  showConfirm({
    icon: '✅',
    title: `Approve ${label.replace('⚠ ','').replace(' Override','')}?`,
    desc: 'Review the details below before approving.',
    detailCard: buildRequestDetailCard(card, 'approve'),
    okLabel: 'Yes, Approve',
    onConfirm: () => {
      resolveCard(card, true);
      showSuccess('Request Approved', msg || 'Action approved and logged.');
    }
  });
}

function triggerDeny(btn, msg) {
  const card = btn.closest('.pending-card');
  const label = card.querySelector('.pending-label').textContent;
  const desc = card.querySelector('.pending-desc').textContent;
  const staff = card.querySelector('.pending-staff').textContent;
  showConfirm({
    icon: '⛔',
    title: `Deny ${label.replace('⚠ ','').replace(' Override','')}?`,
    desc: 'Review the details below before denying.',
    detailCard: buildRequestDetailCard(card, 'deny'),
    okLabel: 'Yes, Deny',
    danger: true,
    onConfirm: () => {
      resolveCard(card, false);
      showDenial('Request Denied', msg || 'Action denied. Staff notified.');
    }
  });
}

// Central function to sync all auth-related badge counts
function syncAuthBadges(count) {
  // Dashboard card count
  const dash = document.getElementById('dashAuthCount');
  if (dash) dash.textContent = count;
  // Drawer nav badge (new id)
  const drBadge = document.getElementById('drawerAuthBadge');
  if (drBadge) { drBadge.textContent = count; drBadge.style.display = count > 0 ? '' : 'none'; }
}

function checkAllPendingDone() {
  const cards = document.querySelectorAll('#pendingCardsList .pending-card');
  const remaining = [...cards].filter(c => c.style.opacity !== '0' && c.style.maxHeight !== '0px').length;
  syncAuthBadges(remaining);
  const allDone = remaining === 0;
  if (allDone) {
    setTimeout(() => {
      document.getElementById('pendingCardsList').innerHTML = `
        <div style="text-align:center;padding:32px 16px">
          <div style="font-size:40px;margin-bottom:12px">✅</div>
          <div style="font-size:15px;font-weight:800;color:var(--text);margin-bottom:6px">All Caught Up!</div>
          <div style="font-size:12px;color:var(--text2)">No pending approvals require your attention.</div>
        </div>`;
      syncAuthBadges(0);
    }, 200);
  }
}

// ─────────────── ALERTS DETAIL ───────────────
let currentAlertIndex = null;
let activeAlertFilter = 'all';

function setAlertFilter(filter, chip) {
  activeAlertFilter = filter;
  document.querySelectorAll('.alert-pill').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  buildAlertsList('alertsListInline');
}

function updateAlertFilterCounts() {
  const unresolved = alertsData.filter(a => !a.resolved);
  const resolved   = alertsData.filter(a =>  a.resolved);
  const el = id => document.getElementById(id);
  if (el('filter-all-count'))      el('filter-all-count').textContent      = unresolved.length;
  if (el('filter-high-count'))     el('filter-high-count').textContent     = unresolved.filter(a => a.sev==='high').length;
  if (el('filter-medium-count'))   el('filter-medium-count').textContent   = unresolved.filter(a => a.sev==='medium').length;
  if (el('filter-low-count'))      el('filter-low-count').textContent      = unresolved.filter(a => a.sev==='low').length;
  if (el('filter-resolved-count')) el('filter-resolved-count').textContent = resolved.length;
}

function buildAlertsList(containerId) {
  const el = document.getElementById(containerId);
  let data = activeAlertFilter === 'resolved'
    ? alertsData.filter(a => a.resolved)
    : activeAlertFilter === 'all'
      ? alertsData.filter(a => !a.resolved)
      : alertsData.filter(a => !a.resolved && a.sev === activeAlertFilter);

  if (data.length === 0) {
    el.innerHTML = `<div style="text-align:center;padding:28px 16px;color:var(--text3)">
      <div style="font-size:28px;margin-bottom:8px">${activeAlertFilter==='resolved'?'📭':'✅'}</div>
      <div style="font-size:13px;font-weight:700;color:var(--text2);margin-bottom:4px">${activeAlertFilter==='resolved'?'No resolved alerts':'All clear!'}</div>
      <div style="font-size:11px">${activeAlertFilter==='resolved'?'Resolved alerts will appear here':'No ${activeAlertFilter} severity alerts right now'}</div>
    </div>`;
    return;
  }

  el.innerHTML = data.map((a) => {
    const idx = alertsData.indexOf(a);
    return `<div class="alert-item" style="cursor:pointer" onclick="openAlertDetail(${idx})">
      <div class="alert-icon-box ${a.color}">${a.icon}</div>
      <div class="alert-content">
        <div class="alert-title">${a.title}</div>
        <div class="alert-sub">${a.sub}</div>
        <div class="alert-footer">
          <span class="severity-badge ${a.sev}">${a.sev.toUpperCase()}</span>
          <span style="font-size:10px;color:var(--text3);margin-left:auto">${a.resolved ? '✓ Resolved' : 'Tap to view →'}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

function openAlertDetail(idx) {
  currentAlertIndex = idx;
  const a = alertsData[idx];
  document.getElementById('alertDetailTitle').textContent = a.title;
  const sevColor = a.sev === 'high' ? 'var(--red)' : a.sev === 'medium' ? 'var(--amber)' : 'var(--blue)';
  document.getElementById('alertDetailBody').innerHTML = `
    <div style="text-align:center;margin-bottom:16px">
      <div style="font-size:40px;margin-bottom:8px">${a.icon}</div>
      <span class="severity-badge ${a.sev}" style="font-size:11px">${a.sev.toUpperCase()} SEVERITY</span>
    </div>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:12px">
      <div style="font-size:11px;color:var(--text3);font-weight:700;text-transform:uppercase;margin-bottom:4px">Details</div>
      <div style="font-size:13px;color:var(--text);line-height:1.6">${a.sub}</div>
    </div>
    ${a.resolved ? `<div style="text-align:center;padding:8px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:10px;color:var(--green);font-size:12px;font-weight:700">✓ This alert has been resolved</div>` : ''}
  `;
  const actionBtn = document.getElementById('alertDetailActionBtn');
  const isReviewable = ['voids','refunds','comps'].includes(a.action);
  if (a.resolved) {
    actionBtn.textContent = 'Reopen';
    actionBtn.className = 'confirm-ok danger';
  } else if (isReviewable) {
    actionBtn.textContent = 'Review';
    actionBtn.className = 'confirm-ok';
  } else {
    actionBtn.textContent = 'Mark Resolved';
    actionBtn.className = 'confirm-ok';
  }
  openModal('alertDetailModal');
  setTimeout(() => applyModalTheme('#alertDetailModal'), 10);
  closeModal('alertsModal');
}

function resolveAlert() {
  const a = alertsData[currentAlertIndex];
  if (a.resolved) {
    a.resolved = false;
    closeModal('alertDetailModal');
    buildAlertsList('alertsModalBody');
    buildAlertsList('alertsListInline');
    updateAlertFilterCounts();
    showSuccess('Alert Reopened', `"${a.title}" is active again.`);
    return;
  }
  // Reviewable alerts — open the relevant transaction list
  if (a.action === 'voids')   { openTransactionList('voids');   return; }
  if (a.action === 'refunds') { openTransactionList('refunds'); return; }
  if (a.action === 'comps')   { openTransactionList('comps');   return; }
  // All other alerts — just resolve
  a.resolved = true;
  closeModal('alertDetailModal');
  buildAlertsList('alertsModalBody');
  buildAlertsList('alertsListInline');
  updateAlertFilterCounts();
  showSuccess('Alert Resolved', `"${a.title}" has been marked as resolved.`);
}

function applyModalTheme(modalSelector) {
  if (!isLight) return;
  const modal = document.querySelector(modalSelector + ' .modal');
  if (!modal) return;
  modal.style.background = '#ffffff';
  modal.style.borderColor = '#e5e7eb';
  const header = modal.querySelector('.modal-header');
  if (header) { header.style.background = '#ffffff'; header.style.borderBottomColor = '#e5e7eb'; }
  const title = modal.querySelector('.modal-title');
  if (title) title.style.color = '#111827';
  const body = modal.querySelector('.modal-body');
  if (body) {
    body.style.background = '#f9fafb';
    // Fix all inner surface cards
    body.querySelectorAll('[style*="var(--surface2)"]').forEach(el => {
      el.style.background = '#ffffff';
      el.style.borderColor = '#e5e7eb';
    });
    body.querySelectorAll('[style*="var(--surface)"]').forEach(el => {
      el.style.background = '#f3f4f6';
      el.style.borderColor = '#e5e7eb';
    });
    body.querySelectorAll('[style*="var(--border)"]').forEach(el => {
      el.style.borderColor = '#e5e7eb';
    });
    body.querySelectorAll('[style*="var(--text)"]').forEach(el => {
      if (el.style.color && el.style.color.includes('var(--text)')) el.style.color = '#111827';
    });
    body.querySelectorAll('[style*="var(--text2)"]').forEach(el => {
      el.style.color = '#374151';
    });
    body.querySelectorAll('[style*="var(--text3)"]').forEach(el => {
      el.style.color = '#6b7280';
    });
  }
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) { closeBtn.style.background = '#f3f4f6'; closeBtn.style.color = '#374151'; closeBtn.style.borderColor = '#e5e7eb'; }
}

function openTransactionList(type) {
  const isRefund = type === 'refunds';
  const isComp   = type === 'comps';
  const txns = isRefund ? refundTransactions : isComp ? compTransactions : voidTransactions;
  const title = isRefund ? '💸 Refund Transactions' : isComp ? '🎁 Comp Transactions' : '🚫 Void Transactions';
  const accentColor = isRefund ? 'var(--amber)' : isComp ? 'var(--accent)' : 'var(--red)';
  const totalAmt = txns.reduce((s, t) => s + parseFloat(t.amount.replace('$','')), 0).toFixed(2);

  // Reset resolved state
  txns.forEach(t => t.resolved = false);

  document.getElementById('txnListTitle').textContent = title;
  document.getElementById('txnListModal').dataset.alertIdx = currentAlertIndex;
  document.getElementById('txnListModal').dataset.type = type;
  renderTxnList(txns, accentColor, totalAmt);
  closeModal('alertDetailModal');
  openModal('txnListModal');
  setTimeout(() => applyModalTheme('#txnListModal'), 10);
}

function renderTxnList(txns, accentColor, totalAmt) {
  const resolvedCount = txns.filter(t => t.resolved).length;
  const allResolved = resolvedCount === txns.length;
  const cardBg = isLight ? '#ffffff' : 'var(--surface2)';
  const cardBorder = isLight ? '#e5e7eb' : 'var(--border)';
  const textColor = isLight ? '#111827' : 'var(--text)';
  const subColor = isLight ? '#6b7280' : 'var(--text3)';
  const text2Color = isLight ? '#374151' : 'var(--text2)';

  document.getElementById('txnListBody').innerHTML = `
    <div style="background:${cardBg};border:1px solid ${cardBorder};border-radius:12px;padding:10px 14px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:11px;color:${subColor};font-weight:700">${txns.length} TRANSACTIONS · ${resolvedCount} RESOLVED</div>
      <div style="font-size:15px;font-weight:900;color:${accentColor}">$${totalAmt} total</div>
    </div>
    ${txns.map((t, i) => `
    <div style="background:${cardBg};border:1px solid ${cardBorder};border-left:3px solid ${t.resolved ? 'var(--green)' : accentColor};border-radius:12px;padding:12px;margin-bottom:10px;opacity:${t.resolved ? '0.55' : '1'};transition:all .3s">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span style="font-size:13px;font-weight:900;color:${t.resolved ? 'var(--green)' : accentColor}">${t.num}${t.resolved ? ' ✓' : ''}</span>
        <span style="font-size:11px;color:${subColor}">${t.time}</span>
      </div>
      <div style="font-size:11px;color:${text2Color};margin-bottom:8px">👤 ${t.server}</div>
      <div style="border-top:1px solid ${cardBorder};padding-top:8px;margin-bottom:10px">
        ${t.items.map(item => `
          <div style="display:flex;justify-content:space-between;font-size:12px;color:${textColor};padding:3px 0">
            <span>${item.qty > 1 ? `<b>${item.qty}×</b> ` : ''}${item.name}</span>
            <span style="font-weight:700">${item.price}</span>
          </div>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid ${cardBorder};padding-top:8px">
        <span style="font-size:11px;color:${subColor};font-style:italic;flex:1;padding-right:8px">${t.reason}</span>
        <span style="font-size:14px;font-weight:900;color:${textColor};white-space:nowrap">${t.amount}</span>
      </div>
      <div style="margin-top:8px">
        ${!t.resolved
          ? `<button onclick="resolveSingleTxn(${i})" style="width:100%;padding:8px;border-radius:8px;border:1.5px solid var(--green);background:rgba(34,197,94,.08);color:var(--green);font-size:12px;font-weight:800;cursor:pointer">✓ Mark as Resolved</button>`
          : `<div style="text-align:center;font-size:11px;font-weight:800;color:var(--green);padding:4px">✓ Resolved</div>`
        }
      </div>
    </div>`).join('')}
    <button onclick="resolveFromTxnList()"
      style="width:100%;padding:14px;border-radius:14px;border:none;background:${allResolved ? 'var(--accent)' : 'var(--accent)'};color:#fff;font-size:14px;font-weight:800;cursor:pointer;margin-top:4px;opacity:${allResolved ? '1' : '0.45'};transition:opacity .3s;box-shadow:0 4px 14px rgba(124,58,237,.35)">
      ${allResolved ? '✓ Mark Alert as Resolved' : `Resolve All (${txns.length - resolvedCount} remaining)`}
    </button>
  `;
}

function resolveSingleTxn(idx) {
  const type = document.getElementById('txnListModal').dataset.type;
  const txns = type === 'refunds' ? refundTransactions : voidTransactions;
  const accentColor = type === 'refunds' ? 'var(--amber)' : 'var(--red)';
  const totalAmt = txns.reduce((s, t) => s + parseFloat(t.amount.replace('$','')), 0).toFixed(2);
  txns[idx].resolved = true;
  renderTxnList(txns, accentColor, totalAmt);
}

function resolveFromTxnList() {
  const idx = parseInt(document.getElementById('txnListModal').dataset.alertIdx);
  if (!isNaN(idx)) {
    alertsData[idx].resolved = true;
    buildAlertsList('alertsModalBody');
    buildAlertsList('alertsListInline');
    updateAlertFilterCounts();
  }
  closeModal('txnListModal');
  showSuccess('Alert Resolved', 'Transactions reviewed and alert marked as resolved.');
}

// ─────────────── ORDERS ───────────────
const channelIcon = { 'Uber Eats':'🛵', 'DoorDash':'🚗', 'GrubHub':'🍔', 'In-House':'🍽' };
const statusColor = { 'New':'var(--blue)', 'Confirmed':'var(--accent)', 'Preparing':'var(--amber)', 'Ready':'var(--green)' };

function buildOrdersList(data) {
  const list = data || openOrders;
  document.getElementById('ordersModalBody').innerHTML = list.length === 0
    ? `<div style="text-align:center;padding:32px 16px;color:var(--text3)"><div style="font-size:28px;margin-bottom:8px">📭</div><div style="font-size:13px;font-weight:700">No orders</div></div>`
    : list.map(o => `
    <div class="order-row" style="cursor:pointer" onclick="openOrderDetail('${o.num}')">
      <div class="order-top">
        <span class="order-num">${o.num}</span>
        <span class="order-time">${o.time} ago</span>
      </div>
      <div class="order-items">${o.lineItems.map(i => `${i.qty > 1 ? i.qty+'× ' : ''}${i.name}`).join(', ')}</div>
      <div class="order-bottom">
        <span class="order-channel">${channelIcon[o.channel] || '📦'} ${o.channel}</span>
        <span class="order-status-badge" style="color:${statusColor[o.status]||'var(--text2)'}">${o.status}</span>
        <span class="order-amount">${o.amount}</span>
      </div>
    </div>
  `).join('');
}

function openOrderDetail(num) {
  const o = openOrders.find(x => x.num === num);
  if (!o) return;
  const sc = statusColor[o.status] || 'var(--text2)';
  const isDelivery = o.customer.address !== 'Dine-In';
  document.getElementById('orderDetailBody').innerHTML = `
    <!-- Header info -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <div>
        <div style="font-size:18px;font-weight:900;color:var(--text)">${o.num}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${channelIcon[o.channel]} ${o.channel} · ${o.time} ago</div>
      </div>
      <span style="font-size:11px;font-weight:800;padding:4px 10px;border-radius:20px;background:${sc}22;color:${sc}">${o.status}</span>
    </div>

    <!-- Customer -->
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:8px">CUSTOMER</div>
      <div style="display:flex;gap:8px;align-items:center">
        <span style="font-size:20px">👤</span>
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--text)">${o.customer.name}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:2px">${o.customer.phone}</div>
          ${isDelivery ? `<div style="font-size:11px;color:var(--text3)">${o.customer.address}</div>` : ''}
        </div>
      </div>
    </div>

    <!-- Server (in-house only) -->
    ${o.server ? `
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:8px">SERVER</div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:8px">
          ${avatarHtml(o.server.name, 32)}
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--text)">${o.server.name}</div>
            <div style="font-size:11px;color:var(--text3);margin-top:1px">${o.server.role}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:10px;font-weight:700;color:var(--text3)">🖥 ${o.server.terminal}</div>
        </div>
      </div>
    </div>` : ''}

    <!-- Items -->
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:10px">ORDER ITEMS</div>
      ${o.lineItems.map(i => `
        <div style="padding:7px 0;border-bottom:1px solid var(--border)">
          <div style="display:flex;justify-content:space-between;align-items:baseline">
            <div style="font-size:13px;color:var(--text)">${i.qty > 1 ? `<span style="color:var(--accent);font-weight:800">${i.qty}×</span> ` : ''}${i.name}</div>
            <div style="font-size:13px;font-weight:700;color:var(--text);flex-shrink:0;margin-left:8px">${i.price}</div>
          </div>
          ${i.mods && i.mods.length ? i.mods.map(m=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:2px 0 2px 12px;border-left:2px solid var(--border)">
              <span style="font-size:11px;color:var(--text3)">↳ ${m.name}</span>
              <span style="font-size:11px;font-weight:700;color:${m.price > 0 ? 'var(--accent)' : 'var(--text3)'};">${m.price > 0 ? '+$'+m.price.toFixed(2) : '$0.00'}</span>
            </div>`).join('') : ''}
        </div>`).join('')}
      ${o.notes ? `<div style="margin-top:8px;font-size:11px;color:var(--amber)">📝 ${o.notes}</div>` : ''}
    </div>

    <!-- Totals -->
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:10px">SUMMARY</div>
      ${[['Subtotal', o.subtotal], ['Discount', o.discount], ['Tax', o.tax], ['Tip', o.tip]].map(([l,v]) => `
        <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:12px;color:var(--text2)">
          <span>${l}</span><span>${v}</span>
        </div>`).join('')}
      <div style="display:flex;justify-content:space-between;padding:8px 0 0;margin-top:6px;border-top:1px solid var(--border);font-size:14px;font-weight:900;color:var(--text)">
        <span>Total</span><span>${o.total}</span>
      </div>
    </div>

    <!-- Payment Method -->
    ${o.card4 ? `
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:8px">PAYMENT</div>
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:36px;height:24px;border-radius:5px;background:${o.cardType==='Amex'?'#2671b3':o.cardType==='Mastercard'?'#eb001b':o.cardType==='Discover'?'#ff6600':'#1a1f71'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-size:8px;font-weight:900;color:#fff;letter-spacing:.3px">${(o.cardType||'VISA').toUpperCase().slice(0,4)}</span>
        </div>
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--text)">${o.cardType} ${o.card4}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:1px">Card on file</div>
        </div>
      </div>
    </div>` : ''}

    <!-- Receipt thumbnail -->
    <div onclick="openReceiptModal('${o.num}')" style="cursor:pointer;display:flex;align-items:center;gap:12px;background:var(--surface2);border:1.5px dashed var(--border);border-radius:12px;padding:12px 14px;margin-bottom:16px;transition:background .15s"
      onmouseover="this.style.background='var(--surface3)'" onmouseout="this.style.background='var(--surface2)'">
      <!-- Mini receipt icon -->
      <div style="flex-shrink:0;width:38px;height:48px;background:var(--surface);border:1px solid var(--border);border-radius:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:5px;position:relative;overflow:hidden">
        <div style="width:70%;height:2px;border-radius:2px;background:var(--border)"></div>
        <div style="width:90%;height:2px;border-radius:2px;background:var(--border)"></div>
        <div style="width:70%;height:2px;border-radius:2px;background:var(--border)"></div>
        <div style="width:90%;height:2px;border-radius:2px;background:var(--border)"></div>
        <div style="width:80%;height:2px;border-radius:2px;background:var(--accent);margin-top:2px"></div>
        <!-- tear bottom -->
        <div style="position:absolute;bottom:-4px;left:0;right:0;height:6px;background:var(--surface2);clip-path:polygon(0 100%,5% 0,10% 100%,15% 0,20% 100%,25% 0,30% 100%,35% 0,40% 100%,45% 0,50% 100%,55% 0,60% 100%,65% 0,70% 100%,75% 0,80% 100%,85% 0,90% 100%,95% 0,100% 100%)"></div>
      </div>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:800;color:var(--text)">View Customer Receipt</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${o.num} · ${o.total} · Tap to expand</div>
      </div>
      <div style="font-size:16px;color:var(--text3)">›</div>
    </div>
  `;
  showOrderDetailPage();
}

function showOrderDetailPage() {
  const page = document.getElementById('orderDetailPage');
  // If the item detail page is currently open (z-index 260), the order detail
  // page (z-index 250) would render behind it. Lift it above so it's visible.
  const itemPage = document.getElementById('itemDetailPage');
  if (itemPage && itemPage.style.display !== 'none' && itemPage.style.display !== '') {
    page.style.zIndex = '280';
  } else {
    page.style.zIndex = '250';
  }
  page.style.display = 'flex';
  if (isLight) applyOrderDetailTheme();
}
function applyOrderDetailTheme() {
  const body = document.getElementById('orderDetailBody');
  if (!body) return;
  body.style.background = '#f2f4f8';
  body.querySelectorAll('[style*="var(--surface2)"]').forEach(el => {
    el.style.background = '#ffffff';
    el.style.borderColor = '#e5e7eb';
  });
  body.querySelectorAll('[style*="var(--surface)"]').forEach(el => {
    el.style.background = '#f9fafb';
  });
  body.querySelectorAll('[style*="var(--border)"]').forEach(el => {
    el.style.borderColor = '#e5e7eb';
  });
  body.querySelectorAll('[style*="var(--text)"]').forEach(el => {
    if (el.style.color && el.style.color.includes('var(--text)')) el.style.color = '#111827';
  });
  body.querySelectorAll('[style*="var(--text2)"]').forEach(el => { el.style.color = '#374151'; });
  body.querySelectorAll('[style*="var(--text3)"]').forEach(el => { el.style.color = '#6b7280'; });
  // Header bar
  const header = document.querySelector('#orderDetailPage > div:first-child');
  if (header) { header.style.background = '#ffffff'; header.style.borderBottomColor = '#e5e7eb'; }
  const backBtn = header?.querySelector('div');
  if (backBtn) { backBtn.style.background = '#f3f4f6'; backBtn.style.borderColor = '#e5e7eb'; backBtn.style.color = '#374151'; }
}
function closeOrderDetailPage() {
  document.getElementById('orderDetailPage').style.display = 'none';
}

function openReceiptModal(num) {
  const allOrders = [...openOrders, ...completedOrders];
  const o = allOrders.find(x => x.num === num);
  if (!o) return;
  const now = new Date();
  const mm = String(now.getMonth()+1).padStart(2,'0');
  const dd = String(now.getDate()).padStart(2,'0');
  const yy = String(now.getFullYear()).slice(2);
  const hh = now.getHours(); const min = String(now.getMinutes()).padStart(2,'0');
  const ampm = hh >= 12 ? 'pm' : 'am'; const h12 = hh % 12 || 12;
  const dateTimeStr = `${mm}-${dd}-${yy} ${h12}:${min} ${ampm}`;
  const callNum = Math.floor(10 + Math.random()*90);
  const authCode = 'c' + Math.random().toString(36).slice(2,7).toUpperCase();
  const cardLast = o.card4 || String(Math.floor(1000+Math.random()*9000));
  const cardType = o.cardType || 'Visa';
  const serverName = o.server ? o.server.name.toLowerCase() : o.customer.name.toLowerCase();
  const checkType = o.channel === 'In-House' ? 'dine in' : o.channel.toLowerCase();

  // parse subtotal numeric
  const subNum = parseFloat(o.subtotal.replace('$','')) || 0;
  const taxNum = parseFloat(o.tax.replace('$','')) || 0;
  const tipNum = parseFloat(o.tip.replace('$','')) || 0;
  const totalNum = parseFloat(o.total.replace('$','')) || 0;
  const discNum = parseFloat((o.discount||'$0').replace('$','').replace('-','')) || 0;

  const barcodeHtml = (function() {
    var bars = '';
    for (var bi = 0; bi < 80; bi++) {
      var w = [1,1,2,1,3,1,1,2][bi%8];
      var h = 75 + (bi%5===0 ? 25 : bi%3===0 ? 15 : 0);
      bars += '<div style="width:'+w+'px;height:'+h+'%;background:#111;flex-shrink:0"></div>';
      bars += '<div style="width:'+(bi%4===0?2:1)+'px;height:100%;background:#fff;flex-shrink:0"></div>';
    }
    return bars;
  })();
  const corners = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48];
  const inner   = [8,9,10,15,16,17,22,23,24];
  const qrHtml  = (function() {
    var cells = '';
    for (var qi = 0; qi < 49; qi++) {
      var bg = corners.indexOf(qi) >= 0 ? '#111' : inner.indexOf(qi) >= 0 ? '#fff' : (Math.random() > 0.45 ? '#111' : '#fff');
      cells += '<div style="background:'+bg+'"></div>';
    }
    return cells;
  })();
  const el = document.getElementById('receiptModalContent');
  el.innerHTML = `
    <div style="font-family:'Courier New',Courier,monospace;background:#fff;color:#111;padding:22px 20px 10px;font-size:12.5px;line-height:1.65;letter-spacing:.01em">

      <!-- ── HEADER ── -->
      <div style="text-align:center;margin-bottom:4px">
        <div style="font-weight:700;font-size:13.5px">Downtown Grille</div>
        <div style="font-weight:700">${o.num.replace('#','')}</div>
        <div style="font-weight:700">${o.channel === 'In-House' ? (o.customer.name || 'Dine-In') : o.channel}</div>
        <div>123 Main Street</div>
        <div>Austin, TX 78701</div>
        <div>512-555-0199</div>
      </div>

      <div style="border-top:1px dashed #999;margin:10px 0"></div>

      <!-- ── META ── -->
      <div style="font-size:12px">${dateTimeStr}</div>
      <div style="font-size:12px">${serverName} ref#: ${authCode}</div>
      <div style="font-size:12px">check #1 (${checkType})</div>

      <div style="border-top:1px dashed #999;margin:10px 0"></div>

      <!-- ── CALL NUM ── -->
      <div style="text-align:center;font-size:12px;margin-bottom:4px">CALL NUM#: ${callNum}</div>

      <div style="border-top:1px dashed #999;margin:10px 0"></div>

      <!-- ── ITEMS ── -->
      ${o.lineItems.map(i => {
        const itemPrice = parseFloat(i.price.replace('$','')) || 0;
        return `
        <div style="display:flex;justify-content:space-between;font-size:12px">
          <span>${i.qty > 1 ? i.qty+' ' : ''}${i.name}</span>
          <span>${itemPrice.toFixed(2)}</span>
        </div>
        ${i.mods && i.mods.length ? i.mods.map(m => `
          <div style="display:flex;justify-content:space-between;font-size:12px;padding-left:14px">
            <span>${m.name}</span>
            <span>${m.price > 0 ? m.price.toFixed(2) : '0.00'}</span>
          </div>`).join('') : ''}`;
      }).join('')}
      ${o.notes ? `<div style="font-size:11px;margin-top:4px">* ${o.notes}</div>` : ''}

      <div style="border-top:1px dashed #999;margin:10px 0"></div>

      <!-- ── TOTALS ── -->
      <div style="display:flex;justify-content:space-between;font-size:12px"><span>Sub Total</span><span>${subNum.toFixed(2)}</span></div>
      ${discNum > 0 ? `<div style="display:flex;justify-content:space-between;font-size:12px"><span>Discount</span><span>-${discNum.toFixed(2)}</span></div>` : ''}
      <div style="display:flex;justify-content:space-between;font-size:12px"><span>Sales</span><span>${taxNum.toFixed(2)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:12px"><span>Total</span><span>${(subNum - discNum + taxNum).toFixed(2)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:12px"><span>${cardType}, *${cardLast}</span><span>${(subNum - discNum + taxNum).toFixed(2)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:12px"><span>Tip</span><span>${tipNum.toFixed(2)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700"><span>Total</span><span>${totalNum.toFixed(2)}</span></div>

      <div style="border-top:1px dashed #999;margin:10px 0"></div>

      <div style="display:flex;justify-content:space-between;font-size:12px"><span>Change</span><span>0.00</span></div>

      <div style="border-top:1px dashed #999;margin:12px 0"></div>

      <!-- ── FOOTER ── -->
      <div style="text-align:center;font-size:12px;line-height:1.8">
        <div>Have a really nice day.</div>
        <div>Powered by PlumPOS</div>
      </div>

      <!-- ── BARCODE ── -->
      <div style="margin:14px auto 4px;display:flex;justify-content:center;align-items:flex-end;gap:0px;height:50px;overflow:hidden">
        ${barcodeHtml}
      </div>
      <div style="text-align:center;font-size:11px;letter-spacing:2px;margin-bottom:10px">*${o.num.replace('#','')}PLM*</div>

      <!-- ── QR ── -->
      <div style="text-align:center;font-size:12px;margin-bottom:8px">Join Downtown Grille Loyalty Today!</div>
      <div style="margin:0 auto 16px;width:90px;height:90px;border:1.5px solid #222;display:flex;align-items:center;justify-content:center;position:relative;padding:8px">
        <div style="width:100%;height:100%;display:grid;grid-template-columns:repeat(7,1fr);gap:1px">
          ${qrHtml}
        </div>
      </div>

      <!-- Tear edge -->
      <div style="margin:0 -20px -10px;height:16px;background:repeating-linear-gradient(90deg,#f0f0f0 0px,#f0f0f0 7px,#fff 7px,#fff 14px);border-top:1px dashed #bbb"></div>
    </div>
  `;
  document.getElementById('receiptModal').style.display = 'flex';
}

function closeReceiptModal() {
  document.getElementById('receiptModal').style.display = 'none';
}

function orderAction(action, num) {
  const labels = { ready:'Marked as Ready', bump:'Bumped to Next Stage', comp:'Comp Requested', cancel:'Order Cancelled' };
  closeModal('orderDetailModal');
  showToast('✅', `${num} — ${labels[action]}`);
}

// ─────────────── DATE PICKER ───────────────
function openDatePicker() {
  const grid = document.getElementById('datePickerGrid');
  // Generate last 14 days + 2 future (disabled) for March 2026
  const days = ['S','M','T','W','T','F','S'];
  // March 2026: starts on Sunday (day 0)
  // Build a 5-row calendar for March
  const cells = [];
  // March 1 = Sunday, pad 0 leading days
  for (let d = 1; d <= 31; d++) {
    const offset = d - 9; // relative to today (Mar 9)
    const hasData = dateData[String(offset)] !== undefined;
    const isFuture = d > 9;
    const isToday = d === 9;
    const isSelected = (9 + viewOffset) === d;
    cells.push({ d, offset, hasData, isFuture, isToday, isSelected });
  }
  // Day headers
  const dayHeadersHtml = days.map(d =>
    `<div style="text-align:center;font-size:10px;font-weight:700;color:var(--text3);padding:4px 0">${d}</div>`
  ).join('');
  // March 1, 2026 is a Sunday — index 0, no padding needed
  const cellsHtml = cells.map(c => {
    let bg = 'transparent', color = 'var(--text2)', border = 'none', opacity = '1', cursor = 'pointer';
    if (c.isFuture) { color = 'var(--text3)'; opacity = '0.35'; cursor = 'default'; }
    else if (c.isSelected) { bg = 'var(--accent)'; color = '#fff'; }
    else if (c.isToday) { border = '2px solid var(--accent)'; color = 'var(--accent)'; }
    else if (!c.hasData) { color = 'var(--text3)'; opacity = '0.5'; }
    return `<div onclick="${c.isFuture ? '' : `jumpToDate(${c.offset})`}" style="text-align:center;padding:7px 2px;border-radius:8px;font-size:13px;font-weight:${c.isSelected||c.isToday?'800':'600'};background:${bg};color:${color};border:${border};opacity:${opacity};cursor:${cursor}">${c.d}</div>`;
  }).join('');
  grid.innerHTML = dayHeadersHtml + cellsHtml;
  openModal('datePickerModal');
  setTimeout(() => applyModalTheme('#datePickerModal'), 10);
}

function jumpToDate(offset) {
  if (offset > 0) return;
  viewOffset = offset;
  updateDateDisplay();
  updateDashboardData();
  closeModal('datePickerModal');
}

// ─────────────── STORE HOURS CHANGE DIFF ───────────────
let savedHoursSnapshot = JSON.parse(JSON.stringify(defaultHours)); // track what was last saved

function saveStoreSettings() {
  // Collect current state from defaultHours data + toggle checkboxes
  const rows = document.querySelectorAll('.hours-row-v2');
  const currentHours = Array.from(rows).map((row, i) => {
    const toggle = row.querySelector('input[type="checkbox"]');
    return {
      enabled: toggle ? toggle.checked : defaultHours[i].enabled,
      open: defaultHours[i].open,
      close: defaultHours[i].close,
    };
  });

  // Diff against saved snapshot
  const changes = [];
  days.forEach((day, i) => {
    const prev = savedHoursSnapshot[i];
    const curr = currentHours[i];
    if (prev.enabled !== curr.enabled) {
      changes.push(`<div style="padding:6px 0;border-bottom:1px solid var(--border);font-size:12px"><strong style="color:var(--text)">${day}</strong> — <span style="color:${curr.enabled?'var(--green)':'var(--red)'}">now ${curr.enabled?'Open':'Closed'}</span></div>`);
    } else if (prev.open !== curr.open || prev.close !== curr.close) {
      changes.push(`<div style="padding:6px 0;border-bottom:1px solid var(--border);font-size:12px"><strong style="color:var(--text)">${day}</strong> — Hours changed: <span style="color:var(--accent2)">${curr.open} → ${curr.close}</span></div>`);
    }
  });

  if (changes.length === 0) {
    // No changes, just save
    doSaveHours();
    return;
  }

  document.getElementById('hoursSummaryBody').innerHTML = `
    <div style="font-size:12px;color:var(--text2);margin-bottom:12px">${changes.length} change${changes.length>1?'s':''} will be applied:</div>
    <div style="background:var(--surface2);border-radius:10px;padding:8px 12px;margin-bottom:4px">${changes.join('')}</div>
  `;
  openModal('hoursSummaryModal');
  setTimeout(() => applyModalTheme('#hoursSummaryModal'), 10);
}

function confirmSaveHours() {
  closeModal('hoursSummaryModal');
  doSaveHours();
}

function doSaveHours() {
  // Update snapshot
  const rows = document.querySelectorAll('.hours-row-v2');
  savedHoursSnapshot = Array.from(rows).map((row, i) => {
    const toggle = row.querySelector('input[type="checkbox"]');
    return {
      enabled: toggle ? toggle.checked : defaultHours[i].enabled,
      open: defaultHours[i].open,
      close: defaultHours[i].close,
    };
  });
  const btn = document.getElementById('saveStoreBtn');
  btn.classList.add('saving');
  btn.textContent = 'Saving…';
  setTimeout(() => {
    btn.classList.remove('saving');
    btn.textContent = 'Save Store Settings';
    showSuccess('Store Settings Saved', 'All hours and holiday settings have been updated.');
  }, 1200);
}

// ─────────────── CLOCK PICKER ───────────────
// Convert "HH:MM" 24h → "h:MM AM/PM" display
function fmt12(t) {
  const [hh, mm] = t.split(':').map(Number);
  const ampm = hh < 12 ? 'AM' : 'PM';
  const h = hh % 12 || 12;
  return `${h}:${String(mm).padStart(2,'0')} ${ampm}`;
}
// Convert 12h back to 24h "HH:MM"
function to24(h, m, ampm) {
  let hh = parseInt(h);
  if (ampm === 'AM' && hh === 12) hh = 0;
  if (ampm === 'PM' && hh !== 12) hh += 12;
  return `${String(hh).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

let clockDayIdx = 0;
let clockType = 'open'; // 'open' | 'close'
let clockMode = 'hour'; // 'hour' | 'minute'
let clockHour = 9;
let clockMinute = 0;
let clockAMPM = 'AM';

function openClockPicker(dayIdx, type) {
  clockDayIdx = dayIdx;
  clockType = type;
  let timeStr;
  
  if (dayIdx === 'pause') {
    timeStr = _posCustomPauseTime;
    document.getElementById('clockPickerTitle').textContent = `Set Resume Time`;
  } else {
    timeStr = defaultHours[dayIdx][type];
    document.getElementById('clockPickerTitle').textContent =
      `Set ${days[dayIdx]} ${type === 'open' ? 'Open' : 'Close'} Time`;
  }

  const [hh, mm] = timeStr.split(':').map(Number);
  clockAMPM = hh < 12 ? 'AM' : 'PM';
  clockHour = hh % 12 || 12;
  clockMinute = mm;
  clockMode = 'hour';

  renderClock();
  openModal('clockPickerModal');
  setTimeout(() => {
    applyModalTheme('#clockPickerModal');
    // Clock face needs its own background fix
    const face = document.getElementById('clockFace');
    if (face) face.style.background = isLight ? '#f3f4f6' : '';
  }, 10);
}

function closeClockPicker() {
  closeModal('clockPickerModal');
}

function setClockMode(mode) {
  clockMode = mode;
  renderClock();
}

function setAMPM(val) {
  clockAMPM = val;
  document.getElementById('amBtn').classList.toggle('active', val === 'AM');
  document.getElementById('pmBtn').classList.toggle('active', val === 'PM');
}

function renderClock() {
  // Update display segments
  const segH = document.getElementById('clockSegHour');
  const segM = document.getElementById('clockSegMin');
  segH.textContent = String(clockHour).padStart(2, '0');
  segM.textContent = String(clockMinute).padStart(2, '0');
  segH.className = 'clock-seg ' + (clockMode === 'hour' ? 'active' : 'inactive');
  segM.className = 'clock-seg ' + (clockMode === 'minute' ? 'active' : 'inactive');

  document.getElementById('amBtn').classList.toggle('active', clockAMPM === 'AM');
  document.getElementById('pmBtn').classList.toggle('active', clockAMPM === 'PM');

  // Render numbers on clock face
  const nums = document.getElementById('clockNums');
  const face = document.getElementById('clockFace');
  const r = 78; // radius for number placement
  const cx = 100, cy = 100;

  let items, currentVal;
  if (clockMode === 'hour') {
    items = [12,1,2,3,4,5,6,7,8,9,10,11];
    currentVal = clockHour;
  } else {
    items = [0,5,10,15,20,25,30,35,40,45,50,55];
    currentVal = Math.round(clockMinute / 5) * 5;
  }

  nums.innerHTML = items.map((val, i) => {
    const angleDeg = (i * 30) - 90;
    const angleRad = angleDeg * Math.PI / 180;
    const x = cx + r * Math.cos(angleRad);
    const y = cy + r * Math.sin(angleRad);
    const isSelected = clockMode === 'hour' ? val === clockHour : val === currentVal;
    const label = clockMode === 'minute' ? String(val).padStart(2,'0') : val;
    const textColor = isLight ? '#111827' : '';
    return `<div class="clock-num${isSelected ? ' selected' : ''}"
      style="left:${x}px;top:${y}px${textColor ? ';color:'+textColor : ''}"
      onclick="clockNumClick(${val},event)">${label}</div>`;
  }).join('');

  // Rotate hand
  const hand = document.getElementById('clockHand');
  let angleDeg;
  if (clockMode === 'hour') {
    angleDeg = (clockHour % 12) * 30;
    hand.style.height = '60px';
  } else {
    angleDeg = clockMinute * 6;
    hand.style.height = '72px';
  }
  hand.style.transform = `translateX(-50%) rotate(${angleDeg}deg)`;
}

function clockNumClick(val, e) {
  e.stopPropagation();
  if (clockMode === 'hour') {
    clockHour = val;
    // Auto-advance to minute after picking hour
    setTimeout(() => { clockMode = 'minute'; renderClock(); }, 200);
  } else {
    clockMinute = val;
  }
  renderClock();
}

function clockFaceClick(e) {
  const face = document.getElementById('clockFace');
  const rect = face.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const x = e.clientX - rect.left - cx;
  const y = e.clientY - rect.top - cy;
  const angleDeg = (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360;

  if (clockMode === 'hour') {
    clockHour = Math.round(angleDeg / 30) % 12 || 12;
    setTimeout(() => { clockMode = 'minute'; renderClock(); }, 200);
  } else {
    clockMinute = Math.round(angleDeg / 6) % 60;
  }
  renderClock();
}

function confirmClockTime() {
  const time24 = to24(clockHour, clockMinute, clockAMPM);
  
  if (clockDayIdx === 'pause') {
    _posCustomPauseTime = time24;
    renderPosTerminalModal();
  } else {
    defaultHours[clockDayIdx][clockType] = time24;
    // Update the button label in UI
    const btn = document.querySelector(
      `.time-btn[data-day="${clockDayIdx}"][data-type="${clockType}"]`
    );
    if (btn) btn.textContent = fmt12(time24);
    // Highlight briefly
    if (btn) { btn.classList.add('active'); setTimeout(() => btn.classList.remove('active'), 1200); }
  }

  closeClockPicker();
}

// ─────────────── SETTINGS SCREENS ───────────────
function showSettingsScreen(id) {
  document.querySelectorAll('.settings-screen').forEach(s => s.style.display = 'none');
  const el = document.getElementById(id);
  if (el) { el.style.display = 'flex'; el.style.flexDirection = 'column'; }
  if (id === 'settingsLang') buildLangList();
}

function openSettingsPanel() {
  closeDrawer();
  syncSettingsPill();
  showSettingsScreen('settingsHome');
  openModal('settingsModal');
  setTimeout(() => applyModalTheme('#settingsModal'), 10);
}

const languages = [
  { flag:'🇺🇸', name:'English' },
  { flag:'🇪🇸', name:'Español' },
  { flag:'🇫🇷', name:'Français' },
  { flag:'🇨🇳', name:'中文' },
  { flag:'🇮🇹', name:'Italiano' },
  { flag:'🇩🇪', name:'Deutsch' },
];
let selectedLang = 'English';
let pendingLang = 'English';

function buildLangList() {
  const el = document.getElementById('langList');
  if (!el) return;
  el.innerHTML = `<div style="background:var(--surface2);border-radius:12px;overflow:hidden;margin-bottom:12px">` +
    languages.map((l, i) => `
      <div class="lang-row${i > 0 ? ' border-top' : ''}" style="${i > 0 ? 'border-top:1px solid var(--border)' : ''}" onclick="selectLang('${l.name}')">
        <span class="lang-flag">${l.flag}</span>
        <span class="lang-name">${l.name}</span>
        <div class="lang-radio${l.name === pendingLang ? ' selected' : ''}" id="lang-radio-${i}"></div>
      </div>`).join('') +
  `</div>`;
  const saveBtn = document.getElementById('langSaveBtn');
  if (saveBtn) {
    saveBtn.style.opacity = pendingLang !== selectedLang ? '1' : '0.4';
    saveBtn.style.pointerEvents = pendingLang !== selectedLang ? 'auto' : 'none';
  }
}

function selectLang(name) {
  pendingLang = name;
  buildLangList();
}

function saveLang() {
  selectedLang = pendingLang;
  buildLangList();
  showSuccess('Language Updated', `App language set to ${selectedLang}.`);
}

// ─────────────── INIT ───────────────
document.addEventListener('DOMContentLoaded', function() {
  buildMenuToolbar();
  renderMenuItems();
  buildHours();
  buildAlertsList('alertsModalBody');
  buildAlertsList('alertsListInline');
  updateAlertFilterCounts();
  var initialAlertChip = document.getElementById('filter-all');
  if (initialAlertChip) setAlertFilter('all', initialAlertChip);
  buildOrdersList();
  initChart();
  // Apply light mode on load directly (isLight already true)
  const device = document.getElementById('app');
  device.classList.add('light');
  document.getElementById('themePill').classList.add('light-on');
  document.getElementById('themePillThumb').textContent = '☀️';
  document.getElementById('themeIcon').textContent = '☀️';
  document.getElementById('themeLabel').textContent = 'Light Mode';
  document.body.style.background = '#d8dce8';
  updateChartColors();
  syncSettingsPill();
  buildNotifPanel(); // init Dynamic Island
  renderRCRows();    // init RC rows
  renderPaymentRows(); // init payment rows
  renderOrdersPage();  // init orders page
  updateDashboardData(); // sync all dashboard counts from live data
  renderStaffDashCard();
  renderStaffPage();
  setTimeout(() => showSuccess('Welcome back, Sarah!', 'Downtown Grille · Manager Mode'), 800);
});

// Swipe-down on header opens notification shade
(function() {
  let startY = 0;
  const hdr = document.querySelector('.header');
  if (!hdr) return;
  hdr.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  hdr.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - startY;
    if (dy > 30) toggleNotifPanel();
  }, { passive: true });
})();
const notifications = [
  { id:1, icon:'⚠️', color:'red',   title:'Void Request — $9.99',        sub:'Sarah M. (Server #4) · Order #10228 · Margherita Pizza × 1', time:'20 sec ago', unread:true, page:'auth' },
  { id:2, icon:'⚠️', color:'amber', title:'Comp Request — $12.00',        sub:'Tom B. (Server #2) · Order #10215 · Comp 50%',               time:'1 min ago',  unread:true, page:'auth' },
  { id:3, icon:'📵', color:'red',   title:'POS Terminal Offline',         sub:'Terminal #3 – Patio offline for 12 min · Needs attention',   time:'3 min ago',  unread:true, page:'alerts' },
  { id:4, icon:'💸', color:'amber', title:'High Refund Alert',            sub:'$180 in refunds — 3 transactions flagged this hour',          time:'6 min ago',  unread:true, page:'alerts' },
  { id:5, icon:'⚠️', color:'blue',  title:'Cancellation — $34.50',        sub:'Order #10199 · Customer cancelled via app',                   time:'9 min ago',  unread:true, page:'auth' },
];

let islandExpanded = false;
let islandCollapseTimer = null;

function updateDynamicIsland() {
  const unread = notifications.filter(n => n.unread);
  const idle = document.getElementById('diIdle');
  const count = document.getElementById('diIdleCount');
  const island = document.getElementById('dynamicIsland');
  if (!idle || !count || !island) return;
  if (unread.length === 0) {
    idle.className = 'di-idle no-notif';
    count.textContent = 'No alerts';
    island.style.cursor = 'default';
  } else {
    idle.className = 'di-idle';
    count.textContent = unread.length + ' alert' + (unread.length > 1 ? 's' : '');
    island.style.cursor = 'pointer';
    const first = unread[0];
    const t = document.getElementById('diExpTitle');
    const s = document.getElementById('diExpSub');
    if (t) t.textContent = first.title;
    if (s) s.textContent = first.sub;
  }
}

function handleIslandTap() {
  const unread = notifications.filter(n => n.unread);
  if (unread.length === 0) return;
  const island = document.getElementById('dynamicIsland');
  if (!island) return;
  if (!islandExpanded) {
    island.classList.add('expanded');
    islandExpanded = true;
    clearTimeout(islandCollapseTimer);
    islandCollapseTimer = setTimeout(() => {
      island.classList.remove('expanded');
      islandExpanded = false;
      toggleNotifPanel();
    }, 900);
  } else {
    clearTimeout(islandCollapseTimer);
    island.classList.remove('expanded');
    islandExpanded = false;
    toggleNotifPanel();
  }
}

function buildNotifPanel() {
  const body = document.getElementById('notifPanelBody');
  if (!body) return;
  if (!notifications.length) {
    body.innerHTML = '<div class="notif-shade-empty">🔕<br>No notifications</div>'; return;
  }
  body.innerHTML = notifications.map(n => `
    <div class="notif-card ${n.unread ? 'unread' : ''}" onclick="handleNotifTap(${n.id})">
      <div class="notif-card-icon ${n.color}">${n.icon}</div>
      <div class="notif-card-body">
        <div class="notif-card-app">Plum POS Manager</div>
        <div class="notif-card-title">${n.title}</div>
        <div class="notif-card-sub">${n.sub}</div>
        <div class="notif-card-time">${n.time}</div>
      </div>
    </div>
  `).join('');
  updateDynamicIsland();
}

function toggleNotifPanel() {
  const shade = document.getElementById('notifShade');
  const isOpen = shade.classList.contains('open');
  if (isOpen) { closeNotifPanel(null, true); } else {
    buildNotifPanel();
    shade.classList.add('open');
  }
}

function closeNotifPanel(e, force) {
  if (force || (e && e.target === document.getElementById('notifShade'))) {
    document.getElementById('notifShade').classList.remove('open');
  }
}

function handleNotifTap(id) {
  const notif = notifications.find(n => n.id === id);
  if (!notif) return;
  notif.unread = false;
  closeNotifPanel(null, true);
  updateDynamicIsland();
  navTo(notif.page, null, 'drnav-' + notif.page);
}

function markAllRead() {
  notifications.forEach(n => n.unread = false);
  buildNotifPanel();
}
// ─── Live pending card timestamps ───
const pendingCardTimes = [
  { id:'ptime-1', seconds: 20  },
  { id:'ptime-2', seconds: 60  },
  { id:'ptime-3', seconds: 120 },
  { id:'ptime-4', seconds: 180 },
  { id:'ptime-5', seconds: 240 },
];
function formatPendingTime(s) {
  if (s < 60) return s + ' sec ago';
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return m + ' min' + (rem > 0 ? ' ' + rem + 's' : '') + ' ago';
}
setInterval(() => {
  pendingCardTimes.forEach(p => {
    p.seconds++;
    const el = document.getElementById(p.id);
    if (el) el.textContent = formatPendingTime(p.seconds);
  });
}, 1000);

// ─────────────── ORDERS PAGE ───────────────
const completedOrders = [
  { num:'#10180', channel:'In-House',  status:'Completed', amount:'$42.50', time:'8:12 AM',  items:'Eggs Benedict, OJ × 2',           customer:'Table 4',   lineItems:[{name:'Eggs Benedict',qty:1,price:'$16.50',mods:[{name:'Hollandaise extra',price:0.75, server:{name:'Sarah M.',role:'Server #4',terminal:'Terminal #1 – Front'}},,{name:'Well done',price:0}]},{name:'Orange Juice',qty:2,price:'$9.98',mods:[{name:'No pulp',price:0}]},{name:'Coffee',qty:2,price:'$7.98',mods:[{name:'Oat milk',price:0.75},{name:'Extra shot',price:1.0}]}], subtotal:'$34.44', discount:'$0.00', tax:'$2.76', tip:'$6.00', total:'$43.20', notes:'' },
  { num:'#10181', channel:'DoorDash',  status:'Completed', amount:'$28.99', time:'8:34 AM',  items:'Avocado Toast, Latte',             customer:'Chris P.',  lineItems:[{name:'Avocado Toast',qty:1,price:'$14.99',mods:[{name:'Poached egg add',price:1.5},{name:'Chili flakes',price:0}]},{name:'Latte',qty:2,price:'$9.98',mods:[{name:'Almond milk',price:0.75},{name:'No sugar',price:0}]}], subtotal:'$24.97', discount:'$0.00', tax:'$2.00', tip:'$3.50', total:'$30.47', notes:'' },
  { num:'#10182', channel:'Uber Eats', status:'Completed', amount:'$19.47', time:'9:05 AM',  items:'Tiramisu × 3',                    customer:'Maya R.',   lineItems:[{name:'Tiramisu',qty:3,price:'$19.47',mods:[]}], subtotal:'$19.47', discount:'$0.00', tax:'$1.56', tip:'$2.00', total:'$23.03', notes:'' },
  { num:'#10183', channel:'In-House',  status:'Completed', amount:'$67.80', time:'9:22 AM',  items:'Steak Frites, Wine × 2, Salad',   customer:'Table 8',   lineItems:[{name:'Steak Frites',qty:1,price:'$28.99',mods:[{name:'Medium-rare',price:0, server:{name:'Jake R.',role:'Server #3',terminal:'Terminal #1 – Front'}},,{name:'Sauce on side',price:0}]},{name:'House Wine',qty:2,price:'$24.98',mods:[]},{name:'Caesar Salad',qty:1,price:'$8.99',mods:[{name:'No croutons',price:0},{name:'Dressing on side',price:0}]}], subtotal:'$62.96', discount:'$0.00', tax:'$5.04', tip:'$12.00', total:'$80.00', notes:'' },
  { num:'#10184', channel:'GrubHub',   status:'Cancelled', amount:'$14.50', time:'9:41 AM',  items:'Pasta Carbonara',                 customer:'Sam K.',    lineItems:[{name:'Pasta Carbonara',qty:1,price:'$14.50',mods:[{name:'Extra bacon',price:2.0},{name:'Less cream',price:0}]}], subtotal:'$14.50', discount:'$0.00', tax:'$1.16', tip:'$0.00', total:'$15.66', notes:'Customer cancelled' },
  { num:'#10185', channel:'In-House',  status:'Completed', amount:'$38.96', time:'10:08 AM', items:'Burger × 2, Fries × 2',           customer:'Table 2',   lineItems:[{name:'House Burger',qty:2,price:'$27.98',mods:[{name:'Medium',price:0, server:{name:'Tom B.',role:'Server #2',terminal:'Terminal #1 – Front'}},,{name:'No pickles',price:0},{name:'Add bacon',price:2.0}]},{name:'Fries',qty:2,price:'$8.98',mods:[{name:'Extra salt',price:0}]}], subtotal:'$36.96', discount:'$0.00', tax:'$2.96', tip:'$7.00', total:'$46.92', notes:'' },
  { num:'#10186', channel:'Uber Eats', status:'Completed', amount:'$26.99', time:'10:30 AM', items:'BBQ Ribs Half Rack',              customer:'Jess T.',   lineItems:[{name:'BBQ Ribs Half Rack',qty:1,price:'$26.99',mods:[{name:'Extra BBQ sauce',price:0.5},{name:'Coleslaw sub fries',price:0}]}], subtotal:'$26.99', discount:'$0.00', tax:'$2.16', tip:'$5.00', total:'$34.15', notes:'' },
  { num:'#10187', channel:'DoorDash',  status:'Completed', amount:'$21.97', time:'10:55 AM', items:'Shrimp Tacos × 3',               customer:'Nina C.',   lineItems:[{name:'Shrimp Tacos',qty:3,price:'$21.97',mods:[{name:'Corn tortilla',price:0},{name:'Extra lime',price:0}]}], subtotal:'$21.97', discount:'$0.00', tax:'$1.76', tip:'$3.50', total:'$27.23', notes:'' },
  { num:'#10188', channel:'In-House',  status:'Completed', amount:'$89.50', time:'11:15 AM', items:'Lobster, Wine, Dessert',          customer:'Table 11',  lineItems:[{name:'Lobster Bisque',qty:2,price:'$19.98',mods:[{name:'Extra cream',price:0.75, server:{name:'Marcus J.',role:'Server #6',terminal:'Terminal #2 – Bar'}},]},{name:'Chardonnay',qty:2,price:'$29.98',mods:[]},{name:'Tiramisu',qty:2,price:'$12.98',mods:[]}], subtotal:'$62.94', discount:'-$6.29', tax:'$4.53', tip:'$15.00', total:'$76.18', notes:'Regular guest — applied loyalty discount' },
  { num:'#10189', channel:'GrubHub',   status:'Cancelled', amount:'$18.99', time:'11:34 AM', items:'Salmon Teriyaki Bowl',            customer:'Omar F.',   lineItems:[{name:'Salmon Teriyaki Bowl',qty:1,price:'$18.99',mods:[{name:'Brown rice',price:0},{name:'No sesame',price:0}]}], subtotal:'$18.99', discount:'$0.00', tax:'$1.52', tip:'$0.00', total:'$20.51', notes:'Restaurant cancelled — item unavailable' },
  { num:'#10190', channel:'In-House',  status:'Completed', amount:'$55.48', time:'11:52 AM', items:'Pasta × 2, Garlic Bread, Drinks', customer:'Table 6',   lineItems:[{name:'Fettuccine Alfredo',qty:2,price:'$23.98',mods:[{name:'Extra parmesan',price:0.75, server:{name:'Sarah M.',role:'Server #4',terminal:'Terminal #1 – Front'}},]},{name:'Garlic Bread',qty:2,price:'$7.98',mods:[{name:'Extra butter',price:0}]},{name:'Soft Drinks',qty:3,price:'$7.47',mods:[{name:'No ice',price:0}]}], subtotal:'$39.43', discount:'$0.00', tax:'$3.15', tip:'$8.00', total:'$50.58', notes:'' },
  { num:'#10191', channel:'Uber Eats', status:'Completed', amount:'$13.98', time:'12:10 PM', items:'Mozzarella Sticks × 2',          customer:'Bella W.',  lineItems:[{name:'Mozzarella Sticks',qty:2,price:'$13.98',mods:[{name:'Marinara extra',price:0.5}]}], subtotal:'$13.98', discount:'$0.00', tax:'$1.12', tip:'$2.00', total:'$17.10', notes:'' },
  { num:'#10192', channel:'DoorDash',  status:'Completed', amount:'$34.99', time:'12:28 PM', items:'Chicken Wrap, Fries, Drinks × 2', customer:'Marcus J.', lineItems:[{name:'Chicken Wrap',qty:1,price:'$9.99',mods:[{name:'No onions',price:0},{name:'Extra ranch',price:0.5}]},{name:'Fries',qty:1,price:'$4.49',mods:[{name:'Extra salt',price:0}]},{name:'Soft Drinks',qty:2,price:'$4.98',mods:[{name:'No ice',price:0}]}], subtotal:'$19.46', discount:'$0.00', tax:'$1.56', tip:'$3.00', total:'$24.02', notes:'' },
  { num:'#10193', channel:'In-House',  status:'Completed', amount:'$124.00', time:'12:45 PM','items':'Tasting Menu × 2',             customer:'Table 1',   lineItems:[{name:'Chef Tasting Menu',qty:2,price:'$110.00',mods:[{name:'Vegetarian option',price:0, server:{name:'Jake R.',role:'Server #3',terminal:'Terminal #1 – Front'}},,{name:'No shellfish',price:0}]},{name:'Wine Pairing',qty:2,price:'$50.00',mods:[]}], subtotal:'$160.00', discount:'-$16.00', tax:'$11.52', tip:'$30.00', total:'$185.52', notes:'Anniversary dinner — 10% loyalty applied' },
  { num:'#10194', channel:'GrubHub',   status:'Completed', amount:'$11.99', time:'1:02 PM',  items:'Nachos Supreme',                 customer:'Kevin L.',  lineItems:[{name:'Nachos Supreme',qty:1,price:'$11.99',mods:[{name:'Jalapeños on side',price:0},{name:'Extra guac',price:1.5}]}], subtotal:'$11.99', discount:'$0.00', tax:'$0.96', tip:'$1.50', total:'$14.45', notes:'Jalapeños on the side' },
  { num:'#10195', channel:'In-House',  status:'Completed', amount:'$48.97', time:'1:20 PM',  items:'Steak, Wine, Dessert',           customer:'Table 9',   lineItems:[{name:'Steak Frites',qty:1,price:'$28.99',mods:[{name:'Medium-rare',price:0, server:{name:'Dana H.',role:'Server #7',terminal:'Terminal #3 – Patio'}},,{name:'Sauce on side',price:0}]},{name:'House Wine',qty:1,price:'$12.99',mods:[]},{name:'Tiramisu',qty:1,price:'$6.49',mods:[]}], subtotal:'$48.47', discount:'$0.00', tax:'$3.88', tip:'$10.00', total:'$62.35', notes:'' },
  { num:'#10196', channel:'Uber Eats', status:'Completed', amount:'$16.50', time:'1:38 PM',  items:'Pad Thai Noodles',               customer:'Yuki S.',   lineItems:[{name:'Pad Thai Noodles',qty:1,price:'$16.50',mods:[{name:'Mild spice',price:0},{name:'Extra peanuts',price:0.5}]}], subtotal:'$16.50', discount:'$0.00', tax:'$1.32', tip:'$3.00', total:'$20.82', notes:'Mild spice' },
  { num:'#10197', channel:'DoorDash',  status:'Cancelled', amount:'$22.48', time:'1:55 PM',  items:'Garlic Bread × 2, Lasagna',     customer:'Pat O.',    lineItems:[{name:'Garlic Bread',qty:2,price:'$7.98',mods:[{name:'Extra butter',price:0}]},{name:'Lasagna',qty:1,price:'$14.50',mods:[{name:'Well done',price:0}]}], subtotal:'$22.48', discount:'$0.00', tax:'$1.80', tip:'$0.00', total:'$24.28', notes:'Driver unavailable — auto-cancelled', server:{name:'Tom B.',role:'Server #2',terminal:'Terminal #1 – Front'} },
];

let ordersFilter    = 'all';
let ordersDateRange = 'today';
let ordersSearch    = '';
let ordersRC        = [];  // Revenue center multi-select (empty = all)
let ordersPayment   = [];  // Payment multi-select (empty = all)
let ordersCustomFrom = '';
let ordersCustomTo   = '';
let ordersFilterPanelOpen = false;

function getAllOrdersForRange() {
  const base = [...completedOrders, ...openOrders.map(o => ({
    ...o,
    customer: o.customer ? o.customer.name : '—',
  }))];
  if (ordersDateRange === 'today') return base;
  if (ordersDateRange === 'yesterday') {
    return completedOrders.map(o => ({...o, time: o.time.replace('AM','AM').replace('PM','PM'), _date:'Yesterday'}));
  }
  if (ordersDateRange === '7days') {
    return [...base, ...completedOrders.map(o => ({...o, num: o.num.replace('#','#9'), _date:'Mar 7'})),
                     ...completedOrders.slice(0,8).map(o => ({...o, num: o.num.replace('#','#8'), _date:'Mar 6'}))];
  }
  if (ordersDateRange === 'custom') {
    // For the prototype, show all base orders labelled with the custom range
    return base.map(o => ({...o, _dateRange: ordersCustomFrom && ordersCustomTo ? `${ordersCustomFrom} – ${ordersCustomTo}` : 'Custom Range'}));
  }
  return base;
}

function renderOrdersPage() {
  const allOrders = getAllOrdersForRange();
  const filtered  = allOrders.filter(o => {
    const matchStatus =
      ordersFilter === 'all' ? true :
      ordersFilter === 'open' ? ['New','Confirmed','Preparing','Ready'].includes(o.status) :
      ordersFilter === 'completed' ? o.status === 'Completed' :
      o.status === 'Cancelled';
    const matchSearch = !ordersSearch ||
      o.num.toLowerCase().includes(ordersSearch) ||
      (o.items||'').toLowerCase().includes(ordersSearch) ||
      (o.lineItems||[]).some(i => i.name.toLowerCase().includes(ordersSearch)) ||
      (o.channel||'').toLowerCase().includes(ordersSearch) ||
      (o.card4 && o.card4.includes(ordersSearch)) ||
      (typeof o.customer === 'string' ? o.customer.toLowerCase().includes(ordersSearch) : (o.customer && o.customer.name && o.customer.name.toLowerCase().includes(ordersSearch)));
    // Revenue center: map channel to RC
    const channelToRC = {'In-House':'Dine-In','DoorDash':'Delivery','Uber Eats':'Delivery','GrubHub':'Delivery','Plum':'Takeout'};
    const orderRC = channelToRC[o.channel] || 'Dine-In';
    const matchRC = ordersRC.length === 0 || ordersRC.includes(orderRC);
    // Payment: stored on order or default to unknown (prototype: filter by channel heuristic)
    const orderPayment = o.payment || 'Credit Card';
    const matchPayment = ordersPayment.length === 0 || ordersPayment.includes(orderPayment);
    return matchStatus && matchSearch && matchRC && matchPayment;
  });

  // Sort: open statuses first (New → Confirmed → Preparing → Ready), then Completed, then Cancelled
  // Within each group, newest order number first
  const statusPriority = { New:0, Confirmed:1, Preparing:2, Ready:3, Completed:4, Cancelled:5 };
  filtered.sort((a, b) => {
    const pa = statusPriority[a.status] ?? 4;
    const pb = statusPriority[b.status] ?? 4;
    if (pa !== pb) return pa - pb;
    // Within same status: higher order number = newer = first
    const na = parseInt((a.num||'').replace(/\D/g,'')) || 0;
    const nb = parseInt((b.num||'').replace(/\D/g,'')) || 0;
    return nb - na;
  });

  const totalRev  = allOrders.filter(o=>o.status!=='Cancelled').reduce((s,o)=>s+parseFloat((o.amount||'0').replace('$','').replace(',','')),0);
  const openCount = allOrders.filter(o=>['New','Confirmed','Preparing','Ready'].includes(o.status)).length;
  const compCount = allOrders.filter(o=>o.status==='Completed').length;
  const cancCount = allOrders.filter(o=>o.status==='Cancelled').length;

  const isL = isLight;
  const bg       = isL ? '#f3f4f6' : 'var(--bg)';
  const cardBg   = isL ? '#ffffff' : 'var(--surface2)';
  const rowAlt   = isL ? '#f9fafb' : 'rgba(255,255,255,.03)';
  const bdr      = isL ? '#f3f4f6' : 'var(--border)';
  const textMain = isL ? '#111827' : 'var(--text)';
  const textSub  = isL ? '#374151' : 'var(--text2)';
  const textMuted= isL ? '#9ca3af' : 'var(--text3)';
  const inputBg  = isL ? '#ffffff' : 'var(--surface2)';

  const statusMeta = {
    New:       { color:'#3b82f6', bg:'rgba(59,130,246,.12)',  label:'New'       },
    Confirmed: { color:'#7c3aed', bg:'rgba(124,58,237,.12)',  label:'Confirmed' },
    Preparing: { color:'#f59e0b', bg:'rgba(245,158,11,.12)',  label:'Preparing' },
    Ready:     { color:'#22c55e', bg:'rgba(34,197,94,.12)',   label:'Ready'     },
    Completed: { color:'#6b7280', bg:'rgba(107,114,128,.1)',  label:'Completed' },
    Cancelled: { color:'#ef4444', bg:'rgba(239,68,68,.1)',    label:'Cancelled' },
  };
  const chanIcon = {'Uber Eats':'🛵','DoorDash':'🚗','GrubHub':'🍔','In-House':'🍽'};
  const dateRanges = [
    {id:'today',label:'Today'},
    {id:'yesterday',label:'Yesterday'},
    {id:'7days',label:'Last 7 Days'},
  ];
  const filters = [
    {id:'all',label:'All',count:allOrders.length},
    {id:'open',label:'Open',count:openCount},
    {id:'completed',label:'Completed',count:compCount},
    {id:'cancelled',label:'Cancelled',count:cancCount},
  ];

  // Count active filters for badge
  const activeFilterCount = [
    ordersDateRange !== 'today',
    ordersRC.length > 0,
    ordersPayment.length > 0,
  ].filter(Boolean).length;

  document.getElementById('ordersPageContent').innerHTML = `

    <!-- Search + Filter row -->
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px">
      <div style="position:relative;flex:1">
        <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);width:13px;height:13px;pointer-events:none" viewBox="0 0 24 24" fill="none" stroke="${textMuted}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input id="ordersSearchInput" type="text" placeholder="Search orders…" value="${ordersSearch}"
          oninput="setOrdersSearch(this.value)"
          style="width:100%;box-sizing:border-box;padding:9px 30px 9px 30px;border-radius:10px;
            border:1.5px solid ${ordersSearch?'var(--accent)':bdr};
            background:${inputBg};color:${textMain};font-size:12px;font-family:inherit;outline:none;transition:border-color .15s"/>
        ${ordersSearch ? `<button onclick="setOrdersSearch('');document.getElementById('ordersSearchInput').value=''"
          style="position:absolute;right:8px;top:50%;transform:translateY(-50%);border:none;background:${isL?'#e5e7eb':'rgba(255,255,255,.12)'};
            color:${textMuted};width:17px;height:17px;border-radius:50%;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0">✕</button>` : ''}
      </div>
      <!-- Filter button -->
      <button onclick="openOrdersFilterModal()" style="position:relative;display:flex;align-items:center;gap:5px;padding:8px 12px;border-radius:10px;border:1.5px solid ${activeFilterCount>0?'var(--accent)':bdr};background:${activeFilterCount>0?'rgba(124,58,237,.08)':inputBg};color:${activeFilterCount>0?'var(--accent)':textMuted};font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
        Filter${activeFilterCount>0?` <span style="background:var(--accent);color:#fff;border-radius:10px;padding:1px 6px;font-size:10px;font-weight:800">${activeFilterCount}</span>`:''}
      </button>
    </div>

    <!-- Status tabs -->
    <div style="display:flex;border-bottom:1px solid ${bdr};margin-bottom:0;gap:0">
      ${filters.map(f=>`
        <button onclick="setOrdersFilter('${f.id}')"
          style="flex:1;border:none;border-bottom:2px solid ${ordersFilter===f.id?'var(--accent)':'transparent'};
            padding:8px 4px;font-size:11px;font-weight:700;cursor:pointer;transition:all .15s;background:transparent;
            color:${ordersFilter===f.id?'var(--accent)':textMuted}">
          ${f.label} <span style="font-size:10px;font-weight:600;opacity:.7">${f.count}</span>
        </button>`).join('')}
    </div>

    <!-- Order list -->
    ${filtered.length === 0 ? `
      <div style="text-align:center;padding:52px 20px 40px">
        <div style="width:64px;height:64px;border-radius:20px;background:${isL?'#f3f4f6':'rgba(255,255,255,.06)'};display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 14px">
          ${ordersSearch ? '🔍' : ordersFilter === 'cancelled' ? '🚫' : ordersFilter === 'completed' ? '✅' : '📭'}
        </div>
        <div style="font-size:14px;font-weight:800;color:${textMain};margin-bottom:6px">
          ${ordersSearch ? `No orders matching \"${ordersSearch}\"` : ordersFilter === 'open' ? 'No open orders right now' : ordersFilter === 'completed' ? 'No completed orders' : ordersFilter === 'cancelled' ? 'No cancelled orders' : 'No orders yet today'}
        </div>
        <div style="font-size:12px;color:${textMuted};line-height:1.6">
          ${ordersSearch ? 'Try a different search term or clear the filter.' : ordersFilter === 'open' ? 'All caught up! New orders will appear here automatically.' : 'Orders will show here once they come in.'}
        </div>
        ${ordersSearch || ordersFilter !== 'all' ? `<button onclick="setOrdersSearch('');setOrdersFilter('all');document.getElementById('ordersSearchInput') && (document.getElementById('ordersSearchInput').value='')" style="margin-top:14px;padding:8px 18px;border-radius:10px;border:1.5px solid ${isL?'#e5e7eb':'var(--border)'};background:transparent;color:${textMuted};font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">Clear filters</button>` : ''}
      </div>` :

    `<div style="margin-top:1px">
      ${(() => {
        const openStatuses = ['New','Confirmed','Preparing','Ready'];
        const openItems    = filtered.filter(o => openStatuses.includes(o.status));
        const closedItems  = filtered.filter(o => !openStatuses.includes(o.status));
        const renderRow = (o, idx, arr) => {
          const sm   = statusMeta[o.status] || statusMeta.Completed;
          const items = o.lineItems ? o.lineItems.map(i=>`${i.qty>1?i.qty+'× ':''}${i.name}`).join(', ') : (o.items||'');
          const isLast = idx === arr.length - 1;
          return `
          <div onclick="openOrderDetailFromAll('${o.num}')"
            style="display:flex;align-items:center;padding:11px 2px;${isLast?'':'border-bottom:1px solid '+bdr};cursor:pointer;gap:10px;transition:opacity .1s"
            onmouseover="this.style.opacity='.75'" onmouseout="this.style.opacity='1'">
            <div style="width:7px;height:7px;border-radius:50%;background:${sm.color};flex-shrink:0;margin-top:1px"></div>
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:2px">
                <span style="font-size:12px;font-weight:800;color:${textMain}">${o.num}</span>
                <span style="font-size:10px;color:${textMuted}">${o.time}</span>
              </div>
              <div style="font-size:11px;color:${textMuted};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${chanIcon[o.channel]||'📦'} ${o.channel} · ${items}</div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              <div style="font-size:13px;font-weight:900;color:${textMain}">${o.amount}</div>
              <div style="font-size:9px;font-weight:700;color:${sm.color};margin-top:2px">${sm.label}</div>
            </div>
            <span style="font-size:13px;color:${textMuted};flex-shrink:0">›</span>
          </div>`;
        };
        const sectionHead = (label, count, color) => `
          <div style="display:flex;align-items:center;gap:8px;padding:10px 2px 6px;border-bottom:1px solid ${bdr}">
            <span style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:${color}">${label}</span>
            <span style="font-size:10px;font-weight:700;color:${textMuted}">${count}</span>
          </div>`;
        let html = '';
        if (ordersFilter === 'all') {
          if (openItems.length)   html += sectionHead('Open', openItems.length, 'var(--accent)') + openItems.map((o,i,a)=>renderRow(o,i,a)).join('');
          if (closedItems.length) html += sectionHead('Past Orders', closedItems.length, textMuted)  + closedItems.map((o,i,a)=>renderRow(o,i,a)).join('');
        } else {
          html = filtered.map((o,i,a)=>renderRow(o,i,a)).join('');
        }
        return html;
      })()}
    </div>
    <!-- Footer count -->
    <div style="padding:10px 2px 2px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid ${bdr}">
      <span style="font-size:10px;color:${textMuted}">${filtered.length} orders</span>
      <span style="font-size:11px;font-weight:800;color:${textMain}">$${filtered.filter(o=>o.status!=='Cancelled').reduce((s,o)=>s+parseFloat((o.amount||'0').replace('$','').replace(',','')),0).toFixed(2)}</span>
    </div>`}
  `;
}

function openOrdersFilterModal() {
  // Sync temp state from current state
  window._tmpOrdersDateRange = ordersDateRange;
  window._tmpOrdersRC = [...ordersRC];
  window._tmpOrdersPayment = [...ordersPayment];
  window._tmpOrdersCustomFrom = ordersCustomFrom;
  window._tmpOrdersCustomTo = ordersCustomTo;
  renderOrdersFilterModal();
  document.getElementById('ordersFilterModal').style.display = 'flex';
}

function closeOrdersFilterModal() {
  document.getElementById('ordersFilterModal').style.display = 'none';
}

function applyOrdersFilterModal() {
  ordersDateRange = window._tmpOrdersDateRange;
  ordersRC = [...window._tmpOrdersRC];
  ordersPayment = [...window._tmpOrdersPayment];
  ordersCustomFrom = window._tmpOrdersCustomFrom;
  ordersCustomTo = window._tmpOrdersCustomTo;
  closeOrdersFilterModal();
  renderOrdersPage();
}

function clearOrdersFilterModal() {
  window._tmpOrdersDateRange = 'today';
  window._tmpOrdersRC = [];
  window._tmpOrdersPayment = [];
  window._tmpOrdersCustomFrom = '';
  window._tmpOrdersCustomTo = '';
  renderOrdersFilterModal();
}

function toggleTmpRC(id) {
  const idx = window._tmpOrdersRC.indexOf(id);
  if (idx === -1) window._tmpOrdersRC.push(id);
  else window._tmpOrdersRC.splice(idx, 1);
  renderOrdersFilterModal();
}

function toggleTmpPayment(id) {
  const idx = window._tmpOrdersPayment.indexOf(id);
  if (idx === -1) window._tmpOrdersPayment.push(id);
  else window._tmpOrdersPayment.splice(idx, 1);
  renderOrdersFilterModal();
}

function setTmpDateRange(r) {
  window._tmpOrdersDateRange = r;
  renderOrdersFilterModal();
}

function renderOrdersFilterModal() {
  const isL = isLight;
  const bdr       = isL ? '#e5e7eb' : 'var(--border)';
  const textMuted = isL ? '#9ca3af' : 'var(--text3)';
  const textMain  = isL ? '#111827' : 'var(--text)';
  const textSub   = isL ? '#6b7280' : 'var(--text2)';
  const inputBg   = isL ? '#f9fafb' : 'var(--surface2)';
  const rowBg     = isL ? '#f9fafb' : 'var(--surface2)';
  const dr  = window._tmpOrdersDateRange;
  const rc  = window._tmpOrdersRC;
  const pay = window._tmpOrdersPayment;
  const hasFilters = dr !== 'today' || rc.length > 0 || pay.length > 0;

  // Date pill (still small — only 3 options)
  const datePill = (id, label) => {
    const active = dr === id;
    return `<button onclick="setTmpDateRange('${id}')"
      style="border:1.5px solid ${active?'var(--accent)':bdr};border-radius:20px;padding:7px 16px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s;
        background:${active?'rgba(124,58,237,.10)':'transparent'};color:${active?'var(--accent)':textSub}">${label}</button>`;
  };

  // Scalable checkbox row — works for 4 or 40 items
  const checkRow = (emoji, label, isActive, onclick) => `
    <div onclick="${onclick}" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;cursor:pointer;transition:background .12s;
      background:${isActive ? 'rgba(124,58,237,.07)' : 'transparent'}"
      onmouseover="this.style.background='${isActive?'rgba(124,58,237,.10)':rowBg}'"
      onmouseout="this.style.background='${isActive?'rgba(124,58,237,.07)':'transparent'}'">
      <span style="font-size:18px;width:24px;text-align:center;flex-shrink:0">${emoji}</span>
      <span style="flex:1;font-size:13px;font-weight:600;color:${textMain}">${label}</span>
      <span style="width:20px;height:20px;border-radius:6px;border:2px solid ${isActive?'var(--accent)':bdr};background:${isActive?'var(--accent)':'transparent'};
        display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s">
        ${isActive ? '<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
      </span>
    </div>`;

  const rcItems  = [{id:'Dine-In',emoji:'🍽',label:'Dine-In'},{id:'Takeout',emoji:'🥡',label:'Takeout'},{id:'Delivery',emoji:'🛵',label:'Delivery'},{id:'Bar',emoji:'🍸',label:'Bar'},{id:'Patio',emoji:'🌿',label:'Patio'},{id:'Drive-Thru',emoji:'🚗',label:'Drive-Thru'},{id:'Catering',emoji:'🎪',label:'Catering'},{id:'Online',emoji:'🌐',label:'Online'}];
  const payItems = [{id:'Credit Card',emoji:'💳',label:'Card'},{id:'Cash',emoji:'💵',label:'Cash'},{id:'Apple/Google Pay',emoji:'📱',label:'Digital (Apple/Google Pay)'},{id:'Gift Card',emoji:'🎁',label:'Gift Card'},{id:'House Account',emoji:'📋',label:'House Account'}];

  document.getElementById('ordersFilterModalBody').innerHTML = `

    <!-- Date -->
    <div style="margin-bottom:20px">
      <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:${textMuted};margin-bottom:10px">Date</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${datePill('today','Today')}
        ${datePill('yesterday','Yesterday')}
        ${datePill('custom','Custom Range')}
      </div>
      ${dr === 'custom' ? `
      <div style="display:flex;gap:8px;margin-top:12px">
        <div style="flex:1">
          <div style="font-size:10px;color:${textMuted};font-weight:700;margin-bottom:4px">From</div>
          <input type="date" value="${window._tmpOrdersCustomFrom}" onchange="window._tmpOrdersCustomFrom=this.value"
            style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:10px;border:1.5px solid ${bdr};background:${inputBg};color:${textMain};font-size:12px;font-family:inherit;outline:none"/>
        </div>
        <div style="flex:1">
          <div style="font-size:10px;color:${textMuted};font-weight:700;margin-bottom:4px">To</div>
          <input type="date" value="${window._tmpOrdersCustomTo}" onchange="window._tmpOrdersCustomTo=this.value"
            style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:10px;border:1.5px solid ${bdr};background:${inputBg};color:${textMain};font-size:12px;font-family:inherit;outline:none"/>
        </div>
      </div>` : ''}
    </div>

    <div style="height:1px;background:${bdr};margin-bottom:20px"></div>

    <!-- Revenue Center -->
    <div style="margin-bottom:20px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:${textMuted}">Revenue Center</div>
        ${rc.length > 0
          ? `<button onclick="window._tmpOrdersRC=[];renderOrdersFilterModal()" style="font-size:10px;color:var(--accent);font-weight:700;background:none;border:none;cursor:pointer;font-family:inherit;padding:0">${rc.length} selected · Clear</button>`
          : `<span style="font-size:11px;color:${textMuted}">Any</span>`}
      </div>
      <div style="border:1.5px solid ${bdr};border-radius:14px;overflow:hidden">
        ${rcItems.map((r,i)=>checkRow(r.emoji, r.label, rc.includes(r.id), `toggleTmpRC('${r.id}')`)).join(`<div style="height:1px;background:${bdr};margin:0 14px"></div>`)}
      </div>
    </div>

    <div style="height:1px;background:${bdr};margin-bottom:20px"></div>

    <!-- Payment -->
    <div style="margin-bottom:8px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:${textMuted}">Payment</div>
        ${pay.length > 0
          ? `<button onclick="window._tmpOrdersPayment=[];renderOrdersFilterModal()" style="font-size:10px;color:var(--accent);font-weight:700;background:none;border:none;cursor:pointer;font-family:inherit;padding:0">${pay.length} selected · Clear</button>`
          : `<span style="font-size:11px;color:${textMuted}">Any</span>`}
      </div>
      <div style="border:1.5px solid ${bdr};border-radius:14px;overflow:hidden">
        ${payItems.map((p,i)=>checkRow(p.emoji, p.label, pay.includes(p.id), `toggleTmpPayment('${p.id}')`)).join(`<div style="height:1px;background:${bdr};margin:0 14px"></div>`)}
      </div>
    </div>

    ${hasFilters ? `
    <div style="height:1px;background:${bdr};margin:20px 0 16px"></div>
    <button onclick="clearOrdersFilterModal()"
      style="width:100%;border:1.5px solid rgba(239,68,68,.25);padding:10px;border-radius:10px;background:rgba(239,68,68,.06);color:var(--red);font-size:12px;font-weight:800;cursor:pointer;font-family:inherit">
      Clear All Filters
    </button>` : ''}
  `;
}

function toggleOrdersFilterPanel() {
  ordersFilterPanelOpen = !ordersFilterPanelOpen;
  renderOrdersPage();
  const input = document.getElementById('ordersSearchInput');
  if (input) input.focus();
}

function setOrdersFilter(f) {
  ordersFilter = f;
  renderOrdersPage();
}

function setOrdersDateRange(r) {
  ordersDateRange = r;
  renderOrdersPage();
}

function setOrdersSearch(val) {
  ordersSearch = val.toLowerCase().trim();
  renderOrdersPage();
  // Restore focus + cursor position
  const input = document.getElementById('ordersSearchInput');
  if (input) { input.focus(); input.setSelectionRange(val.length, val.length); }
}

function openOrdersCustomDate() {
  showSuccess('Custom Range', 'Date range picker coming soon.');
}

function openOrderDetailFromAll(num) {
  // Range-scaled duplicates use synthetic numbers like #9 10231 / #8 10231.
  // Normalize back to the original 5-digit order number for lookup.
  const tryNums = [num];
  const stripped = num.replace(/^#\d(\d{5})$/, '#$1');
  if (stripped !== num) tryNums.push(stripped);
  let resolved = num;
  for (const n of tryNums) {
    if (openOrders.find(o => o.num === n) || completedOrders.find(o => o.num === n)) { resolved = n; break; }
  }
  num = resolved;
  const fromOpen = openOrders.find(o => o.num === num);
  if (fromOpen) { openOrderDetail(num); return; }
  const o = completedOrders.find(o => o.num === num);
  if (!o) return;
  const sm = { Completed:{color:'var(--green)'}, Cancelled:{color:'var(--red)'} }[o.status] || {color:'var(--text3)'};
  const isL = isLight;
  const cardBg = isL?'#ffffff':'var(--surface2)';
  const bdr    = isL?'#e5e7eb':'var(--border)';
  const divBdr = isL?'#f3f4f6':'var(--border)';
  const textMain = isL?'#111827':'var(--text)';
  const textSub  = isL?'#374151':'var(--text2)';
  const textMuted= isL?'#6b7280':'var(--text3)';
  const chanIcon = {'Uber Eats':'🛵','DoorDash':'🚗','GrubHub':'🍔','In-House':'🍽'};
  document.getElementById('orderDetailBody').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <div>
        <div style="font-size:18px;font-weight:900;color:${textMain}">${o.num}</div>
        <div style="font-size:11px;color:${textMuted};margin-top:3px">${chanIcon[o.channel]||'📦'} ${o.channel} · ${o.time}</div>
      </div>
      <span style="font-size:11px;font-weight:800;padding:4px 12px;border-radius:20px;background:${sm.color}22;color:${sm.color}">${o.status}</span>
    </div>
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:12px;padding:12px;margin-bottom:10px">
      <div style="font-size:10px;font-weight:800;color:${textMuted};letter-spacing:.5px;margin-bottom:8px">CUSTOMER</div>
      <div style="font-size:13px;font-weight:700;color:${textMain}">${o.customer}</div>
    </div>
    ${o.server ? `
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:12px;padding:12px;margin-bottom:10px">
      <div style="font-size:10px;font-weight:800;color:${textMuted};letter-spacing:.5px;margin-bottom:8px">SERVER</div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:8px">
          ${avatarHtml(o.server.name, 32)}
          <div>
            <div style="font-size:13px;font-weight:700;color:${textMain}">${o.server.name}</div>
            <div style="font-size:11px;color:${textMuted};margin-top:1px">${o.server.role}</div>
          </div>
        </div>
        <div style="font-size:10px;font-weight:700;color:${textMuted}">🖥 ${o.server.terminal}</div>
      </div>
    </div>` : ''}
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:12px;padding:12px;margin-bottom:10px">
      <div style="font-size:10px;font-weight:800;color:${textMuted};letter-spacing:.5px;margin-bottom:10px">ORDER ITEMS</div>
      ${o.lineItems.map((i,idx)=>`
        <div style="padding:7px 0;${idx<o.lineItems.length-1?'border-bottom:1px solid '+divBdr:''}">
          <div style="display:flex;justify-content:space-between;align-items:baseline">
            <span style="font-size:13px;color:${textMain}">${i.qty>1?`<b>${i.qty}×</b> `:''}${i.name}</span>
            <span style="font-size:13px;font-weight:700;color:${textMain};flex-shrink:0;margin-left:8px">${i.price}</span>
          </div>
          ${i.mods && i.mods.length ? i.mods.map(m=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:2px 0 2px 12px;border-left:2px solid ${isL?'#e5e7eb':'rgba(255,255,255,.1)'}">
              <span style="font-size:11px;color:${textMuted}">↳ ${m.name}</span>
              <span style="font-size:11px;font-weight:700;color:${m.price > 0 ? 'var(--accent)' : textMuted}">${m.price > 0 ? '+$'+m.price.toFixed(2) : '$0.00'}</span>
            </div>`).join('') : ''}
        </div>`).join('')}
      ${o.notes?`<div style="margin-top:8px;font-size:11px;color:var(--amber);padding-top:8px;border-top:1px solid ${divBdr}">📝 ${o.notes}</div>`:''}
    </div>
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:12px;padding:12px;margin-bottom:10px">
      <div style="font-size:10px;font-weight:800;color:${textMuted};letter-spacing:.5px;margin-bottom:10px">SUMMARY</div>
      ${[['Subtotal',o.subtotal],['Discount',o.discount],['Tax',o.tax],['Tip',o.tip]].map(([l,v])=>`
        <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:12px;color:${textSub}">
          <span>${l}</span><span>${v}</span>
        </div>`).join('')}
      <div style="display:flex;justify-content:space-between;padding:10px 0 0;margin-top:6px;border-top:1px solid ${bdr};font-size:15px;font-weight:900;color:${textMain}">
        <span>Total</span><span>${o.total}</span>
      </div>
    </div>
    ${o.card4 ? `
    <div style="background:${cardBg};border:1px solid ${bdr};border-radius:12px;padding:12px;margin-bottom:10px">
      <div style="font-size:10px;font-weight:800;color:${textMuted};letter-spacing:.5px;margin-bottom:8px">PAYMENT</div>
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:36px;height:24px;border-radius:5px;background:${o.cardType==='Amex'?'#2671b3':o.cardType==='Mastercard'?'#eb001b':o.cardType==='Discover'?'#ff6600':'#1a1f71'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-size:8px;font-weight:900;color:#fff;letter-spacing:.3px">${(o.cardType||'VISA').toUpperCase().slice(0,4)}</span>
        </div>
        <div>
          <div style="font-size:13px;font-weight:700;color:${textMain}">${o.cardType} ${o.card4}</div>
          <div style="font-size:11px;color:${textMuted};margin-top:1px">Card on file</div>
        </div>
      </div>
    </div>` : ''}
    <!-- Receipt thumbnail -->
    <div onclick="openReceiptModal('${o.num}')" style="cursor:pointer;display:flex;align-items:center;gap:12px;background:var(--surface2);border:1.5px dashed var(--border);border-radius:12px;padding:12px 14px;margin-bottom:16px;transition:background .15s"
      onmouseover="this.style.background='var(--surface3)'" onmouseout="this.style.background='var(--surface2)'">
      <div style="flex-shrink:0;width:38px;height:48px;background:var(--surface);border:1px solid var(--border);border-radius:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:5px;position:relative;overflow:hidden">
        <div style="width:70%;height:2px;border-radius:2px;background:var(--border)"></div>
        <div style="width:90%;height:2px;border-radius:2px;background:var(--border)"></div>
        <div style="width:70%;height:2px;border-radius:2px;background:var(--border)"></div>
        <div style="width:90%;height:2px;border-radius:2px;background:var(--border)"></div>
        <div style="width:80%;height:2px;border-radius:2px;background:var(--accent);margin-top:2px"></div>
      </div>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:800;color:var(--text)">View Customer Receipt</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${o.num} · ${o.total} · Tap to expand</div>
      </div>
      <div style="font-size:16px;color:var(--text3)">›</div>
    </div>
  `;
  showOrderDetailPage();
}


const staffData = [
  { id:1, name:'Sarah M.', role:'Server',    avatar:'👩', clockIn:'9:02 AM', clockInMins:398, status:'active',   breakMins:0,  orders:34, sales:687.40, voids:1, comps:0, topItem:'Steak Frites',    hourlyRate:14 },
  { id:2, name:'Tom B.',   role:'Server',    avatar:'👨', clockIn:'9:15 AM', clockInMins:385, status:'break',    breakMins:18, orders:21, sales:412.80, voids:0, comps:1, topItem:'BBQ Wings',        hourlyRate:14 },
  { id:3, name:'Jake R.',  role:'Server',    avatar:'🧑', clockIn:'10:00 AM',clockInMins:340, status:'active',   breakMins:22, orders:28, sales:543.20, voids:5, comps:2, topItem:'Margherita Pizza', hourlyRate:14 },
  { id:4, name:'Amy K.',   role:'Host',      avatar:'👩', clockIn:'10:30 AM',clockInMins:310, status:'active',   breakMins:15, orders:0,  sales:0,      voids:0, comps:0, topItem:'—',               hourlyRate:13 },
  { id:5, name:'Lisa M.',  role:'Bartender', avatar:'👩', clockIn:'11:00 AM',clockInMins:280, status:'active',   breakMins:12, orders:18, sales:892.50, voids:0, comps:0, topItem:'Wine Glass',       hourlyRate:16 },
  { id:6, name:'Marcus J.',role:'Server',    avatar:'🧑', clockIn:'11:30 AM',clockInMins:250, status:'active',   breakMins:0,  orders:15, sales:298.75, voids:0, comps:1, topItem:'Salmon Teriyaki',  hourlyRate:14 },
  { id:7, name:'Dana H.',  role:'Server',    avatar:'👩', clockIn:'2:00 PM', clockInMins:120, status:'active',   breakMins:0,  orders:9,  sales:187.20, voids:0, comps:0, topItem:'Caesar Salad',     hourlyRate:14 },
  { id:8, name:'Felix D.', role:'Busser',    avatar:'🧑', clockIn:'2:30 PM', clockInMins:90,  status:'break',    breakMins:8,  orders:0,  sales:0,      voids:0, comps:0, topItem:'—',               hourlyRate:12 },
];
const staffClockedOut = [
  { id:9,  name:'Nina C.',  role:'Server',    avatar:'👩', clockIn:'8:00 AM',  clockOut:'2:00 PM', totalMins:360, orders:42, sales:934.20, hourlyRate:14, breakMins:30, voids:0, comps:1, topItem:'Salmon Teriyaki Bowl' },
  { id:10, name:'Omar F.',  role:'Bartender', avatar:'🧑', clockIn:'10:00 AM', clockOut:'4:00 PM', totalMins:360, orders:31, sales:1240.50, hourlyRate:16, breakMins:20, voids:1, comps:0, topItem:'Wine Glass' },
];

function fmtMins(m) {
  const h = Math.floor(m / 60), min = m % 60;
  return h > 0 ? `${h}h ${min}m` : `${min}m`;
}

function renderStaffDashCard() {
  const active  = staffData.filter(s => s.status === 'active').length;
  const onBreak = staffData.filter(s => s.status === 'break').length;
  const el = document.getElementById('staffDashCard');
  if (!el) return;

  // Labor cost calculations
  const laborCost  = staffData.reduce((sum, s) => sum + (s.hourlyRate * s.clockInMins / 60), 0);
  const totalSales = dateData['0'].total;
  const laborPct   = totalSales > 0 ? ((laborCost / totalSales) * 100).toFixed(1) : '0.0';
  const laborColor = parseFloat(laborPct) > 30 ? 'var(--red)' : parseFloat(laborPct) > 22 ? 'var(--amber)' : 'var(--green)';

  // Theme-aware tokens
  const tileBg   = isLight ? '#f3f4f6' : 'var(--surface2)';
  const tileBdr  = isLight ? '#e5e7eb' : 'var(--border)';
  const rowBg    = isLight ? '#f9fafb' : 'var(--surface2)';
  const textMain = isLight ? '#111827' : 'var(--text)';
  const textSub  = isLight ? '#6b7280' : 'var(--text3)';

  el.innerHTML = `
    <!-- Header -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <div class="card-title" style="margin-bottom:0">Current Shift</div>
      <div style="display:flex;gap:6px;align-items:center">
        <span style="font-size:10px;font-weight:700;color:var(--green)">● ${active} In Shift</span>
        ${onBreak > 0 ? `<span style="font-size:10px;font-weight:700;color:var(--amber)">● ${onBreak} On Break</span>` : ''}
      </div>
    </div>

    <!-- Labor metrics strip -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:12px">
      <div style="background:${tileBg};border:1px solid ${tileBdr};border-radius:10px;padding:8px 10px;text-align:center">
        <div style="font-size:15px;font-weight:900;color:var(--accent)">${staffData.length}</div>
        <div style="font-size:9px;font-weight:700;color:${textSub};letter-spacing:.3px">ON SHIFT</div>
      </div>
      <div style="background:${tileBg};border:1px solid ${tileBdr};border-radius:10px;padding:8px 10px;text-align:center">
        <div style="font-size:15px;font-weight:900;color:${textMain}">$${laborCost.toFixed(0)}</div>
        <div style="font-size:9px;font-weight:700;color:${textSub};letter-spacing:.3px">LABOR $</div>
      </div>
      <div style="background:${tileBg};border:1px solid ${tileBdr};border-radius:10px;padding:8px 10px;text-align:center">
        <div style="font-size:15px;font-weight:900;color:${laborColor}">${laborPct}%</div>
        <div style="font-size:9px;font-weight:700;color:${textSub};letter-spacing:.3px">LABOR %</div>
      </div>
    </div>

    <!-- Staff rows -->
    <div style="display:flex;flex-direction:column;gap:5px">
      ${staffData.slice(0,2).map(s => {
        const empCost = (s.hourlyRate * s.clockInMins / 60).toFixed(0);
        return `
        <div style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:${rowBg};border-radius:10px;border:1px solid ${tileBdr};border-left:3px solid ${s.status==='break'?'var(--amber)':'var(--green)'}">
          ${avatarHtml(s.name, 28)}
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:700;color:${textMain};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name} <span style="font-size:10px;font-weight:500;color:${textSub}">${s.role}</span></div>
            <div style="font-size:10px;color:${textSub}">${fmtMins(s.clockInMins)} · $${empCost} labor</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:11px;font-weight:800;color:${textMain}">${s.orders > 0 ? s.orders + ' orders' : '—'}</div>
            <div style="font-size:10px;font-weight:700;color:${s.status==='break'?'var(--amber)':'var(--green)'}">${s.status==='break'?'On Break':'In Shift'}</div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- Footer -->
    <div style="margin-top:10px;text-align:center;font-size:12px;font-weight:700;color:var(--accent)">
      ${staffData.length > 2 ? `+${staffData.length - 2} more · ` : ''}View all staff →
    </div>
  `;
}

function renderStaffPage() {
  const totalSales  = staffData.reduce((s,e) => s + e.sales, 0);
  const totalOrders = staffData.reduce((s,e) => s + e.orders, 0);
  const laborCost   = staffData.reduce((sum,s) => sum + (s.hourlyRate * s.clockInMins / 60), 0);
  const shifSales   = dateData['0'].total;
  const laborPct    = shifSales > 0 ? ((laborCost / shifSales) * 100).toFixed(1) : '0.0';
  const laborColor  = parseFloat(laborPct) > 30 ? 'var(--red)' : parseFloat(laborPct) > 22 ? 'var(--amber)' : 'var(--green)';

  // Theme-aware tokens
  const tileBg   = isLight ? '#ffffff' : 'var(--surface2)';
  const innerBg  = isLight ? '#f3f4f6' : 'var(--surface)';
  const tileBdr  = isLight ? '#e5e7eb' : 'var(--border)';
  const cardBg   = isLight ? '#ffffff' : 'var(--surface2)';
  const textMain = isLight ? '#111827' : 'var(--text)';
  const textSub  = isLight ? '#374151' : 'var(--text2)';
  const textMuted= isLight ? '#6b7280' : 'var(--text3)';

  document.getElementById('staffPageContent').innerHTML = `
    <!-- Summary strip — single row -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-bottom:14px">
      <div style="background:${tileBg};border:1px solid ${tileBdr};border-radius:12px;padding:8px 6px;text-align:center">
        <div style="font-size:16px;font-weight:900;color:var(--accent)">${staffData.length}</div>
        <div style="font-size:9px;font-weight:700;color:${textMuted};letter-spacing:.3px">CLOCKED IN</div>
      </div>
      <div style="background:${tileBg};border:1px solid ${tileBdr};border-radius:12px;padding:8px 6px;text-align:center">
        <div style="font-size:16px;font-weight:900;color:var(--green)">${totalOrders}</div>
        <div style="font-size:9px;font-weight:700;color:${textMuted};letter-spacing:.3px">ORDERS</div>
      </div>
      <div style="background:${tileBg};border:1px solid ${tileBdr};border-radius:12px;padding:8px 6px;text-align:center">
        <div style="font-size:14px;font-weight:900;color:${textMain}">$${laborCost.toFixed(0)}</div>
        <div style="font-size:9px;font-weight:700;color:${textMuted};letter-spacing:.3px">LABOR $</div>
      </div>
      <div style="background:${tileBg};border:1px solid ${tileBdr};border-radius:12px;padding:8px 6px;text-align:center">
        <div style="font-size:16px;font-weight:900;color:${laborColor}">${laborPct}%</div>
        <div style="font-size:9px;font-weight:700;color:${textMuted};letter-spacing:.3px">LABOR %</div>
      </div>
    </div>

    <!-- Active staff -->
    <div style="font-size:11px;font-weight:800;color:${textMuted};letter-spacing:.5px;margin-bottom:8px">CLOCKED IN (${staffData.length})</div>
    ${staffData.map(s => {
      return `
      <div onclick="openStaffDetail(${s.id})" style="background:${cardBg};border:1px solid ${tileBdr};border-left:3px solid ${s.status==='break'?'var(--amber)':'var(--green)'};border-radius:12px;padding:12px;margin-bottom:8px;cursor:pointer">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div style="display:flex;align-items:center;gap:10px">
            ${avatarHtml(s.name, 38)}
            <div>
              <div style="font-size:13px;font-weight:800;color:${textMain}">${s.name}</div>
              <div style="font-size:11px;color:${textMuted}">${s.role} · In since ${s.clockIn}</div>
            </div>
          </div>
          <div style="text-align:right">
            <span style="font-size:11px;font-weight:800;padding:3px 9px;border-radius:20px;background:${s.status==='break'?'rgba(245,158,11,.15)':'rgba(34,197,94,.15)'};color:${s.status==='break'?'var(--amber)':'var(--green)'}">
              ${s.status==='break'?'On Break':'In Shift'}
            </span>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:5px">
          <div style="background:${innerBg};border-radius:8px;padding:6px;text-align:center;border:1px solid ${tileBdr}">
            <div style="font-size:12px;font-weight:900;color:${textMain}">${fmtMins(s.clockInMins)}</div>
            <div style="font-size:9px;color:${textMuted};font-weight:700">SHIFT</div>
          </div>
          <div style="background:${innerBg};border-radius:8px;padding:6px;text-align:center;border:1px solid ${tileBdr}">
            <div style="font-size:12px;font-weight:900;color:${textMain}">${s.orders}</div>
            <div style="font-size:9px;color:${textMuted};font-weight:700">ORDERS</div>
          </div>
          <div style="background:${innerBg};border-radius:8px;padding:6px;text-align:center;border:1px solid ${tileBdr}">
            <div style="font-size:12px;font-weight:900;color:${textMain}">$${s.sales.toFixed(0)}</div>
            <div style="font-size:9px;color:${textMuted};font-weight:700">SALES</div>
          </div>
          <div style="background:${innerBg};border-radius:8px;padding:6px;text-align:center;border:1px solid ${tileBdr}">
            <div style="font-size:12px;font-weight:900;color:${s.breakMins>20?'var(--amber)':textMain}">${s.breakMins > 0 ? fmtMins(s.breakMins) : '—'}</div>
            <div style="font-size:9px;color:${textMuted};font-weight:700">BREAK</div>
          </div>
        </div>
      </div>`;
    }).join('')}

    <!-- Clocked out -->
    <div style="font-size:11px;font-weight:800;color:${textMuted};letter-spacing:.5px;margin:14px 0 8px">CLOCKED OUT TODAY (${staffClockedOut.length})</div>
    ${staffClockedOut.map(s => `
      <div onclick="openClockedOutDetail(${s.id})" style="background:${cardBg};border:1px solid ${tileBdr};border-left:3px solid ${tileBdr};border-radius:12px;padding:12px;margin-bottom:8px;cursor:pointer">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:10px">
            ${avatarHtml(s.name, 38)}
            <div>
              <div style="font-size:13px;font-weight:800;color:${textMain}">${s.name} <span style="font-size:10px;color:${textMuted}">${s.role}</span></div>
              <div style="font-size:11px;color:${textMuted}">${s.clockIn} – ${s.clockOut} · ${fmtMins(s.totalMins)}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="text-align:right">
              <div style="font-size:13px;font-weight:800;color:${textMain}">$${s.sales.toFixed(0)}</div>
              <div style="font-size:10px;color:${textMuted}">${s.orders} orders</div>
            </div>
            <span style="font-size:14px;color:${textMuted}">›</span>
          </div>
        </div>
      </div>`).join('')}
  `;
}

function openClockedOutDetail(id) {
  const s = staffClockedOut.find(e => e.id === id);
  if (!s) return;
  const avgOrder  = s.orders > 0 ? (s.sales / s.orders).toFixed(2) : '0.00';
  const laborCost = (s.hourlyRate * s.totalMins / 60).toFixed(2);
  document.getElementById('staffDetailBody').innerHTML = `
    <!-- Profile -->
    <div style="display:flex;align-items:center;gap:14px;padding:4px 0 20px">
      ${avatarHtml(s.name, 56)}
      <div style="flex:1">
        <div style="font-size:17px;font-weight:900;color:var(--text);margin-bottom:5px">${s.name}</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <span style="font-size:11px;font-weight:600;color:var(--text3);background:var(--surface2);padding:2px 8px;border-radius:6px;border:1px solid var(--border)">${s.role}</span>
          <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;background:rgba(107,114,128,.12);color:var(--text3)">Clocked Out</span>
        </div>
      </div>
    </div>
    <!-- Shift info -->
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:10px">SHIFT INFO</div>
      ${[['Clocked In',s.clockIn],['Clocked Out',s.clockOut],['Total Shift',fmtMins(s.totalMins)],['Break Taken',s.breakMins>0?fmtMins(s.breakMins):'No break'],['Labor Cost','$'+laborCost]].map(([l,v])=>`
        <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:12px;color:var(--text2)">${l}</span>
          <span style="font-size:12px;font-weight:700;color:var(--text)">${v}</span>
        </div>`).join('')}
    </div>
    <!-- Sales metrics -->
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:10px">SALES METRICS</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="background:var(--surface);border-radius:10px;padding:10px;text-align:center;border:1px solid var(--border)">
          <div style="font-size:20px;font-weight:900;color:var(--accent)">${s.orders}</div>
          <div style="font-size:10px;color:var(--text3);font-weight:700">ORDERS TAKEN</div>
        </div>
        <div style="background:var(--surface);border-radius:10px;padding:10px;text-align:center;border:1px solid var(--border)">
          <div style="font-size:20px;font-weight:900;color:var(--green)">$${s.sales.toFixed(0)}</div>
          <div style="font-size:10px;color:var(--text3);font-weight:700">TOTAL SALES</div>
        </div>
        <div style="background:var(--surface);border-radius:10px;padding:10px;text-align:center;border:1px solid var(--border)">
          <div style="font-size:20px;font-weight:900;color:var(--text)">$${avgOrder}</div>
          <div style="font-size:10px;color:var(--text3);font-weight:700">AVG ORDER</div>
        </div>
        <div style="background:var(--surface);border-radius:10px;padding:10px;text-align:center;border:1px solid var(--border)">
          <div style="font-size:20px;font-weight:900;color:var(--text)">${(s.orders/(s.totalMins/60)).toFixed(1)}</div>
          <div style="font-size:10px;color:var(--text3);font-weight:700">ORDERS/HR</div>
        </div>
      </div>
    </div>
    <!-- Shift Activity -->
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:10px">SHIFT ACTIVITY</div>
      ${[['Voids',s.voids,s.voids>2,'var(--red)'],['Comps',s.comps,s.comps>1,'var(--amber)'],['Top Item Sold',s.topItem,false,'']].map(([l,v,flag,fc])=>`
        <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:12px;color:var(--text2)">${l}</span>
          <span style="font-size:12px;font-weight:${flag?'800':'700'};color:${flag?fc:'var(--text)'}">${v}</span>
        </div>`).join('')}
    </div>
  `;
  openModal('staffDetailModal');
  setTimeout(() => applyModalTheme('#staffDetailModal'), 10);
}

function getAvatarColor(name) {
  const colors = [
    ['#7c3aed','#a78bfa'], ['#0369a1','#38bdf8'], ['#065f46','#34d399'],
    ['#92400e','#fbbf24'], ['#9d174d','#f472b6'], ['#1e40af','#60a5fa'],
    ['#7f1d1d','#f87171'], ['#064e3b','#6ee7b7'],
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
}
function avatarHtml(name, size=52) {
  const [bg, text] = getAvatarColor(name);
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;font-size:${Math.round(size*0.36)}px;font-weight:800;color:${text};flex-shrink:0;letter-spacing:-.5px">${getInitials(name)}</div>`;
}

function openStaffDetail(id) {
  const s = staffData.find(e => e.id === id);
  if (!s) return;
  const avgOrder = s.orders > 0 ? (s.sales / s.orders).toFixed(2) : '0.00';
  const statusBg = s.status==='break' ? 'rgba(245,158,11,.15)' : 'rgba(34,197,94,.15)';
  const statusColor = s.status==='break' ? 'var(--amber)' : 'var(--green)';
  const statusLabel = s.status==='break' ? `On Break · ${fmtMins(s.breakMins)}` : 'In Shift';
  document.getElementById('staffDetailBody').innerHTML = `
    <!-- Profile -->
    <div style="display:flex;align-items:center;gap:14px;padding:4px 0 20px">
      ${avatarHtml(s.name, 56)}
      <div style="flex:1">
        <div style="font-size:17px;font-weight:900;color:var(--text);margin-bottom:5px">${s.name}</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <span style="font-size:11px;font-weight:600;color:var(--text3);background:var(--surface2);padding:2px 8px;border-radius:6px;border:1px solid var(--border)">${s.role}</span>
          <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;background:${statusBg};color:${statusColor}">${statusLabel}</span>
        </div>
      </div>
    </div>

    <!-- Shift info -->
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:10px">SHIFT INFO</div>
      <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:12px;color:var(--text2)">Clocked In</span>
        <span style="font-size:12px;font-weight:700;color:var(--text)">${s.clockIn}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:12px;color:var(--text2)">Time on Shift</span>
        <span style="font-size:12px;font-weight:700;color:var(--text)">${fmtMins(s.clockInMins)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:5px 0">
        <span style="font-size:12px;color:var(--text2)">Break Taken</span>
        <span style="font-size:12px;font-weight:700;color:${s.breakMins>20?'var(--amber)':'var(--text)'}">${s.breakMins > 0 ? fmtMins(s.breakMins) : 'No break yet'}</span>
      </div>
    </div>

    <!-- Sales metrics -->
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:10px">SALES METRICS</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="background:var(--surface);border-radius:10px;padding:10px;text-align:center;border:1px solid var(--border)">
          <div style="font-size:20px;font-weight:900;color:var(--accent)">${s.orders}</div>
          <div style="font-size:10px;color:var(--text3);font-weight:700">ORDERS TAKEN</div>
        </div>
        <div style="background:var(--surface);border-radius:10px;padding:10px;text-align:center;border:1px solid var(--border)">
          <div style="font-size:20px;font-weight:900;color:var(--green)">$${s.sales.toFixed(0)}</div>
          <div style="font-size:10px;color:var(--text3);font-weight:700">TOTAL SALES</div>
        </div>
        <div style="background:var(--surface);border-radius:10px;padding:10px;text-align:center;border:1px solid var(--border)">
          <div style="font-size:20px;font-weight:900;color:var(--text)">$${avgOrder}</div>
          <div style="font-size:10px;color:var(--text3);font-weight:700">AVG ORDER</div>
        </div>
        <div style="background:var(--surface);border-radius:10px;padding:10px;text-align:center;border:1px solid var(--border)">
          <div style="font-size:20px;font-weight:900;color:var(--text)">${s.orders > 0 ? (s.orders / (s.clockInMins/60)).toFixed(1) : '0'}</div>
          <div style="font-size:10px;color:var(--text3);font-weight:700">ORDERS/HR</div>
        </div>
      </div>
    </div>

    <!-- Activity flags -->
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:10px">SHIFT ACTIVITY</div>
      <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:12px;color:var(--text2)">Voids</span>
        <span style="font-size:12px;font-weight:800;color:${s.voids>2?'var(--red)':'var(--text)'}">${s.voids}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:12px;color:var(--text2)">Comps</span>
        <span style="font-size:12px;font-weight:800;color:${s.comps>1?'var(--amber)':'var(--text)'}">${s.comps}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:5px 0">
        <span style="font-size:12px;color:var(--text2)">Top Item Sold</span>
        <span style="font-size:12px;font-weight:700;color:var(--text)">${s.topItem}</span>
      </div>
    </div>
  `;
  openModal('staffDetailModal');
  setTimeout(() => applyModalTheme('#staffDetailModal'), 10);
}

const healthData = {
  terminals: [
    { name:'Terminal #1 – Front Counter', status:'online', ip:'10.201.117.10', posDeviceName:'Plum POS Front', posDeviceId:'a1b2c3d4-1234-5678-abcd-ef1234567890', posApkVersion:'v4.2.1', lastSynced:'1 min ago', offlineDuration: null, errorMessage: null },
    { name:'Terminal #2 – Bar', status:'online', ip:'10.201.117.11', posDeviceName:'Plum POS Bar', posDeviceId:'b2c3d4e5-2345-6789-bcde-f01234567891', posApkVersion:'v4.2.1', lastSynced:'3 min ago', offlineDuration: null, errorMessage: null },
    { name:'Terminal #3 – Patio', status:'offline', ip:'10.201.117.12', posDeviceName:'Plum POS Patio', posDeviceId:'c3d4e5f6-3456-789a-cdef-012345678912', posApkVersion:'v4.1.9', lastSynced:'52 min ago', offlineDuration:'45 min', errorMessage:'Connection timeout — network unreachable' },
  ],
  receiptPrinters: [
    { name:'Receipt Printer 1', status:'online', ip:'10.201.117.79:9100', posDeviceName:'Plum POS Front', posDeviceId:'65419783-25c7-4a92-a6ae-ce5a322b5090', posApkVersion:'v4.2.1', lastSynced:'2 min ago', offlineDuration: null, errorMessage: null },
    { name:'Receipt Printer 2', status:'warning', ip:'10.201.117.80:9100', posDeviceName:'Plum POS Bar', posDeviceId:'72b3c891-36d8-5ba3-b7bf-df6b433c6101', posApkVersion:'v4.2.0', lastSynced:'8 min ago', offlineDuration: null, errorMessage:'Paper low — replace soon' },
  ],
  kitchenPrinters: [
    { name:'Kitchen Printer 1', status:'offline', ip:'10.201.117.71', printerType:'Kitchen Printer', printerAdapter:'Ethernet', lastSynced:'1 hr ago', offlineDuration:'58 min', errorMessage:'Failed to connect — check cable' },
    { name:'Kitchen Printer 2', status:'online', ip:'10.201.117.72', printerType:'Kitchen Printer', printerAdapter:'Ethernet', lastSynced:'1 min ago', offlineDuration: null, errorMessage: null },
  ],
  payDevices: [
    { name:'Pay Device 1', status:'online', ip:'10.201.117.75', softwareVersion:'v2.8.4', mode:'Credit/Debit', posDeviceName:'Plum POS Front', posDeviceId:'612061f8-2633-4b8d-beba-885a9d5f9d65', posVersion:'v4.2.1', lastBatched:'Today 3:00 PM', unbatchedAmount:'$2,340.50', lastSynced:'2 min ago', offlineDuration: null, errorMessages: null },
    { name:'Pay Device 2', status:'online', ip:'10.201.117.76', softwareVersion:'v2.8.4', mode:'Credit/Debit', posDeviceName:'Plum POS Bar', posDeviceId:'723172g9-3744-5c9e-cbcb-996b0e6g0e76', posVersion:'v4.2.1', lastBatched:'Today 3:00 PM', unbatchedAmount:'$890.00', lastSynced:'4 min ago', offlineDuration: null, errorMessages: null },
    { name:'Pay Device 3', status:'online', ip:'10.201.117.77', softwareVersion:'v2.8.4', mode:'Credit/Debit', posDeviceName:'Plum POS Patio', posDeviceId:'834283h0-4855-6d0f-dcdc-007c1f7h1f87', posVersion:'v4.1.9', lastBatched:'Today 12:00 PM', unbatchedAmount:'$0.00', lastSynced:'55 min ago', offlineDuration: null, errorMessages: null },
  ],
  giftLoyalty: [
    { name:'Sparkfly', status:'online', lastSynced:'05/15/25 04:00 AM', lastTransaction:'3 min ago', offlineDuration: null, errorMessages: null, stat:'47 check-ins today' },
    { name:'Givex', status:'offline', lastSynced:'05/15/25 04:00 AM', lastTransaction:'05/15/25 04:00 AM', offlineDuration:'2 Hrs 30 mins', errorMessages:[{ time:'05/15/25 04:00 AM', msg:'Failed to Connect' }], stat:'3 gift card redemptions' },
  ],
};

function getWorstStatus(items) {
  if (items.some(i => i.status === 'offline')) return 'red';
  if (items.some(i => i.status === 'warning')) return 'amber';
  return 'green';
}

function statusPill(s) {
  const label = s === 'online' ? 'Online' : s === 'warning' ? 'Warning' : 'Offline';
  return `<span class="health-status-pill ${s === 'online' ? 'online' : s === 'warning' ? 'warning' : 'offline'}">${label}</span>`;
}

function buildHealthPage() {
  const allItems = [...healthData.terminals, ...healthData.receiptPrinters, ...healthData.kitchenPrinters, ...healthData.payDevices, ...healthData.giftLoyalty];
  const issueCount = allItems.filter(i => i.status !== 'online').length;

  // Update dashboard card dots & labels
  const tStatus = getWorstStatus(healthData.terminals);
  const pStatus = getWorstStatus([...healthData.receiptPrinters, ...healthData.kitchenPrinters]);
  const payStatus = getWorstStatus(healthData.payDevices);
  const loyStatus = getWorstStatus(healthData.giftLoyalty);

  const setDot = (id, s) => { const el = document.getElementById(id); if(el){ el.className='health-dot '+s; } };
  setDot('hdot-terminals', tStatus);
  setDot('hdot-printers', pStatus);
  setDot('hdot-payments', payStatus);
  setDot('hdot-loyalty', loyStatus);

  const setLabel = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; };
  const onlineCount = (arr) => arr.filter(i=>i.status==='online').length + '/' + arr.length + ' Online';
  setLabel('hlabel-terminals', tStatus==='green' ? 'All Online' : healthData.terminals.find(i=>i.status!=='online')?.name.split('–')[0].trim() + ' Offline');
  setLabel('hlabel-printers', pStatus==='green' ? 'All Ready' : pStatus==='amber' ? 'Paper Low' : '1 Offline');
  setLabel('hlabel-payments', payStatus==='green' ? 'All Ready' : '1 Issue');
  setLabel('hlabel-loyalty', loyStatus==='green' ? 'Active' : '1 Offline');

  const overallStatus = issueCount > 0 ? 'red' : 'green';
  const badgeText = issueCount > 0 ? issueCount + ' Issue' + (issueCount>1?'s':'') : 'All Healthy';
  ['healthOverallBadge','healthPageBadge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = badgeText; el.className = 'health-section-badge ' + overallStatus; }
  });

  // Build health page body
  const deviceRow = (item, type, idx) => {
    const sub = item.lastSynced ? 'Last sync: ' + item.lastSynced : '';
    const errLine = item.errorMessage || (item.errorMessages && item.errorMessages[0]?.msg) || '';
    return `<div class="health-device-row" onclick="openHealthDetail('${type}',${idx})">
      <div style="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${item.status==='online'?'var(--green)':item.status==='warning'?'var(--amber)':'var(--red)'}"></div>
      <div style="flex:1;min-width:0">
        <div class="health-device-name">${item.name}</div>
        <div class="health-device-meta">${errLine || sub}</div>
      </div>
      <div class="health-device-right">
        ${statusPill(item.status)}
        ${item.offlineDuration ? `<div class="health-device-sub">${item.offlineDuration}</div>` : (item.lastSynced && !errLine ? `<div class="health-device-sub">${item.lastSynced}</div>` : '')}
      </div>
    </div>`;
  };

  const section = (icon, title, items, type, badgeClass, badgeText) => `
    <div class="health-section">
      <div class="health-section-header">
        <div class="health-section-title">${icon} ${title}</div>
        <span class="health-section-badge ${badgeClass}">${badgeText}</span>
      </div>
      <div class="card" style="padding:0;overflow:hidden">
        ${items.map((item, idx) => deviceRow(item, type, idx)).join('')}
      </div>
    </div>`;

  const tBadge = tStatus === 'green' ? 'green' : 'red';
  const tBadgeText = tStatus === 'green' ? 'All Online' : healthData.terminals.filter(i=>i.status!=='online').length + ' Offline';
  const printers = [...healthData.receiptPrinters, ...healthData.kitchenPrinters];
  const pBadge = pStatus === 'green' ? 'green' : pStatus === 'amber' ? 'amber' : 'red';
  const pBadgeText = pStatus === 'green' ? 'All Ready' : pStatus === 'amber' ? 'Paper Low' : printers.filter(i=>i.status==='offline').length + ' Offline';
  const payBadge = payStatus === 'green' ? 'green' : 'red';
  const loyBadge = loyStatus === 'green' ? 'green' : 'red';

  document.getElementById('healthPageBody').innerHTML =
    section('🖥', 'POS Terminals', healthData.terminals, 'terminals', tBadge, tBadgeText) +
    section('🖨', 'Receipt Printers', healthData.receiptPrinters, 'receiptPrinters', pBadge, pBadgeText) +
    section('🍳', 'Kitchen Printers', healthData.kitchenPrinters, 'kitchenPrinters', pBadge, pBadgeText) +
    section('💳', 'Pay Devices', healthData.payDevices, 'payDevices', payBadge, payStatus==='green'?'All Ready':'Issue') +
    section('🎁', 'Gift & Loyalty', healthData.giftLoyalty, 'giftLoyalty', loyBadge, loyStatus==='green'?'Active':'1 Offline');
}

function openHealthPage(filter) {
  buildHealthPage();
  // Apply filter — show only the relevant section(s)
  const titles = {
    terminals:  '🖥 POS Terminals',
    printers:   '🖨 Printers',
    payments:   '💳 Pay Devices',
    loyalty:    '🎁 Gift & Loyalty',
  };
  const filterMap = {
    terminals: ['terminals'],
    printers:  ['receiptPrinters', 'kitchenPrinters'],
    payments:  ['payDevices'],
    loyalty:   ['giftLoyalty'],
  };
  const body = document.getElementById('healthPageBody');
  if (filter && filterMap[filter]) {
    // Hide sections not in filter by re-rendering only matching sections
    const keep = filterMap[filter];
    body.querySelectorAll('.health-section').forEach(sec => {
      // Each section has a data-type set via class — use title text to match
      const titleEl = sec.querySelector('.health-section-title');
      const matches = keep.some(k => {
        const map = { terminals:'POS Terminals', receiptPrinters:'Receipt Printers', kitchenPrinters:'Kitchen Printers', payDevices:'Pay Devices', giftLoyalty:'Gift & Loyalty' };
        return titleEl && titleEl.textContent.includes(map[k]);
      });
      sec.style.display = matches ? '' : 'none';
    });
    // Badge: count issues only in filtered category
    const filteredItems = filterMap[filter].flatMap(k => healthData[k]);
    const filteredIssues = filteredItems.filter(i => i.status !== 'online').length;
    const pageBadge = document.getElementById('healthPageBadge');
    if (filteredIssues === 0) {
      pageBadge.textContent = 'All Healthy'; pageBadge.className = 'health-section-badge green';
    } else {
      pageBadge.textContent = filteredIssues + ' Issue' + (filteredIssues > 1 ? 's' : '');
      pageBadge.className = 'health-section-badge red';
    }
    document.getElementById('healthPage').querySelector('.health-page-title').textContent = titles[filter];
  } else {
    body.querySelectorAll('.health-section').forEach(sec => sec.style.display = '');
    document.getElementById('healthPage').querySelector('.health-page-title').textContent = 'Store Health';
  }
  document.getElementById('healthPage').classList.add('open');
}
function closeHealthPage() {
  document.getElementById('healthPage').classList.remove('open');
}

function openHealthDetail(type, idx) {
  const item = healthData[type][idx];
  document.getElementById('healthDetailTitle').textContent = item.name;

  const row = (key, val, cls='') => val != null && val !== ''
    ? `<div class="health-field-row"><span class="health-field-key">${key}</span><span class="health-field-val ${cls}">${val}</span></div>` : '';

  let html = row('Status', item.status==='online'?'Online':item.status==='warning'?'Warning':'Offline', item.status==='online'?'green':item.status==='warning'?'amber':'red');

  if (item.ip)             html += row('IP Address', item.ip);
  if (item.posDeviceName)  html += row('Connected POS Device Name', item.posDeviceName);
  if (item.posDeviceId)    html += row('Connected POS Device ID', item.posDeviceId);
  if (item.posApkVersion)  html += row('POS APK Version', item.posApkVersion);
  if (item.softwareVersion)html += row('Software Version', item.softwareVersion);
  if (item.mode)           html += row('Pay Device Mode', item.mode);
  if (item.posVersion)     html += row('POS Version', item.posVersion);
  if (item.printerType)    html += row('Printer Type', item.printerType);
  if (item.printerAdapter) html += row('Printer Adapter', item.printerAdapter);
  if (item.lastBatched)    html += row('Last Batched At', item.lastBatched);
  if (item.unbatchedAmount)html += row('Unbatched Amount', item.unbatchedAmount);
  if (item.lastSynced)     html += row('Last Synced At', item.lastSynced);
  if (item.lastTransaction)html += row('Last Transaction At', item.lastTransaction);
  if (item.stat)           html += row('Today', item.stat);
  if (item.offlineDuration)html += row('Offline Duration', item.offlineDuration, 'amber');
  if (item.errorMessage)   html += row('Error Message', item.errorMessage, 'red');
  if (item.errorMessages)  item.errorMessages.forEach(e => { html += row(e.time, e.msg, 'red'); });

  document.getElementById('healthDetailBody').innerHTML = html;
  document.getElementById('healthDetailOverlay').classList.add('open');
}

function closeHealthDetail(e, force) {
  if (force || (e && e.target === document.getElementById('healthDetailOverlay'))) {
    document.getElementById('healthDetailOverlay').classList.remove('open');
  }
}

// ─────────────── CONFIRM HELPERS ───────────────
function confirmPlatformToggle(cb, platform) {
  const enabling = cb.checked;
  showConfirm({
    icon: enabling ? '✅' : '⛔',
    title: enabling ? `Enable ${platform}?` : `Disable ${platform}?`,
    desc: enabling
      ? `${platform} will start receiving orders immediately.`
      : `${platform} orders will stop. Customers on this platform won't be able to order.`,
    okLabel: enabling ? 'Yes, Enable' : 'Yes, Disable',
    danger: !enabling,
    onConfirm: () => showSuccess(
      `${platform} ${enabling ? 'Enabled' : 'Disabled'}`,
      `Platform availability updated successfully.`
    ),
    onCancel: () => { cb.checked = !enabling; }
  });
}

function confirmHolidayToggle(cb) {
  const enabling = cb.checked;
  showConfirm({
    icon: enabling ? '🏖️' : '🔓',
    title: enabling ? 'Close Store for Holiday?' : 'Remove Holiday Override?',
    desc: enabling
      ? 'All ordering will be disabled across every channel until you remove this override.'
      : 'The holiday override will be lifted and normal store hours will resume.',
    okLabel: enabling ? 'Yes, Close Store' : 'Yes, Remove Override',
    danger: enabling,
    onConfirm: () => showSuccess(
      enabling ? 'Holiday Override Active' : 'Holiday Override Removed',
      enabling ? 'Store is now closed to all orders.' : 'Normal hours have resumed.'
    ),
    onCancel: () => { cb.checked = !enabling; }
  });
}

function confirmDayToggle(cb, day) {
  const enabling = cb.checked;
  showConfirm({
    icon: enabling ? '🟢' : '🔴',
    title: enabling ? `Open on ${day}?` : `Close on ${day}?`,
    desc: enabling
      ? `${day} will be marked as open. Remember to save store settings to apply.`
      : `${day} will be marked as closed. No orders will be accepted on this day.`,
    okLabel: enabling ? 'Yes, Mark Open' : 'Yes, Mark Closed',
    danger: !enabling,
    onConfirm: () => showSuccess(
      enabling ? `${day} marked open` : `${day} marked closed`,
      'Remember to save store settings to apply changes.'
    ),
    onCancel: () => { cb.checked = !enabling; }
  });
}


// ═══════════════════════════════════════════
// DEVICES MODULE
// ═══════════════════════════════════════════
const deviceTypes = [
  { id:'pos',      label:'POS Terminal', icon:'🖥', color:'#7c3aed' },
  { id:'handheld', label:'Handheld',     icon:'📱', color:'#3b82f6' },
  { id:'kiosk',    label:'Kiosk',        icon:'💻', color:'#22c55e' },
];
// All device types including non-brandable ones (for display only)
const allDeviceTypes = [
  { id:'pos',      label:'POS Terminal',    icon:'🖥', color:'#7c3aed' },
  { id:'handheld', label:'Handheld',        icon:'📱', color:'#3b82f6' },
  { id:'kiosk',    label:'Kiosk',           icon:'💻', color:'#22c55e' },
  { id:'signage',  label:'Digital Signage', icon:'📺', color:'#f59e0b' },
  { id:'kds',      label:'KDS',             icon:'🍳', color:'#22c55e' },
  { id:'tunes',    label:'Plum Tunes',      icon:'🎵', color:'#ef4444' },
];
const devicesData = [
  { id:1, name:'Front Counter POS', type:'pos',      status:'online',   tier:'Primary',   deviceId:'POS-FC-001-A2B3',   location:'Front Counter', classification:'POS',      ipAddress:'192.168.1.10', defaultTerminal:'Terminal 1' },
  { id:2, name:'Bar POS',           type:'pos',      status:'offline',  tier:'Secondary', deviceId:'POS-BAR-002-C4D5',  location:'Bar Station',   classification:'POS',      ipAddress:'192.168.1.11', defaultTerminal:'Terminal 2' },
  { id:3, name:'Server Handheld 1', type:'handheld', status:'online',   tier:'Secondary', deviceId:'HH-S1-001-E6F7',    location:'Main Floor',    classification:'Handheld', ipAddress:'192.168.1.20', defaultTerminal:'Terminal 1' },
  { id:4, name:'Server Handheld 2', type:'handheld', status:'inactive', tier:'Tertiary',  deviceId:'HH-S2-002-G8H9',    location:'Patio',         classification:'Handheld', ipAddress:'192.168.1.21', defaultTerminal:'Terminal 1' },
  { id:5, name:'Drive-Thru Kiosk',  type:'kiosk',   status:'online',   tier:'Primary',   deviceId:'KIOSK-DT-001-I0J1', location:'Drive-Thru',    classification:'Kiosk',    ipAddress:'192.168.1.30', defaultTerminal:'Terminal 1' },
  { id:6, name:'Lobby Kiosk',       type:'kiosk',   status:'inactive', tier:'Demo',      deviceId:'KIOSK-LB-002-K2L3', location:'Lobby',         classification:'Kiosk',    ipAddress:'192.168.1.31', defaultTerminal:'Terminal 2' },
];
// Tier badge styling (Primary / Secondary / Tertiary / Demo)
function deviceTierStyle(tier) {
  switch (tier) {
    case 'Primary':   return { color:'var(--accent)', bg:'rgba(124,58,237,.12)' };
    case 'Secondary': return { color:'var(--blue)',   bg:'rgba(59,130,246,.12)' };
    case 'Tertiary':  return { color:'var(--amber)',  bg:'rgba(245,158,11,.12)' };
    case 'Demo':      return { color:'var(--text3)',  bg:'var(--surface3)' };
    default:          return { color:'var(--text3)',  bg:'var(--surface3)' };
  }
}
let deviceFilter = 'all';
let deviceTypeFilter = 'all';

function renderDevicesPage() {
  updateDeviceStats();
  renderDeviceTypeChips();
  renderDeviceList();
}
function updateDeviceStats() {
  document.getElementById('devCount-all').textContent      = devicesData.length;
  document.getElementById('devCount-online').textContent   = devicesData.filter(function(d){return d.status==='online';}).length;
  document.getElementById('devCount-offline').textContent  = devicesData.filter(function(d){return d.status==='offline';}).length;
  document.getElementById('devCount-inactive').textContent = devicesData.filter(function(d){return d.status==='inactive';}).length;
}
function setDeviceFilter(f) {
  deviceFilter = f;
  ['all','online','offline','inactive'].forEach(function(k) {
    var el = document.getElementById('devStat-'+k);
    if (!el) return;
    var numEl = el.querySelector('div');
    var lblEl = el.querySelectorAll('div')[1];
    if (k === f) {
      el.style.background = 'var(--accent)';
      if (numEl) numEl.style.color = '#fff';
      if (lblEl) lblEl.style.color = 'rgba(255,255,255,.8)';
    } else {
      el.style.background = 'var(--surface)';
      el.style.border = '1px solid var(--border)';
      if (numEl) numEl.style.color = k==='online'?'var(--green)':k==='offline'?'var(--red)':'var(--text2)';
      if (lblEl) lblEl.style.color = 'var(--text3)';
    }
  });
  renderDeviceList();
}
function setDeviceTypeFilter(t) {
  deviceTypeFilter = t;
  renderDeviceTypeChips();
  renderDeviceList();
}
function renderDeviceTypeChips() {
  var all = deviceTypeFilter === "all";
  var html = "<div onclick=\"setDeviceTypeFilter('all')\" style=\"flex-shrink:0;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:700;cursor:pointer;border:1.5px solid " + (all ? "var(--accent)" : "var(--border)") + ";background:" + (all ? "var(--accent)" : "var(--surface)") + ";color:" + (all ? "#fff" : "var(--text2)") + "\">All</div>";
  deviceTypes.forEach(function(t) {
    var a = deviceTypeFilter === t.id;
    html += "<div onclick=\"setDeviceTypeFilter('" + t.id + "')\" style=\"flex-shrink:0;display:flex;align-items:center;gap:4px;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:700;cursor:pointer;border:1.5px solid " + (a ? "var(--accent)" : "var(--border)") + ";background:" + (a ? "var(--accent)" : "var(--surface)") + ";color:" + (a ? "#fff" : "var(--text2)") + "\"><span>" + t.icon + "</span>" + t.label + "</div>";
  });
  document.getElementById("deviceTypeChips").innerHTML = html;
}
var deviceSyncMap = {1:'1 min ago',2:'Offline · 12 min',3:'2 min ago',4:'Inactive',5:'3 min ago',6:'Inactive'};
function renderDeviceList() {
  var list = devicesData.filter(function(d) {
    return (deviceFilter === "all" || d.status === deviceFilter) && (deviceTypeFilter === "all" || d.type === deviceTypeFilter);
  });
  if (!list.length) { document.getElementById("devicesList").innerHTML = "<div style=\"text-align:center;padding:48px 16px;color:var(--text3);font-size:13px\">No devices found</div>"; return; }
  var html = "";
  list.forEach(function(d) {
    var t = allDeviceTypes.find(function(x) { return x.id === d.type; }) || allDeviceTypes[0];
    var sc = d.status === "online" ? "var(--green)" : d.status === "offline" ? "var(--red)" : "var(--text3)";
    var sb = d.status === "online" ? "rgba(34,197,94,.12)" : d.status === "offline" ? "rgba(239,68,68,.1)" : "var(--surface3)";
    var sl = d.status.charAt(0).toUpperCase() + d.status.slice(1);
    var syncStr = d.lastSynced || deviceSyncMap[d.id] || "—";
    var isOffline = d.status === "offline";
    var borderCol = d.status === "online" ? "var(--green)" : d.status === "offline" ? "var(--red)" : "var(--border)";
    var ts = deviceTierStyle(d.tier);
    var tierBadge = d.tier ? "<span style=\"flex-shrink:0;font-size:9px;font-weight:800;padding:2px 7px;border-radius:6px;background:" + ts.bg + ";color:" + ts.color + ";letter-spacing:.02em;text-transform:uppercase\">" + d.tier + "</span>" : "";
    html += "<div onclick=\"openDeviceDetail(" + d.id + ")\" style=\"background:var(--surface);border:1px solid var(--border);border-left:3px solid " + borderCol + ";border-radius:14px;padding:14px;margin-bottom:10px;cursor:pointer\">"
      + "<div style=\"display:flex;align-items:center;justify-content:space-between;margin-bottom:8px\">"
      + "<div style=\"display:flex;align-items:center;gap:10px\">"
      + "<div style=\"width:36px;height:36px;border-radius:10px;background:" + t.color + "22;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0\">" + t.icon + "</div>"
      + "<div><div style=\"display:flex;align-items:center;gap:7px\"><span style=\"font-size:13px;font-weight:800;color:var(--text)\">" + d.name + "</span>" + tierBadge + "</div>"
      + "<div style=\"font-size:10px;color:var(--text3);margin-top:1px\">" + t.label + " · " + d.location + "</div></div>"
      + "</div>"
      + "<span style=\"flex-shrink:0;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:" + sb + ";color:" + sc + "\">&#x25CF; " + sl + "</span>"
      + "</div>"
      + (isOffline ? "<div style=\"display:flex;align-items:center;gap:6px;padding:7px 10px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:9px;margin-bottom:8px\"><span style=\"font-size:12px\">⚠️</span><span style=\"font-size:11px;font-weight:700;color:var(--red)\">Connection lost — check network or reboot</span></div>" : "")
      + "<div style=\"display:flex;align-items:center;justify-content:space-between;padding-top:8px;border-top:1px solid var(--border)\">"
      + "<span style=\"font-size:10px;color:var(--text3);font-family:monospace\">ID: " + d.deviceId.slice(0,14) + "…</span>"
      + "<span style=\"font-size:10px;color:var(--text3);font-family:monospace\">🌐 " + (d.ipAddress || "—") + "</span>"
      + "<span style=\"font-size:10px;color:" + (isOffline ? "var(--red)" : "var(--text3)") + "\">🕐 " + syncStr + " ›</span>"
      + "</div>"
      + (d.virtualDevice ? "<div style=\"font-size:10px;color:var(--text3);margin-top:5px\">Virtual Device: <span style=\"color:var(--text2);font-weight:600\">" + d.virtualDevice + "</span></div>" : "")
      + "</div>";
  });
  document.getElementById("devicesList").innerHTML = html;
}
function openDeviceDetail(id) {
  var d = devicesData.find(function(x) { return x.id === id; });
  if (!d) return;
  var t = allDeviceTypes.find(function(x) { return x.id === d.type; }) || allDeviceTypes[0];
  var sc = d.status === "online" ? "var(--green)" : d.status === "offline" ? "var(--red)" : "var(--text3)";
  var sb = d.status === "online" ? "rgba(34,197,94,.12)" : d.status === "offline" ? "rgba(239,68,68,.1)" : "var(--surface3)";
  // Pay Device & Receipt Printer mock data keyed by device id
  var payData = {
    1: { driver: "PAX S920", ip: "192.168.1.110", serial: "PAX-0011-A1B2C3" },
    2: { driver: "Verifone P400", ip: "192.168.1.111", serial: "VFN-0022-D4E5F6" },
    3: { driver: "Square Terminal", ip: "192.168.1.112", serial: "SQR-0033-G7H8I9" },
    4: { driver: "PAX A920", ip: "192.168.1.113", serial: "PAX-0044-J0K1L2" },
    5: { driver: "Clover Flex", ip: "192.168.1.114", serial: "CLV-0055-M3N4O5" },
    6: { driver: "Ingenico Move/5000", ip: "192.168.1.115", serial: "ING-0066-P6Q7R8" }
  };
  var rcptData = {
    1: { type: "Network", ip: "192.168.1.210", printOnline: true },
    2: { type: "USB", ip: "", printOnline: false },
    3: { type: "Network", ip: "192.168.1.211", printOnline: true },
    4: { type: "USB", ip: "", printOnline: false },
    5: { type: "Network", ip: "192.168.1.212", printOnline: true },
    6: { type: "USB", ip: "", printOnline: false }
  };
  var pay = payData[id] || { driver: "\u2014", ip: "\u2014", serial: "\u2014" };
  var rcpt = rcptData[id] || { type: "USB", ip: "", printOnline: false };

  function frow(label, val, last) {
    return "<div style=\"display:flex;justify-content:space-between;align-items:center;padding:7px 0;" + (last ? "" : "border-bottom:1px solid var(--border);") + "font-size:12px\"><span style=\"color:var(--text3)\">" + label + "</span><span style=\"color:var(--text);font-weight:600;text-align:right;max-width:62%;word-break:break-all\">" + val + "</span></div>";
  }
  function sHead(title) {
    return "<div style=\"font-size:10px;font-weight:800;color:var(--text3);letter-spacing:.5px;margin-bottom:10px;text-transform:uppercase\">" + title + "</div>";
  }
  function card(inner) {
    return "<div style=\"background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:12px\">" + inner + "</div>";
  }

  var statusBadge = "<span style=\"font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:" + sb + ";color:" + sc + "\">&#x25CF; " + d.status.charAt(0).toUpperCase() + d.status.slice(1) + "</span>";

  var deviceInfoSection = card(
    sHead("Device Info")
    + frow("Name", d.name)
    + frow("Device Classification", d.classification || t.label)
    + frow("Device Type", d.tier ? "<span style=\"font-family:inherit;font-weight:700;color:" + deviceTierStyle(d.tier).color + "\">" + d.tier + "</span>" : "\u2014")
    + frow("IP Address", d.ipAddress || "\u2014")
    + frow("Default Terminal", d.defaultTerminal || "\u2014")
    + frow("Device ID", "<span style=\"font-family:monospace;font-size:10px\">" + d.deviceId + "</span>")
    + frow("Status", statusBadge, true)
  );

  var paySection = card(
    sHead("Pay Device Setup")
    + frow("Driver", pay.driver)
    + frow("IP Address", pay.ip)
    + frow("Serial No.", pay.serial, true)
  );

  var rcptSection = card(
    sHead("Receipt Printer")
    + frow("Receipt Printer Type", rcpt.type)
    + (rcpt.type === "Network" ? frow("IP Address", rcpt.ip) : "")
    + frow("Print Online Order Receipts", rcpt.printOnline ? "Yes" : "No", true)
  );

  document.getElementById("devDetailTitle").textContent = d.name;
  document.getElementById("devDetailBody").innerHTML =
    // Hero section
    "<div style=\"display:flex;align-items:center;gap:14px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:16px\">"
    + "<div style=\"width:56px;height:56px;border-radius:16px;background:" + t.color + "22;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0\">" + t.icon + "</div>"
    + "<div style=\"flex:1;min-width:0\">"
    + "<div style=\"font-size:16px;font-weight:800;color:var(--text);margin-bottom:2px\">" + d.name + "</div>"
    + "<div style=\"font-size:12px;color:var(--text3);margin-bottom:6px\">" + t.label + " &bull; " + d.location + "</div>"
    + "<div style=\"display:flex;align-items:center;gap:6px;flex-wrap:wrap\">" + statusBadge
    + (d.tier ? "<span style=\"font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:" + deviceTierStyle(d.tier).bg + ";color:" + deviceTierStyle(d.tier).color + "\">" + d.tier + "</span>" : "")
    + "</div>"
    + "</div></div>"
    + deviceInfoSection
    + paySection
    + rcptSection

  var el = document.getElementById("deviceDetailOverlay");
  el.style.display = "flex";
  el.style.flexDirection = "column";
}
function closeDeviceDetail() { document.getElementById('deviceDetailOverlay').style.display='none'; }
function deviceAction(action, id) {
  var d = devicesData.find(function(x){return x.id===id;});
  if (!d) return;
  if (action==='restart') { closeDeviceDetail(); showToast('🔄', d.name+' — Restart signal sent'); }
  else if (action==='rename') {
    var n = prompt('Enter new name:');
    if (n&&n.trim()) { d.name=n.trim(); closeDeviceDetail(); renderDeviceList(); showToast('✅','Device renamed to "'+d.name+'"'); }
  } else if (action==='deactivate') {
    if (confirm('Deactivate '+d.name+'?')) { d.status='inactive'; closeDeviceDetail(); renderDevicesPage(); showToast('⛔',d.name+' deactivated'); }
  }
}
function openAddDeviceSheet() {
  var html = "<div style=\"margin-bottom:18px\"><div style=\"font-size:11px;font-weight:800;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px\">Select Device Type</div>"
    + "<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px\">";
  deviceTypes.forEach(function(t) {
    html += "<div onclick=\"selectAddDeviceType('" + t.id + "')\" id=\"addtype-" + t.id + "\" style=\"border:1.5px solid var(--border);border-radius:12px;padding:14px 10px;text-align:center;cursor:pointer;transition:all .15s\">"
      + "<div style=\"font-size:26px;margin-bottom:5px\">" + t.icon + "</div>"
      + "<div style=\"font-size:11px;font-weight:700;color:var(--text2)\">" + t.label + "</div></div>";
  });
  html += "</div></div><div id=\"addDeviceForm\"></div>";
  document.getElementById("addDeviceBody").innerHTML = html;
  document.getElementById("addDeviceOverlay").style.display = "flex";
}

function selectAddDeviceType(typeId) {
  var t = deviceTypes.find(function(x) { return x.id === typeId; }) || deviceTypes[0];
  deviceTypes.forEach(function(x) {
    var el = document.getElementById("addtype-" + x.id);
    if (!el) return;
    el.style.borderColor = x.id === typeId ? "var(--accent)" : "var(--border)";
    el.style.background  = x.id === typeId ? "rgba(124,58,237,.07)" : "transparent";
  });
  var icons = { pos:"🖥", kiosk:"📲", signage:"📺", kds:"🍳", tunes:"🎵" };
  var form = "<div style=\"background:var(--surface2);border:1px solid var(--border);border-radius:14px;padding:18px;margin-bottom:16px;text-align:center\">"
    + "<div style=\"font-size:52px;margin-bottom:8px\">" + (icons[typeId] || "📟") + "</div>"
    + "<div style=\"font-size:12px;color:var(--text2);line-height:1.6\">Power on your <b>" + t.label + "</b>.<br>An activation code will appear on screen.</div>"
    + "</div>"
    + "<div class=\"field-group\"><div class=\"field-label\">Device Name</div>"
    + "<input class=\"field-input\" id=\"newDeviceName\" type=\"text\" placeholder=\"e.g. Front Counter " + t.label + "\"></div>"
    + "<div class=\"field-group\"><div class=\"field-label\">Activation Code</div>"
    + "<input class=\"field-input\" id=\"newDeviceCode\" type=\"text\" placeholder=\"e.g. C9CB5\" maxlength=\"6\" style=\"text-transform:uppercase;letter-spacing:3px;font-size:16px;font-weight:800;text-align:center\" oninput=\"this.value=this.value.toUpperCase();var c=document.getElementById('codeCounter');if(c)c.textContent=this.value.length+'/5'\">"
    + "<div style=\"font-size:10px;color:var(--text3);margin-top:4px;text-align:right\" id=\"codeCounter\">0/5</div></div>"
    + "<div class=\"field-group\"><div class=\"field-label\">Location</div>"
    + "<select class=\"field-select\" id=\"newDeviceLocation\"><option value=\"\">Select location</option>"
    + "<option>Front Counter</option><option>Bar Station</option><option>Drive-Thru</option><option>Lobby</option><option>Main Kitchen</option><option>Prep Station</option><option>Dining Room</option><option>Patio</option>"
    + "</select></div>"
    + (typeId === "signage" ? "<div class=\"field-group\"><div class=\"field-label\">Virtual Device</div><select class=\"field-select\" id=\"newVirtualDevice\"><option value=\"\">Select virtual device</option><option>Festival offers</option><option>Lunch</option><option>Breakfast</option><option>CostaMesa-MenuBoard</option><option>Happy Hour</option></select></div>" : "")
    + "<button onclick=\"activateNewDevice('" + typeId + "')\" style=\"width:100%;padding:14px;border-radius:12px;border:none;background:var(--accent);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit;margin-top:4px\">Activate Device</button>";
  document.getElementById("addDeviceForm").innerHTML = form;
}
function activateNewDevice(typeId) {
  var name  = (document.getElementById('newDeviceName')||{}).value||'';
  var code  = (document.getElementById('newDeviceCode')||{}).value||'';
  var loc   = (document.getElementById('newDeviceLocation')||{}).value||'';
  var vd    = typeId==='signage'?((document.getElementById('newVirtualDevice')||{}).value||''):null;
  if (!name.trim())  { showToast('⚠️','Enter a device name'); return; }
  if (code.length<4) { showToast('⚠️','Enter a valid activation code'); return; }
  if (!loc)          { showToast('⚠️','Select a location'); return; }
  var newDev = { id:devicesData.length+1, name:name.trim(), type:typeId, status:'online', tier:'Primary', deviceId:typeId.toUpperCase()+'-'+Math.random().toString(36).slice(2,8).toUpperCase(), location:loc };
  if (vd) newDev.virtualDevice = vd;
  devicesData.push(newDev);
  closeAddDeviceSheet();
  renderDevicesPage();
  showToast('✅','"'+newDev.name+'" activated successfully!');
}
function closeAddDeviceSheet() { document.getElementById('addDeviceOverlay').style.display='none'; }

const illustrationMap = { pos:"🖥", handheld:"📱", kiosk:"⬜" };

function openAddDevicePage() {
  // Reset form
  ["adDeviceName","adIPAddress","adActivationCode"].forEach(function(id){
    var el = document.getElementById(id); if(el) el.value = "";
  });
  ["adClassification","adDefaultTerminal"].forEach(function(id){
    var el = document.getElementById(id); if(el) el.selectedIndex = 0;
  });
  var cc = document.getElementById("adCodeCount"); if(cc) cc.textContent = "0/6";
  document.getElementById("addDevicePage").style.display = "flex";
}

function closeAddDevicePage() {
  document.getElementById("addDevicePage").style.display = "none";
}

function updateAddDeviceIllustration() {
  var cls = document.getElementById("adClassification").value;
  var icon = illustrationMap[cls] || "🖥";
  var titleMap = { pos:"POS Terminal", handheld:"Handheld Device", kiosk:"Kiosk" };
  var el = document.querySelector("#addDevicePage .field-group:first-of-type");
  // update illustration emoji
  var illus = document.querySelector("#addDevicePage [style*='font-size:64px']");
  if(illus) illus.textContent = icon;
  var subtitle = document.querySelector("#addDevicePage [style*='font-size:13px;font-weight:700;color:var(--text)']");
  if(subtitle && cls) subtitle.textContent = "Add your " + (titleMap[cls]||"Device");
}

function generateActivationCode() {
  var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  var code = "";
  for(var i=0;i<6;i++) code += chars.charAt(Math.floor(Math.random()*chars.length));
  return code;
}

function simulateScanCode() {
  var overlay = document.getElementById("scannerOverlay");
  var codeEl = document.getElementById("scannerDetectedCode");
  var statusEl = document.getElementById("scannerStatus");
  if(!overlay) {
    var fallbackCode = generateActivationCode();
    var fallbackInp = document.getElementById("adActivationCode");
    if(fallbackInp) { fallbackInp.value = fallbackCode; }
    var fallbackCount = document.getElementById("adCodeCount"); if(fallbackCount) fallbackCount.textContent = fallbackCode.length + "/6";
    showToast("📷", "Code scanned: " + fallbackCode);
    return;
  }
  var code = generateActivationCode();
  overlay.style.display = "flex";
  if(codeEl) codeEl.textContent = "— — — — — —";
  if(statusEl) statusEl.textContent = "Align the activation code inside the frame";

  clearTimeout(window.__scannerRevealTimer);
  clearTimeout(window.__scannerFillTimer);

  window.__scannerRevealTimer = setTimeout(function(){
    if(codeEl) codeEl.textContent = code.split("").join(" ");
    if(statusEl) statusEl.textContent = "Activation code detected";
  }, 1400);

  window.__scannerFillTimer = setTimeout(function(){
    var inp = document.getElementById("adActivationCode");
    if(inp) { inp.value = code; }
    var cc = document.getElementById("adCodeCount"); if(cc) cc.textContent = code.length + "/6";
    closeScannerOverlay();
    showToast("📷", "Code scanned: " + code);
  }, 2200);
}

function closeScannerOverlay() {
  var overlay = document.getElementById("scannerOverlay");
  if(overlay) overlay.style.display = "none";
  clearTimeout(window.__scannerRevealTimer);
  clearTimeout(window.__scannerFillTimer);
}

function submitAddDevice() {
  var name   = (document.getElementById("adDeviceName")||{}).value||"";
  var cls    = (document.getElementById("adClassification")||{}).value||"";
  var ip     = (document.getElementById("adIPAddress")||{}).value||"";
  var code   = (document.getElementById("adActivationCode")||{}).value||"";
  var term   = (document.getElementById("adDefaultTerminal")||{}).value||"";

  if(!name.trim())  { showToast("⚠️","Enter a device name"); return; }
  if(!cls)          { showToast("⚠️","Select a device classification"); return; }
  if(!ip.trim())    { showToast("⚠️","Enter the IP address"); return; }
  if(code.length<4) { showToast("⚠️","Enter a valid activation code"); return; }
  if(!term)         { showToast("⚠️","Select a default terminal"); return; }

  var typeMap = { pos:"pos", handheld:"handheld", kiosk:"kiosk" };
  var newDev = {
    id: devicesData.length + 1,
    name: name.trim(),
    type: typeMap[cls],
    status: "online",
    tier: "Primary",
    deviceId: cls.toUpperCase() + "-" + Math.random().toString(36).slice(2,8).toUpperCase(),
    location: "—",
    classification: cls.charAt(0).toUpperCase() + cls.slice(1),
    ipAddress: ip.trim(),
    defaultTerminal: term
  };
  devicesData.push(newDev);
  closeAddDevicePage();
  renderDevicesPage();
  showToast("✅", '"' + newDev.name + '" activated successfully!');
}




// ─── SUPPORT / CALL SCREEN FUNCTIONS ───
function updateDrawerClock() {
  const el = document.getElementById('drawerClock');
  if (!el) return;
  const now = new Date();
  const opts = { weekday:'short', month:'short', day:'numeric', hour:'numeric', minute:'2-digit', hour12:true, timeZoneName:'short' };
  el.textContent = now.toLocaleString('en-US', opts);
}
setInterval(updateDrawerClock, 30000);
updateDrawerClock();

// ── Support screen ──────────────────────────
  function openSupportScreen() {
    document.getElementById('supportPage').classList.add('open');
  }
  function closeSupportScreen() {
    document.getElementById('supportPage').classList.remove('open');
    closeStartMeeting();
    closeJoinMeeting();
  }

  // ── Start Meeting ───────────────────────────
  let smMicMuted = false, smCamOff = false;
  function openStartMeeting() {
    // regenerate link code each time
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    document.getElementById('smLinkCode').textContent = code;
    document.getElementById('smCopyBtn').textContent = 'Copy';
    smMicMuted = false; smCamOff = false;
    updateMicBtn(); updateCamBtn();
    document.getElementById('startMeetingPage').classList.add('open');
  }
  function closeStartMeeting() {
    document.getElementById('startMeetingPage').classList.remove('open');
  }

  function toggleMic() {
    smMicMuted = !smMicMuted; updateMicBtn();
  }
  function updateMicBtn() {
    const btn = document.getElementById('smMicBtn');
    btn.textContent = smMicMuted ? '🔇' : '🎙';
    btn.classList.toggle('muted', smMicMuted);
  }
  function toggleCam() {
    smCamOff = !smCamOff; updateCamBtn();
  }
  function updateCamBtn() {
    const btn = document.getElementById('smCamBtn');
    btn.textContent = smCamOff ? '🚫' : '📷';
    btn.classList.toggle('muted', smCamOff);
    document.getElementById('smCamOff').style.display = smCamOff ? 'block' : 'none';
  }
  function copyMeetLink() {
    const code = document.getElementById('smLinkCode').textContent;
    const link = 'plum.io/meet/DG-' + code;
    if (navigator.clipboard) navigator.clipboard.writeText(link).catch(()=>{});
    const btn = document.getElementById('smCopyBtn');
    btn.textContent = '✓ Copied';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  }
  function launchMeeting() {
    const name = (document.getElementById('smName').value || 'Manager').trim();
    showToast('🎥 Starting meeting as ' + name + '…');
    setTimeout(closeStartMeeting, 1200);
    setTimeout(closeSupportScreen, 1250);
  }

  // ── Join Meeting ────────────────────────────
  function openJoinMeeting() {
    document.getElementById('jmCode').value = '';
    document.getElementById('jmCount').textContent = '0 / 6';
    const btn = document.getElementById('jmJoinBtn');
    btn.disabled = true;
    btn.style.background = 'var(--surface2)';
    btn.style.color = 'var(--text3)';
    btn.style.cursor = 'not-allowed';
    document.getElementById('joinMeetingPage').classList.add('open');
    setTimeout(() => document.getElementById('jmCode').focus(), 200);
  }
  function closeJoinMeeting() {
    document.getElementById('joinMeetingPage').classList.remove('open');
  }
  function updateJoinBtn() {
    const val = document.getElementById('jmCode').value;
    document.getElementById('jmCount').textContent = val.length + ' / 6';
    const btn = document.getElementById('jmJoinBtn');
    const ready = val.length === 6;
    btn.disabled = !ready;
    btn.style.background = ready ? 'var(--blue)' : 'var(--surface2)';
    btn.style.color = ready ? '#fff' : 'var(--text3)';
    btn.style.cursor = ready ? 'pointer' : 'not-allowed';
  }
  function joinMeeting() {
    const code = document.getElementById('jmCode').value;
    const name  = (document.getElementById('jmName').value || 'Sarah M.').trim();
    if (code.length !== 6) return;
    // Show connecting state on button
    const btn = document.getElementById('jmJoinBtn');
    btn.innerHTML = '<span style="display:inline-block;width:14px;height:14px;border:2px solid #fff;border-top-color:transparent;border-radius:50%;animation:spin .7s linear infinite;margin-right:8px"></span> Connecting…';
    btn.style.opacity = '0.8';
    btn.disabled = true;
    setTimeout(() => {
      closeJoinMeeting();
      closeSupportScreen();
      openInCall(name, code);
    }, 1400);
  }

  // ── In-Call Screen ──────────────────────────
  let callTimerInterval = null;
  let callSeconds = 0;
  let callMicMuted = false;
  let callCamOff   = false;
  let callPanel    = null; // 'chat' | 'participants' | 'audio' | null

  function openInCall(name, code) {
    document.getElementById('inCallName').textContent = name + ' (You)';
    document.getElementById('inCallInitial').textContent = name.charAt(0).toUpperCase();
    document.getElementById('ppName').textContent = name + ' (You)';
    document.getElementById('ppInitial').textContent = name.charAt(0).toUpperCase();
    callSeconds = 0; callMicMuted = false; callCamOff = false; callPanel = null;
    updateCallMicBtn(); updateCallCamBtn();
    hideAllCallPanels();
    document.getElementById('inCallPage').style.display = 'flex';
    // Start timer
    clearInterval(callTimerInterval);
    callTimerInterval = setInterval(() => {
      callSeconds++;
      const m = String(Math.floor(callSeconds/60)).padStart(2,'0');
      const s = String(callSeconds%60).padStart(2,'0');
      document.getElementById('callTimer').textContent = m+':'+s;
    }, 1000);
  }

  function hangUp() {
    clearInterval(callTimerInterval);
    document.getElementById('inCallPage').style.display = 'none';
    hideAllCallPanels();
    showToast('📞','Call ended');
  }

  function toggleCallMic() {
    callMicMuted = !callMicMuted; updateCallMicBtn();
  }
  function updateCallMicBtn() {
    const btn = document.getElementById('callMicBtn');
    btn.style.background = callMicMuted ? '#e53e3e' : 'rgba(255,255,255,.15)';
    btn.innerHTML = callMicMuted
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
  }
  function toggleCallCam() {
    callCamOff = !callCamOff; updateCallCamBtn();
  }
  function updateCallCamBtn() {
    const btn = document.getElementById('callCamBtn');
    btn.style.background = callCamOff ? '#e53e3e' : 'rgba(255,255,255,.15)';
    btn.innerHTML = callCamOff
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34"/><path d="M15 13a3 3 0 1 1-4.24-4.24"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>';
  }

  function toggleCallPanel(panel) {
    if (callPanel === panel) { hideAllCallPanels(); callPanel = null; return; }
    hideAllCallPanels();
    callPanel = panel;
    document.getElementById('callPanel'+panel.charAt(0).toUpperCase()+panel.slice(1)).style.display = 'flex';
  }
  function hideAllCallPanels() {
    ['callPanelChat','callPanelParticipants','callPanelAudio'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    callPanel = null;
  }

  function selectAudioOutput(type) {
    const icons = {Speaker:'🔊', Phone:'📱', Bluetooth:'🎧'};
    document.getElementById('callAudioIcon').textContent = icons[type] || '🔊';
    document.querySelectorAll('.call-audio-opt').forEach(el => {
      el.style.background = el.dataset.type === type ? 'rgba(124,58,237,.25)' : 'transparent';
    });
    setTimeout(() => hideAllCallPanels(), 300);
  }

  function sendChatMsg() {
    const inp = document.getElementById('callChatInput');
    const msg = inp.value.trim();
    if (!msg) return;
    const list = document.getElementById('callChatMessages');
    const now = new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit',hour12:true});
    list.innerHTML += `<div style="display:flex;justify-content:flex-end;margin-bottom:10px">
      <div style="max-width:80%">
        <div style="font-size:10px;color:rgba(255,255,255,.4);text-align:right;margin-bottom:3px">You · ${now}</div>
        <div style="background:#7c3aed;border-radius:14px 14px 2px 14px;padding:10px 13px;font-size:13px;color:#fff;line-height:1.4">${msg}</div>
      </div>
    </div>`;
    inp.value = '';
    list.scrollTop = list.scrollHeight; 
  } 