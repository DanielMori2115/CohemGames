namespace CohemGamesBDDev.DataAccess.models
{
    public class BaseModel
    {
        public DateTime FechaRegistro { get; set; }
        public DateTime? FechaActualizacion { get; set; }
        public int CodigoUsuarioCreador { get; set; }
        public int? CodigoUsuarioActualizacion { get; set; }
    }
}
