$(function () {
  renderCate();
  // 渲染文章添加页面
  function renderCate() {
    $.ajax({
      url: "/my/article/cates",
      type: "GET",
      success: function (res) {
        var strHtml = template("Tem", res);
        $("#tb").html(strHtml);
      },
    });
  }
  // $("#addForm").on("submit", function (e) {
  //     e.preventDefault();
  //   });
  //   $("body").on("submit", "#addTem", function (e) {
  //     e.preventDefault();
  //   });
  var index = 0;
  var editIndex = 0;
  $("#addBtn").on("click", function () {
    var strHtml = $("#addTem").html();
    index = layui.layer.open({
      type: 1,
      area: ["600px", "200px"],
      title: "freestyle嘛？",
      content: strHtml,
      shade: 0,
    });
  });
  // 点击让弹出层按钮添加页面
  //问题： 为什么 tbody不能作为表单submit事件的传递者
  $("body").on("submit", "#addForm", function (e) {
    e.preventDefault();
    var str = $(this).serialize();
    $.ajax({
      url: "/my/article/addcates",
      type: "POST",
      data: str,
      success: function (res) {
        if (res.status === 0) {
          renderCate();
          layui.layer.close(index);
        }
      },
    });
  });
  // 点击取消 关掉弹出层
  $("body").on("click", "#sub", function () {
    layui.layer.close(index);
  });
  // 点击让弹出层按钮添加页面 并将获取的数据拿到
  $("body").on("click", ".edit", function () {
    var strHtml = $("#editTem").html();
    editIndex = layui.layer.open({
      type: 1,
      area: ["600px", "200px"],
      title: "freestyle嘛？",
      content: strHtml,
      shade: 0,
    });
    var id = $(this).attr("data-Id");
    var htmlStr;
    $.ajax({
      url: "/my/article/cates/" + id,
      type: "GET",
      success: function (res) {
        if (res.status === 0) {
          layui.form.val("editForm", res.data);
        }
      },
    });
  });
  // 点击确认修改 提交信息并渲染
  $("body").on("submit", "#editForm", function (e) {
    e.preventDefault();
    var data = $("#editForm").serialize();
    $.ajax({
      url: "/my/article/updatecate",
      type: "POST",
      data: data,
      success: function (res) {
        if (res.status === 0) {
          renderCate();
          layui.layer.close(editIndex);
        }
      },
    });
  });
  //点击弹出删除框
  var Id1;
  var deleteIndex;
  $("body").on("click", ".delete", function () {
    Id1 = $(this).attr("data-Id");
    console.log(Id1);
    deleteIndex = layui.layer.open({
      type: 1,
      area: ["600px", "200px"],
      title: "确认过眼神了嘛？",
      content: `<button input="button" class="editBtn1">确认删除</button>`,
      shade: 0,
    });
  });
  // 根据id删除数据
  $("body").on("click", ".editBtn1", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/my/article/deletecate/" + Id1,
      type: "GET",
      success: function (res) {
        console.log(res);
        if (res.status === 0) {
          renderCate();
          layui.layer.close(deleteIndex);
        }
      },
    });
  });
});
