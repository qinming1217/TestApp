using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// 城市数据访问类
/// </summary>
public class CityDao
{
    private static readonly string sysConnectionStr = ConfigurationManager.ConnectionStrings["SysDB"].ConnectionString; //数据库连接字符串
    
    /// <summary>
    /// 查询所有城市
    /// </summary>
    /// <returns></returns>
    public DataTable SelectAllCitys()
    {
        DataTable dt = null;
        string sql = @"SELECT   a.CityName AS CityName ,
                                a.ShortName ,
                                b.ProvinceName + b.ProvinceType AS ProvinceName,
                                ROW_NUMBER() OVER ( ORDER BY b.ProvinceName ) AS RN
                        FROM    geography.City a WITH (NOLOCK)
                                LEFT JOIN geography.Province b WITH (NOLOCK)
                                ON a.ParentId = b.SerialId";
        SqlConnection strConn = new SqlConnection(sysConnectionStr);
        DataSet ds = new DataSet();
        SqlDataAdapter da = new SqlDataAdapter(sql, strConn);
        da.Fill(ds, "CityDT");

        if (ds.Tables.Count > 0)
        {
            dt = ds.Tables[0];
        }

        return dt;
    }

    #region note
    //    public CityDataSource SearchCityByKeyword(SearchCondition condition)
    //    {
    //        CityDataSource datasource = null;
    //        string sql = string.Format(@"SELECT    a.CityName + ',(' + b.ProvinceName + b.ProvinceType + ')' AS FullName ,
    //                                                a.CityName AS CityName ,
    //                                                ROW_NUMBER() OVER ( ORDER BY a.CityCode ) AS RN
    //                                                INTO #Temp 
    //                                        FROM      geography.City a
    //                                                LEFT JOIN geography.Province b ON a.ParentId = b.SerialId
    //                                        WHERE     a.ShortName LIKE '{0}%'
    //                                                OR a.CityName LIKE '{0}%'
    //                                                SELECT COUNT(*) AS RecordCount FROM #Temp
    //
    //                            SELECT  *
    //                            FROM    #Temp A
    //                            WHERE   A.RN > ( {1} - 1 ) * {2}
    //                                    AND A.RN <= {1} * {2}
    //        
    //                                    DROP TABLE #Temp", condition.Keyword, condition.PageIndex, condition.PageSize);
    //        SqlConnection strConn = new SqlConnection(sysConnectionStr);
    //        DataSet ds = new DataSet();
    //        SqlDataAdapter da = new SqlDataAdapter(sql, strConn);
    //        da.Fill(ds, "DataSet");

    //        if (ds.Tables.Count > 1)
    //        {
    //            datasource = new CityDataSource();
    //            if (ds.Tables[0].Rows.Count > 0)
    //            {
    //                datasource.RecordCount = Convert.ToInt32(ds.Tables[0].Rows[0]["RecordCount"]);
    //            }
    //            if (ds.Tables[1].Rows.Count > 0)
    //            {
    //                datasource.CityList = ConvertHelper<City>.ConvertToList(ds.Tables[1]);
    //            }
    //        }

    //        return datasource;
    //    }
    #endregion
}