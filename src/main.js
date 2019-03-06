// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import axios from 'axios'
import {
    Row,
    Col,
    Header,
    Step,
    Steps,
    Main,
    Switch,
    Footer,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Card,
    Container,
    Tooltip,
    Radio,
    RadioGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Dialog,
    Tabs,
    TabPane,
    Form,
    FormItem,
    Input,
    Checkbox,
    Notification,
    InputNumber,
    Select,
    Pagination,
    Option,
    Button,
    Table,
    TableColumn,
    Message,
    MessageBox,
    Popover,
    CheckboxGroup,
    DatePicker,
    Loading,
    Upload
} from 'element-ui'
import router from './router'
import store from './store'
import api from './fetch/api'
import './assets/css/theme/index.css'
import './plugins'
import './fetch/filter'
import VueClipboard from 'vue-clipboard2'
import HlUI from 'hally-package'
import '@/permission'
import Cookies from 'js-cookie';
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueClipboard)
Vue.use(HlUI)
// 单一指令或引入一段代码，直接用use
Vue.use(Loading)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Header.name, Header)
Vue.component(Footer.name, Footer)
Vue.component(Main.name, Main)
Vue.component(Container.name, Container)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Dialog.name,Dialog)
Vue.component(Form.name,Form)
Vue.component(FormItem.name,FormItem)
Vue.component(Input.name,Input)
Vue.component(Checkbox.name,Checkbox)
Vue.component(Card.name,Card)
Vue.component(Step.name,Step)
Vue.component(Steps.name,Steps)
Vue.component(InputNumber.name,InputNumber)
Vue.component(Radio.name,Radio)
Vue.component(RadioGroup.name,RadioGroup)
Vue.component(Select.name,Select)
Vue.component(Button.name,Button)
Vue.component(Option.name,Option)
Vue.component(Table.name,Table)
Vue.component(TableColumn.name,TableColumn)
Vue.component(Pagination.name,Pagination)
Vue.component(Tabs.name,Tabs)
Vue.component(TabPane.name,TabPane)
Vue.component(Menu.name,Menu)
Vue.component(Submenu.name,Submenu)
Vue.component(MenuItem.name,MenuItem)
Vue.component(MenuItemGroup.name,MenuItemGroup)
Vue.component(Switch.name,Switch)
Vue.component(Popover.name,Popover)
Vue.component(Upload.name,Upload)
Vue.component(CheckboxGroup.name,CheckboxGroup)
Vue.prototype.$notify  = Notification;
Vue.prototype.$api = api.common;
Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$cookie = Cookies;



Vue.prototype.baseUrl = process.env.NODE_ENV == "production"?'':"http://47.75.49.33:8090";//本地 调试api地址
//组件通信桥梁 msg
let msg = new Vue();
Vue.prototype.msg = msg;

new Vue({
      el: '#app',
      router,
      store,
      render:h => h(App)
})