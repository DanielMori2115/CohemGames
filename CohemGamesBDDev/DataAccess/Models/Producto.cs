namespace CohemGamesBDDev.DataAccess.models
{
    public class Producto : BaseModel
    {
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public float Precio { get; set; }
        public int CodigoCategoria { get; set; }
        public int Stock { get; set; }
        public Categoria Categoria { get; set; }
        public List<ProductoPromocion> ProductosPromocion { get; set; } = new();
    }
}
