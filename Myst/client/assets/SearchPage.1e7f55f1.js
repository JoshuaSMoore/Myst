import{n as e,c as t,p as s,e as a,d as c,o as r,a as n,b as o,t as d,F as l,y as u,f as i,w as y}from"./vendor.8f2b3d66.js";import{g,A as m,P as v}from"./index.a488e245.js";const x={setup:()=>({query:e(""),games:t((()=>m.games)),page:t((()=>m.page)),next:t((()=>m.next)),previous:t((()=>m.previous)),currentPage:t((()=>m.currentPage)),searchedAccounts:t((()=>m.searchedAccounts)),async getNew(){try{await g.getNew(m.currentPage)}catch(e){v.toast("error",e)}},async getOld(){try{await g.getOld(m.currentPage)}catch(e){v.toast("error",e)}}})},p=y();s("data-v-d493d952");const k={class:"container-fluid"},f={class:"row my-5 p-0 align-items-center d-flex justify-content-center"},h={class:"text-muted text-dark text-center mt-3"},w={key:0,class:"row styles"},P={key:1,class:"row styles"},b={class:"row"},A={class:"col-12 d-flex justify-content-around"},j={key:1},C={class:"text-muted text-dark"},N={key:3};a();const G=p(((e,t,s,a,y,g)=>{const m=c("GameSearchCard"),v=c("AccountSearchCard");return r(),n("div",k,[o("div",f,[o("div",h,[o("h2",null," PAGE "+d(a.currentPage),1)])]),a.games?(r(),n("div",w,[(r(!0),n(l,null,u(a.games,(e=>(r(),n(m,{key:e.id,game:e,class:"col-3 m-2 styles"},null,8,["game"])))),128))])):i("",!0),a.searchedAccounts?(r(),n("div",P,[(r(!0),n(l,null,u(a.searchedAccounts,(e=>(r(),n(v,{key:e.id,account:e,lass:"col-3 m-2 styles"},null,8,["account"])))),128))])):i("",!0),o("div",b,[o("div",A,[a.previous?(r(),n("button",{key:0,class:"btn btn-secondary",onClick:t[1]||(t[1]=e=>a.getOld())}," Previous ")):i("",!0),a.previous?i("",!0):(r(),n("div",j)),o("div",C,[o("h2",null," PAGE "+d(a.currentPage),1)]),a.next?(r(),n("button",{key:2,class:"btn btn-secondary",onClick:t[2]||(t[2]=e=>a.getNew())}," Next ")):i("",!0),a.next?i("",!0):(r(),n("div",N))])])])}));x.render=G,x.__scopeId="data-v-d493d952";export default x;