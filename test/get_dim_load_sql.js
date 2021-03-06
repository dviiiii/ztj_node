const fs = require('fs');
function repeat(str , n){
  return new Array(n+1).join(str);
}

let jsonData = [
/*
  // 1.公司维度
  {
    to_table: {
      table_name: 'hana_dws.COMPANY_DIM_DWS',
      key: ['HANA_GROUP_CODE','HANA_COMPANY_CODE'],
      filed: ['HANA_COMPANY_NAME'],
      sk: 'COMPANY_SK'
    },
    from_table: {
      table_name: 'hana_ods.COMPANY_DIM_ODS',
      key: ['HANA_GROUP_CODE','HANA_COMPANY_CODE'],
      filed: ['HANA_COMPANY_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },
  // 2.客户维度
  {
    to_table: {
      table_name: 'hana_dws.CUSTOMER_DIM_DWS',
      key: ['HANA_CUSTOMER_CODE'],
      filed: ['HANA_CUSTOMER_NAME'],
      sk: 'CUSTOMER_SK'
    },
    from_table: {
      table_name: 'hana_ods.CUSTOMER_DIM_ODS',
      key: ['HANA_CUSTOMER_CODE'],
      filed: ['HANA_CUSTOMER_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },
  // 3.币种维度
  {
    to_table: {
      table_name: 'hana_dws.CURRENCY_DIM_DWS',
      key: ['HANA_CURRENCY_CODE'],
      filed: ['HANA_CURRENCY_SHORTNAME', 'HANA_CURRENCY_NAME'],
      sk: 'CURRENCY_SK'
    },
    from_table: {
      table_name: 'hana_ods.CURRENCY_DIM_ODS',
      key: ['HANA_CURRENCY_CODE'],
      filed: ['HANA_CURRENCY_SHORTNAME', 'HANA_CURRENCY_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },
  // 4.产品线维度
  {
    to_table: {
      table_name: 'hana_dws.PRODUCTLINE_DIM_DWS',
      key: ['HANA_PRODUCTLINE_CODE'],
      filed: ['HANA_PRODUCTLINE_NAME'],
      sk: 'PRODUCTLINE_SK'
    },
    from_table: {
      table_name: 'hana_ods.PRODUCTLINE_DIM_ODS',
      key: ['HANA_PRODUCTLINE_CODE'],
      filed: ['HANA_PRODUCTLINE_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },
  // 5.子产品线维度
  {
    to_table: {
      table_name: 'hana_dws.PRODUCTLINE_CHILD_DIM_DWS',
      key: ['HANA_PRODUCTLINE_CHILD_CODE'],
      filed: ['HANA_PRODUCTLINE_CHILD_NAME'],
      sk: 'PRODUCTLINE_CHILD_SK'
    },
    from_table: {
      table_name: 'hana_ods.PRODUCTLINE_CHILD_DIM_ODS',
      key: ['HANA_PRODUCTLINE_CHILD_CODE'],
      filed: ['HANA_PRODUCTLINE_CHILD_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },
  // 6.供应商维度
  {
    to_table: {
      table_name: 'hana_dws.SUPPLIER_DIM_DWS',
      key: ['HANA_SUPPLIER_CODE'],
      filed: ['HANA_SUPPLIER_NAME'],
      sk: 'SUPPLIER_SK'
    },
    from_table: {
      table_name: 'hana_ods.SUPPLIER_DIM_ODS',
      key: ['HANA_SUPPLIER_CODE'],
      filed: ['HANA_SUPPLIER_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },

  // 7.销售组办公室维度表
  {
    to_table: {
      table_name: 'hana_dws.SALESOFFICE_DIM_DWS',
      key: ['HANA_SALESOFFICE_CODE'],
      filed: ['HANA_SALESOFFICE_NAME'],
      sk: 'SALESOFFICE_SK'
    },
    from_table: {
      table_name: 'hana_ods.SALESOFFICE_DIM_ODS',
      key: ['HANA_SALESOFFICE_CODE'],
      filed: ['HANA_SALESOFFICE_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },

  // 8.销售组维度表
  {
    to_table: {
      table_name: 'hana_dws.SALESGROUP_DIM_DWS',
      key: ['HANA_SALESGROUP_CODE'],
      filed: ['HANA_SALESGROUP_NAME'],
      sk: 'SALESGROUP_SK'
    },
    from_table: {
      table_name: 'hana_ods.SALESGROUP_DIM_ODS',
      key: ['HANA_SALESGROUP_CODE'],
      filed: ['HANA_SALESGROUP_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },

  // 9.销售小组维度表
  {
    to_table: {
      table_name: 'hana_dws.SALESTEAM_DIM_DWS',
      key: ['HANA_SALESTEAM_CODE'],
      filed: ['HANA_SALESTEAM_NAME'],
      sk: 'SALESTEAM_SK'
    },
    from_table: {
      table_name: 'hana_ods.SALESTEAM_DIM_ODS',
      key: ['HANA_SALESTEAM_CODE'],
      filed: ['HANA_SALESTEAM_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },

  // 10.物料维度表
  {
    to_table: {
      table_name: 'hana_dws.MATERIEL_DIM_DWS',
      key: ['HANA_MATERIEL_CODE'],
      filed: ['HANA_MATERIEL_NAME'],
      sk: 'MATERIEL_SK'
    },
    from_table: {
      table_name: 'hana_ods.MATERIEL_DIM_ODS',
      key: ['HANA_MATERIEL_CODE'],
      filed: ['HANA_MATERIEL_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },

  // 11.汇率维度表
  {
    to_table: {
      table_name: 'hana_dws.RATE_DIM_DWS',
      key: ['HANA_RATE_TYPE','HANA_RATE_FROM', 'HANA_RATE_TO', 'HANA_RATE_DATE'],
      filed: ['HANA_RATE'],
      sk: 'RATE_SK'
    },
    from_table: {
      table_name: 'hana_ods.RATE_DIM_ODS',
      key: ['HANA_RATE_TYPE','HANA_RATE_FROM', 'HANA_RATE_TO', 'HANA_RATE_DATE'],
      filed: ['HANA_RATE'],
      //来源表简写为a
      init_where_sql: ''
    }
  },

  // 12.业务员维度表
  {
    to_table: {
      table_name: 'hana_dws.SALESMAN_DIM_DWS',
      key: ['HANA_SALESMAN_CODE'],
      filed: ['HANA_SALESMAN_NAME'],
      sk: 'SALESMAN_SK'
    },
    from_table: {
      table_name: 'hana_ods.SALESMAN_DIM_ODS',
      key: ['HANA_SALESMAN_CODE'],
      filed: ['HANA_SALESMAN_NAME'],
      //来源表简写为a
      init_where_sql: ''
    }
  },
  */
    // 13.品牌维度表
  {
    to_table: {
      table_name: 'hana_dws.BRAND_DIM_DWS',
      key: ['HANA_BRAND_CODE'],
      filed: ['HANA_BRAND_NAME', 'HANA_BRAND_NAME_ZH', 'HANA_BRAND_NAME_CN'],
      sk: 'BRAND_SK'
    },
    from_table: {
      table_name: 'hana_ods.BRAND_DIM_ODS',
      key: ['HANA_BRAND_CODE'],
      filed: ['HANA_BRAND_NAME', 'HANA_BRAND_NAME_ZH', 'HANA_BRAND_NAME_CN'],
      //来源表简写为a
      init_where_sql: ''
    }
  },







  // {
  //   to_table: {
  //     table_name: 'hana_dw.MATERIEL_DIM_TMP',
  //     key: ['HANA_MATERIEL_CODE'],
  //     filed: ['HANA_MATERIEL_NAME'],
  //     sk: 'MATERIEL_SK'
  //   },
  //   from_table: {
  //     table_name: 'hana_ods.MATERIEL_DIM_TMP',
  //     key: ['HANA_MATERIEL_CODE'],
  //     filed: ['HANA_MATERIEL_NAME'],
  //     //来源表简写为a
  //     // init_where_sql: 'and a.inhivetime like \'%2019-11-22%\''
  //   }
  // }
  ]
