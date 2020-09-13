let db = openDatabase("tableSql", "1.0", "Test DB", 2 * 1024 * 1024);

// 创建数据表
const LIST_TABLE_SQL =
  "create table if not exists listTable (executeDate varchar(12),itemType varchar(12),itemDetail varchar(25),followUp varchar(12),remindTime varchar(16),finishState varchar(12),confirmPerson varchar(12))";
function createTable() {
  db.transaction((tx) => {
    tx.executeSql(
      LIST_TABLE_SQL,
      [],
      (tx, result) => {
        console.log("创建listTable表成功");
      },
      (tx, error) => {
        console.log("创建listTable表失败" + error.message);
      }
    );
  });
}





// 修改数据
const UPDATE_LIST_SQL =
  "update listTable set executeDate=?,itemType=?,itemDetail=?,followUp=?,remindTime=?,finishState=?,confirmPerson=? where rowid=1";
function updateData(list) {
  db.transaction((tx) => {
    tx.executeSql(
      UPDATE_LIST_SQL,
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
        console.log("修改数据成功");
      },
      (tx, error) => {
        console.log("查询数据失败" + error.message);
      }
    );
  });
}

// 删除数据表
const DROP_LIST_SQL = "drop table listTable";
function dropTable() {
  db.transaction((tx) => {
    tx.executeSql(
      DROP_LIST_SQL,
      [],
      (tx, result) => {
        console.log("删除数据表成功");
      },
      (tx, error) => {
        console.log("删除数据表失败" + error.message);
      }
    );
  });
}

// 创建数据表
createTable();


