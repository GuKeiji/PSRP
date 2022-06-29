using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using api_processo_seletivo_2rp.Domains;

#nullable disable

namespace api_processo_seletivo_2rp.Contexts
{
    public partial class Ps_Context : DbContext
    {
        public Ps_Context()
        {
        }

        public Ps_Context(DbContextOptions<Ps_Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Tipousuario> Tipousuarios { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=PC-GAMER-GUKEIJ\\SQLEXPRESS; initial catalog=DBProcessoSeletivo2RP; user Id=sa; pwd=senai@132\n;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Tipousuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario)
                    .HasName("PK__TIPOUSUA__CA04062BEBF4E00D");

                entity.ToTable("TIPOUSUARIO");

                entity.Property(e => e.IdTipoUsuario).ValueGeneratedOnAdd();

                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("tipo");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__USUARIO__5B65BF974803178A");

                entity.ToTable("USUARIO");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nome");

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(62)
                    .IsUnicode(false)
                    .HasColumnName("senha");

                entity.Property(e => e.Situacao).HasColumnName("situacao");

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .HasConstraintName("FK__USUARIO__IdTipoU__38996AB5");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
