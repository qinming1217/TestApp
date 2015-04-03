using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// 查询条件实体类
/// </summary>
public class SearchCondition
{
    /// <summary>
    /// 关键字
    /// </summary>
    public string Keyword { get; set; }
    /// <summary>
    /// 子关键字
    /// </summary>
    public string SubKeyword { get; set; }
    /// <summary>
    /// 分页索引
    /// </summary>
    public int PageIndex { get; set; }
    /// <summary>
    /// 分页大小
    /// </summary>
    public int PageSize { get; set; }
}