import{_,r as l,o as f,c as h,b as d,w as b,a as e,j as v,f as c,v as u,F as w,d as g}from"./index-BgkBJgaK.js";var x={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_API_NAME:"berlin",BASE_URL:"/vite-week6-airbnb/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const L={data(){return{user:{username:"",password:""},isLoading:!1}},methods:{login(){this.isLoading=!0;const n=`${x.VITE_APP_API_URL}/admin/signin`,s=this.user;this.$http.post(n,s).then(t=>{const{expired:i,token:o}=t.data;document.cookie=`W6Token=${o}; expires=${new Date(i)}`,alert(t.data.message),this.$router.push("/admin/products")}).catch(t=>{alert(t.response.data.message)}).finally(()=>{this.isLoading=!1})}}},V=e("h1",null,"後台登入",-1),k={class:"row"},E={class:"col-4 mx-auto text-start"},A={class:"mb-3"},R=e("label",{for:"email",class:"form-label"},"Email address",-1),I={class:"mb-3"},P=e("label",{for:"password",class:"form-label"},"password",-1),T=e("div",{class:"text-end"},[e("button",{type:"submit",class:"btn btn-primary"},"登入")],-1);function y(n,s,t,i,o,r){const m=l("VueLoading"),p=l("RouterLink");return f(),h(w,null,[V,d(m,{active:o.isLoading},null,8,["active"]),d(p,{to:"/",class:"d-inline-block mb-3"},{default:b(()=>[g("回前台")]),_:1}),e("div",k,[e("div",E,[e("form",{onSubmit:s[2]||(s[2]=v((...a)=>r.login&&r.login(...a),["prevent"]))},[e("div",A,[R,c(e("input",{type:"email",class:"form-control",id:"email",placeholder:"name@example.com","onUpdate:modelValue":s[0]||(s[0]=a=>o.user.username=a)},null,512),[[u,o.user.username]])]),e("div",I,[P,c(e("input",{type:"password",class:"form-control",id:"password",placeholder:"password","onUpdate:modelValue":s[1]||(s[1]=a=>o.user.password=a)},null,512),[[u,o.user.password]])]),T],32)])])],64)}const U=_(L,[["render",y]]);export{U as default};
