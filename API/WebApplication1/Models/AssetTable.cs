using System;
using System.Collections.Generic;

#nullable disable

namespace WebApplication1.Models
{
    public partial class AssetTable
    {
        public int AssetId { get; set; }
        public int? LoginId { get; set; }
        public int? ContractId { get; set; }
        public string AssetName { get; set; }
        public string ContentType { get; set; }
        public int? AssetPrice { get; set; }
        public int? Quantity { get; set; }

        public virtual ContractTable Contract { get; set; }
        public virtual UserTable Login { get; set; }
    }
}
