namespace CohemGamesBDDev.DataAccess.models
{
    public class Promocion : BaseModel
    {
        public int Codigo { get; set; }
        public string Descripcion { get; set; }
       public float DescuentoPorcentaje { get; set; }
       public DateTime FechaInicio { get; set; }
       public DateTime? FechaFin { get; set; }
    }
}
