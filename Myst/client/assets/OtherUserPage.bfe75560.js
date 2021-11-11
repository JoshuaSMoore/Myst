import{n as l,x as e,c as o,p as t,e as s,u as r,d as i,o as a,a as c,b as n,t as d,f,F as h,y as m,w as u,g as p}from"./vendor.74931d26.js";import{a as g,P as w,p as v,t as b,A as x}from"./index.3a5aa057.js";import{f as y}from"./FollowService.9f22fbc8.js";const k={setup(){const t=l(0),s=l(0),i=l(0),a=r();return e((async()=>{a.params.otheruserId;try{await g.getAccountById(a.params.otheruserId)}catch(l){w.toast(l.message,"error")}try{await v.getPostByProfileId(a.params.otheruserId)}catch(l){w.toast(l,"Error getting Posts")}try{await g.getProfileGames(a.params.otheruserId),await b.getProfileGames()}catch(l){w.toast(l,"error")}try{await y.getFollowing(a.params.otheruserId),await y.checkFollow()}catch(l){w.toast(l.message,"error")}})),{gamesOffset:t,postsOffset:s,peopleOffset:i,profile:o((()=>x.otherUser)),user:o((()=>x.user)),posts:o((()=>x.usersPosts)),followedProfileGames:o((()=>x.followedProfileGames)),following:o((()=>x.following)),async addFollower(){try{await y.addFollower(a.params.otheruserId),await y.getFollowing(x.profile.id),w.toast("You've followed this Gamer","success")}catch(l){w.toast(l,"error")}},async deleteFollower(){try{await y.deleteFollower(a.params.otheruserId),w.toast("You've stopped following this Gamer","success")}catch(l){w.toast(l.message,"error")}},scroll(l,e){const o=document.getElementById(e);switch(l){case"right":o.scrollTo({left:o.scrollLeft+600,behavior:"smooth"});break;case"left":o.scrollTo({left:o.scrollLeft-600,behavior:"smooth"})}}}}},P=u();t("data-v-3ddb07ef");const F={key:0,class:"container"},S={class:"row"},I={class:"col-12"},_={class:"my-5 text-shadow"},C={class:"row"},G={class:"col-12"},j={class:" container text-light"},O={class:"row"},A={class:"col m-2"},B={class:"  text-light d-flex justify-content-center align-items-center"},L={class:"col m-2"},T={key:0,class:"m-1"},U=n("h3",{class:"fw-bold"}," About me..: ",-1),E=p(),R={class:"fw-bold"},Y={class:"m-2 row"},q={class:"text-center"},M=n("div",{class:"text-light "},null,-1),W=n("i",{class:"mdi mdi-twitch icon"},null,-1),X=n("i",{class:"mdi mdi-github icon"},null,-1),$=n("div",{class:"text-light "},null,-1),z=n("i",{class:"mdi mdi-steam icon"},null,-1),D={class:"xbox",id:"xbox"},H=n("div",{class:"text-light "},null,-1),J=n("i",{class:"mdi mdi-microsoft-xbox icon"},null,-1),K=n("div",{class:"text-light "},null,-1),N=n("i",{class:"mdi mdi-sony-playstation icon"},null,-1),Q=n("div",{class:"text-light "},null,-1),V=n("i",{class:"mdi mdi-nintendo-switch icon"},null,-1),Z={class:"row roundedtext-light"},ll={class:"fw-bold ps-3 rounded"},el={class:"row rounded justify-content-center"},ol={class:"col-1 text-center on-hover"},tl=n("i",{class:"mdi mdi-chevron-left f-20 text-light"},null,-1),sl={class:"col-10 d-flex screenshot-card smoothScroll",id:"followScroll"},rl={class:"col-1 text-center on-hover"},il=n("i",{class:"mdi mdi-chevron-right f-20 text-light"},null,-1),al={class:"row"},cl={class:"col-12 d-flex justify-content-end"},nl={class:"row rounded text-light"},dl=n("h1",{class:"fw-bold ps-3 rounded"}," Game Library ",-1),fl={class:"row  rounded justify-content-center"},hl={class:"col-1 text-center on-hover"},ml=n("i",{class:"mdi mdi-chevron-left f-20 text-light"},null,-1),ul={class:" col-10 d-flex screenshot-card smoothScroll",id:"gameScroll"},pl={class:"col-1 text-center on-hover"},gl=n("i",{class:"mdi mdi-chevron-right f-20 text-light"},null,-1),wl={class:"row pb-2 rounded text-light"},vl=n("h2",{class:"fw-bold p-3 rounded"}," POSTS ",-1),bl={class:"row  rounded justify-content-center "},xl={class:"col-1 text-center on-hover"},yl=n("i",{class:"mdi mdi-chevron-left f-20 text-light"},null,-1),kl={class:"col-10 d-flex screenshot-card smoothScroll",id:"postScroll"},Pl={class:"col-1 text-center on-hover"},Fl=n("i",{class:"mdi mdi-chevron-right f-20 text-light"},null,-1),Sl=n("h4",null,"Update Profile",-1),Il=n("h4",null,"Create Post",-1);s();const _l=P(((l,e,o,t,s,r)=>{const u=i("Following"),p=i("FollowedGame"),g=i("Post"),w=i("ProfileForm"),v=i("Modal"),b=i("PostForm");return a(),c(h,null,[t.profile?(a(),c("div",F,[n("div",S,[n("div",I,[n("h2",_," Welcome to "+d(t.profile.name)+"'s Profile ",1)])]),n("div",C,[n("div",G,[n("div",j,[n("div",O,[n("div",A,[n("div",B,[n("iframe",{src:`https://player.twitch.tv/?channel=${t.profile.twitch}&parent=localhost`,width:"500px",height:"300px",class:"bigRound glow"},"\r\n                ",8,["src"])])]),n("div",L,[n("img",{class:"bigRound glow",src:t.profile.picture,alt:"",height:"400",width:"400"},null,8,["src"]),t.profile.bio?(a(),c("div",T,[U,E,n("h4",R,d(t.profile.bio),1)])):f("",!0)]),n("div",Y,[n("ul",q,[n("li",null,[M,t.profile.twitch?(a(),c("a",{key:0,href:"https://www.twitch.com/"+t.profile.twitch,class:"m-1 glow glow",target:"_blank",rel:"noreferrer noopener"},[W],8,["href"])):f("",!0)]),n("li",null,[t.profile.github?(a(),c("a",{key:0,href:t.profile.github,class:"m-1 glow",target:"_blank",rel:"noreferrer noopener"},[X],8,["href"])):f("",!0)]),n("li",null,[$,t.profile.steam?(a(),c("a",{key:0,href:"https://steamcommunity.com/id/"+t.profile.steam,class:"m-1 glow",target:"_blank",rel:"noreferrer noopener"},[z],8,["href"])):f("",!0)]),n("li",D,[H,t.profile.xbox?(a(),c("a",{key:0,href:"https://account.xbox.com/en-us/profile?gamertag="+t.profile.xbox,class:"m-1 glow",title:"Xbox",target:"_blank",rel:"noreferrer noopener"},[J],8,["href"])):f("",!0)]),n("li",null,[K,t.profile.playstation?(a(),c("a",{key:0,href:"https://psnprofiles.com/"+t.profile.playstation,class:"m-1 glow",target:"_blank",rel:"noreferrer noopener"},[N],8,["href"])):f("",!0)]),n("li",null,[Q,t.profile.nintendo?(a(),c("a",{key:0,href:"https://www.google.com/search?q=nintendo+user"+t.profile.nintendo,class:"m-1 glow",target:"_blank",rel:"noreferrer noopener"},[V],8,["href"])):f("",!0)])])]),n("div",Z,[n("h5",ll,d(t.profile.name)+"'s friends! ",1),n("div",el,[n("div",ol,[(a(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[1]||(e[1]=l=>t.scroll("left","followScroll"))},[tl]))]),n("div",sl,[(a(!0),c(h,null,m(t.following,(l=>(a(),c(u,{key:l.id,following:l,class:"m-3"},null,8,["following"])))),128)),n("div",rl,[(a(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[2]||(e[2]=l=>t.scroll("right","followScroll"))},[il]))])])])])]),n("div",al,[n("div",cl,[n("i",{class:"mdi mdi-plus f-20 text-light",type:"button",onClick:e[3]||(e[3]=l=>t.addFollower()),title:"Follow!"}),n("i",{class:"mdi mdi-minus f-20 text-light",type:"button",onClick:e[4]||(e[4]=l=>t.deleteFollower()),title:"Unfollow ☹️"})])])])])]),n("div",nl,[dl,n("div",fl,[n("div",hl,[(a(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[5]||(e[5]=l=>t.scroll("left","gameScroll"))},[ml]))]),n("div",ul,[(a(!0),c(h,null,m(t.followedProfileGames,(l=>(a(),c(p,{key:l.id,"followed-game":l,class:"m-3"},null,8,["followed-game"])))),128))]),n("div",pl,[(a(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[6]||(e[6]=l=>t.scroll("right","gameScroll"))},[gl]))])])]),n("div",wl,[vl,n("div",bl,[n("div",xl,[(a(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[7]||(e[7]=l=>t.scroll("left","postScroll"))},[yl]))]),n("div",kl,[(a(!0),c(h,null,m(t.posts,(l=>(a(),c(g,{key:l.id,post:l,class:"m-3"},null,8,["post"])))),128))]),n("div",Pl,[(a(),c("button",{key:0,class:"btn btn-prev-next",onClick:e[8]||(e[8]=l=>t.scroll("right","postScroll"))},[Fl]))])])])])):f("",!0),n(v,{id:"profile-form"},{"modal-title":P((()=>[Sl])),"modal-body":P((()=>[n(w)])),_:1}),n(v,{id:"post-form"},{"modal-title":P((()=>[Il])),"modal-body":P((()=>[n(b)])),_:1})],64)}));k.render=_l,k.__scopeId="data-v-3ddb07ef";export default k;
