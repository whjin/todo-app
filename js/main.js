let tableList = [];

// 查询数据
const QUERY_LIST_SQL = "select * from listTable";
function queryData() {
  db.transaction((tx) => {
    tx.executeSql(
      QUERY_LIST_SQL,
      [],
      (tx, result) => {
        tableList = Array.from(result.rows);
      },
      (tx, error) => {
        console.log("查询数据失败" + error.message);
      }
    );
  });
}

// 查询数据
queryData();

// 插入数据
const INSERT_LIST_SQL =
  "insert into listTable (executeDate,itemType,itemDetail,followUp,remindTime,finishState,confirmPerson) values (?,?,?,?,?,?,?)";
function insertData(list) {
  db.transaction((tx) => {
    tx.executeSql(
      INSERT_LIST_SQL,
      [
        list.executeDate,
        list.itemType,
        list.itemDetail,
        list.followUp,
        list.remindTime,
        list.finishState,
        list.confirmPerson,
      ],
      (tx, result) => {
        console.log("新增1条事项");
      },
      (tx, error) => {
        console.log("添加数据失败" + error.message);
      }
    );
  });
}

// 表单提交，插入数据
layui.use("form", function () {
  let form = layui.form;
  form.on("submit(checkVal)", function (data) {
    insertData(data.field);
    let layerIndex = window.parent.layer.getFrameIndex(window.name);
    parent.layer.close(layerIndex);
  });
});

layui.use("table", function () {
  let table = layui.table;
  table.render({
    elem: "#app",
    toolbar: "#toolbar",
    data: tableList,
    height: 800,
    page: true,
    limit: 20,
    limits: [10, 20, 50, 100, 200, 300, 400],
    cols: [
      [
        {
          field: "",
          title: "序号",
          width: 80,
          align: "center",
          templet: function (d) {
            return d.LAY_INDEX;
          },
        },
        {
          checkbox: true,
          width: 80,
        },
        {
          field: "executeDate",
          title: "执行日期",
          width: 120,
          align: "center",
        },
        {
          field: "itemType",
          title: "类型",
          width: 150,
          align: "center",
        },
        {
          field: "itemDetail",
          title: "事项详情",
          width: 450,
          align: "center",
        },
        {
          field: "followUp",
          title: "跟进情况",
          width: 350,
          align: "center",
        },
        {
          field: "remindTime",
          title: "提醒时间",
          width: 200,
          align: "center",
        },
        {
          field: "finishState",
          title: "完成情况",
          width: 150,
          align: "center",
        },
        {
          field: "confirmPerson",
          title: "完成确认人",
          width: 150,
          align: "center",
        },
      ],
    ],
    done: function () {
      let rowIndex = null;
      table.on("row(app)", function (obj) {
        rowIndex = $(obj.tr).attr("data-index") + 1;
      });
      table.on("toolbar(app)", function (obj) {
        switch (obj.event) {
          case "add":
            layer.open({
              type: 2,
              area: ["700px", "680px"],
              fixed: "center",
              title: "新增事项",
              content: "./add.html",
            });
            break;
          case "delete":
            let checkStatus = table.checkStatus(obj.config.id);
            checkStatus.data.map((list) => {
              deleteData(list);
            });
            // 删除数据
            const DELETE_LIST_SQL = "delete from listTable where rowid=1";
            function deleteData(list) {
              db.transaction((tx) => {
                tx.executeSql(
                  DELETE_LIST_SQL,
                  [],
                  (tx, result) => {
                    console.log("删除数据成功");
                    location.reload();
                  },
                  (tx, error) => {
                    console.log("删除数据失败" + error.message);
                  }
                );
              });
            }
            break;
          case "update":
            layer.msg("编辑");
            break;
          case "clear":
            // dropTable();
            layer.msg("清空数据");
            break;
        }
      });
      tdTitle();
    },
  });
});

function tdTitle() {
  $("th").each(function (index, element) {
    $(element).attr("title", $(element).text());
  });
  $("td").each(function (index, element) {
    $(element).attr("title", $(element).text());
  });
}

// 选择日期、时间
layui.use("laydate", function () {
  let laydate = layui.laydate;
  laydate.render({
    elem: "#executeDate",
  });
  laydate.render({
    elem: "#remindTime",
    type: "datetime",
    format: "yyyy-MM-dd HH:mm",
  });
});