;

function init_load() {
  jsonData.forEach((obj) => {
    let keyLen1 = obj.to_table.key.length;
    let filedLen1 = obj.to_table.filed.length;
    let keyLen2 = obj.from_table.key.length;
    let filedLen2 = obj.from_table.filed.length;


    if(keyLen1 === keyLen2 && filedLen1 === filedLen2) {
      let initsql1 = '';
      let initsql2 = '';
      let nullstr = repeat(",null", keyLen1+filedLen1);
      initsql1 = `insert into ${obj.to_table.table_name} values (0, 1, '2000-01-01', '2200-12-31'${nullstr});`
      rtxt(initsql1);

      let orderKey = '';
      obj.from_table.key.forEach((key) => {
        orderKey += 'a.' + key + ','
      });
      orderKey = orderKey.substr(0, orderKey.length - 1);

      let allFiled = '';
      obj.from_table.key.forEach((key) => {
        allFiled += 'a.' + key + ','
      });
      obj.from_table.filed.forEach((key) => {
        allFiled += 'a.' + key + ','
      });
      allFiled = allFiled.substr(0, allFiled.length - 1);

      initsql2 = `insert into ${obj.to_table.table_name}
select row_number()
    over (
        order by
        ${orderKey}) + t2.sk_max, 1, '2000-01-01', '2200-12-31',
       -- 其他字段
       ${allFiled}
from
     -- 数据来源
     ${obj.from_table.table_name} a
cross join
         -- 目标表及目标表SK
    (select coalesce(max(${obj.to_table.sk}), 0) sk_max from ${obj.to_table.table_name}) t2
    -- 数据过滤
where 1=1 ${obj.from_table.init_where_sql};`;

      rtxt(initsql2);
    }else {
      console.log(`列数不匹配，目标表【${keyLen1+filedLen1}】列, 来源表【${keyLen1+filedLen2}】列`);
    }
  })
}

