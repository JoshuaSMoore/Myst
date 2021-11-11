import{n as l,A as e,c as t,p as o,e as s,u as r,d as a,o as i,a as c,b as n,t as d,f,F as m,y as h,w as p,g}from"./vendor.74931d26.js";import{A as u,p as v,P as w,a as b,t as x}from"./index.3a5aa057.js";import{f as y}from"./FollowService.9f22fbc8.js";const k={setup(){const o=r(),s=l(""),a=l(0);return e((async()=>{if(o.params.profileId){try{await v.getPostByProfileId(o.params.profileId)}catch(l){w.toast(l,"Error getting Posts")}try{await b.getTrackedGames(o.params.profileId),await x.getTrackedGames()}catch(l){w.toast(l,"error")}try{await y.getFollowing(o.params.profileId),await y.checkFollow()}catch(l){w.toast(l.message,"error")}}})),{postsOffset:a,profile:t((()=>u.profile)),user:t((()=>u.user)),posts:t((()=>u.usersPosts)),followedGames:t((()=>u.followedGames)),userPosts:t((()=>u.userPosts)),post:t((()=>u.post)),trackedGames:t((()=>u.trackedGames)),following:t((()=>u.following)),canvasTest:s,testCanvas(){document.getElementById("canvas-test").toDataURL("image/jpeg"),document.getElementById("test")},scroll(l,e){const t=document.getElementById(e);switch(l){case"right":t.scrollTo({left:t.scrollLeft+600,behavior:"smooth"});break;case"left":t.scrollTo({left:t.scrollLeft-600,behavior:"smooth"})}}}}},P=p();o("data-v-972637a4");const S={key:0,class:"container"},_={class:"row"},C={class:"col-12"},G={class:"my-5 text-shadow"},I={class:"col-12"},F={class:"profile-card container text-light"},j={class:"row"},T={class:"col m-2"},A={class:" text-light d-flex justify-content-center align-items-center"},B={class:"col m-2 display-flex align-items-center"},E={key:0,class:"m-1"},L=n("h3",{class:"fw-bold"}," About me..: ",-1),R=g(),U={class:"fw-bold"},q={class:"m-2 row"},D={class:"text-center center wrapper"},M=n("div",{class:"text-light"},null,-1),O=n("i",{class:"mdi mdi-twitch icon"},null,-1),W=n("i",{class:"mdi mdi-github icon"},null,-1),X=n("div",{class:"text-light"},null,-1),$=n("i",{class:"mdi mdi-steam icon"},null,-1),z={class:"xbox",id:"xbox"},H=n("div",{class:"text-light"},null,-1),J=n("i",{class:"mdi mdi-microsoft-xbox icon"},null,-1),K=n("div",{class:"text-light"},null,-1),N=n("i",{class:"mdi mdi-sony-playstation icon"},null,-1),Q=n("div",{class:"text-light"},null,-1),V=n("i",{class:"mdi mdi-nintendo-switch icon"},null,-1),Y={class:"row text-shadow rounded m-1 center"},Z={class:"fw-bold ps-3 rounded"},ll={class:"row rounded mb-2"},el={class:"col-1 text-center on-hover"},tl=n("i",{class:"mdi mdi-chevron-left f-20 text-light"},null,-1),ol={class:"col-10 center screenshot-card smoothScroll mb-2",id:"followScroll"},sl={class:"col-1 text-center on-hover"},rl=n("i",{class:"mdi mdi-chevron-right f-20 text-light"},null,-1),al=n("div",{class:"row mx-5"},[n("div",{class:"d-flex justify-content-end"},[n("i",{class:"mdi mdi-cog f-20 text-light",type:"button","data-bs-toggle":"modal","data-bs-target":"#profile-form"})])],-1),il={class:"mx-5 text-light "},cl=n("h1",{class:"fw-bold ps-3 rounded"}," Game Library ",-1),nl={class:"row"},dl={class:"col-1 text-center on-hover"},fl=n("i",{class:"mdi mdi-chevron-left f-20 text-light"},null,-1),ml={class:" col-10 d-flex screenshot-card smoothScroll",id:"gameScroll"},hl={class:"col-1 text-center on-hover"},pl=n("i",{class:"mdi mdi-chevron-right f-20 text-light"},null,-1),gl={class:"text-light "},ul={class:"row d-flex"},vl=n("div",{class:"col-2 center mx-2"},[n("h1",{class:"fw-bold ps-3 rounded"}," Posts ")],-1),wl={class:"col mx-1 btn-center"},bl={key:0,class:"btn btn-outline-primary ",type:"button","data-bs-toggle":"modal","data-bs-target":"#post-form"},xl={class:"row rounded justify-content-space-evenly center"},yl={class:"col-1 text-center on-hover"},kl=n("i",{class:"mdi mdi-chevron-left f-20 text-light"},null,-1),Pl={class:"col-8 screenshot-card smoothScroll d-flex",id:"postScroll"},Sl={class:"col-1 text-center on-hover"},_l=n("i",{class:"mdi mdi-chevron-right f-20 text-light"},null,-1),Cl=n("h4",null,"Update Profile",-1),Gl=n("h4",null,"Create Post",-1);s();const Il=P(((l,e,t,o,s,r)=>{const p=a("Following"),g=a("FollowedGame"),u=a("Post"),v=a("ProfileForm"),w=a("Modal"),b=a("PostForm");return i(),c(m,null,[o.profile?(i(),c("div",S,[n("div",_,[n("div",C,[n("h2",G," Welcome to "+d(o.profile.name)+"'s Profile ",1)])]),n("div",I,[n("div",F,[n("div",j,[n("div",T,[n("div",A,[n("iframe",{src:`https://player.twitch.tv/?channel=${o.profile.twitch}&parent=localhost`,width:"500px",height:"300px",class:"bigRound glow"},"\r\n              ",8,["src"])])]),n("div",B,[n("img",{class:"bigRound glow img-fluid",src:o.profile.picture,alt:"",height:"400",width:"400"},null,8,["src"]),o.profile.bio?(i(),c("div",E,[L,R,n("h4",U,d(o.profile.bio),1)])):f("",!0)])]),n("div",q,[n("ul",D,[n("li",null,[M,o.profile.twitch?(i(),c("a",{key:0,href:"https://www.twitch.com/"+o.profile.twitch,class:"m-1 glow",target:"_blank",rel:"noreferrer noopener"},[O],8,["href"])):f("",!0)]),n("li",null,[o.profile.github?(i(),c("a",{key:0,href:o.profile.github,class:"m-1 glow",target:"_blank",rel:"noreferrer noopener"},[W],8,["href"])):f("",!0)]),n("li",null,[X,o.profile.steam?(i(),c("a",{key:0,href:"https://steamcommunity.com/id/"+o.profile.steam,class:"m-1 glow",target:"_blank",rel:"noreferrer noopener"},[$],8,["href"])):f("",!0)]),n("li",z,[H,o.profile.xbox?(i(),c("a",{key:0,href:"https://account.xbox.com/en-us/profile?gamertag="+o.profile.xbox,class:"m-1 glow",title:"Xbox",target:"_blank",rel:"noreferrer noopener"},[J],8,["href"])):f("",!0)]),n("li",null,[K,o.profile.playstation?(i(),c("a",{key:0,href:"https://psnprofiles.com/"+o.profile.playstation,class:"m-1 glow",target:"_blank",rel:"noreferrer noopener"},[N],8,["href"])):f("",!0)]),n("li",null,[Q,o.profile.nintendo?(i(),c("a",{key:0,href:"https://www.google.com/search?q=nintendo+user"+o.profile.nintendo,class:"m-1 glow",target:"_blank",rel:"noreferrer noopener"},[V],8,["href"])):f("",!0)])])])]),n("div",Y,[n("h5",Z,d(o.profile.name)+"'s friends! ",1),n("div",ll,[n("div",el,[(i(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[1]||(e[1]=l=>o.scroll("left","followScroll"))},[tl]))]),n("div",ol,[(i(!0),c(m,null,h(o.following,(l=>(i(),c(p,{key:l.id,following:l},null,8,["following"])))),128))]),n("div",sl,[(i(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[2]||(e[2]=l=>o.scroll("right","followScroll"))},[rl]))])])])]),al])):f("",!0),n("div",il,[cl,n("div",nl,[n("div",dl,[(i(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[3]||(e[3]=l=>o.scroll("left","gameScroll"))},[fl]))]),n("div",ml,[(i(!0),c(m,null,h(o.followedGames,(l=>(i(),c(g,{key:l.id,"followed-game":l},null,8,["followed-game"])))),128))]),n("div",hl,[(i(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[4]||(e[4]=l=>o.scroll("right","gameScroll"))},[pl]))])])]),n("div",gl,[n("div",ul,[vl,n("div",wl,[o.user.isAuthenticated?(i(),c("button",bl," Create a Post ")):f("",!0)])]),n("div",xl,[n("div",yl,[(i(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[5]||(e[5]=l=>o.scroll("left","postScroll"))},[kl]))]),n("div",Pl,[(i(!0),c(m,null,h(o.posts,(l=>(i(),c(u,{key:l.id,post:l},null,8,["post"])))),128))]),n("div",Sl,[(i(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[6]||(e[6]=l=>o.scroll("right","postScroll"))},[_l]))])])]),n(w,{id:"profile-form"},{"modal-title":P((()=>[Cl])),"modal-body":P((()=>[n(v)])),_:1}),n(w,{id:"post-form"},{"modal-title":P((()=>[Gl])),"modal-body":P((()=>[n(b)])),_:1})],64)}));k.render=Il,k.__scopeId="data-v-972637a4";export default k;
