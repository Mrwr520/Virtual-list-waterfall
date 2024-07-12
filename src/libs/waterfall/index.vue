<template>
  <div class="overflow-y-scroll scrollbar h-full">
    <div
      ref="container"
      id="cwidth"
      class="relative visible"
      :style="{ height: containerheight + 'px' }"
    >
      <!--     console.log(    containerheight.value); -->
      <!-- transform: `translate(${item.left}px, ${item.top}px)`, -->
      <div
        v-show="isShow"
        v-for="(item, index) in r1"
        :id="item.idx"
        :key="item.picture_id"
        class="tran absolute transition-all"
        :style="{
          transform: `translate(${item.left}px, ${item.top}px)`,
        }"
      >
        <imageitem :data="item" :width="itemWidth" />
      </div>
      <!-- 加载缓冲区 -->
      <div
        ref="loading"
        class="absolute text-center w-full text-xl"
        :style="{ top: containerheight - 5 + 'px' }"
      >
        <div>加载中。。。</div>
      </div>
  <div
    ref="container"
    id="cwidth"
    class="relative visible"
    :style="{ height: containerheight + 'px' }"
  >
    <!--     console.log(    containerheight.value); -->
    <!-- transform: `translate(${item.left}px, ${item.top}px)`, -->
    <div
      v-show="isShow"
      v-for="(item, index) in r1"
      :id="item.idx"
      :key="item.picture_id"
      class="tran absolute transition-all"
      :style="{
        transform: `translate(${item.left}px, ${item.top}px)`,
      }"
    >
      <imageitem :data="item" :width="itemWidth" />
    </div>
    <!-- 加载缓冲区 -->
    <div
      ref="loading"
      class="absolute text-center w-full text-xl"
      :style="{ top: containerheight - 5 + 'px' }"
    >
      <div>加载中。。。</div>
    </div>
  </div>
</template>

<script setup>
import { debounce } from "@/utils/debounce.js";
import {
  ref,
  watch,
  onMounted,
  computed,
  nextTick,
  createVNode,
  Fragment,
  render,
  onUnmounted,
  h,
} from "vue";
import imageitem from "./imageitem/index.vue";
import {
  getColumns,
  getIndex,
  getMaxHeight,
  getMinHeightIndex,
  getContainerHeightAndImageCoordinate,
} from "./utils.js";
import { currentWidth } from "@/utils/watchwidth.js";
import { useIntersectionObserver } from "@vueuse/core";

/**
 * <m-waterfall  :data=''  :columnSpace='' :rowSpace=''   >
 * data = [
 *      {url:''},
 *      {url:''},
 *      {url:''},
 *      {url:''},
 *      {url:''}
 * ]
 *
 */
// 是否需要加载
const isdone = defineModel();
// 判断元素是否显示
const isShow = ref(false);
// 判断是否看到元素
const loading = ref(null);
// const maxCount = Math.floor(container.value.clientHeight / itemHeight) + 2; // 可展示的最大数量
useIntersectionObserver(loading, ([{ isIntersecting }], observerElement) => {
  isdone.value = isIntersecting;
  // 执行可视区域的数据更新
});

const props = defineProps({
  // 数据
  data: {
    type: Array,
  },
  colomns: {
    default: 5,
  },
  // 列间距
  columnSpace: {
    default: 10,
    type: Number,
  },
  // 行间距
  rowSpace: {
    default: 10,
    type: Number,
  },
});
// 容器
const container = ref();
// 容器总高度
const containerheight = ref();
// itemwidth、
const itemWidth = ref();
const colomns = ref(props.colomns);
// 当前有坐标值的数组列表  位置表
const newImagelist = ref([]);
const image = ref([]);
//获取当前容器的宽度
const containerwidth = () => {
  return container.value.offsetWidth;
};
// 高度列表  有多少列就有多少项高度[高度1，高度2，高度3]
const heightsList = ref(new Array(colomns.value).fill(0));

