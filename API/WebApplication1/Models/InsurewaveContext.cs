using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace WebApplication1.Models
{
    public partial class InsurewaveContext : DbContext
    {
        public InsurewaveContext()
        {
        }

        public InsurewaveContext(DbContextOptions<InsurewaveContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AssetTable> AssetTables { get; set; }
        public virtual DbSet<ContractTable> ContractTables { get; set; }
        public virtual DbSet<UserTable> UserTables { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=MSI;Initial Catalog=Insurewave;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<AssetTable>(entity =>
            {
                entity.HasKey(e => e.AssetId);

                entity.ToTable("AssetTable");

                entity.Property(e => e.AssetId).HasColumnName("Asset_ID");

                entity.Property(e => e.AssetName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Asset_name");

                entity.Property(e => e.AssetPrice).HasColumnName("Asset_Price");

                entity.Property(e => e.ContentType)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Content_type");

                entity.Property(e => e.ContractId).HasColumnName("Contract_ID");

                entity.Property(e => e.LoginId).HasColumnName("Login_ID");

                entity.HasOne(d => d.Contract)
                    .WithMany(p => p.AssetTables)
                    .HasForeignKey(d => d.ContractId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_CONTRACTTABLE_CID");

                entity.HasOne(d => d.Login)
                    .WithMany(p => p.AssetTables)
                    .HasForeignKey(d => d.LoginId)
                    .HasConstraintName("FK_Person");
            });

            modelBuilder.Entity<ContractTable>(entity =>
            {
                entity.HasKey(e => e.ContractId);

                entity.ToTable("ContractTable");

                entity.Property(e => e.ContractId).HasColumnName("Contract_ID");

                entity.Property(e => e.AssuredSum)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("Assured_Sum");

                entity.Property(e => e.BrokerCommission).HasColumnName("Broker_Commission");

                entity.Property(e => e.BusinessChannel)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Business_Channel");

                entity.Property(e => e.ContracrStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Contracr_status");

                entity.Property(e => e.ContractEndDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Contract_end_date");

                entity.Property(e => e.ContractStartDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Contract_Start_Date");

                entity.Property(e => e.ContractType)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Contract_Type");

                entity.Property(e => e.CoveragePercentage)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("Coverage_Percentage");

                entity.Property(e => e.InsurerComments)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Insurer_Comments");

                entity.Property(e => e.LoginId).HasColumnName("Login_ID");

                entity.Property(e => e.MonthlyPremium)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("Monthly_premium");

                entity.Property(e => e.TotalAssetValue)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("Total_asset_value");

                entity.Property(e => e.TypeOfRisk)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Type_of_risk");

                entity.HasOne(d => d.Login)
                    .WithMany(p => p.ContractTables)
                    .HasForeignKey(d => d.LoginId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ContractTable_UserTable");
            });

            modelBuilder.Entity<UserTable>(entity =>
            {
                entity.HasKey(e => e.LoginId);

                entity.ToTable("UserTable");

                entity.Property(e => e.LoginId).HasColumnName("Login_ID");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserType)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("User_Type");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
