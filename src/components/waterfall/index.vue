<template>
    <div class="  w-full  " >
        <div class=" w-1/2 fixed top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2 h-2/3   overflow-y-scroll scrollbar">
            <m-waterfall v-model="isdone" :data="data" :rowSpace="10" ></m-waterfall>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
// 获取图片数据
const isdone = ref(true)
const size = ref(20);
const page = ref(30);
const data = ref([]);
const isFinished= ref(false)
// 获取数据
const getImageList = () => {
  axios
    .get(
      `https://www.vilipix.com/api/v1/picture/public?limit=${20}&sort=hot&offset=${
        page.value * size.value
      }`
    )
    .then((res) => {
      data.value = res.data.data.rows;
      isFinished.value = true
      page.value+=1
    });
};
watch(isdone
,()=>{
  // 触底触发更新数据
  if(isdone.value){
      getImageList()
  }
}
)
// 获取护士数据
onMounted(() => {
  getImageList();

});
</script>

<style lang="scss" scoped></style>