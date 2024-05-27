import{A as U,I as H,a as _,b,c as x,d as D,h as N,ha as L,ia as $,k as j,m as P,o as A,q as T,t as k,v as G,w as V,x as q,y as O,z as R}from"./chunk-7XKS54T7.js";import{$a as h,Da as M,Ga as d,Ha as y,Ia as m,K as w,Q as l,Qb as F,Sa as o,Ta as n,Tb as I,Ua as c,W as C,X as p,bb as E,cc as S,dc as g,jb as a,kb as v,qa as u,ra as f,tc as B}from"./chunk-NGMLG7BJ.js";function X(e,t){e&1&&(o(0,"mat-error"),a(1,"\u041F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F"),n())}function Y(e,t){e&1&&(o(0,"mat-error"),a(1,"\u041F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F"),n())}function Z(e,t){if(e&1&&(o(0,"p")(1,"mat-error"),a(2),n()()),e&2){let Q=E();u(2),v(Q.errorMessage)}}var J=(()=>{let t=class t extends ${constructor(s,r,i){super(),this.fb=s,this.authService=r,this.router=i,this.showPassword=!1,this.errorMessage=null,this.form=this.fb.group({username:["",[b.required]],password:["",[b.required]]})}ngOnInit(){this.form.valueChanges.pipe(w(this.destroy$)).subscribe(()=>this.errorMessage=null)}submit(){this.authService.login({username:this.form.controls.username.value,password:this.form.controls.password.value})?this.router.navigate(["/"]):this.errorMessage="\u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C"}};t.\u0275fac=function(r){return new(r||t)(f(A),f(B),f(S))},t.\u0275cmp=C({type:t,selectors:[["app-auth"]],features:[M],decls:19,vars:9,consts:[[3,"ngSubmit","formGroup"],["appearance","outline"],["matInput","","placeholder","ex.: ivanov","formControlName","username"],[4,"ngIf"],["matInput","","placeholder","ex.: ivanov","formControlName","password",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["mat-stroked-button","","color","primary",3,"disabled"]],template:function(r,i){r&1&&(o(0,"form",0),h("ngSubmit",function(){return i.submit()}),o(1,"div")(2,"mat-form-field",1)(3,"mat-label"),a(4,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D"),n(),c(5,"input",2),d(6,X,2,0,"mat-error",3),n()(),o(7,"div")(8,"mat-form-field",1)(9,"mat-label"),a(10,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C"),n(),c(11,"input",4),o(12,"button",5),h("click",function(){return i.showPassword=!i.showPassword}),o(13,"mat-icon"),a(14),n()(),d(15,Y,2,0,"mat-error",3),n()(),d(16,Z,3,1,"p",3),o(17,"button",6),a(18," \u0412\u043E\u0439\u0442\u0438 "),n()()),r&2&&(m("formGroup",i.form),u(6),m("ngIf",i.form.controls.username.invalid),u(5),m("type",i.showPassword?"text":"password"),u(),y("aria-label","Hide password")("aria-pressed",!i.showPassword),u(2),v(i.showPassword?"visibility":"visibility_off"),u(),m("ngIf",i.form.controls.password.invalid),u(),m("ngIf",i.errorMessage),u(),m("disabled",i.form.invalid||i.errorMessage))},dependencies:[F,N,_,x,D,j,P,R,V,q,O,U,H,k,G],styles:[".mat-mdc-form-field[_ngcontent-%COMP%]{width:100%}"]});let e=t;return e})();var tt=[{path:"",component:J}],K=(()=>{let t=class t{};t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=p({type:t}),t.\u0275inj=l({imports:[g.forChild(tt),g]});let e=t;return e})();var yt=(()=>{let t=class t{};t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=p({type:t}),t.\u0275inj=l({imports:[I,K,T,L]});let e=t;return e})();export{yt as AuthModule};
