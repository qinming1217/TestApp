using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
/// <summary>
/// 银行及支行业务逻辑类
/// </summary>
public class BankLogic
{
    #region properties
    private BankDao _dao;
    public BankLogic()
    {
        _dao = new BankDao();
    }
    #endregion

    #region private methods
    /// <summary>
    /// 获取所有银行
    /// </summary>
    /// <returns></returns>
    private List<Bank> GetAllBanks()
    {
        object banks = CacheHelper.GetCache("AllBanks");    //获取缓存
        if (banks == null)  //如不存在缓存
        {
            List<Bank> bankList = ConvertHelper<Bank>.ConvertToList(_dao.SelectAllBanks()); //从数据库获取
            CacheHelper.SetCache("AllBanks", bankList, 1440);    //写入缓存
            return bankList;
        }
        else
        {
            return banks as List<Bank>;
        }
    }
    /// <summary>
    /// 获取所有支行
    /// </summary>
    /// <returns></returns>
    private List<SubBank> GetAllSubBanks()
    {
        object subbanks = CacheHelper.GetCache("AllSubBanks");  //获取缓存
        if (subbanks == null)   //如不存在缓存
        {
            List<SubBank> subbankList = ConvertHelper<SubBank>.ConvertToList(_dao.SelectAllSubBanks()); //从数据库获取
            CacheHelper.SetCache("AllSubBanks", subbankList, 1440); //写入缓存
            return subbankList;
        }
        else
        {
            return subbanks as List<SubBank>;
        }
    }
    #endregion

    #region pulic methods
    /// <summary>
    /// 添加银行列表
    /// </summary>
    /// <param name="bankList">银行列表</param>
    /// <returns></returns>
    public bool AddBanks(List<Bank> bankList)
    {
        return _dao.InsertBanks(bankList);
    }
    /// <summary>
    /// 根据查询条件获取银行数据
    /// </summary>
    /// <param name="condition">查询条件</param>
    /// <returns></returns>
    public BankDataSource GetBanksByCondition(SearchCondition condition)
    {
        BankDataSource datasource = new BankDataSource();
        List<Bank> allBanks = GetAllBanks();

        var banks = allBanks.Where(o => o.ShortName.StartsWith(condition.Keyword)
                                  || o.BankName.Contains(condition.Keyword)).OrderBy(o => o.RN);

        datasource.RecordCount = banks.Count();
        datasource.BankList = banks.ToList();

        return datasource;
    }
    /// <summary>
    /// 根据查询条件获取支行数据
    /// </summary>
    /// <param name="condition">查询条件</param>
    /// <returns></returns>
    public SubBankDataSource GetSubBanksByCondition(SearchCondition condition)
    {
        SubBankDataSource datasource = new SubBankDataSource();
        List<SubBank> allSubBanks = GetAllSubBanks();
        var subbanks = allSubBanks.Where(o => o.SubBankName.Contains(condition.Keyword)
                            && o.SubBankName.Contains(condition.SubKeyword)).OrderBy(o => o.RN);

        datasource.RecordCount = subbanks.Count();
        datasource.SubBankList = subbanks.ToList();

        return datasource;
    }
    #endregion
}