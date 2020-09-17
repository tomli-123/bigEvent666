$(function () {
  // 富文本 渲染
  initEditor();
  //加载 下拉框
  function loadselect() {
    $.get("/my/article/cates", function (res) {
      if (res.status === 0) {
        var htmlStr = template("cate", res);
        $("#select").html(htmlStr);
        layui.form.render();
      }
    });
  }
  // 开启加载
  function start() {
    loadselect();
  }
  start();
  // 选择封面
  $("#chooseImage").on("click", function () {
    $("#file").click();
  });
  // 初始化剪裁器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);
  $("#file").change(function (e) {
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  // 发布按钮
  $("#pubForm").on("submit", function (e) {
    e.preventDefault();
    var formdata = new FormData($(this)[0]);
    var state = $("#caogao").attr("data-value");
    formdata.append("state", state);
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        formdata.append("cover_img", blob);
        $.ajax({
          url: "/my/article/add",
          type: "POST",
          data: formdata,
          contentType: false,
          processData: false,
          success: function (res) {
            if (res.status === 0) {
              window.location.href = "../../article/list.html";
            }
          },
        });
      });
  });
  // 草稿按钮
  $("#caogao").on("click", function (e) {
    e.preventDefault();
    $("#caogao").attr("data-value", "草稿");
  });
});
