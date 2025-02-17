import{f as _,g as i,v as d,b as m,n as g,o as f}from"./vue.esm-bundler-CkQ95Jc9.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";const O=["type","required"],R=["type","placeholder","required"],D={__name:"Input",props:{type:String,placeholder:String,class:{type:String,default:"input"},required:{type:Boolean,default:!1}},emits:["inputValue"],setup(e,{emit:B}){const l=e,C=B,t=_(""),p=c=>{t.value=c.target.value,C("inputValue",t.value)};return(c,s)=>l.type==="checkbox"||l.type==="radio"?i((f(),m("input",{key:0,onBlur:p,"onUpdate:modelValue":s[0]||(s[0]=o=>t.value=o),class:g(e.class),type:e.type,required:e.required},null,42,O)),[[d,t.value]]):i((f(),m("input",{key:1,onBlur:p,"onUpdate:modelValue":s[1]||(s[1]=o=>t.value=o),class:g(e.class),type:e.type,placeholder:e.placeholder,required:e.required},null,42,R)),[[d,t.value]])}},S=E(D,[["__scopeId","data-v-fdf0a8d8"]]);D.__docgenInfo={exportName:"default",displayName:"Input",description:"",tags:{},props:[{name:"type",type:{name:"string"}},{name:"placeholder",type:{name:"string"}},{name:"class",type:{name:"string"},defaultValue:{func:!1,value:'"input"'}},{name:"required",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"inputValue"}],sourceFiles:["D:/WORK/EDTEXCO/vue-10_02_2025_login/src/components/Input.vue"]};const N={title:"My Components/Input",tags:["autodocs"],component:S,argTypes:{type:{control:"text"},placeholder:{control:"text"},class:{control:"text"},required:{control:"boolean"}}},u=e=>({components:{Input:S},setup(){return{args:e}},template:"<Input v-bind='args'/>"}),n=u.bind({});n.args={type:"text",placeholder:"Input here",class:"input",required:!1};const a=u.bind({});a.args={type:"checkbox",class:"input",required:!1};const r=u.bind({});r.args={type:"radio",class:"input",required:!1};var y,v,I;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: "<Input v-bind='args'/>"
})`,...(I=(v=n.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};var b,x,h;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: "<Input v-bind='args'/>"
})`,...(h=(x=a.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var q,V,k;r.parameters={...r.parameters,docs:{...(q=r.parameters)==null?void 0:q.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return {
      args
    };
  },
  template: "<Input v-bind='args'/>"
})`,...(k=(V=r.parameters)==null?void 0:V.docs)==null?void 0:k.source}}};const U=["Default","Checkbox","Radio"];export{a as Checkbox,n as Default,r as Radio,U as __namedExportsOrder,N as default};
