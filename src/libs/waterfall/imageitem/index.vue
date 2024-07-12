<template>
    <div>
        <img v-img-lazy :src="data.original_url"  alt="" :style="{'width':width+'px','height':(width *data.height) /data.width + 'px'}" >
    </div>
</template>

<script setup>
import { computed, onMounted, ref ,watch,nextTick} from 'vue';
import { useIntersectionObserver } from "@vueuse/core";

const props = defineProps({
    data:{
        type:Object
    },
    width:{

    },
    currentId:{}
})

</script>

<style lang="scss" scoped>

</style>