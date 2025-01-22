using System.Net;
using System.Runtime.Serialization;

namespace CohemGamesBDDev.Common.Exceptions;

public class CustomException : Exception
{
    public int StatusCode { get; set; }

    protected CustomException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public CustomException(string message) : base(message)
    {
        StatusCode = (int)HttpStatusCode.NotAcceptable;
    }
}