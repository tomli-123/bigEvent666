$(function () {
  $("#btn").on("click", function (e) {
    //   e.preventDefault();

    $("#file").click();
  });

  //   替换图片
  var $image = $("#image");

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);
  var dataURL;
  // 显示上传文件
  $("#file").change(function (e) {
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);
    // console.log()
    var result = $image
      .cropper("destroy")
      .attr("src", newImgURL)
      .cropper(options);
  });
  $("#determine").on("click", function () {
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");
    $.ajax({
      url: "/my/update/avatar",
      type: "POST",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status === 0) {
          window.parent.render();
        }
      },
    });
  });
});
