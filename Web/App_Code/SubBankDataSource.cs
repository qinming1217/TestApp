using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// 支行数据类
/// </summary>
public class SubBankDataSource
{
    /// <summary>
    /// 总记录数
    /// </summary>
    public int RecordCount { get; set; }
    /// <summary>
    /// 支行列表
    /// </summary>
    public List<SubBank> SubBankList { get; set; }
}