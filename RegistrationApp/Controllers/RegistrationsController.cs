using Manager.Models;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace RegistrationApp.Controllers
{
    public class RegistrationsController : ApiController
    {
        private ManagerContext db = new ManagerContext();

        [HttpGet]
        public IHttpActionResult Get(string sort = "Sl")
        {
            try
            {
                var registrations = db.viwRegistrations.AsQueryable();
                var result = registrations.ToList().Select(r => new
                {
                    r.Sl,
                    r.pName,
                    r.eMail,
                    r.dRegistrationDate,
                    r.CourseName,
                    r.iFees,
                    r.sStatus,
                    vCourseName = db.tblRegistrations.FirstOrDefault(t => t.Sl == r.Sl)?.vCourseName
                });
                switch (sort.ToLower())
                {
                    case "pname": result = result.OrderBy(r => r.pName); break;
                    case "email": result = result.OrderBy(r => r.eMail); break;
                    case "dregistrationdate": result = result.OrderBy(r => r.dRegistrationDate); break;
                    case "coursename": result = result.OrderBy(r => r.vCourseName ?? r.CourseName); break;
                    default: result = result.OrderBy(r => r.Sl); break;
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("Get error: " + ex.ToString());
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody] tblRegistration registration)
        {
            if (registration == null) return BadRequest();
            registration.dRegistrationDate = DateTime.Now;
            registration.sStatus = "Pending";
            db.tblRegistrations.Add(registration);
            db.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("api/payments/{id}")]
        public IHttpActionResult ConfirmPayment(int id)
        {
            var registration = db.tblRegistrations.Find(id);
            if (registration == null) return NotFound();
            registration.sStatus = "Confirmed";
            db.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/personeel")]
        public IHttpActionResult GetPersoneel()
        {
            return Ok(db.Personeels.Select(p => new { p.SL, p.pName }).ToList());
        }

        [HttpGet]
        [Route("api/announcements")]
        public IHttpActionResult GetAnnouncements()
        {
            return Ok(db.Announcements.Select(a => new { a.SL, a.CourseSL }).ToList());
        }
    }
}