namespace CohemGamesBDDev.DataAccess.models
{
    public class Ventas : BaseModel
    {
        public int Codigo { get; set; }
        public int CodigoBoletaOFactura { get; set; }
        public string CodigoProducto { get; set; }
    }
}
