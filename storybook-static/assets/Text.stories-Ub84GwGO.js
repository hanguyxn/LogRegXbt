import{b as T,t as _,n as f,o as y}from"./vue.esm-bundler-CkQ95Jc9.js";import{_ as S}from"./_plugin-vue_export-helper-DlAUqK2U.js";const i={__name:"Text",props:{text:{type:String},textType:{type:String,default:"custom-text"}},setup(s){return(b,v)=>(y(),T("p",{class:f(s.textType)},_(s.text),3))}},d=S(i,[["__scopeId","data-v-2e27234d"]]);i.__docgenInfo={exportName:"default",displayName:"Text",description:"",tags:{},props:[{name:"text",type:{name:"string"}},{name:"textType",type:{name:"string"},defaultValue:{func:!1,value:'"custom-text"'}}],sourceFiles:["D:/WORK/EDTEXCO/vue-10_02_2025_login/src/components/Text.vue"]};const C={title:"My Components/Text",component:d,tags:["autodocs"],argTypes:{text:{control:"text"},textType:{control:"text"}}},a=s=>({components:{Text:d},setup(){return{args:s}},template:'<Text v-bind="args" />'}),e=a.bind({});e.args={text:"Default Text"};const t=a.bind({});t.args={text:"Larger Text",textType:"larger"};const r=a.bind({});r.args={text:"Small Text",textType:"small"};var n,o,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`args => ({
  components: {
    Text
  },
  setup() {
    return {
      args
    };
  },
  template: '<Text v-bind="args" />'
})`,...(p=(o=e.parameters)==null?void 0:o.docs)==null?void 0:p.source}}};var c,m,l;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    Text
  },
  setup() {
    return {
      args
    };
  },
  template: '<Text v-bind="args" />'
})`,...(l=(m=t.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var x,u,g;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`args => ({
  components: {
    Text
  },
  setup() {
    return {
      args
    };
  },
  template: '<Text v-bind="args" />'
})`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const L=["Default","Larger","Small"];export{e as Default,t as Larger,r as Small,L as __namedExportsOrder,C as default};
