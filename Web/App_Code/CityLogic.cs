using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// 城市逻辑类
/// </summary>
public class CityLogic
{
    #region properties
    private CityDao _dao;
    public CityLogic()
    {
        _dao = new CityDao();
    }
    #endregion

    #region private methods
    /// <summary>
    /// 获取所有城市
    /// </summary>
    /// <returns></returns>
    private List<City> GetAllCitys()
    {
        object citys = CacheHelper.GetCache("AllCitys");    //获取缓存
        if (citys == null)  //缓存不存在
        {
            List<City> cityList = ConvertHelper<City>.ConvertToList(_dao.SelectAllCitys()); //从数据库重新获取
            CacheHelper.SetCache("AllCitys", cityList, 1440);   //写入缓存
            return cityList;
        }
        else
        {
            return citys as List<City>;
        }
    }
    #endregion

    #region public methods
    /// <summary>
    /// 根据查询条件获取城市数据
    /// </summary>
    /// <param name="condition">查询条件</param>
    /// <returns></returns>
    public CityDataSource GetCitysByCondition(SearchCondition condition)
    {
        CityDataSource datasource = new CityDataSource();

        List<City> allCitys = GetAllCitys();

        var cityList = allCitys.Where(o => o.ShortName.StartsWith(condition.Keyword)
                                 || o.CityName.Contains(condition.Keyword)).OrderBy(o => o.RN);

        datasource.RecordCount = cityList.Count();
        datasource.CityList = cityList.ToList();

        return datasource;
    }
    #endregion
}