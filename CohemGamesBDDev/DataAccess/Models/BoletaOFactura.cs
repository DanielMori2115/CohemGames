namespace CohemGamesBDDev.DataAccess.models
{
    public class BoletaOFactura : BaseModel
    {
        public int Codigo { get; set; }
        public int TipoVentaCodigo { get; set; }
        public int CodigoUsuarioComprador { get; set; }
        public float TotalGeneral { get; set; }
        public float TotalReal { get; set; }
        public float DescuentoAplicadoMoneda { get; set; }
        public int PromocionId { get; set; }
        public List<Ventas> Ventas { get; set; } = new();
        public TipoVenta TipoVenta { get; set; }
    }
}
