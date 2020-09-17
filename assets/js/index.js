$(function () {
  // 进入页面渲染头像
  window.render = function render() {
    $.ajax({
      url: "/my/userinfo",
      type: "GET",
      success: function (res) {
        var uname = res.data.nickname || res.data.username;
        $("#un").html(uname);
        if (res.status === 1) return;
        if (res.data.user_pic) {
          $(".img").attr("src", res.data.user_pic).show();
          $(".font").hide();
          // console.log(res);
        } else {
          uname = uname[0].toUpperCase();
          $(".font").html(uname).show();
          $(".img").hide();
        }
      },
      complete: function (res) {},
    });
  };
  render();

  // 点击退出 清空localStorage 退回到登录页面
  $("#quit").on("click", function (e) {
    e.stopPropagation();
    layui.layer.confirm(
      "确定要退出吗",
      {
        btn: ["确定", "取消"], //可以无限个按钮
      },
      function (index, layero) {
        window.location.href = "../../login.html";
        window.localStorage.removeItem("token");
      },
      function (index) {
        //按钮【按钮二】的回调
      }
    );
  });
});
