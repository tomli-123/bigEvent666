$(function () {
  // 引擎模板过滤器
  template.defaults.imports.filter = function (res) {
    var time = moment(res).format("MMMM Do YYYY, h:mm:ss a");
    return time;
  };
  // 初始化 数据参数
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };

  // 加载 下拉框数据
  function loadSelectData() {
    $.get("/my/article/cates", function (res) {
      var htmlStr = template("select", res);
      $("#selectTable").html(htmlStr);
      layui.form.render();
    });
  }
  // 加载 表格数据
  function loadTableData() {
    $.get("/my/article/list", q, function (res) {
      var htmlStr = template("intb", res);

      $("tbody").html(htmlStr);
      loadPager(res.total);
    });
  }

  // 初始化页面
  function start() {
    layui.form.render();
    loadSelectData();
    loadTableData();
  }
  start();

  // 加载 分页器
  function loadPager(total) {
    layui.use("laypage", function () {
      var laypage = layui.laypage;
      //执行一个laypage实例
      laypage.render({
        elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        curr: q.pagenum,
        limit: q.pagesize,
        limits: [2, 3, 5, 10],
        layout: ["count", "limit", "prev", "page", "next", "skip"],
        jump: function (obj, first) {
          //首次不执行
          if (!first) {
            //obj包含了当前分页的所有参数，比如：
            //得到当前页，以便向服务端请求对应页的数据。
            q.pagenum = obj.curr;
            //得到每页显示的条数
            q.pagesize = obj.limit;
            loadTableData();
          }
        },
      });
    });
  }
  // 筛选 按钮
  $("#listForm").submit(function (e) {
    e.preventDefault();
    q.cate_id = $("#selectTable").val();
    q.state = $("#state").val();
    loadTableData();
  });
  // 编辑按钮
  $("tbody").on("click", "#edit", function () {
    localStorage.setItem("id", $(this).attr("data-Id"));
    localStorage.setItem("id", $(this).attr("data-Id"));
    window.location.href = `../../article/edit1.html`;
  });
  // 删除按钮
  $("tbody").on("click", "#delete", function () {
    var id = $(this).attr("data-Id");
    layui.layer.open({
      area: ["300px", "200px"],
      content: "你确认删除吗",
      btn: ["确认", "删除"],
      yes: function (index, layero) {
        $.get(`/my/article/delete/${id}`, function (res) {
          if (res.status === 0) {
            loadTableData();
          }
        });
        layer.close(index); //如果设定了yes回调，需进行手工关闭
      },
      btn2: function (index, layero) {
        //按钮【按钮二】的回调
        layer.close(index);
        //return false 开启该代码可禁止点击该按钮关闭
      },
    });
  });
});
