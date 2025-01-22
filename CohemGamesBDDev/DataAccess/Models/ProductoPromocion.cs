namespace CohemGamesBDDev.DataAccess.models
{
    public class ProductoPromocion
    {
        public int Codigo { get; set; }
        public int CodigoPromocion { get; set; }
        public string CodigoProducto { get; set; }
        public Promocion Promocion { get; set; }
    }
}
