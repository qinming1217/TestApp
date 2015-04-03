using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;

/// <summary>
/// 转换工具类
/// </summary>
public class ConvertHelper<T> where T : new()
{
    /// <summary>  
    /// 利用反射和泛型把DataTable转成指定类型  
    /// </summary>  
    /// <param name="dt"></param>  
    /// <returns></returns>  
    public static List<T> ConvertToList(DataTable table)
    {
        if (table == null)
            return null;

        List<T> list = new List<T>();
        if (table.Rows.Count == 0)
            return list;

        DataTableEntityBuilder<T> dte;
        foreach (DataRow dtr in table.Rows)
        {
            dte = DataTableEntityBuilder<T>.CreateBuilder(dtr);
            T t = dte.Build(dtr);
            list.Add(t);
        }
        return list;
    }
}