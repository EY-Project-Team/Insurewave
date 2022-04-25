using System;
using System.Collections.Generic;

#nullable disable

namespace WebApplication1.Models
{
    public partial class ContractTable
    {
        public ContractTable()
        {
            AssetTables = new HashSet<AssetTable>();
        }

        public int ContractId { get; set; }
        public int? LoginId { get; set; }
        public string ContractType { get; set; }
        public DateTime? ContractStartDate { get; set; }
        public string ContracrStatus { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public long? BrokerCommission { get; set; }
        public decimal? CoveragePercentage { get; set; }
        public decimal? AssuredSum { get; set; }
        public string TypeOfRisk { get; set; }
        public decimal? TotalAssetValue { get; set; }
        public string InsurerComments { get; set; }
        public decimal? MonthlyPremium { get; set; }
        public string BusinessChannel { get; set; }

        public virtual UserTable Login { get; set; }
        public virtual ICollection<AssetTable> AssetTables { get; set; }
    }
}
