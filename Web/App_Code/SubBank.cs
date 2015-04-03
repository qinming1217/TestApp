using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// 支行实体类
/// </summary>
public class SubBank
{
    /// <summary>
    /// 支行编码
    /// </summary>
    public string SubBankCode { get; set; }
    /// <summary>
    /// 支行名称
    /// </summary>
    public string SubBankName { get; set; }
    /// <summary>
    /// 更新时间
    /// </summary>
    public DateTime UpdateTime { get; set; }
    /// <summary>
    /// 排序列
    /// </summary>
    public long RN { get; set; }
}