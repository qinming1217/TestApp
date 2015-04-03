using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.International.Converters.PinYinConverter;
using System.Collections.ObjectModel;
using System.Text;

/// <summary>
/// 拼音转换工具类
/// </summary>
public class PinyinHelper
{
    /// <summary>
    /// 获取汉字拼音首字母
    /// </summary>
    /// <param name="chineseChar">汉字</param>
    /// <returns></returns>
    public static string ConvertToFirstLetter(string chineseChar)
    {
        char[] chs;
        StringBuilder str = new StringBuilder();
        foreach (char c in chineseChar.ToCharArray())
        {
            //验证该汉字是否合法
            if (ChineseChar.IsValidChar(c))
            {
                if (c == '家')   //设置特殊字符转换
                {
                    str.Append('j');
                    continue;
                }
                ChineseChar CC = new ChineseChar(c);
                //将该汉字转化为拼音集合
                ReadOnlyCollection<string> roc = CC.Pinyins;
                //获取集合中第一个数据即为该汉字的拼音
                chs = roc[0].ToLower().ToCharArray();
                //将该汉字的拼音首字母追加到可变字符串中
                str.Append(chs[0]);
            }
        }

        return str.ToString();
    }
}