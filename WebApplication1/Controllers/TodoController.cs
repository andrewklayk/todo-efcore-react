using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ILogger<TodoController> _logger;

        private readonly TodoContext _context;
        public TodoController(TodoContext myContext)
        {
            _context = myContext;
        }

        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            return _context.Todos.ToList();
        }

        [HttpPost]
        public ActionResult<Todo> PostTodoItem(Todo item)
        {
            _context.Todos.Add(item);
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var item = await _context.Todos.FindAsync(id);
            _context.Todos.Remove(item);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
