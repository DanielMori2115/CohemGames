namespace CohemGamesFEDev.Dtos.ViewModels
{
    public class ProductoViewModel : BaseModelViewModel
    {
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public float Precio { get; set; }
        public int CodigoCategoria { get; set; }
        public int Stock { get; set; }
    }
}
