namespace CohemGamesBDDev.DataAccess.models
{
    public class Usuario : BaseModel
    {
        public string Codigo { get; set; }
        public string Email { get; set; }
        public string Clave { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Documento { get; set; }
        public int CodigoTipoDocumento { get; set; }
        public bool Estado { get; set; }
        public List<RolUsuario> RolUsuarios { get; set; } = new();
        public TipoDocumento TipoDocumento { get; set; }
    }
}
