using System;
using System.Web;
using System.Collections;
using System.Web.Caching;
/// <summary>
/// 缓存工具类
/// </summary>
public class CacheHelper
{
    /// <summary>
    /// 获取数据缓存
    /// </summary>
    /// <param name="CacheKey">键</param>
    public static object GetCache(string CacheKey)
    {
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        return objCache[CacheKey];
    }

    /// <summary>
    /// 设置数据缓存
    /// </summary>
    public static void SetCache(string CacheKey, object objObject,double cacheMinutes)
    {
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        if (cacheMinutes > 0)
        {
            TimeSpan tspan = TimeSpan.FromMinutes(cacheMinutes);
            SetCache(CacheKey, objObject, tspan);
        }
        else
        {
            objCache.Insert(CacheKey, objObject);
        }
    }

    /// <summary>
    /// 设置数据缓存
    /// </summary>
    public static void SetCache(string CacheKey, object objObject, TimeSpan Timeout)
    {
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        objCache.Insert(CacheKey, objObject, null, DateTime.MaxValue, Timeout, System.Web.Caching.CacheItemPriority.NotRemovable, null);
    }

    /// <summary>
    /// 设置数据缓存
    /// </summary>
    public static void SetCache(string CacheKey, object objObject, DateTime absoluteExpiration, TimeSpan slidingExpiration)
    {
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        objCache.Insert(CacheKey, objObject, null, absoluteExpiration, slidingExpiration);
    }

    public static void SetCacheByFileDependency(string CacheKey, object objObject, string filepath)
    {
        CacheDependency prodDependency = new CacheDependency(filepath);
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        objCache.Insert(CacheKey, objObject, prodDependency);
    }

    /// <summary>
    /// 设置数据缓存
    /// </summary>
    public static void SetCacheByFileDependency(string CacheKey, object objObject, TimeSpan Timeout, string filepath)
    {
        CacheDependency prodDependency = new CacheDependency(filepath);
        System.Web.Caching.Cache objCache = HttpRuntime.Cache;
        objCache.Insert(CacheKey, objObject, prodDependency, DateTime.MaxValue, Timeout, System.Web.Caching.CacheItemPriority.NotRemovable, null);
    }
    /// <summary>
    /// 移除指定数据缓存
    /// </summary>
    public static void RemoveCache(string CacheKey)
    {
        System.Web.Caching.Cache _cache = HttpRuntime.Cache;
        _cache.Remove(CacheKey);
    }

    /// <summary>
    /// 移除全部缓存
    /// </summary>
    public static void RemoveAllCache()
    {
        System.Web.Caching.Cache _cache = HttpRuntime.Cache;
        IDictionaryEnumerator CacheEnum = _cache.GetEnumerator();
        while (CacheEnum.MoveNext())
        {
            _cache.Remove(CacheEnum.Key.ToString());
        }
    }
}