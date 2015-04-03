using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

/// <summary>
/// 响应实体类
/// </summary>
public class ResponseData
{
    /// <summary>
    /// 响应状态
    /// </summary>
    public int Status { get; set; }
    /// <summary>
    /// 响应内容
    /// </summary>
    public object Content { get; set; }
    /// <summary>
    /// 异常信息
    /// </summary>
    public string Exception { get; set; }
}
/// <summary>
/// 响应状态枚举
/// </summary>
public enum RespStatus
{
    [Description("成功")]
    Scucess = 0,
    [Description("失败")]
    Defeat = 1,
    [Description("异常")]
    Exception = -1
}