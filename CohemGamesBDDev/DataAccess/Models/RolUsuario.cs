﻿namespace CohemGamesBDDev.DataAccess.models
{
    public class RolUsuario
    {
        public int Codigo { get; set; }
        public int CodigoRol { get; set; }
        public int CodigoUsuario { get; set; }
        public Roles Roles { get; set; }
    }
}
