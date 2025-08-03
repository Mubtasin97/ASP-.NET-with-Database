using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace RegistrationApp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register); // For Web API
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}