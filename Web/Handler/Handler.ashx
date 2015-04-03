<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using Aspose.Cells;
using System.Collections.Generic;

public class Handler : IHttpHandler
{
    private CityLogic _cityLogic = new CityLogic();
    private BankLogic _bankLogic = new BankLogic();

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        DoHandler(context);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    public void DoHandler(HttpContext context)
    {
        string result = string.Empty;                   //输出内容
        ResponseData respData = null;                   //响应数据
        string reqtype = context.Request["reqtype"];    //请求类型
        
        switch (reqtype)
        {
            //根据条件查询城市列表
            case "searchCitysByCondition":
                try
                {
                    respData = new ResponseData();
                    SearchCondition condition = new SearchCondition
                    {
                        Keyword = context.Request["keyword"].ToLower().Trim()
                    };
                    CityDataSource datasource = _cityLogic.GetCitysByCondition(condition);
                    if (datasource.RecordCount > 0)
                    {
                        respData.Status = (int)RespStatus.Scucess;
                        respData.Content = datasource;
                    }
                    else
                    {
                        respData.Status = (int)RespStatus.Defeat;
                    }
                }
                catch (Exception ex)
                {
                    respData.Status = (int)RespStatus.Exception;
                    respData.Exception = ex.ToString();
                }
                result = Newtonsoft.Json.JsonConvert.SerializeObject(respData);
                break;
            //导入银行列表
            case "importBanklist":
                if (context.Request.Files.Count > 0)
                {
                    Workbook workBook = new Workbook(context.Request.Files[0].InputStream);
                    Worksheet workSheet = workBook.Worksheets[0];

                    int rowsCount = workSheet.Cells.MaxDataRow;

                    List<Bank> bankList = new List<Bank>();
                    Bank bank = null;
                    for (int i = 0; i <= rowsCount; i++)
                    {
                        bank = new Bank
                        {
                            BankName = workSheet.Cells[i, 0].Value.ToString(),
                            ShortName = PinyinHelper.ConvertToFirstLetter(workSheet.Cells[i, 0].Value.ToString()),
                            UpdateTime = DateTime.Now
                        };

                        bankList.Add(bank);
                    }

                    _bankLogic.AddBanks(bankList);
                }
                break;
            //根据条件查询银行列表
            case "searchBanksByCondition":
                try
                {
                    respData = new ResponseData();
                    SearchCondition condition = new SearchCondition
                    {
                        Keyword = context.Request["keyword"].ToLower().Trim()
                    };
                    BankDataSource datasource = _bankLogic.GetBanksByCondition(condition);
                    if (datasource.RecordCount > 0)
                    {
                        respData.Status = (int)RespStatus.Scucess;
                        respData.Content = datasource;
                    }
                    else
                    {
                        respData.Status = (int)RespStatus.Defeat;
                    }
                }
                catch (Exception ex)
                {
                    respData.Status = (int)RespStatus.Exception;
                    respData.Exception = ex.ToString();
                }
                result = Newtonsoft.Json.JsonConvert.SerializeObject(respData);
                break;
            //根据条件查询支行列表
            case "searchSubBanksByCondition":
                try
                {
                    respData = new ResponseData();
                    SearchCondition condition = new SearchCondition
                    {
                        Keyword = context.Request["keyword"].Trim(),
                        SubKeyword = context.Request["subkeyword"].Trim()
                    };
                    SubBankDataSource datasource = _bankLogic.GetSubBanksByCondition(condition);
                    if (datasource.RecordCount > 0)
                    {
                        respData.Status = (int)RespStatus.Scucess;
                        respData.Content = datasource;
                    }
                    else
                    {
                        respData.Status = (int)RespStatus.Defeat;
                    }
                }
                catch (Exception ex)
                {
                    respData.Status = (int)RespStatus.Exception;
                    respData.Exception = ex.ToString();
                }
                result = Newtonsoft.Json.JsonConvert.SerializeObject(respData);
                break;
        }
        context.Response.Write(result);
    }
}