using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// 银行数据类
/// </summary>
public class BankDataSource
{
    /// <summary>
    /// 总记录数
    /// </summary>
    public int RecordCount { get; set; }
    /// <summary>
    /// 银行列表
    /// </summary>
    public List<Bank> BankList { get; set; }
}