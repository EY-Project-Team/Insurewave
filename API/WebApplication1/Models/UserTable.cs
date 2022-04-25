using System;
using System.Collections.Generic;

#nullable disable

namespace WebApplication1.Models
{
    public partial class UserTable
    {
        public UserTable()
        {
            AssetTables = new HashSet<AssetTable>();
            ContractTables = new HashSet<ContractTable>();
        }

        public int LoginId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string UserType { get; set; }

        public virtual ICollection<AssetTable> AssetTables { get; set; }
        public virtual ICollection<ContractTable> ContractTables { get; set; }
    }
}
