webpackJsonp([6],{"5gfz":function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"all_com"},[n("div",{staticClass:"title_com"},[n("span",[t._v("线下用户列表")]),t._v(" "),n("br"),t._v(" "),n("br"),t._v(" "),n("span",{staticStyle:{"font-size":"20px"}},[t._v("共"+t._s(this.userNum)+"个")])]),t._v(" "),n("div",{staticClass:"offline_user_seach"},[n("span",[t._v("用户名：")]),t._v(" "),n("el-input",{staticStyle:{width:"100px"},attrs:{placeholder:"请输入内容",size:"small"},model:{value:t.input_account,callback:function(e){t.input_account=e},expression:"input_account"}}),t._v(" "),n("span",[t._v("邮箱：")]),t._v(" "),n("el-input",{staticStyle:{width:"100px"},attrs:{placeholder:"请输入内容",size:"small"},model:{value:t.input_email,callback:function(e){t.input_email=e},expression:"input_email"}}),t._v(" "),n("span",[t._v("手机：")]),t._v(" "),n("el-input",{staticStyle:{width:"100px"},attrs:{placeholder:"请输入内容",size:"small"},model:{value:t.input_mobile,callback:function(e){t.input_mobile=e},expression:"input_mobile"}}),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.offlineUserSeach}},[t._v("搜索")])],1),t._v(" "),n("div",{staticClass:"offline_user_list"},[n("el-button",{staticStyle:{"margin-bottom":"20px"},on:{click:function(e){t.newuserdialog=!0}}},[t._v("+新建用户")]),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:this.offlineUserList,stripe:""}},[n("el-table-column",{attrs:{prop:"Account",label:"用户名"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{staticClass:"account_detail",attrs:{to:{path:"/offlinemanager/offline_user_info",query:{accountId:e.row.Id}}}},[t._v("\n                        "+t._s(e.row.Account)+"\n                    ")])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"Email",label:"邮箱"}}),t._v(" "),n("el-table-column",{attrs:{prop:"PhoneNumber",label:"手机"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s("+"+e.row.PhonePrefix+" "+e.row.PhoneNumber)+"\n                ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"OrderAmount",label:"总订单数"}}),t._v(" "),n("el-table-column",{attrs:{prop:"GoodsAmount",label:"总台数"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{staticClass:"account_detail",attrs:{to:{path:"/offlinemanager/offline_order_list",query:{account:e.row.Account,accountId:e.row.Id}}}},[t._v("\n                        查看订单\n                    ")]),t._v("\n                    |\n                    "),n("router-link",{staticClass:"account_detail",attrs:{to:{path:"/offlinemanager/offline_input",query:{accountId:e.row.Id}}}},[t._v("\n                        录入订单\n                    ")])]}}])})],1)],1),t._v(" "),n("el-dialog",{attrs:{title:"新建用户",visible:t.newuserdialog,width:"30%"},on:{"update:visible":function(e){t.newuserdialog=e}}},[n("div",[""==this.new_input_account?n("span",{staticStyle:{"margin-left":"60px",color:"#26507B"}},[t._v("请输入用户名")]):0==this.returnAccount.code?n("span",{staticStyle:{"margin-left":"60px",color:"green"}},[t._v("本用户名可用")]):2==this.returnAccount.code&&""!=this.new_input_account?n("span",{staticStyle:{"margin-left":"60px",color:"red"}},[t._v("用户名格式不对")]):12001==this.returnAccount.code?n("span",{staticStyle:{"margin-left":"60px",color:"red"}},[t._v("用户名已存在")]):n("span",{staticStyle:{"margin-left":"60px",color:"#26507B"}},[t._v("请输入正确格式的用户名")]),t._v(" "),n("br"),t._v(" "),n("span",[t._v("用户名：")]),t._v(" "),n("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入内容",size:"small"},on:{blur:t.accountExist},model:{value:t.new_input_account,callback:function(e){t.new_input_account=e},expression:"new_input_account"}}),t._v(" "),n("br"),t._v(" "),""==this.new_input_email?n("span",{staticStyle:{"margin-left":"60px",color:"#26507B"}},[t._v("请输入邮箱")]):0==this.returnEmail.code?n("span",{staticStyle:{"margin-left":"60px",color:"green"}},[t._v("本邮箱可用")]):8==this.returnEmail.code?n("span",{staticStyle:{"margin-left":"60px",color:"red"}},[t._v("邮箱格式不对")]):12001==this.returnEmail.code?n("span",{staticStyle:{"margin-left":"60px",color:"red"}},[t._v("邮箱已存在")]):n("span",{staticStyle:{"margin-left":"60px",color:"red"}},[t._v("请输入正确格式的邮箱")]),t._v(" "),n("br"),t._v(" "),n("span",{staticStyle:{display:"inline-block",margin:"5px 0 0 14px"}},[t._v("邮箱：")]),t._v(" "),n("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入内容",size:"small"},on:{blur:t.emailExist},model:{value:t.new_input_email,callback:function(e){t.new_input_email=e},expression:"new_input_email"}}),t._v(" "),n("br"),t._v(" "),""==this.new_input_mobile?n("span",{staticStyle:{"margin-left":"60px",color:"#26507B"}},[t._v("请输手机号")]):0==this.returnMobile.code?n("span",{staticStyle:{"margin-left":"60px",color:"green"}},[t._v("本手机号可用")]):2==this.returnMobile.code?n("span",{staticStyle:{"margin-left":"60px",color:"green"}},[t._v("请选择区号")]):9==this.returnMobile.code?n("span",{staticStyle:{"margin-left":"60px",color:"red"}},[t._v("手机号格式不对")]):12003==this.returnMobile.code?n("span",{staticStyle:{"margin-left":"60px",color:"red"}},[t._v("手机号已存在")]):n("span",{staticStyle:{"margin-left":"60px",color:"red"}},[t._v("请输入正确格式的手机号")]),t._v(" "),n("br"),t._v(" "),n("span",{staticStyle:{display:"inline-block",margin:"5px 0 0 14px"}},[t._v("手机：")]),t._v(" "),n("el-select",{staticStyle:{width:"90px"},attrs:{placeholder:"请选择",size:"small"},model:{value:t.area,callback:function(e){t.area=e},expression:"area"}},t._l(t.optionsArea,function(t){return n("el-option",{key:t.id,attrs:{value:t.code}})})),t._v(" "),n("el-input",{staticStyle:{width:"206px"},attrs:{placeholder:"请输入内容",size:"small"},on:{blur:t.mobileExist},model:{value:t.new_input_mobile,callback:function(e){t.new_input_mobile=e},expression:"new_input_mobile"}})],1),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.newuserdialog=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.newUserconfirm}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};e.a=i},ElJr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("a6uz"),a=n.n(i);for(var l in i)"default"!==l&&function(t){n.d(e,t,function(){return i[t]})}(l);var o=n("5gfz");var s=function(t){n("iSN9")},r=n("VU/8")(a.a,o.a,!1,s,"data-v-0094b330",null);e.default=r.exports},a6uz:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("k0Uy");e.default={data:function(){return{userNum:0,input_account:"",input_email:"",input_mobile:"",new_input_account:"",new_input_email:"",new_input_mobile:"",new_email_bool:!1,offlineUserList:[],newuserdialog:!1,area:86,optionsArea:[],returnAccount:"",returnEmail:"",returnMobile:""}},methods:{getAllCountry:function(){var t=this;this.$api("/admin/default/get_all_country",{}).then(function(e){t.optionsArea=e.data})},newUserconfirm:function(){var t=this;0==this.returnAccount.code&&0==this.returnEmail.code&&0==this.returnMobile.code&&(this.$api("/admin/offline/add_offline_user",{account:this.new_input_account,email:this.new_input_email,lang:"cn",phonePrefix:this.area,phoneNumber:this.new_input_mobile}).then(function(e){t.getOfflineUserList()}),this.newuserdialog=!1)},accountExist:function(){var t=this;""!=this.new_input_account&&this.$api("/admin/offline/account_exists",{account:this.new_input_account}).then(function(e){console.log(e),t.returnAccount=e})},emailExist:function(){var t=this;""!=this.new_input_email&&this.$api("/admin/offline/email_exists",{email:this.new_input_email}).then(function(e){t.returnEmail=e})},mobileExist:function(){var t=this;""!=this.new_input_mobile&&this.$api("/admin/offline/phone_exists",{phonePrefix:this.area,phoneNumber:this.new_input_mobile}).then(function(e){console.log(e),t.returnMobile=e})},offlineUserSeach:function(){this.getOfflineUserList()},getOfflineUserList:function(){var t=this;this.$api("/admin/offline/get_offline_user_list",{account:this.input_account,email:this.input_email,phoneNumber:this.input_mobile,pageNo:1,pageSize:50}).then(function(e){var n=e.data;t.offlineUserList=n.offlineUserList,t.userNum=t.offlineUserList.length})}},created:function(){this.getOfflineUserList(),this.getAllCountry()}}},iSN9:function(t,e){},k0Uy:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.validateURL=function(t){return/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(t)},e.validateLowerCase=function(t){return/^[a-z]+$/.test(t)},e.validateIDNO=function(t){return/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(t)},e.validatePhone=function(t){return/^[1][3,4,5,7,8][0-9]{9}$/.test(t)},e.validateUpperCase=function(t){return/^[A-Z]+$/.test(t)},e.validatAlphabets=function(t){return/^[A-Za-z]+$/.test(t)},e.validatePassword=function(t){return/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/.test(t)},e.validateEmail=function(t){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)}}});
//# sourceMappingURL=6.9d356724f26ce4a3f353.js.map