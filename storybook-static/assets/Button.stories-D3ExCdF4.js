import{b as y,d as B,e as x,t as C,n as D,o as _}from"./vue.esm-bundler-CkQ95Jc9.js";import{_ as v}from"./_plugin-vue_export-helper-DlAUqK2U.js";const S=["type","disabled"],b={__name:"Button",props:{type:{type:String,default:"button"},text:{type:String,default:"Click me!"},btnClass:{type:String,default:"btn"},isDisable:{type:Boolean,default:!1}},setup(t){return(f,O)=>(_(),y("button",{class:D([t.btnClass,{"btn-disable":t.isDisable}]),type:t.type,disabled:t.isDisable},[B(f.$slots,"default",{class:"slot"},void 0,!0),x(C(t.text),1)],10,S))}},g=v(b,[["__scopeId","data-v-256de54b"]]);b.__docgenInfo={exportName:"default",displayName:"Button",description:"",tags:{},props:[{name:"type",type:{name:"string"},defaultValue:{func:!1,value:'"button"'}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:'"Click me!"'}},{name:"btnClass",type:{name:"string"},defaultValue:{func:!1,value:'"btn"'}},{name:"isDisable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",scoped:!0,bindings:[{name:"class",title:"binding"}]}],sourceFiles:["D:/WORK/EDTEXCO/vue-10_02_2025_login/src/components/Button.vue"]};const E={title:"My Components/Button",component:g,tags:["autodocs"],argTypes:{type:{control:"text"},text:{control:"text"},btnClass:{control:"text"},isDisable:{control:"boolean"}}},a=t=>({components:{Button:g},setup(){return{args:t}},template:'<Button v-bind="args" />'}),e=a.bind({});e.args={text:"Primary Button",btnClass:"btn btn-primary"};const n=a.bind({});n.args={text:"Outline Button",btnClass:"btn btn-outline"};const s=a.bind({});s.args={text:"Disabled Button",btnClass:"btn btn-primary",isDisable:!0};var o,r,l;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`args => ({
  components: {
    Button
  },
  setup() {
    return {
      args
    };
  },
  template: '<Button v-bind="args" />'
})`,...(l=(r=e.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};var u,i,c;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
  components: {
    Button
  },
  setup() {
    return {
      args
    };
  },
  template: '<Button v-bind="args" />'
})`,...(c=(i=n.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var d,p,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  components: {
    Button
  },
  setup() {
    return {
      args
    };
  },
  template: '<Button v-bind="args" />'
})`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const T=["Primary","Outline","Disabled"];export{s as Disabled,n as Outline,e as Primary,T as __namedExportsOrder,E as default};
