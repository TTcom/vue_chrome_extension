<template>
  <div class="container">
    <el-button  @click="chromeReload()">reload1</el-button>
    <el-button  @click="notice('search')">查找</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isExist: false,
    };
  },
  methods: {
    chromeReload() {
      chrome.tabs.query({
            active: true
        },function(tabs){
            console.log(`tabbbbbbbbbbbbbbbbbbb`,tabs); 
                chrome.runtime.reload(); 
                 chrome.tabs.sendMessage(tabs[0].id, {
                     type: 'window.location.reload',
                 });
                 setTimeout(()=>{
                  location.reload();
                 },500)
        });
    },
    notice(payload) {
      console.debug("%cdevtools", "color:#888;", payload);
      try {
        chrome.runtime
        ?.sendMessage({
          key: "panel:send",
          type: "event",
          payload,
        })
        .catch((err) => {});
      } catch (error) {
        console.log("appvuesenMessageerror: " + error)
        location.reload();
      }
      
    },
  },
  mounted() {
    chrome.runtime.onMessage.addListener((msg) => {
      console.log("appvueaddlistenerrrrrrrr", msg);
      if (msg.key === "devtools:send") {
        console.debug("%ccontent -> devtools", "color:#888;", msg);
        this.isExist = msg.payload === "find:one";
      }
      
    });
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.tools-container {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border: 1px #99999955 solid;
}
</style>