function dim_load() {
  jsonData.forEach((obj) => {
    let keyLen1 = obj.to_table.key.length;
    let filedLen1 = obj.to_table.filed.length;
    let keyLen2 = obj.from_table.key.length;
    let filedLen2 = obj.from_table.filed.length;


    if(keyLen1 === keyLen2 && filedLen1 === filedLen2) {
      let load_dim_sql = '';

      let joinkeySql = '';
      let onkeySql = '';
      obj.from_table.key.forEach((key, index) => {
        joinkeySql += 'ods.' + key + ' as join_key' + index + ',';
        onkeySql += `ods.${key} = dw.${obj.to_table.key[index]} and `
      });
      onkeySql = onkeySql.substr(0, onkeySql.length - 4);

      let allFiled = '';
      let comparesql = '';
      let subjoinSql = '';
      let comparesql2 = '';
      let allFiled2 = '';

      obj.from_table.key.forEach((key,index) => {
        allFiled += 'ods.' + key + ','
        subjoinSql += `sub.join_key${index} = a.${obj.to_table.key[index]} and `
        allFiled2 += 'sub.' + key + ','
      });
      obj.from_table.filed.forEach((key, index) => {
        allFiled += 'ods.' + key + ',';
        comparesql = `ods.${key} <> dw.${obj.to_table.filed[index]} and `;
        comparesql2 = `sub.${key} <> a.${obj.to_table.filed[index]} and `;
        allFiled2 += 'sub.' + key + ',';
      });
      allFiled = allFiled.substr(0, allFiled.length - 1);
      comparesql = comparesql.substr(0, comparesql.length - 4);
      subjoinSql = subjoinSql.substr(0, subjoinSql.length - 4);
      comparesql2 = comparesql2.substr(0, comparesql2.length - 4);
      allFiled2 = allFiled2.substr(0, allFiled2.length - 1);


      load_dim_sql = `merge into ${obj.to_table.table_name} a
using (
    (select
${joinkeySql}
          sk_max,
            coalesce(dw.version, 0) as this_version,
${allFiled}
   -- 从数据来源中（ods）查询现有数据
    from ${obj.from_table.table_name} ods
        -- 和目标维度表left join取得最新版本号
     left join ${obj.to_table.table_name} dw
         on ${onkeySql}
                and dw.expiry_date = '2200-12-31'
            -- cross join 维度表最大sk
        cross join (select coalesce(max(${obj.to_table.sk}), 0) sk_max from ${obj.to_table.table_name}) t2)

 union all
-- 维度表与ods表连接查询数据集 查询使用中并且字段不匹配的数据，用于后面insert
    (select
        null,t2.sk_max,
            coalesce(dw.version, 1),
           ${allFiled}
 from
   ${obj.from_table.table_name} ods
       join ${obj.to_table.table_name} dw
   on ${onkeySql}
       cross join
             -- 目标表及目标表SK
        (select coalesce(max(${obj.to_table.sk}), 0) sk_max from ${obj.to_table.table_name}) t2
 where
   ( ${comparesql} )
   and dw.expiry_date = '2200-12-31')
) sub

on ${subjoinSql}
-- 当key相等并且其他字段有不同时进行更新
when matched and 
( ${comparesql2} )
		and a.expiry_date = '2200-12-31'
 then update set expiry_date = current_date()
-- 当Key不相等时进行插入
when not matched
 then insert
 values (row_number() over () + sub.sk_max, sub.this_version + 1, current_date(), '2200-12-31', ${allFiled2}
)`
      rtxt(load_dim_sql);
    }else {
      console.log(`列数不匹配，目标表【${keyLen1+filedLen1}】列, 来源表【${keyLen1+filedLen2}】列`);
    }
  })
}

function rtxt(msg) {
  fs.writeFile('./message.txt', msg + '\n',{ 'flag': 'a' },function(err){
    if(err) console.log('写文件操作失败');
    // else console.log('写文件操作成功');
  });
}

// init_load();
dim_load();
