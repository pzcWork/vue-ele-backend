webpackJsonp([14],{akhs:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("x66N"),i=r.n(a);for(var l in a)"default"!==l&&function(e){r.d(t,e,function(){return a[e]})}(l);var o=r("s3qh");var n=function(e){r("vZBH")},s=r("VU/8")(i.a,o.a,!1,n,"data-v-e2f61208",null);t.default=s.exports},s3qh:function(e,t,r){"use strict";var a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-card",{attrs:{shadow:"never"}},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v(e._s(e.id?"官网banner编辑":"官网banner新增"))])]),e._v(" "),r("el-form",[r("el-form",{ref:"form",attrs:{id:"form","label-position":"left",rules:e.rules,model:e.form,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"类型:",prop:"btype"}},[r("el-radio",{attrs:{label:"1"},model:{value:e.form.btype,callback:function(t){e.$set(e.form,"btype",t)},expression:"form.btype"}},[e._v("PC")]),e._v(" "),r("el-radio",{attrs:{label:"2"},model:{value:e.form.btype,callback:function(t){e.$set(e.form,"btype",t)},expression:"form.btype"}},[e._v("Moblie")])],1),e._v(" "),r("el-form-item",{attrs:{label:"标题:",prop:"title"}},[r("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"上传图片:",prop:"image"}},[r("el-input",{attrs:{type:"hidden"},model:{value:e.form.image,callback:function(t){e.$set(e.form,"image",t)},expression:"form.image"}}),e._v(" "),r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/handle_banner","show-file-list":!1,name:"files","on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.image?r("img",{staticClass:"avatar",attrs:{src:e.image}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),r("el-form-item",{attrs:{label:"中英文:",prop:"lang"}},[r("el-radio",{attrs:{label:"cn"},model:{value:e.form.lang,callback:function(t){e.$set(e.form,"lang",t)},expression:"form.lang"}},[e._v("中文")]),e._v(" "),r("el-radio",{attrs:{label:"en"},model:{value:e.form.lang,callback:function(t){e.$set(e.form,"lang",t)},expression:"form.lang"}},[e._v("英文")])],1),e._v(" "),r("el-form-item",{attrs:{label:"链接地址:",prop:"url"}},[r("el-input",{model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"权重:",prop:"weight"}},[r("el-input",{model:{value:e.form.weight,callback:function(t){e.$set(e.form,"weight",t)},expression:"form.weight"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否展示:",prop:"isShow"}},[r("el-radio",{attrs:{label:!0},model:{value:e.form.isShow,callback:function(t){e.$set(e.form,"isShow",t)},expression:"form.isShow"}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:!1},model:{value:e.form.isShow,callback:function(t){e.$set(e.form,"isShow",t)},expression:"form.isShow"}},[e._v("否")])],1),e._v(" "),r("el-form-item",[e.id?r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("立即修改")]):r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("立即提交")]),e._v(" "),r("router-link",{attrs:{to:"/banner"}},[r("el-button",[e._v("取消")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};t.a=a},vZBH:function(e,t){},x66N:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,i=r("woOf"),l=(a=i)&&a.__esModule?a:{default:a};r("NYxO");t.default={name:"banner",data:function(){return{pctitle:"PC端banner新增",mbtitle:"移动端banner新增",form:{isShow:!0,btype:"1",lang:"cn",image:"",title:""},rules:{btype:[{required:!0,message:"请选择类型",trigger:"blur"}],title:[{required:!0,message:"请输入标题",trigger:"blur"}],lang:[{required:!0,message:"请选择语言",trigger:"blur"}],image:[{required:!0,message:"请选择上传图片",trigger:"blur"}],url:[{required:!0,message:"请输入url链接",trigger:"blur"}],weight:[{required:!0,message:"请输入权重",trigger:"blur"}]},image:"",sendUrl:"",id:""}},computed:{},methods:{add_banner:function(){},handleAvatarSuccess:function(e,t){this.sendUrl=e.data.url,this.image=URL.createObjectURL(t.raw),this.form.image=e.data.url},onSubmit:function(){var e=this,t=void 0;this.$refs.form.validate(function(r){if(r){var a={notice:e.id?"更新成功！":"新增成功！"};(0,l.default)(a,e.form),e.id?(t="/admin/banner/update",(0,l.default)(a,{id:e.id})):t="/admin/banner/add",e.$api(t,a).then(function(t){0==t.code&&e.$router.push("/banner")})}})},onUpdate:function(){},getBannerDetail:function(e){var t=this;this.$api("/admin/banner/get",{id:e}).then(function(e){if(0==e.code){var r=e.data;t.form.image=r.Image,t.image=r.Image,t.form.isShow=r.IsShow,t.form.lang=r.Lang,t.form.title=r.Title,t.form.btype=r.Type+"",t.form.url=r.URL,t.form.weight=r.Weight}})},beforeAvatarUpload:function(e){var t="image/jpeg"==e.type||"image/png"==e.type||"image/jpg"==e.type,r=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 或者 PNG 格式!"),r||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&r}},created:function(){this.id=this.$route.query.id,this.id&&this.getBannerDetail(this.id)}}}});
//# sourceMappingURL=14.a5f063c9644d2d605094.js.map