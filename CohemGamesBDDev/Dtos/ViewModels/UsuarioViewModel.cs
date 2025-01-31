﻿namespace CohemGamesBDDev.Dtos.ViewModels
{
    public class UsuarioViewModel : BaseModelViewModel
    {
        public string Codigo { get; set; }
        public string Email { get; set; }
        public string Clave { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Documento { get; set; }
        public int CodigoTipoDocumento { get; set; }
        public bool Estado { get; set; }
    }
}
