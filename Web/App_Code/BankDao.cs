using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

/// <summary>
/// 银行及支行数据访问类
/// </summary>
public class BankDao
{
    private static readonly string sysConnectionStr = ConfigurationManager.ConnectionStrings["SysDB"].ConnectionString; //数据库连接字符串

    /// <summary>
    /// 插入银行列表
    /// </summary>
    /// <param name="bankList">银行列表</param>
    /// <returns></returns>
    public bool InsertBanks(List<Bank> bankList)
    {
        bool result = false;
        try
        {
            StringBuilder sb = new StringBuilder();

            foreach (Bank bank in bankList)
            {
                sb.Append(string.Format(@"INSERT INTO Code.Bank
                                                ( BankName, ShortName,UpdateTime )
                                        VALUES  ( N'{0}', 
                                                  N'{1}',  
                                                   '{2}');" + Environment.NewLine, bank.BankName, bank.ShortName,bank.UpdateTime));
            }

            result = SqlHelper.ExecuteNonQuery(sysConnectionStr, CommandType.Text, sb.ToString()) > 0;
        }
        catch (Exception e)
        {
            result = false;
        }

        return result;
    }
    /// <summary>
    /// 查询所有银行
    /// </summary>
    /// <returns></returns>
    public DataTable SelectAllBanks() 
    {
        DataTable dt = null;
        string sql = @"SELECT  BankName ,
                               ShortName ,
                               UpdateTime,
                               ROW_NUMBER() OVER ( ORDER BY BankId ) AS RN
                        FROM   Code.Bank WITH(NOLOCK) WHERE IsActive = 1";
        SqlConnection strConn = new SqlConnection(sysConnectionStr);
        DataSet ds = new DataSet();
        SqlDataAdapter da = new SqlDataAdapter(sql, strConn);
        da.Fill(ds, "BankDT");

        if (ds.Tables.Count > 0)
        {
            dt = ds.Tables[0];
        }

        return dt;
    }
    /// <summary>
    /// 查询所有支行
    /// </summary>
    /// <returns></returns>
    public DataTable SelectAllSubBanks()
    {
        DataTable dt = null;
        string sql = @"SELECT  SubBankCode ,
                               SubBankName ,
                               UpdateTime ,
                               ROW_NUMBER() OVER ( ORDER BY SubBankId ) AS RN
                        FROM   Code.SubBank WITH(NOLOCK) WHERE IsActive = 1";
        SqlConnection strConn = new SqlConnection(sysConnectionStr);
        DataSet ds = new DataSet();
        SqlDataAdapter da = new SqlDataAdapter(sql, strConn);
        da.Fill(ds, "SubBankDT");

        if (ds.Tables.Count > 0)
        {
            dt = ds.Tables[0];
        }

        return dt;
    }
}