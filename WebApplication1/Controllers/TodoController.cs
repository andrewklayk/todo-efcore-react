using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;

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

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, Todo todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_context.Todos.Find(id) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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
