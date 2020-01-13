using System.ComponentModel.DataAnnotations;

namespace WebApplication1
{
    public class Todo
    {
        [Key]
        public int Id { get; set; }

        public string Value { get; set; }
    }
}
