webpackJsonp([21],{"+TCU":function(t,i){},"/VnN":function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=s("AH0u"),e=s.n(a);for(var l in a)"default"!==l&&function(t){s.d(i,t,function(){return a[t]})}(l);var v=s("YBdz");var r=function(t){s("+TCU")},d=s("VU/8")(e.a,v.a,!1,r,"data-v-2491f021",null);i.default=d.exports},AH0u:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"",data:function(){return{form:{DefaultAttr:{}},lang:""}},methods:{la:function(t,i){return"cn"==this.lang?t:"en"==this.lang?i:""},detailLang:function(t){this.lang=t},getDetail:function(t){var i=this,s={product_id:t};this.$api("/admin/product/info",s).then(function(t){i.form=t.data})},edit:function(t){this.$router.push("/productmanage/product_insert?id="+t)}},created:function(){this.getDetail(this.$route.params.id)}}},YBdz:function(t,i,s){"use strict";var a={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"all_com"},[s("div",{staticClass:"title_com"},[t._v("商品管理")]),t._v(" "),s("el-card",{staticClass:"box-card",attrs:{"body-style":{"background-color":"#ffffff"}}},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[t._v("商品信息")])]),t._v(" "),s("div",{staticClass:"detail"},[s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v("商品类型")]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t.form.Name))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v("线上库存")]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t.form.DefaultAttr.OriStock))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v("线下库存")]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t.form.DefaultAttr.OriOfflineStock))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v("线上剩余库存")]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t.form.DefaultAttr.InStock))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v("线下剩余库存")]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t.form.DefaultAttr.OfflineStock))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v("重量")]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t.form.DefaultAttr.Weight))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v("开售时间")]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t._f("date")(t.form.PutAwayTime)))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v("商品详情 ")]),t._v(" "),s("div",{staticClass:"item-right"},[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.detailLang("cn")}}},[t._v("\n                        中文\n                    ")]),t._v(" "),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.detailLang("en")}}},[t._v("\n                        英文\n                    ")])],1)])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:""!=this.lang,expression:'this.lang!=""'}],staticClass:"detail top-20"},[s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v(t._s(t.la("商品名","Product Name")))]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t.la(t.form.Name,t.form.EnglishName)))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v(t._s(t.la("商品描述","Description")))]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t.la(t.form.Description,t.form.EnglishDescription)))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v(t._s(t.la("单价","Price")))]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t.la(t.form.DefaultAttr.Price,t.form.DefaultAttr.UsdPrice)))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v(t._s(t.la("发货时间","Delivery Time")))]),t._v(" "),s("div",{staticClass:"item-right"},[t._v(t._s(t._f("date")(t.form.DeliveryTime)))])]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left",staticStyle:{"border-right":"none"}},[t._v(t._s(t.la("详情","Detail")))]),t._v(" "),s("div",{staticClass:"item-right",staticStyle:{"border-left":"1px solid #ddd"},domProps:{innerHTML:t._s(t.la(t.form.Details,t.form.EnglishDetails))}})]),t._v(" "),s("div",{staticClass:"detail-item"},[s("div",{staticClass:"item-left"},[t._v(t._s(t.la("操作","Action")))]),t._v(" "),s("div",{staticClass:"item-right"},[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.edit(t.form.ID)}}},[t._v("\n                        "+t._s(t.la("编辑","edit"))+"\n                    ")])],1)])])])],1)},staticRenderFns:[]};i.a=a}});
//# sourceMappingURL=21.85ec153eac7d67178a8b.js.map