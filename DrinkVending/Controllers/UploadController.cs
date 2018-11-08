using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using DrinkVending.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DrinkVending.Controllers
{
    [Route("/api/Upload")]
    public class Upload : Controller
    {
        string filePath;

        public Upload(IHostingEnvironment appEnvironment)
        {
             filePath = appEnvironment.WebRootPath + "/files/";
        }


        [HttpPost]
        public IActionResult SaveFile(string base64Content, string fileName, string oldfileName)
             
        {
            string filePathOld = filePath + oldfileName;
            filePath = filePath + fileName;

            if (!(base64Content == ""))
                {           
                if (System.IO.File.Exists(filePathOld))
                {
                    try
                    {
                        System.IO.File.Delete(filePathOld);
                    }
                    catch { };
                };
                byte[] imageBytes = Convert.FromBase64String(base64Content);
                System.IO.File.WriteAllBytes(filePath , imageBytes);
                return Ok();
            }

            return BadRequest("File required");
        }


        public async Task<IActionResult> Post(IFormFile file)
        //  public String SaveFile(IFormFile file)
        {
            var dt = new DateTime();
            dt = DateTime.Now;
            StringBuilder newFileName = new StringBuilder(120);
            newFileName.Append(dt.Year);
            newFileName.Append(dt.Month);
            newFileName.Append(dt.Day);
            newFileName.Append(dt.Hour);
            newFileName.Append(dt.Minute);
            newFileName.Append(dt.Millisecond);
            newFileName.Append(".jpg");
            string fileName = newFileName.ToString();
            using (var stream = new FileStream(filePath + fileName, FileMode.Create))
            {
                //   file.CopyTo(stream);
                await file.CopyToAsync(stream);
            }
            return Ok(fileName);
        }


        [HttpDelete]
        public IActionResult Delete(IFormFile file)
        {
            if (file != null)
            {
                System.IO.File.Delete(filePath + file.FileName);
                return Ok();
            }
            {
                return BadRequest("File required");
            }
        }


    }
}