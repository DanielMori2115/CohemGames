namespace CohemGamesBDDev.Dtos.Models
{
    public class Promocion : BaseModel
    {
        public int Codigo { get; set; }
        public string Descripcion { get; set; }
        public float DescuentoPorcentaje { get; set; }
    }
}
