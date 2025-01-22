namespace CohemGamesBDDev.Dtos.ViewModels
{
    public class PromocionViewModel : BaseModelViewModel
    {
        public int Codigo { get; set; }
        public string Descripcion { get; set; }
        public float DescuentoPorcentaje { get; set; }
    }
}
