// 根据宽度判断有几列，每列宽度多少
/**
 *
 * @param {*} containerWidth 容器宽度
 * @param {*} colomn 列数
 * @param {*} spacing 列间距与行间距相等
 * @returns itemwidth 每列的宽度
 */
export function getColumns(containerWidth, colomn, spacing) {
  const itemwidth =Math.floor((containerWidth-(colomn+1) * spacing)/colomn) 
  return itemwidth;
}

/**
 * 获取容器的高度以及每一张图片的left  top值 坐标值
 * ！！注意： 图片的坐标值是相对于容器的坐标值
 * @param {*} imageList 图片列表[{url:'',width},{}]
 * @param imageWidth  图片宽度固定的  按照容器宽度  每列多少来确定
 */

export function getContainerHeightAndImageCoordinate(
  imageList,
  heightsArray,
  spacing,
  imageWidth
) {
  // 循环遍历图片更新图片的坐标值  top  left
  imageList.forEach((item, index) => {
    const minHeightIndex = getMinHeightIndex(heightsArray);
    // 更新图片的坐标值
    item.left = minHeightIndex * imageWidth + (minHeightIndex + 1) * spacing;
    item.top = heightsArray[minHeightIndex];
    // 更新高度列表
    // (实际宽度 / 图片宽度) * 图片高度 
    heightsArray[minHeightIndex] +=(imageWidth/item.width)*item.height+ spacing;
  });
  return { imageList1:imageList, heightsArray };
}

// 获取一个数组有多少个元素
export function getArrayLength(arr) {
  return arr.length;
}

// 获取最小列的index
/**
 *
 * @param {*} heights 高度列表Array
 * @returns index 返回最小高度的index
 */
export function getMinHeightIndex(heightArray) {
  const index = heightArray.findIndex(
    (item) => item === Math.min(...heightArray)
  );
  return index;
}
// 获取最大列的最大高度
/**
 *
 * @param {*} heights 高度列表Array
 * @returns index 返回最小高度的index
 */
export function getMaxHeight(heightArray) {
  const index = heightArray.findIndex(
    (item) => item === Math.max(...heightArray)
  );
  return heightArray[index];
}


// 获取上下index  核心代码
/**
 * 
 * @param {*} imageList  当前所有图片列表  从你打开页面开始，就一直的增加的图片列表这个列表会随你滑动页面不断push数据进去
 * @param {*} scrollTop  这个是当前页面滑动了多少的值
 * @param {*} itemwidth 当前屏幕宽度下计算出来的itemwidth
 * @returns 
 */
export function getIndex(imageList,scrollTop,itemwidth) {
    // 获取当前视口高度
    const containerWidth = window.innerHeight
    let startindex
    let endindex
    for (let i = 0; i < imageList.length; i++) {
      const itemheight = (itemwidth*imageList[i].height) / imageList[i].width;
      if (scrollTop-imageList[i].top-itemheight<containerWidth) {
        startindex =  imageList[i].idx
        break; 
      }
    }
    for (let i = 0; i < imageList.length; i++) {
      const itemheight = (itemwidth*imageList[i].height) / imageList[i].width;
      if (imageList[i].top-scrollTop-2*containerWidth>0) {
        endindex =  imageList[i].idx
        break; 
      }else{
        endindex =  imageList.length-1
      }
    }
    if(endindex<19){
      endindex = 19
    }
    return{
      startindex,endindex
    }
}



