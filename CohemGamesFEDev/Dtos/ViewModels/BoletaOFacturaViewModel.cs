﻿namespace CohemGamesFEDev.Dtos.ViewModels
{
    public class BoletaOFacturaViewModel : BaseModelViewModel
    {
        public int Codigo { get; set; }
        public int TipoVenta { get; set; }
        public int CodigoUsuarioComprador { get; set; }
        public float TotalGeneral { get; set; }
        public float TotalReal { get; set; }
        public float DescuentoAplicadoMoneda { get; set; }
        public int PromocionId { get; set; }
    }
}