const endList = ref();
const width = computed(() => {
  return container.value;
});
// 监测props的变化  传入原始数据  部分改变
watch(
  () => props.data,
  () => {
    // 获取当前itemwidth
    itemWidth.value = getColumns(
      containerwidth(),
      colomns.value,
      props.rowSpace
    );
    // 获取加了坐标的数据  以及更新的高度列表
    const { imageList1, heightsArray } = getContainerHeightAndImageCoordinate(
      props.data,
      heightsList.value,
      props.rowSpace,
      itemWidth.value
    );
    // 获取高度列表
    heightsList.value = heightsArray;
    // 获取包含坐标的图像数据列表
    newImagelist.value = imageList1;
    // 最高高度
    containerheight.value = getMaxHeight(heightsList.value);
    // 为每一个渲染数据排序
    let startlength = 0;
    if (image.value.length <= 19) {
      props.data.map((item, index) => {
        item.idx = index;
        // renderNode(item);
        image.value.push(item);
      });
    } else {
      startlength = image.value.length;
      props.data.map((item, index) => {
        item.idx = startlength + index;
        image.value.push(item);
      });
    }
    getrenderList();
  }
);

//监测屏幕的变化实时改变图片坐标  全部改变
watch(currentWidth, () => {
  if (heightsList.value[0] == 0) {
    return;
  }
  // 初始化
  checkInView();
  if (document.getElementById("cwidth")) {
    // 现在的宽度
    if (currentWidth.value > 1200) {
      colomns.value = 6;
    } else if (currentWidth.value < 1200 && currentWidth.value > 1000) {
      colomns.value = 4;
    } else if (currentWidth.value < 1000) {
      colomns.value = 2;
    }
    heightsList.value = new Array(colomns.value).fill(0);
    // 循环遍历图片更新图片的坐标值  top  left
    image.value.forEach((item, index) => {
      // 更新图片的坐标值
      item.left = 0;
      item.top = 0;
    });
    // 获取当前itemwidth
    itemWidth.value = getColumns(
      containerwidth(),
      colomns.value,
      props.rowSpace
    );
    const { imageList1, heightsArray } = getContainerHeightAndImageCoordinate(
      image.value,
      heightsList.value,
      props.rowSpace,
      itemWidth.value
    );
    // 获取高度列表
    heightsList.value = heightsArray;
    // 获取包含坐标的图像数据列表
    image.value = imageList1;
    // 最高高度
    containerheight.value = getMaxHeight(heightsList.value);
    getrenderList();
  }
});
// 记录当前元素距离顶部的高度
const initialScroll = ref();
const isupordown = ref();
// 滚动高度
const scroll = ref(0);
/**
 * 确定滑动距离
 */
const checkInView = () => {
  const rect = container.value.getBoundingClientRect();
  if (!initialScroll.value) {
    // 下次滚动小于这个值向下滚动  大于这个值向上滚动
    initialScroll.value = rect.top;
  }
  const current = scroll.value;
  scroll.value =
    rect.top - initialScroll.value == 0 ? 0 : -(rect.top - initialScroll.value);
  if (scroll.value < current) {
    isupordown.value = "向上";
  } else {
    isupordown.value = "向下";
  }
  getrenderList();
};

// s
const s1 = ref(0);
const en1 = ref(19);

// 根据索引来晒徐数据
const getendlist = () => {};

// 当前渲染数据
const RENDERLIST = ref([]);
const length1 = ref(0);
const render1 = computed(() => {
  return image.value.slice(s1.value, en1.value);
});

const startidx = ref();
const endidx = ref();
// 筛选渲染数据
const getrenderList = () => {
  if (image.value.length == 0) return;
  // 筛选item   一开始就要确定  已渲染数据与后面index的数据的对比  从而对RENDERLIST进行删减或者增加
  const list = getIndex(image.value, scroll.value, itemWidth.value);
  s1.value = list.startindex;
  en1.value = list.endindex;
  RENDERLIST.value = image.value;
  isShow.value = true;
};

// 必须要用计算属性去切割才不会出现闪烁问题
const r1 = computed(() => {
  return image.value.slice(s1.value, en1.value + 5);
});
onMounted(() => {
  // 初始化上下线
  checkInView();
  // 监控滚动事件
  window.addEventListener("scroll", debounce(checkInView, 100), true);
});
onUnmounted(() => {
  window.removeEventListener("scroll", checkInView);
});
</script>

<style lang="scss" scoped>
.tran {
  transition: all 0.5;
}
</style>
