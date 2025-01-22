using System.Transactions;

namespace CohemGamesBDDev.Common.Utils;

public class GlobalSettings
{
    private static GlobalSettings _settings;
    private static IConfiguration _config;

    public TransactionOptions TransactionOptions { get; set; }
    public int PaginationElementsCount { get; set; }
    public int MaxIntervalPage { get; set; }

    public GlobalSettings(IConfiguration config)
    {
        _config = config;

        TransactionOptions = new TransactionOptions
        {
            IsolationLevel = IsolationLevel.ReadUncommitted,
            Timeout = new TimeSpan(0, Constants.MAX_MINUTES_TIME_REQUEST, 0)
        };

        PaginationElementsCount = _config.GetValue<int>("PaginationElementsCount");
        PaginationElementsCount = PaginationElementsCount == 0 ? Constants.MAX_PAGINATIONS_ELEMENTS_DEFAULT : PaginationElementsCount;

        MaxIntervalPage = _config.GetValue<int>("MaxIntervalPage"); 
        MaxIntervalPage = MaxIntervalPage == 0 ? Constants.MAX_INTERVAL_PAGE_DEFAULT : MaxIntervalPage;
    }
    public static GlobalSettings GetGlobalSettings()
    {
        return _settings ??= new GlobalSettings(_config);
    }
}
