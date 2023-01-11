<template>
    <div class="index">
        helloWord NUm:{{data}}
        <button type="button" @click="changeData()">addNUm</button>
    </div>
  </template>

  <script>
  export default{
    data(){
        return{
            data:1
        }
    },
    methods:{
            changeData(){
                this.data++
            }
  }
}
  </script>
  
  <style scoped>
  .index {
    display: flex;
    justify-content: center;
    height: 100%;
    padding-top: 100px;
    box-sizing: border-box;
  }
  </style>
  