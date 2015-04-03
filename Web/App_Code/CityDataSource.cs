using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// 城市数据类
/// </summary>
public class CityDataSource
{
    /// <summary>
    /// 总记录数
    /// </summary>
    public int RecordCount { get; set; }
    /// <summary>
    /// 城市列表
    /// </summary>
    public List<City> CityList { get; set; }
}