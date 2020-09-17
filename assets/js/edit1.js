$(function () {
  // 富文本渲染
  initEditor();
  var id = localStorage.getItem("id");
  id = parseInt(id);
  // 渲染下拉框
  loadselect();
  function loadselect() {
    $.get("/my/article/cates", function (res) {
      if (res.status === 0) {
        var htmlStr = template("cate", res);
        $("#select").html(htmlStr);
        layui.form.render();
      }
    });
  }
  // 加载页面数据
  loadData();
  function loadData() {
    $.get(`/my/article/${id}`, function (res) {
      if (res.status === 0) {
        layui.form.val("edit1Form", res.data);

        //   $("#select").text(res.data.cate_id);
      }
    });
  }
  // 渲染裁剪图
  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);
  // 点击选择按钮
  $("#chooseImage").on("click", function (e) {
    e.preventDefault();
    $("#file").click();
  });
  $("#file").on("change", function (e) {
    e.preventDefault();
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  // caogao按钮
  $("#caogao1").on("click", function (e) {
    e.preventDefault();
    $("#caogao1").attr("data-value", "草稿");
  });
  // 发布按钮
  $("#edit1Form").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var formdata = new FormData($(this)[0]);
    var state = $("#caogao1").attr("data-value");
    formdata.append("state", state);
    formdata.append("Id", id);
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        formdata.append("cover_img", blob);
        formdata.forEach(function (a, b) {
          console.log(b, a);
        });
        $.ajax({
          url: "/my/article/edit",
          type: "post",
          data: formdata,
          contentType: false,
          processData: false,
          success: function (res) {
            console.log(res);
            if (res.status === 0) {
              window.location.href = "../../article/list.html";
            }
          },
        });
      });
  });
});
