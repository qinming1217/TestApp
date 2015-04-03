using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// 银行实体类
/// </summary>
public class Bank
{
    /// <summary>
    /// 银行名称
    /// </summary>
    public string BankName { get; set; }
    /// <summary>
    /// 银行名称首字母
    /// </summary>
    public string ShortName { get; set; }
    /// <summary>
    /// 更新时间
    /// </summary>
    public DateTime UpdateTime { get; set; }
    /// <summary>
    /// 排序列
    /// </summary>
    public long RN { get; set; }
}