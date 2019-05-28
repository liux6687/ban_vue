<template>
  <div>
      <div class="fullpage-container">
        <div class="fullpage-wp" v-fullpage="opts">
            <div class="page-1 page">
                <div class="part-1" v-animate="{value: 'bounceInLeft'}">
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                    <p>叫我第一个</p>
                </div>       
            </div>
            <div class="page-2 page">
                <div class="part-2" v-animate="{value: 'bounceInLeft'}">
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                    <P>叫我第二个</P>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      opts: {
        start: 0,
        dir: "v",
        duration: 500,
        beforeChange: function(prev, next) {},
        afterChange: function(prev, next) {}
      },
    }
  },
  components:{},
  methods:{
    
  },
  mounted(){
      
  }
};
</script>

<style scoped>
   
</style>


