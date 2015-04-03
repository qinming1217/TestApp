using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// 城市实体类
/// </summary>
public class City
{
    /// <summary>
    /// 城市名称
    /// </summary>
    public string CityName { get; set; }
    /// <summary>
    /// 首字母
    /// </summary>
    public string ShortName { get; set; }
    /// <summary>
    /// 省级名称
    /// </summary>
    public string ProvinceName { get; set; }
    /// <summary>
    /// 排序列
    /// </summary>
    public long RN { get; set; }
}