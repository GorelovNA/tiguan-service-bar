var he=":";function de(e,r){for(let i=1,n=1;i<e.length;i++,n++)if(r[n]==="\\")n++;else if(e[i]===he)return i;throw new Error(`Unterminated $localize metadata block in "${r}".`)}var Pt=function(e,...r){if(Pt.translate){let n=Pt.translate(e,r);e=n[0],r=n[1]}let i=Xt(e[0],e.raw[0]);for(let n=1;n<e.length;n++)i+=r[n-1]+Xt(e[n],e.raw[n]);return i},_e=":";function Xt(e,r){return r.charAt(0)===_e?e.substring(de(e,r)+1):e}globalThis.$localize=Pt;var it=globalThis;function tt(e){return(it.__Zone_symbol_prefix||"__zone_symbol__")+e}function Te(){let e=it.performance;function r(L){e&&e.mark&&e.mark(L)}function i(L,_){e&&e.measure&&e.measure(L,_)}r("Zone");let n=(()=>{let _=class _{static assertZonePatched(){if(it.Promise!==M.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let t=_.current;for(;t.parent;)t=t.parent;return t}static get current(){return k.zone}static get currentTask(){return I}static __load_patch(t,h,O=!1){if(M.hasOwnProperty(t)){let j=it[tt("forceDuplicateZoneCheck")]===!0;if(!O&&j)throw Error("Already loaded patch: "+t)}else if(!it["__Zone_disable_"+t]){let j="Zone:"+t;r(j),M[t]=h(it,_,R),i(j,j)}}get parent(){return this._parent}get name(){return this._name}constructor(t,h){this._parent=t,this._name=h?h.name||"unnamed":"<root>",this._properties=h&&h.properties||{},this._zoneDelegate=new l(this,this._parent&&this._parent._zoneDelegate,h)}get(t){let h=this.getZoneWith(t);if(h)return h._properties[t]}getZoneWith(t){let h=this;for(;h;){if(h._properties.hasOwnProperty(t))return h;h=h._parent}return null}fork(t){if(!t)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,t)}wrap(t,h){if(typeof t!="function")throw new Error("Expecting function got: "+t);let O=this._zoneDelegate.intercept(this,t,h),j=this;return function(){return j.runGuarded(O,this,arguments,h)}}run(t,h,O,j){k={parent:k,zone:this};try{return this._zoneDelegate.invoke(this,t,h,O,j)}finally{k=k.parent}}runGuarded(t,h=null,O,j){k={parent:k,zone:this};try{try{return this._zoneDelegate.invoke(this,t,h,O,j)}catch(D){if(this._zoneDelegate.handleError(this,D))throw D}}finally{k=k.parent}}runTask(t,h,O){if(t.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(t.zone||nt).name+"; Execution: "+this.name+")");if(t.state===q&&(t.type===z||t.type===m))return;let j=t.state!=B;j&&t._transitionTo(B,d),t.runCount++;let D=I;I=t,k={parent:k,zone:this};try{t.type==m&&t.data&&!t.data.isPeriodic&&(t.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,t,h,O)}catch(ft){if(this._zoneDelegate.handleError(this,ft))throw ft}}finally{t.state!==q&&t.state!==X&&(t.type==z||t.data&&t.data.isPeriodic?j&&t._transitionTo(d,B):(t.runCount=0,this._updateTaskCount(t,-1),j&&t._transitionTo(q,B,q))),k=k.parent,I=D}}scheduleTask(t){if(t.zone&&t.zone!==this){let O=this;for(;O;){if(O===t.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${t.zone.name}`);O=O.parent}}t._transitionTo(v,q);let h=[];t._zoneDelegates=h,t._zone=this;try{t=this._zoneDelegate.scheduleTask(this,t)}catch(O){throw t._transitionTo(X,v,q),this._zoneDelegate.handleError(this,O),O}return t._zoneDelegates===h&&this._updateTaskCount(t,1),t.state==v&&t._transitionTo(d,v),t}scheduleMicroTask(t,h,O,j){return this.scheduleTask(new T(U,t,h,O,j,void 0))}scheduleMacroTask(t,h,O,j,D){return this.scheduleTask(new T(m,t,h,O,j,D))}scheduleEventTask(t,h,O,j,D){return this.scheduleTask(new T(z,t,h,O,j,D))}cancelTask(t){if(t.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(t.zone||nt).name+"; Execution: "+this.name+")");if(!(t.state!==d&&t.state!==B)){t._transitionTo(F,d,B);try{this._zoneDelegate.cancelTask(this,t)}catch(h){throw t._transitionTo(X,F),this._zoneDelegate.handleError(this,h),h}return this._updateTaskCount(t,-1),t._transitionTo(q,F),t.runCount=0,t}}_updateTaskCount(t,h){let O=t._zoneDelegates;h==-1&&(t._zoneDelegates=null);for(let j=0;j<O.length;j++)O[j]._updateTaskCount(t.type,h)}};_.__symbol__=tt;let L=_;return L})(),s={name:"",onHasTask:(L,_,a,t)=>L.hasTask(a,t),onScheduleTask:(L,_,a,t)=>L.scheduleTask(a,t),onInvokeTask:(L,_,a,t,h,O)=>L.invokeTask(a,t,h,O),onCancelTask:(L,_,a,t)=>L.cancelTask(a,t)};class l{get zone(){return this._zone}constructor(_,a,t){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this._zone=_,this._parentDelegate=a,this._forkZS=t&&(t&&t.onFork?t:a._forkZS),this._forkDlgt=t&&(t.onFork?a:a._forkDlgt),this._forkCurrZone=t&&(t.onFork?this._zone:a._forkCurrZone),this._interceptZS=t&&(t.onIntercept?t:a._interceptZS),this._interceptDlgt=t&&(t.onIntercept?a:a._interceptDlgt),this._interceptCurrZone=t&&(t.onIntercept?this._zone:a._interceptCurrZone),this._invokeZS=t&&(t.onInvoke?t:a._invokeZS),this._invokeDlgt=t&&(t.onInvoke?a:a._invokeDlgt),this._invokeCurrZone=t&&(t.onInvoke?this._zone:a._invokeCurrZone),this._handleErrorZS=t&&(t.onHandleError?t:a._handleErrorZS),this._handleErrorDlgt=t&&(t.onHandleError?a:a._handleErrorDlgt),this._handleErrorCurrZone=t&&(t.onHandleError?this._zone:a._handleErrorCurrZone),this._scheduleTaskZS=t&&(t.onScheduleTask?t:a._scheduleTaskZS),this._scheduleTaskDlgt=t&&(t.onScheduleTask?a:a._scheduleTaskDlgt),this._scheduleTaskCurrZone=t&&(t.onScheduleTask?this._zone:a._scheduleTaskCurrZone),this._invokeTaskZS=t&&(t.onInvokeTask?t:a._invokeTaskZS),this._invokeTaskDlgt=t&&(t.onInvokeTask?a:a._invokeTaskDlgt),this._invokeTaskCurrZone=t&&(t.onInvokeTask?this._zone:a._invokeTaskCurrZone),this._cancelTaskZS=t&&(t.onCancelTask?t:a._cancelTaskZS),this._cancelTaskDlgt=t&&(t.onCancelTask?a:a._cancelTaskDlgt),this._cancelTaskCurrZone=t&&(t.onCancelTask?this._zone:a._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;let h=t&&t.onHasTask,O=a&&a._hasTaskZS;(h||O)&&(this._hasTaskZS=h?t:s,this._hasTaskDlgt=a,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=this._zone,t.onScheduleTask||(this._scheduleTaskZS=s,this._scheduleTaskDlgt=a,this._scheduleTaskCurrZone=this._zone),t.onInvokeTask||(this._invokeTaskZS=s,this._invokeTaskDlgt=a,this._invokeTaskCurrZone=this._zone),t.onCancelTask||(this._cancelTaskZS=s,this._cancelTaskDlgt=a,this._cancelTaskCurrZone=this._zone))}fork(_,a){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,_,a):new n(_,a)}intercept(_,a,t){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,_,a,t):a}invoke(_,a,t,h,O){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,_,a,t,h,O):a.apply(t,h)}handleError(_,a){return this._handleErrorZS?this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,_,a):!0}scheduleTask(_,a){let t=a;if(this._scheduleTaskZS)this._hasTaskZS&&t._zoneDelegates.push(this._hasTaskDlgtOwner),t=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,_,a),t||(t=a);else if(a.scheduleFn)a.scheduleFn(a);else if(a.type==U)V(a);else throw new Error("Task is missing scheduleFn.");return t}invokeTask(_,a,t,h){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,_,a,t,h):a.callback.apply(t,h)}cancelTask(_,a){let t;if(this._cancelTaskZS)t=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,_,a);else{if(!a.cancelFn)throw Error("Task is not cancelable");t=a.cancelFn(a)}return t}hasTask(_,a){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,_,a)}catch(t){this.handleError(_,t)}}_updateTaskCount(_,a){let t=this._taskCounts,h=t[_],O=t[_]=h+a;if(O<0)throw new Error("More tasks executed then were scheduled.");if(h==0||O==0){let j={microTask:t.microTask>0,macroTask:t.macroTask>0,eventTask:t.eventTask>0,change:_};this.hasTask(this._zone,j)}}}class T{constructor(_,a,t,h,O,j){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=_,this.source=a,this.data=h,this.scheduleFn=O,this.cancelFn=j,!t)throw new Error("callback is not defined");this.callback=t;let D=this;_===z&&h&&h.useG?this.invoke=T.invokeTask:this.invoke=function(){return T.invokeTask.call(it,D,this,arguments)}}static invokeTask(_,a,t){_||(_=this),J++;try{return _.runCount++,_.zone.runTask(_,a,t)}finally{J==1&&$(),J--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(q,v)}_transitionTo(_,a,t){if(this._state===a||this._state===t)this._state=_,_==q&&(this._zoneDelegates=null);else throw new Error(`${this.type} '${this.source}': can not transition to '${_}', expecting state '${a}'${t?" or '"+t+"'":""}, was '${this._state}'.`)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}let g=tt("setTimeout"),p=tt("Promise"),N=tt("then"),E=[],A=!1,P;function Z(L){if(P||it[p]&&(P=it[p].resolve(0)),P){let _=P[N];_||(_=P.then),_.call(P,L)}else it[g](L,0)}function V(L){J===0&&E.length===0&&Z($),L&&E.push(L)}function $(){if(!A){for(A=!0;E.length;){let L=E;E=[];for(let _=0;_<L.length;_++){let a=L[_];try{a.zone.runTask(a,null,null)}catch(t){R.onUnhandledError(t)}}}R.microtaskDrainDone(),A=!1}}let nt={name:"NO ZONE"},q="notScheduled",v="scheduling",d="scheduled",B="running",F="canceling",X="unknown",U="microTask",m="macroTask",z="eventTask",M={},R={symbol:tt,currentZoneFrame:()=>k,onUnhandledError:W,microtaskDrainDone:W,scheduleMicroTask:V,showUncaughtError:()=>!n[tt("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:W,patchMethod:()=>W,bindArguments:()=>[],patchThen:()=>W,patchMacroTask:()=>W,patchEventPrototype:()=>W,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>W,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>W,wrapWithCurrentZone:()=>W,filterProperties:()=>[],attachOriginToPatched:()=>W,_redefineProperty:()=>W,patchCallbacks:()=>W,nativeScheduleMicroTask:Z},k={parent:null,zone:new n(null,null)},I=null,J=0;function W(){}return i("Zone","Zone"),n}function ge(){let e=globalThis,r=e[tt("forceDuplicateZoneCheck")]===!0;if(e.Zone&&(r||typeof e.Zone.__symbol__!="function"))throw new Error("Zone already loaded.");return e.Zone??=Te(),e.Zone}var kt=Object.getOwnPropertyDescriptor,jt=Object.defineProperty,xt=Object.getPrototypeOf,Ee=Object.create,me=Array.prototype.slice,Zt="addEventListener",$t="removeEventListener",Dt=tt(Zt),Mt=tt($t),ct="true",at="false",vt=tt("");function Ht(e,r){return Zone.current.wrap(e,r)}function Bt(e,r,i,n,s){return Zone.current.scheduleMacroTask(e,r,i,n,s)}var H=tt,Ct=typeof window<"u",mt=Ct?window:void 0,K=Ct&&mt||globalThis,pe="removeAttribute";function Ut(e,r){for(let i=e.length-1;i>=0;i--)typeof e[i]=="function"&&(e[i]=Ht(e[i],r+"_"+i));return e}function ye(e,r){let i=e.constructor.name;for(let n=0;n<r.length;n++){let s=r[n],l=e[s];if(l){let T=kt(e,s);if(!te(T))continue;e[s]=(g=>{let p=function(){return g.apply(this,Ut(arguments,i+"."+s))};return ut(p,g),p})(l)}}}function te(e){return e?e.writable===!1?!1:!(typeof e.get=="function"&&typeof e.set>"u"):!0}var ee=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,St=!("nw"in K)&&typeof K.process<"u"&&K.process.toString()==="[object process]",zt=!St&&!ee&&!!(Ct&&mt.HTMLElement),ne=typeof K.process<"u"&&K.process.toString()==="[object process]"&&!ee&&!!(Ct&&mt.HTMLElement),Nt={},Yt=function(e){if(e=e||K.event,!e)return;let r=Nt[e.type];r||(r=Nt[e.type]=H("ON_PROPERTY"+e.type));let i=this||e.target||K,n=i[r],s;if(zt&&i===mt&&e.type==="error"){let l=e;s=n&&n.call(this,l.message,l.filename,l.lineno,l.colno,l.error),s===!0&&e.preventDefault()}else s=n&&n.apply(this,arguments),s!=null&&!s&&e.preventDefault();return s};function Kt(e,r,i){let n=kt(e,r);if(!n&&i&&kt(i,r)&&(n={enumerable:!0,configurable:!0}),!n||!n.configurable)return;let s=H("on"+r+"patched");if(e.hasOwnProperty(s)&&e[s])return;delete n.writable,delete n.value;let l=n.get,T=n.set,g=r.slice(2),p=Nt[g];p||(p=Nt[g]=H("ON_PROPERTY"+g)),n.set=function(N){let E=this;if(!E&&e===K&&(E=K),!E)return;typeof E[p]=="function"&&E.removeEventListener(g,Yt),T&&T.call(E,null),E[p]=N,typeof N=="function"&&E.addEventListener(g,Yt,!1)},n.get=function(){let N=this;if(!N&&e===K&&(N=K),!N)return null;let E=N[p];if(E)return E;if(l){let A=l.call(this);if(A)return n.set.call(this,A),typeof N[pe]=="function"&&N.removeAttribute(r),A}return null},jt(e,r,n),e[s]=!0}function re(e,r,i){if(r)for(let n=0;n<r.length;n++)Kt(e,"on"+r[n],i);else{let n=[];for(let s in e)s.slice(0,2)=="on"&&n.push(s);for(let s=0;s<n.length;s++)Kt(e,n[s],i)}}var rt=H("originalInstance");function yt(e){let r=K[e];if(!r)return;K[H(e)]=r,K[e]=function(){let s=Ut(arguments,e);switch(s.length){case 0:this[rt]=new r;break;case 1:this[rt]=new r(s[0]);break;case 2:this[rt]=new r(s[0],s[1]);break;case 3:this[rt]=new r(s[0],s[1],s[2]);break;case 4:this[rt]=new r(s[0],s[1],s[2],s[3]);break;default:throw new Error("Arg list too long.")}},ut(K[e],r);let i=new r(function(){}),n;for(n in i)e==="XMLHttpRequest"&&n==="responseBlob"||function(s){typeof i[s]=="function"?K[e].prototype[s]=function(){return this[rt][s].apply(this[rt],arguments)}:jt(K[e].prototype,s,{set:function(l){typeof l=="function"?(this[rt][s]=Ht(l,e+"."+s),ut(this[rt][s],l)):this[rt][s]=l},get:function(){return this[rt][s]}})}(n);for(n in r)n!=="prototype"&&r.hasOwnProperty(n)&&(K[e][n]=r[n])}function lt(e,r,i){let n=e;for(;n&&!n.hasOwnProperty(r);)n=xt(n);!n&&e[r]&&(n=e);let s=H(r),l=null;if(n&&(!(l=n[s])||!n.hasOwnProperty(s))){l=n[s]=n[r];let T=n&&kt(n,r);if(te(T)){let g=i(l,s,r);n[r]=function(){return g(this,arguments)},ut(n[r],l)}}return l}function ke(e,r,i){let n=null;function s(l){let T=l.data;return T.args[T.cbIdx]=function(){l.invoke.apply(this,arguments)},n.apply(T.target,T.args),l}n=lt(e,r,l=>function(T,g){let p=i(T,g);return p.cbIdx>=0&&typeof g[p.cbIdx]=="function"?Bt(p.name,g[p.cbIdx],p,s):l.apply(T,g)})}function ut(e,r){e[H("OriginalDelegate")]=r}var Jt=!1,Lt=!1;function ve(){try{let e=mt.navigator.userAgent;if(e.indexOf("MSIE ")!==-1||e.indexOf("Trident/")!==-1)return!0}catch{}return!1}function be(){if(Jt)return Lt;Jt=!0;try{let e=mt.navigator.userAgent;(e.indexOf("MSIE ")!==-1||e.indexOf("Trident/")!==-1||e.indexOf("Edge/")!==-1)&&(Lt=!0)}catch{}return Lt}var Et=!1;if(typeof window<"u")try{let e=Object.defineProperty({},"passive",{get:function(){Et=!0}});window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch{Et=!1}var we={useG:!0},et={},oe={},se=new RegExp("^"+vt+"(\\w+)(true|false)$"),ie=H("propagationStopped");function ce(e,r){let i=(r?r(e):e)+at,n=(r?r(e):e)+ct,s=vt+i,l=vt+n;et[e]={},et[e][at]=s,et[e][ct]=l}function Pe(e,r,i,n){let s=n&&n.add||Zt,l=n&&n.rm||$t,T=n&&n.listeners||"eventListeners",g=n&&n.rmAll||"removeAllListeners",p=H(s),N="."+s+":",E="prependListener",A="."+E+":",P=function(v,d,B){if(v.isRemoved)return;let F=v.callback;typeof F=="object"&&F.handleEvent&&(v.callback=m=>F.handleEvent(m),v.originalDelegate=F);let X;try{v.invoke(v,d,[B])}catch(m){X=m}let U=v.options;if(U&&typeof U=="object"&&U.once){let m=v.originalDelegate?v.originalDelegate:v.callback;d[l].call(d,B.type,m,U)}return X};function Z(v,d,B){if(d=d||e.event,!d)return;let F=v||d.target||e,X=F[et[d.type][B?ct:at]];if(X){let U=[];if(X.length===1){let m=P(X[0],F,d);m&&U.push(m)}else{let m=X.slice();for(let z=0;z<m.length&&!(d&&d[ie]===!0);z++){let M=P(m[z],F,d);M&&U.push(M)}}if(U.length===1)throw U[0];for(let m=0;m<U.length;m++){let z=U[m];r.nativeScheduleMicroTask(()=>{throw z})}}}let V=function(v){return Z(this,v,!1)},$=function(v){return Z(this,v,!0)};function nt(v,d){if(!v)return!1;let B=!0;d&&d.useG!==void 0&&(B=d.useG);let F=d&&d.vh,X=!0;d&&d.chkDup!==void 0&&(X=d.chkDup);let U=!1;d&&d.rt!==void 0&&(U=d.rt);let m=v;for(;m&&!m.hasOwnProperty(s);)m=xt(m);if(!m&&v[s]&&(m=v),!m||m[p])return!1;let z=d&&d.eventNameToString,M={},R=m[p]=m[s],k=m[H(l)]=m[l],I=m[H(T)]=m[T],J=m[H(g)]=m[g],W;d&&d.prepend&&(W=m[H(d.prepend)]=m[d.prepend]);function L(o,c){return!Et&&typeof o=="object"&&o?!!o.capture:!Et||!c?o:typeof o=="boolean"?{capture:o,passive:!0}:o?typeof o=="object"&&o.passive!==!1?{...o,passive:!0}:o:{passive:!0}}let _=function(o){if(!M.isExisting)return R.call(M.target,M.eventName,M.capture?$:V,M.options)},a=function(o){if(!o.isRemoved){let c=et[o.eventName],f;c&&(f=c[o.capture?ct:at]);let b=f&&o.target[f];if(b){for(let C=0;C<b.length;C++)if(b[C]===o){b.splice(C,1),o.isRemoved=!0,b.length===0&&(o.allRemoved=!0,o.target[f]=null);break}}}if(o.allRemoved)return k.call(o.target,o.eventName,o.capture?$:V,o.options)},t=function(o){return R.call(M.target,M.eventName,o.invoke,M.options)},h=function(o){return W.call(M.target,M.eventName,o.invoke,M.options)},O=function(o){return k.call(o.target,o.eventName,o.invoke,o.options)},j=B?_:t,D=B?a:O,ft=function(o,c){let f=typeof c;return f==="function"&&o.callback===c||f==="object"&&o.originalDelegate===c},pt=d&&d.diff?d.diff:ft,ht=Zone[H("UNPATCHED_EVENTS")],bt=e[H("PASSIVE_EVENTS")],u=function(o,c,f,b,C=!1,y=!1){return function(){let w=this||e,S=arguments[0];d&&d.transferEventName&&(S=d.transferEventName(S));let x=arguments[1];if(!x)return o.apply(this,arguments);if(St&&S==="uncaughtException")return o.apply(this,arguments);let G=!1;if(typeof x!="function"){if(!x.handleEvent)return o.apply(this,arguments);G=!0}if(F&&!F(o,x,w,arguments))return;let Y=Et&&!!bt&&bt.indexOf(S)!==-1,Q=L(arguments[2],Y),_t=Q?.signal;if(_t?.aborted)return;if(ht){for(let st=0;st<ht.length;st++)if(S===ht[st])return Y?o.call(w,S,x,Q):o.apply(this,arguments)}let It=Q?typeof Q=="boolean"?!0:Q.capture:!1,Gt=Q&&typeof Q=="object"?Q.once:!1,fe=Zone.current,Ot=et[S];Ot||(ce(S,z),Ot=et[S]);let Vt=Ot[It?ct:at],Tt=w[Vt],Ft=!1;if(Tt){if(Ft=!0,X){for(let st=0;st<Tt.length;st++)if(pt(Tt[st],x))return}}else Tt=w[Vt]=[];let wt,Wt=w.constructor.name,qt=oe[Wt];qt&&(wt=qt[S]),wt||(wt=Wt+c+(z?z(S):S)),M.options=Q,Gt&&(M.options.once=!1),M.target=w,M.capture=It,M.eventName=S,M.isExisting=Ft;let dt=B?we:void 0;dt&&(dt.taskData=M),_t&&(M.options.signal=void 0);let ot=fe.scheduleEventTask(wt,x,dt,f,b);if(_t){M.options.signal=_t;let st=()=>ot.zone.cancelTask(ot);o.call(_t,"abort",st,{once:!0}),dt&&(dt.removeAbortListener=()=>_t.removeEventListener("abort",st))}if(M.target=null,dt&&(dt.taskData=null),Gt&&(Q.once=!0),!Et&&typeof ot.options=="boolean"||(ot.options=Q),ot.target=w,ot.capture=It,ot.eventName=S,G&&(ot.originalDelegate=x),y?Tt.unshift(ot):Tt.push(ot),C)return w}};return m[s]=u(R,N,j,D,U),W&&(m[E]=u(W,A,h,D,U,!0)),m[l]=function(){let o=this||e,c=arguments[0];d&&d.transferEventName&&(c=d.transferEventName(c));let f=arguments[2],b=f?typeof f=="boolean"?!0:f.capture:!1,C=arguments[1];if(!C)return k.apply(this,arguments);if(F&&!F(k,C,o,arguments))return;let y=et[c],w;y&&(w=y[b?ct:at]);let S=w&&o[w];if(S)for(let x=0;x<S.length;x++){let G=S[x];if(pt(G,C)){if(S.splice(x,1),G.isRemoved=!0,S.length===0&&(G.allRemoved=!0,o[w]=null,!b&&typeof c=="string")){let Q=vt+"ON_PROPERTY"+c;o[Q]=null}let Y=G.data;return Y?.removeAbortListener&&(Y.removeAbortListener(),Y.removeAbortListener=null),G.zone.cancelTask(G),U?o:void 0}}return k.apply(this,arguments)},m[T]=function(){let o=this||e,c=arguments[0];d&&d.transferEventName&&(c=d.transferEventName(c));let f=[],b=ae(o,z?z(c):c);for(let C=0;C<b.length;C++){let y=b[C],w=y.originalDelegate?y.originalDelegate:y.callback;f.push(w)}return f},m[g]=function(){let o=this||e,c=arguments[0];if(c){d&&d.transferEventName&&(c=d.transferEventName(c));let f=et[c];if(f){let b=f[at],C=f[ct],y=o[b],w=o[C];if(y){let S=y.slice();for(let x=0;x<S.length;x++){let G=S[x],Y=G.originalDelegate?G.originalDelegate:G.callback;this[l].call(this,c,Y,G.options)}}if(w){let S=w.slice();for(let x=0;x<S.length;x++){let G=S[x],Y=G.originalDelegate?G.originalDelegate:G.callback;this[l].call(this,c,Y,G.options)}}}}else{let f=Object.keys(o);for(let b=0;b<f.length;b++){let C=f[b],y=se.exec(C),w=y&&y[1];w&&w!=="removeListener"&&this[g].call(this,w)}this[g].call(this,"removeListener")}if(U)return this},ut(m[s],R),ut(m[l],k),J&&ut(m[g],J),I&&ut(m[T],I),!0}let q=[];for(let v=0;v<i.length;v++)q[v]=nt(i[v],n);return q}function ae(e,r){if(!r){let l=[];for(let T in e){let g=se.exec(T),p=g&&g[1];if(p&&(!r||p===r)){let N=e[T];if(N)for(let E=0;E<N.length;E++)l.push(N[E])}}return l}let i=et[r];i||(ce(r),i=et[r]);let n=e[i[at]],s=e[i[ct]];return n?s?n.concat(s):n.slice():s?s.slice():[]}function Re(e,r){let i=e.Event;i&&i.prototype&&r.patchMethod(i.prototype,"stopImmediatePropagation",n=>function(s,l){s[ie]=!0,n&&n.apply(s,l)})}function Ne(e,r){r.patchMethod(e,"queueMicrotask",i=>function(n,s){Zone.current.scheduleMicroTask("queueMicrotask",s[0])})}var Rt=H("zoneTask");function gt(e,r,i,n){let s=null,l=null;r+=n,i+=n;let T={};function g(N){let E=N.data;return E.args[0]=function(){return N.invoke.apply(this,arguments)},E.handleId=s.apply(e,E.args),N}function p(N){return l.call(e,N.data.handleId)}s=lt(e,r,N=>function(E,A){if(typeof A[0]=="function"){let P={isPeriodic:n==="Interval",delay:n==="Timeout"||n==="Interval"?A[1]||0:void 0,args:A},Z=A[0];A[0]=function(){try{return Z.apply(this,arguments)}finally{P.isPeriodic||(typeof P.handleId=="number"?delete T[P.handleId]:P.handleId&&(P.handleId[Rt]=null))}};let V=Bt(r,A[0],P,g,p);if(!V)return V;let $=V.data.handleId;return typeof $=="number"?T[$]=V:$&&($[Rt]=V),$&&$.ref&&$.unref&&typeof $.ref=="function"&&typeof $.unref=="function"&&(V.ref=$.ref.bind($),V.unref=$.unref.bind($)),typeof $=="number"||$?$:V}else return N.apply(e,A)}),l=lt(e,i,N=>function(E,A){let P=A[0],Z;typeof P=="number"?Z=T[P]:(Z=P&&P[Rt],Z||(Z=P)),Z&&typeof Z.type=="string"?Z.state!=="notScheduled"&&(Z.cancelFn&&Z.data.isPeriodic||Z.runCount===0)&&(typeof P=="number"?delete T[P]:P&&(P[Rt]=null),Z.zone.cancelTask(Z)):N.apply(e,A)})}function Ce(e,r){let{isBrowser:i,isMix:n}=r.getGlobalObjects();if(!i&&!n||!e.customElements||!("customElements"in e))return;let s=["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"];r.patchCallbacks(r,e.customElements,"customElements","define",s)}function Se(e,r){if(Zone[r.symbol("patchEventTarget")])return;let{eventNames:i,zoneSymbolEventNames:n,TRUE_STR:s,FALSE_STR:l,ZONE_SYMBOL_PREFIX:T}=r.getGlobalObjects();for(let p=0;p<i.length;p++){let N=i[p],E=N+l,A=N+s,P=T+E,Z=T+A;n[N]={},n[N][l]=P,n[N][s]=Z}let g=e.EventTarget;if(!(!g||!g.prototype))return r.patchEventTarget(e,r,[g&&g.prototype]),!0}function Ie(e,r){r.patchEventPrototype(e,r)}function le(e,r,i){if(!i||i.length===0)return r;let n=i.filter(l=>l.target===e);if(!n||n.length===0)return r;let s=n[0].ignoreProperties;return r.filter(l=>s.indexOf(l)===-1)}function Qt(e,r,i,n){if(!e)return;let s=le(e,r,i);re(e,s,n)}function At(e){return Object.getOwnPropertyNames(e).filter(r=>r.startsWith("on")&&r.length>2).map(r=>r.substring(2))}function Oe(e,r){if(St&&!ne||Zone[e.symbol("patchEvents")])return;let i=r.__Zone_ignore_on_properties,n=[];if(zt){let s=window;n=n.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);let l=ve()?[{target:s,ignoreProperties:["error"]}]:[];Qt(s,At(s),i&&i.concat(l),xt(s))}n=n.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let s=0;s<n.length;s++){let l=r[n[s]];l&&l.prototype&&Qt(l.prototype,At(l.prototype),i)}}function De(e){e.__load_patch("legacy",r=>{let i=r[e.__symbol__("legacyPatch")];i&&i()}),e.__load_patch("timers",r=>{let i="set",n="clear";gt(r,i,n,"Timeout"),gt(r,i,n,"Interval"),gt(r,i,n,"Immediate")}),e.__load_patch("requestAnimationFrame",r=>{gt(r,"request","cancel","AnimationFrame"),gt(r,"mozRequest","mozCancel","AnimationFrame"),gt(r,"webkitRequest","webkitCancel","AnimationFrame")}),e.__load_patch("blocking",(r,i)=>{let n=["alert","prompt","confirm"];for(let s=0;s<n.length;s++){let l=n[s];lt(r,l,(T,g,p)=>function(N,E){return i.current.run(T,r,E,p)})}}),e.__load_patch("EventTarget",(r,i,n)=>{Ie(r,n),Se(r,n);let s=r.XMLHttpRequestEventTarget;s&&s.prototype&&n.patchEventTarget(r,n,[s.prototype])}),e.__load_patch("MutationObserver",(r,i,n)=>{yt("MutationObserver"),yt("WebKitMutationObserver")}),e.__load_patch("IntersectionObserver",(r,i,n)=>{yt("IntersectionObserver")}),e.__load_patch("FileReader",(r,i,n)=>{yt("FileReader")}),e.__load_patch("on_property",(r,i,n)=>{Oe(n,r)}),e.__load_patch("customElements",(r,i,n)=>{Ce(r,n)}),e.__load_patch("XHR",(r,i)=>{N(r);let n=H("xhrTask"),s=H("xhrSync"),l=H("xhrListener"),T=H("xhrScheduled"),g=H("xhrURL"),p=H("xhrErrorBeforeScheduled");function N(E){let A=E.XMLHttpRequest;if(!A)return;let P=A.prototype;function Z(R){return R[n]}let V=P[Dt],$=P[Mt];if(!V){let R=E.XMLHttpRequestEventTarget;if(R){let k=R.prototype;V=k[Dt],$=k[Mt]}}let nt="readystatechange",q="scheduled";function v(R){let k=R.data,I=k.target;I[T]=!1,I[p]=!1;let J=I[l];V||(V=I[Dt],$=I[Mt]),J&&$.call(I,nt,J);let W=I[l]=()=>{if(I.readyState===I.DONE)if(!k.aborted&&I[T]&&R.state===q){let _=I[i.__symbol__("loadfalse")];if(I.status!==0&&_&&_.length>0){let a=R.invoke;R.invoke=function(){let t=I[i.__symbol__("loadfalse")];for(let h=0;h<t.length;h++)t[h]===R&&t.splice(h,1);!k.aborted&&R.state===q&&a.call(R)},_.push(R)}else R.invoke()}else!k.aborted&&I[T]===!1&&(I[p]=!0)};return V.call(I,nt,W),I[n]||(I[n]=R),z.apply(I,k.args),I[T]=!0,R}function d(){}function B(R){let k=R.data;return k.aborted=!0,M.apply(k.target,k.args)}let F=lt(P,"open",()=>function(R,k){return R[s]=k[2]==!1,R[g]=k[1],F.apply(R,k)}),X="XMLHttpRequest.send",U=H("fetchTaskAborting"),m=H("fetchTaskScheduling"),z=lt(P,"send",()=>function(R,k){if(i.current[m]===!0||R[s])return z.apply(R,k);{let I={target:R,url:R[g],isPeriodic:!1,args:k,aborted:!1},J=Bt(X,d,I,v,B);R&&R[p]===!0&&!I.aborted&&J.state===q&&J.invoke()}}),M=lt(P,"abort",()=>function(R,k){let I=Z(R);if(I&&typeof I.type=="string"){if(I.cancelFn==null||I.data&&I.data.aborted)return;I.zone.cancelTask(I)}else if(i.current[U]===!0)return M.apply(R,k)})}}),e.__load_patch("geolocation",r=>{r.navigator&&r.navigator.geolocation&&ye(r.navigator.geolocation,["getCurrentPosition","watchPosition"])}),e.__load_patch("PromiseRejectionEvent",(r,i)=>{function n(s){return function(l){ae(r,s).forEach(g=>{let p=r.PromiseRejectionEvent;if(p){let N=new p(s,{promise:l.promise,reason:l.rejection});g.invoke(N)}})}}r.PromiseRejectionEvent&&(i[H("unhandledPromiseRejectionHandler")]=n("unhandledrejection"),i[H("rejectionHandledHandler")]=n("rejectionhandled"))}),e.__load_patch("queueMicrotask",(r,i,n)=>{Ne(r,n)})}function Me(e){e.__load_patch("ZoneAwarePromise",(r,i,n)=>{let s=Object.getOwnPropertyDescriptor,l=Object.defineProperty;function T(u){if(u&&u.toString===Object.prototype.toString){let o=u.constructor&&u.constructor.name;return(o||"")+": "+JSON.stringify(u)}return u?u.toString():Object.prototype.toString.call(u)}let g=n.symbol,p=[],N=r[g("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")]!==!1,E=g("Promise"),A=g("then"),P="__creationTrace__";n.onUnhandledError=u=>{if(n.showUncaughtError()){let o=u&&u.rejection;o?console.error("Unhandled Promise rejection:",o instanceof Error?o.message:o,"; Zone:",u.zone.name,"; Task:",u.task&&u.task.source,"; Value:",o,o instanceof Error?o.stack:void 0):console.error(u)}},n.microtaskDrainDone=()=>{for(;p.length;){let u=p.shift();try{u.zone.runGuarded(()=>{throw u.throwOriginal?u.rejection:u})}catch(o){V(o)}}};let Z=g("unhandledPromiseRejectionHandler");function V(u){n.onUnhandledError(u);try{let o=i[Z];typeof o=="function"&&o.call(this,u)}catch{}}function $(u){return u&&u.then}function nt(u){return u}function q(u){return D.reject(u)}let v=g("state"),d=g("value"),B=g("finally"),F=g("parentPromiseValue"),X=g("parentPromiseState"),U="Promise.then",m=null,z=!0,M=!1,R=0;function k(u,o){return c=>{try{L(u,o,c)}catch(f){L(u,!1,f)}}}let I=function(){let u=!1;return function(c){return function(){u||(u=!0,c.apply(null,arguments))}}},J="Promise resolved with itself",W=g("currentTaskTrace");function L(u,o,c){let f=I();if(u===c)throw new TypeError(J);if(u[v]===m){let b=null;try{(typeof c=="object"||typeof c=="function")&&(b=c&&c.then)}catch(C){return f(()=>{L(u,!1,C)})(),u}if(o!==M&&c instanceof D&&c.hasOwnProperty(v)&&c.hasOwnProperty(d)&&c[v]!==m)a(c),L(u,c[v],c[d]);else if(o!==M&&typeof b=="function")try{b.call(c,f(k(u,o)),f(k(u,!1)))}catch(C){f(()=>{L(u,!1,C)})()}else{u[v]=o;let C=u[d];if(u[d]=c,u[B]===B&&o===z&&(u[v]=u[X],u[d]=u[F]),o===M&&c instanceof Error){let y=i.currentTask&&i.currentTask.data&&i.currentTask.data[P];y&&l(c,W,{configurable:!0,enumerable:!1,writable:!0,value:y})}for(let y=0;y<C.length;)t(u,C[y++],C[y++],C[y++],C[y++]);if(C.length==0&&o==M){u[v]=R;let y=c;try{throw new Error("Uncaught (in promise): "+T(c)+(c&&c.stack?`
`+c.stack:""))}catch(w){y=w}N&&(y.throwOriginal=!0),y.rejection=c,y.promise=u,y.zone=i.current,y.task=i.currentTask,p.push(y),n.scheduleMicroTask()}}}return u}let _=g("rejectionHandledHandler");function a(u){if(u[v]===R){try{let o=i[_];o&&typeof o=="function"&&o.call(this,{rejection:u[d],promise:u})}catch{}u[v]=M;for(let o=0;o<p.length;o++)u===p[o].promise&&p.splice(o,1)}}function t(u,o,c,f,b){a(u);let C=u[v],y=C?typeof f=="function"?f:nt:typeof b=="function"?b:q;o.scheduleMicroTask(U,()=>{try{let w=u[d],S=!!c&&B===c[B];S&&(c[F]=w,c[X]=C);let x=o.run(y,void 0,S&&y!==q&&y!==nt?[]:[w]);L(c,!0,x)}catch(w){L(c,!1,w)}},c)}let h="function ZoneAwarePromise() { [native code] }",O=function(){},j=r.AggregateError;class D{static toString(){return h}static resolve(o){return o instanceof D?o:L(new this(null),z,o)}static reject(o){return L(new this(null),M,o)}static withResolvers(){let o={};return o.promise=new D((c,f)=>{o.resolve=c,o.reject=f}),o}static any(o){if(!o||typeof o[Symbol.iterator]!="function")return Promise.reject(new j([],"All promises were rejected"));let c=[],f=0;try{for(let y of o)f++,c.push(D.resolve(y))}catch{return Promise.reject(new j([],"All promises were rejected"))}if(f===0)return Promise.reject(new j([],"All promises were rejected"));let b=!1,C=[];return new D((y,w)=>{for(let S=0;S<c.length;S++)c[S].then(x=>{b||(b=!0,y(x))},x=>{C.push(x),f--,f===0&&(b=!0,w(new j(C,"All promises were rejected")))})})}static race(o){let c,f,b=new this((w,S)=>{c=w,f=S});function C(w){c(w)}function y(w){f(w)}for(let w of o)$(w)||(w=this.resolve(w)),w.then(C,y);return b}static all(o){return D.allWithCallback(o)}static allSettled(o){return(this&&this.prototype instanceof D?this:D).allWithCallback(o,{thenCallback:f=>({status:"fulfilled",value:f}),errorCallback:f=>({status:"rejected",reason:f})})}static allWithCallback(o,c){let f,b,C=new this((x,G)=>{f=x,b=G}),y=2,w=0,S=[];for(let x of o){$(x)||(x=this.resolve(x));let G=w;try{x.then(Y=>{S[G]=c?c.thenCallback(Y):Y,y--,y===0&&f(S)},Y=>{c?(S[G]=c.errorCallback(Y),y--,y===0&&f(S)):b(Y)})}catch(Y){b(Y)}y++,w++}return y-=2,y===0&&f(S),C}constructor(o){let c=this;if(!(c instanceof D))throw new Error("Must be an instanceof Promise.");c[v]=m,c[d]=[];try{let f=I();o&&o(f(k(c,z)),f(k(c,M)))}catch(f){L(c,!1,f)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return D}then(o,c){let f=this.constructor?.[Symbol.species];(!f||typeof f!="function")&&(f=this.constructor||D);let b=new f(O),C=i.current;return this[v]==m?this[d].push(C,b,o,c):t(this,C,b,o,c),b}catch(o){return this.then(null,o)}finally(o){let c=this.constructor?.[Symbol.species];(!c||typeof c!="function")&&(c=D);let f=new c(O);f[B]=B;let b=i.current;return this[v]==m?this[d].push(b,f,o,o):t(this,b,f,o,o),f}}D.resolve=D.resolve,D.reject=D.reject,D.race=D.race,D.all=D.all;let ft=r[E]=r.Promise;r.Promise=D;let pt=g("thenPatched");function ht(u){let o=u.prototype,c=s(o,"then");if(c&&(c.writable===!1||!c.configurable))return;let f=o.then;o[A]=f,u.prototype.then=function(b,C){return new D((w,S)=>{f.call(this,w,S)}).then(b,C)},u[pt]=!0}n.patchThen=ht;function bt(u){return function(o,c){let f=u.apply(o,c);if(f instanceof D)return f;let b=f.constructor;return b[pt]||ht(b),f}}return ft&&(ht(ft),lt(r,"fetch",u=>bt(u))),Promise[i.__symbol__("uncaughtPromiseErrors")]=p,D})}function Le(e){e.__load_patch("toString",r=>{let i=Function.prototype.toString,n=H("OriginalDelegate"),s=H("Promise"),l=H("Error"),T=function(){if(typeof this=="function"){let E=this[n];if(E)return typeof E=="function"?i.call(E):Object.prototype.toString.call(E);if(this===Promise){let A=r[s];if(A)return i.call(A)}if(this===Error){let A=r[l];if(A)return i.call(A)}}return i.call(this)};T[n]=i,Function.prototype.toString=T;let g=Object.prototype.toString,p="[object Promise]";Object.prototype.toString=function(){return typeof Promise=="function"&&this instanceof Promise?p:g.call(this)}})}function Ae(e,r,i,n,s){let l=Zone.__symbol__(n);if(r[l])return;let T=r[l]=r[n];r[n]=function(g,p,N){return p&&p.prototype&&s.forEach(function(E){let A=`${i}.${n}::`+E,P=p.prototype;try{if(P.hasOwnProperty(E)){let Z=e.ObjectGetOwnPropertyDescriptor(P,E);Z&&Z.value?(Z.value=e.wrapWithCurrentZone(Z.value,A),e._redefineProperty(p.prototype,E,Z)):P[E]&&(P[E]=e.wrapWithCurrentZone(P[E],A))}else P[E]&&(P[E]=e.wrapWithCurrentZone(P[E],A))}catch{}}),T.call(r,g,p,N)},e.attachOriginToPatched(r[n],T)}function je(e){e.__load_patch("util",(r,i,n)=>{let s=At(r);n.patchOnProperties=re,n.patchMethod=lt,n.bindArguments=Ut,n.patchMacroTask=ke;let l=i.__symbol__("BLACK_LISTED_EVENTS"),T=i.__symbol__("UNPATCHED_EVENTS");r[T]&&(r[l]=r[T]),r[l]&&(i[l]=i[T]=r[l]),n.patchEventPrototype=Re,n.patchEventTarget=Pe,n.isIEOrEdge=be,n.ObjectDefineProperty=jt,n.ObjectGetOwnPropertyDescriptor=kt,n.ObjectCreate=Ee,n.ArraySlice=me,n.patchClass=yt,n.wrapWithCurrentZone=Ht,n.filterProperties=le,n.attachOriginToPatched=ut,n._redefineProperty=Object.defineProperty,n.patchCallbacks=Ae,n.getGlobalObjects=()=>({globalSources:oe,zoneSymbolEventNames:et,eventNames:s,isBrowser:zt,isMix:ne,isNode:St,TRUE_STR:ct,FALSE_STR:at,ZONE_SYMBOL_PREFIX:vt,ADD_EVENT_LISTENER_STR:Zt,REMOVE_EVENT_LISTENER_STR:$t})})}function xe(e){Me(e),Le(e),je(e)}var ue=ge();xe(ue);De(ue);
