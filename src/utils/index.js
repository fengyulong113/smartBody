

export function axiosDownload(data, headers, fileName, type) {
  
  // new Blob([data])用来创建URL的file对象或者blob对象
  let url = window.URL.createObjectURL(
      new Blob([data], {
          type: type ? type :
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
      })
  );
  let innerFileName = ''
  if (fileName) {
      innerFileName = fileName
  } else {
      innerFileName = decodeURI(
          headers["content-disposition"].split(";")[1].split("=")[1]
      );
  }
  // 生成一个a标签
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.download = innerFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // 下载完成移除元素
  window.URL.revokeObjectURL(url); // 释放掉blob对象
}

export const bigStageFile = {
  foreignType: "big-model",
  attachStage: "默认",
  attachCategory: "大模型文件",
}
export const smallStageFile = {
  foreignType: "small-model",
  attachStage: "默认",
  attachCategory: "小模型文件",
}
export const smartStageFile = {
  foreignType: "smart-agent",
  attachStage: "默认",
  attachCategory: "智能体文件",
}

export function createFile(fileName, content, type = '') {
  let blob = new Blob([content], {type: type});
  let newFile = new File([blob], fileName, {type: blob.type});
  return newFile;
}