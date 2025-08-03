using System;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace Manager.Models
{
    public class ManagerContext : DbContext
    {
        public ManagerContext() : base("name=ManagerContext") { }
        public DbSet<tblRegistration> tblRegistrations { get; set; }
        public DbSet<Personeel> Personeels { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<TableCourseDetails> TableCourseDetails { get; set; }
        public virtual DbSet<viwRegistration> viwRegistrations { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tblRegistration>().HasKey(t => t.Sl);
            modelBuilder.Entity<Personeel>().HasKey(p => p.SL);
            modelBuilder.Entity<Announcement>().HasKey(a => a.SL);
            modelBuilder.Entity<TableCourseDetails>().HasKey(t => t.SL);
            modelBuilder.Entity<viwRegistration>().HasKey(v => v.Sl);
        }
    }

    public class tblRegistration
    {
        [Key]
        public int Sl { get; set; }
        public int? iPersoneelSL { get; set; }
        public int? iAnnouncementSL { get; set; }
        public DateTime? dRegistrationDate { get; set; }
        public string vCategory { get; set; }
        public int? iFees { get; set; }
        public string sPaymentMethod { get; set; }
        public string sStatus { get; set; }
        public string vPaymentType { get; set; }
        public string vTrxID { get; set; }
        public string vEntryBy { get; set; }
        public string vCourseName { get; set; }
    }

    public class Personeel
    {
        [Key]
        public int SL { get; set; }
        public string pName { get; set; }
        public string eMail { get; set; }
    }

    public class Announcement
    {
        [Key]
        public int SL { get; set; }
        public int? CourseSL { get; set; }
        public decimal? Fees { get; set; }
    }

    public class TableCourseDetails
    {
        [Key]
        public int SL { get; set; }
        public string CourseName { get; set; }
    }

    public class viwRegistration
    {
        [Key]
        public int Sl { get; set; }
        public int? iPersoneelSL { get; set; }
        public int? iAnnouncementSL { get; set; }
        public string pName { get; set; }
        public string eMail { get; set; }
        public DateTime? dRegistrationDate { get; set; }
        public string CourseName { get; set; }
        public int? iFees { get; set; }
        public string sStatus { get; set; }
      
    }
}