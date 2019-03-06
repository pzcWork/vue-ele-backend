<template>
  <div :ref='refname' :key='refname' :class='refname'></div>  
</template>

<script>
export default {
  data(){
    return{
      refname:null,
    }
  },
  props:{
    mode:{
      type:String,
      default:'float'
    },
    width:{
      type:String,
      default:'285'
    },
  },
  created(){
    this.refname = `captcha${new Date().getTime()}`;
  },
  mounted () {
    let _this = this;
    // window.addEventListener('load',() => {
    setTimeout(() => {
      try {
        let element = this.$refs[this.refname] ? this.$refs[this.refname] : document.getElementsByClassName(this.refname)[0];
        if (!element) return;
        let lang = 'zh-CN';
        let backobj = {instance:null,validate:null};
        initNECaptcha({
          captchaId: 'b9dd11d4c87a4264a3c7918ac65e319a',
          element,
          mode:_this.mode,
          width:_this.width,
          protocol:'https',
          lang,
          onReady: function (instance) {
            Object.assign(backobj,{instance});
            _this.$emit('emitHandler',backobj);
            if(lang === 'en'){
              let yidun_panel = _this.$refs[_this.refname].getElementsByClassName('yidun_panel')[0];  
              let func = function(){
                this.$meassge({
                  meassge:'Drag the blue arrow to complete puzzle',
                  type:'error'
                })
              }
              if ((/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))){
                yidun_panel.addEventListener('touchstart',func);
              } else{
                yidun_panel.addEventListener('mouseup',func);
              }
            }
          },
          onVerify: function (err, data) {
            let validate = data ? data.validate : '';
            Object.assign(backobj,{validate});
            _this.$emit('emitHandler',backobj);
          }
        }, function onload (instance) {

        }, function onerror (err) {

        })  
      } catch (error) {
        console.log(error);
        
        
      }     
    }, 0);
    // });
  }
}
</script>

<style scoped>

</style>
